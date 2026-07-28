import { NextResponse } from "next/server";
import { webhookHealthPayload } from "@/lib/hotmart/health";

export const runtime = "nodejs";

/** GET /api/status — status geral do sistema VOID-9 / Studio */
export async function GET() {
  const hasClient = Boolean(process.env.HOTMART_CLIENT_ID?.trim());
  const hasSecret = Boolean(process.env.HOTMART_CLIENT_SECRET?.trim());
  const hasHottok = Boolean(
    (process.env.HOTMART_HOTTOK || process.env.HOTTOK || "").trim()
  );
  const hasAppSecret = Boolean(
    (process.env.APP_SECRET || process.env.HOTMART_API_SECRET || "").trim()
  );

  return NextResponse.json({
    status: "online",
    servico: "BalcãoIA Studio · VOID-9",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
    hotmart: {
      oauth_credentials: hasClient && hasSecret,
      hottok: hasHottok,
      admin_api_secret: hasAppSecret,
      checkout_configured: Boolean(
        process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL &&
          !process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL.includes("SEU_CHECKOUT")
      ),
    },
    endpoints: {
      webhook: "/api/webhook",
      webhook_canonical: "/api/webhooks/hotmart",
      product: "/api/hotmart/product",
      checkout: "/api/hotmart/checkout",
      affiliate: "/api/hotmart/affiliate",
      reports: "/api/hotmart/reports",
      status: "/api/status",
    },
    webhook: webhookHealthPayload(),
  });
}
