import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { EXAMPLE_BEAUTY_SALON } from "@/types/business";
import { MockAIProvider } from "@/lib/ai/mock-provider";
import {
  ASSET_GENERATORS,
  generateBusinessProfileDescription,
  generateFAQKnowledgeBase,
  generateFollowupScripts,
  generateImplementationChecklist,
  generateMasterPrompt,
  generateObjectionScripts,
  generateOptimizedCatalog,
} from "@/lib/ai/generators";

describe("MockAIProvider", () => {
  const provider = new MockAIProvider();

  it("is always available", () => {
    expect(provider.isAvailable()).toBe(true);
  });

  it("generates a business profile referencing the example business name", async () => {
    const prompt = `[ASSET:profile]\n[DATA]${JSON.stringify(EXAMPLE_BEAUTY_SALON)}[/DATA]`;
    const result = await provider.generateText(prompt, "");
    expect(result).toContain(EXAMPLE_BEAUTY_SALON.basicInfo.name);
  });

  it("falls back to a generic response for unknown prompts", async () => {
    const result = await provider.generateText("mensagem qualquer sem marcador", "");
    expect(result).toContain("Resposta gerada (mock)");
  });

  it("responds to simulated messages about human handoff", async () => {
    const result = await provider.generateText("[SIMULATE]\nquero falar com um atendente humano", "");
    expect(result.toLowerCase()).toContain("equipe");
  });
});

describe("asset generators (mock provider)", () => {
  const originalProvider = process.env.AI_PROVIDER;

  beforeEach(() => {
    delete process.env.AI_PROVIDER;
  });

  afterEach(() => {
    if (originalProvider === undefined) delete process.env.AI_PROVIDER;
    else process.env.AI_PROVIDER = originalProvider;
  });

  it("generates a business profile description containing the business name", async () => {
    const result = await generateBusinessProfileDescription(EXAMPLE_BEAUTY_SALON);
    expect(result).toContain("Perfil Comercial");
    expect(result).toContain(EXAMPLE_BEAUTY_SALON.basicInfo.name);
  });

  it("generates an optimized catalog listing every registered product", async () => {
    const result = await generateOptimizedCatalog(EXAMPLE_BEAUTY_SALON);
    for (const product of EXAMPLE_BEAUTY_SALON.productsServices) {
      expect(result).toContain(product.name);
    }
  });

  it("generates a FAQ knowledge base", async () => {
    const result = await generateFAQKnowledgeBase(EXAMPLE_BEAUTY_SALON);
    expect(result).toContain("Base de Conhecimento");
    expect(result).toContain(EXAMPLE_BEAUTY_SALON.faqs[0].question);
  });

  it("generates objection scripts without guaranteeing results", async () => {
    const result = await generateObjectionScripts(EXAMPLE_BEAUTY_SALON);
    expect(result).toContain("Scripts de Objeção");
    expect(result.toLowerCase()).not.toContain("garantido");
  });

  it("generates a master prompt that includes the absolute guardrails", async () => {
    const result = await generateMasterPrompt(EXAMPLE_BEAUTY_SALON);
    expect(result).toContain("Regras absolutas");
    expect(result).toContain("Nunca prometa resultado garantido");
    expect(result).toContain("Nunca peça CPF, cartão ou senha");
  });

  it("generates follow-up scripts that always include an opt-out", async () => {
    const result = await generateFollowupScripts(EXAMPLE_BEAUTY_SALON);
    expect(result.toLowerCase()).toContain("sair");
  });

  it("generates a 7-day implementation checklist", async () => {
    const result = await generateImplementationChecklist(EXAMPLE_BEAUTY_SALON);
    expect(result).toContain("Dia 1");
    expect(result).toContain("Dia 7");
  });

  it("fills in [PREENCHER] placeholders instead of inventing data for empty businesses", async () => {
    const empty = {
      ...EXAMPLE_BEAUTY_SALON,
      productsServices: [],
      basicInfo: { ...EXAMPLE_BEAUTY_SALON.basicInfo, city: "" },
    };
    const result = await generateOptimizedCatalog(empty);
    expect(result).toContain("[PREENCHER]");
  });

  it("exposes exactly the 14 documented asset generators", () => {
    expect(Object.keys(ASSET_GENERATORS)).toHaveLength(14);
    expect(ASSET_GENERATORS.master_prompt.title).toBe("Prompt Mestre");
  });
});
