import {
  BookOpenCheck,
  FileText,
  MessagesSquare,
  ShieldCheck,
  Sparkle,
  Workflow,
} from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";

const features = [
  {
    icon: MessagesSquare,
    title: "Roteiros de primeira resposta",
    description:
      "Mensagens prontas para os primeiros segundos da conversa, no tom de voz do seu negócio.",
  },
  {
    icon: Workflow,
    title: "Scripts de objeção",
    description:
      "Respostas testadas para \u201cestá caro\u201d, \u201cvou pensar\u201d e as objeções mais comuns do seu nicho.",
  },
  {
    icon: BookOpenCheck,
    title: "Base de perguntas frequentes",
    description:
      "Toda dúvida recorrente do cliente, organizada e com resposta pronta — sem depender da memória de alguém.",
  },
  {
    icon: FileText,
    title: "Catálogo e políticas claras",
    description:
      "Preço, prazo, forma de pagamento e política de cancelamento em um único documento, sempre atualizado.",
  },
  {
    icon: ShieldCheck,
    title: "Regras de transferência humana",
    description:
      "Você define exatamente quando um atendimento precisa passar para uma pessoa da equipe.",
  },
  {
    icon: Sparkle,
    title: "Checklist de implementação",
    description:
      "Passo a passo prático para colocar tudo em prática essa semana, sem depender de equipe técnica.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="O que você recebe"
          title="Tudo o que seu atendimento precisa para ser consistente"
          description="Materiais prontos, gerados a partir das respostas do seu próprio negócio."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-xl border border-[var(--border)] p-6 transition-colors hover:border-[var(--brand-petrol-light)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-amber)]/15 transition-colors group-hover:bg-[var(--brand-petrol)] group-hover:text-white">
                <Icon className="h-5 w-5 text-[var(--brand-amber-dark)] group-hover:text-white" />
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
