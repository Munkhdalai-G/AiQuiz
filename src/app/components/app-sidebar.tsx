"use client";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import { ArticleData } from "../page";

type HistoryItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  questions: {
    text: string;
    order: number;
    answers: { text: string; isCorrect: boolean }[];
  }[];
};

export function AppSidebar({ onSelectArticle }: { onSelectArticle?: (article: ArticleData) => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then(setHistory)
      .catch(console.error);
  }, []);

  function handleClick(item: HistoryItem) {
    if (!onSelectArticle) return;
    onSelectArticle({
      title: item.title,
      summary: item.summary,
      content: item.content,
      questions: item.questions
        .sort((a, b) => a.order - b.order)
        .map((q) => ({
          question: q.text,
          answers: q.answers.map((a) => a.text),
          correct: q.answers.findIndex((a) => a.isCorrect),
        })),
    });
  }

  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarHeader className="flex-row items-center justify-between px-2 py-2">
        <span className="group-data-[state=collapsed]:hidden text-sm font-semibold">
          History
        </span>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="px-2 py-2 flex flex-col gap-2">
        {history.length === 0 && (
          <p className="text-xs text-gray-400 group-data-[state=collapsed]:hidden px-2">
            No history yet
          </p>
        )}
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className="group-data-[state=collapsed]:hidden flex items-start gap-2 text-left p-2 rounded hover:bg-gray-100 w-full"
          >
            <BookOpen size={16} className="mt-1 shrink-0 text-gray-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}