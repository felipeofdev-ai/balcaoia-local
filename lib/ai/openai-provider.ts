import type { AIProvider } from "./provider";

export class OpenAIProvider implements AIProvider {
  name = "openai";

  isAvailable(): boolean {
    return Boolean(process.env.OPENAI_API_KEY);
  }

  async generateText(prompt: string, systemPrompt: string): Promise<string> {
    if (!this.isAvailable()) {
      const { MockAIProvider } = await import("./mock-provider");
      return new MockAIProvider().generateText(prompt, systemPrompt);
    }
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
    const data = (await res.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return data.choices[0]?.message?.content ?? "";
  }
}
