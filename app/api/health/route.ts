import { NextResponse } from "next/server";

/**
 * Health check do BalcãoIA Studio — não depende de Clerk/Drizzle.
 */
export async function GET() {
  const services = {
    site: {
      status: "healthy" as const,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://balcaoia-studio.vercel.app",
      domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "balcaoialocal.com.br",
    },
    hotmart: {
      status: process.env.HOTMART_HOTTOK ? ("configured" as const) : ("not_configured" as const),
      checkout: process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL || null,
      webhookPath: "/api/webhooks/hotmart",
    },
    auth: {
      firebase: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      demoLogin: true,
    },
    database: {
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "local-demo",
    },
    email: {
      status: process.env.RESEND_API_KEY ? ("configured" as const) : ("log_only" as const),
    },
    ai: {
      provider: process.env.AI_PROVIDER || "mock",
      groq: Boolean(process.env.GROQ_API_KEY),
      openai: Boolean(process.env.OPENAI_API_KEY),
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
      gemini: Boolean(process.env.GEMINI_API_KEY),
    },
  };

  const degraded =
    services.hotmart.status === "not_configured" ||
    (!services.auth.firebase && !services.auth.supabase);

  return NextResponse.json(
    {
      status: degraded ? "degraded" : "healthy",
      product: "BalcãoIA Local / Studio",
      timestamp: new Date().toISOString(),
      services,
      note: "Stack Forge Empire (Clerk/Drizzle) não adotada — produto é BalcãoIA.",
    },
    { status: 200 }
  );
}
