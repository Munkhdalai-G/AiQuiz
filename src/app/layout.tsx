import type { Metadata } from "next";
import {
  ClerkProvider,
  
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";
import AuthButtons from "./components/AuthButtons";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "AI Quiz Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
        >
          <header className="w-full flex justify-between items-center p-4 gap-4 h-16 border-b border-gray-300 shrink-0 z-50 bg-white">
            <span className="font-bold text-lg">Quiz app</span>
            <AuthButtons />
          </header>
          <div className="flex-1 overflow-hidden">
            <AppShell>{children}</AppShell>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
