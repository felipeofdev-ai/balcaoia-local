import {
  FeatureDisabledError,
  type ChannelAdapter,
  type IncomingMessage,
  type SendMessageInput,
  type SendMessageResult,
} from "./adapter";

/**
 * Esqueleto da API oficial WhatsApp Business Platform / Cloud API.
 * Desativado no MVP via ENABLE_OFFICIAL_WHATSAPP_CLOUD.
 */
export class WhatsAppCloudApiAdapter implements ChannelAdapter {
  name = "WhatsApp Cloud API (oficial)";
  type = "whatsapp_cloud_api" as const;
  isOfficial = true;

  private assertEnabled() {
    if (process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD !== "true") {
      throw new FeatureDisabledError(
        "WhatsApp Cloud API oficial está desativada no MVP. " +
          "Defina ENABLE_OFFICIAL_WHATSAPP_CLOUD=true e configure " +
          "WHATSAPP_CLOUD_* para ativar. Use ManualExportAdapter ou SimulatorAdapter."
      );
    }
  }

  async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
    this.assertEnabled();
    // Estrutura preparada: janela 24h, opt-in e templates aprovados
    void input;
    return {
      success: false,
      error:
        "Integração Cloud API configurável — implemente envio oficial com opt-in e templates.",
    };
  }

  async sendTemplate(
    templateName: string,
    params: Record<string, string>
  ): Promise<SendMessageResult> {
    this.assertEnabled();
    void templateName;
    void params;
    return {
      success: false,
      error: "Templates oficiais exigem aprovação e opt-in do destinatário.",
    };
  }

  async verifyWebhook(request: Request): Promise<boolean> {
    this.assertEnabled();
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    return (
      mode === "subscribe" &&
      token === process.env.WHATSAPP_CLOUD_VERIFY_TOKEN
    );
  }

  async parseWebhook(request: Request): Promise<IncomingMessage[]> {
    this.assertEnabled();
    const body = await request.json();
    void body;
    // Parsing oficial a implementar quando a flag estiver ativa
    return [];
  }
}
