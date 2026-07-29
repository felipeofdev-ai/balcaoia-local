import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import {
  getTierZeroProduct,
  getAllTierZeroSlugs,
  resolveCheckoutSlug,
} from "@/lib/sales/tier-zero-catalog";
import { resolveLote1Checkout, resolveStudioSlug } from "@/lib/config/lote1-checkouts";
import { SITE } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const products = getAllTierZeroSlugs();
  const shorts = [
    "j1",
    "j2",
    "j3",
    "j4",
    "j5",
    "j6",
    "j7",
    "j8",
    "j9",
    "j10",
    "a1",
    "a2",
    "b1",
    "c2",
    "d1",
    "d3",
    "whatsapp-etico",
    "balcaoia-pro",
  ];
  return [...new Set([...products, ...shorts])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = resolveStudioSlug(resolveCheckoutSlug(raw));
  const product = getTierZeroProduct(slug);
  return {
    title: product ? `Checkout · ${product.name}` : "Checkout",
    description: "Bridge seguro para o checkout Hotmart.",
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE.url}/checkout/${slug}` },
  };
}

export default async function CheckoutBridgePage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = resolveStudioSlug(resolveCheckoutSlug(raw));
  const product = getTierZeroProduct(slug);
  if (!product) notFound();

  const checkout =
    resolveLote1Checkout(slug) ||
    resolveLote1Checkout(raw) ||
    (product.checkoutUrl !== "#" ? product.checkoutUrl : null);

  const c = product.colors;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#0A0A0A]">
      <header className="border-b border-[#EAEAEA] bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <Link href="/" className="text-xs font-bold tracking-[0.16em] uppercase">
            BalcãoIA
          </Link>
          <span className="truncate text-xs text-[#6b7280]">{product.name}</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-5 py-10 md:flex-row md:items-start">
        <section className="flex-1 rounded-3xl border border-[#EAEAEA] bg-white p-7 shadow-sm">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#9ca3af] uppercase">
            Pagamento seguro
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Finalizar pedido</h1>
          <p className="mt-2 text-sm font-light text-[#6b7280]">
            Você será direcionado ao checkout oficial Hotmart. Não processamos cartão neste site.
          </p>

          {checkout ? (
            <a
              href={checkout}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white transition-opacity hover:opacity-95"
              style={{ background: c.primary }}
            >
              Ir para pagamento Hotmart
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              href="/contato"
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-[#0a0a0a] py-4 text-base font-bold text-white"
            >
              Solicitar link de checkout
            </Link>
          )}

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#9ca3af]">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Transação criptografada (Hotmart)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Garantia {product.guaranteeDays} dias
            </span>
          </div>
        </section>

        <aside className="w-full rounded-3xl border border-[#EAEAEA] bg-white p-6 md:w-72">
          <p className="text-[10px] font-bold tracking-[0.16em] text-[#9ca3af] uppercase">
            Resumo
          </p>
          <h2 className="mt-2 text-lg font-bold leading-snug">{product.name}</h2>
          <p className="mt-1 text-xs text-[#6b7280]">{product.tagline}</p>
          <div className="mt-6 flex items-baseline justify-between border-t border-[#EAEAEA] pt-4">
            <span className="text-sm text-[#6b7280]">Total</span>
            <span className="text-2xl font-extrabold" style={{ color: c.primary }}>
              R$ {product.price}
            </span>
          </div>
          {product.anchorPrice > product.price ? (
            <p className="mt-1 text-right text-xs text-[#9ca3af] line-through">
              Ref. R$ {product.anchorPrice}
            </p>
          ) : null}
          <p className="mt-4 text-[11px] leading-relaxed text-[#9ca3af]">
            Conteúdo educativo. Sem promessa de renda. PIX, cartão e boleto conforme Hotmart.
          </p>
          <Link
            href={`/produtos/${product.slug}`}
            className="mt-4 inline-block text-xs font-semibold underline-offset-2 hover:underline"
            style={{ color: c.primary }}
          >
            Voltar à página de vendas
          </Link>
        </aside>
      </main>

      <footer className="border-t border-[#EAEAEA] py-6 text-center text-[10px] text-[#9ca3af]">
        © 2026 BalcãoIA ·{" "}
        <Link href="/disclaimer" className="underline-offset-2 hover:underline">
          Disclaimer
        </Link>
      </footer>
    </div>
  );
}
