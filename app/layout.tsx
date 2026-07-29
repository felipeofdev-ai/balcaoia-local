import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SITE } from "@/lib/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SEO_BASE = "https://balcaoialocal.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SEO_BASE),
  title: {
    default: "BalcãoIA — IA assistida e ética para negócios locais",
    template: "%s | BalcãoIA",
  },
  description:
    "Organize atendimento, catálogo, foco e operação do seu negócio local com o ecossistema BalcãoIA: diagnóstico gratuito, Método 7D, FOCO 14, WhatsApp ético e trilha de produtos digitais. Conteúdo educativo — sem promessa de renda.",
  keywords: [
    "IA negócio local Brasil",
    "atendimento WhatsApp ético",
    "organizar atendimento pequena empresa",
    "produtividade empreendedor solo",
    "transformação digital comércio local",
    "ChatGPT para empreendedores",
    "Google Meu Negócio negócio local",
    "Instagram negócios locais",
    "método balcãoia",
    "foco 14",
    "programa afiliados Hotmart",
    "automação ética WhatsApp",
  ],
  authors: [{ name: "BalcãoIA" }],
  creator: "BalcãoIA",
  publisher: "BalcãoIA",
  alternates: {
    canonical: SEO_BASE,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SEO_BASE,
    siteName: "BalcãoIA",
    title: "BalcãoIA — IA assistida e ética para negócios locais",
    description:
      "Diagnóstico gratuito, ecossistema de produtos e Studio para organizar atendimento, foco e operação no balcão — com revisão humana e sem automação arriscada.",
    images: [
      {
        url: `${SEO_BASE}/logo.png`,
        width: 512,
        height: 512,
        alt: "BalcãoIA — negócios locais com IA ética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BalcãoIA",
    description:
      "Organize atendimento e operação do negócio local com IA assistida, ética e trilha educativa completa.",
    images: [`${SEO_BASE}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BalcãoIA",
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description:
    "Inteligência artificial assistida e ética para negócios locais brasileiros. Conteúdo educativo — sem promessa de renda.",
  email: SITE.supportEmail,
  foundingDate: "2026",
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Portuguese",
    email: SITE.supportEmail,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
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
