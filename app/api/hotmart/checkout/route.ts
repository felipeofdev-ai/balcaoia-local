import { NextResponse } from "next/server";
import { assertHotmartAdmin } from "@/lib/hotmart/admin-guard";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;

  const productId = new URL(request.url).searchParams.get("productId") || process.env.HOTMART_PRODUCT_ID;
  const checkoutUrl =
    (productId && process.env[`HOTMART_CHECKOUT_${productId}`]) ||
    process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL ||
    null;

  return NextResponse.json({
    ok: Boolean(checkoutUrl && !String(checkoutUrl).includes("SEU_CHECKOUT")),
    productId,
    checkoutUrl,
  });
}

export async function POST(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return NextResponse.json({
    ok: false,
    code: "PANEL_REQUIRED",
    action: body.action || "configureCheckout",
    message: "Checkout, bump, upsell e pixel: configure no painel Hotmart da oferta.",
    panelUrl: "https://app-vlc.hotmart.com/products",
    template: body,
  });
}
