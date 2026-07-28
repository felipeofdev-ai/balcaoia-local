"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { ExportPanel } from "@/components/app/ExportPanel";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

export default function ExportsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);

  React.useEffect(() => {
    setBusiness(getBusiness(params.id) ?? null);
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando exportações…" />;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Exportações — {business.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Baixe seus materiais em Markdown para revisar, imprimir ou implantar no seu canal de
          atendimento.
        </p>
      </div>

      <ExportPanel business={business} />
    </div>
  );
}
