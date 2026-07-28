/**
 * Rate limit + anti-replay básico para webhooks Hotmart.
 * Em memória (adequado a isolate Vercel; cold start zera contadores).
 */

import { logger } from "../lib/logger.js";

const buckets = new Map();
const seenIds = new Map();
const blacklist = new Set(
  (process.env.WEBHOOK_IP_BLACKLIST || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

const REPLAY_TTL_MS = 10 * 60 * 1000;

function pruneReplay(now) {
  for (const [k, exp] of seenIds) {
    if (exp < now) seenIds.delete(k);
  }
}

export function checkIpRateLimit(ip, limit = 120, windowMs = 60_000) {
  const now = Date.now();
  const key = `ip:${ip || "anonymous"}`;
  const cur = buckets.get(key);
  if (!cur || now >= cur.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (cur.count >= limit) {
    logger.warn("webhook.rate_limit", { ip });
    return { ok: false, remaining: 0, resetAt: cur.resetAt };
  }
  cur.count += 1;
  return { ok: true, remaining: limit - cur.count, resetAt: cur.resetAt };
}

export function isBlacklisted(ip) {
  return Boolean(ip) && blacklist.has(ip);
}

/**
 * Anti-replay: rejeita o mesmo transaction/eventId dentro da janela.
 * @returns {boolean} true se é novo (ok processar)
 */
export function registerEventOnce(eventKey) {
  if (!eventKey) return true;
  const now = Date.now();
  pruneReplay(now);
  if (seenIds.has(eventKey)) {
    logger.warn("webhook.replay_detected", { eventKey });
    return false;
  }
  seenIds.set(eventKey, now + REPLAY_TTL_MS);
  return true;
}

export function webhookSecurityGate({ ip, eventKey }) {
  if (isBlacklisted(ip)) {
    logger.critical("webhook.ip_blacklisted", { ip });
    return { ok: false, status: 403, error: "IP bloqueado" };
  }
  const rl = checkIpRateLimit(ip);
  if (!rl.ok) {
    return { ok: false, status: 429, error: "Rate limit", resetAt: rl.resetAt };
  }
  if (!registerEventOnce(eventKey)) {
    return { ok: false, status: 409, error: "Replay detectado" };
  }
  return { ok: true, remaining: rl.remaining };
}

export default {
  checkIpRateLimit,
  isBlacklisted,
  registerEventOnce,
  webhookSecurityGate,
};
