import type { AssetType } from "@/types/database";

export interface AssetTypeMeta {
  type: AssetType;
  title: string;
  description: string;
}

/**
 * Lista compartilhada dos 14 tipos de ativos gerados pela IA.
 * Mantida em sincronia com os títulos de `lib/ai/generators/index.ts`,
 * mas isolada aqui para poder ser importada em Client Components sem
 * puxar os providers de IA (que só devem rodar no servidor).
 */
export const ASSET_TYPE_LIST: AssetTypeMeta[] = [
  {
    type: "profile_description",
    title: "Perfil Comercial",
    description: "Descrição curta e completa do negócio, pronta para bio e apresentações.",
  },
  {
    type: "catalog",
    title: "Catálogo Otimizado",
    description: "Produtos e serviços organizados com preços, benefícios e prazos.",
  },
  {
    type: "faq_knowledge_base",
    title: "Base de Conhecimento (FAQ)",
    description: "Perguntas frequentes organizadas por categoria para alimentar o agente.",
  },
  {
    type: "master_prompt",
    title: "Prompt Mestre",
    description: "Prompt completo para usar em ChatGPT, Claude ou Gemini.",
  },
  {
    type: "first_response_scripts",
    title: "Primeira Resposta",
    description: "Variações de mensagem de boas-vindas para o primeiro contato.",
  },
  {
    type: "qualification_scripts",
    title: "Roteiro de Qualificação",
    description: "Perguntas para entender a necessidade do cliente antes de vender.",
  },
  {
    type: "objection_scripts",
    title: "Scripts de Objeção",
    description: "Respostas prontas para as objeções mais comuns do seu público.",
  },
  {
    type: "followup_scripts",
    title: "Follow-ups",
    description: "Mensagens de retomada em 24h, 48h, 7 dias e opt-out.",
  },
  {
    type: "handoff_rules",
    title: "Regras de Handoff",
    description: "Quando e como transferir a conversa para um atendente humano.",
  },
  {
    type: "implementation_checklist",
    title: "Checklist de Implantação",
    description: "Passo a passo de 7 dias para colocar o atendimento no ar.",
  },
  {
    type: "freelancer_proposal",
    title: "Proposta (Freelancers/Agências)",
    description: "Modelo de proposta comercial para quem implanta para clientes.",
  },
  {
    type: "recommendation_scripts",
    title: "Scripts de Recomendação",
    description: "Como sugerir produtos/serviços com base na necessidade do cliente.",
  },
  {
    type: "implementation_plan",
    title: "Plano de Implantação 7D",
    description: "Plano estruturado para colocar o Método BalcãoIA 7D em prática.",
  },
  {
    type: "client_briefing",
    title: "Briefing do Cliente",
    description: "Resumo executivo do negócio, pronto para compartilhar com a equipe.",
  },
];

export function getAssetMeta(type: string): AssetTypeMeta | undefined {
  return ASSET_TYPE_LIST.find((a) => a.type === type);
}
