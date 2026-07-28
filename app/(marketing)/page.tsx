import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "BalcãoIA Local — Organize o atendimento do seu negócio",
  description:
    "Descubra em minutos onde seu atendimento perde vendas com o checklist de 37 perguntas do BalcãoIA e receba um plano simples para vender com mais clareza.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />

      <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
        <div className="container-app flex flex-col gap-12">
          <SectionTitle
            eyebrow="Comece agora"
            title="Seu diagnóstico gratuito está a 1 minuto de distância"
            description="Preencha os dados abaixo para receber acesso ao checklist de 37 perguntas e descobrir onde seu atendimento está perdendo vendas."
          />
          <LeadCaptureForm id="captura" />
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
