import type {
  ChannelAdapter,
  SendMessageInput,
  SendMessageResult,
} from "./adapter";

export interface SimulatorMessage {
  id: string;
  direction: "inbound" | "outbound";
  content: string;
  businessId: string;
  conversationId: string;
  createdAt: string;
}

const store = new Map<string, SimulatorMessage[]>();

export class SimulatorAdapter implements ChannelAdapter {
  name = "Simulator";
  type = "simulator" as const;
  isOfficial = true;

  async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
    const conversationId = input.conversationId ?? `sim-${input.businessId}`;
    const msg: SimulatorMessage = {
      id: `msg-${Date.now()}`,
      direction: "outbound",
      content: input.content,
      businessId: input.businessId,
      conversationId,
      createdAt: new Date().toISOString(),
    };
    const list = store.get(conversationId) ?? [];
    list.push(msg);
    store.set(conversationId, list);
    return {
      success: true,
      messageId: msg.id,
      preview: input.content,
    };
  }

  addInbound(businessId: string, content: string, conversationId?: string) {
    const cid = conversationId ?? `sim-${businessId}`;
    const msg: SimulatorMessage = {
      id: `msg-${Date.now()}`,
      direction: "inbound",
      content,
      businessId,
      conversationId: cid,
      createdAt: new Date().toISOString(),
    };
    const list = store.get(cid) ?? [];
    list.push(msg);
    store.set(cid, list);
    return msg;
  }

  getMessages(conversationId: string) {
    return store.get(conversationId) ?? [];
  }

  clear(conversationId: string) {
    store.delete(conversationId);
  }
}

export const sharedSimulator = new SimulatorAdapter();
