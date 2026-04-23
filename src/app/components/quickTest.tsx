"use client";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { ArticleData } from "../page";

export default function QuickTest({
  article,
  onBack,
}: {
  article: ArticleData;
  onBack: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = article.questions[current];
  const total = article.questions.length;

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  if (finished) {
    return (
      <div className="flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md items-center">
        <Sparkles size={40} />
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-xl">You scored {score} out of {total}</p>
        <button
          onClick={onBack}
          className="w-40 h-10 mt-3 rounded-md bg-gray-800 text-white flex justify-center items-center"
        >
          Back to Summary
        </button>
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