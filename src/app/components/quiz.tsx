"use client";
import { ScrollText, Sparkles } from "lucide-react";
import { useState } from "react";
import { ArticleData } from "../page";

export default function Quiz({ onGenerate }: { onGenerate: (data: ArticleData) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!title || !content) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    setLoading(false);
    onGenerate({ title, content, ...data });
  }

  return (
    <div className="flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md">
      <div className="flex items-center text-3xl">
        <Sparkles />
        Article Quiz Generator
      </div>
      <p className="text-gray-400 text-xl">
        Paste your article below to generate a summary and quiz questions. Your
        articles will be saved in the sidebar for future reference.
      </p>
      <div className="flex items-center text-xl text-gray-700">
        <ScrollText />
        Article Title
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for your article..."
        className="w-full h-10 border border-gray-200 rounded-xs pl-4"
      />
      <div className="flex items-center text-xl text-gray-700">
        <ScrollText />
        Article Content
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your article content here..."
        className="w-full h-40 border border-gray-200 rounded-xs pl-4 pt-2 resize-none"
      />
      <div className="w-full flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={loading || !title || !content}
          className="w-40 h-10 mt-3 rounded-md bg-gray-400 text-white items-center flex justify-center border disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>
    </div>
  );
}