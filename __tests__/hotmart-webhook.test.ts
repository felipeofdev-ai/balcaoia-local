import { beforeEach, describe, expect, it } from "vitest";
import {
  clearHotmartEventLog,
  getHotmartEventLog,
  handleHotmartEvent,
  parseHotmartPayload,
  validateHottok,
} from "@/lib/hotmart/webhook-parser";

describe("validateHottok", () => {
  it("returns true when the received token matches the expected one", () => {
    expect(validateHottok("abc123", "abc123")).toBe(true);
  });

  it("returns false when tokens do not match", () => {
    expect(validateHottok("wrong-token", "abc123")).toBe(false);
  });

  it("is permissive (returns true) when no HOTMART_HOTTOK is configured", () => {
    expect(validateHottok(undefined, undefined)).toBe(true);
    expect(validateHottok(null, "")).toBe(true);
  });

  it("rejects a missing token when one is expected", () => {
    expect(validateHottok(null, "abc123")).toBe(false);
    expect(validateHottok(undefined, "abc123")).toBe(false);
  });
});

describe("parseHotmartPayload", () => {
  it("extracts buyer, product and purchase info from a valid payload", () => {
    const payload = {
      event: "PURCHASE_APPROVED",
      data: {
        product: { id: 123, name: "BalcãoIA Studio" },
        buyer: { email: "cliente@email.com", name: "Cliente Teste" },
        purchase: { transaction: "HP123456", status: "APPROVED" },
      },
    };

    const parsed = parseHotmartPayload(payload);

    expect(parsed.eventType).toBe("PURCHASE_APPROVED");
    expect(parsed.buyerEmail).toBe("cliente@email.com");
    expect(parsed.buyerName).toBe("Cliente Teste");
    expect(parsed.productId).toBe("123");
    expect(parsed.productName).toBe("BalcãoIA Studio");
    expect(parsed.purchaseId).toBe("HP123456");
  });

  it("handles missing/empty payloads gracefully", () => {
    const parsed = parseHotmartPayload({});
    expect(parsed.eventType).toBe("UNKNOWN");
    expect(parsed.buyerEmail).toBeNull();
    expect(parsed.purchaseId).toBeNull();
  });

  it("handles null/undefined body without throwing", () => {
    expect(() => parseHotmartPayload(null)).not.toThrow();
    expect(() => parseHotmartPayload(undefined)).not.toThrow();
  });
});

describe("handleHotmartEvent", () => {
  beforeEach(() => {
    clearHotmartEventLog();
  });

  it("activates the workspace on PURCHASE_APPROVED", async () => {
    const parsed = parseHotmartPayload({
      event: "PURCHASE_APPROVED",
      data: { buyer: { email: "novo@cliente.com" }, purchase: { transaction: "HP1" } },
    });

    const result = await handleHotmartEvent(parsed);

    expect(result.ok).toBe(true);
    expect(result.action).toBe("activate");
    expect(result.persisted).toBe("memory");
    expect(result.message).toContain("novo@cliente.com");
  });

  it("activates the workspace on PURCHASE_COMPLETE", async () => {
    const parsed = parseHotmartPayload({ event: "PURCHASE_COMPLETE", data: {} });
    const result = await handleHotmartEvent(parsed);
    expect(result.action).toBe("activate");
  });

  it("suspends the workspace on PURCHASE_REFUNDED", async () => {
    const parsed = parseHotmartPayload({
      event: "PURCHASE_REFUNDED",
      data: { buyer: { email: "cliente@email.com" }, purchase: { transaction: "HP2" } },
    });

    const result = await handleHotmartEvent(parsed);

    expect(result.action).toBe("suspend");
    expect(result.message).toContain("cliente@email.com");
  });

  it("suspends the workspace on PURCHASE_CANCELED / PURCHASE_CANCELLED", async () => {
    const canceled = await handleHotmartEvent(parseHotmartPayload({ event: "PURCHASE_CANCELED", data: {} }));
    const cancelled = await handleHotmartEvent(parseHotmartPayload({ event: "PURCHASE_CANCELLED", data: {} }));
    expect(canceled.action).toBe("suspend");
    expect(cancelled.action).toBe("suspend");
  });

  it("takes no workspace action for unrelated events", async () => {
    const parsed = parseHotmartPayload({ event: "PURCHASE_BILLET_PRINTED", data: {} });
    const result = await handleHotmartEvent(parsed);
    expect(result.action).toBe("none");
    expect(result.ok).toBe(true);
  });

  it("logs every processed event in memory", async () => {
    expect(getHotmartEventLog()).toHaveLength(0);
    await handleHotmartEvent(parseHotmartPayload({ event: "PURCHASE_APPROVED", data: {} }));
    expect(getHotmartEventLog()).toHaveLength(1);
    expect(getHotmartEventLog()[0].eventType).toBe("PURCHASE_APPROVED");
  });

  it("persists via Supabase when a client is provided", async () => {
    const calls: Array<{ table: string; op: string; values: Record<string, unknown> }> = [];
    const supabase = {
      from(table: string) {
        return {
          insert: async (values: Record<string, unknown>) => {
            calls.push({ table, op: "insert", values });
            return { error: null };
          },
          update: (values: Record<string, unknown>) => ({
            eq: async (column: string, value: unknown) => {
              calls.push({ table, op: "update", values: { ...values, [column]: value } });
              return { error: null };
            },
          }),
        };
      },
    };

    const parsed = parseHotmartPayload({
      event: "PURCHASE_APPROVED",
      data: { buyer: { email: "a@a.com" }, purchase: { transaction: "HP9" } },
    });

    const result = await handleHotmartEvent(parsed, { supabase });

    expect(result.persisted).toBe("supabase");
    expect(calls.some((c) => c.table === "hotmart_events" && c.op === "insert")).toBe(true);
    expect(calls.some((c) => c.table === "workspaces" && c.op === "update")).toBe(true);
  });

  it("falls back to memory persistence when Supabase throws", async () => {
    const supabase = {
      from() {
        return {
          insert: async () => {
            throw new Error("boom");
          },
          update: () => ({ eq: async () => ({ error: null }) }),
        };
      },
    };

    const parsed = parseHotmartPayload({ event: "PURCHASE_APPROVED", data: {} });
    const result = await handleHotmartEvent(parsed, { supabase });

    expect(result.persisted).toBe("memory");
    expect(result.ok).toBe(true);
  });
});
