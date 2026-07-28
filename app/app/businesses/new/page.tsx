"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NICHE_OPTIONS, emptyWizardData } from "@/types/business";
import type { ToneOfVoice } from "@/types/database";
import {
  ensureNicheTemplatesSeeded,
  getNicheTemplates,
  upsertBusiness,
  type LocalBusiness,
} from "@/lib/local-store";
import { DEFAULT_NICHE_TEMPLATES } from "@/lib/data/niche-templates";

function NewBusinessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [name, setName] = React.useState("");
  const [segment, setSegment] = React.useState("");
  const [city, setCity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!templateId) return;
    const templates = ensureNicheTemplatesSeeded(DEFAULT_NICHE_TEMPLATES) ?? getNicheTemplates();
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSegment(template.niche);
      setDescription(template.description);
    }
  }, [templateId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Informe o nome do negócio (mínimo 2 caracteres).");
      return;
    }
    setError(null);
    setSubmitting(true);

    const wizardData = emptyWizardData();
    wizardData.basicInfo = { name: name.trim(), segment, city, description };

    if (templateId) {
      const templates = getNicheTemplates();
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        wizardData.toneOfVoice = template.suggestedTone as ToneOfVoice;
        wizardData.faqs = template.suggestedFaqs
          .filter(Boolean)
          .map((q) => ({ question: q, answer: "[PREENCHER]", category: "Geral" }));
        wizardData.objections = template.suggestedObjections
          .filter(Boolean)
          .map((o) => ({ objection: o, answer: "[PREENCHER]", category: "Geral" }));
      }
    }

    const business: LocalBusiness = {
      id: crypto.randomUUID(),
      name: name.trim(),
      segment,
      city,
      description,
      wizard_completed: false,
      wizard_step: 1,
      wizardData,
      assets: {},
      created_at: new Date().toISOString(),
    };

    upsertBusiness(business);
    router.push(`/app/businesses/${business.id}/wizard`);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">Criar novo negócio</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Comece com o essencial. Você vai detalhar tudo no wizard guiado logo em seguida.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações iniciais</CardTitle>
          <CardDescription>
            {templateId
              ? "Pré-preenchemos alguns campos com base no template de nicho selecionado."
              : "Você pode ajustar tudo depois — nada aqui é definitivo."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do negócio *</Label>
              <Input
                id="name"
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Salão Bella Arte"
                aria-invalid={Boolean(error)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="segment">Segmento</Label>
                <Select
                  id="segment"
                  className="mt-1.5"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                >
                  <option value="">Selecione…</option>
                  {NICHE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  className="mt-1.5"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex.: São Paulo - SP"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descrição breve</Label>
              <Textarea
                id="description"
                className="mt-1.5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="O que o negócio faz, para quem, e o que o diferencia?"
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" className="w-full" loading={submitting}>
              Continuar para o wizard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewBusinessPage() {
  return (
    <React.Suspense fallback={null}>
      <NewBusinessForm />
    </React.Suspense>
  );
}
