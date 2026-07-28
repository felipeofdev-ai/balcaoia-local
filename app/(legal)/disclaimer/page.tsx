import type { Metadata } from "next";
import { DisclaimerBrands } from "@/components/marketing/DisclaimerBrands";

export const metadata: Metadata = {
  title: "Disclaimer de Marcas",
  description:
    "Esclarecimento sobre a independência do BalcãoIA em relação ao WhatsApp LLC e à Meta Platforms, Inc.",
};

export default function DisclaimerPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-[var(--brand-graphite)] sm:text-4xl">
        Disclaimer de Marcas
      </h1>
      <p>Última atualização: 27 de julho de 2026.</p>

      <h2>Independência de marca</h2>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/60 p-5">
        <DisclaimerBrands className="text-sm leading-relaxed text-[var(--brand-graphite)]" />
      </div>

      <h2>Por que mencionamos essas marcas</h2>
      <p>
        Ao longo do nosso conteúdo, podemos mencionar plataformas de
        mensagens como WhatsApp para dar contexto sobre onde e como os
        materiais gerados pelo BalcãoIA podem ser utilizados no dia a dia do
        seu negócio. Essa menção é feita exclusivamente a título informativo e
        não representa qualquer tipo de parceria, licenciamento, patrocínio ou
        relação comercial oficial com essas empresas.
      </p>

      <h2>Nenhuma automação não oficial</h2>
      <p>
        O BalcãoIA não desenvolve, distribui ou incentiva o uso de automações
        não oficiais, bots ou integrações que violem os termos de uso do
        WhatsApp ou de qualquer outra plataforma de terceiros. Os roteiros,
        respostas e materiais gerados destinam-se ao uso manual por pessoas —
        você e sua equipe — no atendimento aos seus próprios clientes.
      </p>

      <h2>Marcas registradas</h2>
      <p>
        WhatsApp e Meta são marcas registradas de seus respectivos
        proprietários. Todas as demais marcas, nomes comerciais e logotipos
        eventualmente mencionados em nosso site pertencem aos seus respectivos
        titulares e são utilizados apenas para fins de identificação e
        referência.
      </p>

      <h2>Dúvidas</h2>
      <p>
        Caso tenha dúvidas sobre este disclaimer, entre em contato pelo
        e-mail{" "}
        <a href="mailto:contato@balcaoialocal.com.br" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          contato@balcaoialocal.com.br
        </a>
        .
      </p>
    </>
  );
}
