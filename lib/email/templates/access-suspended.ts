import { emailLayout } from "./layout";
import type { EmailContent } from "./welcome";

export interface AccessSuspendedEmailInput {
  name: string;
  reason?: string;
  supportUrl?: string;
}

export function accessSuspendedEmail({ name, reason, supportUrl }: AccessSuspendedEmailInput): EmailContent {
  const subject = "Seu acesso ao BalcãoIA Studio foi suspenso";
  const html = emailLayout({
    title: subject,
    previewText: "Identificamos uma alteração na sua compra e seu acesso foi suspenso temporariamente.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Olá, <strong>${name}</strong>.</p>
      <p style="margin:0 0 16px;">
        Identificamos ${reason ? `o seguinte motivo` : "uma alteração"} relacionado à sua compra
        e, por isso, seu acesso ao <strong>BalcãoIA Studio</strong> foi <strong>suspenso</strong>
        temporariamente${reason ? `: <em>${reason}</em>` : "."}
      </p>
      <p style="margin:0 0 16px;">
        Seus dados e materiais gerados continuam salvos com segurança. Assim que a situação da
        compra for regularizada, o acesso é restabelecido automaticamente.
      </p>
      <p style="margin:0;">
        Se você acredita que isso é um engano, fale com o nosso suporte respondendo este e-mail
        ou pelo canal de atendimento indicado no botão abaixo.
      </p>
    `,
    ctaLabel: supportUrl ? "Falar com o suporte" : undefined,
    ctaUrl: supportUrl,
  });
  return { subject, html };
}
