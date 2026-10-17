import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANTI MANUSIA PROJECT | Visual Storyteller",
  description: "Portfolio Reydysta Pradana Krisna Mukti - videographer, director, dan visual storyteller.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
