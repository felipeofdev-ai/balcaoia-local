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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "BalcãoIA Local — Organize o atendimento do seu negócio",
    template: "%s | BalcãoIA Local",
  },
  description:
    "Organize atendimento, catálogo e foco no negócio local com IA assistida e ética. Diagnóstico gratuito. Sem promessa de renda.",
  keywords: [
    "atendimento negócio local",
    "IA para pequenas empresas",
    "WhatsApp atendimento ético",
    "organizar atendimento",
    "produtividade empreendedor solo",
    "método balcãoia",
    "foco 14",
  ],
  authors: [{ name: "BalcãoIA" }],
  creator: "BalcãoIA",
  publisher: "BalcãoIA",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: "BalcãoIA Local",
    title: "BalcãoIA Local — Organize o atendimento do seu negócio",
    description:
      "Diagnóstico, trilha de produtos e Studio para organizar o balcão com IA assistida — sem gambiarra.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "BalcãoIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BalcãoIA Local",
    description: "Organize o atendimento do seu negócio local com clareza e ética.",
    images: ["/logo.png"],
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
  name: "BalcãoIA Local",
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description: "Organização de atendimento e IA assistida para negócios locais.",
  email: SITE.supportEmail,
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
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
