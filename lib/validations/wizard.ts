import { z } from "zod";

export const wizardStep1Schema = z.object({
  name: z.string().min(2, "Informe o nome do negócio"),
  segment: z.string().min(1, "Selecione o segmento"),
  city: z.string().min(2, "Informe a cidade"),
  description: z.string().min(10, "Descreva o negócio (mín. 10 caracteres)"),
});

export const wizardStep2Schema = z.object({
  profile: z.string().min(5, "Descreva o público-alvo"),
  painPoints: z.array(z.string()).min(1, "Informe ao menos uma dor"),
  averageTicket: z.string().min(1, "Informe o ticket médio ou [PREENCHER]"),
});

export const wizardStep3Schema = z.object({
  productsServices: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        priceRange: z.string(),
        benefits: z.array(z.string()),
        requirements: z.string(),
        deliveryTime: z.string(),
      })
    )
    .min(1, "Adicione pelo menos 1 serviço")
    .max(20),
});

export const wizardStep4Schema = z.object({
  faqs: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        category: z.string(),
      })
    )
    .min(3, "Adicione pelo menos 3 perguntas"),
});

export const businessSchema = z.object({
  name: z.string().min(2),
  segment: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
});
