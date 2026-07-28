import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/config/pricing";
import { VOID9_PORTFOLIO } from "@/lib/market-research/void9-portfolio";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Ecossistema BalcãoIA — Portfólio de produtos",
  description:
    "Trilha completa para negócios locais: foco, atendimento ético, IA assistida e operação — sem promessa de renda.",
  alternates: { canonical: `${SITE.url}/ecossistema` },
};

function TierGrid({ tier }: { tier: 1 | 2 | 3 }) {
  const items = VOID9_PORTFOLIO.filter((p) => p.tier === tier);
  const label = tier === 1 ? "Entrada" : tier === 2 ? "Crescimento" : "Elite";
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">
        Tier {tier} — {label}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${p.slug}/logo-horizontal.svg`} alt={p.title} className="h-12 w-auto" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--brand-graphite)]">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--muted-foreground)]">{p.promise}</p>
            <p className="mt-4 text-xl font-bold text-[var(--brand-petrol)]">{formatBRL(p.price)}</p>
            <Link
              href={`/produtos/${p.slug}`}
              className={cn(buttonVariants({ variant: "default" }), "mt-4 inline-flex justify-center")}
            >
              Ver oferta
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EcossistemaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="gradient-petrol text-white">
          <div className="container-app py-20 text-center">
            <p className="text-sm uppercase tracking-widest text-white/70">BalcãoIA</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold sm:text-5xl">
              Ecossistema para organizar o balcão — com IA assistida e ética
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Do foco diário ao atendimento e à operação avançada. Sem renda garantida. Sem gambiarra de WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#portfolio" className={cn(buttonVariants({ variant: "amber", size: "lg" }))}>
                Ver produtos
              </Link>
              <Link
                href="/afiliados"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
                )}
              >
                Seja afiliado
              </Link>
            </div>
          </div>
        </section>

        <section className="container-app py-12">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-[var(--brand-petrol)]">{VOID9_PORTFOLIO.length}</p>
              <p className="text-sm text-[var(--muted-foreground)]">Produtos na trilha</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--brand-petrol)]">3</p>
              <p className="text-sm text-[var(--muted-foreground)]">Tiers (entrada → elite)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--brand-petrol)]">7D</p>
              <p className="text-sm text-[var(--muted-foreground)]">Método âncora + Studio</p>
            </div>
          </div>
        </section>

        <div id="portfolio" className="container-app pb-20">
          <TierGrid tier={1} />
          <TierGrid tier={2} />
          <TierGrid tier={3} />
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
