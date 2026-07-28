/**
 * Handlers de eventos webhook Hotmart (lógica de domínio).
 * Persistência completa no Studio: lib/hotmart/webhook-parser.ts
 */

import { logger } from "../lib/logger.js";
import { triggerWelcomeSequence, triggerWinbackSequence } from "./email-automation.js";

/** @type {Array<Record<string, unknown>>} */
const memoryStore = [];

function push(entry) {
  memoryStore.unshift(entry);
  if (memoryStore.length > 300) memoryStore.pop();
}

export function getMemoryEvents() {
  return [...memoryStore];
}

export async function handlePurchaseApproved(data) {
  const buyer = data?.buyer || {};
  logger.transaction("purchase.approved", {
    email: buyer.email,
    transaction: data?.purchase?.transaction,
  });
  push({ type: "PURCHASE_APPROVED", at: new Date().toISOString(), data });
  await triggerWelcomeSequence({
    email: buyer.email,
    name: buyer.name,
  });
  return { action: "activate", message: `Acesso liberado para ${buyer.email || "buyer"}` };
}

export async function handlePurchaseComplete(data) {
  push({ type: "PURCHASE_COMPLETE", at: new Date().toISOString(), data });
  return { action: "activate", message: "Compra completa confirmada" };
}

export async function handlePurchaseCancelled(data) {
  const buyer = data?.buyer || {};
  logger.transaction("purchase.cancelled", { email: buyer.email });
  push({ type: "PURCHASE_CANCELED", at: new Date().toISOString(), data });
  await triggerWinbackSequence({ email: buyer.email, name: buyer.name, reason: "canceled" });
  return { action: "suspend", message: "Acesso revogado (cancelamento)" };
}

export async function handleRefundRequested(data) {
  const buyer = data?.buyer || {};
  logger.transaction("purchase.refunded", { email: buyer.email });
  push({ type: "PURCHASE_REFUNDED", at: new Date().toISOString(), data });
  return { action: "suspend", message: "Acesso revogado (reembolso)" };
}

export async function handleChargeback(data) {
  logger.critical("purchase.chargeback", {
    email: data?.buyer?.email,
    transaction: data?.purchase?.transaction,
  });
  push({ type: "PURCHASE_CHARGEBACK", at: new Date().toISOString(), data });
  return { action: "suspend", message: "Chargeback — acesso revogado + alerta admin" };
}

export async function handleSubscriptionCancellation(data) {
  push({ type: "SUBSCRIPTION_CANCELLATION", at: new Date().toISOString(), data });
  return { action: "schedule_revoke", message: "Assinatura cancelada — revogar no fim do período" };
}

export async function handleSubscriptionRenewal(data) {
  push({ type: "SUBSCRIPTION_RENEWAL", at: new Date().toISOString(), data });
  return { action: "renew", message: "Renovação registrada" };
}

export async function handleAffiliateConversion(data) {
  push({ type: "AFFILIATE_CONVERSION", at: new Date().toISOString(), data });
  return { action: "affiliate_log", message: "Conversão de afiliado registrada" };
}

export async function routeWebhookEvent(event, data) {
  switch (String(event || "").toUpperCase()) {
    case "PURCHASE_APPROVED":
      return handlePurchaseApproved(data);
    case "PURCHASE_COMPLETE":
      return handlePurchaseComplete(data);
    case "PURCHASE_CANCELED":
    case "PURCHASE_CANCELLED":
      return handlePurchaseCancelled(data);
    case "PURCHASE_REFUNDED":
      return handleRefundRequested(data);
    case "PURCHASE_CHARGEBACK":
      return handleChargeback(data);
    case "SUBSCRIPTION_CANCELLATION":
      return handleSubscriptionCancellation(data);
    case "SUBSCRIPTION_RENEWAL":
      return handleSubscriptionRenewal(data);
    default:
      logger.info("webhook.unhandled", { event });
      return { action: "none", message: `Evento ${event} registrado sem ação` };
  }
}

export { validateHottok as validateWebhookSignature } from "../lib/webhook-validator.js";

export default {
  routeWebhookEvent,
  handlePurchaseApproved,
  handlePurchaseCancelled,
  handleRefundRequested,
  handleChargeback,
  handleSubscriptionCancellation,
  handleSubscriptionRenewal,
  handleAffiliateConversion,
  getMemoryEvents,
};
