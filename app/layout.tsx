import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Casa — Flores, encontros e delicadezas",
  description: "Bem-vindo à La Casa, um lugar para sentir.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
