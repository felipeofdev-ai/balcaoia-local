"use client";

import * as React from "react";
import { LayoutTemplate, Plus, ShieldAlert, ShieldCheck, SquarePen, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminTemplateEditor } from "@/components/app/AdminTemplateEditor";
import {
  deleteNicheTemplate,
  ensureNicheTemplatesSeeded,
  isAdminDemo,
  setAdminDemo,
  upsertNicheTemplate,
  type LocalNicheTemplate,
} from "@/lib/local-store";
import { DEFAULT_NICHE_TEMPLATES } from "@/lib/data/niche-templates";

export default function AdminTemplatesPage() {
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const [templates, setTemplates] = React.useState<LocalNicheTemplate[]>([]);
  const [editing, setEditing] = React.useState<LocalNicheTemplate | null>(null);
  const [creating, setCreating] = React.useState(false);

  React.useEffect(() => {
    setAdmin(isAdminDemo());
    setTemplates(ensureNicheTemplatesSeeded(DEFAULT_NICHE_TEMPLATES));
  }, []);

  function handleSave(template: LocalNicheTemplate) {
    upsertNicheTemplate(template);
    setTemplates(ensureNicheTemplatesSeeded(DEFAULT_NICHE_TEMPLATES));
    setEditing(null);
    setCreating(false);
  }

  function handleDelete(id: string) {
    if (!window.confirm("Remover este template de nicho?")) return;
    deleteNicheTemplate(id);
    setTemplates(ensureNicheTemplatesSeeded(DEFAULT_NICHE_TEMPLATES));
  }

  function handleEnableAdmin() {
    setAdminDemo(true);
    setAdmin(true);
  }

  if (admin === null) return null;

  if (!admin) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <ShieldAlert className="h-10 w-10 text-amber-500" />
          <CardTitle className="text-base">Área restrita a administradores</CardTitle>
          <CardDescription>
            Esta é uma área administrativa. Em ambiente de demonstração, você pode ativar o modo
            admin para explorar a funcionalidade.
          </CardDescription>
          <Button onClick={handleEnableAdmin}>
            <ShieldCheck className="h-4 w-4" />
            Ativar modo admin (demo)
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (editing || creating) {
    return (
      <div className="max-w-2xl">
        <AdminTemplateEditor
          initial={editing ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            Templates de nicho
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Gerencie os templates usados na página pública de Templates e na criação de negócios.
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" />
          Novo template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                  <LayoutTemplate className="h-4.5 w-4.5 text-[var(--brand-petrol)]" />
                </div>
                <CardTitle className="text-base">{template.niche}</CardTitle>
              </div>
              <Badge variant="secondary">{template.suggestedTone}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--muted-foreground)]">{template.description}</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {template.suggestedFaqs.length} FAQs · {template.suggestedObjections.length}{" "}
                objeções · {template.complianceAlerts.length} alertas
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(template)}>
                  <SquarePen className="h-4 w-4" />
                  Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(template.id)}>
                  <Trash2 className="h-4 w-4" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
