"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { leadSchema, type LeadFormData } from "@/lib/validations/lead";
import { saveLead } from "@/lib/local-store";
import { NICHE_OPTIONS } from "@/types/business";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROFILE_OPTIONS: { value: LeadFormData["profileType"]; label: string }[] = [
  { value: "business_owner", label: "Dono(a) de negócio" },
  { value: "freelancer", label: "Freelancer / autônomo(a)" },
  { value: "marketer", label: "Marketing / agência" },
  { value: "curious", label: "Só curioso(a), quero entender" },
];

export interface LeadCaptureFormProps {
  id?: string;
  source?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
}

export function LeadCaptureForm({
  id,
  source = "landing_page",
  title = "Quero receber meu diagnóstico gratuito",
  description = "Leva menos de 1 minuto. Sem spam, sem automação chata — só as respostas que você precisa.",
  submitLabel = "Quero meu diagnóstico grátis",
  className,
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      segment: "",
      profileType: "business_owner",
      consent: undefined,
      source,
    },
  });

  const profileType = watch("profileType");

  async function onSubmit(data: LeadFormData) {
    setSubmitError(null);

    let apiOk = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      apiOk = res.ok;
    } catch {
      apiOk = false;
    }

    try {
      saveLead({
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `lead_${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        segment: data.segment || undefined,
        profileType: data.profileType,
        consent: Boolean(data.consent),
        source: data.source ?? source,
        created_at: new Date().toISOString(),
      });
    } catch {
      /* localStorage indisponível — segue apenas com o resultado da API */
    }

    if (!apiOk) {
      setSubmitError(
        "Não foi possível confirmar com nosso servidor agora, mas seus dados já foram salvos localmente. Você já pode seguir em frente."
      );
    }

    router.push(`/obrigado?nome=${encodeURIComponent(data.name)}`);
  }

  return (
    <div id={id} className={cn("scroll-mt-24", className)}>
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg shadow-black/5 sm:p-8">
        <div className="mb-6 flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--brand-petrol)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-petrol)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% gratuito e sem compromisso
          </div>
          <h3 className="text-xl font-bold text-[var(--brand-graphite)] sm:text-2xl">
            {title}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <input type="hidden" {...register("source")} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              placeholder="Como podemos te chamar?"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@negocio.com.br"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">WhatsApp (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 91234-5678"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="segment">Segmento do seu negócio</Label>
            <Select id="segment" defaultValue="" {...register("segment")}>
              <option value="" disabled>
                Selecione um segmento
              </option>
              {NICHE_OPTIONS.map((niche) => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
              <option value="Outro">Outro</option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Qual dessas opções melhor descreve você?</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROFILE_OPTIONS.map((option) => {
                const isActive = profileType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setValue("profileType", option.value, { shouldValidate: true })
                    }
                    aria-pressed={isActive}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "border-[var(--brand-petrol)] bg-[var(--brand-petrol)]/5 text-[var(--brand-petrol)]"
                        : "border-[var(--border)] text-[var(--brand-graphite)] hover:border-[var(--brand-petrol-light)]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                        isActive
                          ? "border-[var(--brand-petrol)]"
                          : "border-[var(--border)]"
                      )}
                    >
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[var(--brand-petrol)]" />
                      )}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
            {errors.profileType && (
              <p className="text-xs text-red-600">{errors.profileType.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-[var(--muted)] p-3.5">
            <Checkbox
              id="consent"
              aria-invalid={Boolean(errors.consent)}
              {...register("consent")}
            />
            <Label htmlFor="consent" className="text-xs font-normal leading-relaxed text-[var(--muted-foreground)]">
              Autorizo o contato por e-mail e/ou WhatsApp com informações sobre o
              BalcãoIA, conforme a{" "}
              <a href="/politica-de-privacidade" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
                Política de Privacidade
              </a>
              . Posso cancelar quando quiser, sem burocracia.
            </Label>
          </div>
          {errors.consent && (
            <p className="-mt-3 text-xs text-red-600">{errors.consent.message}</p>
          )}

          <Button type="submit" variant="amber" size="lg" loading={isSubmitting} className="w-full">
            {!isSubmitting && <CheckCircle2 className="h-5 w-5" />}
            {isSubmitting ? "Enviando..." : submitLabel}
          </Button>

          {submitError && (
            <p className="flex items-center gap-2 text-xs text-amber-700">
              <Loader2 className="h-3.5 w-3.5" />
              {submitError}
            </p>
          )}

          <p className="text-center text-xs text-[var(--muted-foreground)]">
            Seus dados estão seguros. Nunca compartilhamos com terceiros e você
            pode pedir a exclusão a qualquer momento.
          </p>
        </form>
      </div>
    </div>
  );
}
