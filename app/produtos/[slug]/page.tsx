import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSalesPage } from "@/components/marketing/ProductSalesPage";
import { getAllEbookIdeas, getEbookBySlug, TOP_NICHES_2026 } from "@/lib/market-research/trends";
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
    title: `${idea.title} | BalcãoIA`,
    description: idea.promise.slice(0, 155),
    alternates: { canonical: `${SITE.url}/produtos/${slug}` },
    openGraph: {
      title: idea.title,
      description: idea.subtitle,
      url: `${SITE.url}/produtos/${slug}`,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) notFound();
  const niche = TOP_NICHES_2026.find((n) => n.id === idea.nicheId);
  return (
    <ProductSalesPage
      idea={idea}
      complianceNote={niche?.complianceNote ?? "Conteúdo educativo. Resultados variam."}
    />
  );
}
