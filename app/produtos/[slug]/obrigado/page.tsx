import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getEbookBySlug, getAllEbookIdeas } from "@/lib/market-research/trends";
import { getTierZeroProduct, getAllTierZeroSlugs } from "@/lib/sales/tier-zero-catalog";
import { getFunil } from "@/lib/funis-data";
import { resolveStudioSlug as resolveAlias } from "@/lib/config/lote1-checkouts";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const ideas = getAllEbookIdeas().map((e) => ({ slug: e.slug }));
  const tier = getAllTierZeroSlugs().map((slug) => ({ slug }));
  const map = new Map<string, { slug: string }>();
  for (const p of [...ideas, ...tier]) map.set(p.slug, p);
  return [...map.values()];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = resolveAlias(raw);
  const tier = getTierZeroProduct(slug);
  const idea = getEbookBySlug(slug);
  const title = tier?.name ?? idea?.title;
  if (!title) return { title: "Obrigado" };
  return {
    title: `Obrigado — ${title} | BalcãoIA`,
    description: "Próximos passos após a compra.",
    robots: { index: false },
  };
}

export default async function ObrigadoProdutoPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = resolveAlias(raw);
  const tier = getTierZeroProduct(slug);
  const idea = getEbookBySlug(slug);
  if (!tier && !idea) notFound();

  const name = tier?.name ?? idea!.title;
  const funil = getFunil(slug) || getFunil(raw);
  const primary = tier?.colors.primary ?? "#0F3D4A";

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app flex-1 py-16">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
          style={{ background: `${primary}18` }}
          aria-hidden
        >
          ✓
        </div>
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">Pagamento recebido</h1>
        <p className="mt-3 max-w-xl text-[var(--muted-foreground)]">
          Obrigado por adquirir <strong>{name}</strong>. Verifique o e-mail da Hotmart para acessar o
          material. Suporte: {SITE.supportEmail || "contato@balcaoialocal.com.br"}.
        </p>
        <ol className="mt-8 list-decimal space-y-2 pl-5 text-sm text-[var(--brand-graphite)]">
          <li>Abra o e-mail de confirmação Hotmart (e o spam)</li>
          <li>Baixe / acesse o conteúdo</li>
          <li>Aplique o primeiro exercício nas próximas 24h</li>
        </ol>

        {funil ? (
          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-graphite)]">
              Próximo passo (opcional)
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {funil.upsell.description} Sem redirecionamento forçado e sem timer de urgência.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/upsell/${funil.studioSlug}`}
                className={cn(buttonVariants({ variant: "default" }))}
                style={{ background: primary }}
              >
                Ver sugestão relacionada
              </Link>
              {funil.upsell.checkoutUrl !== "#" ? (
                <a
                  href={funil.upsell.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Checkout direto
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/vendas" className={cn(buttonVariants({ variant: "outline" }))}>
            Ver catálogo
          </Link>
          <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            Blog
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
