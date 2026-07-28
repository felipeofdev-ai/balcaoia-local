import Link from "next/link";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/config/pricing";
import { HOTMART } from "@/lib/config/hotmart";
import type { EbookIdea } from "@/lib/market-research/trends";

type Props = {
  idea: EbookIdea & { nicheName: string };
  complianceNote: string;
};

function resolveCheckout(idea: EbookIdea) {
  if (idea.checkoutEnvKey && process.env[idea.checkoutEnvKey]) {
    return process.env[idea.checkoutEnvKey] as string;
  }
  return HOTMART.checkoutUrl;
}

export function ProductSalesPage({ idea, complianceNote }: Props) {
  const checkout = resolveCheckout(idea);
  const table = Math.round(idea.price * 1.8);

  const faq = [
    {
      question: "Isso garante resultado financeiro?",
      answer:
        "Não. É material educativo. Resultados dependem da sua execução, contexto e disciplina. Não prometemos renda ou vendas.",
    },
    {
      question: "Como recebo o acesso?",
      answer:
        "Após a confirmação na Hotmart, você recebe o acesso conforme a entrega configurada (área de membros ou arquivo).",
    },
    {
      question: "Tem garantia?",
      answer: `Sim. Garantia de ${HOTMART.guaranteeDays} dias conforme política Hotmart e do produto.`,
    },
    {
      question: "Qual a relação com o BalcãoIA Studio?",
      answer:
        idea.alignedWithBalcaoia
          ? "Este material é alinhado ao Método BalcãoIA 7D e pode ser o próximo passo natural para o Studio completo."
          : "É um produto do catálogo complementar. O produto principal continua sendo o Método BalcãoIA 7D + Studio.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="gradient-petrol text-white">
          <div className="container-app flex flex-col items-center gap-6 py-16 text-center sm:py-24">
            <Badge className="bg-white/10 text-[var(--brand-amber)]">{idea.nicheName}</Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              {idea.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/80">{idea.subtitle}</p>
            <p className="max-w-2xl text-sm text-white/70">{idea.promise}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={checkout}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "amber", size: "lg" }))}
              >
                Quero acessar agora
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/vendas"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
                )}
              >
                Ver Método 7D completo
              </Link>
            </div>
            <p className="flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="h-4 w-4 text-[var(--brand-amber)]" />
              Garantia de {HOTMART.guaranteeDays} dias · Sem promessa de renda
            </p>
          </div>
        </section>

        <section className="container-app py-14">
          <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">Se isso soa familiar…</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {idea.painPoints.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--brand-graphite)]"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[var(--muted)] py-14">
          <div className="container-app">
            <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">A big idea</h2>
            <p className="mt-3 max-w-3xl text-lg text-[var(--muted-foreground)]">{idea.bigIdea}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {idea.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container-app py-14">
          <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">O que você vai percorrer</h2>
          <ol className="mt-6 space-y-3">
            {idea.chapters.map((c, i) => (
              <li
                key={c}
                className="flex gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-petrol)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {c}
              </li>
            ))}
          </ol>
        </section>

        <section id="oferta" className="bg-[var(--brand-petrol)] py-14 text-white">
          <div className="container-app max-w-xl text-center">
            <p className="text-sm text-white/60 line-through">De {formatBRL(table)}</p>
            <p className="mt-2 text-5xl font-extrabold">{formatBRL(idea.price)}</p>
            <p className="mt-2 text-sm text-white/70">
              Comissão afiliado sugerida: {idea.suggestedAffiliate}%
            </p>
            <a
              href={checkout}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-8 inline-flex")}
            >
              Garantir meu acesso
            </a>
            <p className="mt-4 text-xs text-white/50">{complianceNote}</p>
          </div>
        </section>

        <section className="container-app py-14">
          <h2 className="mb-6 text-2xl font-bold text-[var(--brand-graphite)]">Perguntas frequentes</h2>
          <FAQAccordion items={faq} />
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
