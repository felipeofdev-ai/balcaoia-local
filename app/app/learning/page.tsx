"use client";

import {
  BadgeCheck,
  Database,
  MessagesSquare,
  Radar,
  Rocket,
  ScrollText,
  Sparkles,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MODULES = [
  {
    letter: "1º D",
    title: "Diagnóstico",
    icon: Radar,
    description:
      "Entenda onde o atendimento do seu negócio está perdendo vendas hoje: tempo de resposta, perguntas repetidas, falta de padrão.",
    outcomes: ["Mapa de gargalos do atendimento atual", "Prioridades claras para organizar primeiro"],
  },
  {
    letter: "2º D",
    title: "Desenho",
    icon: Target,
    description:
      "Estruture as informações do negócio em um wizard guiado de 9 etapas: público, produtos, políticas, tom de voz e objetivo.",
    outcomes: ["Wizard do negócio completo", "Visão clara do público e objetivo do atendimento"],
  },
  {
    letter: "3º D",
    title: "Dados",
    icon: Database,
    description:
      "Organize catálogo, FAQ, objeções e políticas em uma base de conhecimento única — sem inventar preços ou condições.",
    outcomes: ["Base de conhecimento estruturada", "Catálogo com preços e prazos reais"],
  },
  {
    letter: "4º D",
    title: "Discurso",
    icon: ScrollText,
    description:
      "Gere scripts de primeira resposta, qualificação, objeções, follow-up e o prompt mestre pronto para usar em qualquer IA.",
    outcomes: ["14 materiais de atendimento gerados", "Prompt mestre pronto para copiar"],
  },
  {
    letter: "5º D",
    title: "Demonstração",
    icon: MessagesSquare,
    description:
      "Teste o agente no simulador interno, em cenários reais, com alertas de compliance e nível de confiança da resposta.",
    outcomes: ["Testes em cenários de objeção e handoff", "Ajustes finos antes de ir ao ar"],
  },
  {
    letter: "6º D",
    title: "Distribuição",
    icon: Rocket,
    description:
      "Exporte os materiais em Markdown e implante no seu canal de atendimento (WhatsApp, site, redes sociais).",
    outcomes: ["Pacote completo exportado", "Equipe treinada com o material"],
  },
  {
    letter: "7º D",
    title: "Domínio",
    icon: BadgeCheck,
    description:
      "Acompanhe, revise e evolua continuamente: novas perguntas viram FAQ, novas objeções viram scripts.",
    outcomes: ["Rotina de revisão semanal", "Melhoria contínua do atendimento"],
  },
];

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
          Método BalcãoIA 7D
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted-foreground)]">
          Um passo a passo simples para organizar o atendimento do seu negócio local com apoio de
          IA — do diagnóstico até a melhoria contínua.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MODULES.map((mod) => (
          <Card key={mod.title}>
            <CardHeader className="flex-row items-start gap-3 space-y-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                <mod.icon className="h-5 w-5 text-[var(--brand-petrol)]" />
              </div>
              <div>
                <Badge variant="amber" className="mb-1">
                  {mod.letter}
                </Badge>
                <CardTitle className="text-base">{mod.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--muted-foreground)]">{mod.description}</p>
              <ul className="space-y-1">
                {mod.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-1.5 text-xs text-[var(--brand-graphite)]">
                    <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[var(--brand-amber-dark)]" />
                    {o}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5">
        <CardContent className="py-6 text-center text-sm text-[var(--brand-petrol)]">
          Conteúdo educacional do BalcãoIA Studio. Aplique os 7 D&apos;s no seu negócio a partir do{" "}
          <strong>Dashboard</strong> — cada etapa corresponde a uma ferramenta dentro do produto.
        </CardContent>
      </Card>
    </div>
  );
}
