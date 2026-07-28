# Configurar DNS no Registro.br — balcaoialocal.com.br

Site já no ar: **https://balcaoia-studio.vercel.app**

Domínios já vinculados no projeto Vercel. Só falta o DNS no Registro.br.

---

## Cadastre estes registros (valores oficiais da Vercel agora)

Login: https://registro.br → **balcaoialocal.com.br** → **DNS** → editar zona.

### 1) Domínio raiz `balcaoialocal.com.br`

Crie **dois** registros tipo **A** (nome `@` ou em branco):

| Tipo | Nome | Valor |
|------|------|--------|
| **A** | `@` | `216.198.79.1` |
| **A** | `@` | `64.29.17.1` |

(Alternativa simples, se o painel só aceitar um A: use `76.76.21.21`)

### 2) Subdomínio `www`

| Tipo | Nome | Valor |
|------|------|--------|
| **CNAME** | `www` | `0aa115eeb83a6cac.vercel-dns-017.com.` |

> Copie o valor **com o ponto no final**, se o Registro.br permitir. Se reclamar do ponto, tente sem o ponto.

### Remova
- Qualquer **A** / **AAAA** antigo da raiz ou do `www` apontando para outro lugar
- Não precisa mudar nameservers (`a.auto.dns.br` / `b.auto.dns.br`) neste método

Salve a zona.

---

## Conferir

Espere 15–120 min, depois:

```powershell
nslookup balcaoialocal.com.br
nslookup www.balcaoialocal.com.br
```

Status na Vercel:  
https://vercel.com/felipe-dev-s-projects/balcaoia-studio/settings/domains

Quando ficar **Valid**, abra:
- https://balcaoialocal.com.br
- https://www.balcaoialocal.com.br

Me avise quando salvar no Registro.br que eu revalido o DNS daqui.
