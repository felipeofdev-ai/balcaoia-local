/**
 * Gera docs/affiliate-config.json a partir do catálogo (comissões sugeridas).
 * Ativação real do programa de afiliados: painel Hotmart.
 *
 * Uso: node scripts/configurar-afiliados.mjs
 */
import fs from "node:fs";

const catalog = JSON.parse(fs.readFileSync("docs/void9-products-catalog.json", "utf8"));
const idsFile = "docs/hotmart-product-ids.json";
const ids = fs.existsSync(idsFile) ? JSON.parse(fs.readFileSync(idsFile, "utf8")) : [];

function commissionForTier(tier) {
  if (tier === 1) return 50;
  if (tier === 2) return 40;
  return 30;
}

const config = catalog.map((p) => {
  const found = ids.find((x) => x.slug === p.slug);
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    tier: p.tier,
    hotmartId: found?.id || null,
    status: found?.status || "pending_panel",
    affiliate: {
      commissionPercent: commissionForTier(p.tier),
      autoApprove: true,
      note: "Configure no painel Hotmart → Afiliados do produto",
    },
  };
});

fs.writeFileSync("docs/affiliate-config.json", JSON.stringify(config, null, 2));
console.log("OK docs/affiliate-config.json", config.length, "produtos");
