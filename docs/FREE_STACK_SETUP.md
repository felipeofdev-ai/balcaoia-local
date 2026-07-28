# Stack 100% gratuita — BalcãoIA Local

**Não use cartão falso.** Não é necessário pagar Firebase Blaze.

## Arquitetura recomendada (grátis)

| Peça | Serviço | Custo |
|------|---------|--------|
| App Next.js | [Vercel Hobby](https://vercel.com) | Grátis |
| Auth + Postgres | [Supabase Free](https://supabase.com) | Grátis |
| IA demo | Mock local | Grátis |
| IA real (opcional) | Groq free / Gemini free tier | Grátis |
| Domínio | `balcaoialocal.com.br` (Registro.br) | Já registrado |

Firebase fica **opcional**. O produto já funciona em modo demo (localStorage) sem nenhum banco pago.

---

## Passo 1 — Supabase (banco grátis) — 5 min

1. Abra https://supabase.com/dashboard/new (login Google).
2. Crie projeto **BalcãoIA Local** · região **South America (São Paulo)** se disponível.
3. **SQL Editor** → cole e rode o arquivo  
   `supabase/migrations/001_initial_schema.sql`
4. **Project Settings → API** → copie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Cole no `.env.local` e reinicie `npm run dev`.

Auth: em Authentication → Providers → Email (ligado).

---

## Passo 2 — Vercel (hosting grátis) — 5 min

1. https://vercel.com/new → Import Git repo **ou** CLI:

```bash
cd balcaoia-studio
npx vercel login
npx vercel
npx vercel --prod
```

2. Em Project → Settings → Environment Variables, cole as mesmas do `.env.local`
   (Firebase pode ficar vazio; Supabase se tiver).

3. Domínio customizado:
   - Vercel → Domains → adicione `balcaoialocal.com.br` e `www.balcaoialocal.com.br`
   - Copie os DNS que a Vercel mostrar

---

## Passo 3 — DNS no Registro.br

No painel do domínio `balcaoialocal.com.br`:

**Opção A — apontar para Vercel (recomendado)**  
Use os registros que a Vercel indicar (geralmente):

| Tipo | Nome | Valor |
|------|------|--------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

(Confirme os valores exatos na tela Domains da Vercel — podem mudar.)

**Opção B — só DNS externo**  
Altere nameservers para os da Vercel se preferir.

Após propagação (minutos a algumas horas):  
https://balcaoialocal.com.br

Atualize:

```
NEXT_PUBLIC_SITE_URL=https://balcaoialocal.com.br
NEXT_PUBLIC_SITE_DOMAIN=balcaoialocal.com.br
NEXT_PUBLIC_SUPPORT_EMAIL=contato@balcaoialocal.com.br
```

---

## Passo 4 — Hotmart (depois do site no ar)

Webhook: `https://balcaoialocal.com.br/api/webhooks/hotmart`  
Checkout: cole em `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`

---

## Usar agora sem nada online

```bash
cd balcaoia-studio
npm run dev
```

Abra http://localhost:3000/app/login → **Modo demo** — Studio completo, wizard, IA mock, export.

---

## Por que não Firebase Hosting agora?

Next.js com APIs/middleware exige Cloud Functions → plano Blaze (pago).  
**Vercel Hobby** hospeda Next.js de graça. Supabase Free cobre o banco.
