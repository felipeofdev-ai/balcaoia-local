/**
 * Gera logos SVG completos para LOTE 1 (J1–J10 + flagships).
 * Saída: balcaoia-studio/public/logos/[slug]/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/logos");

const PRODUCTS = [
  { slug: "10-prompts-whatsapp-vendem", name: "10 Prompts WhatsApp", slogan: "Vendas com ética", cat: "J" },
  { slug: "checklist-ia-1-hora", name: "Checklist IA 1h", slogan: "Organize em 60 min", cat: "J" },
  { slug: "30-posts-prontos-ia", name: "30 Posts Prontos", slogan: "Conteúdo com IA", cat: "J" },
  { slug: "template-atendimento-automatico", name: "Template Atendimento", slogan: "Respostas prontas", cat: "J" },
  { slug: "mini-guia-gmn-30min", name: "Mini Guia GMN", slogan: "Maps em 30 min", cat: "J" },
  { slug: "20-legendas-instagram", name: "20 Legendas IG", slogan: "Caption que converte", cat: "J" },
  { slug: "calculadora-preco-rapida", name: "Calculadora Preço", slogan: "Margem clara", cat: "J" },
  { slug: "15-ideias-reels-segmento", name: "15 Ideias Reels", slogan: "Roteiros por nicho", cat: "J" },
  { slug: "template-bio-instagram", name: "Template Bio IG", slogan: "Bio que posiciona", cat: "J" },
  { slug: "pack-50-hashtags-nicho", name: "50 Hashtags", slogan: "Alcance por nicho", cat: "J" },
  { slug: "whatsapp-etico-negocios", name: "WhatsApp Ético", slogan: "Venda sem spam", cat: "A", alt: "whatsapp-etico" },
  { slug: "checklist-atendimento-local", name: "BalcãoIA Pro", slogan: "Atendimento com IA", cat: "A", alt: "balcaoia-pro" },
  { slug: "foco-14", name: "FOCO 14", slogan: "Clareza em 14 dias", cat: "B" },
  { slug: "chatgpt-empreendedores", name: "ChatGPT Empreendedores", slogan: "Prompts que executam", cat: "C" },
  { slug: "instagram-negocios-locais-ia", name: "Instagram Local IA", slogan: "Conteúdo que atrai", cat: "D" },
  { slug: "google-meu-negocio-masterclass", name: "Google Meu Negócio", slogan: "Apareça no Maps", cat: "D" },
];

const PALETTE = {
  J: { primary: "#10B981", secondary: "#064E3B", accent: "#FFFFFF" },
  A: { primary: "#10B981", secondary: "#1F2937", accent: "#ECFDF5" },
  B: { primary: "#2563EB", secondary: "#1E3A8A", accent: "#EFF6FF" },
  C: { primary: "#7C3AED", secondary: "#F59E0B", accent: "#F5F3FF" },
  D: { primary: "#EC4899", secondary: "#7C3AED", accent: "#FDF2F8" },
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function iconPath(cat) {
  if (cat === "A") return `<path d="M28 18c0-8 6-14 14-14s14 6 14 14c0 10-14 22-14 22S28 28 28 18z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="42" cy="18" r="4" fill="currentColor"/>`;
  if (cat === "B") return `<rect x="26" y="12" width="32" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M34 24h16M34 34h16M34 44h10" stroke="currentColor" stroke-width="3"/>`;
  if (cat === "C") return `<circle cx="42" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="3"/><path d="M32 32h20M42 22v20" stroke="currentColor" stroke-width="3"/>`;
  if (cat === "D") return `<rect x="24" y="16" width="36" height="36" rx="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="42" cy="34" r="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="54" cy="24" r="3" fill="currentColor"/>`;
  return `<path d="M30 40 L42 18 L54 40 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="42" cy="48" r="4" fill="currentColor"/>`;
}

function logoHorizontal(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" role="img" aria-label="${esc(p.name)}">
  <rect width="400" height="120" fill="${c.accent}"/>
  <rect x="0" y="0" width="8" height="120" fill="${c.primary}"/>
  <g transform="translate(24,20)" color="${c.primary}">${iconPath(p.cat)}</g>
  <text x="110" y="58" font-family="Geist, Inter, system-ui, sans-serif" font-size="22" font-weight="700" fill="${c.secondary}">${esc(p.name)}</text>
  <text x="110" y="86" font-family="Geist, Inter, system-ui, sans-serif" font-size="14" fill="${c.primary}">${esc(p.slogan)}</text>
</svg>`;
}

function logoSquare(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="${esc(p.name)}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c.primary}"/><stop offset="100%" stop-color="${c.secondary}"/></linearGradient></defs>
  <rect width="400" height="400" fill="url(#g)"/>
  <g transform="translate(148,90) scale(1.4)" color="#fff">${iconPath(p.cat)}</g>
  <text x="200" y="280" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="26" font-weight="700" fill="#fff">${esc(p.name)}</text>
  <text x="200" y="318" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="16" fill="${c.accent}">${esc(p.slogan)}</text>
</svg>`;
}

function logoDark(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" role="img" aria-label="${esc(p.name)}">
  <rect width="400" height="120" fill="#0B1220"/>
  <rect x="0" y="0" width="8" height="120" fill="${c.primary}"/>
  <g transform="translate(24,20)" color="${c.primary}">${iconPath(p.cat)}</g>
  <text x="110" y="58" font-family="Geist, Inter, system-ui, sans-serif" font-size="22" font-weight="700" fill="#F8FAFC">${esc(p.name)}</text>
  <text x="110" y="86" font-family="Geist, Inter, system-ui, sans-serif" font-size="14" fill="${c.primary}">${esc(p.slogan)}</text>
</svg>`;
}

function favicon(c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${c.primary}"/>
  <circle cx="16" cy="16" r="7" fill="none" stroke="#fff" stroke-width="2.5"/>
</svg>`;
}

function ogImage(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c.secondary}"/><stop offset="100%" stop-color="${c.primary}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <text x="80" y="260" font-family="Geist, Inter, system-ui, sans-serif" font-size="64" font-weight="800" fill="#fff">${esc(p.name)}</text>
  <text x="80" y="340" font-family="Geist, Inter, system-ui, sans-serif" font-size="32" fill="${c.accent}">${esc(p.slogan)} · BalcãoIA Local</text>
  <text x="80" y="540" font-family="Geist, Inter, system-ui, sans-serif" font-size="24" fill="#fff" opacity="0.85">balcaoialocal.com.br</text>
</svg>`;
}

function socialCover(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="${c.accent}"/>
  <rect y="0" width="1080" height="24" fill="${c.primary}"/>
  <g transform="translate(430,220) scale(2.8)" color="${c.primary}">${iconPath(p.cat)}</g>
  <text x="540" y="620" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="56" font-weight="800" fill="${c.secondary}">${esc(p.name)}</text>
  <text x="540" y="700" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="32" fill="${c.primary}">${esc(p.slogan)}</text>
</svg>`;
}

function storyTemplate(p, c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs><linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c.secondary}"/><stop offset="100%" stop-color="${c.primary}"/></linearGradient></defs>
  <rect width="1080" height="1920" fill="url(#st)"/>
  <text x="540" y="720" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="64" font-weight="800" fill="#fff">${esc(p.name)}</text>
  <text x="540" y="820" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="36" fill="${c.accent}">${esc(p.slogan)}</text>
  <rect x="290" y="980" width="500" height="90" rx="12" fill="#fff"/>
  <text x="540" y="1038" text-anchor="middle" font-family="Geist, Inter, system-ui, sans-serif" font-size="28" font-weight="700" fill="${c.secondary}">Ver oferta</text>
</svg>`;
}

function writeAll(p) {
  const c = PALETTE[p.cat];
  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const files = {
    "logo-horizontal.svg": logoHorizontal(p, c),
    "logo-square.svg": logoSquare(p, c),
    "logo-dark.svg": logoDark(p, c),
    "favicon.svg": favicon(c),
    "og-image.svg": ogImage(p, c),
    "social-cover.svg": socialCover(p, c),
    "story-template.svg": storyTemplate(p, c),
  };
  for (const [name, body] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), body, "utf8");
  }
  // alias factory slug
  if (p.alt) {
    const alias = path.join(OUT, p.alt);
    fs.mkdirSync(alias, { recursive: true });
    for (const [name, body] of Object.entries(files)) {
      fs.writeFileSync(path.join(alias, name), body, "utf8");
    }
  }
  console.log(`[ok] logos ${p.slug}`);
}

fs.mkdirSync(OUT, { recursive: true });
for (const p of PRODUCTS) writeAll(p);

const index = {
  generatedAt: new Date().toISOString(),
  products: PRODUCTS.map((p) => ({ slug: p.slug, name: p.name, cat: p.cat })),
};
fs.writeFileSync(path.join(OUT, "index-lote1.json"), JSON.stringify(index, null, 2));
console.log(`\nDone. ${PRODUCTS.length} products → ${OUT}`);
