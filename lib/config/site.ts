/**
 * Configuração de site / domínio / mídia — produção.
 * Domínio: balcaoialocal.com.br | Fallback Vercel enquanto DNS propaga.
 */

const PROD_FALLBACK = "https://balcaoia-studio.vercel.app";

export const SITE = {
  name: "BalcãoIA Local",
  appName: "BalcãoIA Studio",
  methodName: "Método BalcãoIA 7D",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "balcaoialocal.com.br",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    PROD_FALLBACK
  ).replace(/\/$/, ""),
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "contato@balcaoialocal.com.br",
  media: {
    salesVslEmbedUrl: process.env.NEXT_PUBLIC_VSL_VENDAS_URL || "",
    freeClassEmbedUrl: process.env.NEXT_PUBLIC_VSL_AULA_URL || "",
    demoStudioEmbedUrl: process.env.NEXT_PUBLIC_DEMO_STUDIO_URL || "",
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },
  routes: {
    home: "/",
    sales: "/vendas",
    checklist: "/checklist",
    diagnostic: "/diagnostico",
    affiliates: "/afiliados",
    thankYou: "/obrigado",
    login: "/app/login",
    studio: "/app/dashboard",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
