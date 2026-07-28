"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalUser } from "@/lib/local-store";

export default function OnboardingPage() {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setName(getLocalUser()?.name?.split(" ")[0] || "");
  }, []);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-lg text-center">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-amber)]/15">
            <PartyPopper className="h-7 w-7 text-[var(--brand-amber-dark)]" />
          </span>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            {name ? `Bem-vindo(a), ${name}!` : "Bem-vindo(a) ao BalcãoIA Studio!"}
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Em poucos minutos você organiza o atendimento do seu negócio: preenche um wizard
            guiado, gera scripts e prompts com IA, testa tudo no simulador e exporta pronto para
            usar — sem inventar preços, prazos ou promessas.
          </p>
          <Link href="/app/businesses/new">
            <Button size="lg">
              Criar meu primeiro negócio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
