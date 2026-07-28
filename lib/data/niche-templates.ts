import type { LocalNicheTemplate } from "@/lib/local-store";

/**
 * Templates de nicho pré-configurados. Servem de ponto de partida para o
 * wizard e para a página de templates. Editáveis via /app/admin/templates
 * (armazenados em localStorage a partir desta base).
 */
export const DEFAULT_NICHE_TEMPLATES: LocalNicheTemplate[] = [
  {
    id: "niche-estetica",
    niche: "Estética",
    description:
      "Clínicas de estética facial e corporal, procedimentos não invasivos e tratamentos de pele.",
    suggestedTone: "premium",
    suggestedFaqs: [
      "Quais procedimentos vocês oferecem?",
      "Preciso de avaliação antes de agendar?",
      "Quantas sessões são recomendadas?",
    ],
    suggestedObjections: ["É muito caro", "Tenho medo de não gostar do resultado"],
    complianceAlerts: [
      "Não fazer diagnóstico de pele ou prescrever tratamentos — sempre recomendar avaliação presencial com profissional habilitado.",
      "Não prometer resultados estéticos garantidos.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-salao-beleza",
    niche: "Salão de Beleza",
    description: "Salões de cabelo, manicure e serviços de beleza em geral.",
    suggestedTone: "friendly",
    suggestedFaqs: [
      "Precisa agendar horário?",
      "Quais formas de pagamento vocês aceitam?",
      "Quanto tempo dura o atendimento?",
    ],
    suggestedObjections: ["Está muito caro", "Vou pensar"],
    complianceAlerts: [
      "Não garantir resultado de coloração/alisamento em cabelos com histórico desconhecido.",
      "Sempre confirmar alergias antes de procedimentos químicos com a equipe.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-petshop",
    niche: "Petshop",
    description: "Banho e tosa, venda de produtos e serviços veterinários básicos.",
    suggestedTone: "friendly",
    suggestedFaqs: [
      "Vocês fazem busca e entrega do pet?",
      "Quais raças vocês atendem?",
      "Precisa levar a carteira de vacinação?",
    ],
    suggestedObjections: ["Achei caro comparado a outro lugar"],
    complianceAlerts: [
      "Não fazer diagnóstico veterinário — encaminhar casos de saúde animal para o veterinário responsável.",
      "Não recomendar medicamentos sem indicação profissional.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-clinica",
    niche: "Clínica",
    description: "Clínicas médicas e odontológicas de pequeno/médio porte.",
    suggestedTone: "professional",
    suggestedFaqs: [
      "Quais convênios são aceitos?",
      "Como faço para remarcar uma consulta?",
      "Preciso de encaminhamento médico?",
    ],
    suggestedObjections: ["Não tenho convênio", "Prefiro esperar"],
    complianceAlerts: [
      "Proibido diagnóstico médico ou prescrição via chat — sempre encaminhar para profissional de saúde.",
      "Não compartilhar dados de saúde sensíveis sem consentimento explícito (LGPD).",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-delivery",
    niche: "Delivery",
    description: "Restaurantes e negócios de entrega de comida ou produtos locais.",
    suggestedTone: "direct",
    suggestedFaqs: [
      "Qual o prazo de entrega?",
      "Vocês entregam no meu bairro?",
      "Qual o valor mínimo do pedido?",
    ],
    suggestedObjections: ["A taxa de entrega está cara"],
    complianceAlerts: [
      "Não prometer prazos de entrega não confirmados operacionalmente.",
      "Confirmar disponibilidade de itens antes de assumir compromisso de venda.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-academia",
    niche: "Academia",
    description: "Academias, estúdios de treino funcional e personal trainers.",
    suggestedTone: "friendly",
    suggestedFaqs: [
      "Tem aula experimental gratuita?",
      "Quais são os planos disponíveis?",
      "Preciso de avaliação física antes de começar?",
    ],
    suggestedObjections: ["Não tenho tempo", "É caro"],
    complianceAlerts: [
      "Não prescrever treinos ou dietas — direcionar para o profissional de educação física/nutrição.",
      "Não garantir resultado físico (emagrecimento, hipertrofia) via chat.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-escola-curso",
    niche: "Escola/Curso Local",
    description: "Cursos livres, reforço escolar e escolas de idiomas locais.",
    suggestedTone: "consultive",
    suggestedFaqs: [
      "Como funciona a matrícula?",
      "Tem aula de reposição?",
      "Qual a duração do curso?",
    ],
    suggestedObjections: ["Não sei se vou ter tempo para acompanhar"],
    complianceAlerts: [
      "Não garantir aprovação em exames/concursos.",
      "Evitar prometer empregabilidade garantida após o curso.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-consultoria",
    niche: "Consultoria",
    description: "Consultores independentes em gestão, marketing, RH ou finanças.",
    suggestedTone: "consultive",
    suggestedFaqs: [
      "Como funciona a primeira reunião?",
      "Vocês atendem remoto?",
      "Qual o investimento médio?",
    ],
    suggestedObjections: ["Já tentei consultoria antes e não funcionou"],
    complianceAlerts: [
      "Não fazer aconselhamento jurídico ou financeiro definitivo — recomendar consulta especializada.",
      "Não garantir resultado financeiro ou renda.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-assistencia-tecnica",
    niche: "Assistência Técnica",
    description: "Conserto de eletrônicos, eletrodomésticos e equipamentos em geral.",
    suggestedTone: "direct",
    suggestedFaqs: [
      "Vocês fazem orçamento sem custo?",
      "Qual o prazo médio de conserto?",
      "Tem garantia no serviço?",
    ],
    suggestedObjections: ["O orçamento ficou alto"],
    complianceAlerts: [
      "Não garantir orçamento de reparo sem avaliação técnica presencial.",
      "Não prometer prazo de conserto sem diagnóstico do equipamento.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "niche-imobiliaria",
    niche: "Imobiliária",
    description: "Corretores e imobiliárias locais para venda e locação de imóveis.",
    suggestedTone: "professional",
    suggestedFaqs: [
      "O imóvel ainda está disponível?",
      "É possível financiar?",
      "Como agendo uma visita?",
    ],
    suggestedObjections: ["O valor está acima do que eu pretendia pagar"],
    complianceAlerts: [
      "Não garantir aprovação de financiamento ou condições de crédito.",
      "Confirmar disponibilidade real do imóvel antes de agendar visita.",
    ],
    createdAt: new Date("2026-01-01").toISOString(),
  },
];
