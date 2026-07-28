import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/config/pricing";
import { HOTMART, HOTMART_COMPLIANCE_RULES } from "@/lib/config/hotmart";
import { getEbookBySlug, getAllEbookIdeas } from "@/lib/market-research/trends";
import { getVoid9BySlug } from "@/lib/market-research/void9-portfolio";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEbookIdeas().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) return { title: "Afiliados" };
  return {
    title: `Afiliados — ${idea.title} | BalcãoIA`,
    description: `Divulgue ${idea.title} com comissão sugerida de ${idea.suggestedAffiliate}%. Sem promessa de renda.`,
    alternates: { canonical: `${SITE.url}/produtos/${slug}/afiliados` },
  };
}

export default async function AfiliadosProdutoPage({ params }: Props) {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) notFound();
  const void9 = getVoid9BySlug(slug);
  const logoSlug = void9?.logoSlug || slug;
  const commission = void9?.suggestedAffiliate ?? idea.suggestedAffiliate;
  const affiliateUrl =
    process.env.NEXT_PUBLIC_HOTMART_AFFILIATE_URL || HOTMART.affiliateBaseUrl;

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app flex-1 py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${logoSlug}/logo-horizontal.svg`}
          alt={idea.title}
          className="mb-6 h-14 w-auto"
        />
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">
          Afilie-se a {idea.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
          Comissão configurada no lançamento: <strong>{commission}%</strong> sobre{" "}
          {formatBRL(idea.price)}. Ative no painel Hotmart após o produto existir e use o
          link oficial de afiliação.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Ir para afiliação Hotmart
          </a>
          <Link href={`/produtos/${slug}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Ver página de vendas
          </Link>
          <Link href="/afiliados" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Kit geral BalcãoIA
          </Link>
        </div>
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Regras</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted-foreground)]">
            {HOTMART_COMPLIANCE_RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
