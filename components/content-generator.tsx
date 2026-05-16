"use client";

import { FormEvent, useMemo, useState } from "react";

type ContentType = "cardnews" | "blog" | "caption";
type Tone = "professional" | "friendly" | "bold" | "premium";
type Platform = "instagram" | "threads" | "linkedin" | "blog" | "cardnews";

type GenerateResponse = {
  content: string;
  saved: boolean;
  provider: string;
};

const contentTypes: { value: ContentType; label: string }[] = [
  { value: "cardnews", label: "카드뉴스 대본" },
  { value: "blog", label: "블로그 개요" },
  { value: "caption", label: "SNS 캡션" },
];

const tones: { value: Tone; label: string }[] = [
  { value: "professional", label: "전문적인" },
  { value: "friendly", label: "친근한" },
  { value: "bold", label: "강한 후킹" },
  { value: "premium", label: "프리미엄" },
];

const platforms: { value: Platform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "threads", label: "Threads" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "blog", label: "Blog" },
  { value: "cardnews", label: "Card News" },
];

export function ContentGenerator() {
  const [topic, setTopic] = useState("AI 자동화로 1인 사업자의 반복 업무를 줄이는 방법");
  const [type, setType] = useState<ContentType>("cardnews");
  const [tone, setTone] = useState<Tone>("professional");
  const [platform, setPlatform] = useState<Platform>("cardnews");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = useMemo(() => topic.trim().length >= 4 && !isLoading, [topic, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setStatus("생성 중");
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, type, tone, platform }),
      });

      const payload = (await response.json()) as Partial<GenerateResponse> & { error?: string };
      if (!response.ok) throw new Error(payload.error || "콘텐츠 생성에 실패했습니다.");

      setResult(payload.content || "");
      setStatus(payload.saved ? `${payload.provider} 생성 완료 · Firestore 저장됨` : `${payload.provider} 생성 완료`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="generator" className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-5 sm:p-7">
        <div>
          <p className="text-sm font-semibold text-violet-200">AI 콘텐츠 생성</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            주제만 입력하면 바로 쓸 수 있는 초안을 만듭니다
          </h2>
        </div>

        <label className="mt-7 block">
          <span className="text-sm font-medium text-zinc-200">콘텐츠 주제</span>
          <textarea
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="focus-ring mt-2 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-base text-white placeholder:text-zinc-500"
            placeholder="예: 소상공인을 위한 AI 고객 응대 자동화"
          />
        </label>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label>
            <span className="text-sm font-medium text-zinc-200">결과물</span>
            <select
              value={type}
              onChange={(event) => {
                const nextType = event.target.value as ContentType;
                setType(nextType);
                if (nextType === "blog") setPlatform("blog");
                if (nextType === "cardnews") setPlatform("cardnews");
                if (nextType === "caption" && (platform === "blog" || platform === "cardnews")) {
                  setPlatform("instagram");
                }
              }}
              className="focus-ring mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#171429] px-4 text-white"
            >
              {contentTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-medium text-zinc-200">플랫폼</span>
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as Platform)}
              className="focus-ring mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#171429] px-4 text-white"
            >
              {platforms.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-medium text-zinc-200">톤앤매너</span>
            <select
              value={tone}
              onChange={(event) => setTone(event.target.value as Tone)}
              className="focus-ring mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#171429] px-4 text-white"
            >
              {tones.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="focus-ring mt-6 h-13 w-full rounded-2xl bg-white px-5 font-bold text-[#181024] transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/60"
        >
          {isLoading ? "생성 중..." : "콘텐츠 생성하기"}
        </button>

        <p className="mt-4 min-h-5 text-sm text-violet-100">{status}</p>
      </form>

      <div className="glass-panel min-h-[32rem] rounded-3xl p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-sm font-semibold text-violet-200">Generated Draft</p>
            <h3 className="mt-1 text-xl font-bold text-white">생성 결과</h3>
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            Firestore Ready
          </span>
        </div>

        <pre className="mt-5 whitespace-pre-wrap break-words font-sans text-sm leading-7 text-zinc-100 sm:text-base">
          {result ||
            "생성 버튼을 누르면 이 영역에 AI 초안이 표시됩니다. Firebase 값이 설정되어 있으면 결과가 Firestore의 generatedContents 컬렉션에도 저장됩니다."}
        </pre>
      </div>
    </section>
  );
}
