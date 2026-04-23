import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are a quiz generator. Given the article below, return ONLY valid JSON with no markdown, no explanation.

Format:
{
  "summary": "2-3 sentence summary of the article",
  "questions": [
    {
      "question": "question text",
      "answers": ["option A", "option B", "option C", "option D"],
      "correct": 0
    }
  ]
}

Generate exactly 5 questions. "correct" is the index (0-3) of the correct answer.

Title: ${title}
Article: ${content}`,
      },
    ],
  });

  const text = completion.choices[0].message.content ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  return NextResponse.json(parsed);
}