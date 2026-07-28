import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^(\+?55)?[\s-]?\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(v),
      "Telefone inválido (formato brasileiro)"
    ),
  segment: z.string().optional(),
  profileType: z.enum([
    "business_owner",
    "freelancer",
    "agency",
    "marketer",
    "curious",
  ]),
  consent: z.literal(true, {
    error: "É necessário aceitar o consentimento",
  }),
  source: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
