# 🌅 BRIEFING MATINAL — OPERAÇÃO OVERNIGHT

**Data:** 29/07/2026  
**Modo:** VOID-9 SUPREME OVERNIGHT  
**Compliance:** sem depoimentos fictícios · sem aggregateRating inventado · sem urgência falsa · sem URLs Hotmart inventadas

---

## ✅ O que ficou pronto

### Site / Studio
- Páginas Tier Zero Fortune 500 dos **16 produtos LOTE 1** (já no ar; capas JPG em `/public/capas`)
- Captura + checkout bridge
- Redirects de slugs “prompt” (`/produtos/a1-whatsapp-etico` → slug real)
- **8 artigos SEO novos** (~2000+ palavras cada), honestos:
  - `/blog/como-vender-pelo-whatsapp`
  - `/blog/google-meu-negocio-como-funciona`
  - `/blog/chatgpt-para-empresas-pequenas`
  - `/blog/instagram-para-vender-localmente`
  - `/blog/produtividade-para-empreendedores`
  - `/blog/automacao-whatsapp-business`
  - `/blog/ia-para-pequenas-empresas`
  - `/blog/aumentar-vendas-negocio-local`
- Sitemap ampliado (produtos Tier Zero + captura + blog)
- Schema Organization reforçado + Article nos posts
- `.env.local` sincronizado com checkouts reais (chaves `NEXT_PUBLIC_HOTMART_CHECKOUT_*`)
- Diagnóstico: `balcaoia-studio/logs/diagnostico-overnight.md`

### Hotmart
- **16/16** com `checkout_url` e status `vendas_ativas`
- Capas premium OK (≥200KB) e PDFs OK
- Script CDP overnight: `hotmart-factory/src/overnight_bumps_recuperador.py`
- Relatório: `hotmart-factory/logs/OVERNIGHT-HOTMART.md` (quando o job terminar)
- UI de Recuperador usa `<hot-select>` — automação tenta selecionar produto a produto; **confirmação visual ainda recomendada**

---

## 🔴 O que ainda precisa de você (painel Hotmart)

1. **Hotlinks com preço errado** (P0)
   - `30-posts-prontos-ia` → deve ser **R$ 12**
   - `template-atendimento-automatico` → **R$ 14**
   - `calculadora-preco-rapida` → **R$ 9**
2. **Order Bump** no Checkout Builder (trilhas sugeridas no relatório overnight)
3. **Recuperador** oferta a oferta — confirmar switches após product-select
4. **Funil** micro → flagship em `/tools/sales/funnel`
5. **Google Search Console** — adicionar propriedade e enviar `https://balcaoialocal.com.br/sitemap.xml`
6. **Webhook** Studio: confirmar hotsite → `https://balcaoialocal.com.br/api/webhooks/hotmart` (e/ou `/api/webhook`)

---

## 🛒 Checkouts reais (produção)

| Produto | Checkout |
|---------|----------|
| 10 Prompts WhatsApp | https://pay.hotmart.com/L106925146Q |
| Checklist IA 1h | https://pay.hotmart.com/M106925563V |
| 30 Posts IA | https://pay.hotmart.com/H106926380Y |
| Template Atendimento | https://pay.hotmart.com/T106926591V |
| Mini GMN | https://pay.hotmart.com/P106926720K |
| 20 Legendas | https://pay.hotmart.com/T106926801C |
| Calculadora Preço | https://pay.hotmart.com/S106926102D |
| 15 Ideias Reels | https://pay.hotmart.com/B106926872H |
| Bio Instagram | https://pay.hotmart.com/U106926929L |
| Pack Hashtags | https://pay.hotmart.com/J106927000T |
| WhatsApp Ético | https://pay.hotmart.com/D106927075P |
| BalcãoIA Pro | https://pay.hotmart.com/A106927145W |
| FOCO 14 | https://pay.hotmart.com/Q106926271V |
| ChatGPT Empreendedores | https://pay.hotmart.com/D106927243G |
| Instagram + IA | https://pay.hotmart.com/M106927276N |
| GMN Masterclass | https://pay.hotmart.com/X106927314R |

---

## 🔗 Validar ao acordar (2 min)

1. https://balcaoialocal.com.br/produtos/10-prompts-whatsapp-vendem  
2. https://balcaoialocal.com.br/produtos/whatsapp-etico  
3. https://balcaoialocal.com.br/blog/como-vender-pelo-whatsapp  
4. https://balcaoialocal.com.br/captura/whatsapp  
5. https://balcaoialocal.com.br/checkout/a1  
6. https://balcaoialocal.com.br/sitemap.xml  

---

## Decisão de design overnight

- Mantido **Tier Zero** (Geist + petrol/âmbar) — **não** trocamos por Inter/roxo/depoimentos fake do prompt genérico.
- Capas JPG reais no hero em vez de só SVG mockup.
- Sem timer de escassez falsa.

Bom dia. Prioridade humana: **3 hotlinks de preço** + **bumps/recuperador** no painel.
