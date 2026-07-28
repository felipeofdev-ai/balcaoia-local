"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  ListChecks,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import { getDiagnostic } from "@/lib/local-store";
import {
  buildActionPlan,
  getBottlenecks,
  getScoreBand,
  type DiagnosticAnswers,
} from "@/lib/config/diagnostic";
import { cn } from "@/lib/utils";

interface StoredDiagnostic {
  answers: DiagnosticAnswers;
  score: number;
  createdAt?: string;
}

const BAND_COLOR: Record<string, string> = {
  confuso: "#dc2626",
  parcial: "#f59e0b",
  organizado: "#0f4c75",
  avancado: "#0f3d4a",
};

export default function ResultadoDiagnosticoPage() {
  const [diagnostic, setDiagnostic] = React.useState<StoredDiagnostic | null | undefined>(
    undefined
  );

  React.useEffect(() => {
    const raw = getDiagnostic();
    setDiagnostic(raw as StoredDiagnostic | null);
  }, []);

  if (diagnostic === undefined) {
    return (
      <div className="flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex flex-1 items-center justify-center py-24 text-sm text-[var(--muted-foreground)]">
          Carregando seu resultado...
        </main>
        <MarketingFooter />
      </div>
    );
  }

  if (!diagnostic) {
    return (
      <div className="flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex flex-1 items-center justify-center py-24">
          <div className="container-app flex max-w-lg flex-col items-center gap-5 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-amber)]/15">
              <AlertTriangle className="h-7 w-7 text-[var(--brand-amber-dark)]" />
            </span>
            <h1 className="text-2xl font-extrabold text-[var(--brand-graphite)]">
              Ainda não encontramos seu diagnóstico
            </h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Parece que você ainda não respondeu o diagnóstico neste
              navegador, ou os dados foram apagados. Leva só 2 minutos para
              refazer.
            </p>
            <Link href="/diagnostico">
              <Button variant="amber" size="lg">
                Fazer o diagnóstico agora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  const { answers, score } = diagnostic;
  const band = getScoreBand(score);
  const bottlenecks = getBottlenecks(answers, 3);
  const plan = buildActionPlan(bottlenecks);
  const color = BAND_COLOR[band.id] ?? "var(--brand-petrol)";

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <section className="gradient-petrol py-16 text-white sm:py-20">
          <div className="container-app flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25">
              <BrandLogo size="xl" variant="light" />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
              <ListChecks className="h-3.5 w-3.5" />
              Resultado do seu diagnóstico
            </span>

            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full sm:h-52 sm:w-52"
              style={{
                background: `conic-gradient(${color} ${score * 3.6}deg, rgba(255,255,255,0.12) 0deg)`,
              }}
            >
              <div className="flex h-[85%] w-[85%] flex-col items-center justify-center rounded-full bg-[var(--brand-petrol)]">
                <span className="text-4xl font-extrabold sm:text-5xl">{score}</span>
                <span className="text-xs text-white/60">de 100 pontos</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-balance text-2xl font-extrabold sm:text-3xl">
                {band.label}
              </h1>
              <p className="max-w-xl text-balance text-sm text-white/75 sm:text-base">
                {band.description}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-app flex flex-col gap-12">
            <SectionTitle
              eyebrow="Onde focar primeiro"
              title="Seus 3 principais gargalos hoje"
              description="Priorize esses pontos — são onde seu atendimento mais perde vendas agora."
            />

            <div className="grid gap-6 sm:grid-cols-3">
              {bottlenecks.map((b, i) => (
                <div
                  key={b.id}
                  className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                    {b.category}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{b.question}</p>
                  <p className="mt-1 text-xs font-medium text-[var(--brand-petrol)]">
                    Sugestão: {b.lowScoreTip}
                  </p>
                </div>
              ))}
              {bottlenecks.length === 0 && (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Parabéns — não identificamos gargalos claros nas suas
                  respostas.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-16 sm:py-20">
          <div className="container-app flex flex-col gap-12">
            <SectionTitle
              eyebrow="Plano de ação"
              title="Seu plano de 7 dias para organizar o atendimento"
              description="Um passo por dia. Sem depender de programação nem de automações arriscadas."
            />

            <ol className="mx-auto flex w-full max-w-2xl flex-col gap-4">
              {plan.map((item) => (
                <li
                  key={item.day}
                  className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-petrol)]/10 text-sm font-bold text-[var(--brand-petrol)]">
                    D{item.day}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-xl border border-dashed border-[var(--brand-petrol-light)]/40 p-6 text-center">
              <CalendarCheck className="h-6 w-6 text-[var(--brand-petrol)]" />
              <p className="text-sm text-[var(--muted-foreground)]">
                Quer esse plano pronto, com roteiros e materiais já escritos
                para o seu negócio? Conheça o Método BalcãoIA 7D.
              </p>
              <Link href="/vendas#oferta">
                <Button variant="amber">
                  Conhecer o Método BalcãoIA 7D
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-app flex flex-col gap-10">
            <SectionTitle
              eyebrow="Próximos passos"
              title="Escolha por onde seguir"
            />
            <div className="grid gap-6 sm:grid-cols-3">
              <NextStepCard
                icon={<ListChecks className="h-5 w-5" />}
                title="Checklist gratuito"
                description="37 perguntas para aprofundar o diagnóstico etapa por etapa."
                href="/checklist"
                cta="Ver checklist"
              />
              <NextStepCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Método completo"
                description="Conheça o curso e o Studio BalcãoIA para organizar tudo em 7 dias."
                href="/vendas"
                cta="Ver método"
              />
              <NextStepCard
                icon={<RefreshCcw className="h-5 w-5" />}
                title="Refazer diagnóstico"
                description="Sua situação mudou? Refaça o diagnóstico quando quiser."
                href="/diagnostico"
                cta="Refazer"
              />
            </div>
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-16 sm:py-20">
          <div className="container-app flex flex-col gap-12">
            <SectionTitle
              eyebrow="Quer receber por e-mail?"
              title="Envie seu resultado e um plano detalhado para seu e-mail"
              description="Opcional — só preencha se quiser guardar esse diagnóstico e receber materiais gratuitos."
            />
            <LeadCaptureForm
              id="captura"
              source="resultado_diagnostico"
              title={`Enviar meu resultado (${band.label})`}
              description="Sem spam. Você pode cancelar quando quiser."
              submitLabel="Quero receber por e-mail"
            />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

function NextStepCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-6">
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10 text-[var(--brand-petrol)]"
        )}
      >
        {icon}
      </span>
      <h3 className="text-sm font-bold text-[var(--brand-graphite)]">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      <Link
        href={href}
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-petrol)] underline underline-offset-2"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
