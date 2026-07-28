import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSalesPage } from "@/components/marketing/ProductSalesPage";
import { getAllEbookIdeas, getEbookBySlug, TOP_NICHES_2026 } from "@/lib/market-research/trends";
import { getVoid9BySlug } from "@/lib/market-research/void9-portfolio";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEbookIdeas().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) return { title: "Produto" };
  return {
    title: `${idea.title} — ${idea.subtitle.slice(0, 60)} | BalcãoIA`,
    description: idea.promise.slice(0, 155),
    alternates: { canonical: `${SITE.url}/produtos/${slug}` },
    openGraph: {
      title: idea.title,
      description: idea.subtitle,
      url: `${SITE.url}/produtos/${slug}`,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "website",
      images: [`/mockups/${slug}/social-cover.svg`],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) notFound();
  const niche = TOP_NICHES_2026.find((n) => n.id === idea.nicheId);
  const void9 = getVoid9BySlug(slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: idea.title,
    description: idea.promise,
    brand: { "@type": "Brand", name: "BalcãoIA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: String(idea.price),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/produtos/${slug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Isso garante resultado financeiro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. É material educativo. Resultados dependem da execução e do contexto.",
        },
      },
      {
        "@type": "Question",
        name: "Tem garantia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Garantia de ${void9?.guaranteeDays ?? 7} dias conforme política Hotmart/produto.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProductSalesPage
        idea={idea}
        complianceNote={
          niche?.complianceNote ??
          "Conteúdo educativo. Resultados variam. Sem promessa de renda."
        }
      />
    </>
  );
}
