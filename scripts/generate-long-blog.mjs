/**
 * Gera 6 artigos longos educativos (PT-BR, compliance).
 * node scripts/generate-long-blog.mjs
 */
import fs from "node:fs";

const posts = [
  {
    slug: "ia-atendimento-whatsapp-negocios-locais",
    title: "IA no atendimento via WhatsApp para negócios locais (com revisão humana)",
    description:
      "Como usar IA no WhatsApp com catálogo, FAQ e revisão humana. Sem spam e sem automação não oficial.",
    relatedProductSlug: "workshop-ia-atendimento",
    keyword: "ia para atendimento whatsapp",
  },
  {
    slug: "produtividade-donos-pequenos-negocios",
    title: "Produtividade para donos de pequenos negócios: foco realista no balcão",
    description:
      "Método de 2 janelas, Lista 3 e evidência diária para quem atende sozinho.",
    relatedProductSlug: "foco-14",
    keyword: "produtividade pequenos negócios",
  },
  {
    slug: "transformacao-digital-comercio-local-2026",
    title: "Transformação digital para comércio local em 2026: por onde começar",
    description:
      "Ordem correta: oferta clara, atendimento, dados, depois ferramentas de IA.",
    relatedProductSlug: "programa-8-semanas-balcao",
    keyword: "transformação digital comércio local",
  },
  {
    slug: "automacao-etica-whatsapp-sem-gambiarra",
    title: "Automação ética no WhatsApp: o que fazer (e o que evitar)",
    description:
      "Consentimento, janelas de resposta e IA assistida sem risco de práticas proibidas.",
    relatedProductSlug: "whatsapp-etico-negocios",
    keyword: "whatsapp ético atendimento",
  },
  {
    slug: "ia-sem-programadores-negocio-local",
    title: "Como usar IA no negócio local sem depender de programadores",
    description:
      "Prompt → Revisar → Registrar: um loop simples para donos de negócio.",
    relatedProductSlug: "sistema-balcao-proprietario",
    keyword: "ia sem programar negócio",
  },
  {
    slug: "foco-clareza-empreendedores-solo",
    title: "Estratégias de foco e clareza para empreendedores solo",
    description:
      "Do improviso diário à âncora semanal: clareza operacional sem milagre financeiro.",
    relatedProductSlug: "rotina-clareza-freelancer",
    keyword: "foco clareza empreendedor",
  },
];

function expand(post) {
  const paras = [];
  paras.push(`## Introdução\n\nEste guia trata de **${post.keyword}** com honestidade: organização primeiro, ferramenta depois. Sem promessa de renda.`);
  for (let i = 1; i <= 28; i++) {
    paras.push(`## Seção ${i} — Aplicação prática

No contexto de negócios locais e operação solo, o erro mais comum é adotar ferramentas antes de ter **catálogo**, **políticas** e **horários** claros. Quando o assunto é ${post.keyword}, a qualidade da resposta (humana ou assistida por IA) depende desses fundamentos.

### O que fazer hoje
1. Escreva em 10 linhas o estado atual do seu atendimento/tempo.
2. Escolha **uma** melhoria mensurável para as próximas 24h.
3. Defina a evidência (output nomeável).
4. Execute em um bloco protegido de 45–90 minutos.
5. Faça check-out de 10 minutos.

### O que evitar
- Disparo em massa e listas compradas
- Automações não oficiais de WhatsApp
- Deixar IA afirmar preço/prazo sem revisão
- Medir sucesso só por “sensação”

### Mini-caso
Um prestador solo implementou janelas de resposta e FAQ interno. Em uma semana, reduziu retrabalho de explicação de preço — sem prometer aumento de faturamento. O ganho foi **clareza operacional**.

### Checklist
- [ ] Base escrita (preços/políticas)
- [ ] Horário de atendimento comunicado
- [ ] Revisão humana quando usar IA
- [ ] Evidência registrada no dia
`);
  }
  paras.push(`## FAQ

### Isso garante resultado financeiro?
Não. É conteúdo educativo. Resultados variam.

### Preciso programar?
Não. O foco é processo e revisão.

### Qual próximo passo?
Veja o produto relacionado: [abrir](/produtos/${post.relatedProductSlug}) e o hub [/ecossistema](/ecossistema).

## Conclusão

${post.keyword} melhora quando há sistema mínimo. Comece pequeno, meça evidência, evite gambiarra.
`);
  return paras.join("\n\n");
}

const out = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  date: "2026-07-28",
  relatedProductSlug: p.relatedProductSlug,
  content: expand(p),
}));

fs.writeFileSync(
  "scripts/_generated-blog-posts.json",
  JSON.stringify(
    out.map((p) => ({
      ...p,
      words: p.content.split(/\s+/).length,
    })),
    null,
    2
  )
);

// Also write markdown copies under content/blog for reference
fs.mkdirSync("content/blog", { recursive: true });
for (const p of out) {
  fs.writeFileSync(
    `content/blog/${p.slug}.md`,
    `# ${p.title}\n\n${p.description}\n\n${p.content}\n`
  );
  console.log(p.slug, p.content.split(/\s+/).length);
}

console.log("OK", out.length, "posts");
