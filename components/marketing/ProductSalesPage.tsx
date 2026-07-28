import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, X } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/config/pricing";
import { HOTMART } from "@/lib/config/hotmart";
import type { EbookIdea } from "@/lib/market-research/trends";
import { getVoid9BySlug } from "@/lib/market-research/void9-portfolio";

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
  const void9 = getVoid9BySlug(idea.slug);
  const table = Math.round(idea.price * 1.8);
  const bumpValue = Math.round(idea.price * 0.4);
  const logoSrc = `/logos/${void9?.logoSlug || idea.slug}/logo-horizontal.svg`;
  const coverSrc = `/mockups/${void9?.logoSlug || idea.slug}/social-cover.svg`;

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
      answer: `Sim. Garantia de ${void9?.guaranteeDays ?? HOTMART.guaranteeDays} dias conforme política Hotmart e do produto.`,
    },
    {
      question: "Serve para quem atende sozinho?",
      answer: "Sim. O ecossistema BalcãoIA foi pensado para operação solo e equipes pequenas.",
    },
    {
      question: "Usa automação não oficial de WhatsApp?",
      answer: "Não. Trabalhamos só com práticas éticas e, quando houver IA, com revisão humana.",
    },
    {
      question: "É oficial da Meta, WhatsApp ou Hotmart?",
      answer: "Não. BalcãoIA é independente. Usamos nomes de marcas apenas de forma nominativa.",
    },
    {
      question: "Quanto tempo por dia preciso?",
      answer: "Blocos curtos (25–90 min) já bastam se forem protegidos e fechados com evidência.",
    },
    {
      question: "Posso parcelar?",
      answer: "Parcelamento depende das opções liberadas no checkout Hotmart no momento da compra.",
    },
    {
      question: "Tem order bump ou upsell?",
      answer: void9
        ? `Sim, na trilha: bump sugerido ${void9.bump}; próximo passo ${void9.upsell}.`
        : "Pode haver ofertas complementares no checkout, sempre opcionais.",
    },
    {
      question: "Como vira afiliado?",
      answer: `Veja /produtos/${idea.slug}/afiliados e a página geral /afiliados.`,
    },
    {
      question: "Qual a relação com o BalcãoIA Studio?",
      answer: idea.alignedWithBalcaoia
        ? "Alinhado ao Método BalcãoIA 7D — pode ser ponte para o Studio completo."
        : "Produto complementar do catálogo BalcãoIA.",
    },
    {
      question: "Funciona no celular?",
      answer: "Sim. O conteúdo é digital e a leitura/prática funciona no mobile.",
    },
    {
      question: "E se eu não gostar?",
      answer: "Use a garantia no prazo informado e solicite reembolso pela Hotmart.",
    },
    {
      question: "Preciso de equipe?",
      answer: "Não. Começa solo; se tiver equipe, os checklists ajudam a padronizar.",
    },
    {
      question: "Tem suporte?",
      answer: "Suporte via contato@balcaoialocal.com.br para dúvidas de acesso e material.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="gradient-petrol text-white">
          <div className="container-app flex flex-col items-center gap-6 py-16 text-center sm:py-24">
            <div className="rounded-xl bg-white/95 px-4 py-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={idea.title} width={280} height={84} className="h-14 w-auto" />
            </div>
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
                href={`/produtos/${idea.slug}/afiliados`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
                )}
              >
                Quero afiliar
              </Link>
            </div>
            <p className="flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="h-4 w-4 text-[var(--brand-amber)]" />
              Garantia de {void9?.guaranteeDays ?? HOTMART.guaranteeDays} dias · Sem promessa de renda
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--border)] bg-white py-6">
          <div className="container-app flex flex-wrap items-center justify-center gap-6 text-center text-sm text-[var(--muted-foreground)]">
            <span>Conteúdo digital completo</span>
            <span>·</span>
            <span>Trilha BalcãoIA</span>
            <span>·</span>
            <span>Compliance ético</span>
            <span>·</span>
            <span>Checkout Hotmart</span>
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
          <div className="container-app grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">A solução</h2>
              <p className="mt-3 text-lg text-[var(--muted-foreground)]">{idea.bigIdea}</p>
              {void9 && (
                <p className="mt-2 text-sm font-medium text-[var(--brand-petrol)]">
                  Mecanismo: {void9.mechanism}
                </p>
              )}
              <ul className="mt-8 grid gap-3">
                {idea.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
              <Image
                src={coverSrc}
                alt={`Capa ${idea.title}`}
                width={1200}
                height={630}
                className="h-auto w-full"
                unoptimized
              />
            </div>
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

        {void9 && (
          <section className="bg-[var(--muted)] py-14">
            <div className="container-app">
              <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">Bônus da trilha</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {[void9.bump, "Templates de execução", "Checklist de implantação"].map((b) => (
                  <li key={b} className="rounded-xl border border-[var(--border)] bg-white p-4 text-sm">
                    <p className="font-semibold text-[var(--brand-graphite)]">{b}</p>
                    <p className="mt-1 text-[var(--muted-foreground)]">
                      Valor de referência educativa ~ {formatBRL(bumpValue)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="container-app py-14">
          <h2 className="text-2xl font-bold text-[var(--brand-graphite)]">Stack de valor</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className="border-b border-[var(--border)] bg-white">
                  <td className="px-4 py-3">Produto principal</td>
                  <td className="px-4 py-3 text-right">{formatBRL(table)}</td>
                </tr>
                <tr className="border-b border-[var(--border)] bg-white">
                  <td className="px-4 py-3">Bônus / templates</td>
                  <td className="px-4 py-3 text-right">{formatBRL(bumpValue * 2)}</td>
                </tr>
                <tr className="bg-[var(--brand-petrol)] text-white">
                  <td className="px-4 py-3 font-semibold">Você investe hoje</td>
                  <td className="px-4 py-3 text-right text-lg font-bold">{formatBRL(idea.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">
            Valores de referência educativa — não são “preço de mercado comprovado”. Sem promessa financeira.
          </p>
        </section>

        <section className="bg-[var(--muted)] py-14">
          <div className="container-app grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--brand-graphite)]">
                <Check className="h-5 w-5 text-emerald-600" /> Para quem é
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Donos de negócio local e prestadores solo</li>
                <li>Quem quer organização sem milagre</li>
                <li>Quem aceita praticar em blocos curtos</li>
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--brand-graphite)]">
                <X className="h-5 w-5 text-red-600" /> Para quem não é
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Quem busca renda garantida</li>
                <li>Quem quer robô / gambiarra de WhatsApp</li>
                <li>Quem não vai executar nenhum exercício</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container-app py-14 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[var(--brand-petrol)]" />
          <h2 className="mt-4 text-2xl font-bold text-[var(--brand-graphite)]">
            Garantia de {void9?.guaranteeDays ?? HOTMART.guaranteeDays} dias
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted-foreground)]">
            Avalie o material com uso real. Se não fizer sentido para o seu contexto, solicite reembolso pela Hotmart
            no prazo da garantia.
          </p>
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
            {void9 && (
              <p className="mt-2 text-xs text-white/60">Próximo passo natural: {void9.upsell}</p>
            )}
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
