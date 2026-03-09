const Groq = require("groq-sdk");
require("dotenv").config({ path: ".env.local" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a helpful tool. You MUST return JSON.",
        },
        { role: "user", content: 'Return JSON with key "test"' },
      ],
    });
    console.log(completion);
  } catch (err) {
    if (err instanceof Groq.APIError) {
      console.error(err.status);
      console.error(err.name);
      console.error(err.headers);
      console.error(err.error);
    } else {
      console.error(err);
    }
  }
}
test();
