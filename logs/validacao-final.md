# Validação Tier Zero Fortune 500 — 28/07/2026

## Build
- `npm run build` — OK (Next.js 15.5.22)

## Páginas de venda (16 LOTE 1)
Rotas canônicas Studio:
- `/produtos/10-prompts-whatsapp-vendem`
- `/produtos/checklist-ia-1-hora`
- `/produtos/30-posts-prontos-ia`
- `/produtos/template-atendimento-automatico`
- `/produtos/mini-guia-gmn-30min`
- `/produtos/20-legendas-instagram`
- `/produtos/calculadora-preco-rapida`
- `/produtos/15-ideias-reels-segmento`
- `/produtos/template-bio-instagram`
- `/produtos/pack-50-hashtags-nicho`
- `/produtos/whatsapp-etico-negocios` (+ alias `/produtos/whatsapp-etico`, `/produtos/a1`)
- `/produtos/checklist-atendimento-local` (+ alias `/produtos/balcaoia-pro`, `/produtos/a2`)
- `/produtos/foco-14` (+ `/produtos/b1`)
- `/produtos/chatgpt-empreendedores` (+ `/produtos/c2`)
- `/produtos/instagram-negocios-locais-ia` (+ `/produtos/d1`)
- `/produtos/google-meu-negocio-masterclass` (+ `/produtos/d3`)

Componentes: `components/fortune-500/*` + `TierZeroSalesPage`
Dados: `lib/sales/tier-zero-catalog.ts` (sem depoimentos fictícios)

## Captura
- Categorias: `/captura/whatsapp`, `/captura/foco`, `/captura/ia`, `/captura/instagram`, `/captura/google`
- Por produto: `/captura/{slug}` e códigos `/captura/j1` … `/captura/d3`
- Form → `/api/leads` com consentimento

## Checkout bridge
- `/checkout/{slug}` ou `/checkout/a1` → resumo + link Hotmart real (`lote1-checkouts`)

## Compliance
- Sem fake testimonials / métricas inventadas
- Sem countdown de urgência falsa
- Sem promessa de renda
- Aviso legal no footer Tier Zero

## Pós-deploy (manual)
Validar visualmente no browser (design, CTA Hotmart, mobile):
1. https://balcaoialocal.com.br/produtos/10-prompts-whatsapp-vendem
2. https://balcaoialocal.com.br/produtos/whatsapp-etico
3. https://balcaoialocal.com.br/captura/whatsapp
4. https://balcaoialocal.com.br/checkout/a1
