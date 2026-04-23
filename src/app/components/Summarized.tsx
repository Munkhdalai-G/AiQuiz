import { BookOpen, Sparkles } from "lucide-react";
import { ArticleData } from "../page";

export default function Summarized({
  article,
  onTakeQuiz,
  onBack,
}: {
  article: ArticleData;
  onTakeQuiz: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md">
      <div className="flex items-center text-3xl">
        <Sparkles />
        Article Quiz Generator
      </div>
      <div className="flex gap-2">
        <BookOpen />
        Summarized content
      </div>
      <h1 className="text-xl font-semibold">{article.title}</h1>
      <div className="text-gray-700">{article.summary}</div>
      <div className="flex justify-between w-full">
        <button
          onClick={onBack}
          className="w-40 h-10 mt-3 rounded-md bg-gray-400 text-white items-center flex justify-center border"
        >
          See content
        </button>
        <button
          onClick={onTakeQuiz}
          className="w-40 h-10 mt-3 rounded-md bg-gray-800 text-white items-center flex justify-center border"
        >
          Take a quiz
        </button>
      </div>
    </div>
  );
}