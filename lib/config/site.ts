/**
 * Configuração de site / domínio / mídia — pronto para produção.
 * Domínio registrado: balcaoialocal.com.br (Registro.br)
 */

export const SITE = {
  name: "BalcãoIA Local",
  appName: "BalcãoIA Studio",
  methodName: "Método BalcãoIA 7D",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "balcaoialocal.com.br",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "contato@balcaoialocal.com.br",
  /** Cole IDs de vídeo (YouTube/Vimeo/Panda) quando tiver a VSL final */
  media: {
    salesVslEmbedUrl: process.env.NEXT_PUBLIC_VSL_VENDAS_URL || "",
    freeClassEmbedUrl: process.env.NEXT_PUBLIC_VSL_AULA_URL || "",
    demoStudioEmbedUrl: process.env.NEXT_PUBLIC_DEMO_STUDIO_URL || "",
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
