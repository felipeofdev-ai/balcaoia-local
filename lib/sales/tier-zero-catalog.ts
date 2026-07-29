/**
 * Catálogo Tier Zero LOTE 1 — copy real a partir de void9/manifestos.
 * Sem depoimentos fictícios, sem métricas inventadas, sem promessa de renda.
 */
import { LOTE1_CHECKOUTS } from "@/lib/config/lote1-checkouts";
import type { TierZeroProduct } from "./tier-zero-types";

const PETROL = {
  primary: "#0F3D4A",
  secondary: "#145A6B",
  accent: "#F5A623",
  dark: "#0A2830",
} as const;

const TEAL = {
  primary: "#1A9B76",
  secondary: "#148564",
  accent: "#5EE4B5",
  dark: "#0A3328",
} as const;

const ROSE = {
  primary: "#C45C7A",
  secondary: "#A34864",
  accent: "#F0A8BC",
  dark: "#2A1520",
} as const;

const BLUE = {
  primary: "#3B7DD8",
  secondary: "#2F66B5",
  accent: "#9EC0F5",
  dark: "#0D2B4A",
} as const;

const AMBER = {
  primary: "#D97706",
  secondary: "#B45309",
  accent: "#FCD34D",
  dark: "#2A1A08",
} as const;

function ck(slug: string): string {
  return LOTE1_CHECKOUTS[slug] || "#";
}

function baseFaq(guaranteeDays: number): TierZeroProduct["faqs"] {
  return [
    {
      q: "Isso garante resultado financeiro ou vendas?",
      a: "Não. É material educativo. Resultados dependem da sua execução, contexto e disciplina. Não prometemos renda, lucro ou volume de vendas.",
    },
    {
      q: "Como recebo o acesso?",
      a: "Após a confirmação do pagamento na Hotmart, você recebe o acesso conforme a entrega configurada (arquivo digital / área de membros).",
    },
    {
      q: "Tem garantia?",
      a: `Sim. Garantia de ${guaranteeDays} dias conforme política Hotmart e do produto. Solicite reembolso pela própria Hotmart no prazo.`,
    },
    {
      q: "É oficial da Meta, WhatsApp, Google ou Hotmart?",
      a: "Não. BalcãoIA é independente. Nomes de marcas aparecem apenas de forma nominativa e educativa.",
    },
    {
      q: "Usa automação não oficial de WhatsApp?",
      a: "Não. Trabalhamos só com práticas éticas e, quando houver IA, com revisão humana. Sem Baileys, QR não oficial ou disparo em massa.",
    },
  ];
}

export const TIER_ZERO_CATALOG: Record<string, TierZeroProduct> = {
  "10-prompts-whatsapp-vendem": {
    slug: "10-prompts-whatsapp-vendem",
    icon: "💬",
    name: "10 Prompts WhatsApp que Vendem",
    tagline: "Copie, adapte e revise",
    badge: "Micro-guia prático",
    headline: "10 prompts para\nconversas de venda\nno WhatsApp",
    subheadline:
      "Estruturas prontas para adaptar ao seu tom de voz — sempre com revisão humana antes de enviar. Material educativo, sem promessa de vendas.",
    price: 9,
    anchorPrice: 37,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("10-prompts-whatsapp-vendem"),
    colors: TEAL,
    ctaText: "Quero os 10 prompts — R$ 9",
    socialProofLine: "Feito para negócios locais que querem organizar a conversa — sem spam.",
    finalCtaTitle: "Pronto para organizar suas respostas no WhatsApp?",
    coverSrc: "/mockups/10-prompts-whatsapp-vendem/social-cover.svg",
    problem: {
      title: "Antes dos prompts…",
      subtitle: "Situações comuns no atendimento solo",
      items: [
        "Trava na hora de escrever a primeira mensagem",
        "Copia texto genérico da internet que não soa como você",
        "Demora no follow-up e a conversa esfria",
        "Improvisa toda objeção de preço do zero",
      ],
    },
    solution: {
      title: "O que você recebe",
      description:
        "Dez prompts enxutos para gerar rascunhos de mensagem — você adapta, revisa e envia. Sem curso longo.",
      features: [
        {
          icon: "📋",
          title: "Uso imediato",
          desc: "Estruturas curtas para copiar e adaptar em minutos.",
        },
        {
          icon: "✍️",
          title: "Tom humano",
          desc: "Orientação para personalizar sem parecer robô ou panfleto.",
        },
        {
          icon: "🛡️",
          title: "Ética primeiro",
          desc: "Sem disparo em massa e sem gambiarra de WhatsApp.",
        },
        {
          icon: "⚡",
          title: "Micro-formato",
          desc: "Leitura rápida — foco em aplicar, não em teoria.",
        },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Como adaptar cada prompt",
        items: [
          "Preencher com dados reais do seu negócio",
          "Revisar tom e fatos antes de enviar",
          "Erros comuns ao copiar e colar",
        ],
      },
      {
        number: "02",
        title: "Os 10 prompts",
        items: [
          "Primeira resposta",
          "Apresentação de produto",
          "Objeção de preço",
          "Fechamento suave",
          "Follow-up ético",
          "Pós-venda",
        ],
      },
    ],
    bonuses: [
      {
        icon: "📎",
        title: "Checklist de revisão humana",
        description: "Passos rápidos antes de enviar qualquer mensagem gerada com apoio de prompt.",
        value: 17,
      },
    ],
    faqs: [
      ...baseFaq(7),
      {
        q: "Funciona para qualquer segmento?",
        a: "Os prompts são genéricos o bastante para adaptar a serviços e comércio local. Você personaliza nomes, preços e ofertas.",
      },
    ],
  },

  "checklist-ia-1-hora": {
    slug: "checklist-ia-1-hora",
    icon: "🤖",
    name: "Checklist IA no Negócio em 1 Hora",
    tagline: "Organização mínima antes da IA",
    badge: "Checklist executivo",
    headline: "Organize o mínimo\npara usar IA\nem 1 hora",
    subheadline:
      "Checklist enxuto para catálogo, política de atendimento e primeiro teste de prompt — sem curso longo e sem promessa milagrosa.",
    price: 7,
    anchorPrice: 27,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("checklist-ia-1-hora"),
    colors: PETROL,
    ctaText: "Quero o checklist — R$ 7",
    socialProofLine: "Para quem quer começar com IA sem bagunça operacional.",
    finalCtaTitle: "Pronto para a primeira hora com IA organizada?",
    coverSrc: "/mockups/checklist-ia-1-hora/social-cover.svg",
    problem: {
      title: "Por que a IA “não funciona” no início",
      subtitle: "Não é falta de ferramenta — é falta de base",
      items: [
        "Informação espalhada em vários lugares",
        "Não sabe o que perguntar à IA",
        "Medo de errar com o cliente",
        "Acha que precisa de curso longo antes de testar",
      ],
    },
    solution: {
      title: "Checklist de 1 hora",
      description: "Passos priorizados para deixar o mínimo viável pronto e testar com segurança.",
      features: [
        { icon: "⏱️", title: "60 minutos", desc: "Escopo fechado — não é um curso de 40 aulas." },
        { icon: "📁", title: "Base única", desc: "Catálogo e regras em um só lugar." },
        { icon: "🧪", title: "Primeiro teste", desc: "Prompt de teste com revisão humana." },
        { icon: "➡️", title: "Próximo passo", desc: "Ponte natural para BalcãoIA Pro." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Antes de abrir a IA",
        items: ["Catálogo e preços", "Política de atendimento em 5 linhas", "O que a IA não deve inventar"],
      },
      {
        number: "02",
        title: "Hora 1",
        items: ["Primeiro prompt de teste", "Checklist final", "Próximos passos"],
      },
    ],
    bonuses: [
      {
        icon: "✅",
        title: "Folha de registro do teste",
        description: "Espaço simples para anotar o que funcionou e o que revisar.",
        value: 12,
      },
    ],
    faqs: baseFaq(7),
  },

  "30-posts-prontos-ia": {
    slug: "30-posts-prontos-ia",
    icon: "📱",
    name: "30 Posts Prontos com IA",
    tagline: "Estruturas para adaptar",
    badge: "Pack de conteúdo",
    headline: "30 estruturas de post\npara adaptar ao\nseu negócio",
    subheadline:
      "Legendas e estruturas organizadas por objetivo — você adapta e revisa. Sem promessa de viralização ou engajamento garantido.",
    price: 12,
    anchorPrice: 47,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("30-posts-prontos-ia"),
    colors: ROSE,
    ctaText: "Quero as 30 estruturas — R$ 12",
    socialProofLine: "Para quem trava na página em branco do feed.",
    finalCtaTitle: "Pronto para ter estrutura de post esta semana?",
    coverSrc: "/mockups/30-posts-prontos-ia/social-cover.svg",
    problem: {
      title: "Se isso soa familiar…",
      subtitle: "Dor real de quem posta sozinho",
      items: [
        "Não sabe o que postar esta semana",
        "Texto de IA sai genérico",
        "Feed sem consistência",
        "Perde tempo começando do zero",
      ],
    },
    solution: {
      title: "Banco de estruturas",
      description: "Trinta estruturas claras — bastidores, prova ética e chamada — com checklist de revisão.",
      features: [
        { icon: "🧩", title: "Por objetivo", desc: "Organizado para não misturar tudo." },
        { icon: "✏️", title: "Adaptável", desc: "Espaço para o seu nicho e tom." },
        { icon: "🔍", title: "Revisão", desc: "Checklist antes de publicar." },
        { icon: "🚫", title: "Sem viral fake", desc: "Não prometemos alcance." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Como adaptar",
        items: ["Trocar exemplos pelo seu negócio", "Ajustar CTA local", "Checklist pré-publicação"],
      },
      {
        number: "02",
        title: "Os 30 posts",
        items: ["10 bastidores", "10 prova social ética", "10 oferta e chamada"],
      },
    ],
    bonuses: [
      {
        icon: "📌",
        title: "Mini-guia de erros de IA em conteúdo",
        description: "Armadilhas comuns ao publicar texto gerado sem revisão.",
        value: 15,
      },
    ],
    faqs: baseFaq(7),
  },

  "template-atendimento-automatico": {
    slug: "template-atendimento-automatico",
    icon: "⚡",
    name: "Template Atendimento Automático Ético",
    tagline: "Padrão sem robô arriscado",
    badge: "Template profissional",
    headline: "Padronize respostas\nsem automação\nnão oficial",
    subheadline:
      "Templates de triagem e primeira resposta para organizar o atendimento — sem Baileys, sem QR duvidoso, sem parecer robô enganoso.",
    price: 14,
    anchorPrice: 57,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("template-atendimento-automatico"),
    colors: TEAL,
    ctaText: "Quero o template — R$ 14",
    socialProofLine: "Para quem quer padrão de resposta sem gambiarra.",
    finalCtaTitle: "Pronto para padronizar o atendimento?",
    coverSrc: "/mockups/template-atendimento-automatico/social-cover.svg",
    problem: {
      title: "Atendimento inconsistente custa confiança",
      subtitle: "Sinais de que falta padrão",
      items: [
        "Cada pessoa responde de um jeito",
        "Medo de robô e bloqueio",
        "Demora no básico (horário, preço, endereço)",
        "Novo atendente sem roteiro",
      ],
    },
    solution: {
      title: "Fluxo de triagem ético",
      description: "Mapa simples + templates escritos — humano no comando.",
      features: [
        { icon: "🗺️", title: "Triagem", desc: "Separar tipos de pergunta." },
        { icon: "📝", title: "Templates", desc: "Primeira resposta e encaminhamento." },
        { icon: "🛡️", title: "Sem gambiarra", desc: "Só práticas oficiais/éticas." },
        { icon: "👥", title: "Treino fácil", desc: "Onboarding de equipe enxuta." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Por que evitar automação arriscada",
        items: ["Riscos de conta", "Diferença entre resposta rápida e robô enganoso"],
      },
      {
        number: "02",
        title: "Templates",
        items: ["Primeira resposta", "Horário", "Encaminhamento", "Checklist da equipe"],
      },
    ],
    bonuses: [
      {
        icon: "🧾",
        title: "Checklist de revisão da equipe",
        description: "Itens para alinhar tom e informações antes de ir ao ar.",
        value: 19,
      },
    ],
    faqs: baseFaq(7),
  },

  "mini-guia-gmn-30min": {
    slug: "mini-guia-gmn-30min",
    icon: "🗺️",
    name: "Mini-Guia Google Meu Negócio 30 min",
    tagline: "Ajustes de maior impacto",
    badge: "Guia rápido",
    headline: "Ajuste o perfil\ndo Google em\ncerca de 30 min",
    subheadline:
      "Os 5 ajustes priorizados do Google Meu Negócio — sem prometer primeira posição no Maps.",
    price: 9,
    anchorPrice: 37,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("mini-guia-gmn-30min"),
    colors: BLUE,
    ctaText: "Quero o guia — R$ 9",
    socialProofLine: "Para quem tem pouco tempo e perfil abandonado.",
    finalCtaTitle: "Pronto para os 5 ajustes de maior impacto?",
    coverSrc: "/mockups/mini-guia-gmn-30min/social-cover.svg",
    problem: {
      title: "Perfil incompleto = oportunidade perdida",
      subtitle: "Sem milagre de ranking",
      items: [
        "Perfil desatualizado há meses",
        "Não sabe o que priorizar",
        "Pouco tempo disponível",
        "Acha que precisa mexer em tudo de uma vez",
      ],
    },
    solution: {
      title: "Ajuste rápido GMN",
      description: "Checklist focado nos pontos que costumam importar mais no dia a dia local.",
      features: [
        { icon: "5️⃣", title: "5 ajustes", desc: "Prioridade por impacto." },
        { icon: "⏱️", title: "~30 min", desc: "Escopo realista." },
        { icon: "📍", title: "Local", desc: "Pensado em negócio de bairro/cidade." },
        { icon: "🔗", title: "Ponte", desc: "Caminho para o Masterclass." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Os 5 ajustes",
        items: ["Categoria", "Fotos", "Horário", "Contato", "Checklist final"],
      },
    ],
    bonuses: [
      {
        icon: "📅",
        title: "Lembrete de revisão mensal",
        description: "Lista curta do que checar todo mês.",
        value: 12,
      },
    ],
    faqs: [
      ...baseFaq(7),
      {
        q: "Vou aparecer em 1º no Google?",
        a: "Não prometemos posição. O guia ajuda a completar e manter o perfil — ranking depende de muitos fatores.",
      },
    ],
  },

  "20-legendas-instagram": {
    slug: "20-legendas-instagram",
    icon: "✍️",
    name: "20 Legendas Instagram Prontas",
    tagline: "Por segmento local",
    badge: "Pack de legendas",
    headline: "20 legendas\npara adaptar\nao seu segmento",
    subheadline:
      "Legendas com CTA claro — adapte o tom. Não são garantia de engajamento.",
    price: 7,
    anchorPrice: 27,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("20-legendas-instagram"),
    colors: ROSE,
    ctaText: "Quero as legendas — R$ 7",
    socialProofLine: "Para quem trava no texto da legenda.",
    finalCtaTitle: "Pronto para adaptar legendas esta semana?",
    coverSrc: "/mockups/20-legendas-instagram/social-cover.svg",
    problem: {
      title: "Legenda genérica não conecta",
      subtitle: "O texto importa tanto quanto a imagem",
      items: [
        "Não sabe o que escrever",
        "Texto genérico não soa local",
        "Perde tempo pensando no CTA",
        "Falta identidade no que escreve",
      ],
    },
    solution: {
      title: "Banco por segmento",
      description: "Vinte legendas organizadas para adaptar — com checklist.",
      features: [
        { icon: "🏷️", title: "Por segmento", desc: "Ponto de partida local." },
        { icon: "📣", title: "CTAs claros", desc: "Próximo passo explícito." },
        { icon: "✅", title: "Revisão", desc: "Checklist rápido." },
        { icon: "⚡", title: "Uso imediato", desc: "Sem curso longo." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Como adaptar",
        items: ["Trocar exemplos", "Ajustar CTA", "Checklist"],
      },
      {
        number: "02",
        title: "As 20 legendas",
        items: ["Bastidores", "Prova ética", "Oferta"],
      },
    ],
    bonuses: [
      {
        icon: "🔤",
        title: "Lista de verbos de CTA",
        description: "Verbos claros para fechar a legenda sem pressão exagerada.",
        value: 9,
      },
    ],
    faqs: baseFaq(7),
  },

  "calculadora-preco-rapida": {
    slug: "calculadora-preco-rapida",
    icon: "💰",
    name: "Calculadora de Preço Rápida",
    tagline: "Custo + margem (educativo)",
    badge: "Ferramenta educativa",
    headline: "Precifique com\nclareza de custo\ne margem",
    subheadline:
      "Planilha/guia para preço mínimo viável — não é consultoria financeira nem promessa de lucro.",
    price: 9,
    anchorPrice: 37,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("calculadora-preco-rapida"),
    colors: AMBER,
    ctaText: "Quero a calculadora — R$ 9",
    socialProofLine: "Para quem precifica no achismo e quer enxergar a conta.",
    finalCtaTitle: "Pronto para ver o preço com mais clareza?",
    coverSrc: "/mockups/calculadora-preco-rapida/social-cover.svg",
    problem: {
      title: "Preço no chute é aposta",
      subtitle: "Sinais de alerta",
      items: [
        "Precifica só olhando o concorrente",
        "Não sabe se a margem cobre o tempo",
        "Nunca revisou o preço",
        "Confunde faturamento com lucro",
      ],
    },
    solution: {
      title: "Planilha custo + margem",
      description: "Passo a passo educativo para enxergar o mínimo viável.",
      features: [
        { icon: "🧮", title: "Cálculo simples", desc: "Sem planilha de 40 abas." },
        { icon: "📊", title: "Margem visível", desc: "Ver o que sobra." },
        { icon: "🔁", title: "Revisão", desc: "Rotina periódica." },
        { icon: "📚", title: "Educativo", desc: "Não substitui contador." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Formação de preço",
        items: ["Custos reais", "Margem mínima", "Uso da planilha", "Revisão"],
      },
    ],
    bonuses: [
      {
        icon: "🗒️",
        title: "Lista de custos esquecidos",
        description: "Itens que costumam ficar de fora do preço.",
        value: 14,
      },
    ],
    faqs: [
      ...baseFaq(7),
      {
        q: "Isso substitui um contador?",
        a: "Não. É material educativo para clareza operacional. Decisões fiscais e financeiras devem ser validadas com profissional.",
      },
    ],
  },

  "15-ideias-reels-segmento": {
    slug: "15-ideias-reels-segmento",
    icon: "🎬",
    name: "15 Ideias de Reels para Negócios Locais",
    tagline: "Roteiros curtos no celular",
    badge: "Roteiros prontos",
    headline: "15 roteiros de Reels\npara gravar no\ncelular",
    subheadline:
      "Cena a cena, por segmento — sem promessa de viralização. Grave, adapte, publique.",
    price: 7,
    anchorPrice: 27,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("15-ideias-reels-segmento"),
    colors: ROSE,
    ctaText: "Quero os roteiros — R$ 7",
    socialProofLine: "Para quem trava na hora de apertar gravar.",
    finalCtaTitle: "Pronto para gravar o primeiro roteiro?",
    coverSrc: "/mockups/15-ideias-reels-segmento/social-cover.svg",
    problem: {
      title: "Bloqueio de gravação",
      subtitle: "O celular está na mão — falta o roteiro",
      items: [
        "Não sabe o que falar",
        "Acha que precisa de equipamento caro",
        "Sem tempo para planejar",
        "Começa e trava no meio",
      ],
    },
    solution: {
      title: "Banco de roteiros",
      description: "Quinze ideias cena a cena, com checklist simples de gravação.",
      features: [
        { icon: "📱", title: "Só o celular", desc: "Sem estúdio." },
        { icon: "📜", title: "Roteiro", desc: "O que falar em cada parte." },
        { icon: "🏷️", title: "Por segmento", desc: "Adapte ao seu tipo." },
        { icon: "🚫", title: "Sem viral fake", desc: "Sem promessa de views." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Como gravar",
        items: ["Checklist", "Luz e áudio básico", "Como adaptar"],
      },
      {
        number: "02",
        title: "Os 15 roteiros",
        items: ["Bastidores", "Dica rápida", "Antes/depois ético"],
      },
    ],
    bonuses: [
      {
        icon: "🎙️",
        title: "Gancho de abertura (lista)",
        description: "Frases curtas para começar o Reel sem enrolação.",
        value: 9,
      },
    ],
    faqs: baseFaq(7),
  },

  "template-bio-instagram": {
    slug: "template-bio-instagram",
    icon: "✨",
    name: "Template Bio Instagram Perfeita",
    tagline: "Clareza em minutos",
    badge: "Template estratégico",
    headline: "Bio clara:\no que você faz\ne o próximo passo",
    subheadline:
      "Estrutura para escrever a bio do Instagram do negócio local — sem milagre de conversão garantida.",
    price: 7,
    anchorPrice: 27,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("template-bio-instagram"),
    colors: ROSE,
    ctaText: "Quero o template — R$ 7",
    socialProofLine: "Para quem tem bio vazia ou confusa.",
    finalCtaTitle: "Pronto para reescrever a bio?",
    coverSrc: "/mockups/template-bio-instagram/social-cover.svg",
    problem: {
      title: "Bio confusa perde visita",
      subtitle: "Antes do primeiro post, a bio fala por você",
      items: [
        "Bio genérica ou vazia",
        "Visitante não entende o que você faz",
        "Não sabe o que colocar no link",
        "Nunca revisou desde que criou o perfil",
      ],
    },
    solution: {
      title: "Estrutura de bio clara",
      description: "Quatro elementos + exemplos por tipo de negócio + checklist.",
      features: [
        { icon: "🧩", title: "Fórmula", desc: "O quê · para quem · próximo passo." },
        { icon: "📍", title: "Exemplos locais", desc: "Adaptáveis." },
        { icon: "🔗", title: "Link", desc: "Orientação simples." },
        { icon: "✅", title: "Checklist", desc: "Antes de publicar." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Os 4 elementos",
        items: ["Promessa clara", "Público", "Prova/credencial ética", "CTA/link"],
      },
    ],
    bonuses: [
      {
        icon: "🧪",
        title: "Exemplos extras por segmento",
        description: "Variações curtas para copiar a estrutura.",
        value: 12,
      },
    ],
    faqs: baseFaq(7),
  },

  "pack-50-hashtags-nicho": {
    slug: "pack-50-hashtags-nicho",
    icon: "#",
    name: "Pack 50 Hashtags por Nicho",
    tagline: "Ponto de partida — teste",
    badge: "Banco de hashtags",
    headline: "50 hashtags\norganizadas\npor nicho local",
    subheadline:
      "Listas para testar e rotacionar — sem promessa de alcance ou engajamento garantido.",
    price: 7,
    anchorPrice: 27,
    installments: 1,
    guaranteeDays: 7,
    checkoutUrl: ck("pack-50-hashtags-nicho"),
    colors: ROSE,
    ctaText: "Quero o pack — R$ 7",
    socialProofLine: "Para quem só usa as mesmas hashtags genéricas.",
    finalCtaTitle: "Pronto para testar hashtags por nicho?",
    coverSrc: "/mockups/pack-50-hashtags-nicho/social-cover.svg",
    problem: {
      title: "Hashtag genérica não é estratégia",
      subtitle: "Comece organizado — depois meça",
      items: [
        "Sempre as mesmas tags genéricas",
        "Não sabe o que testar no nicho",
        "Acha que hashtag sozinha resolve alcance",
        "Nunca rotacionou combinações",
      ],
    },
    solution: {
      title: "Curadoria por nicho",
      description: "Cinquenta hashtags agrupadas + orientação de teste.",
      features: [
        { icon: "📚", title: "Por nicho", desc: "Serviços, varejo, bem-estar educativo." },
        { icon: "🔁", title: "Rotação", desc: "Ideia de teste simples." },
        { icon: "🚫", title: "Sem milagre", desc: "Sem promessa de alcance." },
        { icon: "⚡", title: "Copiar/colar", desc: "Uso imediato." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Como escolher e testar",
        items: ["Listas", "Combinações", "Revisão de desempenho"],
      },
    ],
    bonuses: [
      {
        icon: "📝",
        title: "Folha de teste de 7 dias",
        description: "Anotar combinações e o que observou (sem métrica inventada).",
        value: 9,
      },
    ],
    faqs: baseFaq(7),
  },

  "whatsapp-etico-negocios": {
    slug: "whatsapp-etico-negocios",
    icon: "📲",
    name: "WhatsApp Ético — Vendas Sem Spam",
    tagline: "Protocolo de conversa ética",
    badge: "Método completo",
    headline: "Vender no WhatsApp\nsem spam e sem\ngambiarra",
    subheadline:
      "Protocolo de consentimento, contexto e continuidade — templates éticos e follow-up sem pressão. Material educativo, sem promessa de vendas.",
    price: 67,
    anchorPrice: 197,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("whatsapp-etico-negocios"),
    colors: TEAL,
    ctaText: "Quero o método — R$ 67",
    socialProofLine: "Para negócios locais que querem conversar com ética e clareza.",
    finalCtaTitle: "Pronto para um WhatsApp mais profissional?",
    coverSrc: "/mockups/whatsapp-etico-negocios/social-cover.svg",
    problem: {
      title: "Você reconhece alguma dessas situações?",
      subtitle: "Se sim, este material foi pensado para o seu contexto",
      items: [
        "Manda mensagem e a conversa some",
        "Medo de incomodar e acaba não fazendo follow-up",
        "Medo de bloqueio / spam",
        "Não sabe o timing entre mensagens",
        "Respostas inconsistentes na equipe",
        "WhatsApp parece panfleto, não conversa",
      ],
    },
    solution: {
      title: "Protocolo 3C ético",
      description:
        "Consentimento → Contexto → Continuidade. Templates e regras claras alinhadas ao uso responsável do WhatsApp Business.",
      features: [
        {
          icon: "🎯",
          title: "Negócio local",
          desc: "Linguagem e exemplos da operação brasileira do dia a dia.",
        },
        {
          icon: "🛡️",
          title: "Ético e seguro",
          desc: "Sem disparo em massa e sem automação não oficial.",
        },
        {
          icon: "📝",
          title: "Templates",
          desc: "Modelos para adaptar — sempre com revisão humana.",
        },
        {
          icon: "⏱️",
          title: "Follow-up",
          desc: "Estrutura de toques sem pressão artificial.",
        },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Fundamentos",
        items: ["Spam vs valor", "Configuração Business", "Perfil que gera confiança"],
      },
      {
        number: "02",
        title: "Templates",
        items: ["Primeiro contato", "Apresentação", "Follow-up", "Fechamento", "Reativação"],
      },
      {
        number: "03",
        title: "Protocolo de toques",
        items: ["Lógica dos contatos", "Timing", "Personalização", "Quando parar"],
      },
      {
        number: "04",
        title: "Recursos oficiais / IA assistida",
        items: ["Boas práticas Meta/WhatsApp Business", "IA com revisão humana", "Limites éticos"],
      },
    ],
    bonuses: [
      {
        icon: "📚",
        title: "Biblioteca de mensagens por segmento (referência)",
        description: "Ideias de mensagem para adaptar — não são scripts milagrosos.",
        value: 97,
      },
      {
        icon: "📅",
        title: "Calendário de contato 30 dias (educativo)",
        description: "Sugestão de ritmo — ajuste à sua realidade e ao consentimento.",
        value: 67,
      },
      {
        icon: "🛡️",
        title: "Checklist anti-spam / boas práticas",
        description: "Pontos de verificação para uso responsável.",
        value: 47,
      },
    ],
    faqs: [
      ...baseFaq(30),
      {
        q: "Preciso de ferramenta paga?",
        a: "Não. O foco é WhatsApp Business e práticas que você aplica com revisão humana.",
      },
    ],
  },

  "checklist-atendimento-local": {
    slug: "checklist-atendimento-local",
    icon: "🧠",
    name: "BalcãoIA Pro — Atendimento com IA",
    tagline: "IA assistida, humano no comando",
    badge: "Sistema avançado",
    headline: "Atendimento com IA\nético, simples e\nsem programar",
    subheadline:
      "Prompts, triagem e follow-up assistido para negócio local — sempre com revisão humana. Sem gambiarra de WhatsApp.",
    price: 97,
    anchorPrice: 297,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("checklist-atendimento-local"),
    colors: PETROL,
    ctaText: "Quero o BalcãoIA Pro — R$ 97",
    socialProofLine: "Para quem quer padronizar atendimento com apoio de IA.",
    finalCtaTitle: "Pronto para atendimento assistido com método?",
    coverSrc: "/mockups/checklist-atendimento-local/social-cover.svg",
    problem: {
      title: "Atendimento lento e sem padrão?",
      subtitle: "A IA não resolve bagunça — organiza o que já existe",
      items: [
        "Tudo na mão, nada documentado",
        "Mesmas perguntas o dia inteiro",
        "Medo de IA inventar informação",
        "Acha que precisa programar",
        "Não sabe por onde começar",
      ],
    },
    solution: {
      title: "Atendimento IA assistido",
      description: "Prompts + triagem + follow-up ético — humano decide o que vai ao cliente.",
      features: [
        { icon: "🤖", title: "Prompts prontos", desc: "Para adaptar ao seu catálogo." },
        { icon: "🔀", title: "Triagem", desc: "Separar o que é automático do que é humano." },
        { icon: "🧩", title: "Sem código", desc: "Fluxos simples e oficiais." },
        { icon: "🛡️", title: "Compliance", desc: "Sem automação não oficial." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Fundamentos",
        items: ["O que a IA faz bem", "Onde erra", "Revisão humana"],
      },
      {
        number: "02",
        title: "WhatsApp Business",
        items: ["Configuração ética", "Respostas rápidas", "Limites"],
      },
      {
        number: "03",
        title: "Prompts e triagem",
        items: ["Biblioteca de prompts", "Fluxogramas", "Follow-up"],
      },
      {
        number: "04",
        title: "Escala com cuidado",
        items: ["Ferramentas", "Registro", "Erros comuns"],
      },
    ],
    bonuses: [
      {
        icon: "📋",
        title: "Checklist IA em 1 hora (ponte)",
        description: "Base mínima operacional antes de escalar prompts.",
        value: 37,
      },
      {
        icon: "🗺️",
        title: "Templates de fluxo de atendimento",
        description: "Mapas simples para copiar e adaptar.",
        value: 47,
      },
      {
        icon: "🧰",
        title: "Guia de ferramentas (educativo)",
        description: "Opções com foco em uso ético e revisão humana.",
        value: 27,
      },
    ],
    faqs: [
      ...baseFaq(30),
      {
        q: "Preciso programar?",
        a: "Não. O material é orientado a prompts e processos — sem desenvolvimento de software.",
      },
    ],
  },

  "foco-14": {
    slug: "foco-14",
    icon: "🎯",
    name: "FOCO 14 — Método de Foco Profissional",
    tagline: "14 dias com evidência diária",
    badge: "Programa de 14 dias",
    headline: "14 dias para\neliminar distrações\ne fechar com evidência",
    subheadline:
      "Protocolo prático de foco para empreendedor solo — sem virar monge e sem promessa milagrosa de produtividade.",
    price: 47,
    anchorPrice: 147,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("foco-14"),
    colors: BLUE,
    ctaText: "Quero o FOCO 14 — R$ 47",
    socialProofLine: "Para quem termina o dia cheio e sem evidência do que avançou.",
    finalCtaTitle: "Pronto para 14 dias de prática com evidência?",
    coverSrc: "/mockups/foco-14/social-cover.svg",
    problem: {
      title: "Dia cheio, pouca evidência",
      subtitle: "O problema não é só ‘falta de disciplina’",
      items: [
        "WhatsApp derruba qualquer bloco de foco",
        "Lista infinita sem prioridade",
        "Culpa noturna sem fechamento",
        "Troca de contexto o dia inteiro",
      ],
    },
    solution: {
      title: "Método B.A.L.C.ÃO Foco",
      description: "Bloqueio, agenda, lista 3, check-out, âncora e output — em 14 dias de prática.",
      features: [
        { icon: "📅", title: "14 dias", desc: "Protocolo dia a dia." },
        { icon: "🔒", title: "Janelas reais", desc: "Blocos realistas, não heroísmo." },
        { icon: "✅", title: "Check-out", desc: "Fechar o dia com evidência." },
        { icon: "🛠️", title: "Ferramentas", desc: "Planner e checklists." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Diagnóstico",
        items: ["Inimigos do foco", "Mapa de distrações", "Dias 1–3"],
      },
      {
        number: "02",
        title: "Estrutura",
        items: ["Agenda", "Lista 3", "Dias 4–7"],
      },
      {
        number: "03",
        title: "Prática",
        items: ["Blocos", "Âncoras", "Dias 8–11"],
      },
      {
        number: "04",
        title: "Consolidação",
        items: ["Manutenção", "Dias 12–14", "Recursos"],
      },
    ],
    bonuses: [
      {
        icon: "📓",
        title: "Planner FOCO 14 (referência)",
        description: "Estrutura de planner para acompanhar os 14 dias.",
        value: 27,
      },
      {
        icon: "✅",
        title: "Checklist diário",
        description: "Fechamento rápido do dia com evidência.",
        value: 17,
      },
    ],
    faqs: baseFaq(30),
  },

  "chatgpt-empreendedores": {
    slug: "chatgpt-empreendedores",
    icon: "💡",
    name: "ChatGPT para Empreendedores",
    tagline: "Prompts com contexto de negócio",
    badge: "Guia + prompts",
    headline: "Prompts com contexto\nreal do seu negócio\n(e revisão humana)",
    subheadline:
      "Método de prompt com contexto para atendimento, conteúdo e organização — sem deixar a IA inventar sozinha.",
    price: 57,
    anchorPrice: 177,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("chatgpt-empreendedores"),
    colors: PETROL,
    ctaText: "Quero o guia — R$ 57",
    socialProofLine: "Para quem já usa ChatGPT e recebe resposta genérica.",
    finalCtaTitle: "Pronto para prompts com contexto de negócio?",
    coverSrc: "/mockups/chatgpt-empreendedores/social-cover.svg",
    problem: {
      title: "Resposta genérica não serve",
      subtitle: "O problema costuma ser o prompt, não a ferramenta",
      items: [
        "Respostas que não servem ao seu negócio",
        "Não sabe o que perguntar",
        "Reescreve tudo do zero",
        "Medo de informação inventada",
      ],
    },
    solution: {
      title: "Prompt com Contexto (PCC)",
      description: "Estrutura + prompts por área + checklist de revisão antes de usar.",
      features: [
        { icon: "🧱", title: "Estrutura", desc: "Contexto vence prompt vago." },
        { icon: "📦", title: "Por área", desc: "Atendimento, conteúdo, organização." },
        { icon: "✅", title: "Revisão", desc: "Checklist humano." },
        { icon: "📅", title: "Rotina", desc: "Uso semanal sustentável." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Fundamentos",
        items: ["O que faz bem", "Onde erra", "Estrutura de prompt"],
      },
      {
        number: "02",
        title: "Prompts por área",
        items: ["Atendimento", "Conteúdo", "Planejamento"],
      },
      {
        number: "03",
        title: "Rotina",
        items: ["Checklist", "Erros comuns", "Uso semanal"],
      },
    ],
    bonuses: [
      {
        icon: "📚",
        title: "Biblioteca extra de prompts (referência)",
        description: "Variações para adaptar — sempre revise fatos.",
        value: 27,
      },
    ],
    faqs: baseFaq(30),
  },

  "instagram-negocios-locais-ia": {
    slug: "instagram-negocios-locais-ia",
    icon: "📸",
    name: "Instagram para Negócios Locais com IA",
    tagline: "Rotina com revisão humana",
    badge: "Masterclass",
    headline: "Rotina de conteúdo\npara Instagram local\ncom apoio de IA",
    subheadline:
      "Pilares, ideias, legendas e calendário — IA gera rascunho, você revisa. Sem promessa de crescimento garantido.",
    price: 77,
    anchorPrice: 247,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("instagram-negocios-locais-ia"),
    colors: ROSE,
    ctaText: "Quero a masterclass — R$ 77",
    socialProofLine: "Para negócios locais que postam sem estratégia.",
    finalCtaTitle: "Pronto para uma rotina de conteúdo sustentável?",
    coverSrc: "/mockups/instagram-negocios-locais-ia/social-cover.svg",
    problem: {
      title: "Postar sem estratégia cansa",
      subtitle: "Consistência vence criatividade esporádica",
      items: [
        "Posta e ninguém responde",
        "Falta ideia toda semana",
        "Não sabe onde a IA ajuda de verdade",
        "Feed sem identidade",
      ],
    },
    solution: {
      title: "Rotina de conteúdo assistido",
      description: "Diagnóstico, pilares, IA para rascunhos, métricas que importam e plano de 30 dias.",
      features: [
        { icon: "🏛️", title: "Pilares", desc: "Conteúdo com direção." },
        { icon: "💡", title: "Ideias com IA", desc: "Rascunho + revisão." },
        { icon: "📅", title: "Calendário", desc: "Rotina simples." },
        { icon: "📊", title: "Métricas reais", desc: "O que observar sem obsessão." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Diagnóstico e pilares",
        items: ["Estado atual", "Pilares", "Identidade"],
      },
      {
        number: "02",
        title: "IA e produção",
        items: ["Ideias", "Legendas", "Stories/Reels"],
      },
      {
        number: "03",
        title: "Rotina e métricas",
        items: ["Calendário", "Métricas", "Plano 30 dias"],
      },
    ],
    bonuses: [
      {
        icon: "💡",
        title: "Banco de ideias (referência)",
        description: "Lista para destravar a semana — adapte ao seu nicho.",
        value: 27,
      },
    ],
    faqs: baseFaq(30),
  },

  "google-meu-negocio-masterclass": {
    slug: "google-meu-negocio-masterclass",
    icon: "🗺️",
    name: "Google Meu Negócio Masterclass",
    tagline: "Perfil completo + manutenção",
    badge: "Masterclass + checklist",
    headline: "Perfil completo no\nGoogle — sem prometer\n1ª posição",
    subheadline:
      "Configuração, categorias, fotos, avaliações éticas e checklist mensal. Sem truque de ranking garantido.",
    price: 57,
    anchorPrice: 177,
    installments: 3,
    guaranteeDays: 30,
    checkoutUrl: ck("google-meu-negocio-masterclass"),
    colors: BLUE,
    ctaText: "Quero a masterclass — R$ 57",
    socialProofLine: "Para quem quer aparecer melhor nas buscas locais com perfil bem cuidado.",
    finalCtaTitle: "Pronto para completar e manter o perfil?",
    coverSrc: "/mockups/google-meu-negocio-masterclass/social-cover.svg",
    problem: {
      title: "Perfil incompleto custa clientes",
      subtitle: "Manutenção importa mais que truque",
      items: [
        "Perfil desatualizado",
        "Não sabe responder avaliação",
        "Horários errados",
        "Não prioriza o que importa",
      ],
    },
    solution: {
      title: "Checklist GMN completo",
      description: "Do cadastro à manutenção mensal — com ética em avaliações.",
      features: [
        { icon: "✅", title: "Completo", desc: "Categorias, fotos, atributos." },
        { icon: "⭐", title: "Avaliações", desc: "Roteiros éticos de resposta." },
        { icon: "📅", title: "Manutenção", desc: "Checklist mensal." },
        { icon: "🚫", title: "Sem ranking fake", desc: "Sem promessa de 1º lugar." },
      ],
    },
    modules: [
      {
        number: "01",
        title: "Configuração",
        items: ["Cadastro", "Categorias", "Fotos", "Horários"],
      },
      {
        number: "02",
        title: "Operação",
        items: ["Avaliações", "Posts", "Perguntas", "Checklist mensal"],
      },
    ],
    bonuses: [
      {
        icon: "📝",
        title: "Templates de post para o perfil",
        description: "Ideias de atualização — adapte à sua oferta real.",
        value: 17,
      },
    ],
    faqs: [
      ...baseFaq(30),
      {
        q: "Vou ficar em 1º no Maps?",
        a: "Não prometemos posição. O foco é perfil completo, atualizado e bem respondido — fatores que você controla.",
      },
    ],
  },
};

/** Códigos curtos LOTE 1 → slug Studio */
export const CHECKOUT_CODE_MAP: Record<string, string> = {
  j1: "10-prompts-whatsapp-vendem",
  j2: "checklist-ia-1-hora",
  j3: "30-posts-prontos-ia",
  j4: "template-atendimento-automatico",
  j5: "mini-guia-gmn-30min",
  j6: "20-legendas-instagram",
  j7: "calculadora-preco-rapida",
  j8: "15-ideias-reels-segmento",
  j9: "template-bio-instagram",
  j10: "pack-50-hashtags-nicho",
  a1: "whatsapp-etico-negocios",
  a2: "checklist-atendimento-local",
  b1: "foco-14",
  c2: "chatgpt-empreendedores",
  d1: "instagram-negocios-locais-ia",
  d3: "google-meu-negocio-masterclass",
};

export function resolveCheckoutSlug(slug: string): string {
  return CHECKOUT_CODE_MAP[slug.toLowerCase()] ?? slug;
}

export function getTierZeroProduct(slug: string): TierZeroProduct | null {
  const key = resolveCheckoutSlug(slug);
  return TIER_ZERO_CATALOG[key] ?? null;
}

export function getAllTierZeroSlugs(): string[] {
  return Object.keys(TIER_ZERO_CATALOG);
}

export type CapturePageConfig = {
  slug: string;
  productSlug: string;
  badge: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  primaryColor: string;
  darkColor: string;
  accentColor: string;
  ctaLabel: string;
};

const CATEGORY_CAPTURE: Record<string, CapturePageConfig> = {
  whatsapp: {
    slug: "whatsapp",
    productSlug: "10-prompts-whatsapp-vendem",
    badge: "Material de entrada",
    headline: "Organize conversas no WhatsApp com prompts claros",
    subheadline:
      "Deixe seu e-mail para receber o caminho do micro-guia e novidades educativas BalcãoIA. Sem spam.",
    benefits: [
      "Caminho para o micro-guia de prompts",
      "Orientação ética — sem disparo em massa",
      "Você pode cancelar novidades a qualquer momento",
    ],
    primaryColor: TEAL.primary,
    darkColor: TEAL.dark,
    accentColor: TEAL.accent,
    ctaLabel: "Quero o caminho dos prompts",
  },
  foco: {
    slug: "foco",
    productSlug: "foco-14",
    badge: "Produtividade",
    headline: "14 dias de foco com evidência — sem milagre",
    subheadline: "Receba o link da trilha FOCO 14 e materiais educativos BalcãoIA.",
    benefits: [
      "Protocolo de 14 dias explicado com clareza",
      "Check-out diário com evidência",
      "Sem promessa de resultado milagroso",
    ],
    primaryColor: BLUE.primary,
    darkColor: BLUE.dark,
    accentColor: BLUE.accent,
    ctaLabel: "Quero a trilha FOCO 14",
  },
  ia: {
    slug: "ia",
    productSlug: "checklist-ia-1-hora",
    badge: "IA para negócio local",
    headline: "Comece a usar IA no negócio em 1 hora organizada",
    subheadline: "Checklist mínimo + trilha BalcãoIA. Conteúdo educativo.",
    benefits: [
      "Organização antes da ferramenta",
      "Primeiro teste com revisão humana",
      "Sem jargão técnico",
    ],
    primaryColor: PETROL.primary,
    darkColor: PETROL.dark,
    accentColor: PETROL.accent,
    ctaLabel: "Quero o checklist de 1 hora",
  },
  instagram: {
    slug: "instagram",
    productSlug: "instagram-negocios-locais-ia",
    badge: "Conteúdo local",
    headline: "Rotina de Instagram para negócio local com IA",
    subheadline: "Pilares, rascunhos e revisão — sem promessa de viral.",
    benefits: [
      "Estrutura de conteúdo",
      "IA só como rascunho",
      "Calendário simples",
    ],
    primaryColor: ROSE.primary,
    darkColor: ROSE.dark,
    accentColor: ROSE.accent,
    ctaLabel: "Quero a rotina de Instagram",
  },
  google: {
    slug: "google",
    productSlug: "google-meu-negocio-masterclass",
    badge: "Presença local",
    headline: "Google Meu Negócio completo — sem ranking milagroso",
    subheadline: "Checklist e masterclass para perfil bem cuidado.",
    benefits: [
      "Ajustes priorizados",
      "Manutenção mensal",
      "Sem promessa de 1ª posição",
    ],
    primaryColor: BLUE.primary,
    darkColor: BLUE.dark,
    accentColor: BLUE.accent,
    ctaLabel: "Quero o caminho GMN",
  },
};

function captureFromProduct(p: TierZeroProduct): CapturePageConfig {
  return {
    slug: p.slug,
    productSlug: p.slug,
    badge: p.badge,
    headline: p.headline.replace(/\n/g, " "),
    subheadline: p.subheadline,
    benefits: p.solution.features.slice(0, 3).map((f) => f.title + " — " + f.desc.split(".")[0]),
    primaryColor: p.colors.primary,
    darkColor: p.colors.dark,
    accentColor: p.colors.accent,
    ctaLabel: `Quero saber mais sobre ${p.name}`,
  };
}

/** Categorias + 16 produtos + códigos curtos */
export const CAPTURE_PAGES: Record<string, CapturePageConfig> = {
  ...CATEGORY_CAPTURE,
  ...Object.fromEntries(
    Object.values(TIER_ZERO_CATALOG).map((p) => [p.slug, captureFromProduct(p)])
  ),
  ...Object.fromEntries(
    Object.entries(CHECKOUT_CODE_MAP).map(([code, productSlug]) => {
      const p = TIER_ZERO_CATALOG[productSlug];
      return [code, p ? { ...captureFromProduct(p), slug: code } : null];
    }).filter(([, v]) => v != null) as [string, CapturePageConfig][]
  ),
};

export function getCapturePage(slug: string): CapturePageConfig | null {
  return CAPTURE_PAGES[slug] ?? CAPTURE_PAGES[resolveCheckoutSlug(slug)] ?? null;
}

export function getAllCaptureSlugs(): string[] {
  return Object.keys(CAPTURE_PAGES);
}
