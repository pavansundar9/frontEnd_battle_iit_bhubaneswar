import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowMind — AI Automation, Orchestrated",
  description:
    "Build, deploy, and scale AI agents that automate your critical workflows. From solo builders to enterprise teams.",
  openGraph: {
    title: "FlowMind — AI Automation, Orchestrated",
    description:
      "Build, deploy, and scale AI agents that automate your critical workflows.",
    images: "/og-image.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-noir text-powder font-sans antialiased">
        {children}
      </body>
    </html>
  );
}