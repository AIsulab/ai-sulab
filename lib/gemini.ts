import { GoogleGenAI } from "@google/genai";

export async function generateWithGemini(prompt: string) {
  if (!process.env.GEMINI_API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: prompt,
  });

  return {
    content: response.text || "Gemini 응답이 비어 있습니다.",
    provider: "Gemini",
  };
}
