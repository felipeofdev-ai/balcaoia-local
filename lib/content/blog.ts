import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  relatedProductSlug?: string;
  content: string;
}

/** Posts curtos legados + artigos longos em content/blog/*.md */
export const BLOG_POSTS_SHORT: BlogPost[] = [
  {
    slug: "ia-para-negocios-locais-2026",
    title: "IA para negócios locais em 2026: por onde começar sem gambiarra",
    description:
      "Guia prático para donos de salões, clínicas e lojas usarem IA com organização e revisão humana.",
    date: "2026-07-01",
    relatedProductSlug: "negocio-local-ia",
    content: `## O problema não é a ferramenta

Muitos negócios locais testam ChatGPT e desistem porque a resposta inventa preço ou tom. O problema raramente é o modelo — é a **falta de base organizada**.

## Três fundamentos

1. Catálogo e políticas por escrito
2. Roteiros de primeira resposta
3. Revisão humana antes de ir ao ar

## O que evitar

Automações não oficiais de WhatsApp, disparo em massa e promessas de renda.

## Próximo passo

Faça o [diagnóstico gratuito](/diagnostico) e conheça o [Método BalcãoIA 7D](/vendas).`,
  },
  {
    slug: "afiliados-hotmart-compliance",
    title: "Hotmart para afiliados: compliance que protege sua conta",
    description: "Regras práticas para divulgar sem prometer renda.",
    date: "2026-07-10",
    content: `## Não prometa renda

Promessa de faturamento é risco.

## Use o kit

Materiais em [/afiliados](/afiliados).`,
  },
];

function loadLongPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const slug = file.replace(/\.md$/, "");
      const titleMatch = raw.match(/^#\s+(.+)$/m);
      const lines = raw.split("\n");
      const description = (lines[2] || "").trim() || titleMatch?.[1] || slug;
      const contentStart = raw.indexOf("\n## ");
      const content = contentStart >= 0 ? raw.slice(contentStart).trim() : raw;
      const related =
        slug.includes("whatsapp") || slug.includes("automacao")
          ? "whatsapp-etico-negocios"
          : slug.includes("produtividade") || slug.includes("foco")
            ? "foco-14"
            : slug.includes("transformacao")
              ? "programa-8-semanas-balcao"
              : slug.includes("programadores")
                ? "sistema-balcao-proprietario"
                : slug.includes("atendimento")
                  ? "workshop-ia-atendimento"
                  : "foco-14";
      return {
        slug,
        title: titleMatch?.[1] || slug,
        description,
        date: "2026-07-28",
        relatedProductSlug: related,
        content,
      };
    });
}

export const BLOG_POSTS: BlogPost[] = (() => {
  const long = loadLongPosts();
  const seen = new Set(long.map((p) => p.slug));
  return [...long, ...BLOG_POSTS_SHORT.filter((p) => !seen.has(p.slug))];
})();

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
