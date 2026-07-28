"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ListChecks, ShieldCheck } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DIAGNOSTIC_QUESTIONS,
  computeDiagnosticScore,
  type DiagnosticAnswers,
} from "@/lib/config/diagnostic";
import { saveDiagnostic } from "@/lib/local-store";
import { cn } from "@/lib/utils";

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<DiagnosticAnswers>({});
  const [submitting, setSubmitting] = React.useState(false);

  const total = DIAGNOSTIC_QUESTIONS.length;
  const question = DIAGNOSTIC_QUESTIONS[step];
  const isLast = step === total - 1;
  const hasAnswer = typeof answers[question.id] === "number";
  const progressPct = ((step + (hasAnswer ? 1 : 0)) / total) * 100;

  function selectValue(value: 0 | 5 | 10) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!hasAnswer) return;
    if (isLast) {
      finish();
      return;
    }
    setStep((s) => Math.min(total - 1, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function finish() {
    setSubmitting(true);
    const score = computeDiagnosticScore(answers);
    const result = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `diag_${Date.now()}`,
      answers,
      score,
      createdAt: new Date().toISOString(),
    };
    try {
      saveDiagnostic(result);
    } catch {
      /* localStorage indisponível — segue mesmo assim */
    }
    router.push("/resultado-diagnostico");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 bg-[var(--muted)]/50 py-10 sm:py-16">
        <div className="container-app flex max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-3 text-center">
            <div className="mx-auto">
              <BrandLogo size="lg" />
            </div>
            <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-[var(--brand-petrol)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-petrol)]">
              <ListChecks className="h-3.5 w-3.5" />
              Diagnóstico do atendimento
            </span>
            <h1 className="text-balance text-2xl font-extrabold text-[var(--brand-graphite)] sm:text-3xl">
              Responda 10 perguntas e descubra o nível de organização do seu
              atendimento
            </h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Leva cerca de 2 minutos. No final você recebe uma pontuação e um
              plano de ação de 7 dias.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--muted-foreground)]">
              <span>
                Pergunta {step + 1} de {total}
              </span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <Progress value={progressPct} />
          </div>

          <div
            key={question.id}
            className="animate-fade-up rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg shadow-black/5 sm:p-8"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-[var(--brand-amber)]/15 px-2.5 py-1 text-xs font-bold text-[var(--brand-amber-dark)]">
              {question.category}
            </span>
            <h2 className="text-lg font-bold text-[var(--brand-graphite)] sm:text-xl">
              {question.question}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{question.help}</p>

            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option) => {
                const isActive = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectValue(option.value)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors cursor-pointer",
                      isActive
                        ? "border-[var(--brand-petrol)] bg-[var(--brand-petrol)]/5 text-[var(--brand-petrol)]"
                        : "border-[var(--border)] text-[var(--brand-graphite)] hover:border-[var(--brand-petrol-light)]"
                    )}
                  >
                    {option.label}
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        isActive ? "border-[var(--brand-petrol)]" : "border-[var(--border)]"
                      )}
                    >
                      {isActive && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-petrol)]" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={step === 0}
                className={step === 0 ? "invisible" : undefined}
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="button"
                variant="amber"
                onClick={goNext}
                disabled={!hasAnswer}
                loading={isLast && submitting}
              >
                {isLast ? "Ver meu resultado" : "Próxima"}
                {!isLast && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[var(--muted-foreground)]">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            Suas respostas ficam salvas só no seu navegador até você decidir
            compartilhar.
          </p>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
