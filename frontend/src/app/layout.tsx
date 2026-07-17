import type { Metadata } from "next";
import { Inter, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PublisherAI | AdSense-Ready Website Generation & Studio Platform",
  description: "AI-powered website generation platform creating production-ready websites using HTML5, CSS3, Vanilla JS, PHP, and MySQL aligned with Google AdSense technical & policy best practices.",
  keywords: ["PublisherAI", "AdSense Site Builder", "MonetizeAI", "AI Website Generator", "PHP Website Builder", "AdSense Readiness Audit"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${firaCode.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#060913] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
