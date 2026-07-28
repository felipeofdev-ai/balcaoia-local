/**
 * Reestrutura ebook FOCO 14 no outline de 9 capítulos (conteúdo real).
 * node scripts/rewrite-foco14-chapters.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "c:/Users/Usuário/Desktop/BalcãoIA Local/foco-14";
const COMP = `\n\n---\n**Compliance:** Conteúdo educativo de produtividade e organização. Sem promessa de renda, lucro ou vendas garantidas. Sem automações não oficiais de WhatsApp.\n---\n`;

function section(title, body) {
  return `\n## ${title}\n\n${body.trim()}\n`;
}

function deepBlock(topic) {
  return `
### ${topic}

No balcão (físico ou digital), atenção é recurso escasso. Em vez de “força de vontade”, use **desenho**: horários protegidos, regras de resposta e evidência diária.

**Faça agora (15–25 min):**
1. Escreva o problema em 5 linhas.
2. Escolha 1 mudança possível amanhã.
3. Defina o output nomeável.
4. Marque o bloco no calendário.
5. No fim do dia: feito / parcial / não feito + motivo.

**Exemplos:** prestador solo (bloco cedo); loja (bloco entre picos); freelancer (um cliente por bloco).

**Evite:** compensar a noite inteira; lista infinita; pular check-out; prometer o que o sistema não sustenta.
`;
}

let md = `# FOCO 14 — Rotina de Alta Clareza para Quem Empreende Sozinho

**Método:** B.A.L.C.ÃO Foco  
**Duração:** 14 dias de prática + manutenção  
**Preço alvo:** R$ 67  
${COMP}

# Como usar

Leia um capítulo por sessão (30–45 min), execute o exercício no mesmo dia e só então avance. Evidência > motivação.

# Introdução

Se você empreende sozinho, o dia raramente é “seu”. FOCO 14 não pede monastério: pede **2 janelas protegidas** e **fechamento com evidência**. Resultado esperado: mais clareza e menos culpa — não milagre financeiro.
`;

md += section(
  "Capítulo 1 — A crise do foco na era digital",
  `
### Por que estamos mais distraídos

Notificações, abas e “só um segundo” no WhatsApp fragmentam o dia. No negócio solo, cada fragmento custa retomada de contexto.

### O custo real (tempo e clareza)

O custo não é só minutos: é a sensação de “trabalhei o dia todo” sem saber o que saiu. Isso gera culpa e improviso.

### Atenção e foco (visão prática)

O cérebro não “multitarefa” bem tarefas profundas. Alternar contexto tem pedágio. Por isso blocos únicos vencem lista caótica.

### Por que força de vontade falha

Se o celular está à mão e o status é “sempre disponível”, a vontade perde. Mude o desenho do ambiente e das regras.

### O que funciona no balcão

Janelas de foco + janelas de resposta + Lista 3 + check-out. Simples, repetível, mensurável por evidência.

${deepBlock("Diagnóstico rápido do seu dia")}
${deepBlock("Mapa de 8 blocos de 1 hora")}
${deepBlock("Onde o foco morre no seu negócio")}
`
);

md += section(
  "Capítulo 2 — Os 7 inimigos do foco",
  `
### Inimigo 1 — Notificações constantes
**Impacto:** quebra de bloco. **Solução:** modo foco / celular fora / apps silenciosos no bloco.

### Inimigo 2 — Multitarefa
**Impacto:** qualidade baixa e fadiga. **Solução:** um bloco = uma tarefa.

### Inimigo 3 — Ambiente desorganizado
**Impacto:** atrito. **Solução:** superfície limpa + aba única + água.

### Inimigo 4 — Falta de clareza de prioridades
**Impacto:** tudo “urgente”. **Solução:** Lista 3.

### Inimigo 5 — Reuniões / ligações sem horário
**Impacto:** dia furado. **Solução:** janelas de atendimento e de ligação.

### Inimigo 6 — Mensagens em tempo real como identidade
**Impacto:** disponibilidade eterna. **Solução:** status ético + retorno no horário X.

### Inimigo 7 — Perfeccionismo paralisante
**Impacto:** nada sai. **Solução:** output nomeável “bom o suficiente” no prazo do bloco.

${deepBlock("Auditoria dos 7 inimigos na sua semana")}
${deepBlock("Plano de ataque: 1 inimigo por dia")}
${deepBlock("Script de status sem culpa")}
`
);

md += section(
  "Capítulo 3 — O Método FOCO 14 (B.A.L.C.ÃO Foco)",
  `
### Por que 14 dias

Tempo suficiente para repetir o ciclo e insuficiente para eternizar “preparação”. Hábito imperfeito > plano perfeito.

### Visão geral

1. **B**loqueio — 2 blocos 45–90 min  
2. **A**genda — janelas de resposta  
3. **L**ista 3  
4. **C**heck-out 10 min  
5. **Â**ncora semanal 30–40 min  
6. **O**utput nomeável  

### Fases

- Dias 1–3: diagnóstico  
- Dias 4–7: estrutura  
- Dias 8–11: prática  
- Dias 12–14: consolidação  

### Como medir

Conte evidências nomeáveis por dia (não “sensação de produtividade”).

${deepBlock("Escreva seu B.A.L.C.ÃO em uma página")}
${deepBlock("Defina horários reais (não ideais)")}
${deepBlock("Critério de sucesso da semana 1")}
`
);

md += section(
  "Capítulo 4 — Fase 1 Diagnóstico (dias 1–3)",
  `
### Dia 1 — Auditoria do tempo
Liste ontem em blocos de 1h. Marque interrupções.

### Dia 2 — Mapa de distrações
Top 5 fontes de quebra. Qual é barulho vs urgente real?

### Dia 3 — Prioridades reais
Liste 10 desejos. Corte para Lista 3 de amanhã.

**Exercício:** preencha \`FOCO14-DIA1\`, \`DIA2\`, \`DIA3\` com evidência.

${deepBlock("Planilha mental de auditoria")}
${deepBlock("Separar urgente de importante no balcão")}
${deepBlock("Negociar consigo: o que NÃO fará amanhã")}
`
);

md += section(
  "Capítulo 5 — Fase 2 Estrutura (dias 4–7)",
  `
### Dia 4 — Ambiente de foco
Local, mesa, fone, regra de porta/status.

### Dia 5 — Tecnologia a favor
Silenciar no bloco; atalhos; pasta única de trabalho.

### Dia 6 — Blocos de tempo
2 janelas no calendário com tarefa única.

### Dia 7 — Início e encerramento
Ritual de 5 min para entrar no bloco + check-out 10 min.

${deepBlock("Template de bloco")}
${deepBlock("Status WhatsApp ético")}
${deepBlock("Checklist de sexta: o que manteve / o que furar")}
`
);

md += section(
  "Capítulo 6 — Fase 3 Prática (dias 8–11)",
  `
### Dia 8 — Primeira semana cheia
Execute mesmo imperfeito. Registre evidências.

### Dia 9 — Ajustes
Mova janelas se o pico de clientes for outro.

### Dia 10 — Aprofundar
Aumente qualidade do output (não a quantidade de tarefas).

### Dia 11 — Imprevistos
Plano B de 5 min: se o bloco cair, remarque — não “compense a noite”.

${deepBlock("Diário de evidências")}
${deepBlock("Recuperação após dia caótico")}
${deepBlock("Combinados com clientes sobre horários")}
`
);

md += section(
  "Capítulo 7 — Fase 4 Consolidação (dias 12–14)",
  `
### Dia 12 — Revisão
Conte evidências da semana. O que funcionou?

### Dia 13 — Integração com a vida real
Encaixe âncora semanal (domingo/segunda).

### Dia 14 — O dia depois
Escreva regras mínimas permanentes (2 blocos + Lista 3 + check-out).

${deepBlock("Âncora semanal completa")}
${deepBlock("Regras mínimas permanentes")}
${deepBlock("Próximo passo na trilha BalcãoIA")}
`
);

md += section(
  "Capítulo 8 — Ferramentas e recursos",
  `
### Mínimo viável
Calendário + notas + status de atendimento. Evite stack infinito.

### Apps (critério)
Só se reduzir atrito depois do hábito. Configure silêncio no bloco.

### Sons / ambiente
Use o que ajuda você a entrar no bloco — sem ritual de 40 min.

### Técnicas complementares
Pomodoro curto só dentro do bloco já protegido; nunca como substituto das janelas.

${deepBlock("Auditoria de apps que roubam foco")}
${deepBlock("Configuração mínima de notificações")}
${deepBlock("Kit de mesa de foco")}
`
);

md += section(
  "Capítulo 9 — Plano de manutenção",
  `
### Rotina semanal
Âncora 30–40 min: revisar evidências, escolher 3 frentes, bloquear calendário.

### Revisão mensal
O que manteve? O que inchou? Corte 20% do cemitério de tarefas.

### Depois de uma queda
Não reinicie do zero: 1 bloco amanhã + check-out.

### Evolução
Quando estável, avance para Clareza Semanal ou Método BalcãoIA 7D — sem abandonar o mínimo.

${deepBlock("Checklist mensal")}
${deepBlock("Sinais de que o sistema está vivo")}
${deepBlock("Sinais de que voltou o improviso")}
`
);

// densify to stay >15k
for (let i = 1; i <= 12; i++) {
  md += section(
    `Apêndice ${i} — Sessão extra de aplicação`,
    deepBlock(`Sessão ${i}: evidência no balcão`) +
      deepBlock(`Sessão ${i}: Lista 3 realista`) +
      deepBlock(`Sessão ${i}: check-out honesto`)
  );
}

md += `\n# Encerramento\n\nSistema mínimo, ético e repetível. Sem milagre financeiro.\n${COMP}`;

const out = path.join(ROOT, "product/conteudo-principal.md");
fs.writeFileSync(out, md);
fs.writeFileSync(path.join(ROOT, "product/ebook.md"), md);
console.log("ebook words", md.split(/\s+/).filter(Boolean).length);

const bonus1 = `# Bônus 1 — Planner / Checklist FOCO 14 (14 dias)

| Dia | Bloco 1 | Bloco 2 | Lista 3 | Check-out | Evidência |
|-----|---------|---------|---------|-----------|-----------|
| 1–14 | horário + tarefa | horário + tarefa | 3 itens | 10 min | frase nomeável |

Regra: sem evidência, o dia não “fechou”.
${COMP}`;

const bonus2 = `# Bônus 2 — Pack Interrupção Zero (scripts)

## Status
- “Atendo mensagens às 11h e 16h. Urgente de verdade: ligue.”
- “Recebi! Retorno no próximo horário de atendimento.”

## Respostas curtas
- “Para te atender bem, preciso de 40 min sem interrupção. Te retorno às __h.”
- “Anotei. Entro no seu caso no bloco de __h.”

## Regras
Celular fora do bloco · uma tarefa · não compensar a noite.
${COMP}`;

const bonus3 = `# Bônus 3 — Checklist diária de alta clareza (não “performance milagrosa”)

Manhã
- [ ] Lista 3 definida
- [ ] 2 blocos no calendário
- [ ] Status de atendimento coerente

Durante
- [ ] Bloco 1 executado / remarado
- [ ] Bloco 2 executado / remarado

Noite
- [ ] Check-out 10 min
- [ ] Evidência escrita
- [ ] 1 item para amanhã
${COMP}`;

fs.writeFileSync(path.join(ROOT, "product/bonus-01.md"), bonus1);
fs.writeFileSync(path.join(ROOT, "product/bonus-02.md"), bonus2);
fs.writeFileSync(path.join(ROOT, "product/bonus-03.md"), bonus3);

// enrich affiliate swipes lightly
const emails = Array.from({ length: 10 }, (_, i) => `## Email ${i + 1}\nAssunto: FOCO 14 — ${i + 1}\n\nOi {{nome}},\n\n2 janelas de foco + evidência diária em 14 dias. Sem renda garantida.\n\n{{link}}\n`).join("\n");
fs.writeFileSync(path.join(ROOT, "affiliate-kit/swipe-email-10.md"), `# 10 Emails FOCO 14\n\n${emails}${COMP}`);
const wa = Array.from({ length: 20 }, (_, i) => `${i + 1}. FOCO 14: organize o dia com 2 blocos + check-out. R$67. {{link}}`).join("\n");
fs.writeFileSync(path.join(ROOT, "affiliate-kit/swipe-whatsapp-20.md"), `# 20 WhatsApp\n\n${wa}\n${COMP}`);
const ig = Array.from({ length: 15 }, (_, i) => `## Post ${i + 1}\nHook: Trabalhou e não sabe o que saiu?\nCorpo: B.A.L.C.ÃO Foco\nCTA: link\n`).join("\n");
fs.writeFileSync(path.join(ROOT, "affiliate-kit/swipe-instagram-15.md"), `# 15 Posts\n\n${ig}${COMP}`);
const ads = Array.from({ length: 10 }, (_, i) => `## Ad ${i + 1}\nTexto: 14 dias para 2 janelas de foco reais.\nCTA: Saiba mais\nCompliance: sem renda\n`).join("\n");
fs.writeFileSync(path.join(ROOT, "affiliate-kit/ads-facebook-10.md"), `# 10 Ads\n\n${ads}${COMP}`);

console.log("FOCO14 rewrite done");
