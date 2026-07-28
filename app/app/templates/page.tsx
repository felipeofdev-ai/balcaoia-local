"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, LayoutTemplate, MessageCircleQuestion, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ensureNicheTemplatesSeeded, type LocalNicheTemplate } from "@/lib/local-store";
import { DEFAULT_NICHE_TEMPLATES } from "@/lib/data/niche-templates";

const TONE_LABELS: Record<string, string> = {
  professional: "Profissional",
  friendly: "Amigável",
  premium: "Premium",
  direct: "Direto",
  consultive: "Consultivo",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = React.useState<LocalNicheTemplate[]>([]);

  React.useEffect(() => {
    setTemplates(ensureNicheTemplatesSeeded(DEFAULT_NICHE_TEMPLATES));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Templates por nicho
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted-foreground)]">
          Pontos de partida prontos para 10 tipos de negócio local, com sugestões de tom de voz,
          FAQs, objeções e alertas de compliance específicos do segmento.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                  <LayoutTemplate className="h-4.5 w-4.5 text-[var(--brand-petrol)]" />
                </div>
                <CardTitle className="text-base">{template.niche}</CardTitle>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <Badge variant="amber" className="w-fit">
                Tom sugerido: {TONE_LABELS[template.suggestedTone] ?? template.suggestedTone}
              </Badge>

              {template.suggestedFaqs.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[var(--muted-foreground)]">
                    <MessageCircleQuestion className="h-3.5 w-3.5" /> FAQs sugeridas
                  </p>
                  <ul className="space-y-1 text-xs text-[var(--brand-graphite)]">
                    {template.suggestedFaqs.slice(0, 3).map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {template.complianceAlerts.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-700">
                    <ShieldAlert className="h-3.5 w-3.5" /> Alertas de compliance
                  </p>
                  <ul className="space-y-1 text-xs text-red-700/90">
                    {template.complianceAlerts.map((alert) => (
                      <li key={alert} className="flex items-start gap-1">
                        <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href={`/app/businesses/new?template=${template.id}`} className="mt-auto pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Criar negócio com este modelo
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
