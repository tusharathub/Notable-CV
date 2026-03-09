import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { format } from "date-fns";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobDescription, resume } = await req.json();
    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: "Job description and resume are required" },
        { status: 400 },
      );
    }

    // Check premium status and usage
    const user = await convex.query(api.users.getUserById, { userId });
    const isPremium = user?.isPremium || false;

    if (!isPremium) {
      const today = format(new Date(), "yyyy-MM-dd");
      const usageCount = await convex.query(api.usage.getUsage, {
        userId,
        date: today,
      });

      if (usageCount >= 3) {
        return NextResponse.json(
          {
            error:
              "Daily limit reached. Upgrade to Premium for unlimited access.",
          },
          { status: 403 },
        );
      }
    }

    const prompt = `
        You are a professional career assistant. 
        The user has provided a job description and their resume. 
        Call user with "you", do not make them feel that this is AI generated

        1. Write a personalized cover letter tailored to the job. 
        2. Give 3-5 strong bullet points summarizing why the user fits the role. 
        3. Suggest 3-5 bullet points that can be added to the resume to make it more compatible with the job.

        Return your answer ONLY as a valid JSON object with EXACTLY these three keys:
        - "coverLetter": A string containing the cover letter.
        - "keyPoints": An array of strings containing the key fit points.
        - "suggestions": An array of strings containing the resume improvement suggestions.

        Job Description:
        ${jobDescription}

        Resume:
        ${resume}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant specializing in career optimization. You MUST return ONLY valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) throw new Error("No response from AI");

    return NextResponse.json({ result: JSON.parse(aiResponse) });
  } catch (error: unknown) {
    if (error instanceof Groq.APIError) {
      console.error("Groq API Error:", error.status, error.error);
    } else {
      console.error("error in generating response", error);
    }
    return NextResponse.json(
      { error: "Failed to generate Cover Letter" },
      { status: 500 },
    );
  }
}
