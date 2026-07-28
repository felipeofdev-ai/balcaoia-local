/**
 * Cliente HTTP central Hotmart Developers API.
 * Base de pagamentos: https://developers.hotmart.com/payments/api/v1
 */

import { getAccessToken, clearTokenCache } from "./token-manager.js";
import { logger } from "./logger.js";

const PAYMENTS_BASE =
  process.env.HOTMART_PAYMENTS_API_BASE ||
  "https://developers.hotmart.com/payments/api/v1";

const TIMEOUT_MS = Number(process.env.HOTMART_HTTP_TIMEOUT_MS || 30_000);
const MAX_RETRIES = 3;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function request(method, path, { query, body, retry = 0 } = {}) {
  const token = await getAccessToken();
  const url = new URL(
    path.startsWith("http") ? path : `${PAYMENTS_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
  );
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  logger.info("hotmart.http", { method, path: url.pathname, retry });

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    if (retry < MAX_RETRIES) {
      await sleep(300 * (retry + 1));
      return request(method, path, { query, body, retry: retry + 1 });
    }
    logger.error("hotmart.http.network", { error });
    throw error;
  }
  clearTimeout(timer);

  if (res.status === 401 && retry < 1) {
    clearTokenCache();
    return request(method, path, { query, body, retry: retry + 1 });
  }

  if (res.status >= 500 && retry < MAX_RETRIES) {
    await sleep(400 * (retry + 1));
    return request(method, path, { query, body, retry: retry + 1 });
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(`Hotmart ${method} ${url.pathname} → ${res.status}`);
    err.status = res.status;
    err.data = data;
    logger.error("hotmart.http.error", { status: res.status, data });
    throw err;
  }

  return data;
}

export const hotmartClient = {
  get: (path, query) => request("GET", path, { query }),
  post: (path, body, query) => request("POST", path, { body, query }),
  put: (path, body, query) => request("PUT", path, { body, query }),
  delete: (path, query) => request("DELETE", path, { query }),
  paymentsBase: PAYMENTS_BASE,
};

export default hotmartClient;
