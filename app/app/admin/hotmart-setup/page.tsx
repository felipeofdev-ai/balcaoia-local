"use client";

import * as React from "react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HOTMART } from "@/lib/config/hotmart";
import { SITE } from "@/lib/config/site";

const STEPS = [
  {
    id: "account",
    title: "Conta Hotmart",
    items: [
      "Criar/verificar conta em hotmart.com",
      "Documentos e dados bancários",
    ],
    href: "https://app-vlc.hotmart.com/",
  },
  {
    id: "product",
    title: "Produto principal BalcãoIA",
    items: [
      `Nome: ${HOTMART.productName}`,
      "Tipo: produto digital + acesso externo",
      `Página de vendas: ${SITE.url}/vendas`,
      `Área de membros: ${SITE.url}/app/login`,
    ],
    href: "https://app-vlc.hotmart.com/products",
  },
  {
    id: "webhook",
    title: "Webhook",
    items: [
      `URL: ${SITE.url}/api/webhooks/hotmart`,
      "Copiar HOTTOK → variável HOTMART_HOTTOK na Vercel",
      "Ativar eventos de compra/reembolso/assinatura",
    ],
    href: "https://app-vlc.hotmart.com/tools/webhook",
  },
  {
    id: "affiliates",
    title: "Afiliados",
    items: [
      `Comissão sugerida: ${HOTMART.affiliateCommissionPercent}%`,
      "Cookie 60–90 dias",
      "Material: /afiliados",
    ],
    href: HOTMART.affiliateBaseUrl,
  },
  {
    id: "test",
    title: "Teste",
    items: [
      "Compra teste / sandbox",
      "Verificar evento em /app/admin/hotmart-events",
      "Confirmar e-mail de entrega",
    ],
  },
];

export default function HotmartSetupPage() {
  const [done, setDone] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("balcaoia_hotmart_checklist");
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("balcaoia_hotmart_checklist", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">Setup Hotmart</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Checklist operacional — você executa no painel Hotmart; o Studio já está pronto para receber.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((step) => {
          const ok = Boolean(done[step.id]);
          return (
            <Card key={step.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <button type="button" onClick={() => toggle(step.id)} aria-label="Marcar passo">
                    {ok ? (
                      <CheckCircle2 className="h-6 w-6 text-[var(--brand-petrol)]" />
                    ) : (
                      <Circle className="h-6 w-6 text-[var(--muted-foreground)]" />
                    )}
                  </button>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                </div>
                {step.href && (
                  <a href={step.href} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      Abrir
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                )}
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-6 text-sm text-[var(--muted-foreground)]">
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
