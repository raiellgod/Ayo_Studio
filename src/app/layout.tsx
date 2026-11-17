import type { Metadata } from "next";

import { BackendWakeNotice } from "@/components/system/BackendWakeNotice";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ayô Studio",
  description: "Tattoo, arte e design autoral.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <BackendWakeNotice />
      </body>
    </html>
  );
}
