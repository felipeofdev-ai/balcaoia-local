# Script: após salvar DNS no Registro.br, promove URLs oficiais na Vercel.
# Uso: npx ts-node não — rode via PowerShell:
#   powershell -File scripts/promote-official-domain.ps1

$ErrorActionPreference = "Stop"
$Domain = "balcaoialocal.com.br"
$Base = "https://$Domain"

Write-Host "Verificando DNS de $Domain ..."
$verify = npx vercel domains verify $Domain 2>&1 | Out-String
Write-Host $verify

if ($verify -notmatch '"ok":\s*true' -and $verify -notmatch 'Valid') {
  Write-Host ""
  Write-Host "DNS ainda INVALIDO. No Registro.br (Modo avancado -> Configurar zona DNS):"
  Write-Host "  1) A  | nome vazio | 216.198.79.1"
  Write-Host "  2) A  | nome vazio | 64.29.17.1"
  Write-Host "  3) CNAME | www | 0aa115eeb83a6cac.vercel-dns-017.com."
  Write-Host "  4) Salvar alteracoes"
  Write-Host "Depois rode este script de novo."
  exit 1
}

Write-Host "DNS OK. Atualizando envs de producao..."
@(
  @{ Key = "NEXT_PUBLIC_SITE_URL"; Value = $Base },
  @{ Key = "NEXT_PUBLIC_SALES_PAGE_URL"; Value = "$Base/vendas" },
  @{ Key = "NEXT_PUBLIC_MEMBERS_URL"; Value = "$Base/app/login" },
  @{ Key = "NEXT_PUBLIC_HOTMART_WEBHOOK_URL"; Value = "$Base/api/webhooks/hotmart" }
) | ForEach-Object {
  $_.Value | npx vercel env add $_.Key production --force 2>&1 | Out-Null
  Write-Host "  set $($_.Key)"
}

Write-Host "Redeploy producao..."
npx vercel --prod --yes
Write-Host "Pronto: $Base"
