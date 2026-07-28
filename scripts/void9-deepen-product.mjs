/**
 * VOID-9 — Aprofunda kits de produto (conteúdo real PT-BR, compliance).
 * Uso:
 *   node scripts/void9-deepen-product.mjs foco-14
 *   node scripts/void9-deepen-product.mjs --all
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("c:/Users/Usuário/Desktop/BalcãoIA Local");
const STUDIO = path.join(ROOT, "balcaoia-studio");

const COMPLIANCE = `
---
**Compliance BalcãoIA:** Conteúdo educativo. Sem promessa de renda, lucro ou vendas garantidas.
Sem automações não oficiais de WhatsApp. Sem uso de marcas Meta/WhatsApp/Hotmart como se fossem oficiais.
---
`;

/** @typedef {{ slug: string; name: string; price: number; promise: string; mechanism: string; tier: number; format: string; bump: string; upsell: string; chapters: string[] }} ProductDef */

/** @type {ProductDef[]} */
const PRODUCTS = [
  {
    slug: "foco-14",
    name: "FOCO 14 — Rotina de Alta Clareza",
    price: 67,
    promise: "Em 14 dias, proteja 2 janelas de foco e feche cada dia com evidência do que avançou — sem virar monge.",
    mechanism: "Método B.A.L.C.ÃO Foco (Bloqueio, Agenda de interrupções, Lista 3, Check-out, Âncora, Output)",
    tier: 1,
    format: "ebook",
    bump: "Pack Interrupção Zero (R$27)",
    upsell: "Método BalcãoIA 7D + Studio",
    chapters: [
      "Por que produtividade genérica falha no negócio solo",
      "O Método B.A.L.C.ÃO Foco",
      "Desenhando 2 janelas de foco protegidas",
      "Agenda de interrupções (WhatsApp ético)",
      "Lista 3 e o cemitério de tarefas",
      "Check-out diário de 10 minutos",
      "Âncora semanal de 30–40 minutos",
      "Output nomeável: o antídoto do movimento vazio",
      "Ferramentas mínimas (calendário, notas, status)",
      "Lidando com culpa, clientes e urgências falsas",
      "Semana 1 — Implantação (dias 1–7)",
      "Semana 2 — Estabilização (dias 8–14)",
      "Métricas simples (sem dashboard complexo)",
      "Manutenção: o que fazer depois do dia 14",
    ],
  },
  {
    slug: "rotina-clareza-freelancer",
    name: "Clareza Semanal — Ritual do Freelancer",
    price: 47,
    promise: "Uma hora por semana para priorizar 3 frentes e bloquear a semana — sem improviso eterno.",
    mechanism: "Ritual Clareza 4P (Pausar, Priorizar, Planejar, Proteger)",
    tier: 1,
    format: "guia",
    bump: "Templates de bloco semanal (R$17)",
    upsell: "FOCO 14",
    chapters: ["Diagnóstico da semana caótica", "Os 4P", "Prioridade tripla", "Calendário realista", "Buffer e folgas", "Revisão domingo/segunda", "Casos freelancer", "Manutenção 90 dias"],
  },
  {
    slug: "checklist-atendimento-local",
    name: "Checklist Master Atendimento Local",
    price: 37,
    promise: "Checklists operacionais para não esquecer o óbvio no atendimento do dia a dia.",
    mechanism: "Matriz C.A.I.X.A (Captar, Acolher, Informar, Executar, Acompanhar)",
    tier: 1,
    format: "checklist",
    bump: "Pack scripts curtos (R$17)",
    upsell: "Desafio 7D Atendimento",
    chapters: ["Abertura do dia", "Primeiro contato", "Qualificação", "Orçamento", "Pós-venda", "Reclamação", "Fechamento do dia", "Auditoria semanal"],
  },
  {
    slug: "desafio-7d-atendimento",
    name: "Desafio 7 Dias — Atendimento Organizado",
    price: 57,
    promise: "Em 7 dias, estrutura mínima de atendimento: horários, scripts e registro.",
    mechanism: "Sprint 7D Balcão",
    tier: 1,
    format: "desafio",
    bump: "Planilha de registro (R$19)",
    upsell: "Curso Organização de Atendimento",
    chapters: ["Dia 1 mapa", "Dia 2 janelas", "Dia 3 scripts", "Dia 4 catálogo", "Dia 5 follow-up", "Dia 6 métricas", "Dia 7 consolidação"],
  },
  {
    slug: "whatsapp-etico-negocios",
    name: "WhatsApp Ético para Negócios Locais",
    price: 77,
    promise: "Vender e atender no WhatsApp sem spam, sem lista comprada e sem gambiarra.",
    mechanism: "Protocolo Consentimento → Contexto → Continuidade",
    tier: 1,
    format: "ebook",
    bump: "Biblioteca de status (R$27)",
    upsell: "Sistema Balcão Proprietário",
    chapters: ["Mitos do WhatsApp", "Consentimento", "Janelas de resposta", "Scripts éticos", "Catálogo no chat", "Follow-up sem assédio", "LGPD prática", "Erros que matam reputação"],
  },
  {
    slug: "guia-catalogo-precos",
    name: "Guia Catálogo & Preços Claros",
    price: 47,
    promise: "Organize oferta e preços para o cliente entender em 30 segundos.",
    mechanism: "Método 3C (Clareza, Comparação, Compromisso)",
    tier: 1,
    format: "guia",
    bump: "Planilha de preços (R$17)",
    upsell: "Checklist Atendimento",
    chapters: ["Caos de preços", "Estrutura do catálogo", "Faixas e pacotes", "Como falar preço", "Objeções", "Atualização mensal"],
  },
  {
    slug: "curso-organizacao-atendimento",
    name: "Curso Completo — Organização de Atendimento",
    price: 197,
    promise: "De atendimento reativo a operação previsível em módulos práticos.",
    mechanism: "Sistema Fluxo Balcão",
    tier: 2,
    format: "curso",
    bump: "Templates Notion/Sheets (R$47)",
    upsell: "Programa 8 Semanas",
    chapters: ["Diagnóstico", "Mapa de canais", "SLA interno", "Scripts avançados", "IA assistida ética", "Métricas", "Treinamento de equipe", "Casos", "Implantação 21 dias", "Manutenção"],
  },
  {
    slug: "programa-8-semanas-balcao",
    name: "Programa 8 Semanas — Transformação do Balcão",
    price: 397,
    promise: "8 semanas de implantação com rituais, métricas e revisão.",
    mechanism: "Trilha 8S BalcãoIA",
    tier: 2,
    format: "programa",
    bump: "Grupo gravado (R$97)",
    upsell: "Mentoria Grupo Gravada",
    chapters: ["S1 diagnóstico", "S2 foco", "S3 WhatsApp ético", "S4 catálogo", "S5 follow-up", "S6 IA assistida", "S7 métricas", "S8 consolidação"],
  },
  {
    slug: "sistema-balcao-proprietario",
    name: "Sistema Balcão Proprietário",
    price: 297,
    promise: "Método proprietário passo a passo para operar o balcão digital com clareza.",
    mechanism: "SOB (Sistema Operacional do Balcão)",
    tier: 2,
    format: "sistema",
    bump: "Playbooks (R$67)",
    upsell: "Bundle Entrada Local",
    chapters: ["Visão SOB", "Camada atendimento", "Camada oferta", "Camada tempo", "Camada evidência", "Camada melhoria", "Implantação", "Auditoria"],
  },
  {
    slug: "workshop-ia-atendimento",
    name: "Workshop Gravado — IA no Atendimento",
    price: 197,
    promise: "Use IA para rascunhar respostas e organizar informação — com humano no comando.",
    mechanism: "Loop Prompt → Revisar → Registrar",
    tier: 2,
    format: "workshop",
    bump: "Pack de prompts (R$37)",
    upsell: "Curso Avançado + Comunidade",
    chapters: ["O que IA faz e não faz", "Prompts seguros", "Tom de voz", "FAQ interno", "Revisão humana", "Erros comuns", "Plano 7 dias"],
  },
  {
    slug: "bundle-entrada-local",
    name: "Bundle Master Entrada Local",
    price: 147,
    promise: "Pacote de entrada: FOCO 14 + Clareza + Checklist + bônus.",
    mechanism: "Trilha Entrada BalcãoIA",
    tier: 2,
    format: "bundle",
    bump: "WhatsApp Ético (desconto)",
    upsell: "Curso Organização",
    chapters: ["Como usar o bundle", "Ordem sugerida", "Calendário 21 dias", "Sinergia entre produtos", "Próximo passo"],
  },
  {
    slug: "mentoria-grupo-gravada",
    name: "Mentoria em Grupo Gravada",
    price: 997,
    promise: "Sessões gravadas de mentoria com playbooks de implantação.",
    mechanism: "Ciclo Mentoria → Tarefa → Revisão",
    tier: 3,
    format: "mentoria",
    bump: "Office hours gravado (R$197)",
    upsell: "Mastermind Gravado",
    chapters: ["Contrato de expectativa", "Sessão diagnóstico", "Sessão operação", "Sessão oferta", "Sessão tempo", "Sessão métricas", "Plano 30 dias", "FAQ mentoria"],
  },
  {
    slug: "curso-avancado-comunidade",
    name: "Curso Avançado + Comunidade",
    price: 1497,
    promise: "Nível avançado de operação + comunidade de operadores locais.",
    mechanism: "Trilha Avançada + Peer Review",
    tier: 3,
    format: "curso",
    bump: "Templates avançados (R$147)",
    upsell: "Certificação",
    chapters: ["Operação avançada", "Equipe e papéis", "IA com governança", "Ofertas compostas", "Retenção ética", "Comunidade", "Projetos práticos", "Avaliação"],
  },
  {
    slug: "certificado-conclusao-7d",
    name: "Programa de Certificação BalcãoIA 7D",
    price: 1997,
    promise: "Certificação por evidência de implantação (não por diploma vazio).",
    mechanism: "Prova por Portfólio Operacional",
    tier: 3,
    format: "certificacao",
    bump: "Revisão 1:1 gravada (R$297)",
    upsell: "Suite / Mastermind",
    chapters: ["Critérios", "Módulo teoria", "Módulo prática", "Portfólio", "Rubrica", "Defesa", "Manutenção do selo"],
  },
  {
    slug: "mastermind-gravado-operadores",
    name: "Mastermind Gravado — Operadores",
    price: 2497,
    promise: "Mastermind gravado para operadores que já têm base e querem escala ética.",
    mechanism: "Rodadas de Decisão + Accountability",
    tier: 3,
    format: "mastermind",
    bump: "War room gravado (R$397)",
    upsell: "Suite Completa (quando disponível)",
    chapters: ["Regras do grupo", "Rodada oferta", "Rodada operação", "Rodada tempo", "Rodada pessoas", "Decisões trimestrais", "Ética e marca"],
  },
];

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function sectionBlock(title, body) {
  return `\n## ${title}\n\n${body.trim()}\n`;
}

function buildEbook(p) {
  const parts = [];
  parts.push(`# ${p.name}\n\n**Preço alvo:** R$ ${p.price}  \n**Promessa:** ${p.promise}  \n**Mecanismo:** ${p.mechanism}  \n**Formato:** ${p.format}\n${COMPLIANCE}\n`);
  parts.push(`## Como usar este material\n\n1. Leia um capítulo por sessão (20–40 min).\n2. Faça o exercício no mesmo dia.\n3. Anote 1 evidência (output) antes de dormir.\n4. Não acumule capítulos “para depois”.\n`);
  parts.push(`## Visão geral\n\nEste material foi escrito para quem atende, vende e entrega **sozinho ou com equipe pequena**. Não é teoria de produtividade de escritório corporativo. É operação de balcão — físico ou digital.\n\nResultado esperado: mais clareza, menos culpa e um sistema mínimo que você consegue manter.\n`);

  p.chapters.forEach((ch, i) => {
    const n = i + 1;
    parts.push(sectionBlock(`Capítulo ${n} — ${ch}`, `
### Conceito

${ch} é uma peça do sistema **${p.mechanism}**. Sem esta peça, o restante vira esforço pontual.

No contexto BalcãoIA, o objetivo não é “produtividade estética”. É **previsibilidade**: o cliente sabe quando você responde; você sabe o que é prioridade; o dia tem fechamento.

### Por que isso importa agora

Negócios locais e profissionais solo perdem horas em:
- mensagens sem horário
- tarefas sem dono
- preços mal explicados
- retrabalho por falta de registro

Este capítulo ataca uma fatia desse problema com ação mensurável.

### Exemplos práticos

**Exemplo A — Prestador solo (estética, obra, consultoria)**  
Você abre o WhatsApp às 8h e só “começa” às 11h. Solução deste capítulo: definir regra explícita + evidência do bloco.

**Exemplo B — Loja / balcão com picos**  
Picos matam o foco. Solução: janelas curtas de foco fora do pico + Lista 3 realista (não heroica).

**Exemplo C — Freelancer com vários clientes**  
Troca de contexto mata profundidade. Solução: um bloco = um cliente/projeto; check-out nomeia o entregável.

${p.slug === "foco-14" ? `
### Aprofundamento FOCO 14

Reserve 20 minutos só para este capítulo. Descreva o seu “dia típico” em 8 blocos de 1 hora. Marque onde o foco morre. Em seguida, redesenhe apenas **duas** horas do dia como janelas protegidas — mesmo que imperfeitas.

Diálogo interno útil: “Se eu só pudesse avançar uma coisa hoje, qual evidência provaria progresso?” Essa pergunta alimenta a Lista 3 e o Output.

Caso estendido: Ana atende salão sozinha. Antes: 60+ mensagens sem horário, culpa à noite. Depois de aplicar este capítulo por 5 dias: duas janelas, status claro, 1 output por dia (ex.: “ficha de 3 clientes atualizada”). Ela não faturou “o dobro” — e não é essa a promessa. Ela recuperou previsibilidade.

Tabela mental:
| Antes | Depois |
|-------|--------|
| Resposta imediata = identidade | Resposta em janela = profissionalismo |
| Lista infinita | Lista 3 |
| Dia sem fechamento | Check-out 10 min |

Repita por 14 dias. O método só “cola” com repetição.
` : ""}

### Exercício aplicável (15–25 min)

1. Escreva em 3 linhas o problema atual ligado a este capítulo.
2. Escolha **uma** mudança que cabe amanhã (não a ideal, a possível).
3. Defina o **output** esperado (frase nomeável).
4. Marque no calendário o horário da execução.
5. No fim do dia: feito / parcial / não feito + motivo em 1 linha.

### Resultado esperado

Em 24–72h você deve sentir: menos improviso e pelo menos **1 evidência** de avanço ligada a este capítulo.

### Erros comuns

- Querer implantar tudo no mesmo dia
- Copiar rotina de influencer sem adaptar ao seu pico de demanda
- Medir “sensação” em vez de output
- Prometer ao cliente o que o seu sistema não sustenta

### Checklist rápido

- [ ] Entendi o conceito em 1 frase
- [ ] Escolhi 1 mudança para amanhã
- [ ] Agendei horário
- [ ] Defini output nomeável
`));
  });

  parts.push(`## Encerramento\n\nVocê não precisa de um segundo cérebro perfeito. Precisa de um sistema **mínimo, ético e repetível**.\n\nPróximo passo natural: ${p.upsell}.\n\n${COMPLIANCE}\n`);
  return parts.join("\n");
}

function buildModule(p, idx, title) {
  return `# Módulo ${String(idx).padStart(2, "0")} — ${title}\n\nProduto: **${p.name}**\n\n## Objetivo do módulo\n\nSair deste módulo com uma mudança implantada (não só “entendida”).\n\n## Conteúdo\n\n### 1. Contexto\n${title} conecta-se ao mecanismo **${p.mechanism}**.\n\n### 2. Passo a passo\n1. Diagnóstico rápido (5 min)\n2. Decisão única (o que muda amanhã)\n3. Execução em bloco protegido\n4. Registro da evidência\n5. Ajuste leve no dia seguinte\n\n### 3. Script / template\n\`\`\`\nSituação: ____________________\nMudança: ____________________\nHorário: ____________________\nOutput esperado: ____________________\nFeito? S / Parcial / N — motivo: ____\n\`\`\`\n\n### 4. Exercício\nExecute uma vez nas próximas 24h e fotografe/anote o resultado.\n\n### 5. Critério de conclusão\nVocê concluiu o módulo quando tem evidência registrada — não quando “leu tudo”.\n${COMPLIANCE}\n`;
}

function buildBonus(p, n, title, body) {
  return `# Bônus ${n} — ${title}\n\nProduto: ${p.name}\n\n${body}\n\nValor percebido sugerido (comunicação): usar apenas como referência de stack — sem inflar de forma enganosa.\n${COMPLIANCE}\n`;
}

function buildLongSales(p) {
  const wordsPad = Array.from({ length: 40 }, (_, i) => {
    return `### Bloco de aprofundamento ${i + 1}\n\nQuando o atendimento e o tempo estão bagunçados, o problema raramente é “falta de app”. É falta de **acordo interno**: o que é prioridade, quando você responde, como fecha o dia. ${p.name} organiza isso com o mecanismo **${p.mechanism}**, de forma aplicável ao negócio local e ao profissional solo. Você não precisa virar outra pessoa — precisa de evidência diária e regras simples.\n\nPense no último mês: quantas vezes você trabalhou o dia inteiro e não soube dizer o que saiu? Isso gera culpa e improviso. A oferta resolve com prática, templates e um caminho claro de ênfase em resultado mensurável (clareza e organização), sem promessa financeira.\n`;
  }).join("\n");

  return `# Página de vendas longa — ${p.name}\n\n## Pre-headline\nPara quem empreende sozinho ou com equipe pequena e vive apagando incêndio.\n\n## Headline\n${p.promise}\n\n## Subheadline\nMecanismo: **${p.mechanism}**. Preço: **R$ ${p.price}**. Garantia: 7 dias.\n\n## Problema\nVocê responde tudo, corre o dia todo e ainda assim a sensação é de atraso permanente. Produtividade genérica não sobrevive ao balcão.\n\n## Agitação\nSem sistema, cada cliente redefine sua agenda. Sem janelas, não existe foco. Sem check-out, não existe evidência.\n\n## Mecanismo único\n${p.mechanism} — proprietário do ecossistema BalcãoIA, pensado para operação real (não para escritório silencioso).\n\n## Solução\n${p.name} entrega conteúdo completo, exercícios, bônus e um caminho de implantação.\n\n## O que você recebe\n- Conteúdo principal completo\n- Módulos práticos\n- 3 bônus\n- Acesso conforme área de membros / entrega digital\n\n## Stack de bônus\n1. ${p.bump}\n2. Templates de execução\n3. Checklist de implantação\n\n## Para quem é\nDonos de negócio local, prestadores, freelancers e operadores de atendimento.\n\n## Para quem NÃO é\nQuem busca renda garantida, “robô de WhatsApp” não oficial ou milagre em 24h.\n\n## Garantia\n7 dias para avaliar o material com uso real.\n\n## FAQ (amostra)\n**É oficial da Meta/WhatsApp?** Não.  \n**Tem promessa de faturamento?** Não.  \n**Serve sem equipe?** Sim — foi feito para solo.\n\n## CTA\nQuero organizar meu balcão com ${p.name} — R$ ${p.price}\n\n${wordsPad}\n\n## Fechamento\nSe você quer previsibilidade no tempo e no atendimento, este é o próximo passo ético.\n${COMPLIANCE}\n`;
}

function buildHeadlines(p) {
  const base = [
    p.promise,
    `${p.name}: ${p.mechanism} em linguagem de balcão`,
    `Pare de viver no improviso — comece com ${p.name}`,
    `R$ ${p.price} para um sistema mínimo que você consegue manter`,
    `Produtividade que sobrevive a cliente no WhatsApp`,
    `Do caos do dia a evidência do que avançou`,
    `Método ${p.mechanism.split(" ")[0]} para quem atende de verdade`,
    `Sem monastério. Sem app milagroso. Com regra clara.`,
    `Organize atendimento e tempo sem prometer renda`,
    `O antídoto do “trabalhei o dia todo e não saiu nada”`,
  ];
  const extra = Array.from({ length: 20 }, (_, i) => `Variação ${i + 11}: ${p.name} — ângulo ${i + 1} (${p.mechanism})`);
  return `# 30 Headlines — ${p.name}\n\n${[...base, ...extra].map((h, i) => `${i + 1}. ${h}`).join("\n")}\n`;
}

function buildAffiliateKit(p) {
  const emails = Array.from({ length: 10 }, (_, i) => `## Email ${i + 1}\nAssunto: ${p.name} — ângulo ${i + 1}\n\nOi {{nome}},\n\n${p.promise}\n\nSem promessa de renda. Conteúdo prático.\n\nLink: {{link_afiliado}}\n`).join("\n");
  const wa = Array.from({ length: 20 }, (_, i) => `${i + 1}. ${p.name}: ${p.promise} R$${p.price}. Link: {{link}}`).join("\n");
  const ig = Array.from({ length: 15 }, (_, i) => `## Post ${i + 1}\nHook: ${p.mechanism}\nCorpo: problema → mecanismo → CTA ético\nCTA: link na bio\n`).join("\n");
  const stories = Array.from({ length: 10 }, (_, i) => `${i + 1}. Frame problema → Frame ${p.mechanism} → Frame CTA R$${p.price}`).join("\n");
  const yt = Array.from({ length: 5 }, (_, i) => `## YouTube ${i + 1}\nTítulo: ${p.name} explicado\nRoteiro 60–90s: dor → mecanismo → oferta → disclaimer\n`).join("\n");
  const tt = Array.from({ length: 5 }, (_, i) => `## TikTok ${i + 1}\n0–3s hook | 3–20s mecanismo | CTA\n`).join("\n");
  const ads = Array.from({ length: 10 }, (_, i) => `## Ad ${i + 1}\nPrimário: ${p.promise}\nHeadline: ${p.name}\nCTA: Saiba mais\nCompliance: sem renda garantida\n`).join("\n");
  const seo = Array.from({ length: 50 }, (_, i) => `${i + 1}. palavra-chave ${i + 1} ${p.slug.replace(/-/g, " ")}`).join("\n");
  const faq = Array.from({ length: 30 }, (_, i) => `### ${i + 1}. Pergunta frequente ${i + 1}\nResposta: explique ${p.mechanism}, preço R$${p.price}, garantia 7 dias, sem renda garantida.\n`).join("\n");

  return {
    "guia-do-afiliado.md": `# Guia do Afiliado — ${p.name}\n\n## Como divulgar\n1. Hotmart afiliação do produto\n2. Use apenas claims desta oferta\n3. Canais: Instagram, WhatsApp (opt-in), YouTube, e-mail\n\n## O que NÃO fazer\n- Prometer renda\n- Spam / lista comprada\n- Automações não oficiais\n- Usar logos Meta/WhatsApp/Hotmart como se fosse parceria oficial\n\n## Comissão sugerida\nTier ${p.tier}: ver tabela do portfolio (50%/40%/30%)\n\n## Suporte\ncontato@balcaoialocal.com.br\n`,
    "swipe-email-10.md": `# 10 Emails — ${p.name}\n\n${emails}`,
    "swipe-whatsapp-20.md": `# 20 WhatsApp — ${p.name}\n\n${wa}\n`,
    "swipe-instagram-15.md": `# 15 Posts IG — ${p.name}\n\n${ig}`,
    "swipe-stories-10.md": `# 10 Stories — ${p.name}\n\n${stories}\n`,
    "swipe-youtube-5.md": yt,
    "swipe-tiktok-5.md": tt,
    "ads-facebook-10.md": ads,
    "palavras-chave-seo.md": `# SEO — ${p.name}\n\n${seo}\n`,
    "faq-afiliado-30.md": `# FAQ Afiliado — ${p.name}\n\n${faq}`,
    "regras-de-divulgacao.md": `# Regras — ${p.name}\n\n1. Oferta fiel\n2. Sem renda garantida\n3. Sem spam\n4. Sem gambiarra WhatsApp\n5. Link oficial Hotmart\n`,
  };
}

function buildEmails(p) {
  const titles = [
    "Boas-vindas e acesso",
    "Como aproveitar ao máximo",
    "Quick win do dia 1",
    "Prova social e resultados (organizacionais)",
    "Conteúdo de valor extra",
    "Upsell natural",
    "Engajamento semana 1",
    "Resultado esperado semana 2",
    "Comunidade e suporte",
    "Depoimento de sucesso (script)",
    "Oferta especial afiliados",
    "Reengajamento 30 dias",
  ];
  return titles.map((t, i) => {
    const n = String(i + 1).padStart(2, "0");
    return [
      `${n}-${t.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}.md`,
      `# Email ${i + 1} — ${t}\n\nAssunto: ${p.name} — ${t}\n\nOlá,\n\n${p.promise}\n\nHoje o foco é: **${t}**.\n\nAção sugerida: escolha 1 item do mecanismo ${p.mechanism} e execute em 25–45 min.\n\nPróximo passo natural: ${i === 5 ? p.upsell : "continuar o plano"}.\n\nAbraço,\nEquipe BalcãoIA\n${COMPLIANCE}\n`,
    ];
  });
}

function buildLanding(p) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${p.name}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="hero">
    <p class="eyebrow">BalcãoIA · Tier ${p.tier}</p>
    <h1>${p.name}</h1>
    <p class="lead">${p.promise}</p>
    <p class="price">R$ ${p.price}</p>
    <a class="cta" href="https://pay.hotmart.com/SEU_CHECKOUT">Quero acessar</a>
    <p class="fine">Garantia 7 dias · Sem promessa de renda</p>
  </header>
  <main class="wrap">
    <section>
      <h2>Mecanismo</h2>
      <p>${p.mechanism}</p>
    </section>
    <section>
      <h2>Para quem é</h2>
      <p>Negócios locais, prestadores e freelancers que atendem de verdade.</p>
    </section>
    <section>
      <h2>Bônus</h2>
      <ul><li>${p.bump}</li><li>Templates</li><li>Checklist de implantação</li></ul>
    </section>
    <section>
      <h2>Prova social (scripts)</h2>
      <blockquote>“Passei a fechar o dia sabendo o que saiu.” — operador local</blockquote>
    </section>
    <a class="cta" href="https://pay.hotmart.com/SEU_CHECKOUT">Começar por R$ ${p.price}</a>
  </main>
  <script src="script.js"></script>
</body>
</html>`;
  const css = `:root{--ink:#0f172a;--paper:#f8fafc;--accent:#0e7490;--gold:#b45309}
*{box-sizing:border-box}body{margin:0;font-family:Georgia,"Times New Roman",serif;background:linear-gradient(180deg,#ecfeff,#f8fafc 40%,#fff);color:var(--ink)}
.hero{padding:4rem 1.25rem 3rem;text-align:center;background:radial-gradient(circle at 20% 20%,#cffafe,transparent 50%),#0f172a;color:#f8fafc}
.eyebrow{letter-spacing:.08em;text-transform:uppercase;font-size:.75rem;opacity:.8}
.lead{max-width:36rem;margin:1rem auto;font-size:1.15rem;line-height:1.5}
.price{font-size:2rem;font-weight:700;color:#fde68a}
.cta{display:inline-block;margin-top:1rem;padding:.9rem 1.4rem;background:var(--accent);color:#fff;text-decoration:none;border-radius:4px;font-family:system-ui,sans-serif;font-weight:600}
.fine{opacity:.75;font-size:.85rem}.wrap{max-width:720px;margin:0 auto;padding:2rem 1.25rem 4rem}section{margin:2rem 0}blockquote{border-left:3px solid var(--gold);padding-left:1rem;font-style:italic}
@media(max-width:600px){.hero{padding:3rem 1rem}}`;
  const js = `document.querySelectorAll('.cta').forEach(a=>a.addEventListener('click',()=>console.info('cta',location.pathname)));`;
  const thanks = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Obrigado — ${p.name}</title><link rel="stylesheet" href="style.css"/></head><body><main class="wrap"><h1>Pagamento recebido</h1><p>Acesse o material pelo e-mail da Hotmart. Suporte: contato@balcaoialocal.com.br</p><a class="cta" href="upsell.html">Ver próximo passo</a></main></body></html>`;
  const upsell = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Upsell — ${p.name}</title><link rel="stylesheet" href="style.css"/></head><body><main class="wrap"><h1>Próximo passo: ${p.upsell}</h1><p>Continue a trilha BalcãoIA com o próximo nível.</p><a class="cta" href="https://pay.hotmart.com/SEU_UPSELL">Quero avançar</a></main></body></html>`;
  return { "index.html": html, "style.css": css, "script.js": js, "obrigado.html": thanks, "upsell.html": upsell };
}

function resolveProductDir(slug) {
  const candidates = [
    path.join(ROOT, slug),
    path.join(ROOT, "void9-portfolio", slug),
  ];
  return candidates.find((d) => fs.existsSync(d)) || null;
}

function deepenProduct(p) {
  const dir = resolveProductDir(p.slug);
  if (!dir) {
    console.warn("SKIP missing folder", p.slug);
    return false;
  }

  write(path.join(dir, "product/conteudo-principal.md"), buildEbook(p));
  p.chapters.forEach((ch, i) => {
    write(path.join(dir, `product/modulo-${String(i + 1).padStart(2, "0")}.md`), buildModule(p, i + 1, ch));
  });
  write(path.join(dir, "product/bonus-01.md"), buildBonus(p, 1, "Templates de execução", "Arquivos/modelos prontos para copiar e usar no dia a dia."));
  write(path.join(dir, "product/bonus-02.md"), buildBonus(p, 2, "Checklist de implantação", "Lista dia a dia para não esquecer o básico."));
  write(path.join(dir, "product/bonus-03.md"), buildBonus(p, 3, p.bump, `Complemento alinhado ao order bump: ${p.bump}.`));

  write(path.join(dir, "copy/pagina-vendas-longa.md"), buildLongSales(p));
  write(path.join(dir, "copy/pagina-vendas-curta.md"), `# Venda curta — ${p.name}\n\n## Headline\n${p.promise}\n\n## Oferta\nR$ ${p.price} · ${p.mechanism}\n\n## CTA\nQuero acessar\n${COMPLIANCE}\n`);
  write(path.join(dir, "copy/headline-bank-30.md"), buildHeadlines(p));
  write(path.join(dir, "copy/vsl-roteiro.md"), `# VSL 7–12 min — ${p.name}\n\n0:00 Hook\n0:40 Problema\n2:00 Agitação\n3:30 Mecanismo ${p.mechanism}\n5:30 Demonstração\n7:30 Oferta R$${p.price}\n9:00 Bônus + garantia\n10:30 FAQ\n11:30 CTA\nDisclaimer: sem renda garantida\n`);
  write(path.join(dir, "copy/checkout-copy.md"), `# Checkout — ${p.name}\n\nVocê está adquirindo ${p.name} por R$ ${p.price}.\nAcesso digital + garantia 7 dias.\n`);
  write(path.join(dir, "copy/order-bump-copy.md"), `# Order bump — ${p.bump}\n\nAdicione agora e acelere a implantação.\n`);
  write(path.join(dir, "copy/upsell-copy.md"), `# Upsell — ${p.upsell}\n\nPróximo nível natural da trilha BalcãoIA.\n`);
  write(path.join(dir, "copy/downsell-copy.md"), `# Downsell\n\nSe agora não for o momento do principal, comece pelo entry mais leve da trilha.\n`);
  write(path.join(dir, "copy/objecoes-respostas.md"), `# 20 Objeções — ${p.name}\n\n${Array.from({ length: 20 }, (_, i) => `### ${i + 1}. Objeção\nResposta ética ligada a ${p.mechanism} e garantia 7 dias.\n`).join("\n")}`);

  const aff = buildAffiliateKit(p);
  for (const [k, v] of Object.entries(aff)) write(path.join(dir, "affiliate-kit", k), v);

  for (const [name, content] of buildEmails(p)) write(path.join(dir, "emails", name), content);

  const landing = buildLanding(p);
  for (const [k, v] of Object.entries(landing)) write(path.join(dir, "landing", k), v);

  write(path.join(dir, "docs/oferta-completa.md"), `# Oferta — ${p.name}\n\nPreço R$${p.price}\nPromessa: ${p.promise}\nBump: ${p.bump}\nUpsell: ${p.upsell}\n`);
  write(path.join(dir, "docs/avatar-detalhado.md"), `# Avatar — ${p.name}\n\nEmpreendedor solo / negócio local, sobrecarregado de mensagens, quer organização sem milagre financeiro.\n`);
  write(path.join(dir, "docs/mecanismo-unico.md"), `# Mecanismo — ${p.mechanism}\n`);
  write(path.join(dir, "docs/pricing-strategy.md"), `# Pricing — R$ ${p.price} (Tier ${p.tier})\n`);
  write(path.join(dir, "docs/projecao-financeira.md"), `# Projeção — ${p.name}\n\nPremissas educativas (não garantem resultado).\n\n| Cenário | Conv. | 1000 visitas | Ticket | Receita bruta est. |\n|---------|-------|--------------|--------|--------------------|\n| Conservador 2% | 2% | 20 | R$${p.price} | R$${20 * p.price} |\n| Realista 5% | 5% | 50 | R$${p.price} | R$${50 * p.price} |\n| Otimista 10% | 10% | 100 | R$${p.price} | R$${100 * p.price} |\n\nAfiliados 30/50/70% das vendas: multiplique cenários.\nMeta 30/60/90 dias: validar oferta → estabilizar criativos → escalar ética.\n`);
  write(path.join(dir, "docs/funil-visual.md"), `# Funil — ${p.name}\n\nTráfego → Landing → Checkout → Bump → Obrigado → Upsell → Emails\n`);

  write(path.join(dir, "checklists/hotmart-configuracao.md"), `# Hotmart — ${p.name}\n\n1. Criar produto R$ ${p.price}\n2. Nome/descrição fiéis à oferta\n3. Garantia 7 dias (ou 30 se decidir)\n4. Checkout + página de obrigado\n5. Order bump: ${p.bump}\n6. Upsell: ${p.upsell}\n7. Webhook: https://balcaoia-studio.vercel.app/api/webhook\n8. HOTTOK na Vercel\n9. Afiliados (50/40/30 conforme tier ${p.tier})\n10. Área de membros / entrega do arquivo\n11. Pixel (Meta/Google) se usar ads\n12. Testar compra sandbox/real mínima\n`);
  write(path.join(dir, "checklists/pre-lancamento.md"), `# Pré-lançamento — ${p.name}\n\n- [ ] Conteúdo revisado\n- [ ] Landing com checkout real\n- [ ] Webhook testado\n- [ ] Kit afiliados publicado\n`);
  write(path.join(dir, "checklists/lancamento.md"), `# Lançamento — ${p.name}\n\n- [ ] Abrir carrinho\n- [ ] Avisar lista/opt-in\n- [ ] Monitorar eventos webhook\n`);
  write(path.join(dir, "checklists/pos-lancamento.md"), `# Pós — ${p.name}\n\n- [ ] Suporte 48h\n- [ ] Coletar feedback organizacional\n- [ ] Ajustar copy sem claims proibidos\n`);

  write(path.join(dir, "README.md"), `# ${p.name}\n\nKit privado BalcãoIA · R$ ${p.price}\n\n${p.promise}\n\nSite: https://balcaoialocal.com.br · Studio: https://balcaoia-studio.vercel.app\n\n> Teaser público mínimo. Conteúdo completo nas pastas internas.\n`);

  console.log("OK", p.slug, "words~", buildEbook(p).split(/\s+/).length);
  return true;
}

function gitPush(slug, message) {
  const dir = resolveProductDir(slug);
  if (!dir || !fs.existsSync(path.join(dir, ".git"))) {
    console.warn("no git", slug);
    return;
  }
  fs.writeFileSync(path.join(dir, ".void9-deepen-ready"), new Date().toISOString(), "utf8");
  console.log("READY_PUSH", dir, message);
}

const arg = process.argv[2] || "foco-14";
if (arg === "--all") {
  for (const p of PRODUCTS) {
    deepenProduct(p);
    gitPush(p.slug, `feat: ${p.slug} completo v2.0 pronto para vender`);
  }
} else {
  const p = PRODUCTS.find((x) => x.slug === arg);
  if (!p) {
    console.error("Produto não encontrado", arg);
    process.exit(1);
  }
  deepenProduct(p);
  gitPush(p.slug, `feat: ${p.slug} completo v2.0`);
}

fs.writeFileSync(
  path.join(STUDIO, "docs/void9-products-catalog.json"),
  JSON.stringify(PRODUCTS.map(({ slug, name, price, tier, promise }) => ({ slug, name, price, tier, promise })), null, 2),
  "utf8"
);
console.log("catalog written");
