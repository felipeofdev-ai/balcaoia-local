/**
 * URLs e IDs Hotmart — centralize aqui antes do lançamento.
 * Preencha após criar o produto no painel Hotmart.
 */

export const HOTMART = {
  /** ID numérico do produto no Hotmart */
  productId: process.env.NEXT_PUBLIC_HOTMART_PRODUCT_ID || process.env.HOTMART_PRODUCT_ID || "",
  /** URL de checkout (substitua pelo link real) */
  checkoutUrl:
    process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL ||
    "https://pay.hotmart.com/SEU_CHECKOUT",
  /** Link base de afiliado (substitua pelo seu) */
  affiliateBaseUrl:
    process.env.NEXT_PUBLIC_HOTMART_AFFILIATE_URL ||
    "https://hotmart.com/pt-br/marketplace/produtos/balcaoia-local",
  /** Webhook path no nosso app */
  webhookPath: "/api/webhooks/hotmart",
  /** Comissão sugerida para afiliados (%) */
  affiliateCommissionPercent: 50,
  /** Garantia comunicada (dias) */
  guaranteeDays: 7,
  /** Nome do produto na Hotmart */
  productName: "BalcãoIA Local — Método 7D + Studio",
} as const;

export const HOTMART_COMPLIANCE_RULES = [
  "Não prometa renda, lucro ou vendas garantidas.",
  "Não diga que o produto é oficial da Meta, WhatsApp, Google ou Hotmart.",
  "Não use logos da Hotmart/Meta/WhatsApp no nome de páginas, perfis ou anúncios.",
  "Não faça spam, disparo em massa ou compra de listas.",
  "Não ensine nem sugira automações não oficiais (QR Code, Baileys, etc.).",
  "Reproduza fielmente preço, garantia e o que o aluno recebe.",
  "Use sempre o link oficial de afiliado com UTM.",
  "Respeite LGPD: só contate quem consentiu.",
] as const;
