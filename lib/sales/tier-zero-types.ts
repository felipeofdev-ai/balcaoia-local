/** Shared types for Tier Zero sales UI */
export type TierZeroColors = {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
};

export type TierZeroProduct = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  badge: string;
  headline: string;
  subheadline: string;
  price: number;
  /** Âncora educativa (referência), não “preço de mercado comprovado” */
  anchorPrice: number;
  installments: number;
  guaranteeDays: number;
  checkoutUrl: string;
  colors: TierZeroColors;
  ctaText: string;
  problem: { title: string; subtitle: string; items: string[] };
  solution: {
    title: string;
    description: string;
    features: Array<{ icon: string; title: string; desc: string }>;
  };
  modules: Array<{ number: string; title: string; items: string[] }>;
  bonuses: Array<{ icon: string; title: string; description: string; value: number }>;
  faqs: Array<{ q: string; a: string }>;
  /** Prova social honesta — sem nomes fictícios */
  socialProofLine: string;
  finalCtaTitle: string;
  coverSrc?: string;
};
