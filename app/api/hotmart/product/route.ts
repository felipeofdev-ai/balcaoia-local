import { NextResponse } from "next/server";
import { assertHotmartAdmin } from "@/lib/hotmart/admin-guard";
import { hotmartApi } from "@/lib/hotmart/client";

export const runtime = "nodejs";

function panelRequired(action: string, template: Record<string, unknown>) {
  return {
    ok: false,
    code: "PANEL_REQUIRED",
    action,
    message:
      "Criação/edição de produto e cupons: use o painel Hotmart. Este endpoint devolve o template operacional.",
    panelUrl: "https://app-vlc.hotmart.com/products",
    template,
  };
}

/** GET — lista produtos configurados no env (+ ping opcional de sales). */
export async function GET(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (productId) {
    try {
      const sales = await hotmartApi.get("sales/history", {
        product_id: productId,
        max_results: 1,
      });
      return NextResponse.json({ ok: true, productId, evidenceFromSales: sales });
    } catch (error) {
      return NextResponse.json(
        { ok: false, error: error instanceof Error ? error.message : "Erro" },
        { status: 502 }
      );
    }
  }

  const ids = (process.env.HOTMART_PRODUCT_IDS || process.env.HOTMART_PRODUCT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return NextResponse.json({
    ok: true,
    products: ids.map((id) => ({ id, source: "env" })),
    note: "Cadastre IDs em HOTMART_PRODUCT_ID(S). Criação continua no painel.",
  });
}

/** POST — template createProduct (painel). */
export async function POST(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;
  const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return NextResponse.json(panelRequired("createProduct", data));
}

/** PUT — template updateProduct (painel). */
export async function PUT(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;
  const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return NextResponse.json(panelRequired("updateProduct", data));
}
