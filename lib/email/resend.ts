import { Resend } from "resend";

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  mode: "resend" | "log";
  error?: string;
}

const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL ?? "BalcãoIA Studio <no-reply@balcaoialocal.com.br>";

/**
 * Envia e-mail via Resend. Sem RESEND_API_KEY configurada, opera em modo
 * "log" (não-bloqueante): apenas registra no console, útil para dev/demo
 * sem quebrar o fluxo de compra/onboarding.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[email:log] Para: ${Array.isArray(input.to) ? input.to.join(", ") : input.to} | Assunto: ${input.subject}`
    );
    return { ok: true, mode: "log" };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: input.from ?? DEFAULT_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
    });

    if (error) {
      console.error("[email:resend] erro ao enviar", error);
      return { ok: false, mode: "resend", error: error.message };
    }

    return { ok: true, mode: "resend", id: data?.id };
  } catch (error) {
    console.error("[email:resend] exceção ao enviar", error);
    return {
      ok: false,
      mode: "resend",
      error: error instanceof Error ? error.message : "Erro desconhecido ao enviar e-mail.",
    };
  }
}
