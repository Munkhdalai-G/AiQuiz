"use client";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ArticleData } from "../page";
import QuickTest from "./quickTest";

type ModalState = {
  id: string;
  article: ArticleData;
} | null;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);
  const [selected, setSelected] = useState<ArticleData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep] = useState<"summarized" | "quiz">("summarized");

  function handleSelectArticle(article: ArticleData, id: string) {
    setModal({ id, article });
  }

  function handleStartQuiz() {
    if (!modal) return;
    setSelected(modal.article);
    setSelectedId(modal.id);
    setStep("quiz");
    setModal(null);
  }

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
        <AppSidebar onSelectArticle={handleSelectArticle} />
        <main className="flex-1 p-4 overflow-y-auto">
          {selected && step === "quiz" ? (
            <QuickTest
              article={selected}
              articleId={selectedId ?? undefined}
              onBack={() => {
                setSelected(null);
                setSelectedId(null);
              }}
            />
          ) : (
            children
          )}
        </main>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-xl mx-4 p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold">{modal.article.title}</h2>
              <button
                onClick={() => setModal(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Summary</p>
              <p className="text-sm text-gray-700">{modal.article.summary}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Article Content</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{modal.article.content}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handleStartQuiz}
                className="px-4 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-700"
              >
                Take a quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}