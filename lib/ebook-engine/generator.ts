import { GUARDRAILS } from "@/lib/ai/provider";
import { generateWithFallback } from "@/lib/ai/orchestrator";
import type { EbookIdea } from "@/lib/market-research/trends";

export interface GeneratedChapter {
  number: number;
  title: string;
  content: string;
  keyPoints: string[];
  practicalExercise: string;
}

export interface GeneratedEbook {
  title: string;
  subtitle: string;
  author: string;
  niche: string;
  slug: string;
  chapters: GeneratedChapter[];
  introduction: string;
  conclusion: string;
  cta: string;
  metadata: {
    totalWords: number;
    totalPages: number;
    readingTime: string;
    generatedAt: string;
    aiModel: string;
    mode: "outline" | "full";
    niche: string;
    price: number;
    affiliateCommission: number;
  };
}

export type GenerateEbookOptions = {
  authorName?: string;
  mode?: "outline" | "full";
  maxChapters?: number;
};

async function aiText(prompt: string, task: "long_content" | "fast" = "long_content") {
  return generateWithFallback(prompt, GUARDRAILS, { task });
}

function outlineChapter(title: string, number: number, idea: EbookIdea): GeneratedChapter {
  return {
    number,
    title,
    content: [
      `## ${title}`,
      ``,
      `Este capítulo desenvolve o tema **${title}** no contexto de “${idea.title}”.`,
      ``,
      `### Ideia central`,
      idea.bigIdea,
      ``,
      `### Por que importa`,
      ...idea.painPoints.slice(0, 2).map((p) => `- ${p}`),
      ``,
      `### Passos práticos`,
      `1. Liste a situação atual relacionada a este tema.`,
      `2. Defina um resultado mínimo observável nesta semana.`,
      `3. Execute um experimento pequeno e revise com um humano.`,
      ``,
      `### Atenção`,
      `Resultados variam. Este material é educativo e não substitui aconselhamento profissional especializado.`,
    ].join("\n"),
    keyPoints: [
      "Foque em clareza antes de ferramentas",
      "Execute um experimento pequeno",
      "Revise com critério humano",
    ],
    practicalExercise: `Escreva em 10 linhas: situação atual → ação desta semana → critério de sucesso para “${title}”.`,
  };
}

export async function generateFullEbook(
  idea: EbookIdea,
  niche: string,
  options: GenerateEbookOptions = {}
): Promise<GeneratedEbook> {
  const authorName = options.authorName ?? "BalcãoIA";
  const mode = options.mode ?? "outline";
  const maxChapters = Math.min(options.maxChapters ?? idea.chapters.length, idea.chapters.length);
  const chaptersSlice = idea.chapters.slice(0, maxChapters);

  let introduction: string;
  let conclusion: string;
  let modelUsed = "outline-local";
  const chapters: GeneratedChapter[] = [];

  if (mode === "outline") {
    introduction = [
      `# Introdução — ${idea.title}`,
      ``,
      idea.promise,
      ``,
      `**Big idea:** ${idea.bigIdea}`,
      ``,
      `Este ebook foi estruturado para ser prático. Sem promessas milagrosas: o valor está na execução disciplinada.`,
      ``,
      `### Para quem é`,
      ...idea.painPoints.map((p) => `- Se você se identifica com: ${p}`),
      ``,
      `### O que você leva`,
      ...idea.benefits.map((b) => `- ${b}`),
    ].join("\n");

    for (let i = 0; i < chaptersSlice.length; i++) {
      chapters.push(outlineChapter(chaptersSlice[i], i + 1, idea));
    }

    conclusion = [
      `## Conclusão`,
      ``,
      `Você percorreu a estrutura de **${idea.title}**. O próximo passo é escolher UM capítulo e aplicar a ação prática esta semana.`,
      ``,
      `Se o seu desafio é atendimento em negócio local, o caminho natural é o **Método BalcãoIA 7D** + Studio.`,
    ].join("\n");
  } else {
    const intro = await aiText(
      `Escreva a INTRODUÇÃO (600-900 palavras, markdown, PT-BR) do ebook "${idea.title} — ${idea.subtitle}". Promessa: ${idea.promise}. Big idea: ${idea.bigIdea}. Dores: ${idea.painPoints.join("; ")}. Sem prometer renda/resultados garantidos. Tom empático e direto.`
    );
    introduction = intro.content;
    modelUsed = intro.modelUsed;

    for (let i = 0; i < chaptersSlice.length; i++) {
      const title = chaptersSlice[i];
      const chapter = await aiText(
        `Escreva o CAPÍTULO ${i + 1} (800-1200 palavras, markdown, PT-BR) do ebook "${idea.title}". Título: "${title}". Big idea: ${idea.bigIdea}. Inclua seção Ação Prática. Sem promessas garantidas.`
      );
      modelUsed = chapter.modelUsed;
      chapters.push({
        number: i + 1,
        title,
        content: chapter.content,
        keyPoints: ["Aplicar o essencial", "Revisar com humano", "Registrar o que funcionou"],
        practicalExercise: `Aplique um experimento mínimo deste capítulo em até 48h.`,
      });
    }

    const conc = await aiText(
      `Escreva a CONCLUSÃO (400-700 palavras, markdown, PT-BR) do ebook "${idea.title}". Reforce execução realista e CTA para o Método BalcãoIA. Sem renda garantida.`
    );
    conclusion = conc.content;
    modelUsed = conc.modelUsed;
  }

  const totalWords = [introduction, ...chapters.map((c) => c.content), conclusion]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    title: idea.title,
    subtitle: idea.subtitle,
    author: authorName,
    niche,
    slug: idea.slug,
    chapters,
    introduction,
    conclusion,
    cta: "Continue em /vendas — Método BalcãoIA 7D + Studio",
    metadata: {
      totalWords,
      totalPages: Math.max(1, Math.ceil(totalWords / 250)),
      readingTime: `${Math.max(1, Math.ceil(totalWords / 200))} min`,
      generatedAt: new Date().toISOString(),
      aiModel: modelUsed,
      mode,
      niche,
      price: idea.price,
      affiliateCommission: idea.suggestedAffiliate,
    },
  };
}

export function ebookToMarkdown(ebook: GeneratedEbook): string {
  const lines = [
    `# ${ebook.title}`,
    `## ${ebook.subtitle}`,
    ``,
    `**Autor:** ${ebook.author}`,
    `**Páginas:** ~${ebook.metadata.totalPages}`,
    `**Leitura:** ${ebook.metadata.readingTime}`,
    ``,
    `---`,
    ``,
    ebook.introduction,
    ``,
    `---`,
    ``,
  ];
  for (const chapter of ebook.chapters) {
    lines.push(`## Capítulo ${chapter.number}: ${chapter.title}`, ``, chapter.content, ``, `---`, ``);
  }
  lines.push(ebook.conclusion, ``, `*${ebook.cta}*`);
  return lines.join("\n");
}
