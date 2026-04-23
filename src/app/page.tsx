"use client";
import { useState } from "react";
import Quiz from "./components/quiz";
import Summarized from "./components/Summarized";
import QuickTest from "./components/quickTest";

export type Question = {
  question: string;
  answers: string[];
  correct: number;
};

export type ArticleData = {
  title: string;
  content: string;
  summary: string;
  questions: Question[];
};

type Step = "input" | "summarized" | "quiz";

export default function Home() {
  const [step, setStep] = useState<Step>("input");
  const [article, setArticle] = useState<ArticleData | null>(null);

  async function handleGenerate(data: ArticleData) {
    await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setArticle(data);
    setStep("summarized");
  }

  return (
    <div>
      {step === "input" && <Quiz onGenerate={handleGenerate} />}
      {step === "summarized" && article && (
        <Summarized
          article={article}
          onTakeQuiz={() => setStep("quiz")}
          onBack={() => setStep("input")}
        />
      )}
      {step === "quiz" && article && (
        <QuickTest article={article} onBack={() => setStep("summarized")} />
      )}
    </div>
  );
}