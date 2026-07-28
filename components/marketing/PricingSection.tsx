import Link from "next/link";
import { Check, Flame } from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING, perceivedTotal, formatBRL } from "@/lib/config/pricing";
import { cn } from "@/lib/utils";

const included = [
  "Diagnóstico completo do atendimento (37 perguntas)",
  "Roteiros de primeira resposta, qualificação e objeções",
  "Base de perguntas frequentes organizada",
  "Catálogo de produtos/serviços e políticas claras",
  "Checklist de implementação em 7 dias",
  PRICING.orderBump.name,
];

export function PricingSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="Investimento"
          title="Menos do que uma venda perdida por falta de resposta"
          description={`Reunimos tudo o que você precisa para organizar seu atendimento em um único pacote — sem mensalidade obrigatória.`}
        />

        <div className="mx-auto w-full max-w-lg rounded-2xl border-2 border-[var(--brand-amber)] bg-white p-8 shadow-xl shadow-[var(--brand-amber)]/10">
          <div className="flex items-center justify-between">
            <Badge variant="amber" className="gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              Turma de lançamento
            </Badge>
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              Apenas {PRICING.betaLimit} vagas
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-1">
            <span className="text-sm text-[var(--muted-foreground)] line-through">
              Valor de tabela: {formatBRL(PRICING.table)}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[var(--brand-graphite)] sm:text-5xl">
                {formatBRL(PRICING.launch)}
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">à vista</span>
            </div>
            <span className="text-sm font-medium text-[var(--brand-petrol)]">
              {PRICING.installmentText}
            </span>
          </div>

          <ul className="mt-7 flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--brand-graphite)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="#captura"
            className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-8 w-full")}
          >
            Quero garantir minha vaga
          </Link>

          <p className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
            Valor percebido do pacote completo: {formatBRL(perceivedTotal)} em
            materiais e ferramentas.
          </p>
        </div>
      </div>
    </section>
  );
}
