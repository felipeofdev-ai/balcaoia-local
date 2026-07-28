/**
 * Referência de webhook — produção já está em:
 * app/api/webhooks/hotmart/route.ts
 *
 * Eventos mínimos a ativar na Hotmart:
 * - PURCHASE_APPROVED
 * - PURCHASE_COMPLETE
 * - PURCHASE_REFUNDED
 * - PURCHASE_CANCELED
 * - PURCHASE_CHARGEBACK
 * - PURCHASE_DELAYED
 * - SUBSCRIPTION_CANCELLATION (se usar assinatura)
 */
export const WEBHOOK_URL_PRODUCTION =
  process.env.NEXT_PUBLIC_HOTMART_WEBHOOK_URL ||
  "https://balcaoia-studio.vercel.app/api/webhooks/hotmart";
