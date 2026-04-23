import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      questions: {
        include: { answers: true },
        orderBy: { order: "asc" },
      },
    },
  });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const { title, content, summary, questions } = await req.json();

  const article = await prisma.article.create({
    data: {
      title,
      content,
      summary,
      authorId: "anonymous",
      questions: {
        create: questions.map((q: any, i: number) => ({
          text: q.question,
          order: i,
          answers: {
            create: q.answers.map((a: string, j: number) => ({
              text: a,
              isCorrect: j === q.correct,
            })),
          },
        })),
      },
    },
    include: {
      questions: {
        include: { answers: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return NextResponse.json(article);
}