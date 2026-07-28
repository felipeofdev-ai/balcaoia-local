/**
 * Afiliados — templates de painel + leituras via sales quando possível.
 */

import { hotmartClient } from "../lib/hotmart-client.js";
import { logger } from "../lib/logger.js";

function panelRequired(action, template) {
  return {
    ok: false,
    code: "PANEL_REQUIRED",
    action,
    message:
      "Aprovação/comissão de afiliados: configure no painel Hotmart (Afiliados do produto).",
    panelUrl: "https://app-vlc.hotmart.com/",
    template,
  };
}

export async function listAffiliates(productId) {
  logger.info("affiliate.list", { productId });
  // Histórico de vendas pode trazer dados de afiliado dependendo do escopo
  try {
    const sales = await hotmartClient.get("sales/history", {
      product_id: productId,
      max_results: 50,
    });
    return {
      ok: true,
      productId,
      source: "sales/history",
      sales,
      note: "Lista operacional via vendas. Gestão completa no painel.",
    };
  } catch (error) {
    return {
      ok: false,
      productId,
      error: error.message,
      hint: "Verifique escopos da credencial Hotmart Developers.",
    };
  }
}

export async function approveAffiliate(productId, affiliateId) {
  return panelRequired("approveAffiliate", { productId, affiliateId });
}

export async function rejectAffiliate(productId, affiliateId, reason) {
  return panelRequired("rejectAffiliate", { productId, affiliateId, reason });
}

export async function setCommission(productId, affiliateId, rate) {
  return panelRequired("setCommission", { productId, affiliateId, rate });
}

export async function getAffiliateStats(productId, affiliateId) {
  const sales = await hotmartClient.get("sales/history", {
    product_id: productId,
    max_results: 100,
  });
  return { ok: true, productId, affiliateId, sales };
}

export async function generateAffiliateLink(productId, affiliateId) {
  const base =
    process.env.NEXT_PUBLIC_HOTMART_AFFILIATE_URL ||
    "https://hotmart.com/pt-br/marketplace/produtos/balcaoia-local";
  return {
    ok: true,
    productId,
    affiliateId,
    link: `${base}?aff=${encodeURIComponent(affiliateId || "")}`,
    note: "Use o link oficial gerado no painel do afiliado quando disponível.",
  };
}

export async function listTopAffiliates(productId, limit = 10) {
  const sales = await hotmartClient.get("sales/history", {
    product_id: productId,
    max_results: Math.min(Number(limit) * 5, 100),
  });
  return { ok: true, productId, limit, sales };
}

export default {
  listAffiliates,
  approveAffiliate,
  rejectAffiliate,
  setCommission,
  getAffiliateStats,
  generateAffiliateLink,
  listTopAffiliates,
};
