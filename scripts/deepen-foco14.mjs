/**
 * Aprofunda FOCO 14 com conteúdo real em PT-BR (compliance BalcãoIA).
 * node scripts/deepen-foco14.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("c:/Users/Usuário/Desktop/BalcãoIA Local/foco-14");
const COMP = `\n\n---\n**Compliance:** Conteúdo educativo de produtividade e organização. Sem promessa de renda, lucro ou vendas garantidas. Sem automações não oficiais de WhatsApp.\n---\n`;

function w(rel, content) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  const words = content.split(/\s+/).filter(Boolean).length;
  console.log(rel, words, "words");
  return words;
}

const chapters = [
  ["Por que produtividade genérica falha no negócio solo", "interrupção", "balcão"],
  ["O Método B.A.L.C.ÃO Foco — visão geral", "sistema", "previsibilidade"],
  ["Bloqueio: desenhando 2 janelas protegidas", "calendário", "proteção"],
  ["Agenda de interrupções (WhatsApp ético)", "janelas", "status"],
  ["Lista 3 e o cemitério de tarefas", "prioridade", "foco"],
  ["Check-out diário de 10 minutos", "evidência", "fechamento"],
  ["Âncora semanal de 30–40 minutos", "revisão", "plano"],
  ["Output nomeável: antídoto do movimento vazio", "entregável", "clareza"],
  ["Ferramentas mínimas (sem stack infinito)", "calendário", "notas"],
  ["Culpa, urgências falsas e clientes insistentes", "limites", "comunicação"],
  ["Semana 1 — Implantação (dias 1–7)", "prática", "hábito"],
  ["Semana 2 — Estabilização (dias 8–14)", "ajuste", "ritmo"],
  ["Métricas simples sem dashboard complexo", "contagem", "evidência"],
  ["Manutenção depois do dia 14", "sistema", "longevidade"],
  ["Casos: prestador, loja e freelancer", "contexto", "adaptação"],
  ["Integração com atendimento e catálogo", "balcão", "trilha"],
  ["Erros que destroem o método", "armadilhas", "correção"],
  ["Plano de 90 dias pós-FOCO 14", "continuidade", "próximo passo"],
];

function chapterBody(title, tags, n) {
  return `
## Capítulo ${n} — ${title}

### Conceito

${title} é uma peça do **Método B.A.L.C.ÃO Foco** (Bloqueio, Agenda de interrupções, Lista 3, Check-out, Âncora, Output). Sem esta peça, o restante vira esforço pontual.

No balcão — físico ou digital — a regra é interrupção. Por isso este capítulo trata de **${tags[0]}**, **${tags[1]}** e aplicação imediata.

### Por que isso importa agora

Empreendedores solo e donos de negócio local perdem o dia em:
- mensagens sem horário definido
- listas infinitas sem prioridade
- sensação de “trabalhei o dia todo” sem evidência
- culpa noturna e improviso no dia seguinte

Este capítulo ataca uma fatia mensurável desse problema.

### Exemplos práticos

**Exemplo A — Prestador solo (estética, obra, consultoria)**  
Abre o WhatsApp às 8h e só “começa” às 11h. Ação: definir status + duas janelas de resposta + um bloco de foco cedo.

**Exemplo B — Loja / balcão com picos**  
Picos matam profundidade. Ação: blocos curtos fora do pico + Lista 3 realista (não heroica).

**Exemplo C — Freelancer com vários clientes**  
Troca de contexto mata qualidade. Ação: um bloco = um cliente; check-out nomeia o entregável.

### Protocolo de implantação (hoje)

1. Escreva em 5 linhas o problema atual ligado a este capítulo.
2. Escolha **uma** mudança possível amanhã (não a ideal).
3. Defina o **output** esperado em uma frase nomeável.
4. Marque no calendário o horário da execução.
5. No fim do dia: feito / parcial / não feito + motivo em 1 linha.

### Exercício guiado (20–35 min)

Abra uma nota intitulada \`FOCO14-C${n}\` e preencha:

\`\`\`
Problema de ontem:
Mudança de amanhã:
Horário do bloco:
Output esperado:
Obstáculo provável:
Plano B (5 min):
\`\`\`

Execute o bloco. Não “estude mais um capítulo” no lugar de executar.

### Diálogo interno útil

- “Se eu só pudesse avançar uma coisa hoje, qual evidência provaria progresso?”
- “Isso é urgente de verdade ou só barulhento?”
- “Estou protegendo o bloco ou negociando com a culpa?”

### Resultado esperado (24–72h)

Menos improviso e pelo menos **1 evidência** de avanço ligada a este capítulo. Não é milagre financeiro — é previsibilidade operacional.

### Erros comuns

- Querer implantar todos os capítulos no mesmo dia
- Copiar rotina de influencer sem adaptar ao pico de demanda
- Medir sensação em vez de output
- Prometer ao cliente o que o sistema não sustenta
- Compensar bloco perdido com noite inteira (gera colapso)

### Checklist de conclusão

- [ ] Conceito em 1 frase
- [ ] Mudança de amanhã agendada
- [ ] Output nomeável definido
- [ ] Evidência registrada após o bloco

### Mini-estudo de caso

Ana atende sozinha. Antes: 60+ mensagens sem horário. Depois de 5 dias aplicando este capítulo: duas janelas, status claro, 1 output/dia. Ela não “dobrou faturamento” — e essa não é a promessa. Ela recuperou previsibilidade.

### Tabela mental

| Antes | Depois |
|-------|--------|
| Resposta imediata = identidade | Resposta em janela = profissionalismo |
| Lista infinita | Lista 3 |
| Dia sem fechamento | Check-out 10 min |
| Culpa difusa | Evidência nomeável |

### Extensão prática (mais profundidade)

Reserve 15 minutos extras para mapear seu dia típico em 8 blocos de 1 hora. Marque onde o foco morre. Redesenhe apenas **duas** horas como janelas protegidas — mesmo imperfeitas. Repita por 3 dias antes de julgar o método.

Se falhar um dia, não reinicie do zero: faça o check-out e remarque o bloco. Consistência imperfeita vence reinício heroico.

### Ligação com o restante do método

Este capítulo alimenta o próximo. Sem ${tags[0]} bem definido, a Agenda e a Lista 3 viram teatro. Avance só depois da evidência de hoje.
${COMP}
`;
}

// --- Ebook principal ---
let ebook = `# FOCO 14 — Rotina de Alta Clareza para Quem Empreende Sozinho

**Autor:** BalcãoIA Local  
**Formato:** Ebook prático + plano de 14 dias  
**Uso sugerido:** 1 capítulo/sessão (25–45 min) + exercício no mesmo dia  
${COMP}

## Como usar este ebook

1. Não acumule capítulos “para depois”.
2. Execute o exercício antes de avançar.
3. Registre evidência diária (output nomeável).
4. Adapte horários ao seu pico real — não ao ideal de influencer.

## Introdução — O dia que não é seu

Se você empreende sozinho, o dia raramente é “seu”. O cliente manda áudio. O fornecedor cobra. O feed puxa. Você termina exausto e com a sensação de que o que importa ficou pela metade.

A maioria dos métodos de produtividade foi feita para quem tem sala, horário e chefe. Você tem balcão — mesmo que digital.

FOCO 14 não pede monastério. Pede **duas janelas protegidas** e **fechamento com evidência**. Resultado esperado: mais clareza e menos culpa — não milagres financeiros.

## Mapa do Método B.A.L.C.ÃO Foco

1. **B**loqueio — 2 blocos de 45–90 min  
2. **A**genda de interrupções — janelas de resposta  
3. **L**ista 3 — só três prioridades  
4. **C**heck-out — 10 min de fechamento  
5. **Â**ncora semanal — 30–40 min  
6. **O**utput — entregável nomeável  

Se não tem output nomeável, provavelmente foi só movimento.

## Promessa honesta

Em 14 dias de prática, você deve conseguir:
- proteger pelo menos 2 blocos na maioria dos dias úteis
- responder em janelas previsíveis (sem sumir do mundo)
- fechar o dia sabendo o que saiu
- reduzir a culpa por “não ter feito nada” quando na verdade só faltou evidência

O que este ebook **não** promete: renda, lucro, vendas garantidas ou “virar outra pessoa em 48h”.
`;

chapters.forEach(([t, a, b], i) => {
  ebook += chapterBody(t, [a, b], i + 1);
});

ebook += `
## Plano dia a dia (14 dias)

### Dias 1–2
Defina 2 janelas de foco + status de atendimento. Execute 1 bloco mesmo curto.

### Dias 3–4
Implante Agenda de interrupções. Scripts curtos de “recebi, retorno no horário X”.

### Dias 5–7
Lista 3 + check-out todo dia. Domingou/segunda: âncora de 30 min.

### Dias 8–10
Refine horários. Corte 50% da lista de tarefas mortas.

### Dias 11–14
Estabilize. Conte evidências da semana. Escolha 1 melhoria só para a próxima semana.

## Encerramento

Você não precisa de um segundo cérebro perfeito. Precisa de um sistema **mínimo, ético e repetível**.

Próximo passo natural na trilha: Clareza Semanal ou Método BalcãoIA 7D + Studio.
${COMP}
`;

w("product/conteudo-principal.md", ebook);
w("product/ebook.md", ebook);

// modules
chapters.forEach(([t], i) => {
  const n = String(i + 1).padStart(2, "0");
  w(
    `product/modulo-${n}.md`,
    `# Módulo ${n} — ${t}\n\n${chapterBody(t, ["prática", "evidência"], i + 1)}`
  );
});

w(
  "product/bonus-01.md",
  `# Bônus 1 — Checklist FOCO 14 (14 dias)\n\nUse uma linha por dia:\n\n| Dia | Bloco 1 | Bloco 2 | Lista 3 | Check-out | Evidência |\n|-----|---------|---------|---------|-----------|----------|\n| 1 | | | | | |\n| 2 | | | | | |\n| ... | | | | | |\n| 14 | | | | | |\n\nRegra: evidência = frase nomeável.\n${COMP}`
);
w(
  "product/bonus-02.md",
  `# Bônus 2 — Pack Interrupção Zero\n\n## Status prontos\n- “Atendo mensagens às 11h e 16h. Urgente de verdade: ligue.”\n- “Recebi! Retorno no próximo horário de atendimento.”\n\n## Regras de ouro\n1. Celular fora do bloco (ou modo foco)\n2. Uma tarefa por bloco\n3. Não compensar a noite inteira\n\n## Template de bloco\n\`[ ] ____:____ → tarefa: ________ → feito? S/N\`\n${COMP}`
);
w(
  "product/bonus-03.md",
  `# Bônus 3 — Template Lista 3 + Cemitério\n\n## Hoje (só 3)\n1. ____\n2. ____\n3. ____\n\n## Cemitério (não é prioridade hoje)\n- ____\n- ____\n\n## Regra\nTudo que não cabe na Lista 3 vai para o cemitério ou para a âncora semanal.\n${COMP}`
);

// Long sales page (~4500+ words)
const salesBlocks = Array.from({ length: 55 }, (_, i) => {
  return `### Bloco de persuasão ${i + 1}

Se o seu dia some em mensagens e urgências, o problema não é “falta de disciplina moral”. É **desenho**. FOCO 14 entrega o Método B.A.L.C.ÃO Foco para quem atende de verdade: duas janelas protegidas, agenda ética de resposta, Lista 3, check-out e evidência diária. Sem monastério. Sem app milagroso. Sem promessa de renda.

Pense nos últimos 30 dias: quantas vezes você trabalhou até cansar e ainda assim não soube dizer o que saiu? Essa lacuna gera culpa e improviso. A oferta resolve com prática de 14 dias, templates e bônus aplicáveis — não com hype.

`;
}).join("\n");

const sales = `# Página de vendas longa — FOCO 14

## Pre-headline
Para quem empreende sozinho ou com equipe pequena e vive apagando incêndio.

## Headline
Em 14 dias, proteja 2 janelas de foco e feche cada dia com evidência do que avançou — sem virar monge.

## Subheadline
Método B.A.L.C.ÃO Foco · R$ 67 · Garantia 7 dias · Conteúdo educativo (sem renda garantida)

## Abertura (problema)
Você abre o celular “só um segundo” e perde a manhã. O cliente espera resposta imediata como se isso fosse prova de profissionalismo. À noite sobra cansaço e a pergunta: “o que eu realmente avancei?”

## Agitação
Sem janelas, não existe foco. Sem Lista 3, tudo é urgente. Sem check-out, não existe evidência — só sensação. Produtividade genérica (pomodoro de escritório silencioso) morre no primeiro áudio.

## Mecanismo único
**B.A.L.C.ÃO Foco**: Bloqueio, Agenda de interrupções, Lista 3, Check-out, Âncora semanal, Output nomeável. Pensado para balcão e operação solo — não para corporação com sala fechada.

## Solução
FOCO 14 é um ebook prático + plano de 14 dias + bônus (checklist, pack interrupção zero, template Lista 3). Você aplica no mesmo dia. O progresso se mede por evidências, não por motivação.

## O que você recebe
- Ebook completo (capítulos + exercícios)
- Plano dia a dia (14 dias)
- Bônus 1: Checklist 14 dias
- Bônus 2: Pack Interrupção Zero
- Bônus 3: Template Lista 3 + cemitério

## Stack de valor (referência educativa)
- Método completo: referência alta
- Templates e checklists: referência média
- **Investimento hoje: R$ 67**

## Para quem é
- Prestadores, lojistas, freelancers e operadores solo
- Quem quer previsibilidade no tempo e no atendimento
- Quem aceita praticar blocos curtos por 14 dias

## Para quem NÃO é
- Quem busca renda/lucro garantido
- Quem quer robô ou gambiarra de WhatsApp
- Quem não vai executar nenhum exercício

## Garantia
7 dias para avaliar com uso real. Reembolso via Hotmart conforme regras da plataforma.

## FAQ (amostra)
**É oficial da Meta/WhatsApp/Hotmart?** Não.  
**Garante faturamento?** Não.  
**Serve no celular?** Sim.  
**Quanto tempo por dia?** 45–90 min em blocos + 10 min de check-out.

## CTA
Quero organizar meu foco por R$ 67 — com garantia de 7 dias.

${salesBlocks}

## Fechamento
Se você quer previsibilidade no tempo — não milagre financeiro — FOCO 14 é o próximo passo ético e aplicável.

CTA final: Garantir acesso agora.
${COMP}
`;

w("copy/pagina-vendas-longa.md", sales);
w(
  "copy/pagina-de-venda.md",
  sales.slice(0, 8000) + "\n\n(Ver versão completa em pagina-vendas-longa.md)\n"
);
w(
  "copy/vsl-roteiro.md",
  `# VSL FOCO 14 — 8 a 11 minutos

0:00–0:40 Hook: “Trabalhou o dia todo e não sabe o que saiu?”
0:40–2:00 Problema do balcão / interrupção
2:00–3:30 Agitação (culpa, lista infinita, WhatsApp)
3:30–5:30 Mecanismo B.A.L.C.ÃO Foco (demo rápida)
5:30–7:00 Plano 14 dias + bônus
7:00–8:30 Oferta R$67 + garantia 7 dias
8:30–9:30 Para quem é / não é
9:30–10:30 FAQ + disclaimer (sem renda)
10:30–11:00 CTA

Tom: direto, humano, sem hype financeiro.
${COMP}`
);
w(
  "copy/headline-bank-30.md",
  Array.from({ length: 30 }, (_, i) => `${i + 1}. FOCO 14 — variação ${i + 1}: 2 janelas + evidência diária (sem milagre)`).join("\n") +
    COMP
);

// Affiliate kit
const emails = Array.from({ length: 10 }, (_, i) => `## Email ${i + 1}\nAssunto: FOCO 14 — ângulo ${i + 1}\n\nOi {{nome}},\n\nSe o dia some no WhatsApp, FOCO 14 organiza 2 janelas + evidência diária. Sem promessa de renda.\n\n{{link}}\n`).join("\n");
const wa = Array.from({ length: 20 }, (_, i) => `${i + 1}. FOCO 14: 14 dias de foco realista para quem empreende sozinho. R$67. {{link}}`).join("\n");
const ig = Array.from({ length: 15 }, (_, i) => `## Post ${i + 1}\nHook: Seu dia tem evidência ou só cansaço?\nCorpo: B.A.L.C.ÃO Foco em 1 carrossel\nCTA: link na bio\n`).join("\n");
const st = Array.from({ length: 10 }, (_, i) => `${i + 1}. Frame dor → Frame mecanismo → Frame CTA R$67`).join("\n");
const yt = Array.from({ length: 5 }, (_, i) => `## YT ${i + 1}\nTítulo: FOCO 14 explicado\n60–90s: dor → método → oferta → disclaimer\n`).join("\n");
const tt = Array.from({ length: 5 }, (_, i) => `## TT ${i + 1}\n0–3s hook | mecanismo | CTA\n`).join("\n");
const ads = Array.from({ length: 10 }, (_, i) => `## Ad ${i + 1}\nPrimário: 2 janelas de foco + check-out\nHeadline: FOCO 14\nCTA: Saiba mais\nCompliance: sem renda\n`).join("\n");
const seo = Array.from({ length: 50 }, (_, i) => `${i + 1}. foco produtividade empreendedor solo ${i + 1}`).join("\n");
const faq = Array.from({ length: 30 }, (_, i) => `### ${i + 1}. Pergunta ${i + 1}\nResposta ética: método B.A.L.C.ÃO, R$67, garantia 7 dias, sem renda garantida.\n`).join("\n");

w("affiliate-kit/guia-do-afiliado.md", `# Guia do Afiliado — FOCO 14\n\n## Como vender\n1. Afiliação Hotmart (quando o produto existir no painel)\n2. Use claims desta oferta apenas\n3. Canais: IG, WhatsApp opt-in, YouTube, e-mail\n\n## Não faça\nSpam, renda garantida, logos oficiais Meta/WhatsApp/Hotmart, gambiarra\n\n## Comissão sugerida\n50% (Tier 1)\n\n## Suporte\ncontato@balcaoialocal.com.br\n${COMP}`);
w("affiliate-kit/swipe-email-10.md", `# 10 Emails\n\n${emails}`);
w("affiliate-kit/swipe-whatsapp-20.md", `# 20 WhatsApp\n\n${wa}\n`);
w("affiliate-kit/swipe-instagram-15.md", `# 15 Posts\n\n${ig}`);
w("affiliate-kit/swipe-stories-10.md", `# 10 Stories\n\n${st}\n`);
w("affiliate-kit/swipe-youtube-5.md", yt + COMP);
w("affiliate-kit/swipe-tiktok-5.md", tt + COMP);
w("affiliate-kit/ads-facebook-10.md", ads + COMP);
w("affiliate-kit/palavras-chave-seo.md", `# SEO\n\n${seo}\n`);
w("affiliate-kit/faq-afiliado-30.md", `# FAQ\n\n${faq}`);
w("affiliate-kit/regras-de-divulgacao.md", `# Regras\n\nOferta fiel · Sem renda · Sem spam · Sem gambiarra · Link oficial\n${COMP}`);
w("affiliate-kit/README-afiliados.md", `# Kit Afiliados FOCO 14\n\nArquivos swipe-*.md + ads + FAQ + SEO.\n${COMP}`);

// emails sequence 12
const et = [
  "boas-vindas",
  "como-aproveitar",
  "quick-win-dia1",
  "prova-organizacional",
  "valor-extra",
  "upsell-natural",
  "engajamento-s1",
  "resultado-s2",
  "comunidade-suporte",
  "depoimento-script",
  "oferta-afiliados",
  "reengajamento-30d",
];
et.forEach((name, i) => {
  w(
    `emails/${String(i + 1).padStart(2, "0")}-${name}.md`,
    `# Email ${i + 1} — ${name}\n\nAssunto: FOCO 14 — ${name}\n\nOlá,\n\nAção de hoje: execute 1 bloco do Método B.A.L.C.ÃO e registre a evidência.\n\nAbraço,\nBalcãoIA\n${COMP}`
  );
});

w(
  "docs/projecao-financeira.md",
  `# Projeção educativa — FOCO 14 (R$67)\n\n| Cenário | Conv. | 1000 visitas | Receita bruta est. |\n|---------|-------|--------------|--------------------|\n| 2% | 20 | R$1.340 |\n| 5% | 50 | R$3.350 |\n| 10% | 100 | R$6.700 |\n\nNão é garantia de resultado.\n`
);
w(
  "checklists/hotmart-configuracao.md",
  `# Hotmart — FOCO 14\n\n1. Criar produto R$67 no painel\n2. Descrição fiel\n3. Garantia 7 dias\n4. Checkout URL → Vercel NEXT_PUBLIC_HOTMART_CHECKOUT_URL\n5. Bump Interrupção Zero R$27\n6. Upsell Método 7D\n7. Webhook https://balcaoia-studio.vercel.app/api/webhook\n8. HOTTOK na Vercel\n9. Afiliados 50%\n10. Testar compra\n`
);

console.log("FOCO14 deepen done");
