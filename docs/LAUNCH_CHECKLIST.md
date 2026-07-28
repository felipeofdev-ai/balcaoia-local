# Checklist de lançamento comercial — BalcãoIA Local

## 0. O que eu (Cursor) NÃO posso fazer
- Preencher cartão de crédito / ativar trial de US$ 300 no Google Cloud
- Clicar “Upgrade to Blaze” por você  
→ Faça em: https://console.firebase.google.com/u/0/project/project-5b3388f6-ec3f-4f11-b43/usage/details

## 1. Firebase / banco (você)
- [ ] Ativar Blaze + créditos promocionais (se elegível)
- [ ] Authentication: E-mail/senha + Link por e-mail
- [ ] Firestore criado (southamerica-east1)
- [ ] Publicar regras (`firebase deploy --only firestore`)
- [ ] `firebase deploy --only hosting` → https://project-5b3388f6-ec3f-4f11-b43.web.app

## 2. Domínio
- [ ] Apontar DNS `balcaoialocal.com.br` para **Vercel** (grátis) — ver `docs/FREE_STACK_SETUP.md`
- [ ] Definir `NEXT_PUBLIC_SITE_URL=https://balcaoialocal.com.br`
- [ ] Banco: **Supabase Free** (não precisa Firebase Blaze)
- [ ] Atualizar Authorized domains no Firebase Auth

## 3. Hotmart ([Termos](https://hotmart.com/pt-br/legal/termos-de-uso) · [Uso responsável](https://hotmart.com/pt-br/legal/politicas-de-uso) · [Boas práticas](https://hotmart.com/pt-br/blog/melhores-praticas))
- [ ] Criar produto “BalcãoIA Local — Método 7D + Studio”
- [ ] Preços: R$497 / R$397 / R$297 conforme `lib/config/pricing.ts`
- [ ] Garantia 7 dias
- [ ] Webhook → `https://SEU_DOMINIO/api/webhooks/hotmart` + `HOTMART_HOTTOK`
- [ ] Programa de afiliados (comissão sugerida 50%)
- [ ] Preencher `NEXT_PUBLIC_HOTMART_CHECKOUT_URL` e `NEXT_PUBLIC_HOTMART_AFFILIATE_URL`

### Compliance afiliados (obrigatório)
- Não prometer renda/vendas garantidas
- Não usar marca Hotmart/Meta/WhatsApp como se fosse oficial
- Não spam / disparo em massa
- Não ensinar automação não oficial
- Reproduzir oferta fielmente (preço, garantia, entregáveis)

## 4. Mídia (conversão)
- [ ] Gravar VSL vendas → `NEXT_PUBLIC_VSL_VENDAS_URL`
- [ ] Gravar aula grátis → `NEXT_PUBLIC_VSL_AULA_URL`
- [ ] Demo Studio (opcional) → `NEXT_PUBLIC_DEMO_STUDIO_URL`
- [ ] Screenshots reais do Studio na landing/vendas

## 5. IA (já no produto)
Configurável em `/app/settings`:
- Mock (demo)
- Groq / Llama (`GROQ_API_KEY`)
- Gemini (`GEMINI_API_KEY`)
- OpenAI GPT (`OPENAI_API_KEY`)
- Anthropic Claude (`ANTHROPIC_API_KEY`)

## 6. Validação pré-venda
- [ ] Landing captura lead + consentimento
- [ ] Diagnóstico gera score
- [ ] `/vendas` CTAs → checkout real
- [ ] Login Firebase ou demo
- [ ] Wizard 9 etapas + gerar assets
- [ ] Simulador + export MD
- [ ] `/afiliados` kit completo
- [ ] Legais linkados
- [ ] `npm test` e `npm run build` OK

## 7. Pós-Blaze (comando)
```bash
cd balcaoia-studio
firebase deploy --only hosting,firestore
```
