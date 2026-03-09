const fs = require("fs");
const env = fs.readFileSync("d:/Practice/onGit/cv-builder/.env.local", "utf-8");
const keyMatch = env.match(/GROQ_API_KEY=(.*)/);
if (!keyMatch) throw new Error("No key");
const key = keyMatch[1].trim();
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: key });

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
Software Engineer

Resume:
Software Engineer
`;

(async () => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant specializing in career optimization. You MUST return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    });
    console.log("SUCCESS:", completion.choices[0].message.content);
  } catch (err) {
    console.error("ERROR:");
    console.error(JSON.stringify(err.error, null, 2));
  }
})();
