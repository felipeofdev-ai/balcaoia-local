"use client";

import * as React from "react";
import Link from "next/link";
import {
  ClipboardList,
  Download,
  MessageSquareText,
  Plus,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { BusinessCard } from "@/components/app/BusinessCard";
import { getBusinesses, getLocalUser, type LocalBusiness } from "@/lib/local-store";

const METHOD_STEPS = [
  "Diagnóstico",
  "Desenho",
  "Dados",
  "Discurso",
  "Demonstração",
  "Distribuição",
  "Domínio",
];

const SHORTCUTS = [
  {
    label: "Continuar wizard",
    description: "Complete as informações do seu negócio",
    icon: Wand2,
    suffix: "wizard",
  },
  {
    label: "Gerar scripts",
    description: "Crie prompts e roteiros com IA",
    icon: Sparkles,
    suffix: "scripts",
  },
  {
    label: "Testar no simulador",
    description: "Converse com seu agente antes de usar de verdade",
    icon: MessageSquareText,
    suffix: "simulator",
  },
  {
    label: "Exportar materiais",
    description: "Baixe tudo em Markdown",
    icon: Download,
    suffix: "exports",
  },
];

export default function DashboardPage() {
  const [businesses, setBusinesses] = React.useState<LocalBusiness[]>([]);
  const [userName, setUserName] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setBusinesses(getBusinesses());
    setUserName(getLocalUser()?.name || "");
    setLoaded(true);
  }, []);

  const firstName = userName.split(" ")[0];
  const primaryBusiness = businesses[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            {firstName ? `Olá, ${firstName}!` : "Olá!"}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {firstName
              ? `Bem-vindo de volta. Continue o Método 7D e organize o atendimento do seu negócio.`
              : "Aqui está um resumo dos seus negócios no BalcãoIA Studio."}
          </p>
        </div>
        <Link href="/app/businesses/new">
          <Button>
            <Plus className="h-4 w-4" />
            Criar negócio
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              Acesso
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--brand-petrol)]">Studio ativo</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Modo demo ou compra Hotmart liberam o workspace.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              Negócios
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--brand-graphite)]">
              {loaded ? businesses.length : "—"}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">Cadastrados neste navegador</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              Próximo passo
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--brand-graphite)]">
              {primaryBusiness?.wizard_completed
                ? "Gerar scripts"
                : primaryBusiness
                  ? `Wizard etapa ${primaryBusiness.wizard_step || 1}`
                  : "Criar negócio"}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">Método BalcãoIA 7D</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="h-4 w-4 text-[var(--brand-petrol)]" />
            Método BalcãoIA 7D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-wrap gap-2">
            {METHOD_STEPS.map((step, idx) => (
              <li
                key={step}
                className="flex items-center gap-1.5 rounded-full border border-[var(--brand-petrol)]/20 bg-white px-3 py-1.5 text-xs font-medium text-[var(--brand-petrol)]"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-petrol)] text-[10px] text-white">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <Link
            href="/app/learning"
            className="mt-3 inline-block text-xs font-medium text-[var(--brand-petrol)] underline-offset-4 hover:underline"
          >
            Ver detalhes do método →
          </Link>
        </CardContent>
      </Card>

      {loaded && businesses.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Você ainda não tem nenhum negócio cadastrado"
          description="Crie seu primeiro negócio para começar o wizard e gerar seus scripts de atendimento com IA."
          action={
            <Link href="/app/businesses/new">
              <Button>
                <Plus className="h-4 w-4" />
                Criar meu primeiro negócio
              </Button>
            </Link>
          }
        />
      ) : (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Meus negócios
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        </div>
      )}

      {primaryBusiness && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Atalhos rápidos — {primaryBusiness.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHORTCUTS.map((s) => (
              <Link key={s.suffix} href={`/app/businesses/${primaryBusiness.id}/${s.suffix}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-2 pt-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-amber)]/15">
                      <s.icon className="h-4.5 w-4.5 text-[var(--brand-amber-dark)]" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--brand-graphite)]">{s.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
