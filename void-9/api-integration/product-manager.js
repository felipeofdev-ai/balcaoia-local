/**
 * Product manager — Hotmart.
 *
 * A API pública de Developers (payments) é orientada a LEITURA de vendas.
 * Criação de produto, preço de oferta, cupons e order bump normalmente
 * exigem o painel Hotmart. Este módulo:
 * 1) Tenta endpoints de leitura documentados quando aplicável
 * 2) Retorna templates + instruções PANEL_REQUIRED para ações de escrita
 */

import { hotmartClient } from "../lib/hotmart-client.js";
import { logger } from "../lib/logger.js";

function panelRequired(action, template) {
  return {
    ok: false,
    code: "PANEL_REQUIRED",
    action,
    message:
      "Esta ação não está disponível via API pública neste app. Execute no painel Hotmart e use o template retornado.",
    panelUrl: "https://app-vlc.hotmart.com/products",
    template,
  };
}

export async function createProduct(data) {
  logger.info("product.create.requested", { name: data?.name });
  return panelRequired("createProduct", {
    name: data?.name,
    description: data?.description,
    priceBRL: data?.price,
    category: data?.category,
    format: data?.format || "digital",
    guaranteeDays: data?.guaranteeDays ?? 7,
    note: "Criar produto no painel → copiar ID e checkout URL para .env",
  });
}

export async function updateProduct(productId, data) {
  logger.info("product.update.requested", { productId });
  return panelRequired("updateProduct", { productId, ...data });
}

export async function getProduct(productId) {
  // Fallback: filtrar vendas pelo productId para confirmar existência operacional
  const sales = await hotmartClient.get("sales/history", {
    product_id: productId,
    max_results: 1,
  });
  return {
    ok: true,
    productId,
    evidenceFromSales: sales,
    note: "Detalhe completo do produto continua no painel Hotmart.",
  };
}

export async function listProducts() {
  // Não há listagem universal estável em todos os apps; use env + sales.
  const configured = (process.env.HOTMART_PRODUCT_IDS || process.env.HOTMART_PRODUCT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    ok: true,
    products: configured.map((id) => ({ id, source: "env" })),
    note: "Cadastre HOTMART_PRODUCT_IDS no .env. Criação continua no painel.",
  };
}

export async function setProductPrice(productId, price, currency = "BRL") {
  return panelRequired("setProductPrice", { productId, price, currency });
}

export async function createCoupon(productId, couponData) {
  return panelRequired("createCoupon", { productId, ...couponData });
}

export async function listCoupons(productId) {
  return panelRequired("listCoupons", { productId });
}

export default {
  createProduct,
  updateProduct,
  getProduct,
  listProducts,
  setProductPrice,
  createCoupon,
  listCoupons,
};
