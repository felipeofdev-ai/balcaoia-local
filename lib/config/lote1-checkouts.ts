/**
 * Checkouts reais LOTE 1 — fontes: hotmart-factory/logs/produtos-criados.json
 * Nunca inventar URLs. Aliases mapeiam slug Hotmart → slug Studio.
 */
export const LOTE1_CHECKOUTS: Record<string, string> = {
  "10-prompts-whatsapp-vendem": "https://pay.hotmart.com/L106925146Q",
  "checklist-ia-1-hora": "https://pay.hotmart.com/M106925563V",
  "30-posts-prontos-ia": "https://pay.hotmart.com/H106926380Y",
  "template-atendimento-automatico": "https://pay.hotmart.com/T106926591V",
  "mini-guia-gmn-30min": "https://pay.hotmart.com/P106926720K",
  "20-legendas-instagram": "https://pay.hotmart.com/T106926801C",
  "calculadora-preco-rapida": "https://pay.hotmart.com/S106926102D",
  "15-ideias-reels-segmento": "https://pay.hotmart.com/B106926872H",
  "template-bio-instagram": "https://pay.hotmart.com/U106926929L",
  "pack-50-hashtags-nicho": "https://pay.hotmart.com/J106927000T",
  "whatsapp-etico": "https://pay.hotmart.com/D106927075P",
  "whatsapp-etico-negocios": "https://pay.hotmart.com/D106927075P",
  "balcaoia-pro": "https://pay.hotmart.com/A106927145W",
  "checklist-atendimento-local": "https://pay.hotmart.com/A106927145W",
  "foco-14": "https://pay.hotmart.com/Q106926271V",
  "chatgpt-empreendedores": "https://pay.hotmart.com/D106927243G",
  "instagram-negocios-locais-ia": "https://pay.hotmart.com/M106927276N",
  "google-meu-negocio-masterclass": "https://pay.hotmart.com/X106927314R",
};

/** Slug Hotmart / alias → slug canônico no Studio (void9 / páginas) */
export const LOTE1_SLUG_ALIASES: Record<string, string> = {
  "whatsapp-etico": "whatsapp-etico-negocios",
  "balcaoia-pro": "checklist-atendimento-local",
};

export function resolveLote1Checkout(slug: string): string | null {
  return LOTE1_CHECKOUTS[slug] ?? null;
}

export function resolveStudioSlug(slug: string): string {
  return LOTE1_SLUG_ALIASES[slug] ?? slug;
}
