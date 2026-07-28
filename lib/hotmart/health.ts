/** Health check compartilhado — GET /api/webhook e /api/status */

export const WEBHOOK_SUPPORTED_EVENTS = [
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "PURCHASE_CANCELED",
  "PURCHASE_REFUNDED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_PROTEST",
  "PURCHASE_BILLET_PRINTED",
  "PURCHASE_DELAYED",
  "PURCHASE_OUT_OF_SHOPPING_CART",
  "SUBSCRIPTION_CANCELLATION",
  "SUBSCRIPTION_RENEWAL",
  "SUBSCRIPTION_REACTIVATED",
  "CLUB_FIRST_ACCESS",
  "CLUB_MODULE_COMPLETED",
  "SWITCH_PLAN",
] as const;

export function webhookHealthPayload() {
  return {
    status: "online",
    servico: "VOID-9 Webhook Handler",
    versao: "1.0.0",
    endpoint: "/api/webhook",
    alias: "/api/webhooks/hotmart",
    hotmart_api: "v2.0.0",
    timestamp: new Date().toISOString(),
    hottok_configured: Boolean(
      (process.env.HOTMART_HOTTOK || process.env.HOTTOK || "").trim()
    ),
    eventos_suportados: [...WEBHOOK_SUPPORTED_EVENTS],
  };
}
