import { emailLayout } from "./layout";
import type { EmailContent } from "./welcome";

export interface AccessGrantedEmailInput {
  name: string;
  loginUrl: string;
  planName?: string;
}

export function accessGrantedEmail({ name, loginUrl, planName }: AccessGrantedEmailInput): EmailContent {
  const subject = "Sua compra foi aprovada — acesso liberado";
  const html = emailLayout({
    title: subject,
    previewText: "Compra aprovada! Seu acesso ao BalcãoIA Studio já está liberado.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Olá, <strong>${name}</strong>!</p>
      <p style="margin:0 0 16px;">
        Recebemos a confirmação da sua compra${planName ? ` do plano <strong>${planName}</strong>` : ""}
        e seu acesso ao <strong>BalcãoIA Studio</strong> já está <strong>liberado</strong>.
      </p>
      <p style="margin:0 0 16px;">
        Use o mesmo e-mail da compra para entrar. Se preferir, você pode definir uma senha na
        primeira tela de acesso.
      </p>
      <p style="margin:0;">
        Em caso de qualquer dúvida sobre o acesso ou a cobrança, responda este e-mail que nossa
        equipe te ajuda.
      </p>
    `,
    ctaLabel: "Acessar minha conta",
    ctaUrl: loginUrl,
  });
  return { subject, html };
}
