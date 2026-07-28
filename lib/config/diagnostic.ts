/**
 * Diagnóstico do Atendimento — perguntas, pontuação e planos de ação.
 * Centralizado aqui para ser usado tanto em `/diagnostico` quanto em
 * `/resultado-diagnostico` sem duplicar conteúdo.
 */

export interface DiagnosticOption {
  value: 0 | 5 | 10;
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  order: number;
  category: string;
  question: string;
  help: string;
  options: DiagnosticOption[];
  /** Usado para montar o gargalo e a sugestão de ação quando a nota é baixa. */
  lowScoreTip: string;
}

const YES_NO_PARTIAL: DiagnosticOption[] = [
  { value: 0, label: "Não" },
  { value: 5, label: "Em parte" },
  { value: 10, label: "Sim" },
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "faq_padrao",
    order: 1,
    category: "Perguntas frequentes",
    question: "Você tem respostas padronizadas para as perguntas mais comuns dos clientes?",
    help: "Ex.: horário de funcionamento, formas de pagamento, prazo de entrega.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Liste as 10 perguntas que mais aparecem e escreva uma resposta padrão para cada uma.",
  },
  {
    id: "catalogo_organizado",
    order: 2,
    category: "Catálogo",
    question: "Seu catálogo de produtos ou serviços está organizado em um texto claro, com preços?",
    help: "Não precisa ser bonito — precisa ser fácil de copiar e enviar.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Organize produtos/serviços, preços e prazos em um documento único e sempre atualizado.",
  },
  {
    id: "tempo_resposta",
    order: 3,
    category: "Tempo de resposta",
    question: "Você mede quanto tempo leva para responder um cliente?",
    help: "Sem medir, é impossível saber se está rápido ou devagar demais.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Acompanhe por 7 dias o tempo entre a mensagem do cliente e sua resposta.",
  },
  {
    id: "followup_orcamento",
    order: 4,
    category: "Follow-up",
    question: "Você faz follow-up de orçamentos ou pedidos que ficaram sem resposta do cliente?",
    help: "Muita venda se perde só por falta de um retorno.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Crie mensagens de retomada para 24h, 48h e 7 dias após um orçamento sem resposta.",
  },
  {
    id: "objecoes_mapeadas",
    order: 5,
    category: "Objeções",
    question: "Você conhece as objeções que mais travam suas vendas e sabe como responder a elas?",
    help: "\u201cEstá caro\u201d e \u201cvou pensar\u201d são exemplos comuns.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Anote as 5 objeções mais comuns e escreva uma resposta testada para cada uma.",
  },
  {
    id: "politicas_claras",
    order: 6,
    category: "Políticas",
    question: "Sua política de preço, prazo, cancelamento e garantia está clara e por escrito?",
    help: "Evita mal-entendido e retrabalho na hora de fechar.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Escreva, em poucas linhas, sua política de preço, prazo, cancelamento e garantia.",
  },
  {
    id: "handoff_humano",
    order: 7,
    category: "Transferência humana",
    question: "Existe um processo claro de quando e como transferir a conversa para uma pessoa da equipe?",
    help: "Define o limite entre resposta padrão e atendimento personalizado.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Defina 3 situações em que a conversa deve ir direto para uma pessoa da equipe.",
  },
  {
    id: "organizacao_leads",
    order: 8,
    category: "Organização de leads",
    question: "Você usa etiquetas, CRM ou planilha para acompanhar os contatos que chegam?",
    help: "Sem isso, é fácil esquecer quem já foi respondido.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Crie uma planilha simples com nome, contato, interesse e status de cada lead.",
  },
  {
    id: "consentimento_ativo",
    order: 9,
    category: "Consentimento",
    question: "Você tem o consentimento do cliente antes de enviar comunicações ativas (promoções, lembretes)?",
    help: "Importante para respeitar a LGPD e evitar bloqueios/denúncias.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Adicione uma pergunta simples de consentimento no primeiro contato com o cliente.",
  },
  {
    id: "revisao_conversas",
    order: 10,
    category: "Melhoria contínua",
    question: "Você revisa conversas antigas para melhorar o atendimento?",
    help: "Aprender com o que já aconteceu evita repetir os mesmos erros.",
    options: YES_NO_PARTIAL,
    lowScoreTip:
      "Reserve 20 minutos por semana para reler conversas e anotar o que travou.",
  },
];

export const DIAGNOSTIC_MAX_SCORE = DIAGNOSTIC_QUESTIONS.length * 10;

export type DiagnosticAnswers = Record<string, number>;

export interface DiagnosticResult {
  id: string;
  answers: DiagnosticAnswers;
  score: number;
  name?: string;
  email?: string;
  createdAt: string;
}

export interface ScoreBand {
  id: string;
  min: number;
  max: number;
  label: string;
  description: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    id: "confuso",
    min: 0,
    max: 30,
    label: "Balcão confuso",
    description:
      "Seu atendimento hoje depende de improviso. Respostas variam de pessoa para pessoa e informações importantes não estão organizadas em nenhum lugar.",
  },
  {
    id: "parcial",
    min: 31,
    max: 60,
    label: "Balcão parcial",
    description:
      "Já existem algumas bases, mas ainda faltam padrão e consistência. Parte do atendimento funciona bem, parte ainda depende de memória e sorte.",
  },
  {
    id: "organizado",
    min: 61,
    max: 85,
    label: "Balcão organizado",
    description:
      "Seu atendimento já tem uma boa estrutura. Com pequenos ajustes de padronização e acompanhamento, fica ainda mais consistente.",
  },
  {
    id: "avancado",
    min: 86,
    max: 100,
    label: "Balcão avançado",
    description:
      "Seu atendimento está bem organizado, com processos claros e revisão contínua. O foco agora é manter o padrão e refinar os detalhes.",
  },
];

export function computeDiagnosticScore(answers: DiagnosticAnswers): number {
  const total = DIAGNOSTIC_QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  return Math.round((total / DIAGNOSTIC_MAX_SCORE) * 100);
}

export function getScoreBand(score: number): ScoreBand {
  const clamped = Math.min(100, Math.max(0, score));
  return (
    SCORE_BANDS.find((band) => clamped >= band.min && clamped <= band.max) ??
    SCORE_BANDS[0]
  );
}

export function getBottlenecks(
  answers: DiagnosticAnswers,
  limit = 3
): DiagnosticQuestion[] {
  return [...DIAGNOSTIC_QUESTIONS]
    .filter((q) => typeof answers[q.id] === "number")
    .sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0))
    .slice(0, limit);
}

export interface ActionPlanDay {
  day: number;
  title: string;
  description: string;
}

export function buildActionPlan(bottlenecks: DiagnosticQuestion[]): ActionPlanDay[] {
  const [first, second, third] = bottlenecks;

  return [
    {
      day: 1,
      title: "Escolha sua prioridade",
      description: first
        ? `Releia suas respostas e assuma "${first.category}" como o foco da semana: ${first.lowScoreTip}`
        : "Releia suas respostas do diagnóstico e escolha o ponto mais urgente para organizar essa semana.",
    },
    {
      day: 2,
      title: first ? `Organizar: ${first.category}` : "Organizar sua base de atendimento",
      description: first?.lowScoreTip ?? "Coloque no papel as informações que hoje só existem na sua cabeça.",
    },
    {
      day: 3,
      title: second ? `Organizar: ${second.category}` : "Padronizar respostas",
      description:
        second?.lowScoreTip ??
        "Reúna as respostas mais usadas em um documento único que qualquer pessoa da equipe possa seguir.",
    },
    {
      day: 4,
      title: third ? `Organizar: ${third.category}` : "Revisar objeções",
      description:
        third?.lowScoreTip ??
        "Anote as objeções mais comuns e prepare uma resposta clara para cada uma.",
    },
    {
      day: 5,
      title: "Alinhar com a equipe",
      description:
        "Compartilhe o material organizado com quem também atende, para que todo mundo responda pelo mesmo padrão.",
    },
    {
      day: 6,
      title: "Testar com conversas reais",
      description:
        "Use o material em pelo menos 5 atendimentos reais e anote onde ainda trava ou gera dúvida.",
    },
    {
      day: 7,
      title: "Revisar e ajustar",
      description:
        "Corrija os pontos que travaram nos testes e defina um dia fixo do mês para revisar tudo de novo.",
    },
  ];
}
