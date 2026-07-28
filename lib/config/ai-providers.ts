/**
 * Catálogo de provedores de IA disponíveis no BalcãoIA Studio.
 * O usuário escolhe no painel; chaves vêm de .env (nunca no client).
 */

export type AIProviderId =
  | "mock"
  | "groq"
  | "openai"
  | "anthropic"
  | "gemini";

export interface AIProviderOption {
  id: AIProviderId;
  label: string;
  description: string;
  models: string[];
  freeTierHint: string;
  envKey: string;
  paid: boolean;
}

export const AI_PROVIDER_OPTIONS: AIProviderOption[] = [
  {
    id: "mock",
    label: "Mock local (demo)",
    description: "Sem chave. Gera conteúdo útil para testes e demos offline.",
    models: ["mock-v1"],
    freeTierHint: "100% gratuito",
    envKey: "",
    paid: false,
  },
  {
    id: "groq",
    label: "Groq (Llama)",
    description: "Llama 3.3 / Mixtral ultrarrápidos. Ideal para MVP com cota free.",
    models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
    freeTierHint: "Plano free generoso na Groq Console",
    envKey: "GROQ_API_KEY",
    paid: false,
  },
  {
    id: "openai",
    label: "OpenAI (GPT)",
    description: "GPT-4o / GPT-4o-mini — qualidade alta para geração comercial.",
    models: ["gpt-4o-mini", "gpt-4o"],
    freeTierHint: "Pago (créditos OpenAI)",
    envKey: "OPENAI_API_KEY",
    paid: true,
  },
  {
    id: "anthropic",
    label: "Anthropic (Claude)",
    description: "Claude 3.5/4 — excelente para prompts mestres e textos longos.",
    models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"],
    freeTierHint: "Pago (créditos Anthropic)",
    envKey: "ANTHROPIC_API_KEY",
    paid: true,
  },
  {
    id: "gemini",
    label: "Google Gemini",
    description: "Gemini Flash/Pro — boa opção com cota free do Google AI Studio.",
    models: ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"],
    freeTierHint: "Free tier no Google AI Studio",
    envKey: "GEMINI_API_KEY",
    paid: false,
  },
];

export const AI_PROVIDER_STORAGE_KEY = "balcaoia_ai_provider";
