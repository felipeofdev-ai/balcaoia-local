import type { Metadata } from "next";
import { CheckCircle2, ListChecks } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { BrandLogo } from "@/components/shared/BrandLogo";

export const metadata: Metadata = {
  title: "Checklist gratuito — 37 perguntas sobre seu atendimento",
  description:
    "Baixe o checklist com 37 perguntas que revelam onde seu atendimento está perdendo vendas, organizado por etapa da conversa com o cliente.",
};

const categories = [
  {
    title: "Primeiro contato",
    count: 9,
    description: "Velocidade de resposta, tom de voz e primeira impressão.",
  },
  {
    title: "Qualificação",
    count: 8,
    description: "Como você entende o que o cliente realmente precisa.",
  },
  {
    title: "Preço e objeções",
    count: 10,
    description: "Como preço, prazo e \u201cvou pensar\u201d são tratados hoje.",
  },
  {
    title: "Fechamento e pós-venda",
    count: 10,
    description: "Como a venda é confirmada e o que acontece depois dela.",
  },
];

export default function ChecklistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="gradient-petrol py-20 text-white sm:py-24">
          <div className="container-app flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25">
              <BrandLogo size="xl" variant="light" priority />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
              <ListChecks className="h-3.5 w-3.5" />
              Material gratuito
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
              O checklist com 37 perguntas que todo negócio local deveria
              responder
            </h1>
            <p className="max-w-2xl text-balance text-lg text-white/75">
              Descubra, etapa por etapa, onde seu atendimento está deixando
              vendas na mesa — e o que fazer para corrigir cada ponto.
            </p>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="O que você vai encontrar"
              title="37 perguntas organizadas em 4 etapas da conversa"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-6"
                >
                  <span className="w-fit rounded-full bg-[var(--brand-petrol)]/10 px-2.5 py-1 text-xs font-bold text-[var(--brand-petrol)]">
                    {category.count} perguntas
                  </span>
                  <h3 className="text-base font-semibold text-[var(--brand-graphite)]">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mx-auto flex w-full max-w-2xl flex-col gap-3">
              {[
                "Identifique exatamente onde o cliente desiste da conversa",
                "Veja se sua equipe responde com o mesmo padrão de qualidade",
                "Compare seu atendimento com o que os clientes esperam hoje",
                "Saia com uma lista priorizada do que corrigir primeiro",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--brand-graphite)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-petrol)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-20 sm:py-24">
          <div className="container-app flex flex-col gap-12">
            <SectionTitle
              eyebrow="Baixe agora"
              title="Preencha para receber o checklist completo"
              description="Enviamos por e-mail e você pode responder direto pelo diagnóstico online."
            />
            <LeadCaptureForm
              id="captura"
              source="checklist_page"
              title="Quero o checklist de 37 perguntas"
              description="Gratuito. Leva menos de 1 minuto para se inscrever."
              submitLabel="Quero receber o checklist"
            />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
