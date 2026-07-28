import { NextResponse } from "next/server";
import { assertHotmartAdmin } from "@/lib/hotmart/admin-guard";
import { hotmartApi } from "@/lib/hotmart/client";

export const runtime = "nodejs";

function toMs(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  if (Number.isFinite(n) && String(value).length > 10) return n;
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : undefined;
}

/**
 * GET /api/hotmart/reports?type=sales|summary|revenue|daily&start=&end=&productId=&days=
 */
export async function GET(request: Request) {
  const denied = assertHotmartAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "summary";
  const productId = searchParams.get("productId") || process.env.HOTMART_PRODUCT_ID || undefined;
  const start = toMs(searchParams.get("start"));
  const end = toMs(searchParams.get("end"));
  const days = Number(searchParams.get("days") || 7);

  try {
    if (type === "sales") {
      const data = await hotmartApi.get("sales/history", {
        start_date: start,
        end_date: end,
        product_id: productId,
        max_results: 100,
      });
      return NextResponse.json({ ok: true, type, data });
    }

    if (type === "daily" || type === "revenue") {
      const e = end ?? Date.now();
      const s = start ?? e - days * 86_400_000;
      const data = await hotmartApi.get("sales/summary", {
        start_date: s,
        end_date: e,
        product_id: productId,
      });
      return NextResponse.json({ ok: true, type, days, data });
    }

    const e = end ?? Date.now();
    const s = start ?? e - 30 * 86_400_000;
    const data = await hotmartApi.get("sales/summary", {
      start_date: s,
      end_date: e,
      product_id: productId,
    });
    return NextResponse.json({ ok: true, type: "summary", data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erro ao consultar Hotmart",
      },
      { status: 502 }
    );
  }
}
