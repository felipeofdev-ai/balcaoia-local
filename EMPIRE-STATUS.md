# EMPIRE STATUS — BalcãoIA Local (evolução incremental)

**Última atualização:** 2026-07-28  
**Status da máquina:** ✅ Operacional em produção (domínio oficial pendente de DNS)

## Relatório

| Métrica | Valor |
|---------|-------|
| Projeto | balcaoia-studio |
| URL prod | https://balcaoia-studio.vercel.app |
| Domínio | balcaoialocal.com.br (DNS Invalid — zona vazia) |
| Framework | Next.js 15.5.22 + React 19 |
| Páginas | 29 |
| Rotas API | 10 |
| Erros TypeScript | 0 (`tsc --noEmit`) |
| Webhook Hotmart | Melhorado (pending/plan + rate limit + HOTTOK) |
| Auth | Demo oficial + Firebase/Supabase opcionais |
| IAs | mock, groq, openai, anthropic, gemini + orchestrator fallback |
| Health | `/api/health` |
| SEO | sitemap/robots + OG em /vendas |
| Segurança | headers + rate limit webhook |
| Stack Forge (Clerk/Drizzle) | **Não adotada** (regra do produto) |

## Funcionalidades prontas
- Marketing: home, vendas, checklist, diagnóstico, aula grátis, afiliados, obrigado
- Legais: privacidade, termos, disclaimer
- Studio: login demo, dashboard, wizard, scripts/IA, simulador, exports, ROI, learning 7D
- Admin demo: leads, hotmart-events, templates
- Webhook: APPROVED, COMPLETE, REFUNDED, CANCELED, CHARGEBACK, DELAYED, BILLET, SUBSCRIPTION_CANCELLATION, SWITCH_PLAN

## Credenciais — ação do usuário

### Obrigatórias para vender de verdade
1. **DNS Registro.br** — 2× A (`216.198.79.1`, `64.29.17.1`) + CNAME `www` → `0aa115eeb83a6cac.vercel-dns-017.com.` + Salvar  
2. **HOTMART_HOTTOK** + **NEXT_PUBLIC_HOTMART_CHECKOUT_URL** (painel Hotmart)

### Recomendadas
- `RESEND_API_KEY` (e-mails reais)
- `GROQ_API_KEY` ou outra IA (hoje default mock)
- Supabase Free (persistência)

### Opcionais
- VSL URLs, GTM, Firebase Auth em produção

## Acesso demo
https://balcaoia-studio.vercel.app/app/login  
`demo@balcaoialocal.com.br` / `BalcaoIA7D!`

## Validação
```bash
npm test
npm run validate
```

## Nota geral: **8.5/10**
Bloqueios externos: DNS + checkout Hotmart (não são código).
