export type ChannelType =
  | "manual_export"
  | "simulator"
  | "webchat"
  | "whatsapp_cloud_api";

export type ForbiddenChannelType =
  | "openwa"
  | "baileys"
  | "venom"
  | "evolution_api"
  | "wa_automate"
  | "qrcode_scraping";

export class ComplianceError extends Error {
  constructor(
    message: string,
    public channelType: ForbiddenChannelType
  ) {
    super(`[COMPLIANCE ERROR] ${message}`);
    this.name = "ComplianceError";
  }
}

export class FeatureDisabledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FeatureDisabledError";
  }
}

export interface SendMessageInput {
  to: string;
  content: string;
  businessId: string;
  conversationId?: string;
}

export interface SendMessageResult {
  success: boolean;
  messageId?: string;
  preview?: string;
  error?: string;
}

export interface IncomingMessage {
  from: string;
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ChannelAdapter {
  name: string;
  type: ChannelType;
  isOfficial: boolean;
  sendMessage(input: SendMessageInput): Promise<SendMessageResult>;
  sendTemplate?(
    templateName: string,
    params: Record<string, string>
  ): Promise<SendMessageResult>;
  parseWebhook?(request: Request): Promise<IncomingMessage[]>;
  verifyWebhook?(request: Request): Promise<boolean>;
}

export function createForbiddenAdapter(type: ForbiddenChannelType): never {
  throw new ComplianceError(
    `O adapter "${type}" não é permitido no BalcãoIA Studio. ` +
      `Este sistema utiliza apenas canais oficiais e seguros. ` +
      `Automações via QR Code, scraping ou APIs não oficiais violam ` +
      `os termos de serviço das plataformas e a política deste produto. ` +
      `Use ManualExportAdapter, SimulatorAdapter, WebchatAdapter ou, ` +
      `quando disponível, WhatsAppCloudApiAdapter (API oficial).`,
    type
  );
}
