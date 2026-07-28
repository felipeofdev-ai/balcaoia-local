import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  if (!idea) return { title: "Obrigado" };
  return {
    title: `Obrigado — ${idea.title} | BalcãoIA`,
    description: "Próximos passos após a compra.",
    robots: { index: false },
  };
}

export default async function ObrigadoProdutoPage({ params }: Props) {
  const { slug } = await params;
  const idea = getEbookBySlug(slug);
  if (!idea) notFound();
  const void9 = getVoid9BySlug(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app flex-1 py-16">
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">Pagamento recebido</h1>
        <p className="mt-3 max-w-xl text-[var(--muted-foreground)]">
          Obrigado por adquirir <strong>{idea.title}</strong>. Verifique o e-mail da Hotmart para acessar o
          material. Suporte: {SITE.supportEmail || "contato@balcaoialocal.com.br"}.
        </p>
        <ol className="mt-8 list-decimal space-y-2 pl-5 text-sm">
          <li>Abra o e-mail de confirmação Hotmart</li>
          <li>Baixe / acesse o conteúdo</li>
          <li>Faça o exercício do módulo 1 nas próximas 24h</li>
        </ol>
        {void9 && (
          <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6">
            <h2 className="text-lg font-semibold">Próximo passo (opcional)</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{void9.upsell}</p>
            <Link href="/vendas" className={cn(buttonVariants({ variant: "default" }), "mt-4 inline-flex")}>
              Conhecer o Método 7D
            </Link>
          </div>
        )}
      </main>
      <MarketingFooter />
    </div>
  );
}
