/**
 * Layout HTML compartilhado pelos e-mails transacionais do BalcãoIA Studio.
 * Cores petróleo/âmbar da marca, logo em texto (sem dependência de imagem
 * externa) e rodapé com aviso legal + descadastro em todos os envios.
 */

const PETROL = "#0f3d4a";
const AMBER = "#f5a623";
const GRAPHITE = "#1f2933";
const MUTED = "#52606d";
const BORDER = "#e4e7eb";

export interface EmailLayoutOptions {
  previewText?: string;
  title: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function emailLayout({ previewText, title, bodyHtml, ctaLabel, ctaUrl }: EmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${MUTED}1a;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    ${previewText ? `<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${previewText}</span>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="background:linear-gradient(135deg, ${PETROL} 0%, #0f4c75 100%);padding:28px 32px;">
                <span style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:0.2px;line-height:1.2;">
                  Balcão<span style="color:${AMBER};">IA</span> Local
                </span>
                <div style="margin-top:6px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.75);letter-spacing:0.4px;">
                  Studio
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:${GRAPHITE};font-size:15px;line-height:1.6;">
                ${bodyHtml}
                ${
                  ctaLabel && ctaUrl
                    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                        <tr>
                          <td style="border-radius:8px;background-color:${AMBER};">
                            <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;font-weight:600;color:${GRAPHITE};text-decoration:none;border-radius:8px;">
                              ${ctaLabel}
                            </a>
                          </td>
                        </tr>
                      </table>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f5f7f8;border-top:1px solid ${BORDER};">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:${MUTED};">
                  BalcãoIA Studio é um produto educacional e de produtividade para organizar o
                  atendimento do seu negócio. Não garantimos resultados de vendas, faturamento
                  ou aprovação, e não somos afiliados a WhatsApp, Meta, Google, OpenAI, Anthropic
                  ou demais marcas eventualmente citadas.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">
                  Não quer mais receber estes e-mails? Responda esta mensagem com "SAIR" ou fale
                  com o nosso suporte. © ${new Date().getFullYear()} BalcãoIA Studio.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
