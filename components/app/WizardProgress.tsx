"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const WIZARD_STEP_LABELS = [
  "Informações básicas",
  "Público-alvo",
  "Produtos/Serviços",
  "Perguntas frequentes",
  "Objeções",
  "Políticas",
  "Tom de voz",
  "Meta de atendimento",
  "Handoff humano",
] as const;

export const WIZARD_TOTAL_STEPS = WIZARD_STEP_LABELS.length;

export interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
  completed?: boolean;
  onStepClick?: (step: number) => void;
  maxReachedStep?: number;
  className?: string;
}

export function WizardProgress({
  currentStep,
  totalSteps = WIZARD_TOTAL_STEPS,
  completed = false,
  onStepClick,
  maxReachedStep,
  className,
}: WizardProgressProps) {
  const percent = completed ? 100 : Math.round((currentStep / totalSteps) * 100);
  const reachable = maxReachedStep ?? currentStep;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-[var(--brand-graphite)]">
          {completed ? "Wizard concluído" : `Etapa ${currentStep} de ${totalSteps}`}
        </span>
        <span className="text-[var(--muted-foreground)]">{percent}%</span>
      </div>
      <Progress value={percent} className="mb-4" />
      <ol className="hidden flex-wrap gap-2 md:flex">
        {WIZARD_STEP_LABELS.slice(0, totalSteps).map((label, idx) => {
          const step = idx + 1;
          const isActive = step === currentStep;
          const isDone = completed || step < currentStep;
          const isClickable = Boolean(onStepClick) && step <= reachable;
          return (
            <li key={label}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick?.(step)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-[var(--brand-petrol)] bg-[var(--brand-petrol)] text-white"
                    : isDone
                      ? "border-[var(--brand-amber)]/50 bg-[var(--brand-amber)]/10 text-[var(--brand-amber-dark)]"
                      : "border-[var(--border)] bg-white text-[var(--muted-foreground)]",
                  isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
                )}
              >
                {isDone && !isActive ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[10px]">
                    {step}
                  </span>
                )}
                {label}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
