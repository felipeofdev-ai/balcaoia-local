import { describe, expect, it } from "vitest";
import { wizardStep1Schema } from "@/lib/validations/wizard";
import { leadSchema } from "@/lib/validations/lead";

describe("wizardStep1Schema", () => {
  it("accepts valid step 1 data", () => {
    const result = wizardStep1Schema.safeParse({
      name: "Salão Bella Arte",
      segment: "Salão de Beleza",
      city: "São Paulo - SP",
      description: "Salão feminino especializado em coloração e escova.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a name that is too short", () => {
    const result = wizardStep1Schema.safeParse({
      name: "A",
      segment: "Salão de Beleza",
      city: "São Paulo",
      description: "Descrição válida com mais de dez caracteres.",
    });
    expect(result.success).toBe(false);
  });

  it("requires a non-empty segment", () => {
    const result = wizardStep1Schema.safeParse({
      name: "Salão Bella Arte",
      segment: "",
      city: "São Paulo",
      description: "Descrição válida com mais de dez caracteres.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a description shorter than 10 characters", () => {
    const result = wizardStep1Schema.safeParse({
      name: "Salão Bella Arte",
      segment: "Salão de Beleza",
      city: "São Paulo",
      description: "curta",
    });
    expect(result.success).toBe(false);
  });
});

describe("leadSchema — consent", () => {
  const base = {
    name: "Maria Silva",
    email: "maria@email.com",
    profileType: "business_owner" as const,
  };

  it("rejects when consent is false", () => {
    const result = leadSchema.safeParse({ ...base, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects when consent is missing", () => {
    const result = leadSchema.safeParse(base);
    expect(result.success).toBe(false);
  });

  it("accepts when consent is explicitly true", () => {
    const result = leadSchema.safeParse({ ...base, consent: true });
    expect(result.success).toBe(true);
  });
});

describe("leadSchema — email", () => {
  it("rejects an invalid email address", () => {
    const result = leadSchema.safeParse({
      name: "Maria Silva",
      email: "not-an-email",
      profileType: "business_owner",
      consent: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid email address", () => {
    const result = leadSchema.safeParse({
      name: "Maria Silva",
      email: "maria@email.com",
      profileType: "business_owner",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("accepts a valid Brazilian phone number when provided", () => {
    const result = leadSchema.safeParse({
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 98888-7777",
      profileType: "business_owner",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid phone number when provided", () => {
    const result = leadSchema.safeParse({
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "abc123",
      profileType: "business_owner",
      consent: true,
    });
    expect(result.success).toBe(false);
  });
});
