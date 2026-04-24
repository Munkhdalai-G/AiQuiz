"use client";
import { Sparkles, RotateCcw, Bookmark, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { ArticleData } from "../page";

export default function QuickTest({
  article,
  articleId,
  onBack,
}: {
  article: ArticleData;
  articleId?: string;
  onBack: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<{
    selected: number;
    correct: number;
    question: string;
    answers: string[];
  }[]>([]);

  const q = article.questions[current];
  const total = article.questions.length;

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    setAnswers((prev) => [
      ...prev,
      { selected: selected!, correct: q.correct, question: q.question, answers: q.answers },
    ]);
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  }

  async function handleSaveAndLeave() {
    if (articleId) {
      await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, score, total }),
      });
    }
    onBack();
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center mt-10 px-4">
        <div className="w-full max-w-xl mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles size={28} />
            Quiz completed
          </div>
          <p className="text-gray-400 mt-1">Let's see what you did</p>
        </div>

        <div className="w-full max-w-xl border rounded-xl px-8 py-6 flex flex-col gap-5">
          <div className="text-2xl font-bold">
            Your score: <span className="text-3xl">{score}</span>
            <span className="text-gray-400 font-normal text-xl"> / {total}</span>
          </div>

          <div className="flex flex-col gap-5">
            {answers.map((a, i) => {
              const isCorrect = a.selected === a.correct;
              return (
                <div key={i} className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 size={22} className="text-green-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle size={22} className="text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-gray-600">{i + 1}. {a.question}</p>
                    <p className="text-sm font-semibold">Your answer: {a.answers[a.selected]}</p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600">Correct: {a.answers[a.correct]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleRestart}
              className="flex-1 h-11 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Restart quiz
            </button>
            <button
              onClick={handleSaveAndLeave}
              className="flex-1 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-700"
            >
              <Bookmark size={16} />
              Save and leave
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-3 text-xl">
          <Sparkles />
          Quick Test
        </div>
        <button onClick={onBack} className="text-gray-400 text-sm">← Back</button>
      </div>

      <div className="border w-full mt-5">
        <div className="flex items-center justify-between mx-10">
          <h1 className="py-5 text-lg">{q.question}</h1>
          <div className="text-gray-500">{current + 1}/{total}</div>
        </div>
        <div className="flex flex-col gap-3 mx-10 mb-5">
          <div className="flex gap-3">
            {q.answers.slice(0, 2).map((a, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`border w-full py-2 rounded transition-colors ${
                  selected === null ? "hover:bg-gray-100" :
                  i === q.correct ? "bg-green-200 border-green-500" :
                  selected === i ? "bg-red-200 border-red-500" : ""
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            {q.answers.slice(2, 4).map((a, i) => (
              <button
                key={i + 2}
                onClick={() => handleAnswer(i + 2)}
                className={`border w-full py-2 rounded transition-colors ${
                  selected === null ? "hover:bg-gray-100" :
                  i + 2 === q.correct ? "bg-green-200 border-green-500" :
                  selected === i + 2 ? "bg-red-200 border-red-500" : ""
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {selected !== null && (
          <div className="flex justify-end mx-10 mb-5">
            <button
              onClick={handleNext}
              className="w-32 h-10 rounded-md bg-gray-800 text-white"
            >
              {current + 1 >= total ? "Finish" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}