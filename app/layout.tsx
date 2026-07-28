import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "BalcãoIA Local — Organize o atendimento do seu negócio",
    template: "%s | BalcãoIA Local",
  },
  description:
    "Descubra em minutos onde seu atendimento perde vendas e receba roteiros prontos para organizar seu negócio local. Diagnóstico gratuito.",
  keywords: [
    "atendimento ao cliente",
    "negócio local",
    "roteiro de vendas",
    "atendimento WhatsApp",
    "diagnóstico de atendimento",
  ],
  authors: [{ name: "BalcãoIA" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "BalcãoIA Local",
    title: "BalcãoIA Local — Organize o atendimento do seu negócio",
    description:
      "Descubra em minutos onde seu atendimento perde vendas e receba roteiros prontos para organizar seu negócio local.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
