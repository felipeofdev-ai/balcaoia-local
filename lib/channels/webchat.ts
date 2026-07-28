import type {
  ChannelAdapter,
  IncomingMessage,
  SendMessageInput,
  SendMessageResult,
} from "./adapter";

/**
 * Webchat próprio do site — sem integração com canais de terceiros.
 */
export class WebchatAdapter implements ChannelAdapter {
  name = "Webchat";
  type = "webchat" as const;
  isOfficial = true;

  async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
    return {
      success: true,
      messageId: `webchat-${Date.now()}`,
      preview: input.content,
    };
  }

  async parseWebhook(request: Request): Promise<IncomingMessage[]> {
    const body = (await request.json()) as {
      from?: string;
      content?: string;
    };
    if (!body.from || !body.content) return [];
    return [
      {
        from: body.from,
        content: body.content,
        timestamp: new Date().toISOString(),
      },
    ];
  }
}
