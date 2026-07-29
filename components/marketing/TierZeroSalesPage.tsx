"use client";

import { ArrowRight } from "lucide-react";
import {
  StickyMiniNav,
  HeroProduct,
  ProblemSection,
  SolutionSection,
  ModuleCard,
  BonusCard,
  ValueStack,
  FaqSection,
  GuaranteeSection,
  TierZeroFooter,
} from "@/components/fortune-500";
import type { TierZeroProduct } from "@/lib/sales/tier-zero-types";

type Props = { product: TierZeroProduct };

export function TierZeroSalesPage({ product }: Props) {
  const c = product.colors;
  const checkout = product.checkoutUrl && product.checkoutUrl !== "#" ? product.checkoutUrl : null;

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <StickyMiniNav
        productName={product.name}
        priceLabel={`R$ ${product.price}`}
        checkoutUrl={checkout}
        primaryColor={c.primary}
        icon={product.icon}
      />

      <HeroProduct
        icon={product.icon}
        badge={product.badge}
        headline={product.headline}
        subheadline={product.subheadline}
        price={product.price}
        anchorPrice={product.anchorPrice}
        installments={product.installments}
        ctaText={product.ctaText}
        checkoutUrl={checkout}
        primaryColor={c.primary}
        accentColor={c.accent}
        darkColor={c.dark}
        guaranteeDays={product.guaranteeDays}
        socialProofLine={product.socialProofLine}
        coverSrc={product.coverSrc}
      />

      <ProblemSection
        title={product.problem.title}
        subtitle={product.problem.subtitle}
        items={product.problem.items}
        primaryColor={c.primary}
      />

      <SolutionSection
        title={product.solution.title}
        description={product.solution.description}
        features={product.solution.features}
        primaryColor={c.primary}
      />

      <section className="bg-[#0a0a0a] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              O que está incluso
            </h2>
            <p className="mt-3 text-base font-light text-white/35">
              Conteúdo organizado para implementar com clareza
            </p>
          </div>
          <div className="space-y-4">
            {product.modules.map((m) => (
              <ModuleCard
                key={m.number}
                number={m.number}
                title={m.title}
                items={m.items}
                primaryColor={c.primary}
              />
            ))}
          </div>
        </div>
      </section>

      {product.bonuses.length > 0 ? (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5">
            <p
              className="mb-3 text-center text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{ color: c.primary }}
            >
              Complementos
            </p>
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#0a0a0a]">
              Você também recebe
            </h2>
            <div className="space-y-4">
              {product.bonuses.map((b) => (
                <BonusCard
                  key={b.title}
                  icon={b.icon}
                  title={b.title}
                  description={b.description}
                  value={b.value}
                  primaryColor={c.primary}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ValueStack
        productName={product.name}
        anchorPrice={product.anchorPrice}
        bonuses={product.bonuses.map((b) => ({ name: b.title, value: b.value }))}
        finalPrice={product.price}
        installments={product.installments}
        checkoutUrl={checkout}
        primaryColor={c.primary}
        darkColor={c.dark}
      />

      <section className="border-y border-[#eee] bg-[#fafafa] py-10">
        <p className="mx-auto max-w-2xl px-5 text-center text-sm font-medium text-[#6b7280]">
          {product.socialProofLine}
        </p>
      </section>

      <GuaranteeSection
        guaranteeDays={product.guaranteeDays}
        checkoutUrl={checkout}
        primaryColor={c.primary}
        ctaText="Quero testar sem risco"
      />

      <FaqSection faqs={product.faqs} primaryColor={c.primary} />

      <section className="py-20 md:py-24" style={{ background: c.dark }}>
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {product.finalCtaTitle}
          </h2>
          <p className="mt-4 text-base font-light text-white/40">
            Acesso após confirmação · Garantia {product.guaranteeDays} dias · Conteúdo educativo
          </p>
          {checkout ? (
            <a
              href={checkout}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: c.primary, boxShadow: `0 18px 40px ${c.primary}40` }}
            >
              {product.ctaText}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          <p className="mt-4 text-xs text-white/25">
            PIX · cartão · boleto no checkout Hotmart · Sem promessa de renda
          </p>
        </div>
      </section>

      <TierZeroFooter icon={product.icon} />
    </div>
  );
}
