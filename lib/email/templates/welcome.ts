import { emailLayout } from "./layout";

export interface WelcomeEmailInput {
  name: string;
  loginUrl: string;
}

export interface EmailContent {
  subject: string;
  html: string;
}

export function welcomeEmail({ name, loginUrl }: WelcomeEmailInput): EmailContent {
  const subject = "Bem-vindo(a) ao BalcãoIA Studio 🎉";
  const html = emailLayout({
    title: subject,
    previewText: "Seu acesso ao BalcãoIA Studio está pronto. Vamos organizar o atendimento do seu negócio.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Olá, <strong>${name}</strong>!</p>
      <p style="margin:0 0 16px;">
        Seja bem-vindo(a) ao <strong>BalcãoIA Studio</strong>. Sua conta já está pronta para uso.
        Em poucos minutos você vai organizar o catálogo, a base de conhecimento e os scripts de
        atendimento do seu negócio com apoio de IA.
      </p>
      <p style="margin:0 0 16px;">Próximos passos recomendados:</p>
      <ol style="margin:0 0 16px 20px;padding:0;">
        <li style="margin-bottom:6px;">Complete o wizard de 4 etapas com os dados do seu negócio;</li>
        <li style="margin-bottom:6px;">Gere seus primeiros scripts e a base de conhecimento;</li>
        <li style="margin-bottom:6px;">Teste tudo no simulador antes de usar com clientes reais;</li>
        <li>Exporte o pacote em Markdown/PDF para implantar no seu canal oficial.</li>
      </ol>
      <p style="margin:0;">Qualquer dúvida, é só responder este e-mail.</p>
    `,
    ctaLabel: "Acessar o BalcãoIA Studio",
    ctaUrl: loginUrl,
  });
  return { subject, html };
}
