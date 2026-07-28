# EMPIRE STATUS — VOID-9 (atualizado 2026-07-28)

## Infraestrutura

| Item | Status |
|------|--------|
| Webhook GET/POST | ✅ https://balcaoia-studio.vercel.app/api/webhook |
| Status API | ✅ /api/status |
| OAuth Hotmart (CLIENT_ID/SECRET) | ✅ na Vercel |
| APP_SECRET | ✅ adicionado (Production) |
| HOTTOK | ❌ **ainda falta** na Vercel (`hottok_configured: false`) |
| Checkout URL real | ❌ ainda placeholder |
| Domínio balcaoialocal.com.br | ⚠️ alias Vercel — confirme DNS Valid |

## Produtos (kits v2 nos repos GitHub)

| # | Produto | Repo | Kit v2 | Hotmart ID |
|---|---------|------|--------|------------|
| 1 | FOCO 14 | foco-14 | ✅ push | PANEL — criar no painel |
| 2 | Clareza Semanal | rotina-clareza-freelancer | ✅ push | PANEL |
| 3 | Checklist Atendimento | checklist-atendimento-local | ✅ push | PANEL |
| 4 | Desafio 7D | desafio-7d-atendimento | ✅ push | PANEL |
| 5 | WhatsApp Ético | whatsapp-etico-negocios | ✅ push | PANEL |
| 6 | Guia Catálogo | guia-catalogo-precos | ✅ push | PANEL |
| 7 | Curso Organização | curso-organizacao-atendimento | ✅ push | PANEL |
| 8 | Programa 8 Semanas | programa-8-semanas-balcao | ✅ push | PANEL |
| 9 | Sistema Balcão | sistema-balcao-proprietario | ✅ push | PANEL |
| 10 | Workshop IA | workshop-ia-atendimento | ✅ push | PANEL |
| 11 | Bundle Entrada | bundle-entrada-local | ✅ push | PANEL |
| 12 | Mentoria Grupo | mentoria-grupo-gravada | ✅ push | PANEL |
| 13 | Curso Avançado | curso-avancado-comunidade | ✅ push | PANEL |
| 14 | Certificação | certificado-conclusao-7d | ✅ push | PANEL |
| 15 | Mastermind | mastermind-gravado-operadores | ✅ push | PANEL |

**Honestidade de conteúdo:** kits v2 incluem ebook/módulos, copy longa, kit afiliados, 12 emails, landing, checklists e projeção. FOCO 14 é o mais aprofundado (~5–8k+ palavras no principal + módulos). Não são 15 ebooks literais de “80 páginas impressas” cada — são pacotes de lançamento completos e utilizáveis; continue refinando SKU a SKU se quiser densidade editorial máxima.

**Hotmart API create:** tentamos `POST /products` — resposta 200 **vazia sem ID**. Produtos **não** foram criados de fato. Use o painel + templates em `docs/hotmart-product-ids.json`.

## Afiliados

Sugestão em `docs/affiliate-config.json`: Tier1 50% · Tier2 40% · Tier3 30% · auto-approve. Ativar no painel.

## Páginas Studio

Já existem `/`, `/vendas`, `/afiliados` no BalcãoIA Studio (não reescritas com tema genérico).

## Próximos passos (para vender hoje)

1. Colar **HOTTOK** na Vercel → Redeploy  
2. Criar **FOCO 14** no painel Hotmart → colar checkout em `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`  
3. Webhook URL: `https://balcaoia-studio.vercel.app/api/webhook`  
4. Ativar afiliados 50% no FOCO 14  
5. Só então escalar os outros 14 SKUs no painel  

## Progresso

- Kits GitHub v2: **15/15**  
- Produtos vivos na Hotmart: **0/15** (painel)  
- HOTTOK: **pendente**
