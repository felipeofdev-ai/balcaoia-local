"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

function formatBRL(value: number) {
  if (!Number.isFinite(value)) return "R$ 0";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function extractFirstNumber(text: string): number {
  const match = text.match(/\d+([.,]\d+)?/);
  if (!match) return 0;
  return Number(match[0].replace(".", "").replace(",", "."));
}

export default function RoiPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);

  const [monthlyConversations, setMonthlyConversations] = React.useState(100);
  const [conversionRate, setConversionRate] = React.useState(15);
  const [averageTicket, setAverageTicket] = React.useState(150);
  const [upliftPct, setUpliftPct] = React.useState(10);

  React.useEffect(() => {
    const b = getBusiness(params.id);
    setBusiness(b ?? null);
    if (b?.wizardData?.targetAudience?.averageTicket) {
      const extracted = extractFirstNumber(b.wizardData.targetAudience.averageTicket);
      if (extracted > 0) setAverageTicket(extracted);
    }
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando calculadora…" />;
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

  const cappedUplift = Math.min(Math.max(upliftPct, 0), 30);
  const currentSales = monthlyConversations * (conversionRate / 100);
  const currentRevenue = currentSales * averageTicket;
  const improvedConversionRate = Math.min(conversionRate * (1 + cappedUplift / 100), 100);
  const improvedSales = monthlyConversations * (improvedConversionRate / 100);
  const improvedRevenue = improvedSales * averageTicket;
  const extraRevenue = Math.max(improvedRevenue - currentRevenue, 0);
  const extraSales = Math.max(improvedSales - currentSales, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Calculadora de ROI — {business.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Estimativa conservadora de ganho ao organizar o atendimento. Ajuste os números conforme
          a realidade do seu negócio.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Esta é apenas uma <strong>estimativa educativa e conservadora</strong>, não uma garantia
          de renda, vendas ou resultado. Os números reais dependem de diversos fatores do seu
          negócio.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calculator className="h-4 w-4 text-[var(--brand-petrol)]" />
              Seus números atuais
            </CardTitle>
            <CardDescription>Preencha com base na sua realidade (aproximado é suficiente).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="conversations">Conversas/atendimentos por mês</Label>
              <Input
                id="conversations"
                type="number"
                min={0}
                className="mt-1.5"
                value={monthlyConversations}
                onChange={(e) => setMonthlyConversations(Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="conversion">Taxa de conversão atual (%)</Label>
              <Input
                id="conversion"
                type="number"
                min={0}
                max={100}
                className="mt-1.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="ticket">Ticket médio (R$)</Label>
              <Input
                id="ticket"
                type="number"
                min={0}
                className="mt-1.5"
                value={averageTicket}
                onChange={(e) => setAverageTicket(Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="uplift">
                Melhoria conservadora esperada na conversão (%)
              </Label>
              <Input
                id="uplift"
                type="number"
                min={0}
                max={30}
                className="mt-1.5"
                value={upliftPct}
                onChange={(e) => setUpliftPct(Number(e.target.value) || 0)}
              />
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Sugestão conservadora: entre 5% e 15% ao organizar respostas, FAQ e follow-up.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-[var(--brand-petrol)]" />
              Estimativa conservadora
            </CardTitle>
            <CardDescription>Comparação entre o cenário atual e o organizado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Vendas/mês (atual)</p>
                <p className="text-lg font-semibold text-[var(--brand-graphite)]">
                  {currentSales.toFixed(1)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Vendas/mês (estimado)</p>
                <p className="text-lg font-semibold text-[var(--brand-petrol)]">
                  {improvedSales.toFixed(1)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Receita atual</p>
                <p className="text-lg font-semibold text-[var(--brand-graphite)]">
                  {formatBRL(currentRevenue)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-[var(--muted-foreground)]">Receita estimada</p>
                <p className="text-lg font-semibold text-[var(--brand-petrol)]">
                  {formatBRL(improvedRevenue)}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--brand-amber)]/40 bg-[var(--brand-amber)]/10 p-4">
              <p className="text-xs text-[var(--muted-foreground)]">Ganho estimado por mês</p>
              <p className="text-2xl font-bold text-[var(--brand-amber-dark)]">
                +{formatBRL(extraRevenue)}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                ≈ {extraSales.toFixed(1)} vendas adicionais/mês, em um cenário conservador.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
