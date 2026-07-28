"use client";

import * as React from "react";
import { ShieldAlert, ShieldCheck, Users2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { getLeads, isAdminDemo, setAdminDemo, type LocalLead } from "@/lib/local-store";

const PROFILE_LABELS: Record<string, string> = {
  business_owner: "Dono de negócio",
  freelancer: "Freelancer",
  agency: "Agência",
  marketer: "Marketing",
  curious: "Curioso(a)",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR");
  } catch {
    return iso;
  }
}

export default function AdminLeadsPage() {
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const [leads, setLeads] = React.useState<LocalLead[]>([]);

  React.useEffect(() => {
    setAdmin(isAdminDemo());
    setLeads(getLeads());
  }, []);

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
            Ative o modo admin de demonstração para visualizar os leads capturados no site.
          </CardDescription>
          <Button onClick={handleEnableAdmin}>
            <ShieldCheck className="h-4 w-4" />
            Ativar modo admin (demo)
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">Leads capturados</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Leads salvos localmente pelas páginas de captura do site (diagnóstico, aula grátis,
          formulários de venda).
        </p>
      </div>

      {leads.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="Nenhum lead registrado ainda"
          description="Assim que alguém preencher um formulário de captura no site em modo demonstração, o lead aparecerá aqui."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Segmento</th>
                <th className="px-4 py-3">Perfil</th>
                <th className="px-4 py-3">Origem</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 font-medium text-[var(--brand-graphite)]">{lead.name}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{lead.email}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{lead.phone || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{lead.segment || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">
                      {PROFILE_LABELS[lead.profileType] ?? lead.profileType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{lead.source || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
