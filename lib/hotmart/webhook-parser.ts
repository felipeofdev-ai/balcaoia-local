import { timingSafeEqual } from "node:crypto";
import type {
  HotmartEventLogEntry,
  HotmartEventType,
  HotmartHandleResult,
  HotmartWebhookPayload,
  ParsedHotmartEvent,
  WorkspaceAction,
} from "./types";

/** Eventos que liberam/ativam o acesso ao workspace do comprador. */
export const HOTMART_ACTIVATE_EVENTS: HotmartEventType[] = [
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "SUBSCRIPTION_RENEWAL",
  "SUBSCRIPTION_REACTIVATED",
];

/** Eventos que suspendem o acesso ao workspace do comprador. */
export const HOTMART_SUSPEND_EVENTS: HotmartEventType[] = [
  "PURCHASE_REFUNDED",
  "PURCHASE_CANCELED",
  "PURCHASE_CANCELLED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_EXPIRED",
  "PURCHASE_PROTEST",
  "SUBSCRIPTION_CANCELLATION",
];

/** Pagamento ainda não confirmado (boleto / atraso). */
export const HOTMART_PENDING_EVENTS: HotmartEventType[] = [
  "PURCHASE_DELAYED",
  "PURCHASE_BILLET_PRINTED",
];

/** Mudança de plano de assinatura. */
export const HOTMART_PLAN_EVENTS: HotmartEventType[] = ["SWITCH_PLAN"];

/**
 * Valida o hottok recebido contra o configurado em HOTMART_HOTTOK.
 * Comparação timing-safe. Sem HOTTOK (local/demo), aceita qualquer chamada;
 * em produção configure sempre HOTMART_HOTTOK (ou alias HOTTOK).
 */
export function validateHottok(
  received: string | null | undefined,
  expected: string | null | undefined
): boolean {
  const exp = (expected || process.env.HOTTOK || "").trim();
  if (!exp) return true;
  if (!received) return false;
  try {
    const a = Buffer.from(String(received));
    const b = Buffer.from(exp);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return received === exp;
  }
}

function toStringOrNull(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length ? str : null;
}

export function parseHotmartPayload(body: unknown): ParsedHotmartEvent {
  const payload = (body ?? {}) as Partial<HotmartWebhookPayload>;
  const data = payload.data ?? {};

  return {
    eventType: (payload.event as HotmartEventType) ?? "UNKNOWN",
    purchaseId: toStringOrNull(data.purchase?.transaction),
    buyerEmail: toStringOrNull(data.buyer?.email),
    buyerName: toStringOrNull(data.buyer?.name),
    productId: toStringOrNull(data.product?.id),
    productName: toStringOrNull(data.product?.name),
    raw: body,
  };
}

/**
 * Store em memória para o webhook (dev/testes/fallback sem Supabase).
 * É reiniciado a cada deploy/restart — apenas um registro auxiliar.
 */
let eventLog: HotmartEventLogEntry[] = [];

export function logHotmartEvent(entry: HotmartEventLogEntry): void {
  eventLog.unshift(entry);
  if (eventLog.length > 200) eventLog = eventLog.slice(0, 200);
}

export function getHotmartEventLog(): HotmartEventLogEntry[] {
  return eventLog;
}

export function clearHotmartEventLog(): void {
  eventLog = [];
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `hotmart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Interface mínima de um client Supabase compatível com @supabase/supabase-js,
 * suficiente para inserir eventos e atualizar o status do workspace.
 * Mantida assim (em vez de importar o SDK) para permitir mocks simples em teste.
 */
export interface HotmartSupabaseLike {
  from(table: string): {
    insert: (values: Record<string, unknown>) => PromiseLike<{ error: unknown } | unknown>;
    update: (values: Record<string, unknown>) => {
      eq: (column: string, value: unknown) => PromiseLike<{ error: unknown } | unknown>;
    };
  };
}

export interface HandleHotmartEventOptions {
  supabase?: HotmartSupabaseLike | null;
}

function resolveAction(eventType: HotmartEventType): WorkspaceAction {
  if (HOTMART_ACTIVATE_EVENTS.includes(eventType)) return "activate";
  if (HOTMART_SUSPEND_EVENTS.includes(eventType)) return "suspend";
  if (HOTMART_PENDING_EVENTS.includes(eventType)) return "pending";
  if (HOTMART_PLAN_EVENTS.includes(eventType)) return "update_plan";
  return "none";
}

/**
 * Aplica a lógica de negócio de um evento Hotmart já validado (hottok ok).
 * Sem Supabase configurado (ou em caso de erro), a operação continua
 * "mock-friendly": registra em memória e responde com sucesso, para não
 * quebrar o fluxo de vendas por falta de infraestrutura no MVP.
 */
export async function handleHotmartEvent(
  parsed: ParsedHotmartEvent,
  options: HandleHotmartEventOptions = {}
): Promise<HotmartHandleResult> {
  const { supabase } = options;
  const action = resolveAction(parsed.eventType);

  const who = parsed.buyerEmail ?? "comprador desconhecido";
  const purchase = parsed.purchaseId ?? "sem ID";

  let message = `Evento ${parsed.eventType} recebido e registrado (sem ação de workspace).`;
  if (action === "activate") {
    message = `Workspace ativado para ${who} (compra ${purchase}).`;
  } else if (action === "suspend") {
    message = `Workspace suspenso para ${who} (compra ${purchase}).`;
  } else if (action === "pending") {
    message = `Pagamento pendente para ${who} (compra ${purchase}) — acesso aguardando confirmação.`;
  } else if (action === "update_plan") {
    message = `Plano atualizado para ${who} (compra ${purchase}).`;
  }

  let persisted: "supabase" | "memory" = "memory";

  if (supabase) {
    try {
      await supabase.from("hotmart_events").insert({
        event_type: parsed.eventType,
        hottok_valid: true,
        buyer_email: parsed.buyerEmail,
        buyer_name: parsed.buyerName,
        product_id: parsed.productId,
        purchase_id: parsed.purchaseId,
        raw_payload: parsed.raw,
        processed_at: new Date().toISOString(),
      });

      if (action === "activate" && parsed.buyerEmail) {
        await supabase
          .from("workspaces")
          .update({
            status: "active",
            hotmart_buyer_email: parsed.buyerEmail,
            hotmart_purchase_id: parsed.purchaseId,
          })
          .eq("hotmart_buyer_email", parsed.buyerEmail);
      } else if (action === "suspend" && parsed.buyerEmail) {
        await supabase
          .from("workspaces")
          .update({ status: "suspended" })
          .eq("hotmart_buyer_email", parsed.buyerEmail);
      } else if (action === "pending" && parsed.buyerEmail) {
        await supabase
          .from("workspaces")
          .update({ status: "pending" })
          .eq("hotmart_buyer_email", parsed.buyerEmail);
      } else if (action === "update_plan" && parsed.buyerEmail) {
        await supabase
          .from("workspaces")
          .update({
            status: "active",
            hotmart_purchase_id: parsed.purchaseId,
            plan_updated_at: new Date().toISOString(),
          })
          .eq("hotmart_buyer_email", parsed.buyerEmail);
      }

      persisted = "supabase";
    } catch (error) {
      console.error("[hotmart] falha ao persistir no Supabase, usando fallback em memória", error);
    }
  }

  logHotmartEvent({
    id: randomId(),
    eventType: parsed.eventType,
    hottokValid: true,
    buyerEmail: parsed.buyerEmail,
    buyerName: parsed.buyerName,
    productId: parsed.productId,
    purchaseId: parsed.purchaseId,
    rawPayload: parsed.raw,
    processedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  return { ok: true, action, message, event: parsed, persisted };
}
