import type { AIProvider } from "./provider";

export class AnthropicProvider implements AIProvider {
  name = "anthropic";

  isAvailable(): boolean {
    return Boolean(process.env.ANTHROPIC_API_KEY);
  }

  async generateText(prompt: string, systemPrompt: string): Promise<string> {
    if (!this.isAvailable()) {
      const { MockAIProvider } = await import("./mock-provider");
      return new MockAIProvider().generateText(prompt, systemPrompt);
    }
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic error: ${res.status}`);
    const data = (await res.json()) as {
      content: Array<{ text: string }>;
    };
    return data.content[0]?.text ?? "";
  }
}
