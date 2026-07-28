/**
 * Gera logos SVG + mockups para o portfólio VOID-9 / BalcãoIA.
 * Uso: node scripts/gerar-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public");

const PRODUCTS = [
  { slug: "foco-14", name: "FOCO 14", short: "FOCO 14", slogan: "14 dias. Foco total.", tier: 1, color: "#2563EB", icon: "clock" },
  { slug: "rotina-clareza-freelancer", name: "Clareza Semanal", short: "CLAREZA", slogan: "Sua semana com propósito", tier: 1, color: "#0EA5E9", icon: "calendar" },
  { slug: "checklist-atendimento-local", name: "Checklist Atendimento", short: "CHECKLIST", slogan: "Não esqueça o óbvio", tier: 1, color: "#0284C7", icon: "check" },
  { slug: "desafio-7d-atendimento", name: "Desafio 7D", short: "7 DIAS", slogan: "Atendimento organizado", tier: 1, color: "#2563EB", icon: "sprint" },
  { slug: "whatsapp-etico-negocios", name: "WhatsApp Ético", short: "ÉTICO", slogan: "Venda sem spam", tier: 1, color: "#10B981", icon: "chat" },
  { slug: "guia-catalogo-precos", name: "Catálogo & Preços", short: "CATÁLOGO", slogan: "Preço claro em 30s", tier: 1, color: "#0EA5E9", icon: "tag" },
  { slug: "curso-organizacao-atendimento", name: "Curso Organização", short: "CURSO", slogan: "Operação previsível", tier: 2, color: "#0F766E", icon: "nodes", gold: "#F59E0B" },
  { slug: "programa-8-semanas-balcao", name: "Programa 8 Semanas", short: "8 SEMANAS", slogan: "Trilha de implantação", tier: 2, color: "#0F766E", icon: "arrow", gold: "#F59E0B" },
  { slug: "sistema-balcao-proprietario", name: "Sistema Balcão", short: "SISTEMA", slogan: "SOB operacional", tier: 2, color: "#115E59", icon: "nodes", gold: "#F59E0B" },
  { slug: "workshop-ia-atendimento", name: "Workshop IA", short: "WORKSHOP", slogan: "Aprenda na prática", tier: 2, color: "#0F766E", icon: "screen", gold: "#F59E0B" },
  { slug: "bundle-entrada-local", name: "Bundle Entrada", short: "BUNDLE", slogan: "Trilha de entrada", tier: 2, color: "#134E4A", icon: "stack", gold: "#F59E0B" },
  { slug: "mentoria-grupo-gravada", name: "Mentoria Grupo", short: "MENTORIA", slogan: "Playbooks gravados", tier: 3, color: "#0F0F0F", icon: "people", gold: "#FFD700" },
  { slug: "curso-avancado-comunidade", name: "Curso Avançado", short: "AVANÇADO", slogan: "Avançado. Conectado.", tier: 3, color: "#111827", icon: "network", gold: "#F59E0B" },
  { slug: "certificado-conclusao-7d", name: "Certificação 7D", short: "CERT", slogan: "Prova por evidência", tier: 3, color: "#0F0F0F", icon: "diploma", gold: "#FFD700" },
  { slug: "mastermind-gravado-operadores", name: "Mastermind", short: "MASTERMIND", slogan: "Operadores selecionados", tier: 3, color: "#000000", icon: "diamond", gold: "#FFD700" },
];

function ensure(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function iconPath(type, c, g) {
  const stroke = c;
  const accent = g || c;
  switch (type) {
    case "clock":
      return `<circle cx="0" cy="0" r="28" fill="none" stroke="${stroke}" stroke-width="4"/><path d="M0-12v14l10 6" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/><path d="M18-22l8-8M26-22h-8v8" fill="none" stroke="${accent}" stroke-width="3"/>`;
    case "calendar":
      return `<rect x="-26" y="-20" width="52" height="44" rx="6" fill="none" stroke="${stroke}" stroke-width="4"/><path d="M-26-6h52" stroke="${stroke}" stroke-width="3"/><circle cx="10" cy="10" r="6" fill="${accent}"/><path d="M8 10l2 2 4-5" fill="none" stroke="#fff" stroke-width="2"/>`;
    case "check":
      return `<rect x="-28" y="-28" width="56" height="56" rx="10" fill="none" stroke="${stroke}" stroke-width="4"/><path d="M-14 2l10 10 20-24" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`;
    case "sprint":
      return `<path d="M-30 8h20l8-16h20" fill="none" stroke="${stroke}" stroke-width="4"/><circle cx="22" cy="8" r="10" fill="none" stroke="${accent}" stroke-width="3"/><text x="22" y="12" text-anchor="middle" font-size="10" fill="${accent}" font-family="system-ui">7</text>`;
    case "chat":
      return `<path d="M-28-18h48a8 8 0 018 8v20a8 8 0 01-8 8h-28l-12 12v-12h-8a8 8 0 01-8-8v-20a8 8 0 018-8z" fill="none" stroke="${stroke}" stroke-width="3"/><circle cx="-8" cy="0" r="4" fill="${accent}"/><circle cx="4" cy="0" r="4" fill="${accent}"/><circle cx="16" cy="0" r="4" fill="${accent}"/>`;
    case "tag":
      return `<path d="M-8-24h20l16 28-28 16-16-28z" fill="none" stroke="${stroke}" stroke-width="3"/><circle cx="4" cy="-8" r="4" fill="${accent}"/>`;
    case "nodes":
      return `<circle cx="-18" cy="-12" r="8" fill="none" stroke="${stroke}" stroke-width="3"/><circle cx="18" cy="-12" r="8" fill="none" stroke="${stroke}" stroke-width="3"/><circle cx="0" cy="18" r="8" fill="none" stroke="${accent}" stroke-width="3"/><path d="M-12-8L-4 12M12-8L4 12M-10-12h20" stroke="${stroke}" stroke-width="2"/>`;
    case "arrow":
      return `<path d="M-24 16L0-20L24 16" fill="none" stroke="${stroke}" stroke-width="4"/><path d="M-8 4h16" stroke="${accent}" stroke-width="4"/>`;
    case "screen":
      return `<rect x="-30" y="-22" width="60" height="36" rx="4" fill="none" stroke="${stroke}" stroke-width="3"/><path d="M-10 22h20M0 14v8" stroke="${stroke}" stroke-width="3"/><circle cx="0" cy="-4" r="8" fill="none" stroke="${accent}" stroke-width="2"/><path d="M-4-4h8M0-8v8" stroke="${accent}" stroke-width="2"/>`;
    case "stack":
      return `<rect x="-26" y="4" width="52" height="16" rx="3" fill="none" stroke="${stroke}" stroke-width="3"/><rect x="-22" y="-8" width="44" height="14" rx="3" fill="none" stroke="${stroke}" stroke-width="3"/><rect x="-18" y="-22" width="36" height="14" rx="3" fill="none" stroke="${accent}" stroke-width="3"/>`;
    case "people":
      return `<circle cx="-12" cy="-10" r="8" fill="none" stroke="${stroke}" stroke-width="3"/><circle cx="14" cy="-10" r="8" fill="none" stroke="${accent}" stroke-width="3"/><path d="M-28 22c0-10 8-16 16-16s16 6 16 16M0 22c0-10 8-16 16-16" fill="none" stroke="${stroke}" stroke-width="3"/>`;
    case "network":
      return `<circle cx="0" cy="0" r="8" fill="${accent}"/><circle cx="-22" cy="-16" r="6" fill="none" stroke="${stroke}" stroke-width="2"/><circle cx="22" cy="-16" r="6" fill="none" stroke="${stroke}" stroke-width="2"/><circle cx="-22" cy="18" r="6" fill="none" stroke="${stroke}" stroke-width="2"/><circle cx="22" cy="18" r="6" fill="none" stroke="${stroke}" stroke-width="2"/><path d="M-16-12L-6-4M16-12L6-4M-16 14L-6 4M16 14L6 4" stroke="${stroke}" stroke-width="2"/>`;
    case "diploma":
      return `<rect x="-28" y="-20" width="56" height="40" rx="4" fill="none" stroke="${stroke}" stroke-width="3"/><path d="M-16-4h32M-16 8h20" stroke="${stroke}" stroke-width="2"/><circle cx="14" cy="10" r="8" fill="none" stroke="${accent}" stroke-width="2"/>`;
    case "diamond":
      return `<path d="M0-28L24 0L0 28L-24 0Z" fill="none" stroke="${accent}" stroke-width="3"/><path d="M-24 0h48M0-28L-12 0L0 28M0-28L12 0L0 28" stroke="${stroke}" stroke-width="1.5"/>`;
    default:
      return `<circle cx="0" cy="0" r="24" fill="none" stroke="${stroke}" stroke-width="4"/>`;
  }
}

function horizontal(p) {
  const g = p.gold || "#F8FAFC";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" role="img" aria-label="${p.name}">
  <rect width="400" height="120" rx="12" fill="#FFFFFF"/>
  <rect x="0" y="0" width="8" height="120" fill="${p.color}"/>
  <g transform="translate(56,60)">${iconPath(p.icon, p.color, g)}</g>
  <text x="110" y="52" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" fill="#0F172A">${escapeXml(p.short)}</text>
  <text x="110" y="78" font-family="system-ui,Segoe UI,sans-serif" font-size="12" fill="#64748B">${escapeXml(p.slogan)}</text>
  <text x="380" y="108" text-anchor="end" font-family="system-ui" font-size="9" fill="#94A3B8">BalcãoIA</text>
</svg>`;
}

function square(p) {
  const g = p.gold || p.color;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="${p.name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.color}"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="32" fill="url(#bg)"/>
  <g transform="translate(200,150) scale(2.2)" stroke="#FFFFFF">${iconPath(p.icon, "#FFFFFF", g)}</g>
  <text x="200" y="300" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="700" fill="#FFFFFF">${escapeXml(p.short)}</text>
  <text x="200" y="334" text-anchor="middle" font-family="system-ui" font-size="14" fill="#E2E8F0">${escapeXml(p.slogan)}</text>
</svg>`;
}

function favicon(p) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${p.color}"/>
  <g transform="translate(16,16) scale(0.35)" stroke="#fff" fill="none">${iconPath(p.icon, "#fff", p.gold || "#fff")}</g>
</svg>`;
}

function dark(p) {
  const g = p.gold || "#F8FAFC";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120">
  <rect width="400" height="120" rx="12" fill="#0F172A"/>
  <g transform="translate(56,60)">${iconPath(p.icon, g, g)}</g>
  <text x="110" y="52" font-family="Georgia,serif" font-size="22" font-weight="700" fill="#F8FAFC">${escapeXml(p.short)}</text>
  <text x="110" y="78" font-family="system-ui" font-size="12" fill="#94A3B8">${escapeXml(p.slogan)}</text>
</svg>`;
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function mockups(p) {
  const dir = path.join(ROOT, "mockups", p.slug);
  ensure(dir);
  const cover = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${p.color}"/>
  <rect x="60" y="60" width="1080" height="510" rx="24" fill="#0F172A" opacity="0.25"/>
  <text x="100" y="220" font-family="Georgia,serif" font-size="64" fill="#fff" font-weight="700">${escapeXml(p.name)}</text>
  <text x="100" y="290" font-family="system-ui" font-size="28" fill="#E2E8F0">${escapeXml(p.slogan)}</text>
  <text x="100" y="520" font-family="system-ui" font-size="20" fill="#F8FAFC">BalcãoIA · Conteúdo educativo</text>
</svg>`;
  const story = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="${p.color}"/>
  <text x="540" y="860" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="#fff">${escapeXml(p.short)}</text>
  <text x="540" y="960" text-anchor="middle" font-family="system-ui" font-size="36" fill="#E2E8F0">${escapeXml(p.slogan)}</text>
</svg>`;
  const yt = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#0F172A"/>
  <rect x="0" y="0" width="18" height="720" fill="${p.color}"/>
  <text x="80" y="340" font-family="Georgia,serif" font-size="56" fill="#fff">${escapeXml(p.name)}</text>
  <text x="80" y="420" font-family="system-ui" font-size="28" fill="#94A3B8">${escapeXml(p.slogan)}</text>
</svg>`;
  const ebook = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <rect x="80" y="60" width="400" height="560" rx="8" fill="${p.color}"/>
  <rect x="100" y="80" width="360" height="520" rx="4" fill="#0F172A" opacity="0.15"/>
  <text x="280" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="36" fill="#fff">${escapeXml(p.short)}</text>
  <text x="280" y="370" text-anchor="middle" font-family="system-ui" font-size="16" fill="#E2E8F0">${escapeXml(p.slogan)}</text>
  <ellipse cx="300" cy="700" rx="180" ry="18" fill="#000" opacity="0.15"/>
</svg>`;
  const notebook = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <rect x="80" y="40" width="640" height="400" rx="16" fill="#1E293B"/>
  <rect x="100" y="60" width="600" height="340" fill="${p.color}"/>
  <text x="400" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="#fff">${escapeXml(p.short)}</text>
  <rect x="200" y="450" width="400" height="24" rx="4" fill="#334155"/>
</svg>`;
  const bundle = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <rect x="120" y="280" width="400" height="200" rx="12" fill="${p.color}" opacity="0.7"/>
  <rect x="150" y="200" width="340" height="180" rx="12" fill="${p.color}" opacity="0.85"/>
  <rect x="180" y="120" width="280" height="160" rx="12" fill="${p.color}"/>
  <text x="320" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#fff">${escapeXml(p.short)}</text>
</svg>`;

  fs.writeFileSync(path.join(dir, "social-cover.svg"), cover);
  fs.writeFileSync(path.join(dir, "story-template.svg"), story);
  fs.writeFileSync(path.join(dir, "youtube-thumbnail.svg"), yt);
  fs.writeFileSync(path.join(dir, "ebook-3d.svg"), ebook);
  fs.writeFileSync(path.join(dir, "notebook-mockup.svg"), notebook);
  fs.writeFileSync(path.join(dir, "bundle-stack.svg"), bundle);
}

for (const p of PRODUCTS) {
  const dir = path.join(ROOT, "logos", p.slug);
  ensure(dir);
  fs.writeFileSync(path.join(dir, "logo-horizontal.svg"), horizontal(p));
  fs.writeFileSync(path.join(dir, "logo-square.svg"), square(p));
  fs.writeFileSync(path.join(dir, "favicon.svg"), favicon(p));
  fs.writeFileSync(path.join(dir, "logo-dark.svg"), dark(p));
  mockups(p);
  console.log("OK", p.slug);
}

fs.writeFileSync(
  path.join(ROOT, "logos", "index.json"),
  JSON.stringify(
    PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      tier: p.tier,
      color: p.color,
      paths: {
        horizontal: `/logos/${p.slug}/logo-horizontal.svg`,
        square: `/logos/${p.slug}/logo-square.svg`,
        favicon: `/logos/${p.slug}/favicon.svg`,
        dark: `/logos/${p.slug}/logo-dark.svg`,
      },
    })),
    null,
    2
  )
);
console.log("Done", PRODUCTS.length, "logo sets + mockups");
