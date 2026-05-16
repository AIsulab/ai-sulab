import Anthropic from "@anthropic-ai/sdk";

export async function generateWithClaude(prompt: string) {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || "claude-sonnet-4-5",
    max_tokens: 1400,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .filter(Boolean)
    .join("\n");

  return {
    content: content || "Claude 응답이 비어 있습니다.",
    provider: "Claude",
  };
}
