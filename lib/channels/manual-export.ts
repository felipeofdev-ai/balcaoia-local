import type {
  ChannelAdapter,
  SendMessageInput,
  SendMessageResult,
} from "./adapter";

export class ManualExportAdapter implements ChannelAdapter {
  name = "Manual Export";
  type = "manual_export" as const;
  isOfficial = true;

  async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
    const preview = [
      "=== PRÉVIA PARA ENVIO MANUAL ===",
      `Para: ${input.to}`,
      `Negócio: ${input.businessId}`,
      "",
      input.content,
      "",
      "=== Copie e cole no canal oficial do seu negócio ===",
      "Nenhuma mensagem foi enviada automaticamente.",
    ].join("\n");

    return {
      success: true,
      messageId: `manual-${Date.now()}`,
      preview,
    };
  }
}
