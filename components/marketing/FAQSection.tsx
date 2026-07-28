"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "O BalcãoIA é um robô que responde meus clientes automaticamente?",
    answer:
      "Não. O BalcãoIA organiza e gera os materiais de atendimento (roteiros, respostas, políticas) para você e sua equipe usarem. Quem atende continua sendo você — só que com muito mais clareza e agilidade.",
  },
  {
    question: "Preciso integrar com o WhatsApp Business ou API oficial?",
    answer:
      "Não é obrigatório. Os materiais gerados podem ser usados manualmente por você ou sua equipe em qualquer canal — WhatsApp, Instagram, telefone ou presencialmente. Não fazemos nem promovemos automação não oficial de contas.",
  },
  {
    question: "Isso funciona para o meu tipo de negócio?",
    answer:
      "O método foi desenhado para negócios locais — salões, clínicas, petshops, academias, delivery, consultorias e serviços em geral. As perguntas do diagnóstico se adaptam ao seu segmento.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "O diagnóstico é imediato. A implementação dos roteiros e materiais gerados costuma levar até 7 dias, seguindo o checklist de implementação incluso.",
  },
  {
    question: "Existe garantia?",
    answer:
      "Sim. Se você aplicar o material e sentir que não fez sentido para o seu negócio, tem 7 dias para solicitar reembolso integral — sem perguntas.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim. Seguimos os princípios da LGPD: coletamos apenas o necessário, com seu consentimento explícito, e você pode pedir a exclusão dos seus dados a qualquer momento pelo e-mail de contato.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="Perguntas frequentes"
          title="Ainda com dúvidas? A gente responde"
        />

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--brand-graphite)] cursor-pointer"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform",
                      isOpen && "rotate-180 text-[var(--brand-petrol)]"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-[var(--muted-foreground)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
