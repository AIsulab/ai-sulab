import Link from "next/link";
import { ContentGenerator } from "@/components/content-generator";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#080711_0%,#151128_58%,#0b1422_100%)]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          SULAB
        </Link>
        <Link
          href="/"
          className="focus-ring rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/14"
        >
          랜딩으로
        </Link>
      </header>

      <section className="mx-auto w-full max-w-7xl px-5 pt-8 lg:px-8">
        <p className="text-sm font-semibold text-violet-200">Dashboard</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">콘텐츠 생성 대시보드</h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-300">
          Step 3 핵심 기능 검증 화면입니다. 이후 로그인, 프로젝트별 히스토리, 결제 상태, 파일 저장 기능을 이
          구조 위에 확장할 수 있습니다.
        </p>
      </section>

      <ContentGenerator />
    </main>
  );
}
