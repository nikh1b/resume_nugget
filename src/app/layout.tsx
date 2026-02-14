import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const maxDuration = 60; // Global timeout for Server Actions & Pages

import { Toaster } from "@/components/ui/sonner";
import { GoldenBot } from "@/components/ai/GoldenBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Nugget | AI-Powered Resume Builder",
  description: "Build ATS-optimized resumes with Gemini AI. Free, open-source, and developer-friendly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
        <GoldenBot />
        <Toaster />
      </body>
    </html>
  );
}
