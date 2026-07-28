/**
 * Hotmart API helper (Node 18+).
 * Uso: node hotmart-client.mjs token | sales
 *
 * Env:
 *   HOTMART_CLIENT_ID
 *   HOTMART_CLIENT_SECRET
 */
const CLIENT_ID = process.env.HOTMART_CLIENT_ID || "";
const CLIENT_SECRET = process.env.HOTMART_CLIENT_SECRET || "";
const TOKEN_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";

function basicAuth() {
  return Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
}

export async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Defina HOTMART_CLIENT_ID e HOTMART_CLIENT_SECRET");
  }
  const url = new URL(TOKEN_URL);
  url.searchParams.set("grant_type", "client_credentials");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth()}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token falhou: ${res.status} ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

/** Exemplo de leitura — confirme o path exato na doc do seu app Hotmart. */
export async function listSales(accessToken, { maxResults = 10 } = {}) {
  const url = new URL("https://developers.hotmart.com/payments/api/v1/sales/history");
  url.searchParams.set("max_results", String(maxResults));
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Sales falhou: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

/** Template manual do produto FOCO 14 (para colar no painel). */
export const FOCO14_PRODUCT_TEMPLATE = {
  name: "FOCO 14 — Rotina de Alta Clareza para Quem Empreende Sozinho",
  description:
    "Ebook + checklist de 14 dias + templates de foco e janelas de resposta. Conteúdo educativo de produtividade. Sem promessa de renda.",
  priceBRL: 67,
  guaranteeDays: 7,
  format: "digital",
  membersAreaExternal: "https://balcaoia-studio.vercel.app/app/login",
  salesPage: "void-9/landing/index.html (hospedar ou espelhar no Next)",
  orderBump: {
    name: "Pack Interrupção Zero",
    priceBRL: 27,
  },
  affiliateCommissionPercentSuggested: 50,
};

async function main() {
  const cmd = process.argv[2] || "token";
  if (cmd === "template") {
    console.log(JSON.stringify(FOCO14_PRODUCT_TEMPLATE, null, 2));
    return;
  }
  const token = await getAccessToken();
  if (cmd === "token") {
    console.log(token.slice(0, 12) + "…");
    return;
  }
  if (cmd === "sales") {
    const sales = await listSales(token);
    console.log(JSON.stringify(sales, null, 2));
    return;
  }
  console.log("Comandos: token | sales | template");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
