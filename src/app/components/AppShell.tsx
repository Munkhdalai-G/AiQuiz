"use client";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ArticleData } from "../page";
import Summarized from "./Summarized";
import QuickTest from "./quickTest";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ArticleData | null>(null);
  const [step, setStep] = useState<"summarized" | "quiz">("summarized");

  function handleSelectArticle(article: ArticleData) {
    setSelected(article);
    setStep("summarized");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <AppSidebar onSelectArticle={handleSelectArticle} />
        <main className="flex-1 p-4">
          {selected ? (
            <>
              {step === "summarized" && (
                <Summarized
                  article={selected}
                  onTakeQuiz={() => setStep("quiz")}
                  onBack={() => setSelected(null)}
                />
              )}
              {step === "quiz" && (
                <QuickTest
                  article={selected}
                  onBack={() => setStep("summarized")}
                />
              )}
            </>
          ) : (
            children
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}