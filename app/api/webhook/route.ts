import { processHotmartWebhook } from "@/lib/hotmart/webhook-route";

/**
 * Alias VOID-9: POST /api/webhook
 * Mesmo handler de /api/webhooks/hotmart
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  return processHotmartWebhook(request);
}
