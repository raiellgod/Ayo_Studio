import type { Metadata } from "next";
import { Architects_Daughter, Sora } from "next/font/google";

import "./globals.css";

const architectsDaughter = Architects_Daughter({
  variable: "--font-architects-daughter",
  subsets: ["latin"],
  weight: "400",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYŌ Studio",
  description: "Tattoo, arte e design autoral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${architectsDaughter.variable} ${sora.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}