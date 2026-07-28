import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_APP_ROUTES = ["/app/login"];

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  if (PUBLIC_APP_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  if (isSupabaseConfigured()) {
    const hasSupabaseSession = request.cookies
      .getAll()
      .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token"));

    if (!hasSupabaseSession) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/app/login";
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Sem Supabase configurado: MVP roda em modo demo com store local no navegador.
  // A sessão é sinalizada por um cookie leve, definido pela página de login.
  const isDemoSession = request.cookies.get("balcaoia_demo")?.value === "1";
  if (!isDemoSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/app/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
