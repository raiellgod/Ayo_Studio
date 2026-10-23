import type { Metadata } from "next";
import {
  Bitter,
  Cormorant_Garamond,
  Special_Elite,
} from "next/font/google";

import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ayô Studio de Artes",
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
      className={`${cormorantGaramond.variable} ${bitter.variable} ${specialElite.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}