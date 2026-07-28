import { NextResponse } from "next/server";
import { businessCreateSchema } from "@/lib/validations/business";
import { createServiceClient } from "@/lib/supabase/server";
import { createMockBusiness, listMockBusinesses } from "@/lib/businesses/mock-store";

export const runtime = "nodejs";

export async function GET() {
  const supabase = createServiceClient();

  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "mock", businesses: listMockBusinesses() });
  }

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível listar os negócios." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase", businesses: data });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = businessCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const supabase = createServiceClient();

  if (!supabase) {
    const business = createMockBusiness(parsed.data);
    return NextResponse.json({ ok: true, mode: "mock", business }, { status: 201 });
  }

  const { data, error } = await supabase
    .from("businesses")
    .insert({
      name: parsed.data.name,
      segment: parsed.data.segment ?? null,
      city: parsed.data.city ?? null,
      description: parsed.data.description ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível criar o negócio." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase", business: data }, { status: 201 });
}
