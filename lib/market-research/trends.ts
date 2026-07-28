/**
 * Catálogo de nichos e ideias de produto — pesquisa comercial 2026.
 * Compliance BalcãoIA: sem promessa de renda/resultados garantidos;
 * saúde/finanças são educativos (não aconselhamento profissional).
 */

export interface EbookIdea {
  slug: string;
  title: string;
  subtitle: string;
  promise: string;
  chapters: string[];
  price: number;
  suggestedAffiliate: number;
  bigIdea: string;
  painPoints: string[];
  benefits: string[];
  checkoutEnvKey?: string;
  alignedWithBalcaoia?: boolean;
}

export interface MarketNiche {
  id: string;
  name: string;
  category: string;
  avgTicket: number;
  competitionLevel: "baixa" | "media" | "alta";
  affiliateCommission: number;
  trendScore: number;
  searchVolume: string;
  problemSolved: string;
  targetAudience: string;
  keywords: string[];
  complianceNote: string;
  ebookIdeas: EbookIdea[];
}

export const TOP_NICHES_2026: MarketNiche[] = [
  {
    id: "negocio-local-ia",
    name: "Negócios Locais com IA",
    category: "Negócios e Empreendedorismo",
    avgTicket: 297,
    competitionLevel: "baixa",
    affiliateCommission: 50,
    trendScore: 10,
    searchVolume: "120.000/mês",
    problemSolved: "Organizar atendimento e usar IA com responsabilidade em negócios físicos",
    targetAudience: "Donos de negócios locais (salões, clínicas, lojas, serviços)",
    keywords: ["ia para negócios locais", "atendimento com ia", "whatsapp negócio local"],
    complianceNote:
      "Produto âncora BalcãoIA. Sem automação não oficial. Sem promessa de faturamento garantido.",
    ebookIdeas: [
      {
        slug: "negocio-local-ia",
        title: "Negócio Local na Era da IA",
        subtitle:
          "Como organizar atendimento e usar IA com segurança — sem programação e sem gambiarra",
        promise:
          "Um guia prático para donos de negócios locais organizarem catálogo, respostas e políticas — e usarem IA com revisão humana.",
        bigIdea:
          "IA sem organização só acelera a bagunça. Organização primeiro, ferramenta depois.",
        chapters: [
          "Por que IA sozinha não salva o atendimento",
          "Diagnóstico rápido do seu balcão",
          "Organizando catálogo, preços e políticas",
          "Roteiros de primeira resposta que não inventam",
          "Objeções comuns sem pressão indevida",
          "WhatsApp e Instagram com consentimento e LGPD",
          "O que NÃO fazer (automações proibidas)",
          "Treinando a equipe em 7 dias",
          "Checklist de qualidade antes de ir ao ar",
          "Próximos passos com o Método BalcãoIA 7D",
        ],
        price: 197,
        suggestedAffiliate: 50,
        alignedWithBalcaoia: true,
        checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_URL",
        painPoints: [
          "Cliente espera e some",
          "Cada atendente responde diferente",
          "Preço e política só estão na cabeça de alguém",
          "Medo de usar IA e errar com o cliente",
        ],
        benefits: [
          "Estrutura clara sem programar",
          "Scripts revisáveis pela equipe",
          "Compliance e disclaimers prontos",
          "Ponte para o Método 7D + Studio",
        ],
      },
    ],
  },
  {
    id: "ia-negocios",
    name: "IA Aplicada a Negócios",
    category: "Tecnologia e Negócios",
    avgTicket: 97,
    competitionLevel: "media",
    affiliateCommission: 50,
    trendScore: 9,
    searchVolume: "450.000/mês",
    problemSolved: "Usar IA no dia a dia profissional com método e ética",
    targetAudience: "Profissionais e empreendedores 25–45",
    keywords: ["ia para negócios", "chatgpt trabalho", "produtividade com ia"],
    complianceNote: "Educativo. Resultados variam. Sem renda garantida.",
    ebookIdeas: [
      {
        slug: "ia-aplicada-negocios",
        title: "IA Aplicada a Negócios",
        subtitle: "Método prático para usar IA no trabalho sem promessas milagrosas",
        promise:
          "Aprenda a estruturar prompts, processos e revisões humanas para usar IA com mais clareza no seu negócio.",
        bigIdea: "Quem organiza o contexto da IA trabalha melhor — sem atalhos mágicos.",
        chapters: [
          "O que a IA faz bem (e o que não faz)",
          "Montando seu kit de ferramentas",
          "Prompts com contexto de negócio",
          "Conteúdo com revisão humana",
          "Atendimento assistido (não robô cego)",
          "Organizando base de conhecimento",
          "Erros comuns de iniciantes",
          "Checklist ético e legal básico",
          "Rotina semanal de melhoria",
          "Plano de 30 dias realista",
        ],
        price: 97,
        suggestedAffiliate: 50,
        checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_URL_IA",
        painPoints: [
          "Não sabe por onde começar com IA",
          "Já tentou e as respostas saíram genéricas",
          "Medo de errar preço/política",
          "Falta de método",
        ],
        benefits: [
          "Método passo a passo",
          "Templates de prompt",
          "Checklist de revisão",
          "Foco em ética e clareza",
        ],
      },
    ],
  },
  {
    id: "financas",
    name: "Organização Financeira Pessoal",
    category: "Finanças",
    avgTicket: 67,
    competitionLevel: "alta",
    affiliateCommission: 40,
    trendScore: 8,
    searchVolume: "1.200.000/mês",
    problemSolved: "Organizar orçamento e reduzir dívidas com método (não aconselhamento financeiro)",
    targetAudience: "Pessoas querendo organizar finanças pessoais",
    keywords: ["organização financeira", "orçamento pessoal", "sair das dívidas"],
    complianceNote: "Conteúdo educativo. Não é consultoria financeira/investimento.",
    ebookIdeas: [
      {
        slug: "organizacao-financeira",
        title: "Organização Financeira na Prática",
        subtitle: "Método simples para mapear gastos, negociar e criar rotina (sem milagres)",
        promise:
          "Um sistema claro para entender suas contas, priorizar dívidas e criar hábitos — resultados dependem da sua execução.",
        bigIdea: "Clareza bate motivação: o que você mede, você melhora.",
        chapters: [
          "Diagnóstico honesto das suas contas",
          "Mapa de dívidas e prioridades",
          "Orçamento que cabe na vida real",
          "Negociação com respeito e registro",
          "Reserva mínima: o primeiro colchão",
          "Renda e despesas: separando o essencial",
          "Ferramentas simples (planilha + hábitos)",
          "Evitar armadilhas de crédito",
          "Revisão mensal em 30 minutos",
          "Plano de 12 semanas realista",
        ],
        price: 67,
        suggestedAffiliate: 40,
        checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_URL_FIN",
        painPoints: [
          "Fim do mês sempre apertado",
          "Não sabe por onde começar",
          "Dívidas espalhadas",
          "Falta de rotina financeira",
        ],
        benefits: [
          "Planilha-base",
          "Roteiros de negociação",
          "Checklist mensal",
          "Tom realista, sem milagre",
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Digital para Negócios Locais",
    category: "Marketing e Vendas",
    avgTicket: 127,
    competitionLevel: "alta",
    affiliateCommission: 50,
    trendScore: 8,
    searchVolume: "890.000/mês",
    problemSolved: "Atrair e converter clientes locais com orgânico e processos",
    targetAudience: "Empreendedores locais e freelancers",
    keywords: ["marketing local", "google meu negócio", "conteúdo para negócios"],
    complianceNote: "Sem garantia de vendas. Foco em processo e consistência.",
    ebookIdeas: [
      {
        slug: "marketing-local",
        title: "Marketing Local que Organiza",
        subtitle: "Presença digital, oferta clara e follow-up — sem depender só de anúncio",
        promise:
          "Estruture presença, mensagem e acompanhamento para seu negócio local com disciplina.",
        bigIdea: "Marketing fraco costuma ser oferta e processo fracos — não só ‘falta de tráfego’.",
        chapters: [
          "Oferta clara em uma frase",
          "Google Meu Negócio bem cuidado",
          "Conteúdo semanal sustentável",
          "WhatsApp com consentimento",
          "Funil simples: atração → conversa → fechamento",
          "Prova social ética",
          "Follow-up sem spam",
          "Métricas que importam",
          "Erros caros de iniciantes",
          "Plano de 60 dias",
        ],
        price: 127,
        suggestedAffiliate: 50,
        checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_URL_MKT",
        painPoints: [
          "Posta e ninguém responde",
          "Não sabe o que comunicar",
          "Depende só de indicação",
          "Sem processo de follow-up",
        ],
        benefits: [
          "Templates de posts",
          "Roteiros de mensagem",
          "Checklist de presença",
          "Alinhado ao atendimento BalcãoIA",
        ],
      },
    ],
  },
  {
    id: "produtividade",
    name: "Produtividade e Foco",
    category: "Desenvolvimento Pessoal",
    avgTicket: 47,
    competitionLevel: "media",
    affiliateCommission: 40,
    trendScore: 7,
    searchVolume: "650.000/mês",
    problemSolved: "Reduzir dispersão e criar rotina de foco",
    targetAudience: "Profissionais sobrecarregados",
    keywords: ["produtividade", "foco", "gestão do tempo"],
    complianceNote: "Hábitos variam por pessoa. Sem promessa milagrosa.",
    ebookIdeas: [
      {
        slug: "modo-foco",
        title: "Modo Foco",
        subtitle: "Sistema simples de blocos de tempo e revisão semanal",
        promise: "Organize sua semana em blocos realistas e reduza a sensação de ‘muito trabalho, pouco avanço’.",
        bigIdea: "Menos lista infinita, mais blocos protegidos.",
        chapters: [
          "Por que listas infinitas falham",
          "Blocos de tempo na prática",
          "Protegendo o foco profundo",
          "Distrações digitais",
          "Prioridade vs urgência",
          "Energia e sono (básico)",
          "Reuniões e mensagens",
          "IA para tarefas repetitivas (com revisão)",
          "Ritual de início e fim do dia",
          "Seu sistema em 14 dias",
        ],
        price: 47,
        suggestedAffiliate: 40,
        checkoutEnvKey: "NEXT_PUBLIC_HOTMART_CHECKOUT_URL_PRD",
        painPoints: [
          "Dia cheio e pouco resultado",
          "Procrastinação",
          "Notificações constantes",
          "Cansaço mental",
        ],
        benefits: ["Template de blocos", "Checklist diário", "Revisão semanal", "Tom realista"],
      },
    ],
  },
];

import { getVoid9AsEbookIdeas } from "./void9-portfolio";

export function getAllEbookIdeas(): Array<EbookIdea & { nicheName: string; nicheId: string }> {
  const fromNiches = TOP_NICHES_2026.flatMap((n) =>
    n.ebookIdeas.map((e) => ({ ...e, nicheName: n.name, nicheId: n.id }))
  );
  const void9 = getVoid9AsEbookIdeas();
  const seen = new Set(fromNiches.map((e) => e.slug));
  return [...fromNiches, ...void9.filter((e) => !seen.has(e.slug))];
}

export function getEbookBySlug(slug: string) {
  return getAllEbookIdeas().find((e) => e.slug === slug) ?? null;
}

export function getTopNiches(limit = 5): MarketNiche[] {
  return [...TOP_NICHES_2026].sort((a, b) => b.trendScore - a.trendScore).slice(0, limit);
}

export function getMostProfitableNiche(): MarketNiche {
  return [...TOP_NICHES_2026].sort(
    (a, b) => b.trendScore * b.avgTicket - a.trendScore * a.avgTicket
  )[0];
}
