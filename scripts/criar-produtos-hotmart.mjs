/**
 * Tenta criar produtos na Hotmart via API.
 * Se a API não permitir criação (comum), grava templates PANEL_REQUIRED
 * em docs/hotmart-product-ids.json para cadastro manual no painel.
 *
 * Uso: node --env-file=.env.local scripts/criar-produtos-hotmart.mjs
 */
import fs from "node:fs";
import path from "node:path";

const TOKEN_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const CANDIDATE_CREATE_URLS = [
  "https://developers.hotmart.com/products/api/v1/products",
  "https://api-sec-vlc.hotmart.com/products/api/v1/products",
];

const catalogPath = path.resolve("docs/void9-products-catalog.json");
const catalog = fs.existsSync(catalogPath)
  ? JSON.parse(fs.readFileSync(catalogPath, "utf8"))
  : [];

async function getToken() {
  const id = process.env.HOTMART_CLIENT_ID;
  const secret = process.env.HOTMART_CLIENT_SECRET;
  if (!id || !secret) throw new Error("Missing HOTMART_CLIENT_ID/SECRET");
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

async function tryCreate(token, product) {
  const body = {
    name: product.name,
    description: product.promise,
    price: product.price,
    currency: "BRL",
    category: "EDUCATION_AND_ELEARNING",
    refund_deadline: 7,
    format: "EBOOK_OR_DOWNLOAD",
    visible: false,
  };

  for (const endpoint of CANDIDATE_CREATE_URLS) {
    try {
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
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
      if (res.ok) {
        return { ok: true, endpoint, data };
      }
      console.log("CREATE_FAIL", product.slug, res.status, endpoint, text.slice(0, 200));
    } catch (e) {
      console.log("CREATE_ERR", product.slug, endpoint, e.message);
    }
  }
  return {
    ok: false,
    code: "PANEL_REQUIRED",
    template: {
      ...product,
      panelUrl: "https://app-vlc.hotmart.com/products",
      webhook: "https://balcaoia-studio.vercel.app/api/webhook",
      guaranteeDays: 7,
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
      ...(r.ok
        ? { status: "created", id: r.data?.id || r.data, endpoint: r.endpoint }
        : { status: "PANEL_REQUIRED", template: r.template }),
    });
    await new Promise((x) => setTimeout(x, 800));
  }
  fs.mkdirSync("docs", { recursive: true });
  fs.writeFileSync("docs/hotmart-product-ids.json", JSON.stringify(results, null, 2));
  const created = results.filter((r) => r.status === "created").length;
  console.log(`\nResumo: ${created}/${results.length} via API; restante PANEL_REQUIRED`);
  console.log("Salvo em docs/hotmart-product-ids.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
