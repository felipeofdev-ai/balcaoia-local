"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Props = {
  icon: string;
  badge: string;
  headline: string;
  subheadline: string;
  price: number;
  anchorPrice: number;
  installments: number;
  ctaText: string;
  checkoutUrl: string | null;
  primaryColor: string;
  accentColor: string;
  darkColor: string;
  guaranteeDays: number;
  socialProofLine: string;
  coverSrc?: string;
};

export function HeroProduct({
  icon,
  badge,
  headline,
  subheadline,
  price,
  anchorPrice,
  installments,
  ctaText,
  checkoutUrl,
  primaryColor,
  accentColor,
  darkColor,
  guaranteeDays,
  socialProofLine,
  coverSrc,
}: Props) {
  const discount = Math.max(0, Math.round((1 - price / anchorPrice) * 100));
  const parcel = Math.ceil(price / Math.max(1, installments));

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(165deg, ${darkColor} 0%, #0a0a0a 72%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{ background: `${primaryColor}22` }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:gap-16">
        <div>
          <span
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: `${primaryColor}14`,
              borderColor: `${primaryColor}35`,
              color: accentColor,
            }}
          >
            <span aria-hidden>{icon}</span>
            {badge}
          </span>

          <h1 className="max-w-xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-white/55 sm:text-lg">
            {subheadline}
          </p>

          <p className="mt-4 text-sm text-white/35">{socialProofLine}</p>

          <div className="mt-8 flex flex-wrap items-end gap-3">
            <span className="text-lg text-white/35 line-through">R$ {anchorPrice}</span>
            <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              R$ {price}
            </span>
            {discount > 0 ? (
              <span
                className="rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: primaryColor }}
              >
                −{discount}%
              </span>
            ) : null}
          </div>
          {installments > 1 ? (
            <p className="mt-2 text-sm text-white/40">
              ou {installments}x de R$ {parcel} (conforme opções no checkout Hotmart)
            </p>
          ) : (
            <p className="mt-2 text-sm text-white/40">PIX · cartão · boleto no checkout Hotmart</p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: primaryColor,
                  boxShadow: `0 18px 40px ${primaryColor}40`,
                }}
              >
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white"
                style={{ background: primaryColor }}
              >
                Solicitar link de checkout
              </Link>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/35">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: accentColor }} />
              Garantia {guaranteeDays} dias
            </span>
            <span>Acesso após confirmação</span>
            <span>Sem promessa de renda</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverSrc || "/logo.png"}
              alt=""
              className="aspect-[5/7] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
            />
            <div
              className="absolute -bottom-4 -left-2 rounded-2xl px-5 py-3 text-white shadow-xl sm:-left-4"
              style={{ background: primaryColor }}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">Hoje</p>
              <p className="text-2xl font-extrabold">R$ {price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
