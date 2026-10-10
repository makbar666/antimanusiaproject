import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pamerporto | Website portfolio yang terasa seperti kamu",
  description: "Contoh website portfolio untuk personal branding, lamaran kerja, dan showcase karya.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
