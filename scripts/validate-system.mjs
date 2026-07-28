#!/usr/bin/env node
/**
 * Validação rápida do sistema BalcãoIA (roda local ou CI).
 * Uso: node scripts/validate-system.mjs
 */

const BASE = process.env.VALIDATE_BASE_URL || "https://balcaoia-studio.vercel.app";

async function check(path, expectOk = true) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const ok = expectOk ? res.ok : true;
    console.log(`${ok ? "✅" : "❌"} ${res.status} ${path}`);
    return ok;
  } catch (e) {
    console.log(`❌ ERR ${path} — ${e.message}`);
    return false;
  }
}

async function main() {
  console.log(`\n🔐 Validando BalcãoIA em ${BASE}\n`);
  const results = await Promise.all([
    check("/api/health"),
    check("/"),
    check("/vendas"),
    check("/app/login"),
    check("/afiliados"),
    check("/checklist"),
    check("/diagnostico"),
    check("/api/ai/generate"),
  ]);
  const passed = results.filter(Boolean).length;
  console.log(`\n========================================`);
  console.log(`${passed}/${results.length} checks OK`);
  console.log(`DNS domínio oficial: configure no Registro.br (ver docs/DNS_REGISTRO_BR.md)`);
  console.log(`HOTTOK: ${process.env.HOTMART_HOTTOK ? "presente no env local" : "pendente (produção)"}`);
  console.log(`========================================\n`);
  process.exit(passed === results.length ? 0 : 1);
}

main();
