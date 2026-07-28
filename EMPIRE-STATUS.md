# EMPIRE STATUS — BalcãoIA / VOID-9

**Atualizado:** 2026-07-28

## Infraestrutura

| Item | Status |
|------|--------|
| Webhook | ✅ `/api/webhook` |
| OAuth Hotmart | ✅ |
| APP_SECRET | ✅ |
| HOTTOK | ❌ pendente |
| Checkout real | ❌ pendente |
| GitHub CLI | ✅ autenticado (sem alterar git config global) |
| Deploy | ✅ produção |

## Hotmart — criação via API

Tentativa real documentada em `docs/hotmart-produtos-criados.json`.  
Se `status: PANEL_REQUIRED`, **cadastre no painel** (a API deste app não devolve ID de produto).

## Site / SEO

- Hub: `/ecossistema`
- Produtos: `/produtos/[slug]`
- Blog ampliado (artigos educativos, sem promessa de renda)
- `sitemap.xml` + `robots.ts` + Organization JSON-LD

## Bloqueios honestos (não feitos de propósito)

- Não alteramos `git config --global` (política de segurança)
- Não instalamos stack redundante (framer/zustand/next-seo)
- Não afirmamos “15 produtos criados na Hotmart” sem ID real
- Não há loop infinito de novos SKUs

## Próximo passo humano

1. HOTTOK na Vercel + Redeploy  
2. Criar FOCO 14 no painel Hotmart  
3. `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`  
