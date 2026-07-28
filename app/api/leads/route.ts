import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/lead";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido" },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;
  const supabase = createServiceClient();

  if (!supabase) {
    // Sem Supabase configurado — modo local/MVP. O front-end também
    // persiste o lead em localStorage como fallback.
    return NextResponse.json({ ok: true, mode: "local" }, { status: 201 });
  }

  const { error } = await supabase.from("lead_captures").insert({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || null,
    segment: lead.segment || null,
    profile_type: lead.profileType,
    consent: lead.consent,
    source: lead.source || null,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível salvar o lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase" }, { status: 201 });
}
