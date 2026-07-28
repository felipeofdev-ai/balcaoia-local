import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const diagnosticSchema = z.object({
  leadId: z.string().optional(),
  email: z.string().email("E-mail inválido").optional(),
  score: z.number().min(0).max(100),
  answers: z.record(z.string(), z.number()),
  bottlenecks: z.array(z.string()).optional(),
  actionPlan: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = diagnosticSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const d = parsed.data;
  const supabase = createServiceClient();

  if (!supabase) {
    // Sem Supabase configurado — o front-end persiste em localStorage como
    // fallback e este endpoint apenas confirma o recebimento.
    return NextResponse.json({ ok: true, mode: "local" }, { status: 201 });
  }

  const { data, error } = await supabase
    .from("diagnostic_results")
    .insert({
      lead_id: d.leadId ?? null,
      email: d.email ?? null,
      score: d.score,
      answers: d.answers,
      bottlenecks: d.bottlenecks ?? null,
      action_plan: d.actionPlan ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível salvar o diagnóstico." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase", id: data?.id }, { status: 201 });
}
