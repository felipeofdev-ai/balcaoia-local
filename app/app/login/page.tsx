"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Lock, LogIn, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  firebaseCompleteMagicLink,
  firebaseSendMagicLink,
  firebaseSignIn,
  firebaseSignUp,
  isFirebaseConfigured,
} from "@/lib/firebase/auth";
import { saveUserProfile } from "@/lib/firebase/firestore";
import { setAdminDemo, setLocalUser } from "@/lib/local-store";
import { DEMO_ACCOUNT, isDemoAccount } from "@/lib/config/demo-account";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/app/dashboard";
  const supabaseConfigured = isSupabaseConfigured();
  const firebaseConfigured = isFirebaseConfigured();
  const authReady = firebaseConfigured || supabaseConfigured;

  const [magicEmail, setMagicEmail] = React.useState("");
  const [magicSent, setMagicSent] = React.useState(false);
  const [pwEmail, setPwEmail] = React.useState<string>(DEMO_ACCOUNT.email);
  const [pwPassword, setPwPassword] = React.useState("");
  const [demoName, setDemoName] = React.useState<string>(DEMO_ACCOUNT.name);
  const [demoEmail, setDemoEmail] = React.useState<string>(DEMO_ACCOUNT.email);
  const [loading, setLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function enterDemoSession(name: string, email: string, asAdmin = true) {
    setLocalUser({ name, email });
    setAdminDemo(asAdmin);
    router.push(redirectTo);
  }

  React.useEffect(() => {
    if (!firebaseConfigured || searchParams.get("emailLink") !== "1") return;
    (async () => {
      try {
        const cred = await firebaseCompleteMagicLink();
        if (cred?.user) {
          const name = cred.user.displayName || cred.user.email?.split("@")[0] || "Usuário";
          const email = cred.user.email || "";
          setLocalUser({ name, email });
          await saveUserProfile(cred.user.uid, { name, email }).catch(() => undefined);
          router.push(redirectTo);
        }
      } catch {
        setError("Não foi possível concluir o link mágico. Solicite um novo.");
      }
    })();
  }, [firebaseConfigured, redirectTo, router, searchParams]);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!authReady) return;
    setLoading("magic");
    setError(null);
    try {
      if (firebaseConfigured) {
        await firebaseSendMagicLink(magicEmail);
        setMagicSent(true);
      } else {
        const supabase = createClient();
        const { error: err } = await supabase!.auth.signInWithOtp({
          email: magicEmail,
          options: { emailRedirectTo: `${window.location.origin}${redirectTo}` },
        });
        if (err) throw err;
        setMagicSent(true);
      }
    } catch {
      setError("Não foi possível enviar o link mágico. Verifique o e-mail e tente novamente.");
    } finally {
      setLoading(null);
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading("password");
    setError(null);
    try {
      // Conta demo oficial — funciona mesmo sem Firebase/Supabase
      if (isDemoAccount(pwEmail, pwPassword)) {
        enterDemoSession(DEMO_ACCOUNT.name, DEMO_ACCOUNT.email, true);
        return;
      }
      if (!authReady) {
        setError("Use a conta demo abaixo ou configure Firebase/Supabase.");
        return;
      }
      if (firebaseConfigured) {
        let cred;
        try {
          cred = await firebaseSignIn(pwEmail, pwPassword);
        } catch {
          cred = await firebaseSignUp(pwEmail, pwPassword, pwEmail.split("@")[0]);
        }
        const name = cred.user.displayName || pwEmail.split("@")[0];
        setLocalUser({ name, email: pwEmail });
        await saveUserProfile(cred.user.uid, { name, email: pwEmail }).catch(() => undefined);
        router.push(redirectTo);
      } else {
        const supabase = createClient();
        const { error: err } = await supabase!.auth.signInWithPassword({
          email: pwEmail,
          password: pwPassword,
        });
        if (err) throw err;
        router.push(redirectTo);
      }
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(null);
    }
  }

  function handleDemoLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading("demo");
    setError(null);
    const name = demoName.trim() || DEMO_ACCOUNT.name;
    const email = demoEmail.trim() || DEMO_ACCOUNT.email;
    enterDemoSession(name, email, true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--muted)] px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" aria-label="BalcãoIA Local">
            <BrandLogo size="xl" priority className="mx-auto" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[var(--brand-graphite)]">
              Entrar no BalcãoIA Studio
            </h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Organize o atendimento do seu negócio em minutos.
            </p>
          </div>
        </div>

        {firebaseConfigured ? (
          <div className="rounded-lg border border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5 px-4 py-3 text-xs text-[var(--brand-petrol)]">
            Firebase ativo — autenticação e dados conectados ao projeto Google Cloud.
          </div>
        ) : !supabaseConfigured ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            Auth cloud ainda não está no ar. Use a <strong>conta demo</strong> abaixo para
            testar o Studio completo neste navegador.
          </div>
        ) : null}

        <Card className="border-[var(--brand-petrol)]/30">
          <CardHeader>
            <CardTitle className="text-base">Entrar com e-mail e senha</CardTitle>
            <CardDescription>
              Conta demo oficial: <code className="text-xs">{DEMO_ACCOUNT.email}</code> /{" "}
              <code className="text-xs">{DEMO_ACCOUNT.password}</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordLogin} className="space-y-3">
              <div>
                <Label htmlFor="pw-email">E-mail</Label>
                <Input
                  id="pw-email"
                  type="email"
                  className="mt-1.5"
                  value={pwEmail}
                  onChange={(e) => setPwEmail(e.target.value)}
                  placeholder={DEMO_ACCOUNT.email}
                />
              </div>
              <div>
                <Label htmlFor="pw-password">Senha</Label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <Input
                    id="pw-password"
                    type="password"
                    value={pwPassword}
                    onChange={(e) => setPwPassword(e.target.value)}
                    placeholder="Digite a senha demo"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="amber"
                className="w-full"
                loading={loading === "password"}
              >
                <LogIn className="h-4 w-4" />
                Entrar no Studio
              </Button>
            </form>

            {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

            {authReady && (
              <>
                <div className="my-4 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                  <div className="h-px flex-1 bg-[var(--border)]" />
                  ou link mágico
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
                {magicSent ? (
                  <p className="rounded-lg bg-[var(--brand-petrol)]/10 px-3 py-2.5 text-sm text-[var(--brand-petrol)]">
                    Link enviado! Verifique sua caixa de entrada.
                  </p>
                ) : (
                  <form onSubmit={handleMagicLink} className="space-y-3">
                    <div>
                      <Label htmlFor="magic-email">E-mail</Label>
                      <div className="relative mt-1.5">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                        <Input
                          id="magic-email"
                          type="email"
                          required
                          value={magicEmail}
                          onChange={(e) => setMagicEmail(e.target.value)}
                          placeholder="voce@email.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full"
                      loading={loading === "magic"}
                    >
                      <KeyRound className="h-4 w-4" />
                      Enviar link mágico
                    </Button>
                  </form>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-[var(--brand-amber)]/40 bg-[var(--brand-amber)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-[var(--brand-amber-dark)]" />
              Modo demonstração
            </CardTitle>
            <CardDescription>
              Experimente o produto completo sem precisar de conta. Seus dados ficam salvos
              localmente neste navegador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDemoLogin} className="space-y-3">
              <div>
                <Label htmlFor="demo-name">Seu nome</Label>
                <Input
                  id="demo-name"
                  className="mt-1.5"
                  value={demoName}
                  onChange={(e) => setDemoName(e.target.value)}
                  placeholder="Ex.: Maria Silva"
                />
              </div>
              <div>
                <Label htmlFor="demo-email">E-mail (opcional)</Label>
                <Input
                  id="demo-email"
                  type="email"
                  className="mt-1.5"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  placeholder="voce@email.com"
                />
              </div>
              <Button type="submit" variant="amber" className="w-full" loading={loading === "demo"}>
                Entrar em modo demo
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="underline-offset-4 hover:underline">
            Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginPageContent />
    </React.Suspense>
  );
}
