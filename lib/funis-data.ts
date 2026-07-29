/**
 * Funis LOTE 1 — upsell/downsell com checkouts reais.
 * Sem preços inventados de ofertas inexistentes: usa hotlink do produto relacionado.
 * Compliance: sem promessa de renda; copy educativa.
 */
import { LOTE1_CHECKOUTS, resolveStudioSlug } from "@/lib/config/lote1-checkouts";

export type FunilStep = {
  slug: string;
  studioSlug: string;
  title: string;
  description: string;
  /** Preço de referência do catálogo (não é oferta especial inventada) */
  priceRef: number;
  checkoutUrl: string;
};

export type FunilData = {
  slug: string;
  studioSlug: string;
  name: string;
  upsell: FunilStep;
  downsell: FunilStep;
};

function ck(slug: string): string {
  return LOTE1_CHECKOUTS[slug] || "#";
}

function step(
  slug: string,
  title: string,
  description: string,
  priceRef: number
): FunilStep {
  const studioSlug = resolveStudioSlug(slug);
  return {
    slug,
    studioSlug,
    title,
    description,
    priceRef,
    checkoutUrl: ck(slug) || ck(studioSlug),
  };
}

/** Chaves = slug Hotmart + aliases Studio */
export const FUNIS_DATA: Record<string, FunilData> = {
  "10-prompts-whatsapp-vendem": {
    slug: "10-prompts-whatsapp-vendem",
    studioSlug: "10-prompts-whatsapp-vendem",
    name: "10 Prompts WhatsApp que Vendem",
    upsell: step(
      "whatsapp-etico",
      "Próximo passo: WhatsApp Ético",
      "Organize templates e toques éticos — conteúdo educativo, sem spam.",
      67
    ),
    downsell: step(
      "template-atendimento-automatico",
      "Ou o Template de Atendimento",
      "Estrutura simples para organizar respostas frequentes.",
      14
    ),
  },
  "checklist-ia-1-hora": {
    slug: "checklist-ia-1-hora",
    studioSlug: "checklist-ia-1-hora",
    name: "Checklist IA em 1 Hora",
    upsell: step(
      "balcaoia-pro",
      "Aprofunde: BalcãoIA Pro",
      "Mais prompts para atendimento com revisão humana.",
      97
    ),
    downsell: step(
      "template-atendimento-automatico",
      "Template de Atendimento",
      "Comece pelo fluxo básico de respostas.",
      14
    ),
  },
  "30-posts-prontos-ia": {
    slug: "30-posts-prontos-ia",
    studioSlug: "30-posts-prontos-ia",
    name: "30 Posts Prontos com IA",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Rotina completa de Instagram local",
      "Pilares, rascunhos e revisão — sem promessa de viral.",
      77
    ),
    downsell: step(
      "15-ideias-reels-segmento",
      "15 Ideias de Reels",
      "Roteiros curtos para gravar com celular.",
      7
    ),
  },
  "template-atendimento-automatico": {
    slug: "template-atendimento-automatico",
    studioSlug: "template-atendimento-automatico",
    name: "Template Atendimento Automático",
    upsell: step("balcaoia-pro", "BalcãoIA Pro", "Amplie prompts de atendimento.", 97),
    downsell: step("checklist-ia-1-hora", "Checklist IA 1 hora", "Primeiro teste organizado.", 7),
  },
  "mini-guia-gmn-30min": {
    slug: "mini-guia-gmn-30min",
    studioSlug: "mini-guia-gmn-30min",
    name: "Mini-Guia Google Meu Negócio",
    upsell: step(
      "google-meu-negocio-masterclass",
      "Masterclass Google Meu Negócio",
      "Checklist e manutenção — sem ranking milagroso.",
      57
    ),
    downsell: step("20-legendas-instagram", "20 Legendas Instagram", "Textos para adaptar.", 7),
  },
  "20-legendas-instagram": {
    slug: "20-legendas-instagram",
    studioSlug: "20-legendas-instagram",
    name: "20 Legendas Instagram",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Instagram para negócios locais",
      "Estratégia + templates com IA como rascunho.",
      77
    ),
    downsell: step("15-ideias-reels-segmento", "15 Ideias de Reels", "Roteiros práticos.", 7),
  },
  "calculadora-preco-rapida": {
    slug: "calculadora-preco-rapida",
    studioSlug: "calculadora-preco-rapida",
    name: "Calculadora de Preço",
    upsell: step("foco-14", "FOCO 14", "Protocolo de 14 dias com evidência.", 47),
    downsell: step("checklist-ia-1-hora", "Checklist IA", "Organização em 1 hora.", 7),
  },
  "15-ideias-reels-segmento": {
    slug: "15-ideias-reels-segmento",
    studioSlug: "15-ideias-reels-segmento",
    name: "15 Ideias de Reels",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Instagram negócios locais",
      "Da ideia solta à rotina.",
      77
    ),
    downsell: step("20-legendas-instagram", "20 Legendas", "Textos para posts/Reels.", 7),
  },
  "template-bio-instagram": {
    slug: "template-bio-instagram",
    studioSlug: "template-bio-instagram",
    name: "Template Bio Instagram",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Instagram negócios locais",
      "Bio + conteúdo + CTA.",
      77
    ),
    downsell: step("20-legendas-instagram", "20 Legendas", "Complemento rápido.", 7),
  },
  "pack-50-hashtags-nicho": {
    slug: "pack-50-hashtags-nicho",
    studioSlug: "pack-50-hashtags-nicho",
    name: "Pack 50 Hashtags",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Instagram negócios locais",
      "Hashtags dentro de uma rotina.",
      77
    ),
    downsell: step("15-ideias-reels-segmento", "15 Ideias de Reels", "Conteúdo para postar.", 7),
  },
  "whatsapp-etico": {
    slug: "whatsapp-etico",
    studioSlug: "whatsapp-etico-negocios",
    name: "WhatsApp Ético",
    upsell: step("balcaoia-pro", "BalcãoIA Pro", "IA no atendimento com revisão.", 97),
    downsell: step(
      "10-prompts-whatsapp-vendem",
      "10 Prompts WhatsApp",
      "Micro-guia de prompts.",
      9
    ),
  },
  "whatsapp-etico-negocios": {
    slug: "whatsapp-etico",
    studioSlug: "whatsapp-etico-negocios",
    name: "WhatsApp Ético",
    upsell: step("balcaoia-pro", "BalcãoIA Pro", "IA no atendimento com revisão.", 97),
    downsell: step(
      "10-prompts-whatsapp-vendem",
      "10 Prompts WhatsApp",
      "Micro-guia de prompts.",
      9
    ),
  },
  "balcaoia-pro": {
    slug: "balcaoia-pro",
    studioSlug: "checklist-atendimento-local",
    name: "BalcãoIA Pro",
    upsell: step("whatsapp-etico", "WhatsApp Ético", "Protocolo ético de conversa.", 67),
    downsell: step(
      "template-atendimento-automatico",
      "Template Atendimento",
      "Fluxo básico.",
      14
    ),
  },
  "checklist-atendimento-local": {
    slug: "balcaoia-pro",
    studioSlug: "checklist-atendimento-local",
    name: "BalcãoIA Pro",
    upsell: step("whatsapp-etico", "WhatsApp Ético", "Protocolo ético de conversa.", 67),
    downsell: step(
      "template-atendimento-automatico",
      "Template Atendimento",
      "Fluxo básico.",
      14
    ),
  },
  "foco-14": {
    slug: "foco-14",
    studioSlug: "foco-14",
    name: "FOCO 14",
    upsell: step("whatsapp-etico", "WhatsApp Ético", "Conversa organizada no WhatsApp.", 67),
    downsell: step("calculadora-preco-rapida", "Calculadora de Preço", "Clareza de oferta.", 9),
  },
  "chatgpt-empreendedores": {
    slug: "chatgpt-empreendedores",
    studioSlug: "chatgpt-empreendedores",
    name: "ChatGPT para Empreendedores",
    upsell: step("balcaoia-pro", "BalcãoIA Pro", "IA no atendimento local.", 97),
    downsell: step("checklist-ia-1-hora", "Checklist IA 1 hora", "Primeiro teste.", 7),
  },
  "instagram-negocios-locais-ia": {
    slug: "instagram-negocios-locais-ia",
    studioSlug: "instagram-negocios-locais-ia",
    name: "Instagram Negócios Locais",
    upsell: step("whatsapp-etico", "WhatsApp Ético", "Do interesse à conversa ética.", 67),
    downsell: step("30-posts-prontos-ia", "30 Posts Prontos", "Conteúdo para adaptar.", 12),
  },
  "google-meu-negocio-masterclass": {
    slug: "google-meu-negocio-masterclass",
    studioSlug: "google-meu-negocio-masterclass",
    name: "Google Meu Negócio Masterclass",
    upsell: step(
      "instagram-negocios-locais-ia",
      "Instagram negócios locais",
      "Presença além do Maps.",
      77
    ),
    downsell: step("mini-guia-gmn-30min", "Mini-Guia GMN 30 min", "Ajustes rápidos.", 9),
  },
};

export function getFunil(slug: string): FunilData | null {
  return FUNIS_DATA[slug] ?? FUNIS_DATA[resolveStudioSlug(slug)] ?? null;
}

export function getAllFunilSlugs(): string[] {
  return Object.keys(FUNIS_DATA);
}
