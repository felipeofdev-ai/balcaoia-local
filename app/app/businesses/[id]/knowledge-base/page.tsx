"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, MessageCircleQuestion, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

export default function KnowledgeBasePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);

  React.useEffect(() => {
    setBusiness(getBusiness(params.id) ?? null);
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando base de conhecimento…" />;
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

  const faqs = business.wizardData?.faqs ?? [];
  const grouped = new Map<string, typeof faqs>();
  faqs.forEach((f) => {
    const cat = f.category || "Geral";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(f);
  });

  const generatedAsset = business.assets?.faq_knowledge_base;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Base de conhecimento — {business.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Perguntas e respostas cadastradas no wizard, usadas para treinar seu agente.
        </p>
      </div>

      {faqs.length === 0 ? (
        <EmptyState
          icon={MessageCircleQuestion}
          title="Nenhuma pergunta cadastrada ainda"
          description="Adicione perguntas frequentes na etapa 4 do wizard para montar sua base de conhecimento."
          action={
            <Link href={`/app/businesses/${business.id}/wizard`}>
              <Button>Ir para o wizard</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircleQuestion className="h-4 w-4 text-[var(--brand-petrol)]" />
                  {category}
                </CardTitle>
                <CardDescription>{items.length} pergunta(s)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((f, idx) => (
                  <div key={idx} className="rounded-lg bg-[var(--muted)] p-3">
                    <p className="text-sm font-semibold text-[var(--brand-graphite)]">
                      P: {f.question}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">R: {f.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-[var(--brand-petrol)]" />
              Documento completo de FAQ (gerado por IA)
            </CardTitle>
            <CardDescription>
              Versão em Markdown pronta para colar no seu sistema de atendimento.
            </CardDescription>
          </div>
          {generatedAsset ? (
            <Badge variant="petrol">Gerado</Badge>
          ) : (
            <Badge variant="secondary">Não gerado</Badge>
          )}
        </CardHeader>
        <CardContent>
          {generatedAsset ? (
            <div className="markdown-body max-h-96 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 p-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedAsset.content}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[var(--border)] px-4 py-8 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">
                Gere a base de conhecimento completa na página de Scripts.
              </p>
              <Link href={`/app/businesses/${business.id}/scripts`}>
                <Button variant="outline">
                  <Sparkles className="h-4 w-4" />
                  Ir para Scripts
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
