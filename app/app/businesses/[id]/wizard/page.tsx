"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { WizardProgress, WIZARD_STEP_LABELS, WIZARD_TOTAL_STEPS } from "@/components/app/WizardProgress";
import { getBusiness, upsertBusiness } from "@/lib/local-store";
import {
  EXAMPLE_BEAUTY_SALON,
  NICHE_OPTIONS,
  emptyWizardData,
  type WizardData,
} from "@/types/business";
import type { AttendanceGoal, ToneOfVoice } from "@/types/database";
import { wizardStep1Schema } from "@/lib/validations/wizard";

const TONE_CARDS: { value: ToneOfVoice; label: string; description: string }[] = [
  { value: "professional", label: "Profissional", description: "Formal, direto, transmite autoridade." },
  { value: "friendly", label: "Amigável", description: "Acolhedor e próximo, com leveza." },
  { value: "premium", label: "Premium", description: "Sofisticado, indicado para tickets altos." },
  { value: "direct", label: "Direto", description: "Objetivo, sem enrolação, foco em resolver." },
  { value: "consultive", label: "Consultivo", description: "Explica, orienta e ajuda a decidir." },
];

const GOAL_CARDS: { value: AttendanceGoal; label: string; description: string }[] = [
  { value: "quote", label: "Gerar orçamento", description: "O foco é levantar interesse e enviar valores." },
  { value: "scheduling", label: "Agendar horário", description: "O foco é marcar visita, consulta ou serviço." },
  { value: "sale", label: "Fechar venda", description: "O foco é converter diretamente pelo chat." },
  { value: "support", label: "Dar suporte", description: "O foco é resolver dúvidas e problemas." },
  { value: "visit", label: "Levar até a loja", description: "O foco é atrair o cliente até o local físico." },
];

function cloneExample(): WizardData {
  return JSON.parse(JSON.stringify(EXAMPLE_BEAUTY_SALON)) as WizardData;
}

function StringArrayField({
  label,
  items,
  onChange,
  placeholder,
  minItems = 0,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  minItems?: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 space-y-2">
        {items.map((val, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={val}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[idx] = e.target.value;
                onChange(next);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              disabled={items.length <= minItems}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </div>
  );
}

function ArrayEditor<T>({
  items,
  onChange,
  renderItem,
  emptyItem,
  addLabel,
  minItems = 0,
  itemLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, onUpdate: (item: T) => void) => React.ReactNode;
  emptyItem: () => T;
  addLabel: string;
  minItems?: number;
  itemLabel: (item: T, index: number) => string;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="relative rounded-lg border border-[var(--border)] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
              {itemLabel(item, idx)}
            </p>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              disabled={items.length <= minItems}
              className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Remover item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {renderItem(item, (updated) => {
            const next = [...items];
            next[idx] = updated;
            onChange(next);
          })}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, emptyItem()])}
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}

export default function WizardPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const businessId = params.id;

  const [businessName, setBusinessName] = React.useState<string | null | undefined>(undefined);
  const [data, setData] = React.useState<WizardData>(emptyWizardData());
  const [step, setStep] = React.useState(1);
  const [maxStep, setMaxStep] = React.useState(1);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [wizardCompleted, setWizardCompleted] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const loadedRef = React.useRef(false);

  React.useEffect(() => {
    const b = getBusiness(businessId);
    if (!b) {
      setBusinessName(null);
      return;
    }
    setBusinessName(b.name);
    setData(b.wizardData ?? emptyWizardData());
    const startStep = Math.min(Math.max(b.wizard_step || 1, 1), WIZARD_TOTAL_STEPS);
    setStep(b.wizard_completed ? WIZARD_TOTAL_STEPS : startStep);
    setMaxStep(b.wizard_completed ? WIZARD_TOTAL_STEPS : startStep);
    setWizardCompleted(b.wizard_completed);
    loadedRef.current = true;
  }, [businessId]);

  React.useEffect(() => {
    if (!loadedRef.current) return;
    const current = getBusiness(businessId);
    if (!current) return;
    setSaving(true);
    upsertBusiness({
      ...current,
      name: data.basicInfo.name || current.name,
      segment: data.basicInfo.segment || current.segment,
      city: data.basicInfo.city || current.city,
      description: data.basicInfo.description || current.description,
      wizardData: { ...data, step },
      wizard_step: Math.max(current.wizard_step, step),
    });
    const t = window.setTimeout(() => setSaving(false), 500);
    return () => window.clearTimeout(t);
  }, [data, step, businessId]);

  function update<K extends keyof WizardData>(key: K, value: WizardData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep1(): boolean {
    const result = wizardStep1Schema.safeParse(data.basicInfo);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return;
    const next = Math.min(step + 1, WIZARD_TOTAL_STEPS);
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleGoToStep(target: number) {
    if (target > maxStep) return;
    setStep(target);
  }

  function handleFillExample() {
    setData(cloneExample());
    setStep(1);
    setMaxStep(WIZARD_TOTAL_STEPS);
    setErrors({});
  }

  function handleComplete() {
    const current = getBusiness(businessId);
    if (!current) return;
    upsertBusiness({
      ...current,
      name: data.basicInfo.name || current.name,
      segment: data.basicInfo.segment || current.segment,
      city: data.basicInfo.city || current.city,
      description: data.basicInfo.description || current.description,
      wizardData: { ...data, step: WIZARD_TOTAL_STEPS },
      wizard_step: WIZARD_TOTAL_STEPS,
      wizard_completed: true,
    });
    setWizardCompleted(true);
    router.push(`/app/businesses/${businessId}/scripts`);
  }

  if (businessName === undefined) {
    return <LoadingState message="Carregando wizard…" />;
  }

  if (businessName === null) {
    return (
      <ErrorState
        title="Negócio não encontrado"
        onRetry={() => router.push("/app/dashboard")}
        retryLabel="Voltar ao dashboard"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            Wizard — {data.basicInfo.name || businessName}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {saving ? "Salvando…" : "Alterações salvas automaticamente neste navegador."}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleFillExample}>
          <Wand2 className="h-4 w-4" />
          Preencher com exemplo (Salão de Beleza)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <WizardProgress
            currentStep={step}
            completed={wizardCompleted}
            maxReachedStep={maxStep}
            onStepClick={handleGoToStep}
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-4 text-lg">{WIZARD_STEP_LABELS[step - 1]}</CardTitle>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do negócio *</Label>
                <Input
                  id="name"
                  className="mt-1.5"
                  value={data.basicInfo.name}
                  onChange={(e) =>
                    update("basicInfo", { ...data.basicInfo, name: e.target.value })
                  }
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="segment">Segmento *</Label>
                  <Select
                    id="segment"
                    className="mt-1.5"
                    value={data.basicInfo.segment}
                    onChange={(e) =>
                      update("basicInfo", { ...data.basicInfo, segment: e.target.value })
                    }
                    aria-invalid={Boolean(errors.segment)}
                  >
                    <option value="">Selecione…</option>
                    {NICHE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  {errors.segment && <p className="mt-1 text-xs text-red-600">{errors.segment}</p>}
                </div>
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    className="mt-1.5"
                    value={data.basicInfo.city}
                    onChange={(e) =>
                      update("basicInfo", { ...data.basicInfo, city: e.target.value })
                    }
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  className="mt-1.5"
                  value={data.basicInfo.description}
                  onChange={(e) =>
                    update("basicInfo", { ...data.basicInfo, description: e.target.value })
                  }
                  aria-invalid={Boolean(errors.description)}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="profile">Perfil do público-alvo</Label>
                <Textarea
                  id="profile"
                  className="mt-1.5"
                  value={data.targetAudience.profile}
                  onChange={(e) =>
                    update("targetAudience", { ...data.targetAudience, profile: e.target.value })
                  }
                  placeholder="Ex.: Mulheres de 25 a 55 anos, classe B/C..."
                />
              </div>
              <StringArrayField
                label="Principais dores/dificuldades"
                items={data.targetAudience.painPoints}
                onChange={(v) => update("targetAudience", { ...data.targetAudience, painPoints: v })}
                placeholder="Ex.: Dificuldade de agendar horário"
              />
              <div>
                <Label htmlFor="ticket">Ticket médio</Label>
                <Input
                  id="ticket"
                  className="mt-1.5"
                  value={data.targetAudience.averageTicket}
                  onChange={(e) =>
                    update("targetAudience", { ...data.targetAudience, averageTicket: e.target.value })
                  }
                  placeholder="Ex.: R$ 150 a R$ 350"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <ArrayEditor
              items={data.productsServices}
              onChange={(v) => update("productsServices", v)}
              emptyItem={() => ({
                name: "",
                description: "",
                priceRange: "",
                benefits: [],
                requirements: "",
                deliveryTime: "",
              })}
              addLabel="Adicionar produto/serviço"
              minItems={0}
              itemLabel={(item, idx) => item.name || `Item ${idx + 1}`}
              renderItem={(item, onUpdate) => (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        className="mt-1.5"
                        value={item.name}
                        onChange={(e) => onUpdate({ ...item, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Faixa de preço</Label>
                      <Input
                        className="mt-1.5"
                        value={item.priceRange}
                        onChange={(e) => onUpdate({ ...item, priceRange: e.target.value })}
                        placeholder="Ex.: R$ 100 a R$ 200 ou [PREENCHER]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      className="mt-1.5"
                      value={item.description}
                      onChange={(e) => onUpdate({ ...item, description: e.target.value })}
                    />
                  </div>
                  <StringArrayField
                    label="Benefícios"
                    items={item.benefits}
                    onChange={(v) => onUpdate({ ...item, benefits: v })}
                    placeholder="Ex.: Resultado rápido"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Requisitos</Label>
                      <Input
                        className="mt-1.5"
                        value={item.requirements}
                        onChange={(e) => onUpdate({ ...item, requirements: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Prazo/duração</Label>
                      <Input
                        className="mt-1.5"
                        value={item.deliveryTime}
                        onChange={(e) => onUpdate({ ...item, deliveryTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          )}

          {step === 4 && (
            <ArrayEditor
              items={data.faqs}
              onChange={(v) => update("faqs", v)}
              emptyItem={() => ({ question: "", answer: "", category: "Geral" })}
              addLabel="Adicionar pergunta"
              itemLabel={(item, idx) => item.question || `Pergunta ${idx + 1}`}
              renderItem={(item, onUpdate) => (
                <div className="space-y-3">
                  <div>
                    <Label>Pergunta</Label>
                    <Input
                      className="mt-1.5"
                      value={item.question}
                      onChange={(e) => onUpdate({ ...item, question: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Resposta</Label>
                    <Textarea
                      className="mt-1.5"
                      value={item.answer}
                      onChange={(e) => onUpdate({ ...item, answer: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Input
                      className="mt-1.5"
                      value={item.category}
                      onChange={(e) => onUpdate({ ...item, category: e.target.value })}
                      placeholder="Ex.: Agendamento, Pagamento…"
                    />
                  </div>
                </div>
              )}
            />
          )}

          {step === 5 && (
            <ArrayEditor
              items={data.objections}
              onChange={(v) => update("objections", v)}
              emptyItem={() => ({ objection: "", answer: "", category: "Geral" })}
              addLabel="Adicionar objeção"
              itemLabel={(item, idx) => item.objection || `Objeção ${idx + 1}`}
              renderItem={(item, onUpdate) => (
                <div className="space-y-3">
                  <div>
                    <Label>Objeção do cliente</Label>
                    <Input
                      className="mt-1.5"
                      value={item.objection}
                      onChange={(e) => onUpdate({ ...item, objection: e.target.value })}
                      placeholder="Ex.: Está muito caro"
                    />
                  </div>
                  <div>
                    <Label>Resposta recomendada</Label>
                    <Textarea
                      className="mt-1.5"
                      value={item.answer}
                      onChange={(e) => onUpdate({ ...item, answer: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Input
                      className="mt-1.5"
                      value={item.category}
                      onChange={(e) => onUpdate({ ...item, category: e.target.value })}
                    />
                  </div>
                </div>
              )}
            />
          )}

          {step === 6 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Horário de funcionamento</Label>
                <Textarea
                  className="mt-1.5"
                  value={data.policies.openingHours}
                  onChange={(e) => update("policies", { ...data.policies, openingHours: e.target.value })}
                />
              </div>
              <div>
                <Label>Formas de pagamento</Label>
                <Textarea
                  className="mt-1.5"
                  value={data.policies.paymentMethods}
                  onChange={(e) =>
                    update("policies", { ...data.policies, paymentMethods: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Política de cancelamento</Label>
                <Textarea
                  className="mt-1.5"
                  value={data.policies.cancellationPolicy}
                  onChange={(e) =>
                    update("policies", { ...data.policies, cancellationPolicy: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Política de entrega</Label>
                <Textarea
                  className="mt-1.5"
                  value={data.policies.deliveryPolicy}
                  onChange={(e) =>
                    update("policies", { ...data.policies, deliveryPolicy: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Garantia</Label>
                <Textarea
                  className="mt-1.5"
                  value={data.policies.warranty}
                  onChange={(e) => update("policies", { ...data.policies, warranty: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {TONE_CARDS.map((tone) => {
                const active = data.toneOfVoice === tone.value;
                return (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => update("toneOfVoice", tone.value)}
                    className={`relative rounded-xl border p-4 text-left transition-colors ${
                      active
                        ? "border-[var(--brand-petrol)] bg-[var(--brand-petrol)]/5"
                        : "border-[var(--border)] bg-white hover:border-[var(--brand-petrol)]/40"
                    }`}
                  >
                    {active && (
                      <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-[var(--brand-petrol)]" />
                    )}
                    <p className="font-semibold text-[var(--brand-graphite)]">{tone.label}</p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">{tone.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 8 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {GOAL_CARDS.map((goal) => {
                const active = data.attendanceGoal === goal.value;
                return (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => update("attendanceGoal", goal.value)}
                    className={`relative rounded-xl border p-4 text-left transition-colors ${
                      active
                        ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10"
                        : "border-[var(--border)] bg-white hover:border-[var(--brand-amber)]/50"
                    }`}
                  >
                    {active && (
                      <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-[var(--brand-amber-dark)]" />
                    )}
                    <p className="font-semibold text-[var(--brand-graphite)]">{goal.label}</p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">{goal.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 9 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="handoffRules">Quando encaminhar para um humano</Label>
                <Textarea
                  id="handoffRules"
                  className="mt-1.5"
                  value={data.humanHandoffRules}
                  onChange={(e) => update("humanHandoffRules", e.target.value)}
                  placeholder="Ex.: reclamações, pedidos de orçamento fora do padrão, dúvidas técnicas específicas…"
                />
              </div>
              <div>
                <Label htmlFor="handoffContact">Contato humano responsável</Label>
                <Input
                  id="handoffContact"
                  className="mt-1.5"
                  value={data.humanHandoffContact}
                  onChange={(e) => update("humanHandoffContact", e.target.value)}
                  placeholder="Ex.: Recepção — (11) 99999-9999"
                />
              </div>
              <div className="rounded-lg border border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5 p-4 text-sm text-[var(--brand-petrol)]">
                Ao concluir, vamos te levar direto para gerar os scripts e prompts do seu negócio
                com IA.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={handleBack} disabled={step === 1}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        {step < WIZARD_TOTAL_STEPS ? (
          <Button type="button" onClick={handleNext}>
            Avançar
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" variant="amber" onClick={handleComplete}>
            <Check className="h-4 w-4" />
            Concluir e ir para scripts
          </Button>
        )}
      </div>
    </div>
  );
}
