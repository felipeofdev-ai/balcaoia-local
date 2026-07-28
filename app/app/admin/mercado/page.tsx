"use client";

import * as React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TOP_NICHES_2026 } from "@/lib/market-research/trends";
import { formatBRL } from "@/lib/config/pricing";

export default function MercadoAdminPage() {
  const ranked = [...TOP_NICHES_2026].sort((a, b) => b.trendScore - a.trendScore);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[var(--brand-graphite)]">
          <TrendingUp className="h-6 w-6 text-[var(--brand-petrol)]" />
          Pesquisa de mercado
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Nichos 2026 com notas de compliance. Produto âncora: Negócios Locais com IA.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {ranked.map((niche) => (
          <Card key={niche.id}>
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{niche.name}</CardTitle>
                <Badge variant="secondary">Trend {niche.trendScore}/10</Badge>
                <Badge variant="outline">{niche.competitionLevel}</Badge>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">{niche.complianceNote}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Ticket médio {formatBRL(niche.avgTicket)} · Afiliado {niche.affiliateCommission}% ·{" "}
                {niche.searchVolume}
              </p>
              <p className="text-[var(--muted-foreground)]">{niche.problemSolved}</p>
              <ul className="space-y-2">
                {niche.ebookIdeas.map((idea) => (
                  <li
                    key={idea.slug}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] px-3 py-2"
                  >
                    <span className="font-medium">{idea.title}</span>
                    <div className="flex gap-2">
                      <Link href={`/produtos/${idea.slug}`}>
                        <Button size="sm" variant="outline">
                          Página
                        </Button>
                      </Link>
                      <Link href={`/app/admin/studio?slug=${idea.slug}`}>
                        <Button size="sm" variant="amber">
                          Gerar ebook
                        </Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
