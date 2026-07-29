import Link from "next/link";
import { ShieldCheck } from "lucide-react";

type Props = {
  guaranteeDays: number;
  checkoutUrl: string | null;
  primaryColor: string;
  ctaText: string;
};

export function GuaranteeSection({ guaranteeDays, checkoutUrl, primaryColor, ctaText }: Props) {
  return (
    <section className="bg-[#fafafa] py-20">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <ShieldCheck className="mx-auto h-14 w-14" style={{ color: primaryColor }} />
        <h2 className="mt-5 text-2xl font-extrabold text-[#0a0a0a] md:text-3xl">
          Garantia de {guaranteeDays} dias
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-[#6b7280]">
          Avalie o material com uso real. Se não fizer sentido para o seu contexto, solicite
          reembolso pela Hotmart no prazo da garantia — conforme política da plataforma.
        </p>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-2xl px-8 py-3.5 text-sm font-bold text-white"
            style={{ background: primaryColor }}
          >
            {ctaText}
          </a>
        ) : (
          <Link
            href="/contato"
            className="mt-8 inline-flex rounded-2xl px-8 py-3.5 text-sm font-bold text-white"
            style={{ background: primaryColor }}
          >
            Falar com suporte
          </Link>
        )}
      </div>
    </section>
  );
}
