/**
 * LOTE 1 — produtos prontos para venda (Empire + Studio).
 * Comissão 50% nos flagships e micros J; valores ilustrativos — resultados variam.
 */

export type Lote1Product = {
  code: string;
  name: string;
  price: number;
  commissionPercent: number;
  /** Página no Studio, se existir */
  studioSlug?: string;
  /** Env var do checkout Hotmart (preencher após criar no painel) */
  checkoutEnvKey?: string;
  tier: "flagship" | "micro";
};

export const LOTE1_COMMISSION_PERCENT = 50;

export const LOTE1_FLAGSHIPS: Lote1Product[] = [
  {
    code: "A1",
    name: "WhatsApp Ético — Como Vender Mais Sem Spam",
    price: 67,
    commissionPercent: 50,
    studioSlug: "whatsapp-etico-negocios",
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_WHATSAPP_ETICO",
    tier: "flagship",
  },
  {
    code: "A2",
    name: "BalcãoIA Pro — Atendimento Inteligente com IA",
    price: 97,
    commissionPercent: 50,
    studioSlug: "checklist-atendimento-local",
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_BALCAOIA_PRO",
    tier: "flagship",
  },
  {
    code: "B1",
    name: "FOCO 14 — Método de Foco Profissional",
    price: 47,
    commissionPercent: 50,
    studioSlug: "foco-14",
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_FOCO14",
    tier: "flagship",
  },
  {
    code: "C2",
    name: "ChatGPT para Empreendedores",
    price: 57,
    commissionPercent: 50,
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_CHATGPT",
    tier: "flagship",
  },
  {
    code: "D1",
    name: "Instagram para Negócios Locais com IA",
    price: 77,
    commissionPercent: 50,
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_INSTAGRAM",
    tier: "flagship",
  },
  {
    code: "D3",
    name: "Google Meu Negócio Masterclass",
    price: 57,
    commissionPercent: 50,
    checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_GMN",
    tier: "flagship",
  },
];

/** Micro-produtos J1–J10 (tripwire R$ 7–14) */
export const LOTE1_MICROS: Lote1Product[] = [
  { code: "J1", name: "10 Prompts WhatsApp que Vendem", price: 9, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J1", tier: "micro" },
  { code: "J2", name: "Checklist IA em 1 Hora", price: 7, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J2", tier: "micro" },
  { code: "J3", name: "30 Posts Prontos com IA", price: 12, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J3", tier: "micro" },
  { code: "J4", name: "Template Atendimento Automático Ético", price: 14, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J4", tier: "micro" },
  { code: "J5", name: "Mini-Guia GMN 30 min", price: 9, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J5", tier: "micro" },
  { code: "J6", name: "40 Legendas Instagram por Segmento", price: 7, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J6", tier: "micro" },
  { code: "J7", name: "Calculadora de Preço Rápida", price: 9, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J7", tier: "micro" },
  { code: "J8", name: "15 Ideias de Reels por Segmento", price: 7, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J8", tier: "micro" },
  { code: "J9", name: "Template Bio Instagram Perfeita", price: 7, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J9", tier: "micro" },
  { code: "J10", name: "Pack 50 Hashtags por Nicho", price: 7, commissionPercent: 50, checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_J10", tier: "micro" },
];

export const LOTE1_ALL = [...LOTE1_FLAGSHIPS, ...LOTE1_MICROS];

export function commissionPerSale(price: number, percent: number): number {
  return Math.round((price * percent) / 100 * 100) / 100;
}
