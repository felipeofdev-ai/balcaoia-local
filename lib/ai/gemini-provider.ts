import type { AIProvider } from "./provider";

export class GeminiProvider implements AIProvider {
  name = "gemini";

  isAvailable(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generateText(prompt: string, systemPrompt: string): Promise<string> {
    if (!this.isAvailable()) {
      const { MockAIProvider } = await import("./mock-provider");
      return new MockAIProvider().generateText(prompt, systemPrompt);
    }
    const key = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt}\n\n${prompt}` }],
            },
          ],
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
    const data = (await res.json()) as {
      candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
    };
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  }
}
