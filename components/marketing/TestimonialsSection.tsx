import { SectionTitle } from "@/components/marketing/SectionTitle";

const dataPoints = [
  {
    value: "1º minuto",
    label: "é a janela em que a maioria dos clientes decide se continua a conversa ou procura outro fornecedor.",
  },
  {
    value: "+ de 60%",
    label: "das dúvidas recebidas por negócios locais se repetem entre preço, prazo e forma de pagamento.",
  },
  {
    value: "0 padrão",
    label: "é o que a maioria dos pequenos negócios usa hoje para responder objeções como \u201cestá caro\u201d.",
  },
  {
    value: "7 dias",
    label: "é o tempo médio para organizar um atendimento inteiro com o método do BalcãoIA.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="gradient-petrol py-20 text-white sm:py-28">
      <div className="container-app flex flex-col gap-14">
        <SectionTitle
          light
          eyebrow="Por que isso importa"
          title="Não são depoimentos. São os números que todo negócio local enfrenta"
          description="Ainda estamos em fase inicial — por isso mostramos o problema real do mercado, e não estudos de caso inventados."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dataPoints.map((point) => (
            <div
              key={point.value}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <span className="text-3xl font-extrabold text-[var(--brand-amber)]">
                {point.value}
              </span>
              <p className="text-sm text-white/70">{point.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/40">
          Referências gerais de mercado sobre atendimento digital para pequenos
          negócios no Brasil. Não constituem garantia de resultado individual.
        </p>
      </div>
    </section>
  );
}
