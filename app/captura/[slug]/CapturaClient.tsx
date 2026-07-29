"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Shield } from "lucide-react";
import type { CapturePageConfig } from "@/lib/sales/tier-zero-catalog";

type Props = {
  page: CapturePageConfig;
  checkoutUrl: string | null;
};

export function CapturaClient({ page, checkoutUrl }: Props) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Marque o consentimento para continuar.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          profileType: "curious",
          consent: true,
          source: `captura:${page.slug}`,
          segment: page.productSlug,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Não foi possível salvar. Tente de novo.");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#fafafa]">
      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-xs font-bold tracking-[0.16em] uppercase">
          BalcãoIA
        </Link>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
          Captura
        </span>
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-xl px-6 py-12 text-center">
          <span
            className="mb-6 inline-block rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: `${page.primaryColor}18`,
              borderColor: `${page.primaryColor}40`,
              color: page.accentColor,
            }}
          >
            {page.badge}
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            {page.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-white/50">
            {page.subheadline}
          </p>

          <ul className="mx-auto mt-10 max-w-md space-y-3 text-left">
            {page.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-white/70">
                <span style={{ color: page.accentColor }}>✓</span>
                {b}
              </li>
            ))}
          </ul>

          {!done ? (
            <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-3 text-left">
              <label className="sr-only" htmlFor="cap-name">
                Nome
              </label>
              <input
                id="cap-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
              />
              <label className="sr-only" htmlFor="cap-email">
                Email
              </label>
              <input
                id="cap-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Seu melhor email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
              />
              <label className="flex cursor-pointer items-start gap-3 text-left text-xs text-white/45">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5"
                  required
                />
                <span>
                  Concordo com a{" "}
                  <Link href="/politica-de-privacidade" className="underline underline-offset-2">
                    política de privacidade
                  </Link>{" "}
                  e quero receber o material / novidades educativas.
                </span>
              </label>
              {error ? <p className="text-xs text-red-400">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: page.primaryColor }}
              >
                {loading ? "Enviando…" : page.ctaLabel}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>
          ) : (
            <div className="mx-auto mt-10 max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/70">
                Obrigado, {name.split(" ")[0] || "tudo certo"}. Escolha o próximo passo:
              </p>
              <div className="flex flex-col gap-3">
                {checkoutUrl ? (
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl py-3.5 text-center text-sm font-bold text-white"
                    style={{ background: page.primaryColor }}
                  >
                    Ir ao checkout Hotmart
                  </a>
                ) : null}
                <Link
                  href={`/produtos/${page.productSlug}`}
                  className="rounded-xl border border-white/15 py-3.5 text-center text-sm font-semibold text-white/80"
                >
                  Ver página de vendas
                </Link>
                <Link
                  href={`/obrigado?nome=${encodeURIComponent(name)}`}
                  className="text-center text-xs text-white/40 underline-offset-2 hover:underline"
                >
                  Página de confirmação
                </Link>
              </div>
            </div>
          )}

          <p className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/35">
            <Shield className="h-3 w-3" />
            Sem promessa de renda · Conteúdo educativo
          </p>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-[10px] text-white/25">
        © 2026 BalcãoIA ·{" "}
        <Link href="/politica-de-privacidade" className="underline-offset-2 hover:underline">
          Privacidade
        </Link>
      </footer>
    </div>
  );
}
