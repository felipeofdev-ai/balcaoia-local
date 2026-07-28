"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  BookOpen,
  Calculator,
  ClipboardList,
  Download,
  FileStack,
  MapPin,
  MessageSquareText,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { WizardProgress } from "@/components/app/WizardProgress";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

const LINKS = [
  {
    href: "wizard",
    label: "Wizard do negócio",
    description: "Revise ou complete as 9 etapas de informações.",
    icon: Wand2,
  },
  {
    href: "knowledge-base",
    label: "Base de conhecimento",
    description: "FAQs e conteúdo que alimentam o agente.",
    icon: BookOpen,
  },
  {
    href: "scripts",
    label: "Scripts e prompts",
    description: "Gere os 14 materiais de atendimento com IA.",
    icon: Sparkles,
  },
  {
    href: "simulator",
    label: "Simulador",
    description: "Teste conversas antes de usar com clientes reais.",
    icon: MessageSquareText,
  },
  {
    href: "exports",
    label: "Exportações",
    description: "Baixe os materiais prontos em Markdown.",
    icon: Download,
  },
  {
    href: "roi",
    label: "Calculadora de ROI",
    description: "Estimativas conservadoras de ganho de eficiência.",
    icon: Calculator,
  },
  {
    href: "implementation-plan",
    label: "Plano de implantação",
    description: "Passo a passo de 7 dias para colocar no ar.",
    icon: ClipboardList,
  },
];

export default function BusinessOverviewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);

  React.useEffect(() => {
    setBusiness(getBusiness(params.id) ?? null);
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando negócio…" />;
  }

  if (business === null) {
    return (
      <ErrorState
        title="Negócio não encontrado"
        message="Esse negócio pode ter sido removido ou o link está incorreto."
        onRetry={() => router.push("/app/dashboard")}
        retryLabel="Voltar ao dashboard"
      />
    );
  }

  const assetsCount = Object.keys(business.assets ?? {}).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
              {business.name}
            </h1>
            {business.segment && <Badge variant="petrol">{business.segment}</Badge>}
          </div>
          {business.city && (
            <p className="mt-1 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
              <MapPin className="h-3.5 w-3.5" /> {business.city}
            </p>
          )}
          {business.description && (
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted-foreground)]">
              {business.description}
            </p>
          )}
        </div>
        <Link href={`/app/businesses/${business.id}/wizard`}>
          <Button variant="outline">
            <Wand2 className="h-4 w-4" />
            {business.wizard_completed ? "Revisar wizard" : "Continuar wizard"}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <WizardProgress
            currentStep={business.wizard_step}
            completed={business.wizard_completed}
          />
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <FileStack className="h-3.5 w-3.5" />
            {assetsCount > 0
              ? `${assetsCount} materiais gerados`
              : "Nenhum material gerado ainda"}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          Ferramentas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((link) => (
            <Link key={link.href} href={`/app/businesses/${business.id}/${link.href}`}>
              <Card className="h-full transition-shadow hover:shadow-md hover:border-[var(--brand-petrol)]/40">
                <CardContent className="flex flex-col gap-2 pt-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                    <link.icon className="h-4.5 w-4.5 text-[var(--brand-petrol)]" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--brand-graphite)]">
                    {link.label}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
