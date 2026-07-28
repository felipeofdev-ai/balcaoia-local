import { Clock, MessageCircleWarning, TrendingDown, Users } from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";

const problems = [
  {
    icon: Clock,
    title: "Demora para responder",
    description:
      "O cliente manda mensagem e fica esperando. Quando alguém responde, ele já comprou em outro lugar.",
  },
  {
    icon: MessageCircleWarning,
    title: "Respostas improvisadas",
    description:
      "Cada pessoa da equipe responde de um jeito diferente. Sem roteiro, sem padrão, sem previsibilidade.",
  },
  {
    icon: TrendingDown,
    title: "Objeções mal resolvidas",
    description:
      "\u201cVou pensar\u201d e \u201cestá caro\u201d viram ponto final da conversa, em vez de vira-lata da venda.",
  },
  {
    icon: Users,
    title: "Conhecimento só na cabeça do dono",
    description:
      "Preço, prazo, política de troca: tudo depende de uma pessoa lembrar e explicar do zero, sempre.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="O problema"
          title="Seu negócio não perde vendas por falta de cliente. Perde por falta de clareza no atendimento."
          description="A maioria dos negócios locais atende no improviso — e isso custa caro todos os dias, mesmo sem aparecer numa planilha."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
                <Icon className="h-5 w-5 text-red-500" />
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
