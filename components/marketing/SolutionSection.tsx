import { ClipboardList, FileSearch2, Rocket, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";

const steps = [
  {
    icon: FileSearch2,
    step: "1",
    title: "Diagnóstico",
    description:
      "Responda o checklist de 37 perguntas sobre como seu atendimento funciona hoje, do primeiro contato ao pós-venda.",
  },
  {
    icon: ClipboardList,
    step: "2",
    title: "Organização",
    description:
      "O BalcãoIA transforma suas respostas em roteiros, respostas-padrão e políticas claras — prontas para usar.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Clareza",
    description:
      "Toda a equipe passa a responder do mesmo jeito: rápido, com o preço certo e sem deixar objeção sem resposta.",
  },
  {
    icon: Rocket,
    step: "4",
    title: "Mais vendas",
    description:
      "Menos cliente esperando, menos venda perdida por resposta ruim. Atendimento vira motivo de comprar, não de desistir.",
  },
];

export function SolutionSection() {
  return (
    <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="A solução"
          title="Um método simples para organizar o atendimento do seu jeito"
          description="Sem automação genérica, sem robô impessoal. Você continua no controle — só que agora com clareza e um plano."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                  <Icon className="h-5 w-5 text-[var(--brand-petrol)]" />
                </div>
                <span className="text-2xl font-extrabold text-[var(--border)]">
                  {step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--brand-graphite)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
