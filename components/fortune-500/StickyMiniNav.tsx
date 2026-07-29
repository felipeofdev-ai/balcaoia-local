"use client";

import Link from "next/link";

type Props = {
  productName: string;
  priceLabel: string;
  checkoutUrl: string | null;
  primaryColor: string;
  icon?: string;
};

/** Navbar fixa mínima — só marca + CTA */
export function StickyMiniNav({
  productName,
  priceLabel,
  checkoutUrl,
  primaryColor,
  icon = "◆",
}: Props) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
          <span className="text-sm" aria-hidden>
            {icon}
          </span>
          <span className="text-xs font-bold tracking-[0.14em] text-white uppercase">BalcãoIA</span>
        </Link>
        <div className="hidden min-w-0 flex-1 px-4 sm:block">
          <p className="truncate text-center text-xs text-white/45">{productName}</p>
        </div>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full px-4 py-2 text-[11px] font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            style={{ background: primaryColor }}
          >
            {priceLabel}
          </a>
        ) : null}
      </div>
    </nav>
  );
}
