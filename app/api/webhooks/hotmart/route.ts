import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  handleHotmartEvent,
  logHotmartEvent,
  parseHotmartPayload,
  validateHottok,
} from "@/lib/hotmart/webhook-parser";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `hotmart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Webhook oficial da Hotmart (compra aprovada, cancelada, reembolsada, etc.).
 * Configure a URL desta rota no painel Hotmart (Ferramentas > Webhook) e
 * defina HOTMART_HOTTOK com o token exibido lá para validar a origem.
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  const limit = checkRateLimit(`hotmart:${ip}`, 120, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Rate limit excedido" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const bodyRecord =
    typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const receivedHottok =
    request.headers.get("x-hotmart-hottok") ??
    request.headers.get("X-Hotmart-Hottok") ??
    (typeof bodyRecord.hottok === "string" ? bodyRecord.hottok : null);
  const expectedHottok = process.env.HOTMART_HOTTOK ?? null;
  const hottokValid = validateHottok(receivedHottok, expectedHottok);

  const parsed = parseHotmartPayload(body);

  if (!hottokValid) {
    logHotmartEvent({
      id: randomId(),
      eventType: parsed.eventType,
      hottokValid: false,
      buyerEmail: parsed.buyerEmail,
      buyerName: parsed.buyerName,
      productId: parsed.productId,
      purchaseId: parsed.purchaseId,
      rawPayload: body,
      processedAt: null,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: false, error: "HOTTOK inválido" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const result = await handleHotmartEvent(parsed, { supabase: supabase ?? undefined });
    console.info("[hotmart]", result.action, parsed.eventType, parsed.buyerEmail);
    return NextResponse.json(
      {
        ok: true,
        action: result.action,
        message: result.message,
        persisted: result.persisted,
        eventType: parsed.eventType,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("[/api/webhooks/hotmart]", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível processar o evento." },
      { status: 500 }
    );
  }
}
