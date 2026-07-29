import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCapturePage,
  getAllCaptureSlugs,
} from "@/lib/sales/tier-zero-catalog";
import { resolveLote1Checkout, resolveStudioSlug } from "@/lib/config/lote1-checkouts";
import { SITE } from "@/lib/config/site";
import { CapturaClient } from "./CapturaClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaptureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCapturePage(slug);
  if (!page) return { title: "Captura" };
  return {
    title: `${page.headline.slice(0, 55)} | BalcãoIA`,
    description: page.subheadline.slice(0, 155),
    alternates: { canonical: `${SITE.url}/captura/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CapturaPage({ params }: Props) {
  const { slug } = await params;
  const page = getCapturePage(slug);
  if (!page) notFound();

  const productSlug = resolveStudioSlug(page.productSlug);
  const checkoutUrl = resolveLote1Checkout(productSlug) || resolveLote1Checkout(page.productSlug);

  return <CapturaClient page={page} checkoutUrl={checkoutUrl} />;
}
