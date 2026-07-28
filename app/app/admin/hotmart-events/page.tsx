"use client";

import * as React from "react";
import { PlusCircle, ShieldAlert, ShieldCheck, Webhook } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  getHotmartEvents,
  isAdminDemo,
  saveHotmartEvent,
  setAdminDemo,
  type LocalHotmartEvent,
} from "@/lib/local-store";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR");
  } catch {
    return iso;
  }
}

const SAMPLE_EVENT_TYPES = ["PURCHASE_APPROVED", "PURCHASE_CANCELED", "PURCHASE_REFUNDED"];

export default function AdminHotmartEventsPage() {
  const [admin, setAdmin] = React.useState<boolean | null>(null);
  const [events, setEvents] = React.useState<LocalHotmartEvent[]>([]);

  React.useEffect(() => {
    setAdmin(isAdminDemo());
    setEvents(getHotmartEvents());
  }, []);

  function handleEnableAdmin() {
    setAdminDemo(true);
    setAdmin(true);
  }

  function handleSimulateEvent() {
    const eventType = SAMPLE_EVENT_TYPES[Math.floor(Math.random() * SAMPLE_EVENT_TYPES.length)];
    saveHotmartEvent({
      id: crypto.randomUUID(),
      eventType,
      buyerEmail: "cliente-demo@email.com",
      buyerName: "Cliente Demonstração",
      productId: "balcaoia-studio",
      purchaseId: `HP${Math.floor(Math.random() * 1_000_000)}`,
      createdAt: new Date().toISOString(),
    });
    setEvents(getHotmartEvents());
  }

  if (admin === null) return null;

  if (!admin) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <ShieldAlert className="h-10 w-10 text-amber-500" />
          <CardTitle className="text-base">Área restrita a administradores</CardTitle>
          <CardDescription>
            Ative o modo admin de demonstração para visualizar os eventos recebidos da Hotmart.
          </CardDescription>
          <Button onClick={handleEnableAdmin}>
            <ShieldCheck className="h-4 w-4" />
            Ativar modo admin (demo)
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">
            Eventos Hotmart
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Placeholder dos eventos recebidos via webhook da Hotmart (compra aprovada, cancelada,
            reembolsada).
          </p>
        </div>
        <Button variant="outline" onClick={handleSimulateEvent}>
          <PlusCircle className="h-4 w-4" />
          Simular evento (demo)
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={Webhook}
          title="Nenhum evento registrado ainda"
          description="Em produção, eventos reais chegam via webhook configurado na Hotmart. Use o botão acima para simular um evento neste ambiente de demonstração."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3">Comprador</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Compra</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3">
                    <Badge variant={event.eventType.includes("APPROVED") ? "petrol" : "secondary"}>
                      {event.eventType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--brand-graphite)]">{event.buyerName || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{event.buyerEmail || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{event.productId || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{event.purchaseId || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">
                    {formatDate(event.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
