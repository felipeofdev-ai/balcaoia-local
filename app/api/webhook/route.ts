import { NextResponse } from "next/server";
import { processHotmartWebhook } from "@/lib/hotmart/webhook-route";
import { webhookHealthPayload } from "@/lib/hotmart/health";

/**
 * Alias VOID-9:
 * GET  /api/webhook → health (evita 404 no browser / Hotmart probe)
 * POST /api/webhook → mesmo handler de /api/webhooks/hotmart
 */
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(webhookHealthPayload(), { status: 200 });
}

export async function POST(request: Request) {
  return processHotmartWebhook(request);
}
