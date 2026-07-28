"use client";

import * as React from "react";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getAllEbookIdeas } from "@/lib/market-research/trends";
import { HOTMART } from "@/lib/config/hotmart";

export default function CalculadoraAfiliadosPage() {
  const ideas = getAllEbookIdeas();
  const [slug, setSlug] = React.useState(ideas[0]?.slug ?? "");
  const [sales, setSales] = React.useState(10);
  const idea = ideas.find((i) => i.slug === slug) ?? ideas[0];
  const perSale = idea ? (idea.price * idea.suggestedAffiliate) / 100 : 0;
  const total = perSale * sales;

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app flex-1 py-14">
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">
          Calculadora de afiliados
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted-foreground)]">
          Simulação educativa. Não é previsão de ganhos — vendas reais dependem de tráfego,
          oferta e conformidade.
        </p>

        <Card className="mt-8 max-w-lg">
          <CardHeader>
            <CardTitle className="text-base">Simular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="prod">Produto</Label>
              <select
                id="prod"
                className="mt-1.5 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              >
                {ideas.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.title} ({i.suggestedAffiliate}%)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="sales">Vendas no mês (hipótese)</Label>
              <Input
                id="sales"
                type="number"
                min={0}
                className="mt-1.5"
                value={sales}
                onChange={(e) => setSales(Number(e.target.value) || 0)}
              />
            </div>
            <p className="text-sm">
              Comissão por venda (estimada):{" "}
              <strong>
                {perSale.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>
            </p>
            <p className="text-lg font-semibold text-[var(--brand-petrol)]">
              Total hipotético:{" "}
              {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={HOTMART.affiliateBaseUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="amber">Quero ser afiliado</Button>
              </a>
              <Link href="/afiliados">
                <Button variant="outline">Ver materiais</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <MarketingFooter />
    </div>
  );
}
