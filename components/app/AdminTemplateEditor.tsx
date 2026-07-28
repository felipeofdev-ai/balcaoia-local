"use client";

import * as React from "react";
import { Plus, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocalNicheTemplate } from "@/lib/local-store";

const TONE_OPTIONS = [
  { value: "professional", label: "Profissional" },
  { value: "friendly", label: "Amigável" },
  { value: "premium", label: "Premium" },
  { value: "direct", label: "Direto" },
  { value: "consultive", label: "Consultivo" },
];

export interface AdminTemplateEditorProps {
  initial?: LocalNicheTemplate;
  onSave: (template: LocalNicheTemplate) => void;
  onCancel: () => void;
}

function emptyTemplate(): LocalNicheTemplate {
  return {
    id: crypto.randomUUID(),
    niche: "",
    description: "",
    suggestedTone: "friendly",
    suggestedFaqs: [""],
    suggestedObjections: [""],
    complianceAlerts: [""],
    createdAt: new Date().toISOString(),
  };
}

function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={item}
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
              disabled={items.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, ""])}
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </div>
  );
}

export function AdminTemplateEditor({ initial, onSave, onCancel }: AdminTemplateEditorProps) {
  const [template, setTemplate] = React.useState<LocalNicheTemplate>(
    initial ?? emptyTemplate()
  );

  function update<K extends keyof LocalNicheTemplate>(key: K, value: LocalNicheTemplate[K]) {
    setTemplate((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!template.niche.trim()) return;
    onSave({
      ...template,
      suggestedFaqs: template.suggestedFaqs.filter((f) => f.trim()),
      suggestedObjections: template.suggestedObjections.filter((o) => o.trim()),
      complianceAlerts: template.complianceAlerts.filter((c) => c.trim()),
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initial ? "Editar template de nicho" : "Novo template de nicho"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="niche">Nome do nicho</Label>
              <Input
                id="niche"
                className="mt-1.5"
                value={template.niche}
                onChange={(e) => update("niche", e.target.value)}
                placeholder="Ex.: Barbearia"
                required
              />
            </div>
            <div>
              <Label htmlFor="tone">Tom sugerido</Label>
              <Select
                id="tone"
                className="mt-1.5"
                value={template.suggestedTone}
                onChange={(e) => update("suggestedTone", e.target.value)}
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              className="mt-1.5"
              value={template.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Breve contexto sobre esse tipo de negócio"
            />
          </div>

          <StringListEditor
            label="Perguntas frequentes sugeridas"
            items={template.suggestedFaqs}
            onChange={(v) => update("suggestedFaqs", v)}
            placeholder="Ex.: Precisa agendar horário?"
          />

          <StringListEditor
            label="Objeções comuns"
            items={template.suggestedObjections}
            onChange={(v) => update("suggestedObjections", v)}
            placeholder="Ex.: Está muito caro"
          />

          <StringListEditor
            label="Alertas de compliance"
            items={template.complianceAlerts}
            onChange={(v) => update("complianceAlerts", v)}
            placeholder="Ex.: Não prometer resultado garantido"
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            <Trash2 className="h-4 w-4" />
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4" />
            Salvar template
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
