"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Info, MessageCircleQuestion, PackageSearch, ShieldAlert, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { SimulatorChat } from "@/components/app/SimulatorChat";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

const GOAL_LABELS: Record<string, string> = {
  quote: "Gerar orçamento",
  scheduling: "Agendar horário",
  sale: "Fechar venda",
  support: "Dar suporte",
  visit: "Levar até a loja",
};

const TONE_LABELS: Record<string, string> = {
  professional: "Profissional",
  friendly: "Amigável",
  premium: "Premium",
  direct: "Direto",
  consultive: "Consultivo",
};

export default function SimulatorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);

  React.useEffect(() => {
    setBusiness(getBusiness(params.id) ?? null);
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando simulador…" />;
  }

  if (business === null) {
    return (
      <ErrorState
        title="Negócio não encontrado"
        onRetry={() => router.push("/app/dashboard")}
        retryLabel="Voltar ao dashboard"
      />
    );
  }

  const wizardData = business.wizardData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Simulador — {business.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Converse com o agente treinado com os dados do seu negócio antes de usar de verdade.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="h-[65vh] min-h-[420px]">
          <SimulatorChat businessId={business.id} businessName={business.name} wizardData={wizardData} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-[var(--brand-petrol)]" />
                Contexto do agente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-[var(--muted-foreground)]">Objetivo: </span>
                <Badge variant="petrol">
                  {GOAL_LABELS[wizardData.attendanceGoal] ?? wizardData.attendanceGoal}
                </Badge>
              </p>
              <p>
                <span className="text-[var(--muted-foreground)]">Tom de voz: </span>
                <Badge variant="amber">{TONE_LABELS[wizardData.toneOfVoice] ?? wizardData.toneOfVoice}</Badge>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <PackageSearch className="h-4 w-4 text-[var(--brand-petrol)]" />
                Produtos/serviços cadastrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wizardData.productsServices.length ? (
                <ul className="space-y-1.5 text-sm text-[var(--muted-foreground)]">
                  {wizardData.productsServices.slice(0, 5).map((p, idx) => (
                    <li key={idx}>• {p.name || "Sem nome"}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted-foreground)]">Nenhum cadastrado ainda.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageCircleQuestion className="h-4 w-4 text-[var(--brand-petrol)]" />
                Perguntas frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wizardData.faqs.length ? (
                <ul className="space-y-1.5 text-sm text-[var(--muted-foreground)]">
                  {wizardData.faqs.slice(0, 5).map((f, idx) => (
                    <li key={idx}>• {f.question}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted-foreground)]">Nenhuma cadastrada ainda.</p>
              )}
            </CardContent>
          </Card>

          <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-white p-3 text-xs text-[var(--muted-foreground)]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
            <p>
              Alertas de compliance aparecem abaixo das respostas do agente quando detectamos
              temas sensíveis (dados pessoais, promessas de resultado, diagnóstico, etc).
            </p>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Nunca use este simulador para dar diagnósticos reais ou prometer resultados garantidos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
