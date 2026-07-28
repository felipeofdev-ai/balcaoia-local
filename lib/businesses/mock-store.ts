import type { Business } from "@/types/database";

/**
 * Store em memória para o CRUD de negócios funcionar sem Supabase
 * configurado (dev/demo). Não é persistente entre restarts do processo.
 */
const store = new Map<string, Business>();

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `biz-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function listMockBusinesses(): Business[] {
  return Array.from(store.values()).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export function getMockBusiness(id: string): Business | undefined {
  return store.get(id);
}

export interface CreateMockBusinessInput {
  name: string;
  segment?: string;
  city?: string;
  description?: string;
}

export function createMockBusiness(input: CreateMockBusinessInput): Business {
  const now = new Date().toISOString();
  const business: Business = {
    id: randomId(),
    workspace_id: "mock-workspace",
    name: input.name,
    segment: input.segment ?? null,
    city: input.city ?? null,
    description: input.description ?? null,
    target_audience: null,
    tone_of_voice: "friendly",
    opening_hours: null,
    human_handoff_contact: null,
    wizard_completed: false,
    wizard_step: 1,
    diagnostic_score: null,
    created_at: now,
    updated_at: now,
  };
  store.set(business.id, business);
  return business;
}

export function updateMockBusiness(id: string, patch: Partial<Business>): Business | undefined {
  const existing = store.get(id);
  if (!existing) return undefined;
  const updated: Business = {
    ...existing,
    ...patch,
    id: existing.id,
    updated_at: new Date().toISOString(),
  };
  store.set(id, updated);
  return updated;
}

export function deleteMockBusiness(id: string): boolean {
  return store.delete(id);
}

export function clearMockBusinesses(): void {
  store.clear();
}
