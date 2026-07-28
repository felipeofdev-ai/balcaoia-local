import type { ReactNode } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";

export function DemoSection() {
  return (
    <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          eyebrow="Antes e depois"
          title="A diferença está na clareza da resposta, não na quantidade de mensagens"
          description="Veja como a mesma pergunta do cliente pode virar venda perdida ou venda fechada."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Antes */}
          <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <ThumbsDown className="h-4 w-4" />
              Sem organização
            </div>
            <div className="flex flex-col gap-3">
              <ChatBubble from="client">Oi, quanto custa a escova progressiva?</ChatBubble>
              <ChatBubble from="business" delay tone="bad">
                Oi! depende, vc quer marcar?
              </ChatBubble>
              <ChatBubble from="client">Quero saber o preço primeiro</ChatBubble>
              <ChatBubble from="business" delay tone="bad">
                Ahh deixa eu ver com a Camila e te falo
              </ChatBubble>
            </div>
            <p className="mt-2 text-xs text-red-600/80">
              Resposta lenta, sem preço, sem próximo passo. Cliente segue procurando.
            </p>
          </div>

          {/* Depois */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--brand-petrol-light)]/25 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-petrol)]">
              <ThumbsUp className="h-4 w-4" />
              Com o BalcãoIA
            </div>
            <div className="flex flex-col gap-3">
              <ChatBubble from="client">Oi, quanto custa a escova progressiva?</ChatBubble>
              <ChatBubble from="business" tone="good">
                Oi! A escova progressiva custa entre R$ 180 e R$ 280, dependendo
                do comprimento. Quer que eu já verifique um horário essa semana?
              </ChatBubble>
              <ChatBubble from="client">Quero sim, mas está meio caro</ChatBubble>
              <ChatBubble from="business" tone="good">
                Entendo! O valor inclui produto profissional e dura até 6
                meses. Consigo te encaixar na terça às 14h, garante o valor
                atual. Fecho pra você?
              </ChatBubble>
            </div>
            <p className="mt-2 text-xs text-[var(--brand-petrol)]/80">
              Resposta imediata, preço claro, objeção resolvida e próximo passo definido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  children,
  from,
  tone,
}: {
  children: ReactNode;
  from: "client" | "business";
  tone?: "good" | "bad";
  delay?: boolean;
}) {
  const isClient = from === "client";
  return (
    <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isClient
            ? "rounded-bl-sm bg-[var(--muted)] text-[var(--brand-graphite)]"
            : tone === "good"
              ? "rounded-br-sm bg-[var(--brand-petrol)] text-white"
              : "rounded-br-sm bg-red-100 text-red-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
