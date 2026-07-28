import type { AIProviderId } from "@/lib/config/ai-providers";
import { getAIProvider, type AIProvider as RuntimeProvider } from "@/lib/ai/provider";

/**
 * Orquestrador de IAs com fallback — compatível com o stack BalcãoIA atual.
 * Preferência por tarefa + degradação graceful até mock.
 */

export type AITaskKind = "long_content" | "sales_copy" | "fast" | "default";

const TASK_CHAIN: Record<AITaskKind, AIProviderId[]> = {
  long_content: ["gemini", "openai", "anthropic", "groq", "mock"],
  sales_copy: ["anthropic", "openai", "gemini", "groq", "mock"],
  fast: ["groq", "openai", "gemini", "anthropic", "mock"],
  default: ["groq", "openai", "anthropic", "gemini", "mock"],
};

async function tryProvider(id: string): Promise<RuntimeProvider | null> {
  try {
    const provider = await getAIProvider(id);
    if (id !== "mock" && !provider.isAvailable()) return null;
    return provider;
  } catch {
    return null;
  }
}

/** Resolve o melhor provider disponível para a tarefa. */
export async function resolveAIProvider(
  task: AITaskKind = "default",
  preferred?: string | null
): Promise<RuntimeProvider> {
  if (preferred) {
    const direct = await tryProvider(preferred);
    if (direct) return direct;
  }

  const envPreferred = process.env.AI_PROVIDER;
  if (envPreferred) {
    const fromEnv = await tryProvider(envPreferred);
    if (fromEnv) return fromEnv;
  }

  for (const id of TASK_CHAIN[task]) {
    const provider = await tryProvider(id);
    if (provider) return provider;
  }

  const { MockAIProvider } = await import("./mock-provider");
  return new MockAIProvider();
}

/** Gera texto com fallback automático se o provider falhar no meio. */
export async function generateWithFallback(
  prompt: string,
  systemPrompt: string,
  options: { task?: AITaskKind; preferred?: string | null } = {}
): Promise<{ content: string; modelUsed: string; warnings: string[] }> {
  const warnings: string[] = [];
  const chain = [
    ...(options.preferred ? [options.preferred] : []),
    ...TASK_CHAIN[options.task ?? "default"],
  ];
  const tried = new Set<string>();

  for (const id of chain) {
    if (tried.has(id)) continue;
    tried.add(id);
    const provider = await tryProvider(id);
    if (!provider) {
      warnings.push(`Provider ${id} indisponível.`);
      continue;
    }
    try {
      const content = await provider.generateText(prompt, systemPrompt);
      return { content, modelUsed: provider.name, warnings };
    } catch (error) {
      warnings.push(`Falha em ${provider.name}: ${String(error)}`);
    }
  }

  const { MockAIProvider } = await import("./mock-provider");
  const mock = new MockAIProvider();
  const content = await mock.generateText(prompt, systemPrompt);
  return {
    content,
    modelUsed: mock.name,
    warnings: [...warnings, "Usou mock após esgotar providers."],
  };
}
