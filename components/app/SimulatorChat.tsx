"use client";

import * as React from "react";
import { AlertTriangle, Bot, Download, Send, ShieldAlert, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WizardData } from "@/types/business";

export interface SimulatorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  complianceAlerts?: string[];
  createdAt: string;
}

export interface SimulatorChatProps {
  businessId: string;
  businessName?: string;
  wizardData: WizardData;
}

function confidenceColor(confidence?: number) {
  if (confidence === undefined) return "secondary";
  if (confidence >= 0.7) return "petrol";
  if (confidence >= 0.4) return "amber";
  return "outline";
}

export function SimulatorChat({ businessId, businessName, wizardData }: SimulatorChatProps) {
  const [messages, setMessages] = React.useState<SimulatorMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;

    const userMessage: SimulatorMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, message: text, wizardData, history }),
      });
      if (!res.ok) throw new Error("Falha na simulação");
      const data = (await res.json()) as {
        reply: string;
        confidence: number;
        complianceAlerts: string[];
      };
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          confidence: data.confidence,
          complianceAlerts: data.complianceAlerts,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Não foi possível simular a resposta agora. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  function handleExport() {
    if (!messages.length) return;
    const lines = [
      `# Simulação de atendimento — ${businessName ?? "Negócio"}`,
      `Exportado em ${new Date().toLocaleString("pt-BR")}`,
      "",
      ...messages.map((m) => {
        const who = m.role === "user" ? "Cliente (simulado)" : "Agente IA";
        const extra =
          m.role === "assistant"
            ? `\n(confiança: ${Math.round((m.confidence ?? 0) * 100)}%${
                m.complianceAlerts?.length ? ` · alertas: ${m.complianceAlerts.join("; ")}` : ""
              })`
            : "";
        return `**${who}:** ${m.content}${extra}\n`;
      }),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulacao-${businessName ?? "negocio"}.md`.toLowerCase().replace(/\s+/g, "-");
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <p>
          Ambiente de <strong>simulação apenas</strong>: nenhuma mensagem é enviada a clientes reais
          ou canais externos.
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-sm text-[var(--muted-foreground)]">
            <Bot className="h-8 w-8 text-[var(--brand-petrol)]/50" />
            <p>Envie uma mensagem como se fosse um cliente para testar seu agente.</p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex gap-2.5", m.role === "user" ? "justify-end" : "justify-start")}
          >
            {m.role === "assistant" && (
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-petrol)] text-white">
                <Bot className="h-4 w-4" />
              </span>
            )}
            <div className={cn("max-w-[80%] space-y-1.5", m.role === "user" && "items-end")}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                  m.role === "user"
                    ? "rounded-tr-sm bg-[var(--brand-petrol)] text-white"
                    : "rounded-tl-sm bg-[var(--muted)] text-[var(--brand-graphite)]"
                )}
              >
                {m.content}
              </div>
              {m.role === "assistant" && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant={confidenceColor(m.confidence)}>
                    Confiança: {Math.round((m.confidence ?? 0) * 100)}%
                  </Badge>
                  {m.complianceAlerts?.map((alert, idx) => (
                    <Badge key={idx} variant="outline" className="border-red-300 text-red-700">
                      <ShieldAlert className="h-3 w-3" /> {alert}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {m.role === "user" && (
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--brand-graphite)]">
                <User className="h-4 w-4" />
              </span>
            )}
          </div>
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-petrol)]" />
            Agente digitando…
          </div>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      <div className="border-t border-[var(--border)] p-3">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Digite como se fosse um cliente…"
            className="min-h-[44px] flex-1 resize-none"
            rows={1}
          />
          <Button onClick={handleSend} loading={sending} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            Enviar
          </Button>
        </div>
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            disabled={!messages.length}
          >
            <Download className="h-4 w-4" />
            Exportar conversa
          </Button>
        </div>
      </div>
    </div>
  );
}
