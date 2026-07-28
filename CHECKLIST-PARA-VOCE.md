# 🎯 O QUE FAZER AGORA — PASSO A PASSO

Atualizado: 28 Jul 2026 · Operação Publicação Final

## ETAPA 1 — CALIBRAR O RPA
```powershell
cd "c:\Users\Usuário\Desktop\BalcãoIA Local\hotmart-factory"
.\venv\Scripts\python.exe scripts\calibrar-hotmart.py
```
→ Gera `logs/calibracao-*.png/json` e `calibracao-categorias.txt`  
→ Confirme pills de categoria (não é `<select>`)

## ETAPA 2 — PUBLICAR J1 (modo revisão)
```powershell
.\venv\Scripts\python.exe src\criar_produto_rpa.py manifestos\10-prompts-whatsapp-vendem.json
```
> Slug real: `10-prompts-whatsapp-vendem` (não `j1-prompts-whatsapp`)

Na pausa de revisão: confira categoria **Negócios e Carreira**, preço R$9, PDF.  
Grave `ok` em `rpa_continuar.txt` para publicar.  
Copie o hotlink `pay.hotmart.com/XXXX`.

## ETAPA 3 — BATCH RESTANTE
Só após J1 ter `product_id` em `logs/produtos-criados.json`:
```powershell
.\venv\Scripts\python.exe scripts\batch-criar-produtos.py --sem-revisao --from-slug checklist-ia-1-hora
```

## ETAPA 4 — PÓS-PUBLICAÇÃO
```powershell
.\venv\Scripts\python.exe scripts\pos-publicacao-rpa.py
```
Revise screenshots em `logs/screenshots/pos-*`.

## ETAPA 5 — ENVS DE CHECKOUT
```powershell
.\venv\Scripts\python.exe scripts\atualizar-env-checkouts.py
```
Rode o `.ps1` gerado **só se** houver URLs reais (nunca PAY123AB).

## ETAPA 6 — PAINEL (manual)
- [ ] Order Bump / Funil / Fast Buy / Recuperador
- [ ] Checkout personalizado (logo + cor)
- [ ] Afiliados 70% micros / 50% flagships · cookie 180d
- [ ] Marketplace + Hotmart Recomenda

## ETAPA 7 — AFILIADOS
- [ ] Bio → https://balcaoialocal.com.br/afiliados
- [ ] Kits em `balcaoia-empire/**/affiliate-kit/` (`[LINK_AFILIADO]`)
- [ ] 10 DMs/dia sem claim de renda

## LINKS
- Site: https://balcaoialocal.com.br
- Afiliados: https://balcaoialocal.com.br/afiliados
- Painel: https://app.hotmart.com/products
- Webhook: https://balcaoialocal.com.br/api/webhook

## BLOQUEIO CONHECIDO
Sem **categoria** (= pill “Negócios e Carreira”) o Continuar não avança.  
O RPA agora usa `selecionar_categoria()` com scroll + pill + JS + pausa manual.
