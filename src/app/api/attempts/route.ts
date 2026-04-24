import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { articleId, score, total } = await req.json();

  const attempt = await prisma.quizAttempt.create({
    data: { articleId, score, total },
  });

  return NextResponse.json(attempt);
}