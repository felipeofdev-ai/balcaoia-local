import { afterEach, describe, expect, it } from "vitest";
import { ManualExportAdapter } from "@/lib/channels/manual-export";
import { SimulatorAdapter } from "@/lib/channels/simulator";
import { WhatsAppCloudApiAdapter } from "@/lib/channels/whatsapp-cloud";
import {
  ComplianceError,
  FeatureDisabledError,
  createForbiddenAdapter,
  type ForbiddenChannelType,
} from "@/lib/channels/adapter";

describe("ManualExportAdapter", () => {
  it("returns a copy-paste preview and never sends anything automatically", async () => {
    const adapter = new ManualExportAdapter();
    const result = await adapter.sendMessage({
      to: "11999999999",
      content: "Olá! Seu orçamento está pronto.",
      businessId: "biz-1",
    });

    expect(result.success).toBe(true);
    expect(result.preview).toContain("Olá! Seu orçamento está pronto.");
    expect(result.preview).toContain("Nenhuma mensagem foi enviada automaticamente");
  });
});

describe("SimulatorAdapter", () => {
  it("stores outbound and inbound messages per conversation and supports clearing", async () => {
    const adapter = new SimulatorAdapter();
    const conversationId = `conv-test-${Date.now()}`;

    const sent = await adapter.sendMessage({
      to: "cliente",
      content: "Oi! Como posso ajudar?",
      businessId: "biz-2",
      conversationId,
    });
    expect(sent.success).toBe(true);

    adapter.addInbound("biz-2", "Quero saber o preço", conversationId);

    const messages = adapter.getMessages(conversationId);
    expect(messages).toHaveLength(2);
    expect(messages[0].direction).toBe("outbound");
    expect(messages[1].direction).toBe("inbound");

    adapter.clear(conversationId);
    expect(adapter.getMessages(conversationId)).toHaveLength(0);
  });
});

describe("createForbiddenAdapter", () => {
  const forbiddenTypes: ForbiddenChannelType[] = [
    "openwa",
    "baileys",
    "venom",
    "evolution_api",
    "wa_automate",
    "qrcode_scraping",
  ];

  it.each(forbiddenTypes)("throws a ComplianceError for %s", (type) => {
    expect(() => createForbiddenAdapter(type)).toThrow(ComplianceError);
  });

  it("includes the channel type on the thrown error", () => {
    try {
      createForbiddenAdapter("baileys");
      throw new Error("should not reach this point");
    } catch (error) {
      expect(error).toBeInstanceOf(ComplianceError);
      expect((error as InstanceType<typeof ComplianceError>).channelType).toBe("baileys");
    }
  });
});

describe("WhatsAppCloudApiAdapter", () => {
  const originalFlag = process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD;

  afterEach(() => {
    if (originalFlag === undefined) delete process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD;
    else process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD = originalFlag;
  });

  it("throws FeatureDisabledError by default (flag unset)", async () => {
    delete process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD;
    const adapter = new WhatsAppCloudApiAdapter();
    await expect(
      adapter.sendMessage({ to: "5511999999999", content: "Oi", businessId: "biz-3" })
    ).rejects.toThrow(FeatureDisabledError);
  });

  it("throws FeatureDisabledError when the flag is explicitly false", async () => {
    process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD = "false";
    const adapter = new WhatsAppCloudApiAdapter();
    await expect(
      adapter.sendTemplate("template_name", {})
    ).rejects.toThrow(FeatureDisabledError);
  });

  it("does not throw once the flag is explicitly enabled", async () => {
    process.env.ENABLE_OFFICIAL_WHATSAPP_CLOUD = "true";
    const adapter = new WhatsAppCloudApiAdapter();
    const result = await adapter.sendMessage({
      to: "5511999999999",
      content: "Oi",
      businessId: "biz-3",
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
