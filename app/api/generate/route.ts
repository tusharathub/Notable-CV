import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { jobDescription, resume } = await req.json();
    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: "Job description and resume are required" },
        { status: 400 }
      );
    }

    const prompt = `
        You are a professional career assistant. 
        The user has provided a job description and their resume. 

        1. Write a personalized cover letter tailored to the job. 
        2. Give 3-5 strong bullet points summarizing why the user fits the role. 
        3. Suggest 3-5 bullet points that can be added to the resume to make it more compatible with the job.

        Return your answer in this format:

        ---
        **Cover Letter:**
        [Write here]

        **Key Fit Points:**
        - point 1
        - point 2

        **Resume Improvement Suggestions:**
        - suggestion 1
        - suggestion 2
        ---

        Job Description:
        ${jobDescription}

        Resume:
        ${resume}
    `;

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "system",
                content: "You are a helpful AI assistant specializing in career optimization "
            },
            {
                role: "user",
                content: prompt,
            }
        ]
    });

    const aiResponse = completion.choices[0]?.message?.content || "No response from AI";

    return NextResponse.json({result : aiResponse});
  } catch (error) {
    console.log("error in generating response", error);
    return NextResponse.json(
        {error: "Failed to generate Cover Letter"},
        {status: 400},
    )
  }
}
