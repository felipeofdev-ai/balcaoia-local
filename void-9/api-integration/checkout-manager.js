/**
 * Checkout / order bump / upsell — orquestração + templates de painel.
 */

import { logger } from "../lib/logger.js";

function panelRequired(action, template) {
  return {
    ok: false,
    code: "PANEL_REQUIRED",
    action,
    message:
      "Configure no painel Hotmart (Oferta → Checkout / Order bump / Upsell). A API pública deste app não cria checkout.",
    panelUrl: "https://app-vlc.hotmart.com/products",
    template,
  };
}

export async function configureCheckout(productId, config = {}) {
  logger.info("checkout.configure", { productId });
  return panelRequired("configureCheckout", {
    productId,
    guaranteeDays: config.guaranteeDays ?? 7,
    customFields: config.customFields || [],
    thankYouUrl: config.thankYouUrl,
  });
}

export async function addOrderBump(productId, orderBumpData) {
  return panelRequired("addOrderBump", { productId, ...orderBumpData });
}

export async function createUpsell(productId, upsellData) {
  return panelRequired("createUpsell", { productId, ...upsellData });
}

export async function createDownsell(productId, downsellData) {
  return panelRequired("createDownsell", { productId, ...downsellData });
}

export async function configurePixel(productId, pixelData) {
  return panelRequired("configurePixel", { productId, ...pixelData });
}

export async function getCheckoutLink(productId) {
  const map = {
    [process.env.HOTMART_PRODUCT_ID || ""]: process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL,
  };
  const fromEnv =
    process.env[`HOTMART_CHECKOUT_${productId}`] ||
    map[productId] ||
    process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL ||
    null;

  return {
    ok: Boolean(fromEnv && !String(fromEnv).includes("SEU_CHECKOUT")),
    productId,
    checkoutUrl: fromEnv,
    note: fromEnv
      ? "Link lido do ambiente. Substitua SEU_CHECKOUT pelo link real do painel."
      : "Defina NEXT_PUBLIC_HOTMART_CHECKOUT_URL após criar a oferta.",
  };
}

export default {
  configureCheckout,
  addOrderBump,
  createUpsell,
  createDownsell,
  configurePixel,
  getCheckoutLink,
};
