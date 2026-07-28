import type { WizardData } from "@/types/business";
import { GUARDRAILS, getAIProvider } from "../provider";

function pack(asset: string, data: WizardData): string {
  return `[ASSET:${asset}]\n[DATA]${JSON.stringify(data)}[/DATA]`;
}

async function run(asset: string, data: WizardData, systemExtra: string): Promise<string> {
  const provider = await getAIProvider(process.env.AI_PROVIDER);
  return provider.generateText(
    pack(asset, data),
    `${GUARDRAILS}\n${systemExtra}`
  );
}

export function generateBusinessProfileDescription(data: WizardData) {
  return run("profile", data, "Gere descrição de perfil comercial em Markdown.");
}

export function generateOptimizedCatalog(data: WizardData) {
  return run("catalog", data, "Gere catálogo otimizado em Markdown.");
}

export function generateFAQKnowledgeBase(data: WizardData) {
  return run("faq", data, "Gere base de conhecimento FAQ em Markdown.");
}

export function generateObjectionScripts(data: WizardData) {
  return run("objections", data, "Gere scripts de objeção em Markdown.");
}

export function generateMasterPrompt(data: WizardData) {
  return run("master", data, "Gere prompt mestre pronto para copiar.");
}

export function generateFirstResponseScripts(data: WizardData) {
  return run("first", data, "Gere 3 variações de primeira resposta.");
}

export function generateQualificationScripts(data: WizardData) {
  return run("qualification", data, "Gere roteiro de qualificação.");
}

export function generateFollowupScripts(data: WizardData) {
  return run("followup", data, "Gere follow-ups 24h, 48h, 7d e opt-out.");
}

export function generateImplementationChecklist(data: WizardData) {
  return run("checklist", data, "Gere checklist de implantação em 7 dias.");
}

export function generateFreelancerProposal(data: WizardData) {
  return run("proposal", data, "Gere proposta comercial para freelancers.");
}

export function generateHandoffRules(data: WizardData) {
  return run("handoff", data, "Gere regras de escalonamento humano.");
}

export function generateRecommendationScripts(data: WizardData) {
  return run("recommendation", data, "Gere scripts de recomendação.");
}

export function generateImplementationPlan(data: WizardData) {
  return run("plan", data, "Gere plano de implantação 7D.");
}

export function generateClientBriefing(data: WizardData) {
  return run("briefing", data, "Gere briefing do cliente.");
}

export const ASSET_GENERATORS = {
  profile_description: { title: "Perfil Comercial", fn: generateBusinessProfileDescription },
  catalog: { title: "Catálogo", fn: generateOptimizedCatalog },
  faq_knowledge_base: { title: "Base de Conhecimento (FAQ)", fn: generateFAQKnowledgeBase },
  objection_scripts: { title: "Scripts de Objeção", fn: generateObjectionScripts },
  master_prompt: { title: "Prompt Mestre", fn: generateMasterPrompt },
  first_response_scripts: { title: "Primeira Resposta", fn: generateFirstResponseScripts },
  qualification_scripts: { title: "Qualificação", fn: generateQualificationScripts },
  followup_scripts: { title: "Follow-ups", fn: generateFollowupScripts },
  implementation_checklist: { title: "Checklist de Implantação", fn: generateImplementationChecklist },
  freelancer_proposal: { title: "Proposta (Freelancers)", fn: generateFreelancerProposal },
  handoff_rules: { title: "Regras de Handoff", fn: generateHandoffRules },
  recommendation_scripts: { title: "Recomendação", fn: generateRecommendationScripts },
  implementation_plan: { title: "Plano 7D", fn: generateImplementationPlan },
  client_briefing: { title: "Briefing do Cliente", fn: generateClientBriefing },
} as const;
