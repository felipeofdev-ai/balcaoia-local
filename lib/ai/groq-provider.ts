import type { AIProvider } from "./provider";

/**
 * Groq — modelos Llama/Mixtral rápidos (plano free generoso + paid).
 * Docs: https://console.groq.com
 */
export class GroqProvider implements AIProvider {
  name = "groq";

  isAvailable(): boolean {
    return Boolean(process.env.GROQ_API_KEY);
  }

  async generateText(prompt: string, systemPrompt: string): Promise<string> {
    if (!this.isAvailable()) {
      const { MockAIProvider } = await import("./mock-provider");
      return new MockAIProvider().generateText(prompt, systemPrompt);
    }
    const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    });
    if (!res.ok) throw new Error(`Groq error: ${res.status}`);
    const data = (await res.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return data.choices[0]?.message?.content ?? "";
  }
}
