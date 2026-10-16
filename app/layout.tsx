
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selin Durmaz | Veri Analizi Portfolyosu",
  description:
    "Selin Durmaz'ın veri analizi, Python, SQL ve makine öğrenmesi projeleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
