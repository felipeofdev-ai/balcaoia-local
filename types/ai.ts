import type { AssetType } from "./database";

export type { AIProvider, GenerationInput, GenerationOutput } from "@/lib/ai/provider";
export type { AssetType };

export type AIProviderName = "mock" | "openai" | "anthropic" | "gemini";

export interface AIGenerationRequest {
  businessId: string;
  assetType: AssetType;
  additionalContext?: string;
}

export interface AIGenerationResponse {
  content: string;
  title: string;
  modelUsed: string;
}

export interface SimulateRequest {
  businessId: string;
  message: string;
}

export interface SimulateResponse {
  reply: string;
  confidence: number;
  complianceAlerts: string[];
}
