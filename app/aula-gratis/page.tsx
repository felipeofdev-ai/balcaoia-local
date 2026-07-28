import type { Metadata } from "next";
import {
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { VSLPlaceholder } from "@/components/marketing/VSLPlaceholder";
import { DisclaimerBrands } from "@/components/marketing/DisclaimerBrands";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Aula gratuita — Organize o atendimento do seu negócio com IA",
  description:
    "Assista à aula gratuita e veja, na prática, como organizar o atendimento do seu negócio com IA em 7 dias — sem programação e sem automações proibidas.",
};

const learnItems = [
  {
    icon: ClipboardList,
    title: "Onde seu atendimento está perdendo vendas",
    description: "Os 3 pontos mais comuns de perda em negócios locais — e como identificá-los no seu.",
  },
  {
    icon: BookOpenCheck,
    title: "Como organizar seu conhecimento para a IA",
    description: "O passo que a maioria pula antes de usar ChatGPT ou qualquer IA no atendimento.",
  },
  {
    icon: MessagesSquare,
    title: "Roteiros que resolvem objeções",
    description: "Como transformar \u201cestá caro\u201d e \u201cvou pensar\u201d em próximos passos claros.",
  },
  {
    icon: CalendarClock,
    title: "O que é o Método BalcãoIA 7D",
    description: "Uma visão geral de como organizar tudo isso em uma semana, sem gambiarra.",
  },
];

const forWho = [
  "Donos de negócios locais que atendem direto pelo WhatsApp, Instagram ou telefone",
  "Autônomos e pequenas equipes que sentem o atendimento desorganizado",
  "Quem já ouviu falar de IA mas não sabe por onde começar a aplicar",
];

export default function AulaGratisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden gradient-petrol text-white">
          <div className="bg-grid-petrol absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-[-10%] h-96 w-96 rounded-full bg-[var(--brand-amber)]/20 blur-3xl" />

          <div className="container-app relative flex flex-col items-center gap-6 py-16 text-center sm:py-20">
            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25">
              <BrandLogo size="xl" variant="light" priority />
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
              <Sparkles className="h-3.5 w-3.5" />
              Aula gratuita
            </span>
            <h1 className="text-balance max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Como organizar o atendimento do seu negócio com IA — sem
              programação e sem gambiarra
            </h1>
            <p className="max-w-2xl text-balance text-lg text-white/75">
              Uma aula prática e gratuita mostrando o passo a passo para
              organizar respostas, catálogo e objeções antes de colocar
              qualquer IA para ajudar no seu atendimento.
            </p>
          </div>
        </section>

        <section className="bg-[var(--brand-graphite-dark)] pb-16 sm:pb-20">
          <div className="container-app">
            <VSLPlaceholder
              title="Assista agora à aula gratuita completa"
              duration="≈ 15–20 min"
              embedUrl={SITE.media.freeClassEmbedUrl}
              caption={
                SITE.media.freeClassEmbedUrl
                  ? undefined
                  : "Configure NEXT_PUBLIC_VSL_AULA_URL com o link da aula."
              }
            />
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="container-app grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="flex flex-col gap-10">
              <SectionTitle
                align="left"
                eyebrow="O que você vai ver na aula"
                title="Conteúdo direto ao ponto, sem enrolação"
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {learnItems.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                      <Icon className="h-5 w-5 text-[var(--brand-petrol)]" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--brand-graphite)]">{title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-xl bg-[var(--muted)]/60 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
                  Essa aula é para você se...
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {forWho.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--brand-graphite)]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <LeadCaptureForm
              id="captura"
              source="aula_gratis"
              title="Quero acesso à aula gratuita"
              description="Preencha para liberar o vídeo completo e receber o material de apoio por e-mail."
              submitLabel="Quero assistir agora"
            />
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-16 sm:py-20">
          <div className="container-app flex flex-col items-center gap-4 text-center">
            <ShieldCheck className="h-6 w-6 text-[var(--brand-petrol)]" />
            <p className="max-w-xl text-balance text-sm text-[var(--muted-foreground)]">
              A aula é 100% gratuita e não exige cartão de crédito. Ao final,
              você conhece o Método BalcãoIA 7D — sem qualquer promessa de
              faturamento ou renda garantida.
            </p>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="container-app border-t border-[var(--border)] pt-6">
            <DisclaimerBrands className="text-[var(--muted-foreground)]" />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
