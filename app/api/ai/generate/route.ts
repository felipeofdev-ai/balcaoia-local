import { NextResponse } from "next/server";
import type { WizardData } from "@/types/business";
import { ASSET_GENERATORS } from "@/lib/ai/generators";
import { getAIProvider } from "@/lib/ai/provider";
import type { AIProviderId } from "@/lib/config/ai-providers";
import { AI_PROVIDER_OPTIONS } from "@/lib/config/ai-providers";

export const runtime = "nodejs";

interface GenerateRequestBody {
  businessId?: string;
  assetType?: string;
  wizardData?: WizardData;
  provider?: AIProviderId | string;
}

export async function GET() {
  const status = AI_PROVIDER_OPTIONS.map((opt) => {
    const envOk = !opt.envKey || Boolean(process.env[opt.envKey]);
    return {
      id: opt.id,
      label: opt.label,
      available: opt.id === "mock" || envOk,
      freeTierHint: opt.freeTierHint,
      paid: opt.paid,
      models: opt.models,
    };
  });
  return NextResponse.json({
    defaultProvider: process.env.AI_PROVIDER ?? "mock",
    providers: status,
  });
}

export async function POST(request: Request) {
  let body: GenerateRequestBody;
  try {
    body = (await request.json()) as GenerateRequestBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { assetType, wizardData, provider } = body;

  if (!assetType || !(assetType in ASSET_GENERATORS)) {
    return NextResponse.json(
      { error: "Tipo de asset inválido ou não informado." },
      { status: 400 }
    );
  }

  if (!wizardData) {
    return NextResponse.json(
      { error: "Dados do negócio (wizardData) são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    // Garante que o preferred provider está disponível no processo
    if (provider) {
      process.env.AI_PROVIDER_OVERRIDE = String(provider);
    }
    const preferred = provider || process.env.AI_PROVIDER_OVERRIDE || process.env.AI_PROVIDER;
    const ai = await getAIProvider(preferred);
    // Generators usam getAIProvider internamente — setamos env temporário
    const prev = process.env.AI_PROVIDER;
    process.env.AI_PROVIDER = ai.name === "mock" ? "mock" : (preferred as string) || prev;
    const generator = ASSET_GENERATORS[assetType as keyof typeof ASSET_GENERATORS];
    const content = await generator.fn(wizardData);
    process.env.AI_PROVIDER = prev;
    return NextResponse.json({
      content,
      title: generator.title,
      modelUsed: ai.name,
      providerAvailable: ai.isAvailable(),
    });
  } catch (error) {
    console.error("[/api/ai/generate]", error);
    return NextResponse.json(
      { error: "Não foi possível gerar o conteúdo agora. Tente novamente." },
      { status: 500 }
    );
  }
}
