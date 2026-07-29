import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Shield } from "lucide-react";
import { getFunil, getAllFunilSlugs } from "@/lib/funis-data";
import { resolveStudioSlug } from "@/lib/config/lote1-checkouts";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllFunilSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const funil = getFunil(slug);
  return {
    title: funil ? `Próximo passo — ${funil.name}` : "Oferta relacionada",
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE.url}/upsell/${slug}` },
  };
}

/**
 * Página pós-compra / próximo passo.
 * Sem countdown falso de escassez. Oferta relacionada com checkout real.
 */
export default async function UpsellPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = resolveStudioSlug(raw);
  const funil = getFunil(raw) || getFunil(slug);
  if (!funil) notFound();

  const u = funil.upsell;
  const d = funil.downsell;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <header className="border-b border-white/5 px-5 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="text-xs font-bold tracking-[0.16em] uppercase">
            BalcãoIA
          </Link>
          <span className="text-[10px] tracking-wider text-white/35 uppercase">
            Próximo passo (opcional)
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-14 text-center">
        <p className="text-sm text-white/40">Obrigado pela confiança</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
          Quer complementar{" "}
          <span className="text-white/55">{funil.name}</span>?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-white/45">
          Oferta relacionada do catálogo BalcãoIA. Conteúdo educativo — sem promessa de renda.
          Sem pressão artificial de timer.
        </p>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left">
          <p className="text-[10px] font-bold tracking-[0.18em] text-white/35 uppercase">
            Sugestão
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">{u.title}</h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{u.description}</p>
          <p className="mt-5 text-3xl font-extrabold text-white">
            R$ {u.priceRef}
            <span className="ml-2 text-sm font-normal text-white/35">preço do produto</span>
          </p>
          {u.checkoutUrl && u.checkoutUrl !== "#" ? (
            <a
              href={u.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3D4A] py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Ver checkout Hotmart
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          <Link
            href={`/produtos/${u.studioSlug}`}
            className="mt-3 block text-center text-xs text-white/40 underline-offset-2 hover:underline"
          >
            Ler a página de vendas
          </Link>
        </section>

        <section className="mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-left">
          <p className="text-[10px] font-bold tracking-[0.18em] text-white/30 uppercase">
            Alternativa menor
          </p>
          <h3 className="mt-2 font-semibold text-white/90">{d.title}</h3>
          <p className="mt-2 text-sm font-light text-white/45">{d.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold">R$ {d.priceRef}</span>
            {d.checkoutUrl && d.checkoutUrl !== "#" ? (
              <a
                href={d.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80"
              >
                Checkout
              </a>
            ) : null}
            <Link
              href={`/produtos/${d.studioSlug}`}
              className="text-xs text-white/40 underline-offset-2 hover:underline"
            >
              Detalhes
            </Link>
          </div>
        </section>

        <p className="mt-10 flex items-center justify-center gap-2 text-[10px] text-white/30">
          <Shield className="h-3 w-3" />
          Pagamento na Hotmart · Você pode pular esta etapa
        </p>
        <Link href={`/produtos/${funil.studioSlug}/obrigado`} className="mt-4 inline-block text-xs text-white/25 hover:text-white/50">
          Ir para confirmação sem oferta
        </Link>
      </main>
    </div>
  );
}
