# ✅ CHECKLIST — AÇÕES MANUAIS NECESSÁRIAS

Atualizado: 28 Jul 2026 · BalcãoIA Local

## HOTMART (painel web)

- [ ] Abrir Produtos e localizar rascunhos de “10 Prompts WhatsApp que Vendem”
- [ ] Em **Informações**: selecionar categoria **Negócios e Carreira** (campo obrigatório — era o que travava o RPA)
- [ ] Finalizar J1: Precificação R$ 9 · garantia 7 dias · PDF · **Publicar**
- [ ] Copiar hotlink `pay.hotmart.com/XXXX` e colar abaixo
- [ ] Re-testar RPA (já com categoria no script):  
  `.\venv\Scripts\python.exe src\criar_produto_rpa.py manifestos\10-prompts-whatsapp-vendem.json --sem-revisao`
- [ ] Só depois: batch J2→J10  
  `.\venv\Scripts\python.exe scripts\batch_lote1_rpa.py --from-slug checklist-ia-1-hora`
- [ ] Publicar A1, A2, B1, C2, D1, D3 (cursos: upload módulos da pasta `curso/`)
- [ ] Order Bump (produto complementar já cadastrado)
- [ ] Funil upsell/downsell
- [ ] Recuperador Automático + Fast Buy
- [ ] Checkout personalizado (logo + cor Doce Lucro / BalcãoIA)
- [ ] Afiliados: micros **70%** · flagships **50%** · cookie **180** · marketplace
- [ ] Hotmart Recomenda

## CHECKOUTS (cole os links reais)

| SKU | Checkout |
|-----|----------|
| J1 | _______________ |
| J2 | _______________ |
| J3 | _______________ |
| J4 | _______________ |
| J5 | _______________ |
| J6 | _______________ |
| J7 | _______________ |
| J8 | _______________ |
| J9 | _______________ |
| J10 | _______________ |
| A1 | _______________ |
| A2 | _______________ |
| B1 | _______________ |
| C2 | _______________ |
| D1 | _______________ |
| D3 | _______________ |

Depois: Vercel → Environment Variables → `NEXT_PUBLIC_HOTMART_CHECKOUT_J1` etc. → Redeploy.

## API (após ter product_id)

```powershell
cd hotmart-factory
.\venv\Scripts\python.exe scripts\configurar-api-hotmart.py
```

## SEO

- [ ] Google Search Console — propriedade `balcaoialocal.com.br`
- [ ] Verificar domínio / colar meta se pedido
- [ ] Submeter `https://balcaoialocal.com.br/sitemap.xml`
- [ ] Google Analytics / Meta Pixel (IDs reais)

## AFILIADOS (semana 1)

- [ ] 50 perfis do nicho (lista)
- [ ] DM com kit (`affiliate-kit/00-guia-do-afiliado.md`)
- [ ] Grupo afiliados WhatsApp/Telegram
- [ ] Bio Instagram → `/afiliados`
- [ ] 1 post/dia do programa (sem claim de renda)

## SEGURANÇA

- [ ] Se senha Hotmart apareceu em histórico de terminal/comando, **troque a senha**
- [ ] Nunca commitar `auth_state.json`, `.env`, `login_2fa_code.txt`

## Site já no ar (validar)

- https://balcaoialocal.com.br
- https://balcaoialocal.com.br/afiliados
- https://balcaoialocal.com.br/produtos/10-prompts-whatsapp-vendem
- https://balcaoialocal.com.br/produtos/whatsapp-etico-negocios
- https://balcaoialocal.com.br/sitemap.xml
