import type { AttendanceGoal, ToneOfVoice } from "./database";

export interface WizardData {
  step: number;
  basicInfo: {
    name: string;
    segment: string;
    city: string;
    description: string;
  };
  targetAudience: {
    profile: string;
    painPoints: string[];
    averageTicket: string;
  };
  productsServices: Array<{
    name: string;
    description: string;
    priceRange: string;
    benefits: string[];
    requirements: string;
    deliveryTime: string;
  }>;
  faqs: Array<{ question: string; answer: string; category: string }>;
  objections: Array<{ objection: string; answer: string; category: string }>;
  policies: {
    openingHours: string;
    paymentMethods: string;
    cancellationPolicy: string;
    deliveryPolicy: string;
    warranty: string;
  };
  toneOfVoice: ToneOfVoice;
  attendanceGoal: AttendanceGoal;
  humanHandoffRules: string;
  humanHandoffContact: string;
}

export const NICHE_OPTIONS = [
  "Estética",
  "Salão de Beleza",
  "Petshop",
  "Clínica",
  "Delivery",
  "Academia",
  "Escola/Curso Local",
  "Consultoria",
  "Assistência Técnica",
  "Imobiliária",
] as const;

export const EXAMPLE_BEAUTY_SALON: WizardData = {
  step: 1,
  basicInfo: {
    name: "Salão Bella Arte",
    segment: "Salão de Beleza",
    city: "São Paulo - SP",
    description:
      "Salão feminino especializado em coloração, escova e tratamentos capilares. Atendimento com hora marcada, centro de São Paulo.",
  },
  targetAudience: {
    profile:
      "Mulheres de 25 a 55 anos, classe C e B, que valorizam aparência e buscam praticidade.",
    painPoints: [
      "Dificuldade de agendar horário",
      "Medo de estragar o cabelo",
      "Preço surpresa",
    ],
    averageTicket: "R$ 150 a R$ 350",
  },
  productsServices: [
    {
      name: "Escova progressiva",
      description:
        "Alisamento com produtos de qualidade, dura até 6 meses.",
      priceRange: "R$ 180 a R$ 280 dependendo do comprimento",
      benefits: [
        "Cabelo liso por até 6 meses",
        "Redução de volume",
        "Brilho intenso",
      ],
      requirements: "Cabelo sem coloração química recente",
      deliveryTime: "2 a 3 horas",
    },
    {
      name: "Coloração completa",
      description:
        "Coloração com tintas profissionais, cobertura de branco incluída.",
      priceRange: "R$ 120 a R$ 220",
      benefits: [
        "Cobertura total de fios brancos",
        "Cor uniforme",
        "Brilho",
      ],
      requirements: "Avaliação do estado do cabelo",
      deliveryTime: "1h30 a 2h30",
    },
  ],
  faqs: [
    {
      question: "Precisa agendar?",
      answer:
        "Sim, trabalhamos somente com hora marcada para garantir atendimento exclusivo.",
      category: "Agendamento",
    },
    {
      question: "Aceitam cartão?",
      answer: "Sim, aceitamos todos os cartões, Pix e dinheiro.",
      category: "Pagamento",
    },
    {
      question: "Quanto tempo dura?",
      answer:
        "Depende do serviço. Escova simples: 1h. Progressiva: 2h30. Coloração: 2h.",
      category: "Serviços",
    },
  ],
  objections: [
    {
      objection: "Está muito caro",
      answer:
        "Nossos preços incluem produtos profissionais e atendimento especializado. Temos opções para diferentes orçamentos. Posso verificar o que melhor se encaixa?",
      category: "Preço",
    },
    {
      objection: "Vou pensar",
      answer:
        "Claro! Nossos horários na semana se esgotam rápido. Quer que eu já reserve um horário e você confirma até amanhã?",
      category: "Urgência",
    },
  ],
  policies: {
    openingHours: "Segunda a sábado, 9h às 19h. Domingo fechado.",
    paymentMethods:
      "Pix, cartão débito/crédito (sem juros em até 3x), dinheiro.",
    cancellationPolicy:
      "Cancelamento com até 2h de antecedência sem custo. Após isso, cobraremos 30% do serviço.",
    deliveryPolicy: "Atendimento presencial no salão.",
    warranty:
      "Se não ficar satisfeita com o serviço, retorne em até 7 dias para ajuste sem custo adicional.",
  },
  toneOfVoice: "friendly",
  attendanceGoal: "scheduling",
  humanHandoffRules:
    "Encaminhar para atendente humano quando: cliente pedir diagnóstico detalhado do cabelo, reclamação, solicitação de orçamento para evento, dúvida sobre produtos específicos para cabelo danificado.",
  humanHandoffContact: "Recepcionista — telefone do salão",
};

export const emptyWizardData = (): WizardData => ({
  step: 1,
  basicInfo: { name: "", segment: "", city: "", description: "" },
  targetAudience: { profile: "", painPoints: [], averageTicket: "" },
  productsServices: [],
  faqs: [],
  objections: [],
  policies: {
    openingHours: "",
    paymentMethods: "",
    cancellationPolicy: "",
    deliveryPolicy: "",
    warranty: "",
  },
  toneOfVoice: "friendly",
  attendanceGoal: "quote",
  humanHandoffRules: "",
  humanHandoffContact: "",
});
