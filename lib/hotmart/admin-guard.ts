import { timingSafeEqual } from "node:crypto";

/**
 * Protege rotas /api/hotmart/* com header x-void9-secret === APP_SECRET|HOTMART_API_SECRET.
 * Sem secret configurado, bloqueia em produção e libera em development.
 */
export function assertHotmartAdmin(request: Request): Response | null {
  const expected =
    process.env.HOTMART_API_SECRET || process.env.APP_SECRET || "";
  const received = request.headers.get("x-void9-secret") || "";

  if (!expected) {
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { ok: false, error: "Configure APP_SECRET ou HOTMART_API_SECRET" },
        { status: 503 }
      );
    }
    return null;
  }

  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  if (!ok) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
