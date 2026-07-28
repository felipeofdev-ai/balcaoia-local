"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { AssetCard } from "@/components/app/AssetCard";
import { ASSET_TYPE_LIST } from "@/lib/asset-types";
import { getBusiness, saveAsset, type LocalBusiness } from "@/lib/local-store";
import type { AssetType } from "@/types/database";

export default function ScriptsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const businessId = params.id;

  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);
  const [loadingType, setLoadingType] = React.useState<AssetType | null>(null);
  const [generatingAll, setGeneratingAll] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>(ASSET_TYPE_LIST[0].type);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setBusiness(getBusiness(businessId) ?? null);
  }, [businessId]);

  async function generate(type: AssetType) {
    if (!business) return;
    setLoadingType(type);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          assetType: type,
          wizardData: business.wizardData,
          provider: localStorage.getItem("balcaoia_ai_provider") || undefined,
        }),
      });
      if (!res.ok) throw new Error("Falha ao gerar");
      const data = (await res.json()) as { content: string; modelUsed: string };
      saveAsset(businessId, type, data.content, data.modelUsed);
      setBusiness(getBusiness(businessId));
    } catch {
      setErrorMessage("Não foi possível gerar esse conteúdo agora. Tente novamente.");
    } finally {
      setLoadingType(null);
    }
  }

  async function generateAll() {
    setGeneratingAll(true);
    for (const meta of ASSET_TYPE_LIST) {
      // sequential on purpose to avoid overloading the mock/provider and to update UI progressively
      await generate(meta.type);
    }
    setGeneratingAll(false);
  }

  if (business === undefined) {
    return <LoadingState message="Carregando scripts…" />;
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            Scripts e prompts — {business.name}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Gere os 14 materiais de atendimento com IA a partir dos dados do wizard.
          </p>
        </div>
        <Button onClick={generateAll} loading={generatingAll} variant="amber">
          <Sparkles className="h-4 w-4" />
          Gerar todos
        </Button>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Todo conteúdo é gerado automaticamente e pode conter lacunas ([PREENCHER]). Revise
          cuidadosamente antes de usar com clientes reais.
        </p>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap">
          {ASSET_TYPE_LIST.map((meta) => (
            <TabsTrigger key={meta.type} value={meta.type}>
              {meta.title}
              {business.assets?.[meta.type]?.content ? (
                <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-amber)]" />
              ) : null}
            </TabsTrigger>
          ))}
        </TabsList>
        {ASSET_TYPE_LIST.map((meta) => {
          const asset = business.assets?.[meta.type];
          return (
            <TabsContent key={meta.type} value={meta.type}>
              <AssetCard
                title={meta.title}
                description={meta.description}
                content={asset?.content}
                modelUsed={asset?.model}
                updatedAt={asset?.updatedAt}
                loading={loadingType === meta.type || generatingAll}
                onGenerate={() => generate(meta.type)}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
