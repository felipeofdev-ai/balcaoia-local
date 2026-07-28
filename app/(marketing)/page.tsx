import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { DemoSection } from "@/components/marketing/DemoSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { FAQSection } from "@/components/marketing/FAQSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "BalcãoIA Local — Organize o atendimento do seu negócio",
  description:
    "Diagnóstico gratuito, Método 7D e trilha de produtos para organizar atendimento e foco no negócio local — com IA assistida e ética.",
  alternates: { canonical: SITE.url },
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />

      <section className="border-y border-[var(--border)] bg-white py-14">
        <div className="container-app flex flex-col items-center gap-6 text-center">
          <SectionTitle
            eyebrow="Ecossistema"
            title="Uma trilha completa além do Método 7D"
            description="FOCO 14, atendimento ético, catálogo, cursos e programas — no mesmo ecossistema BalcãoIA."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ecossistema" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
              Ver portfólio
            </Link>
            <Link href="/produtos/foco-14" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Começar pelo FOCO 14
            </Link>
            <Link href="/afiliados" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Programa de afiliados
            </Link>
          </div>
          <p className="max-w-xl text-xs text-[var(--muted-foreground)]">
            Conteúdo educativo. Sem promessa de renda. Sem automações não oficiais de WhatsApp.
          </p>
        </div>
      </section>

      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />

      <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
        <div className="container-app flex flex-col gap-12">
          <SectionTitle
            eyebrow="Comece agora"
            title="Seu diagnóstico gratuito está a 1 minuto de distância"
            description="Preencha os dados abaixo para receber acesso ao checklist de 37 perguntas e descobrir onde seu atendimento está perdendo clareza."
          />
          <LeadCaptureForm id="captura" />
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
