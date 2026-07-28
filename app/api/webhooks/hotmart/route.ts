import { NextResponse } from "next/server";
import { processHotmartWebhook } from "@/lib/hotmart/webhook-route";
import { webhookHealthPayload } from "@/lib/hotmart/health";

export const runtime = "nodejs";

/**
 * Webhook oficial Hotmart.
 * GET = health · POST = eventos (header x-hotmart-hottok)
 */
export async function GET() {
  return NextResponse.json(
    {
      ...webhookHealthPayload(),
      endpoint: "/api/webhooks/hotmart",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  return processHotmartWebhook(request);
}
