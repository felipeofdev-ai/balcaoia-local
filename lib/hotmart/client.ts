/**
 * OAuth2 + HTTP client Hotmart (Studio / Next.js).
 */

type TokenCache = { accessToken: string; expiresAt: number };

let cache: TokenCache | null = null;

const DEFAULT_TOKEN_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const PAYMENTS_BASE =
  process.env.HOTMART_PAYMENTS_API_BASE ||
  "https://developers.hotmart.com/payments/api/v1";
const TIMEOUT_MS = Number(process.env.HOTMART_HTTP_TIMEOUT_MS || 30_000);

function tokenUrl() {
  const base = process.env.HOTMART_API_BASE?.replace(/\/$/, "");
  return base ? `${base}/security/oauth/token` : DEFAULT_TOKEN_URL;
}

function basicAuth() {
  const id = process.env.HOTMART_CLIENT_ID || "";
  const secret = process.env.HOTMART_CLIENT_SECRET || "";
  if (!id || !secret) {
    throw new Error("HOTMART_CLIENT_ID e HOTMART_CLIENT_SECRET obrigatórios");
  }
  return Buffer.from(`${id}:${secret}`).toString("base64");
}

export function clearHotmartTokenCache() {
  cache = null;
}

export async function getHotmartAccessToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && cache && cache.expiresAt > now + 60_000) {
    return cache.accessToken;
  }

  const url = new URL(tokenUrl());
  url.searchParams.set("grant_type", "client_credentials");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth()}`,
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
  };
  if (!res.ok || !data.access_token) {
    throw new Error(`Hotmart OAuth ${res.status}: ${JSON.stringify(data)}`);
  }

  cache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
  };
  return cache.accessToken;
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export async function hotmartFetch<T = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: { query?: Record<string, string | number | undefined>; body?: unknown; retry?: number } = {}
): Promise<T> {
  const retry = options.retry ?? 0;
  const token = await getHotmartAccessToken(retry > 0);
  const url = new URL(
    path.startsWith("http")
      ? path
      : `${PAYMENTS_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
  );
  if (options.query) {
    for (const [k, v] of Object.entries(options.query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    if (res.status === 401 && retry < 1) {
      clearHotmartTokenCache();
      return hotmartFetch(method, path, { ...options, retry: retry + 1 });
    }
    if (res.status >= 500 && retry < 3) {
      await sleep(400 * (retry + 1));
      return hotmartFetch(method, path, { ...options, retry: retry + 1 });
    }

    const text = await res.text();
    const data = text ? (JSON.parse(text) as T) : (null as T);
    if (!res.ok) {
      throw new Error(`Hotmart ${method} ${url.pathname} → ${res.status}: ${text.slice(0, 400)}`);
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export const hotmartApi = {
  get: <T = unknown>(path: string, query?: Record<string, string | number | undefined>) =>
    hotmartFetch<T>("GET", path, { query }),
  post: <T = unknown>(path: string, body?: unknown) => hotmartFetch<T>("POST", path, { body }),
  put: <T = unknown>(path: string, body?: unknown) => hotmartFetch<T>("PUT", path, { body }),
  delete: <T = unknown>(path: string, query?: Record<string, string | number | undefined>) =>
    hotmartFetch<T>("DELETE", path, { query }),
};
