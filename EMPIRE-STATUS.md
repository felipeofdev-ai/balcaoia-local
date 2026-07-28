# STATUS — BalcãoIA Local / Studio

**Última atualização:** 2026-07-28  
**Status:** Produção no ar (Vercel) + GitHub conectado  

| Item | Estado |
|------|--------|
| App Next.js | OK — https://balcaoia-studio.vercel.app |
| Domínio oficial | balcaoialocal.com.br (DNS Registro.br pendente) |
| GitHub | https://github.com/felipeofdev-ai/balcaoia-local |
| Vercel ↔ Git | Conectado (deploy automático em push) |
| Página de vendas | `/vendas` |
| Webhook Hotmart | `/api/webhooks/hotmart` |
| Checkout Hotmart | Aguardar link real + HOTTOK |
| Design system | Em `components/` + tokens CSS |
| Stack Forge Empire | **Não adotada** — mantemos BalcãoIA (Firebase/Supabase opcional, sem Clerk/Drizzle rewrite) |

## Pendências do operador
1. DNS A/CNAME no Registro.br → Valid no Vercel  
2. Criar produto Hotmart + colar `NEXT_PUBLIC_HOTMART_CHECKOUT_URL` + `HOTMART_HOTTOK`  
3. (Opcional) Supabase Free + migration  
4. Revogar PAT do GitHub se foi exposto em chat  
