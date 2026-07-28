import Link from "next/link";
import { ArrowRight, CheckCircle2, ListChecks } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";

const checklistPreview = [
  "Você responde no primeiro minuto ou o cliente já foi pra concorrência?",
  "Seu atendimento sabe recusar um pedido sem perder a venda?",
  "Quem atende sabe o preço de cor ou improvisa na hora?",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-petrol text-white">
      <div className="bg-grid-petrol absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-[var(--brand-amber)]/20 blur-3xl" />

      <div className="container-app relative flex flex-col gap-14 py-20 sm:py-28 lg:flex-row lg:items-center lg:gap-10 lg:py-32">
        <div className="flex flex-1 flex-col gap-7">
          <div className="inline-flex w-fit items-center rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/20">
            <BrandLogo size="hero" variant="light" priority />
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
            <ListChecks className="h-3.5 w-3.5" />
            Diagnóstico gratuito de atendimento
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Seu atendimento responde melhor.{" "}
            <span className="text-[var(--brand-amber)]">Seu negócio vende</span>{" "}
            com mais clareza.
          </h1>

          <p className="max-w-xl text-balance text-lg text-white/75 sm:text-xl">
            Preencha o checklist com <strong className="text-white">37 perguntas</strong>{" "}
            que revelam exatamente onde seu atendimento está perdendo vendas —
            e receba um plano simples para corrigir isso essa semana.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#captura"
              className={cn(buttonVariants({ variant: "amber", size: "lg" }), "justify-center")}
            >
              Fazer meu diagnóstico grátis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/checklist"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "justify-center border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
              )}
            >
              Ver o checklist completo
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
              Resultado em menos de 2 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
              Feito para negócios locais
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-semibold text-white/80">
                Checklist do Atendimento
              </span>
              <span className="rounded-full bg-[var(--brand-amber)]/20 px-2.5 py-1 text-xs font-bold text-[var(--brand-amber)]">
                37 perguntas
              </span>
            </div>
            <ul className="flex flex-col gap-4 py-5">
              {checklistPreview.map((question) => (
                <li key={question} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/50">
                    ?
                  </span>
                  {question}
                </li>
              ))}
            </ul>
            <div className="rounded-lg bg-black/20 p-3.5 text-center text-xs text-white/50">
              + 34 outras perguntas revelam exatamente onde seu atendimento
              trava uma venda.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
