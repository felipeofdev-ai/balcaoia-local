"use client";

import Link from "next/link";
import { ArrowRight, Building2, FileStack, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WIZARD_TOTAL_STEPS } from "@/components/app/WizardProgress";
import type { LocalBusiness } from "@/lib/local-store";

export interface BusinessCardProps {
  business: LocalBusiness;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const assetsCount = Object.keys(business.assets ?? {}).length;
  const percent = business.wizard_completed
    ? 100
    : Math.round((Math.min(business.wizard_step, WIZARD_TOTAL_STEPS) / WIZARD_TOTAL_STEPS) * 100);

  return (
    <Link href={`/app/businesses/${business.id}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md group-hover:border-[var(--brand-petrol)]/40">
        <CardHeader className="flex-row items-start justify-between gap-2 space-y-0">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
              <Building2 className="h-5 w-5 text-[var(--brand-petrol)]" />
            </div>
            <div>
              <CardTitle className="text-base">{business.name || "Sem nome"}</CardTitle>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {business.segment && (
                  <Badge variant="petrol">{business.segment}</Badge>
                )}
                {business.city && (
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <MapPin className="h-3 w-3" /> {business.city}
                  </span>
                )}
              </div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--brand-petrol)]" />
        </CardHeader>
        <CardContent className="space-y-3">
          {business.description && (
            <p className="line-clamp-2 text-sm text-[var(--muted-foreground)]">
              {business.description}
            </p>
          )}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span>Progresso do wizard</span>
              <span className="font-semibold text-[var(--brand-graphite)]">{percent}%</span>
            </div>
            <Progress value={percent} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <FileStack className="h-3.5 w-3.5" />
            {assetsCount > 0
              ? `${assetsCount} ${assetsCount === 1 ? "ativo gerado" : "ativos gerados"}`
              : "Nenhum ativo gerado ainda"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
