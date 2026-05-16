import Link from "next/link";
import { ContentGenerator } from "@/components/content-generator";

const metrics = [
  ["콘텐츠 생성", "3종"],
  ["저장소", "Firestore"],
  ["API", "Gemini / Claude"],
];

const features = [
  {
    title: "콘텐츠 워크플로우",
    body: "카드뉴스, 블로그, SNS 캡션을 한 화면에서 만들고 바로 저장합니다.",
  },
  {
    title: "Firebase 기반 확장",
    body: "Auth, Firestore, Storage를 붙일 수 있는 구조로 초기 SaaS 골격을 잡았습니다.",
  },
  {
    title: "운영자 대시보드",
    body: "생성 기능을 대시보드로 분리해 추후 프로젝트, 히스토리, 결제 기능을 붙이기 쉽습니다.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(155,92,255,0.28),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.18),transparent_28%),linear-gradient(135deg,#080711_0%,#141025_42%,#0d1021_100%)]" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          SULAB
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 sm:flex">
          <a href="#features" className="hover:text-white">
            기능
          </a>
          <a href="#generator" className="hover:text-white">
            생성
          </a>
          <Link href="/dashboard" className="hover:text-white">
            대시보드
          </Link>
        </nav>
        <Link
          href="/login"
          className="focus-ring rounded-full bg-white px-4 py-2 text-sm font-bold text-[#151023] transition hover:bg-violet-100"
        >
          로그인
        </Link>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-10 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-20 lg:pt-20">
        <div>
          <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-violet-100">
            Next.js 14 + Firebase SaaS Migration
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI 콘텐츠 운영을 한 번에 끝내는 SULAB
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            반복되는 기획, 초안 작성, 저장 과정을 하나의 SaaS 흐름으로 묶었습니다. 주제와 톤앤매너만 정하면
            바로 실행 가능한 콘텐츠 초안을 생성합니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#generator"
              className="focus-ring inline-flex h-13 items-center justify-center rounded-2xl bg-white px-6 font-bold text-[#151023] transition hover:bg-violet-100"
            >
              AI 생성기 열기
            </a>
            <Link
              href="/dashboard"
              className="focus-ring inline-flex h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-6 font-bold text-white transition hover:bg-white/14"
            >
              대시보드 보기
            </Link>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-5">
          <div className="rounded-[1.4rem] border border-white/10 bg-[#0f0d1b]/80 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-violet-200">SULAB Console</p>
                <h2 className="mt-1 text-2xl font-bold text-white">콘텐츠 생성 파이프라인</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-100">
                Live
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {["주제 입력", "AI 초안 생성", "Firestore 저장", "대시보드 관리"].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/6 p-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-violet-300/20 text-sm font-black text-violet-100">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-zinc-100">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {metrics.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/7 p-4">
                  <dt className="text-xs text-zinc-400">{label}</dt>
                  <dd className="mt-2 text-lg font-black text-white">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-8 lg:grid-cols-3 lg:px-8">
        {features.map((feature) => (
          <article key={feature.title} className="glass-panel rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-3 leading-7 text-zinc-300">{feature.body}</p>
          </article>
        ))}
      </section>

      <ContentGenerator />
    </main>
  );
}
