/**
 * OAuth2 Hotmart — client_credentials + cache + refresh preventivo.
 * Token URL: https://api-sec-vlc.hotmart.com/security/oauth/token
 */

import { logger } from "./logger.js";

const DEFAULT_TOKEN_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";

/** @type {{ accessToken: string, expiresAt: number } | null} */
let cache = null;

function resolveTokenUrl() {
  const base = process.env.HOTMART_API_BASE?.replace(/\/$/, "");
  return base ? `${base}/security/oauth/token` : DEFAULT_TOKEN_URL;
}

function basicAuth() {
  const id = process.env.HOTMART_CLIENT_ID || "";
  const secret = process.env.HOTMART_CLIENT_SECRET || "";
  if (!id || !secret) {
    throw new Error(
      "HOTMART_CLIENT_ID e HOTMART_CLIENT_SECRET são obrigatórios no ambiente."
    );
  }
  return Buffer.from(`${id}:${secret}`).toString("base64");
}

/**
 * Obtém access_token válido (cache em memória, renova ~60s antes de expirar).
 */
export async function getAccessToken({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && cache && cache.expiresAt > now + 60_000) {
    return cache.accessToken;
  }

  const url = new URL(resolveTokenUrl());
  url.searchParams.set("grant_type", "client_credentials");

  logger.info("hotmart.oauth.request", { url: url.origin + url.pathname });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth()}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    logger.error("hotmart.oauth.failed", {
      status: res.status,
      body: data,
    });
    throw new Error(
      `Hotmart OAuth falhou (${res.status}): ${JSON.stringify(data)}`
    );
  }

  const expiresInMs = Number(data.expires_in || 3600) * 1000;
  cache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + expiresInMs,
  };

  logger.info("hotmart.oauth.ok", {
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  });

  return cache.accessToken;
}

/** Invalida cache (após 401). */
export function clearTokenCache() {
  cache = null;
}

export async function withAuthRetry(fn) {
  try {
    return await fn(await getAccessToken());
  } catch (err) {
    const status = err?.status || err?.response?.status;
    if (status === 401) {
      logger.warn("hotmart.oauth.retry_401");
      clearTokenCache();
      return await fn(await getAccessToken({ forceRefresh: true }));
    }
    throw err;
  }
}

export default { getAccessToken, clearTokenCache, withAuthRetry };
