import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { DisclaimerBrands } from "@/components/marketing/DisclaimerBrands";

const legalLinks = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/disclaimer", label: "Disclaimer de Marcas" },
];

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-graphite-dark)] text-white">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="inline-flex w-fit rounded-xl bg-white px-4 py-3 shadow-sm">
            <BrandLogo size="lg" variant="light" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Um sistema simples para organizar o atendimento do seu negócio e
            vender com mais clareza — sem depender de improviso.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white/80">Institucional</h3>
          <nav className="flex flex-col gap-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-[var(--brand-amber)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white/80">Contato</h3>
          <a
            href="mailto:contato@balcaoialocal.com.br"
            className="text-sm text-white/60 transition-colors hover:text-[var(--brand-amber)]"
          >
            contato@balcaoialocal.com.br
          </a>
          <p className="text-sm text-white/60">Feito para negócios locais do Brasil.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col gap-6 py-8">
          <DisclaimerBrands />
          <p className="text-xs text-white/40">
            © {year} BalcãoIA Local. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
