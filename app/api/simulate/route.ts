import { NextResponse } from "next/server";
import type { WizardData } from "@/types/business";
import { GUARDRAILS, getAIProvider } from "@/lib/ai/provider";

export const runtime = "nodejs";

interface SimulateRequestBody {
  businessId?: string;
  message?: string;
  wizardData?: Partial<WizardData>;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

const SENSITIVE_DATA_TRIGGERS = ["cpf", "cartão de crédito", "número do cartão", "senha"];
const GUARANTEE_TRIGGERS = ["garantido", "garantia de renda", "resultado garantido", "100% de resultado"];
const DIAGNOSIS_TRIGGERS = [
  "diagnóstico",
  "sintoma",
  "doença",
  "dor no",
  "posso tomar",
  "receita médica",
];

function detectComplianceAlerts(userMessage: string, reply: string): string[] {
  const alerts: string[] = [];
  const haystack = `${userMessage} ${reply}`.toLowerCase();

  if (SENSITIVE_DATA_TRIGGERS.some((t) => haystack.includes(t))) {
    alerts.push("Dados sensíveis mencionados — nunca solicite CPF, cartão ou senha pelo chat.");
  }
  if (GUARANTEE_TRIGGERS.some((t) => haystack.includes(t))) {
    alerts.push("Promessa de resultado garantido detectada — reformule sem garantir resultado.");
  }
  if (DIAGNOSIS_TRIGGERS.some((t) => haystack.includes(t))) {
    alerts.push("Possível pedido de diagnóstico — encaminhe para um profissional humano.");
  }
  if (/humano|atendente|pessoa de verdade/i.test(userMessage)) {
    alerts.push("Cliente solicitou atendimento humano — confirme o handoff.");
  }
  return alerts;
}

function estimateConfidence(reply: string, wizardData?: Partial<WizardData>): number {
  let score = 0.72;
  if (reply.includes("[PREENCHER]")) score -= 0.22;
  if (reply.length < 40) score -= 0.1;
  if (wizardData?.faqs?.length) score += 0.08;
  if (wizardData?.productsServices?.length) score += 0.06;
  if (wizardData?.humanHandoffRules) score += 0.04;
  return Math.max(0.15, Math.min(0.97, Number(score.toFixed(2))));
}

export async function POST(request: Request) {
  let body: SimulateRequestBody;
  try {
    body = (await request.json()) as SimulateRequestBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { message, wizardData } = body;

  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Mensagem é obrigatória." }, { status: 400 });
  }

  try {
    const provider = await getAIProvider();
    const prompt = `[SIMULATE]\n${message}\n[DATA]${JSON.stringify(wizardData ?? {})}[/DATA]`;
    const reply = await provider.generateText(prompt, GUARDRAILS);
    const complianceAlerts = detectComplianceAlerts(message, reply);
    const confidence = estimateConfidence(reply, wizardData);

    return NextResponse.json({ reply, confidence, complianceAlerts });
  } catch (error) {
    console.error("[/api/simulate]", error);
    return NextResponse.json(
      { error: "Não foi possível simular a resposta agora. Tente novamente." },
      { status: 500 }
    );
  }
}
