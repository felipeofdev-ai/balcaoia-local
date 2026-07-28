import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  deleteMockBusiness,
  getMockBusiness,
  updateMockBusiness,
} from "@/lib/businesses/mock-store";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServiceClient();

  if (!supabase) {
    const business = getMockBusiness(id);
    if (!business) {
      return NextResponse.json({ ok: false, error: "Negócio não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, mode: "mock", business });
  }

  const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single();
  if (error || !data) {
    return NextResponse.json({ ok: false, error: "Negócio não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, mode: "supabase", business: data });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const supabase = createServiceClient();

  if (!supabase) {
    const business = updateMockBusiness(id, body);
    if (!business) {
      return NextResponse.json({ ok: false, error: "Negócio não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, mode: "mock", business });
  }

  const { data, error } = await supabase
    .from("businesses")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível atualizar o negócio." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase", business: data });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServiceClient();

  if (!supabase) {
    const deleted = deleteMockBusiness(id);
    if (!deleted) {
      return NextResponse.json({ ok: false, error: "Negócio não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, mode: "mock" });
  }

  const { error } = await supabase.from("businesses").delete().eq("id", id);
  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível excluir o negócio." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase" });
}
