/**
 * Preços centralizados — nunca espalhar valores no código.
 */
export const PRICING = {
  table: 497,
  launch: 397,
  beta: 297,
  orderBump: {
    name: "Pack Nichos Prontos",
    price: 67,
  },
  upsell: {
    name: "Kit Agência BalcãoIA",
    price: 197,
  },
  subscription: {
    monthly: 49,
    yearly: 297,
    name: "Clube BalcãoIA Templates",
  },
  anchors: [
    { name: "Diagnóstico do atendimento", value: 197 },
    { name: "Templates por nicho", value: 297 },
    { name: "Gerador de scripts", value: 397 },
    { name: "Simulador de agente", value: 497 },
    { name: "Curso completo", value: 497 },
    { name: "Kit implantação 7D", value: 297 },
  ],
  currency: "BRL",
  installmentText: "ou em até 12x no cartão",
  betaLimit: 50,
} as const;

export const perceivedTotal = PRICING.anchors.reduce((s, a) => s + a.value, 0);

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}
