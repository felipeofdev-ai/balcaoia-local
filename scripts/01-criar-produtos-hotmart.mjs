/**
 * Probe real da API Hotmart para criação de produtos.
 * Se não houver ID válido, grava templates PANEL_REQUIRED (cadastro no painel).
 *
 * node --env-file=.env.local scripts/01-criar-produtos-hotmart.mjs
 */
import fs from "node:fs";
import path from "node:path";

const TOKEN_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const CREATE_URLS = [
  "https://developers.hotmart.com/products/api/v1/products",
  "https://api-sec-vlc.hotmart.com/products/api/v1/products",
];

const catalog = JSON.parse(
  fs.readFileSync("docs/void9-products-catalog.json", "utf8")
);

async function getToken() {
  const id = process.env.HOTMART_CLIENT_ID;
  const secret = process.env.HOTMART_CLIENT_SECRET;
  if (!id || !secret) throw new Error("HOTMART_CLIENT_ID/SECRET ausentes");
  const url = new URL(TOKEN_URL);
  url.searchParams.set("grant_type", "client_credentials");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(JSON.stringify(data));
  console.log("TOKEN_OK");
  return data.access_token;
}

function hasRealId(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.id === "number" || (typeof data.id === "string" && data.id.length > 0))
    return true;
  if (data.ucode || data.product_id) return true;
  return false;
}

async function tryCreate(token, p) {
  const body = {
    name: p.name,
    description: p.promise,
    price: p.price,
    currency: "BRL",
    refund_deadline: 7,
    format: "EBOOK_OR_DOWNLOAD",
    visible: false,
  };

  for (const endpoint of CREATE_URLS) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }
    console.log(p.slug, endpoint, res.status, text.slice(0, 180) || "(empty)");
    if (res.ok && hasRealId(data)) {
      return {
        status: "created",
        hotmartId: data.id || data.ucode || data.product_id,
        endpoint,
        data,
      };
    }
  }

  return {
    status: "PANEL_REQUIRED",
    hotmartId: null,
    template: {
      name: p.name,
      description: p.promise,
      priceBRL: p.price,
      tier: p.tier,
      guaranteeDays: 7,
      affiliateCommissionPercent: p.tier === 1 ? 50 : p.tier === 2 ? 40 : 30,
      webhook: "https://balcaoia-studio.vercel.app/api/webhook",
      panelUrl: "https://app-vlc.hotmart.com/products",
    },
  };
}

async function main() {
  const token = await getToken();
  const results = [];
  for (const p of catalog) {
    console.log("\n→", p.name);
    const r = await tryCreate(token, p);
    results.push({
      slug: p.slug,
      name: p.name,
      price: p.price,
      tier: p.tier,
      ...r,
    });
    await new Promise((x) => setTimeout(x, 600));
  }

  fs.mkdirSync("docs", { recursive: true });
  fs.writeFileSync(
    "docs/hotmart-produtos-criados.json",
    JSON.stringify(results, null, 2)
  );
  const created = results.filter((r) => r.status === "created").length;
  console.log(`\nResumo real: ${created}/${results.length} criados via API`);
  console.log("Arquivo: docs/hotmart-produtos-criados.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
