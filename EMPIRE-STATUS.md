# STATUS — BalcãoIA Local / Studio (não Forge Empire)

**Última atualização:** 2026-07-28  
**Prompt Forge Empire v4.0:** recebido e **rejeitado como rewrite de stack**  
**Motivo:** o produto já é o BalcãoIA Studio (Next 15 + Tailwind + Hotmart + demo/Firebase/Supabase). Reescrever para Clerk/Drizzle/tema dark emerald destruiria o que já vende.

---

## Relatório de status

```
PROJETO: balcaoia-studio (BalcãoIA Local)
FRAMEWORK: Next.js 15.5.22 + React 19 + TypeScript
NODE: 24.x | npm
DEPLOY: https://balcaoia-studio.vercel.app (produção OK)
DOMÍNIO: balcaoialocal.com.br — DNS ainda INVALID (aValues vazios)

FUNCIONALIDADES PRONTAS:
- Marketing: /, /vendas, /checklist, /diagnostico, /aula-gratis, /afiliados, /obrigado
- Legal: privacidade, termos, disclaimer
- Studio: login demo, dashboard, wizard 9 passos, scripts/IA, simulador, exports, ROI
- Admin demo: leads, hotmart-events, templates
- API: leads, diagnostic, AI generate, simulate, businesses, exports, Hotmart webhook
- Design system próprio (petrol/amber) — shadcn-style components
- Conta demo: demo@balcaoialocal.com.br / BalcaoIA7D!

INCOMPLETAS / OPERADOR:
- DNS Registro.br (A + CNAME) — BLOQUEIA domínio oficial
- Checkout Hotmart real + HOTTOK
- VSL embeds (env)
- Auth cloud em produção (Firebase/Supabase keys na Vercel)
- Resend API key (hoje log-only)

NÃO VAMOS FAZER (Forge v4):
- Migrar para Clerk
- Migrar para Drizzle/Neon
- Tema dark emerald genérico
- Fábrica de ebooks em massa / cron diário de produtos aleatórios
- Acessar painéis Hotmart/Clerk/Neon pelo navegador do usuário
```

## Plano real (prioridade)

### Crítico
1. Usuário: apontar DNS no Registro.br (ver `docs/DNS_REGISTRO_BR.md`)
2. Validar domínio na Vercel → Valid
3. Usuário: criar produto Hotmart + enviar checkout URL + HOTTOK

### Importante
4. Atualizar envs Vercel com URLs `https://balcaoialocal.com.br/...` após DNS
5. (Opcional) Supabase Free + migration
6. Colar VSL quando existir

### Saúde
- `GET /api/health` — status dos serviços sem Clerk/Drizzle

## Acesso demo
- URL: https://balcaoia-studio.vercel.app/app/login  
- E-mail: `demo@balcaoialocal.com.br`  
- Senha: `BalcaoIA7D!`
