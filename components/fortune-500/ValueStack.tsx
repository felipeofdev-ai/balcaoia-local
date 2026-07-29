"use client";

import { ArrowRight } from "lucide-react";

type Bonus = { name: string; value: number };

type Props = {
  productName: string;
  anchorPrice: number;
  bonuses: Bonus[];
  finalPrice: number;
  installments: number;
  checkoutUrl: string | null;
  primaryColor: string;
  darkColor: string;
};

export function ValueStack({
  productName,
  anchorPrice,
  bonuses,
  finalPrice,
  installments,
  checkoutUrl,
  primaryColor,
  darkColor,
}: Props) {
  const bonusSum = bonuses.reduce((a, b) => a + b.value, 0);
  const totalRef = anchorPrice + bonusSum;
  const parcel = Math.ceil(finalPrice / Math.max(1, installments));

  return (
    <section className="py-20 md:py-24" style={{ background: darkColor }}>
      <div className="mx-auto max-w-lg px-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">O que você leva hoje</h2>
        <p className="mt-2 text-sm font-light text-white/40">
          Valores de referência educativa — sem promessa financeira
        </p>

        <div className="mt-10 space-y-3 text-left">
          <div className="flex justify-between border-b border-white/10 py-3 text-sm">
            <span className="text-white/70">{productName}</span>
            <span className="font-semibold text-white">R$ {anchorPrice}</span>
          </div>
          {bonuses.map((b) => (
            <div key={b.name} className="flex justify-between border-b border-white/5 py-3 text-sm">
              <span className="font-light text-white/45">{b.name}</span>
              <span className="text-white/55">R$ {b.value}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-white/15 py-4">
            <span className="font-bold text-white">Referência total</span>
            <span className="text-white/40 line-through">R$ {totalRef}</span>
          </div>
          <div
            className="flex items-center justify-between rounded-2xl px-5 py-4"
            style={{ background: `${primaryColor}22`, border: `1px solid ${primaryColor}45` }}
          >
            <span className="text-lg font-extrabold text-white">Você investe</span>
            <span className="text-2xl font-extrabold" style={{ color: primaryColor }}>
              R$ {finalPrice}
            </span>
          </div>
        </div>

        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: primaryColor, boxShadow: `0 16px 36px ${primaryColor}35` }}
          >
            Garantir acesso
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : null}
        <p className="mt-3 text-xs font-light text-white/30">
          {installments > 1
            ? `ou ${installments}x de R$ ${parcel} · PIX · cartão · boleto`
            : "PIX · cartão · boleto no checkout Hotmart"}
        </p>
      </div>
    </section>
  );
}
