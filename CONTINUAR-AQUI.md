# CONTINUAR AQUI — BalcãoIA / VOID-9

**Última atualização:** 29/07/2026 ~10:25 (America/Sao_Paulo)  
**Para:** qualquer agente Cursor em outro PC  
**Instrução:** leia este arquivo **inteiro** antes de editar código ou operar Hotmart. Depois execute a fila P0.

---

## 1. O que é este projeto

Ecossistema **BalcãoIA** — infoprodutos educativos para negócios locais (WhatsApp ético, IA, Instagram, Google Meu Negócio, FOCO 14, etc.).

| Peça | Caminho | Função |
|------|---------|--------|
| Site (Next.js 15, App Router) | `balcaoia-studio/` | Vendas, captura, upsell, blog, Studio app |
| Factory Hotmart (Playwright/CDP) | `hotmart-factory/` | RPA painel, capas, PDFs, cupons API |
| Domínio produção | https://balcaoialocal.com.br | Vercel alias |
| Repo Git | `balcaoia-studio` → `felipeofdev-ai/balcaoia-local` | **Só o Studio é git.** `hotmart-factory` **não** é repo |

**Marca:** petrol `#0F3D4A` + âmbar `#F5A623`. Fonte do site: **Geist** (não Inter genérico / não tema roxo).

---

## 2. Compliance (regras duras — nunca violar)

1. **Sem promessa de renda / vendas garantidas / “fique rico”**
2. **Sem depoimentos fictícios** e sem `aggregateRating` inventado no schema
3. **Sem countdown de escassez falsa** (timer vermelho mentiroso)
4. **Sem inventar URLs** de checkout Hotmart — só as de `lote1-checkouts.ts` / `produtos-criados.json`
5. WhatsApp: só práticas **éticas / oficiais** (sem Baileys, QR não oficial, disparo em massa)
6. **Nunca** commitar secrets (`.env.local`, tokens Hotmart, `auth_state.json`)
7. Não sobrescrever `next.config` com `ignoreBuildErrors: true` se o build já passa

---

## 3. Estado atual (verdade operacional)

### Pronto ✅

- **16/16** produtos LOTE 1 em `vendas_ativas` com checkout real  
  Fonte: `hotmart-factory/logs/produtos-criados.json`
- Páginas de venda **Tier Zero** (componentes `components/fortune-500/` + `lib/sales/tier-zero-catalog.ts`)
- Capas JPG em `balcaoia-studio/public/capas/`
- Captura: `/captura/[slug]` · Checkout bridge: `/checkout/[slug]` · Upsell: `/upsell/[slug]`
- **113 cupons** criados via API (`docs/cupons-criados.json`)
- 8 artigos SEO ~2k palavras em `content/blog/`
- Deploy produção recente (commits `b265e83`, `bb7b2ac`, overnight `d6998a7` / `ba5919c`)

### Pendente / bloqueado ⚠️❌

| Prioridade | Item | Detalhe |
|------------|------|---------|
| **P0** | 3 hotlinks com preço errado | Ver §5 |
| **P0** | Order Bump real no Checkout Builder | CDP só abriu UI — vincular produto manualmente |
| **P0** | Recuperador oferta a oferta | `<hot-select>` shadow DOM — CDP não seleciona |
| **P1** | Funil Hotmart (upsell/downsell) | Mapa pronto; etapas no painel |
| **P1** | Search Console + sitemap | `https://balcaoialocal.com.br/sitemap.xml` |
| **P1** | Webhook Hotmart → Studio | `/api/webhooks/hotmart` e/ou `/api/webhook` |
| **P2** | Fast Buy / Pixel Meta | disponíveis na conta — não totalmente configurados |

---

## 4. Mapa dos 16 produtos (slugs reais)

| Código | Slug Hotmart / Studio | Preço alvo | product_id | Checkout |
|--------|----------------------|------------|------------|----------|
| J1 | `10-prompts-whatsapp-vendem` | 9 | 8210361 | https://pay.hotmart.com/L106925146Q |
| J2 | `checklist-ia-1-hora` | 7 | 8210550 | https://pay.hotmart.com/M106925563V |
| J3 | `30-posts-prontos-ia` | **12** | 8210879 | https://pay.hotmart.com/H106926380Y |
| J4 | `template-atendimento-automatico` | **14** | 8210984 | https://pay.hotmart.com/T106926591V |
| J5 | `mini-guia-gmn-30min` | 9 | 8211053 | https://pay.hotmart.com/P106926720K |
| J6 | `20-legendas-instagram` | 7 | 8211090 | https://pay.hotmart.com/T106926801C |
| J7 | `calculadora-preco-rapida` | **9** | 8210744 | https://pay.hotmart.com/S106926102D |
| J8 | `15-ideias-reels-segmento` | 7 | 8211124 | https://pay.hotmart.com/B106926872H |
| J9 | `template-bio-instagram` | 7 | 8211154 | https://pay.hotmart.com/U106926929L |
| J10 | `pack-50-hashtags-nicho` | 7 | 8211184 | https://pay.hotmart.com/J106927000T |
| A1 | `whatsapp-etico` → Studio `whatsapp-etico-negocios` | 67 | 8211222 | https://pay.hotmart.com/D106927075P |
| A2 | `balcaoia-pro` → Studio `checklist-atendimento-local` | 97 | 8211256 | https://pay.hotmart.com/A106927145W |
| B1 | `foco-14` | 47 | 8210828 | https://pay.hotmart.com/Q106926271V |
| C2 | `chatgpt-empreendedores` | 57 | 8211305 | https://pay.hotmart.com/D106927243G |
| D1 | `instagram-negocios-locais-ia` | 77 | 8211323 | https://pay.hotmart.com/M106927276N |
| D3 | `google-meu-negocio-masterclass` | 57 | 8211342 | https://pay.hotmart.com/X106927314R |

Aliases Studio: `lib/config/lote1-checkouts.ts`  
Códigos curtos (`j1`…`d3`): `lib/sales/tier-zero-catalog.ts` → `CHECKOUT_CODE_MAP`

---

## 5. P0 — Preços errados no hotlink (auditoria headless)

Última medição (`hotmart-factory/logs/auditoria-precos-checkout.json`):

| Slug | Checkout mostrou | Deveria |
|------|------------------|---------|
| `30-posts-prontos-ia` | **R$ 67** | **R$ 12** |
| `template-atendimento-automatico` | **R$ 77** | **R$ 14** |
| `calculadora-preco-rapida` | **R$ 7** | **R$ 9** |

Tentativa CDP de editar ofertas abriu a tela mas **não preencheu** (`js fill False`).  
**Ação:** no painel Hotmart → produto → Precificação e ofertas → garantir que o **hotlink principal** aponta para a oferta com o preço certo (pode existir oferta nova criada via API que não está no hotlink).

---

## 6. Order Bump / Funil (mapa para o painel)

Fonte canônica no site: `balcaoia-studio/lib/funis-data.ts`  
Relatório CDP: `balcaoia-studio/docs/RELATORIO-ATIVACOES-FINAL.md`

Exemplos:

- `10-prompts-whatsapp-vendem` → bump/upsell **whatsapp-etico** · downsell **template-atendimento-automatico**
- `checklist-ia-1-hora` → **balcaoia-pro** · downsell template
- Micros Instagram → bump **instagram-negocios-locais-ia**
- Flagships → bump micro complementar

Páginas site (já no ar, sem timer falso):

- https://balcaoialocal.com.br/upsell/10-prompts-whatsapp-vendem  
- https://balcaoialocal.com.br/produtos/{slug}/obrigado  

---

## 7. Arquivos-chave (abrir nesta ordem)

### Continuação / status
1. **Este arquivo** — `CONTINUAR-AQUI.md` (raiz e cópia no Studio)
2. `balcaoia-studio/EMPIRE-STATUS.md`
3. `balcaoia-studio/BRIEFING-MATINAL.md`
4. `balcaoia-studio/docs/RELATORIO-ATIVACOES-FINAL.md`
5. `balcaoia-studio/docs/CHECKLIST-BLUEPRINT-FINAL.md` (se existir)
6. `hotmart-factory/logs/produtos-criados.json`
7. `hotmart-factory/INSTRUCOES-CHROME.md`

### Código site
- Vendas: `components/marketing/TierZeroSalesPage.tsx` + `components/fortune-500/*`
- Dados: `lib/sales/tier-zero-catalog.ts`, `lib/funis-data.ts`, `lib/config/lote1-checkouts.ts`
- Rotas: `app/produtos/[slug]/`, `app/captura/[slug]/`, `app/checkout/[slug]/`, `app/upsell/[slug]/`

### Scripts Hotmart
- Cupons API: `hotmart-factory/src/criar_cupons_completo.py` + `hotmart_api.py`
- Conversão CDP: `hotmart-factory/src/ativar_conversao_total.py`
- Overnight bumps: `hotmart-factory/src/overnight_bumps_recuperador.py`
- Sync env: `hotmart-factory/src/sync_env_checkouts.py`
- Teste CDP: `hotmart-factory/src/conectar_chrome.py`

---

## 8. Como subir Chrome CDP (obrigatório para RPA)

```powershell
# Fechar Chrome todo
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force

# Abrir com debug
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\chrome-debug" `
  --no-first-run --no-default-browser-check `
  "https://app-vlc.hotmart.com/dashboard"

cd "…\hotmart-factory"
.\venv\Scripts\python.exe src\conectar_chrome.py
# Esperado: [ok] Chrome conectado via CDP
```

Preferir URLs **`app-vlc.hotmart.com`** (conteúdo real). `app.hotmart.com` às vezes é shell/iframe.

---

## 9. Fila de trabalho recomendada (próxima sessão)

```text
[ ] 1. Corrigir 3 hotlinks de preço (P0) — validar com curl/Playwright no pay.hotmart.com
[ ] 2. Order Bump no Checkout Builder para trilhas principais (J1→A1, J2→A2, micros IG→D1)
[ ] 3. Recuperador: ativar 1 produto por vez no product-select
[ ] 4. Funil Hotmart: 2–3 funis piloto (J1, A1, D1)
[ ] 5. Testar cupom JULHO2026 num checkout de micro
[ ] 6. Search Console — enviar sitemap.xml
[ ] 7. Confirmar webhook Hotmart → balcaoialocal.com.br/api/webhooks/hotmart
[ ] 8. Atualizar EMPIRE-STATUS.md + este CONTINUAR-AQUI.md ao terminar
```

**Não refazer** do zero (já está feito): páginas Tier Zero, 113 cupons, capas public, blog SEO overnight, funis-data no site, deploy Vercel.

---

## 10. Setup no outro computador

```powershell
# 1. Clonar / puxar o Studio (git)
git clone https://github.com/felipeofdev-ai/balcaoia-local.git
# ou: git pull origin main
cd balcaoia-studio
npm install

# 2. Recriar .env.local (NÃO está no git)
#    Copiar do PC antigo ou Vercel env + HOTMART_CLIENT_ID/SECRET
#    Checkouts públicos também em lib/config/lote1-checkouts.ts

# 3. Factory (se precisar RPA) — copiar pasta hotmart-factory inteira
#    Inclui: venv ou recriar, auth_state.json, logs/, assets/, .env se houver

# 4. Abrir no Cursor a pasta "BalcãoIA Local" (studio + factory juntos)
# 5. Prompt inicial sugerido:
#    "Leia CONTINUAR-AQUI.md e execute a fila P0 §9. Compliance §2."
```

Build local:

```powershell
cd balcaoia-studio
npm run build
```

Deploy (só se autorizado):

```powershell
git add -A
git commit -m "…"
git push origin main
npx vercel --prod --yes
```

---

## 11. Armadilhas já conhecidas

- CDP **timeout** se Chrome antigo ficou aberto sem debug — reiniciar com §8  
- `hot-select` do Recuperador **não aceita** `.fill()` — precisa clique + opção  
- Navegar para `/products/manage/{id}` no meio de product-select causa **race** de navegação  
- Prompt genérico “Fortune 500” pedia Inter/roxo/depoimentos fake — **ignorar**; manter Tier Zero compliance  
- `hotmart-factory` não tem `git push` — versionar docs importantes em `balcaoia-studio/docs/`  
- Ofertas novas via API às vezes **não** atualizam o hotlink antigo  

---

## 12. Prompt curto para colar no Cursor novo

```
Você está no projeto BalcãoIA. Leia CONTINUAR-AQUI.md (raiz) por completo.
Continue a fila P0 da seção 9: corrigir 3 hotlinks de preço, depois Order Bumps
e Recuperador no Hotmart (Chrome CDP :9222). Respeite compliance da seção 2.
Não reinventar páginas Tier Zero nem inventar checkouts. Atualize EMPIRE-STATUS.md
e CONTINUAR-AQUI.md ao finalizar cada item.
Só pare se eu digitar PAUSA.
```

---

## 13. Contatos / URLs úteis

- Site: https://balcaoialocal.com.br  
- Sitemap: https://balcaoialocal.com.br/sitemap.xml  
- Status API: https://balcaoialocal.com.br/api/status  
- Painel: https://app-vlc.hotmart.com  
- Vendas catálogo: https://balcaoialocal.com.br/vendas  
- Afiliados: https://balcaoialocal.com.br/afiliados  

---

*Arquivo gerado para handoff entre sessões Cursor. Manter sincronizado com a realidade do painel Hotmart.*
