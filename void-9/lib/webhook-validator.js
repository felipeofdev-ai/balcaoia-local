/**
 * Validação HOTTOK (header x-hotmart-hottok) com comparação timing-safe.
 */

import crypto from "node:crypto";
import { logger } from "./logger.js";

/**
 * @param {string|null|undefined} received
 * @param {string|null|undefined} expected
 * @returns {boolean}
 */
export function validateHottok(received, expected) {
  if (!expected || !String(expected).trim()) {
    // Sem HOTTOK configurado: modo permissive (local/demo). Em produção configure sempre.
    return true;
  }
  if (!received) return false;

  const a = Buffer.from(String(received));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Extrai HOTTOK do request (headers + body.hottok).
 */
export function extractHottok(headers, body) {
  const h =
    headers?.get?.("x-hotmart-hottok") ||
    headers?.get?.("X-Hotmart-Hottok") ||
    headers?.["x-hotmart-hottok"] ||
    headers?.["X-Hotmart-Hottok"] ||
    null;
  if (h) return h;
  if (body && typeof body === "object" && typeof body.hottok === "string") {
    return body.hottok;
  }
  return null;
}

export function assertValidHottok(received, expected, meta = {}) {
  const ok = validateHottok(received, expected);
  if (!ok) {
    logger.warn("webhook.hottok.invalid", { ...meta, kind: "security" });
  }
  return ok;
}

export default { validateHottok, extractHottok, assertValidHottok };
