/**
 * Corrige false-positive: respostas 200 vazias ≠ produto criado.
 * Gera templates manuais para o painel.
 */
import fs from "node:fs";

const catalog = JSON.parse(fs.readFileSync("docs/void9-products-catalog.json", "utf8"));
const previous = JSON.parse(fs.readFileSync("docs/hotmart-product-ids.json", "utf8"));

const results = catalog.map((p) => {
  const prev = previous.find((x) => x.slug === p.slug);
  const id = prev?.id;
  const hasRealId =
    id &&
    typeof id === "object" &&
    !("raw" in id && (!id.raw || id.raw === "")) &&
    (id.id || id.ucode || typeof id === "number");
  const hasScalarId = typeof id === "string" || typeof id === "number";

  if (hasRealId || hasScalarId) {
    return { ...prev, status: "created" };
  }

  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    tier: p.tier,
    status: "PANEL_REQUIRED",
    note: "API de criação não retornou ID válido. Cadastre no painel Hotmart.",
    template: {
      name: p.name,
      description: p.promise,
      priceBRL: p.price,
      guaranteeDays: 7,
      webhook: "https://balcaoia-studio.vercel.app/api/webhook",
      panelUrl: "https://app-vlc.hotmart.com/products",
      affiliateCommissionPercent: p.tier === 1 ? 50 : p.tier === 2 ? 40 : 30,
    },
  };
});

fs.writeFileSync("docs/hotmart-product-ids.json", JSON.stringify(results, null, 2));
console.log(
  "PANEL_REQUIRED:",
  results.filter((r) => r.status === "PANEL_REQUIRED").length,
  "/",
  results.length
);
