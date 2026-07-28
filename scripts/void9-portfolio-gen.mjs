/**
 * VOID-9 portfolio generator — cria kits de produto locais (sem secrets).
 * Uso: node scripts/void9-portfolio-gen.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("c:/Users/Usuário/Desktop/BalcãoIA Local/void9-portfolio");

const PRODUCTS = [
  {
    slug: "checklist-atendimento-local",
    tier: 1,
    price: 37,
    name: "Checklist Master — Atendimento Local",
    promise: "Checklist operacional para padronizar respostas, prazos e handoff sem gambiarra.",
    mechanism: "Protocolo C.L.A.R.O. (Checar, Listar, Alinhar, Responder, Observar)",
    avatar: "Dono de negócio local que improvisa no WhatsApp",
  },
  {
    slug: "desafio-7d-atendimento",
    tier: 1,
    price: 47,
    name: "Desafio 7 Dias — Atendimento Organizado",
    promise: "Um dia, uma ação: em 7 dias você sai do improviso para um padrão mínimo viável.",
    mechanism: "Sprint 7D espelhando o Método BalcãoIA",
    avatar: "MEI/autônomo sobrecarregado",
  },
  {
    slug: "whatsapp-etico-negocios",
    tier: 1,
    price: 67,
    name: "WhatsApp Ético para Negócios Locais",
    promise: "Roteiros e políticas de mensagem com consentimento, LGPD e clareza — sem automação proibida.",
    mechanism: "Framework C.O.N.S.E.N.T.E.",
    avatar: "Negócio que usa WhatsApp como canal principal",
  },
  {
    slug: "guia-catalogo-precos",
    tier: 1,
    price: 57,
    name: "Guia Prático — Catálogo e Preços Claros",
    promise: "Organize catálogo, exceções e políticas para parar de inventar preço na hora.",
    mechanism: "Mapa de Oferta Única",
    avatar: "Loja/serviço com preço 'na cabeça'",
  },
  {
    slug: "curso-organizacao-atendimento",
    tier: 2,
    price: 297,
    name: "Curso — Organização de Atendimento com IA Assistida",
    promise: "10 módulos para estruturar base, roteiros e revisão humana antes de usar IA.",
    mechanism: "Método BalcãoIA aplicado em curso",
    avatar: "Empreendedor pronto para investir em sistema",
  },
  {
    slug: "programa-8-semanas-balcao",
    tier: 2,
    price: 397,
    name: "Programa 8 Semanas — Balcão Organizado",
    promise: "Transformação semanal com entregáveis e rituais de melhoria contínua.",
    mechanism: "Ciclo Semanal de Clareza Comercial",
    avatar: "Negócio com equipe pequena",
  },
  {
    slug: "sistema-balcao-proprietario",
    tier: 2,
    price: 497,
    name: "Sistema B.A.L.C.ÃO — Passo a Passo Completo",
    promise: "Sistema proprietário: Blocos, Agenda, Lista, Check-out, Âncora, Output + atendimento.",
    mechanism: "B.A.L.C.ÃO Full Stack",
    avatar: "Operador que quer método único",
  },
  {
    slug: "workshop-ia-atendimento",
    tier: 2,
    price: 197,
    name: "Workshop Gravado — IA no Atendimento (com revisão humana)",
    promise: "Workshop prático: prompts, guardrails e testes no simulador.",
    mechanism: "Prompt → Revisão → Publicação",
    avatar: "Quem já usa ChatGPT e erra preço",
  },
  {
    slug: "bundle-entrada-local",
    tier: 2,
    price: 147,
    name: "Bundle Entrada Local (FOCO + Checklist + WhatsApp Ético)",
    promise: "Pacote de entrada com 3 produtos Tier 1 e bônus de implementação.",
    mechanism: "Stack de Entrada BalcãoIA",
    avatar: "Comprador que quer começar completo",
  },
  {
    slug: "mentoria-grupo-gravada",
    tier: 3,
    price: 997,
    name: "Mentoria em Grupo Gravada — Operadores Locais",
    promise: "Sessões gravadas + playbooks para implementar o sistema com accountability.",
    mechanism: "Sprints gravados + revisão de casos",
    avatar: "Negócio sério em escala inicial",
  },
  {
    slug: "curso-avancado-comunidade",
    tier: 3,
    price: 1497,
    name: "Curso Avançado + Comunidade (12 meses de atualizações)",
    promise: "Camada avançada: qualidade, equipe, métricas e IA com governança.",
    mechanism: "Operação Contínua BalcãoIA",
    avatar: "Multiunidade / agência local",
  },
  {
    slug: "certificado-conclusao-7d",
    tier: 3,
    price: 997,
    name: "Trilha Certificada de Conclusão — Método 7D",
    promise: "Trilha com critérios de conclusão e certificado de participação (não é registro profissional).",
    mechanism: "Rubrica de Conclusão 7D",
    avatar: "Quem precisa de comprovação de estudo",
  },
  {
    slug: "mastermind-gravado-operadores",
    tier: 3,
    price: 1997,
    name: "Mastermind Gravado — Operadores de Balcão",
    promise: "Biblioteca de decisões reais (casos) + frameworks de priorização.",
    mechanism: "Casos → Decisão → Template",
    avatar: "Operadores experientes",
  },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function w(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function affiliateKit(p) {
  return `# Kit Afiliados — ${p.name}

## Como divulgar
- Use a oferta fiel (preço, garantia, entregáveis)
- Sem promessa de renda/resultado garantido
- Sem marcar marcas Meta/WhatsApp/Hotmart como parceria oficial

## Canais que mais combinam
WhatsApp (base quente), Instagram (orgânico), YouTube curto, e-mail

## O que NÃO fazer
Spam, renda garantida, fake scarcity, uso indevido de marca
`;
}

function buildProduct(p) {
  const dir = path.join(ROOT, p.slug);
  const bump = Math.round(p.price * 0.35);
  const upsell =
    p.tier === 1 ? "curso-organizacao-atendimento (R$297)" : p.tier === 2 ? "mentoria-grupo-gravada (R$997)" : "suite via BalcãoIA Studio";

  w(path.join(dir, "README.md"), `# ${p.name}\n\nTeaser privado. Ticket R$${p.price}. Ecossistema BalcãoIA.\n`);
  w(
    path.join(dir, ".gitignore"),
    `.env\n.env.local\nnode_modules/\n*.log\n.DS_Store\ndist/\n`
  );
  w(
    path.join(dir, ".env.example"),
    `HOTMART_CLIENT_ID=\nHOTMART_CLIENT_SECRET=\nHOTMART_HOTTOK=\nCHECKOUT_URL=\nPRODUCT_PRICE_BRL=${p.price}\n`
  );
  w(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: p.slug,
        private: true,
        type: "module",
        version: "1.0.0",
        scripts: { template: "node src/api/product-manager.js" },
      },
      null,
      2
    )
  );

  w(
    path.join(dir, "research/nicho-analysis.md"),
    `# Research — ${p.name}\n\n**Tier:** ${p.tier}\n**Ticket:** R$ ${p.price}\n**Avatar:** ${p.avatar}\n**Promessa:** ${p.promise}\n**Mecanismo:** ${p.mechanism}\n\n## Tendência 2025/2026\nNegócios locais + IA assistida + produtividade prática (sem get-rich).\n\n## Gap\nConcorrência genérica; poucos produtos com compliance e ponte para Studio.\n`
  );
  w(
    path.join(dir, "research/avatar-ultra-detalhado.md"),
    `# Avatar\n\n${p.avatar}\n\nDores: improviso, retrabalho, medo de errar com cliente.\nDesejos: padrão claro, menos culpa, mais previsibilidade.\nObjeções: tempo, “já tentei”, medo de perder cliente.\n`
  );
  w(
    path.join(dir, "docs/oferta-completa.md"),
    `# Oferta — ${p.name}\n\n- Preço: **R$ ${p.price}**\n- Promessa: ${p.promise}\n- Mecanismo: ${p.mechanism}\n- Order bump: Pack implementação (+R$ ${bump})\n- Upsell: ${upsell}\n- Downsell: mini-versão R$ ${Math.max(27, Math.round(p.price * 0.4))}\n- Garantia: 7 dias\n- Compliance: sem renda garantida; sem automação não oficial\n`
  );
  w(
    path.join(dir, "docs/mecanismo-unico.md"),
    `# Mecanismo — ${p.mechanism}\n\nDiferencia pela aplicabilidade em balcão real + compliance BalcãoIA.\n`
  );
  w(
    path.join(dir, "docs/pricing-strategy.md"),
    `# Pricing\n\nÂncora: R$ ${Math.round(p.price * 1.8)} → Preço: R$ ${p.price}\nBump +${bump} | Upsell ${upsell}\n`
  );
  w(
    path.join(dir, "docs/projecao-financeira.md"),
    `# Projeção (hipóteses educativas)\n\n| Cenário | Conv. | 1000 visitas | Receita bruta (sem bump) |\n|---------|-------|--------------|---------------------------|\n| Conservador 2% | 20 vendas | R$ ${20 * p.price} |\n| Realista 5% | 50 vendas | R$ ${50 * p.price} |\n| Otimista 10% | 100 vendas | R$ ${100 * p.price} |\n\nAfiliados 50% das vendas: metade com comissão 50%.\n**Não é garantia de resultado.**\n`
  );
  w(
    path.join(dir, "docs/funil-visual.md"),
    `# Funil\n\nTráfego → Landing → Checkout R$${p.price} → Bump → Obrigado/Upsell → E-mails → Webhook Studio\n`
  );

  // Product content
  w(
    path.join(dir, "product/conteudo-principal.md"),
    `# ${p.name}\n\n## Introdução\n${p.promise}\n\n## Mecanismo\n${p.mechanism}\n\n## Como usar\n1. Diagnóstico rápido\n2. Implementação mínima\n3. Revisão semanal\n\n## Aviso\nConteúdo educativo. Resultados variam. Não promete renda.\n`
  );
  for (let i = 1; i <= (p.tier === 1 ? 5 : p.tier === 2 ? 8 : 10); i++) {
    w(
      path.join(dir, `product/modulo-${String(i).padStart(2, "0")}.md`),
      `# Módulo ${i} — ${p.name}\n\n## Objetivo\nAplicar uma peça do ${p.mechanism}.\n\n## Conteúdo\n- Conceito prático\n- Exemplo de negócio local\n- Exercício de 15–30 min\n- Critério de pronto\n\n## Exercício\nEscreva o estado atual → ação desta semana → evidência de conclusão.\n`
    );
  }
  for (let i = 1; i <= 3; i++) {
    w(
      path.join(dir, `product/bonus-0${i}.md`),
      `# Bônus ${i} — ${p.name}\n\nTemplate/checklist de implementação rápida do módulo correspondente.\n`
    );
  }

  w(
    path.join(dir, "copy/pagina-de-venda-longa.md"),
    `# Página longa — ${p.name}\n\n**Headline:** ${p.promise}\n\n**Problema:** improviso no atendimento/rotina do negócio local.\n\n**Mecanismo:** ${p.mechanism}\n\n**Oferta:** R$ ${p.price} · garantia 7 dias · bump +R$ ${bump}\n\n**CTA:** Quero acessar agora\n\n**FAQ:** funciona sem equipe? sim. garante vendas? não. tem automação proibida? não.\n`
  );
  w(
    path.join(dir, "copy/pagina-de-venda-curta.md"),
    `# Curta\n\n${p.name} — R$ ${p.price}\n${p.promise}\nCTA → checkout\n`
  );
  w(
    path.join(dir, "copy/headline-bank-30.md"),
    Array.from({ length: 30 }, (_, i) => `${i + 1}. ${p.name}: ${p.promise} (${i + 1})`).join("\n") +
      "\n"
  );
  w(
    path.join(dir, "copy/vsl-roteiro-completo.md"),
    `# VSL — ${p.name}\n\n0-20s gancho · 20-90s dor · 90-180s mecanismo ${p.mechanism} · oferta · garantia · CTA\n`
  );
  w(path.join(dir, "copy/checkout-copy.md"), `Checkout: ${p.name} — R$ ${p.price} · 7 dias garantia\n`);
  w(path.join(dir, "copy/order-bump-copy.md"), `Bump: Pack implementação +R$ ${bump}\n`);
  w(path.join(dir, "copy/upsell-01-copy.md"), `Upsell: ${upsell}\n`);
  w(path.join(dir, "copy/downsell-copy.md"), `Downsell: mini versão\n`);
  w(path.join(dir, "copy/objecoes-e-respostas.md"), `Objeção tempo → implementação mínima. Objeção renda → não prometemos.\n`);
  w(path.join(dir, "copy/prova-social-scripts.md"), `Script: peça depoimento real após 7 dias de uso. Não invente resultados.\n`);

  w(path.join(dir, "affiliate-kit/README-afiliados.md"), affiliateKit(p));
  w(
    path.join(dir, "affiliate-kit/guia-do-afiliado.md"),
    `# Guia do afiliado — ${p.name}\n\n1. Cadastre-se na Hotmart\n2. Pegue o link\n3. Use swipes deste kit\n4. Respeite compliance\n`
  );
  w(
    path.join(dir, "affiliate-kit/swipe-copy-whatsapp.md"),
    `1. "Organize o atendimento sem gambiarra: ${p.name}"\n2. "Sem promessa de renda — método prático R$ ${p.price}"\n`
  );
  w(
    path.join(dir, "affiliate-kit/swipe-copy-instagram.md"),
    `Post: problema do improviso → ${p.mechanism} → CTA link\n`
  );
  w(
    path.join(dir, "affiliate-kit/swipe-copy-email.md"),
    `Assunto: Para quem atende no improviso\nCorpo: ${p.promise} → CTA\n`
  );
  w(path.join(dir, "affiliate-kit/swipe-copy-youtube.md"), `Roteiro 60s: dor → mecanismo → CTA\n`);
  w(path.join(dir, "affiliate-kit/swipe-copy-tiktok.md"), `Hook 3s + demonstração rápida + CTA\n`);
  w(path.join(dir, "affiliate-kit/criativos-descricao.md"), `Paleta: petrol #0f3d4c / amber #e8a317. Sem fake luxury.\n`);
  w(path.join(dir, "affiliate-kit/palavras-chave-seo.md"), `atendimento local, whatsapp negócio, organização MEI, ia atendimento responsável\n`);
  w(path.join(dir, "affiliate-kit/perguntas-frequentes.md"), `Preciso aparecer? Não. Preciso de tráfego pago? Não necessariamente.\n`);
  w(path.join(dir, "affiliate-kit/regras-de-divulgacao.md"), `Proibido: renda garantida, spam, uso indevido de marca.\n`);

  w(
    path.join(dir, "landing/index.html"),
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${p.name}</title><link rel="stylesheet" href="style.css"/></head><body><header class="hero"><div class="wrap"><p class="badge">BalcãoIA Ecosystem · Tier ${p.tier}</p><h1>${p.name}</h1><p>${p.promise}</p><p class="price">R$ ${p.price}</p><a class="cta" href="https://pay.hotmart.com/SEU_CHECKOUT">Quero acessar</a><p class="fine">Sem promessa de renda · Garantia 7 dias</p></div></header><section class="wrap"><h2>Mecanismo</h2><p>${p.mechanism}</p></section><script src="script.js"></script></body></html>\n`
  );
  w(
    path.join(dir, "landing/style.css"),
    `body{margin:0;font-family:system-ui,sans-serif;background:#f4f7f8;color:#1c1c1c}.hero{background:linear-gradient(145deg,#0f3d4c,#165a6e);color:#fff;padding:56px 0}.wrap{width:min(900px,92%);margin:0 auto}.cta{display:inline-block;background:#e8a317;color:#1a1408;font-weight:800;text-decoration:none;padding:12px 18px;border-radius:12px}.price{font-size:2.4rem;font-weight:900}.fine{opacity:.75;font-size:.85rem}.badge{color:#e8a317;font-size:.75rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}\n`
  );
  w(path.join(dir, "landing/script.js"), `console.info('${p.slug} landing');\n`);
  w(
    path.join(dir, "landing/obrigado.html"),
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Obrigado</title></head><body><h1>Obrigado — ${p.name}</h1><p>Acesse os arquivos na Hotmart.</p><p><a href="https://balcaoia-studio.vercel.app/vendas">Conhecer Método 7D</a></p></body></html>\n`
  );
  w(
    path.join(dir, "landing/upsell.html"),
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Upsell</title></head><body><h1>Próximo nível</h1><p>${upsell}</p><a href="https://balcaoia-studio.vercel.app/vendas">Ver oferta</a></body></html>\n`
  );

  for (let i = 1; i <= 12; i++) {
    w(
      path.join(dir, `emails/${String(i).padStart(2, "0")}-seq.md`),
      `# Email ${i} — ${p.name}\n\nAssunto: [${p.slug}] passo ${i}\n\nCorpo alinhado ao funil. Sem renda garantida. CTA checkout/upsell.\n`
    );
  }

  w(path.join(dir, "ads/facebook-ads-10.md"), `# FB Ads — ${p.name}\n10 variações focadas em dor do improviso + CTA.\n`);
  w(path.join(dir, "ads/instagram-feed-ads.md"), `# IG Feed — ${p.name}\n`);
  w(path.join(dir, "ads/instagram-stories-ads.md"), `# IG Stories — ${p.name}\n`);
  w(path.join(dir, "ads/tiktok-ads.md"), `# TikTok — ${p.name}\n`);
  w(path.join(dir, "ads/google-ads.md"), `# Google — ${p.name}\n`);
  w(path.join(dir, "ads/youtube-ads.md"), `# YouTube — ${p.name}\n`);

  w(
    path.join(dir, "src/api/hotmart-auth.js"),
    `export async function getAccessToken(){const id=process.env.HOTMART_CLIENT_ID,sec=process.env.HOTMART_CLIENT_SECRET;if(!id||!sec)throw new Error('Missing Hotmart creds');const basic=Buffer.from(id+':'+sec).toString('base64');const url=new URL('https://api-sec-vlc.hotmart.com/security/oauth/token');url.searchParams.set('grant_type','client_credentials');const res=await fetch(url,{method:'POST',headers:{Authorization:'Basic '+basic}});const data=await res.json();if(!res.ok)throw new Error(JSON.stringify(data));return data.access_token;}\n`
  );
  w(
    path.join(dir, "src/api/product-manager.js"),
    `/** Template do produto — criação visual na Hotmart + dados canônicos */\nexport const product = ${JSON.stringify({ name: p.name, price: p.price, tier: p.tier, mechanism: p.mechanism }, null, 2)};\nconsole.log(JSON.stringify(product,null,2));\n`
  );
  w(
    path.join(dir, "src/api/checkout-manager.js"),
    `export const checkout = { price: ${p.price}, bump: ${bump}, guaranteeDays: 7 };\nconsole.log(checkout);\n`
  );
  w(
    path.join(dir, "src/api/affiliate-manager.js"),
    `export const affiliates = { commissionPercent: 50, cookieDays: 90 };\n`
  );
  w(
    path.join(dir, "src/api/webhook-handler.js"),
    `export function mapEvent(e){if(['PURCHASE_APPROVED','PURCHASE_COMPLETE'].includes(e))return 'activate';if(['PURCHASE_REFUNDED','PURCHASE_CANCELED'].includes(e))return 'suspend';return 'log';}\n`
  );
  w(path.join(dir, "src/api/email-automation.js"), `export const sequences = ['welcome','upsell','winback'];\n`);
  w(path.join(dir, "src/api/reports-manager.js"), `export function stubReport(){return {note:'Use Hotmart dashboard + Studio admin'};}\n`);

  w(
    path.join(dir, "checklists/hotmart-configuracao.md"),
    `# Hotmart — ${p.name}\n\n- [ ] Criar produto R$ ${p.price}\n- [ ] Bump +${bump}\n- [ ] Webhook Studio\n- [ ] HOTTOK\n- [ ] Afiliados 50%\n- [ ] Checkout na landing\n`
  );
  w(path.join(dir, "checklists/pre-lancamento.md"), `# Pré-lançamento — ${p.name}\n- [ ] PDF/arquivos\n- [ ] Landing\n- [ ] E-mails\n- [ ] Kit afiliados\n`);
  w(path.join(dir, "checklists/lancamento.md"), `# Lançamento 7 dias — ${p.name}\n`);
  w(path.join(dir, "checklists/pos-lancamento.md"), `# Pós — ${p.name}\n- [ ] Métricas\n- [ ] Depoimentos reais\n- [ ] Upsell\n`);

  return dir;
}

ensureDir(ROOT);
w(
  path.join(ROOT, "PORTFOLIO.md"),
  `# Portfólio VOID-9 × BalcãoIA\n\nEcossistema de entrada → core → premium, sempre compliance-first.\n\nJá existentes: \`foco-14\`, \`rotina-clareza-freelancer\`.\n\n` +
    PRODUCTS.map((p, i) => `${i + 3}. **${p.name}** (\`${p.slug}\`) — Tier ${p.tier} — R$ ${p.price}`).join("\n") +
    `\n\nProduto âncora do Studio: Método BalcãoIA 7D (repo balcaoia-local).\n`
);

for (const p of PRODUCTS) {
  const dir = buildProduct(p);
  console.log("built", dir);
}
console.log("ROOT", ROOT);
console.log("COUNT", PRODUCTS.length);
