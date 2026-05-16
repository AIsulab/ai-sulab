import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/claude";
import { getAdminDb } from "@/lib/firebase-admin";
import { generateWithGemini } from "@/lib/gemini";

type ContentType = "cardnews" | "blog" | "caption";
type Tone = "professional" | "friendly" | "bold" | "premium";
type Platform = "instagram" | "threads" | "linkedin" | "blog" | "cardnews";

type GenerateRequest = {
  topic?: string;
  type?: ContentType;
  tone?: Tone;
  platform?: Platform;
  userId?: string;
};

const typeLabel: Record<ContentType, string> = {
  cardnews: "card news script",
  blog: "blog outline",
  caption: "SNS caption",
};

const toneLabel: Record<Tone, string> = {
  professional: "professional and credible",
  friendly: "friendly and easy to understand",
  bold: "bold, hook-driven, and conversion focused",
  premium: "polished like a premium brand",
};

const platformLabel: Record<Platform, string> = {
  instagram: "Instagram",
  threads: "Threads",
  linkedin: "LinkedIn",
  blog: "Blog",
  cardnews: "Card News",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequest;
    const topic = body.topic?.trim();
    const type = body.type || "cardnews";
    const tone = body.tone || "professional";
    const platform = body.platform || defaultPlatform(type);
    const userId = body.userId?.trim() || null;

    if (!topic || topic.length < 4) {
      return NextResponse.json({ error: "Please enter a topic with at least 4 characters." }, { status: 400 });
    }

    const prompt = buildPrompt({ topic, type, tone, platform });
    const generated = await generateContent(prompt);
    const saved = await saveGeneratedContent({
      topic,
      type,
      tone,
      platform,
      userId,
      content: generated.content,
      provider: generated.provider,
    });

    return NextResponse.json({
      content: generated.content,
      provider: generated.provider,
      saved,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}

function buildPrompt(input: {
  topic: string;
  type: ContentType;
  tone: Tone;
  platform: Platform;
}) {
  return [
    "You are a Korean content marketing strategist.",
    "Write the final answer in Korean.",
    `Topic: ${input.topic}`,
    `Output type: ${typeLabel[input.type]}`,
    `Platform: ${platformLabel[input.platform]}`,
    `Tone: ${toneLabel[input.tone]}`,
    "Requirements:",
    "- Make the draft ready to copy and use.",
    "- Avoid unrealistic performance guarantees.",
    "- Include a title, body, and CTA.",
    "- For SNS captions, include a first-line hook, body copy, and 5 hashtags.",
    "- For blog outlines, include H1, H2 sections, and key bullets.",
    "- For card news scripts, write slide-by-slide copy within 8 slides.",
  ].join("\n");
}

async function generateContent(prompt: string) {
  const claude = await generateWithClaude(prompt);
  if (claude) return claude;

  const gemini = await generateWithGemini(prompt);
  if (gemini) return gemini;

  return {
    content: buildDemoContent(),
    provider: "Demo",
  };
}

async function saveGeneratedContent(input: {
  topic: string;
  type: ContentType;
  tone: Tone;
  platform: Platform;
  userId: string | null;
  content: string;
  provider: string;
}) {
  try {
    const db = getAdminDb();
    if (!db) return false;

    await db.collection("generatedContents").add({
      ...input,
      createdAt: new Date(),
    });

    if (input.userId) {
      await db
        .collection("usage")
        .doc(input.userId)
        .set(
          {
            totalGenerations: FieldValue.increment(1),
            [`byType.${input.type}`]: FieldValue.increment(1),
            [`byPlatform.${input.platform}`]: FieldValue.increment(1),
            updatedAt: new Date(),
          },
          { merge: true },
        );
    }

    return true;
  } catch (error) {
    console.error("Failed to save generated content", error);
    return false;
  }
}

function defaultPlatform(type: ContentType): Platform {
  if (type === "blog") return "blog";
  if (type === "cardnews") return "cardnews";
  return "instagram";
}

function buildDemoContent() {
  return [
    "[Demo Draft]",
    "",
    "Title",
    "AI automation system for reducing repetitive work",
    "",
    "Body",
    "1. List repetitive tasks and group them by collection, classification, and follow-up.",
    "2. Select customer messages, content publishing, and lead organization as first automation candidates.",
    "3. Connect prompts and data storage so the workflow can be reused.",
    "",
    "CTA",
    "Set GEMINI_API_KEY or ANTHROPIC_API_KEY to replace this demo with a real AI response.",
  ].join("\n");
}
