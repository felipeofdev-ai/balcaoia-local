import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSalesPage } from "@/components/marketing/ProductSalesPage";
import { TierZeroSalesPage } from "@/components/marketing/TierZeroSalesPage";
import { getAllEbookIdeas, getEbookBySlug, TOP_NICHES_2026 } from "@/lib/market-research/trends";
import { getVoid9BySlug } from "@/lib/market-research/void9-portfolio";
import { resolveStudioSlug } from "@/lib/config/lote1-checkouts";
import {
  getTierZeroProduct,
  getAllTierZeroSlugs,
  resolveCheckoutSlug,
  CHECKOUT_CODE_MAP,
} from "@/lib/sales/tier-zero-catalog";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const base = getAllEbookIdeas().map((e) => ({ slug: e.slug }));
  const aliases = ["whatsapp-etico", "balcaoia-pro", ...Object.keys(CHECKOUT_CODE_MAP)].map(
    (slug) => ({ slug })
  );
  const tier = getAllTierZeroSlugs().map((slug) => ({ slug }));
  const map = new Map<string, { slug: string }>();
  for (const p of [...base, ...aliases, ...tier]) map.set(p.slug, p);
  return [...map.values()];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = resolveStudioSlug(resolveCheckoutSlug(raw));
  const tier = getTierZeroProduct(slug);
  const idea = getEbookBySlug(slug);
  if (!tier && !idea) return { title: "Produto" };
  const title = tier?.name ?? idea!.title;
  const description = (tier?.subheadline ?? idea!.promise).slice(0, 155);
  return {
    title: `${title} | BalcãoIA`,
    description,
    alternates: { canonical: `${SITE.url}/produtos/${slug}` },
    openGraph: {
      title,
      description: tier?.tagline ?? idea?.subtitle ?? title,
      url: `${SITE.url}/produtos/${slug}`,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "website",
      images: [tier?.coverSrc ?? `/mockups/${slug}/social-cover.svg`],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = resolveStudioSlug(resolveCheckoutSlug(raw));
  const tier = getTierZeroProduct(slug);

  if (tier) {
    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: tier.name,
      description: tier.subheadline,
      image: `${SITE.url}${tier.coverSrc || "/logo.png"}`,
      brand: { "@type": "Brand", name: "BalcãoIA" },
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        price: String(tier.price),
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/produtos/${slug}`,
        seller: { "@type": "Organization", name: "BalcãoIA" },
      },
    };
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tier.faqs.slice(0, 8).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
        <TierZeroSalesPage product={tier} />
      </>
    );
  }

  const idea = getEbookBySlug(slug);
  if (!idea) notFound();
  const niche = TOP_NICHES_2026.find((n) => n.id === idea.nicheId);
  const void9 = getVoid9BySlug(slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: idea.title,
    description: idea.promise,
    image: `${SITE.url}/mockups/${slug}/social-cover.svg`,
    brand: { "@type": "Brand", name: "BalcãoIA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: String(idea.price),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/produtos/${slug}`,
      seller: { "@type": "Organization", name: "BalcãoIA" },
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
