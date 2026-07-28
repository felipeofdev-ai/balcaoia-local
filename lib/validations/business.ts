import { z } from "zod";

export const businessCreateSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  segment: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
});
