/**
 * Referência VOID-9 — o endpoint real no Next.js é:
 *   app/api/webhook/route.ts  →  /api/webhook
 *   app/api/webhooks/hotmart/route.ts → /api/webhooks/hotmart
 *
 * Este arquivo documenta o fluxo esperado e pode ser usado em testes Node.
 */

import { validateHottok, extractHottok } from "../../../lib/webhook-validator.js";
import { webhookSecurityGate } from "../../../middleware/webhook-security.js";
import { routeWebhookEvent } from "../../../api-integration/webhook-handler.js";
import { logger } from "../../../lib/logger.js";

export async function handleWebhookPost({ headers, body, ip }) {
  const expected = process.env.HOTMART_HOTTOK || process.env.HOTTOK || "";
  const received = extractHottok(headers, body);
  if (!validateHottok(received, expected)) {
    return { status: 401, json: { ok: false, error: "HOTTOK inválido" } };
  }

  const eventKey =
    body?.data?.purchase?.transaction ||
    `${body?.event || "evt"}-${body?.id || Date.now()}`;

  const gate = webhookSecurityGate({ ip, eventKey });
  if (!gate.ok) {
    return { status: gate.status, json: { ok: false, error: gate.error } };
  }

  try {
    const result = await routeWebhookEvent(body?.event, body?.data || {});
    logger.webhook("processed", { event: body?.event, result });
    return { status: 200, json: { ok: true, ...result } };
  } catch (error) {
    logger.error("webhook.internal", { error });
    return {
      status: 200,
      json: { ok: false, acknowledged: true, error: "falha interna" },
    };
  }
}

export default { handleWebhookPost };
