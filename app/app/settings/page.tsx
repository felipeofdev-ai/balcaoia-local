"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bot,
  ExternalLink,
  Flame,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  getLocalUser,
  isAdminDemo,
  setAdminDemo,
  setLocalUser,
} from "@/lib/local-store";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  AI_PROVIDER_OPTIONS,
  AI_PROVIDER_STORAGE_KEY,
  type AIProviderId,
} from "@/lib/config/ai-providers";
import { HOTMART } from "@/lib/config/hotmart";
import { SITE } from "@/lib/config/site";
import { cn } from "@/lib/utils";

interface ProviderStatus {
  id: string;
  available: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [admin, setAdmin] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [provider, setProvider] = React.useState<AIProviderId>("mock");
  const [statuses, setStatuses] = React.useState<ProviderStatus[]>([]);
  const firebaseOk = isFirebaseConfigured();

  React.useEffect(() => {
    const user = getLocalUser();
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setAdmin(isAdminDemo());
    const stored = localStorage.getItem(AI_PROVIDER_STORAGE_KEY) as AIProviderId | null;
    if (stored) setProvider(stored);
    fetch("/api/ai/generate")
      .then((r) => r.json())
      .then((data: { providers?: ProviderStatus[]; defaultProvider?: string }) => {
        setStatuses(data.providers ?? []);
        if (!stored && data.defaultProvider) {
          setProvider(data.defaultProvider as AIProviderId);
        }
      })
      .catch(() => undefined);
  }, []);

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setLocalUser({ name: name.trim() || "Usuário demo", email: email.trim() });
    localStorage.setItem(AI_PROVIDER_STORAGE_KEY, provider);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  function handleToggleAdmin(checked: boolean) {
    setAdmin(checked);
    setAdminDemo(checked);
  }

  function handleResetDemoData() {
    if (
      !window.confirm(
        "Isso vai apagar todos os negócios, leads e templates salvos neste navegador. Continuar?"
      )
    ) {
      return;
    }
    localStorage.removeItem("balcaoia_businesses");
    localStorage.removeItem("balcaoia_leads");
    localStorage.removeItem("balcaoia_niche_templates");
    localStorage.removeItem("balcaoia_hotmart_events");
    router.push("/app/dashboard");
    router.refresh();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--brand-graphite)]">Configurações</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Perfil, provedores de IA, Firebase e links comerciais do BalcãoIA Studio.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Firebase
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--brand-graphite)]">
            {firebaseOk ? "Conectado" : "Pendente"}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Supabase
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--brand-graphite)]">
            {isSupabaseConfigured() ? "Conectado" : "Opcional"}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            IA ativa
          </p>
          <p className="mt-1 text-sm font-semibold capitalize text-[var(--brand-graphite)]">
            {provider}
          </p>
        </div>
      </div>

      {!firebaseOk && !isSupabaseConfigured() && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Modo demonstração: dados neste navegador. Com Firebase Auth ativo, o login real já
            funciona; configure Firestore e Blaze para persistência e Hosting.
          </p>
        </div>
      )}

      <Card>
        <form onSubmit={handleSaveProfile}>
          <CardHeader>
            <CardTitle className="text-base">Perfil</CardTitle>
            <CardDescription>Nome e e-mail exibidos no cabeçalho do app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                className="mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Button type="submit">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
            {saved && <span className="text-xs text-[var(--brand-petrol)]">Salvo!</span>}
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-4 w-4 text-[var(--brand-petrol)]" />
            Provedor de IA
          </CardTitle>
          <CardDescription>
            Escolha Groq/Llama, Gemini, GPT ou Claude. As chaves ficam só no servidor (.env). Sem
            chave, o sistema usa Mock automaticamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {AI_PROVIDER_OPTIONS.map((opt) => {
            const st = statuses.find((s) => s.id === opt.id);
            const available = opt.id === "mock" || st?.available !== false;
            const selected = provider === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setProvider(opt.id);
                  localStorage.setItem(AI_PROVIDER_STORAGE_KEY, opt.id);
                }}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  selected
                    ? "border-[var(--brand-petrol)] bg-[var(--brand-petrol)]/5"
                    : "border-[var(--border)] hover:border-[var(--brand-petrol)]/40"
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[var(--brand-graphite)]">{opt.label}</span>
                  {opt.paid ? (
                    <Badge variant="secondary">Pago</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">Free tier</Badge>
                  )}
                  {selected && <Badge variant="default">Ativo</Badge>}
                  {!available && opt.id !== "mock" && (
                    <Badge variant="outline">Chave ausente → fallback mock</Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{opt.description}</p>
                <p className="mt-2 text-[11px] text-[var(--muted-foreground)]">
                  Modelos: {opt.models.join(", ")} · {opt.freeTierHint}
                  {opt.envKey ? ` · Env: ${opt.envKey}` : ""}
                </p>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Flame className="h-4 w-4 text-[var(--brand-amber-dark)]" />
            Comercialização
          </CardTitle>
          <CardDescription>
            Links para checkout Hotmart, afiliados e suporte. Domínio previsto: {SITE.domain}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-2">
            <a
              href={HOTMART.checkoutUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 hover:bg-black/5"
            >
              Checkout Hotmart <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={HOTMART.affiliateBaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 hover:bg-black/5"
            >
              Área afiliados Hotmart <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 hover:bg-black/5"
            >
              {SITE.supportEmail}
            </a>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            Comissão sugerida afiliados: {HOTMART.affiliateCommissionPercent}% · Garantia:{" "}
            {HOTMART.guaranteeDays} dias · Webhook: <code>{HOTMART.webhookPath}</code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-[var(--brand-petrol)]" />
            Modo administrador (demonstração)
          </CardTitle>
          <CardDescription>
            Habilita templates, leads e eventos Hotmart neste navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex cursor-pointer items-center gap-3">
            <Checkbox checked={admin} onChange={(e) => handleToggleAdmin(e.target.checked)} />
            <span className="text-sm text-[var(--brand-graphite)]">
              Ativar modo administrador para esta sessão
            </span>
          </label>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base text-red-700">Zona de risco</CardTitle>
          <CardDescription>
            Remove negócios, leads e templates salvos neste navegador.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={handleResetDemoData}>
            <Trash2 className="h-4 w-4" />
            Resetar dados de demonstração
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
