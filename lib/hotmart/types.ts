/**
 * Tipos do webhook da Hotmart (Postback/Webhook v2).
 * Referência: https://developers.hotmart.com/docs/pt-BR/webhooks/
 */

export type HotmartEventType =
  | "PURCHASE_APPROVED"
  | "PURCHASE_COMPLETE"
  | "PURCHASE_CANCELED"
  | "PURCHASE_CANCELLED"
  | "PURCHASE_REFUNDED"
  | "PURCHASE_CHARGEBACK"
  | "PURCHASE_EXPIRED"
  | "PURCHASE_DELAYED"
  | "PURCHASE_BILLET_PRINTED"
  | "PURCHASE_PROTEST"
  | "PURCHASE_OUT_OF_SHOPPING_CART"
  | "SUBSCRIPTION_CANCELLATION"
  | "SUBSCRIPTION_RENEWAL"
  | "SUBSCRIPTION_REACTIVATED"
  | "CLUB_FIRST_ACCESS"
  | "CLUB_MODULE_COMPLETED"
  | "SWITCH_PLAN"
  | (string & {});

export interface HotmartBuyer {
  email: string;
  name?: string;
  document?: string;
  checkout_phone?: string;
}

export interface HotmartProduct {
  id?: string | number;
  name?: string;
  ucode?: string;
}

export interface HotmartPurchasePrice {
  value?: number;
  currency_value?: string;
}

export interface HotmartPurchase {
  transaction?: string;
  status?: string;
  approved_date?: number;
  price?: HotmartPurchasePrice;
  payment?: { type?: string; installments_number?: number };
}

export interface HotmartWebhookData {
  product?: HotmartProduct;
  buyer?: HotmartBuyer;
  purchase?: HotmartPurchase;
  subscription?: Record<string, unknown>;
  affiliates?: Array<Record<string, unknown>>;
}

export interface HotmartWebhookPayload {
  id?: string;
  event: HotmartEventType;
  version?: string;
  creation_date?: number;
  data: HotmartWebhookData;
  /** Campo legado (webhook v1) — hoje o hottok chega via header X-Hotmart-Hottok. */
  hottok?: string;
}

export interface ParsedHotmartEvent {
  eventType: HotmartEventType;
  purchaseId: string | null;
  buyerEmail: string | null;
  buyerName: string | null;
  productId: string | null;
  productName: string | null;
  raw: unknown;
}

export type WorkspaceAction = "activate" | "suspend" | "pending" | "update_plan" | "none";

export interface HotmartHandleResult {
  ok: boolean;
  action: WorkspaceAction;
  message: string;
  event: ParsedHotmartEvent;
  persisted: "supabase" | "memory";
}

export interface HotmartEventLogEntry {
  id: string;
  eventType: HotmartEventType;
  hottokValid: boolean;
  buyerEmail: string | null;
  buyerName: string | null;
  productId: string | null;
  purchaseId: string | null;
  rawPayload: unknown;
  processedAt: string | null;
  createdAt: string;
}
