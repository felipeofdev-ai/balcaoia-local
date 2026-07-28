"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalendarCheck2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { getBusiness, type LocalBusiness } from "@/lib/local-store";

const STATIC_PLAN = [
  {
    day: "Dia 1",
    title: "Diagnóstico",
    items: [
      "Revisar dados do negócio preenchidos no wizard",
      "Confirmar horário de funcionamento e políticas",
      "Listar as 5 perguntas mais comuns dos clientes",
    ],
  },
  {
    day: "Dia 2",
    title: "Catálogo",
    items: [
      "Completar preços e prazos reais (sem inventar)",
      "Marcar [PREENCHER] onde faltar alguma informação",
      "Revisar benefícios de cada produto/serviço",
    ],
  },
  {
    day: "Dia 3",
    title: "FAQ e objeções",
    items: [
      "Gerar a base de conhecimento (FAQ) com IA",
      "Validar as respostas com quem faz o atendimento hoje",
      "Definir as regras de handoff para um humano",
    ],
  },
  {
    day: "Dia 4",
    title: "Scripts",
    items: [
      "Gerar primeira resposta e roteiro de qualificação",
      "Gerar follow-ups com opção de opt-out",
      "Revisar se o tom de voz está alinhado ao negócio",
    ],
  },
  {
    day: "Dia 5",
    title: "Prompt mestre",
    items: [
      "Gerar e copiar o prompt mestre",
      "Testar no simulador em pelo menos 3 cenários",
      "Ajustar lacunas encontradas nos testes",
    ],
  },
  {
    day: "Dia 6",
    title: "Treino",
    items: [
      "Simular uma objeção de preço",
      "Simular um pedido de atendimento humano",
      "Registrar melhorias necessárias na base de conhecimento",
    ],
  },
  {
    day: "Dia 7",
    title: "Exportar e implantar",
    items: [
      "Exportar os materiais em Markdown",
      "Treinar a equipe com o material gerado",
      "Definir um responsável pela revisão semanal",
    ],
  },
];

export default function ImplementationPlanPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [business, setBusiness] = React.useState<LocalBusiness | null | undefined>(undefined);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setBusiness(getBusiness(params.id) ?? null);
  }, [params.id]);

  if (business === undefined) {
    return <LoadingState message="Carregando plano de implantação…" />;
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

  const generatedAsset =
    business.assets?.implementation_plan ?? business.assets?.implementation_checklist;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            Plano de implantação — {business.name}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Método BalcãoIA 7D em 7 dias: do diagnóstico até o atendimento no ar.
          </p>
        </div>
        {generatedAsset && <Badge variant="petrol">Gerado por IA</Badge>}
      </div>

      {generatedAsset ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plano gerado a partir do seu negócio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedAsset.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2 rounded-lg border border-[var(--border)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">
              Mostrando plano padrão. Gere uma versão personalizada com IA na página de Scripts.
            </p>
            <Link href={`/app/businesses/${business.id}/scripts`}>
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4" />
                Gerar plano personalizado
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {STATIC_PLAN.map((day) => (
              <Card key={day.day}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarCheck2 className="h-4 w-4 text-[var(--brand-petrol)]" />
                    {day.day} — {day.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {day.items.map((item) => {
                    const key = `${day.day}-${item}`;
                    return (
                      <label
                        key={key}
                        className="flex cursor-pointer items-start gap-2 text-sm text-[var(--brand-graphite)]"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checked[key])}
                          onChange={() =>
                            setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
                          }
                          className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--brand-petrol)]"
                        />
                        <span className={checked[key] ? "line-through opacity-60" : ""}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
