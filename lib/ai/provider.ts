import type { WizardData } from "@/types/business";
import type { AIProviderId } from "@/lib/config/ai-providers";

export interface GenerationInput {
  businessData: WizardData;
  assetType: string;
  additionalContext?: string;
}

export interface GenerationOutput {
  content: string;
  modelUsed: string;
  warnings: string[];
}

export interface AIProvider {
  name: string;
  generateText(prompt: string, systemPrompt: string): Promise<string>;
  isAvailable(): boolean;
}

export const GUARDRAILS = `
REGRAS ABSOLUTAS:
- Nunca invente preços, prazos ou condições não informados. Use [PREENCHER].
- Nunca faça diagnósticos médicos, veterinários, jurídicos ou financeiros.
- Nunca prometa resultado garantido de venda, lucro ou aprovação.
- Nunca peça CPF, cartão, senha ou dados sensíveis no chat.
- Sempre oriente revisão humana antes de usar com clientes reais.
- Sempre inclua opção de falar com atendente humano.
- Respeite opt-out imediatamente.
- Seja claro, breve e comercialmente útil.
- Nunca prometa renda garantida.
`;

export async function getAIProvider(
  preferred?: string | AIProviderId | null
): Promise<AIProvider> {
  const provider = (preferred || process.env.AI_PROVIDER || "mock").toLowerCase();
  switch (provider) {
    case "groq":
    case "llama": {
      const { GroqProvider } = await import("./groq-provider");
      return new GroqProvider();
    }
    case "openai":
    case "gpt": {
      const { OpenAIProvider } = await import("./openai-provider");
      return new OpenAIProvider();
    }
    case "anthropic":
    case "claude": {
      const { AnthropicProvider } = await import("./anthropic-provider");
      return new AnthropicProvider();
    }
    case "gemini": {
      const { GeminiProvider } = await import("./gemini-provider");
      return new GeminiProvider();
    }
    default: {
      const { MockAIProvider } = await import("./mock-provider");
      return new MockAIProvider();
    }
  }
}
