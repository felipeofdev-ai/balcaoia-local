import { NextResponse } from "next/server";
import { assertHotmartAdmin } from "@/lib/hotmart/admin-guard";
import { hotmartApi } from "@/lib/hotmart/client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId") || process.env.HOTMART_PRODUCT_ID || "";
  const affiliateId = searchParams.get("affiliateId");

  try {
    const sales = await hotmartApi.get("sales/history", {
      product_id: productId || undefined,
      max_results: affiliateId ? 100 : 50,
    });
    return NextResponse.json({
      ok: true,
      productId,
      affiliateId,
      source: "sales/history",
      sales,
      note: "Gestão (aprovar/comissão) no painel. Aqui: evidência via vendas.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erro" },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return NextResponse.json({
    ok: false,
    code: "PANEL_REQUIRED",
    action: body.action || "approveAffiliate|setCommission",
    message: "Aprovar afiliado e comissão personalizada: painel Hotmart.",
    template: body,
  });
}
