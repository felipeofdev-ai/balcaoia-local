# EMPIRE-STATUS-FINAL — VOID-9 SUPREME (28 Jul 2026)

## Veredito

**Infraestrutura de lançamento LOTE 1: pronta no código.**  
**Publicação Hotmart: ainda manual / RPA parcial** — sem `product_id` nem checkout real capturado.

---

## O que está pronto

| Item | Status |
|------|--------|
| 16 PDFs + capas LOTE 1 | ✅ ReportLab (`hotmart-factory/logs/pdfs-gerados.md`) |
| `auth_state.json` Hotmart | ✅ (não versionar) |
| Manifestos LOTE 1 + bump/upsell | ✅ `hotmart-factory/manifestos/*.json` |
| RPA wizard (formato→info→preço→PDF) | ✅ melhorado; J1 ainda sem `product_id` |
| Logos SVG 16 produtos | ✅ `balcaoia-studio/public/logos/` |
| Mockups social-cover | ✅ espelhados de logos |
| Páginas `/produtos/[slug]` LOTE 1 | ✅ wired (Void9 + lote1-affiliates) |
| `/afiliados` elite (70%/180d/16) | ✅ |
| Kits afiliados Empire | ✅ A1/A2/B1/J1 completos; demais enxutos |
| Cursos modulares A1–D3 | ✅ pastas `curso/` |
| Script cupons API | ✅ `scripts/configurar-api-hotmart.py` |
| SEO + sitemap + webhook | ✅ online |
| Checkout landing system | ✅ (aguarda hotlink real) |

## O que NÃO está pronto

| Item | Status |
|------|--------|
| 16 produtos publicados Hotmart | ❌ |
| Links `pay.hotmart.com` reais | ❌ |
| Order bump / recuperador / funil ativos | ❌ (painel) |
| Cupons via API | ⏳ precisa `product_id` |
| Área de membros Hotmart Club com aulas | ❌ upload manual pós-publicação |
| Env Vercel `NEXT_PUBLIC_HOTMART_CHECKOUT_*` | ❌ vazios de propósito |

## RPA — último teste J1

- Formato Ebook ✅ · Nome/descrição ✅ · Capa ✅  
- Bug corrigido: PDF não pode sobrescrever capa em Informações  
- URL final anterior: `…/products/add/4/info` sem `product_id`  
- **Ação:** conferir rascunhos no painel e completar Precificação → Membros → Publicar

## Compliance

- Sem AggregateRating inventado  
- Sem promessa de renda  
- Sem hotlink inventado  
- Kits usam `[LINK_AFILIADO]`

## Próximo passo crítico

1. Publicar J1 no painel (ou re-rodar RPA corrigido)  
2. Colar checkout real nas envs Vercel  
3. Ativar afiliados 70% micros / 50% flagships + cookie 180d  
4. Rodar batch RPA restante só após J1 com `product_id`
