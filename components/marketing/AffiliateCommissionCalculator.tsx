"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LOTE1_ALL,
  LOTE1_FLAGSHIPS,
  commissionPerSale,
} from "@/lib/config/lote1-affiliates";
import { formatBRL } from "@/lib/config/pricing";

export function AffiliateCommissionCalculator() {
  const [code, setCode] = React.useState(LOTE1_FLAGSHIPS[0]?.code ?? "A1");
  const [salesPerDay, setSalesPerDay] = React.useState(1);
  const [days, setDays] = React.useState(30);

  const product = LOTE1_ALL.find((p) => p.code === code) ?? LOTE1_FLAGSHIPS[0];
  const perSale = commissionPerSale(product.price, product.commissionPercent);
  const totalSales = salesPerDay * days;
  const totalCommission = perSale * totalSales;

  return (
    <Card className="mx-auto w-full max-w-lg border-[var(--border)]">
      <CardHeader>
        <CardTitle className="text-base text-[var(--brand-graphite)]">
          Simulador de comissão (hipotético)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          Exemplo matemático apenas. Não é promessa de ganho — vendas reais dependem de
          tráfego, público, conformidade e esforço de divulgação.
        </p>
        <div>
          <Label htmlFor="lote1-product">Produto LOTE 1</Label>
          <select
            id="lote1-product"
            className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          >
            <optgroup label="Flagships (50%)">
              {LOTE1_FLAGSHIPS.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} — {p.name} ({formatBRL(p.price)})
                </option>
              ))}
            </optgroup>
            <optgroup label="Micros J (50%)">
              {LOTE1_ALL.filter((p) => p.tier === "micro").map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} — {p.name} ({formatBRL(p.price)})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="sales-day">Vendas/dia (hipótese)</Label>
            <Input
              id="sales-day"
              type="number"
              min={0}
              step={0.5}
              className="mt-1.5"
              value={salesPerDay}
              onChange={(e) => setSalesPerDay(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="days">Dias no período</Label>
            <Input
              id="days"
              type="number"
              min={1}
              className="mt-1.5"
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 1)}
            />
          </div>
        </div>
        <div className="rounded-xl bg-[var(--muted)]/60 p-4 text-sm">
          <p>
            Comissão por venda ({product.commissionPercent}% de {formatBRL(product.price)}):{" "}
            <strong>{formatBRL(perSale)}</strong>
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--brand-petrol)]">
            Total hipotético ({totalSales} vendas): {formatBRL(totalCommission)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
