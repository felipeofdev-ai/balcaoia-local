export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  relatedProductSlug?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
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

Automações não oficiais de WhatsApp, disparo em massa e promessas de renda. Isso gera risco e quebra confiança.

## Próximo passo

Faça o [diagnóstico gratuito](/diagnostico) e conheça o [Método BalcãoIA 7D](/vendas).`,
  },
  {
    slug: "organizar-atendimento-7-dias",
    title: "Como organizar o atendimento do seu negócio em 7 dias",
    description: "Roteiro dia a dia para transformar improviso em padrão claro.",
    date: "2026-07-05",
    relatedProductSlug: "negocio-local-ia",
    content: `## Dia 1–2: Diagnóstico

Liste perguntas repetidas, tempo de resposta e onde o cliente some.

## Dia 3–4: Dados

Preços, prazos, trocas e FAQ em um único lugar.

## Dia 5–6: Discursos

Primeira resposta, objeções e handoff para humano.

## Dia 7: Teste

Simule conversas e ajuste. Sem prometer vendas garantidas — foque em clareza.

[Começar no Studio](/app/login)`,
  },
  {
    slug: "afiliados-hotmart-compliance",
    title: "Hotmart para afiliados: compliance que protege sua conta",
    description: "Regras práticas para divulgar sem prometer renda e sem usar marcas indevidamente.",
    date: "2026-07-10",
    relatedProductSlug: undefined,
    content: `## Não prometa renda

Promessa de faturamento/garantia de venda é o caminho mais curto para denúncia.

## Reproduza a oferta fielmente

Preço, garantia e entregáveis iguais à página oficial.

## Use o kit

Materiais prontos em [/afiliados](/afiliados).`,
  },
  {
    slug: "whatsapp-atendimento-com-consentimento",
    title: "WhatsApp no atendimento: consentimento, LGPD e clareza",
    description: "Boas práticas para negócios locais sem automação proibida.",
    date: "2026-07-12",
    content: `## Consentimento primeiro

Só continue conversas com quem pediu ou já é cliente, respeitando opt-out.

## Respostas padronizadas ≠ robô ilegal

Roteiros humanos + IA assistida com revisão são o caminho seguro.

Veja o [disclaimer](/disclaimer) e o [Método 7D](/vendas).`,
  },
  {
    slug: "marketing-local-sem-trafego-pago",
    title: "Marketing local sem depender só de anúncio",
    description: "Oferta clara, Google Meu Negócio e follow-up ético.",
    date: "2026-07-15",
    relatedProductSlug: "marketing-local",
    content: `## Oferta em uma frase

Se você não explica o que vende em 10 segundos, o anúncio não salva.

## Presença básica

Google Meu Negócio atualizado + prova social real.

## Follow-up

Mensagens com consentimento. Sem spam.

Produto relacionado: [Marketing Local que Organiza](/produtos/marketing-local).`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
