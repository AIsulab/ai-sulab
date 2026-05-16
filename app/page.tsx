"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import {
  MessageSquare, BarChart2, GitBranch, Smartphone,
  Check, ChevronDown, ChevronRight, Zap, Globe,
  Star, ArrowRight, Menu, X, Bell, Shield, Clock,
  TrendingUp, Users, Plug, Layers, Brain,
} from "lucide-react";

/* ─────────────────────────── data ─────────────────────────── */

const NAV_LINKS = [
  { href: "#features", label: "기능" },
  { href: "#cases", label: "사례" },
  { href: "#pricing", label: "가격" },
  { href: "#faq", label: "FAQ" },
];

const LOGO_BRANDS = [
  "Kakao", "Naver", "Coupang", "Hyundai", "LG", "Samsung",
  "Lotte", "SK", "Kakao Bank", "Krafton",
];

const PAIN_CARDS = [
  {
    icon: Clock,
    title: "반복 작업에 지쳤나요?",
    body: "댓글 답변, 보고서 작성, CS 응대… 매일 같은 일을 반복하느라 정작 중요한 일에 집중하지 못합니다.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: BarChart2,
    title: "데이터가 쌓여도 인사이트가 없다?",
    body: "수많은 숫자가 있지만 어떤 의미인지 파악하는 데만 몇 시간이 걸립니다.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "팀 협업이 파편화됐나요?",
    body: "카카오톡, 이메일, 노션, 슬랙… 정보가 흩어져 정작 필요한 순간 찾을 수 없습니다.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Plug,
    title: "툴이 너무 많아 관리가 힘드나요?",
    body: "여러 SaaS를 구독하면서도 서로 연동이 안 돼 수동 복붙이 반복됩니다.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const FEATURE_BLOCKS = [
  {
    badge: "AI 댓글 응대",
    title: "고객 메시지를 AI가 24시간 대신합니다",
    body: "브랜드 톤앤매너에 맞게 학습된 AI가 SNS 댓글, DM, 문의를 자동으로 분류하고 답변합니다. 야간·주말 공백 없이 응대율 100%를 유지하세요.",
    points: ["학습 가능한 브랜드 보이스", "부정 댓글 자동 감지 & 에스컬레이션", "카카오·인스타·유튜브 통합"],
    icon: MessageSquare,
    color: "violet",
    reverse: false,
    mockup: "chat",
  },
  {
    badge: "실시간 인사이트",
    title: "데이터를 읽어주는 AI 애널리스트",
    body: "매출, 트래픽, 캠페인 성과를 AI가 요약해 매일 아침 리포트로 전달합니다. 복잡한 쿼리 없이 자연어로 데이터에 질문하세요.",
    points: ["자연어 데이터 조회", "자동 주간/월간 리포트", "이상 탐지 & 알림"],
    icon: BarChart2,
    color: "emerald",
    reverse: true,
    mockup: "chart",
  },
  {
    badge: "워크플로우 자동화",
    title: "반복 업무를 한 번만 설계하세요",
    body: "트리거→조건→액션 방식으로 복잡한 업무 흐름을 코딩 없이 만들 수 있습니다. Slack, Notion, 카카오, 이메일을 자유롭게 연결하세요.",
    points: ["노코드 플로우 빌더", "500+ 앱 연동", "실행 이력 & 롤백"],
    icon: GitBranch,
    color: "violet",
    reverse: false,
    mockup: "flow",
  },
  {
    badge: "모바일 최적화",
    title: "언제 어디서나 현황을 파악하세요",
    body: "스마트폰 하나로 자동화 현황, 고객 응대 현황, AI 리포트를 확인할 수 있습니다. 중요한 알림은 즉시 푸시로 전달됩니다.",
    points: ["iOS / Android 앱 지원", "실시간 푸시 알림", "모바일 승인·반려 워크플로우"],
    icon: Smartphone,
    color: "emerald",
    reverse: true,
    mockup: "mobile",
  },
];

const INTEGRATIONS = [
  { name: "Slack", bg: "bg-[#4A154B]", fg: "text-white" },
  { name: "Notion", bg: "bg-slate-900", fg: "text-white" },
  { name: "Gmail", bg: "bg-red-50", fg: "text-red-600" },
  { name: "Sheets", bg: "bg-green-50", fg: "text-green-700" },
  { name: "Kakao", bg: "bg-[#FEE500]", fg: "text-[#191600]" },
  { name: "Naver", bg: "bg-[#03C75A]", fg: "text-white" },
  { name: "Instagram", bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400", fg: "text-white" },
  { name: "YouTube", bg: "bg-red-600", fg: "text-white" },
  { name: "HubSpot", bg: "bg-orange-500", fg: "text-white" },
  { name: "Zapier", bg: "bg-orange-400", fg: "text-white" },
  { name: "Figma", bg: "bg-slate-800", fg: "text-white" },
  { name: "Jira", bg: "bg-blue-600", fg: "text-white" },
];

const TESTIMONIALS = [
  {
    quote: "Sulab 도입 후 CS 응대 시간이 80% 줄었어요. 야간에도 고객 만족도가 유지되고 있습니다.",
    name: "김지수",
    role: "마케팅팀장 · 뷰티 브랜드",
    stars: 5,
  },
  {
    quote: "매주 작성하던 데이터 리포트를 AI가 대신해줘서 분석에만 집중할 수 있게 됐습니다.",
    name: "이민호",
    role: "데이터 애널리스트 · 이커머스",
    stars: 5,
  },
  {
    quote: "복잡한 승인 워크플로우를 Sulab으로 구현했더니 처리 속도가 3배 빨라졌어요.",
    name: "박서연",
    role: "운영팀 · SaaS 스타트업",
    stars: 5,
  },
];

const STATS = [
  { value: "15K+", label: "팀이 사용 중" },
  { value: "550K+", label: "자동화된 작업" },
  { value: "4h/일", label: "평균 절약 시간" },
  { value: "99.98%", label: "서비스 가동률" },
];

const PLANS = [
  {
    name: "Free",
    price: "₩0",
    period: "/월",
    desc: "개인 및 소규모 테스트에 적합",
    highlight: false,
    cta: "무료로 시작",
    features: [
      "워크플로우 3개",
      "월 1,000 작업 실행",
      "기본 앱 연동 5개",
      "커뮤니티 지원",
    ],
  },
  {
    name: "Starter",
    price: "₩29,000",
    period: "/월",
    desc: "성장 중인 팀을 위한 플랜",
    highlight: false,
    cta: "14일 무료 체험",
    features: [
      "워크플로우 20개",
      "월 10,000 작업 실행",
      "앱 연동 50개+",
      "AI 댓글 응대",
      "이메일 지원",
    ],
  },
  {
    name: "Pro",
    price: "₩89,000",
    period: "/월",
    desc: "빠르게 확장하는 팀에게",
    highlight: true,
    badge: "가장 인기",
    cta: "14일 무료 체험",
    features: [
      "워크플로우 무제한",
      "월 100,000 작업 실행",
      "앱 연동 500개+",
      "AI 리포트 & 인사이트",
      "우선 지원 (24h)",
      "팀원 10명",
    ],
  },
  {
    name: "Enterprise",
    price: "문의",
    period: "",
    desc: "대규모 조직 맞춤 솔루션",
    highlight: false,
    cta: "영업팀 문의",
    features: [
      "모든 Pro 기능",
      "작업 실행 무제한",
      "SSO / SAML",
      "전담 온보딩",
      "SLA 99.99%",
      "팀원 무제한",
    ],
  },
];

const FAQS = [
  {
    q: "무료 체험 중 카드 정보가 필요한가요?",
    a: "아니요. 14일 무료 체험은 카드 등록 없이 시작할 수 있습니다. 체험 종료 후 자동 결제되지 않으며, 업그레이드를 원하실 때만 결제 정보를 입력하시면 됩니다.",
  },
  {
    q: "기존 사용 중인 툴과 연동이 가능한가요?",
    a: "Slack, Notion, 카카오, Gmail, Google Sheets, HubSpot 등 500개 이상의 앱과 연동됩니다. REST API와 Webhook을 통해 자체 시스템과도 연결할 수 있습니다.",
  },
  {
    q: "기술 지식 없이도 자동화를 만들 수 있나요?",
    a: "네. Sulab의 노코드 플로우 빌더는 드래그 앤 드롭 방식으로 설계되어 있어 비개발자도 쉽게 복잡한 워크플로우를 만들 수 있습니다. 템플릿도 100개 이상 제공합니다.",
  },
  {
    q: "데이터는 어떻게 보호되나요?",
    a: "모든 데이터는 AES-256으로 암호화되며, AWS Seoul 리전에 저장됩니다. SOC 2 Type II 인증을 보유하고 있으며, 개인정보보호법 및 GDPR을 준수합니다.",
  },
  {
    q: "플랜을 언제든지 변경할 수 있나요?",
    a: "언제든지 업그레이드 또는 다운그레이드할 수 있습니다. 업그레이드 시 차액은 일 단위로 계산되며, 다운그레이드는 현재 결제 주기 종료 후 적용됩니다.",
  },
];

/* ─────────────────────────── sub-components ─────────────────────────── */

function ChatMockup() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-xs text-slate-500 font-medium">AI 댓글 응대 · 실시간</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          { side: "left", msg: "배송이 언제 오나요?", sub: "고객" },
          { side: "right", msg: "안녕하세요! 주문하신 상품은 오늘 출고되어 내일 도착 예정입니다. 더 궁금하신 점 있으시면 알려주세요 😊", sub: "AI" },
          { side: "left", msg: "감사해요!", sub: "고객" },
        ].map((item, i) => (
          <div key={i} className={`flex gap-2 ${item.side === "right" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${item.side === "right" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-600"}`}>
              {item.sub === "AI" ? "AI" : "U"}
            </div>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed ${item.side === "right" ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700"}`}>
              {item.msg}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1 text-[11px] text-violet-600 font-medium pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          AI가 3개 댓글에 응답 중…
        </div>
      </div>
    </div>
  );
}

function ChartMockup() {
  const bars = [40, 65, 52, 78, 90, 72, 95];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">주간 성과 리포트</span>
        <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">+23% vs 지난주</span>
      </div>
      <div className="p-4">
        <div className="flex items-end gap-2 h-28">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-emerald-400/80 transition-all"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400">
          {["월", "화", "수", "목", "금", "토", "일"].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[["총 전환", "1,284"], ["평균 응답률", "98.3%"]].map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-xl p-3">
              <div className="text-[10.5px] text-slate-500">{k}</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowMockup() {
  const nodes = ["트리거", "조건 분기", "AI 처리", "Slack 전송"];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <span className="text-xs font-semibold text-slate-700">워크플로우 빌더</span>
      </div>
      <div className="p-4 space-y-2">
        {nodes.map((node, i) => (
          <div key={node} className="flex flex-col items-center">
            <div className={`w-full flex items-center gap-3 rounded-xl border p-3 ${i === 0 ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {i + 1}
              </div>
              <span className="text-[13px] font-medium text-slate-700">{node}</span>
              {i === nodes.length - 1 && (
                <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">완료</span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className="w-0.5 h-3 bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto w-48 rounded-[2rem] border-4 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
      <div className="bg-white px-3 py-4 space-y-2">
        <div className="text-[10px] font-bold text-slate-900 text-center">Sulab</div>
        <div className="bg-violet-50 rounded-xl p-2.5">
          <div className="text-[9px] text-violet-700 font-semibold">오늘의 자동화</div>
          <div className="text-lg font-black text-violet-900 mt-0.5">1,284</div>
          <div className="text-[9px] text-violet-600">작업 완료</div>
        </div>
        {[["댓글 응대", "34건"], ["리포트 발송", "완료"]].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center bg-slate-50 rounded-lg px-2.5 py-2">
            <span className="text-[9.5px] text-slate-700 font-medium">{k}</span>
            <span className="text-[9.5px] text-emerald-600 font-bold">{v}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-[8.5px] text-slate-500 pt-1">
          <Bell className="w-2.5 h-2.5" />
          <span>알림 3개</span>
        </div>
      </div>
    </div>
  );
}

function MockupSwitch({ type }: { type: string }) {
  if (type === "chat") return <ChatMockup />;
  if (type === "chart") return <ChartMockup />;
  if (type === "flow") return <FlowMockup />;
  return (
    <div className="flex justify-center">
      <MobileMockup />
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold text-slate-900 hover:text-violet-700 transition"
      >
        {q}
        <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-[14.5px] text-slate-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">

      {/* ── NAV ─────────────────────────────────────────── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <nav className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 px-5 py-3 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-slate-600">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-violet-700 transition">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:inline-flex text-[14px] font-medium text-slate-600 hover:text-violet-700 transition">
              로그인
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[13.5px] font-semibold transition shadow-md shadow-violet-600/25"
            >
              무료 시작 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="메뉴"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-4 flex flex-col gap-4 md:hidden">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[15px] font-medium text-slate-700 hover:text-violet-700" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.12),transparent)]" />
        <div className="absolute top-1/3 left-1/4 -z-10 w-96 h-96 rounded-full bg-violet-300/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 -z-10 w-64 h-64 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-5 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-[12.5px] font-semibold text-violet-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dot-pulse" />
            AI Automation Platform
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 max-w-4xl mx-auto">
            AI로 더 쉽게
            <span className="gradient-text"> 성장하는 </span>
            비즈니스
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            반복 업무는 자동화하고, 의사결정은 더 빠르게.<br className="hidden sm:block" />
            Sulab의 워크플로우 AI가 마케팅·CS·운영을 24시간 대신합니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-13 px-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-[15px] transition shadow-xl shadow-violet-600/30"
            >
              무료로 시작하기 <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 h-13 px-8 rounded-2xl border border-slate-200 text-slate-700 font-bold text-[15px] hover:border-slate-300 hover:bg-slate-50 transition"
            >
              기능 살펴보기
            </a>
          </div>
          <p className="mt-4 text-[13px] text-slate-400">카드 등록 불필요 · 14일 무료 체험</p>
        </div>

        {/* Product Preview */}
        <div className="mx-auto max-w-5xl px-5 lg:px-8 mt-16">
          <div className="relative rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-[12px] text-slate-400 text-center max-w-xs mx-auto">
                  app.sulab.store/dashboard
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 bg-[#F8F7FF]">
              <div className="col-span-1 space-y-3">
                {["워크플로우", "AI 응대", "인사이트", "연동 관리", "설정"].map((item, i) => (
                  <div key={item} className={`rounded-xl px-3 py-2.5 text-[13px] font-medium cursor-pointer transition ${i === 0 ? "bg-violet-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[["자동화 실행", "1,284", "+12%"], ["응대 완료", "98.3%", "+5%"]].map(([k, v, d]) => (
                    <div key={k} className="bg-white rounded-xl p-4 border border-slate-100">
                      <div className="text-[11px] text-slate-500">{k}</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">{v}</div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{d} 지난주 대비</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <div className="text-[12px] font-semibold text-slate-700 mb-3">최근 실행 워크플로우</div>
                  <div className="space-y-2">
                    {[
                      ["댓글 자동 응대", "2초 전", "완료"],
                      ["주간 리포트 발송", "5분 전", "완료"],
                      ["CRM 동기화", "12분 전", "진행 중"],
                    ].map(([name, time, status]) => (
                      <div key={name} className="flex items-center justify-between text-[12px]">
                        <span className="text-slate-700 font-medium">{name}</span>
                        <span className="text-slate-400">{time}</span>
                        <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${status === "완료" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <div className="absolute left-[8%] top-[60%] hidden lg:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-[12px] font-medium text-slate-700">
            <Zap className="w-4 h-4 text-amber-500" /> 워크플로우 자동화
          </div>
          <div className="absolute right-[6%] top-[52%] hidden lg:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-[12px] font-medium text-slate-700">
            <Shield className="w-4 h-4 text-emerald-500" /> 데이터 보안 SOC2
          </div>
        </div>
      </section>

      {/* ── LOGO STRIP ──────────────────────────────────── */}
      <section id="cases" className="py-14 border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="text-center text-[13px] font-semibold text-slate-400 uppercase tracking-widest mb-8">이미 수천 개의 팀이 신뢰합니다</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {LOGO_BRANDS.map((brand) => (
              <span key={brand} className="text-[15px] font-bold text-slate-300 hover:text-slate-500 transition cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────── */}
      <section className="py-20 px-5 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              아직도 이런 문제로 시간을 낭비하고 있나요?
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Sulab이 해결해 드립니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAIN_CARDS.map((card) => (
              <div key={card.title} className={`rounded-2xl p-6 ${card.bg} border border-current/10`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-[13.5px] text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/login" className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition shadow-lg shadow-violet-600/25">
              지금 해결하기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE BLOCKS ──────────────────────────────── */}
      <section id="features" className="py-10">
        {FEATURE_BLOCKS.map((block, i) => (
          <div key={block.badge} className={`py-16 px-5 lg:px-8 ${i % 2 === 1 ? "bg-slate-50" : ""}`}>
            <div className={`mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${block.reverse ? "lg:grid-flow-dense" : ""}`}>
              <div className={block.reverse ? "lg:col-start-2" : ""}>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold mb-5 ${block.color === "violet" ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700"}`}>
                  <block.icon className="w-3.5 h-3.5" /> {block.badge}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">{block.title}</h2>
                <p className="mt-4 text-[15.5px] text-slate-500 leading-relaxed">{block.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {block.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[14.5px] font-medium text-slate-700">
                      <Check className={`w-4 h-4 shrink-0 ${block.color === "violet" ? "text-violet-600" : "text-emerald-600"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`inline-flex items-center gap-1.5 mt-8 text-[14px] font-semibold transition ${block.color === "violet" ? "text-violet-600 hover:text-violet-800" : "text-emerald-600 hover:text-emerald-800"}`}>
                  자세히 알아보기 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={block.reverse ? "lg:col-start-1" : ""}>
                <MockupSwitch type={block.mockup} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── INTEGRATIONS ────────────────────────────────── */}
      <section className="py-20 px-5 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900">이미 쓰는 툴과 바로 연동</h2>
            <p className="mt-3 text-[15px] text-slate-500">500개 이상의 앱과 연결할 수 있습니다.</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {INTEGRATIONS.map((app) => (
              <div key={app.name} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:scale-105 transition cursor-default ${app.bg} ${app.fg}`}>
                <Plug className="w-5 h-5 opacity-70" />
                <span className="text-[11px] font-bold">{app.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-[13px] text-slate-400">+ 488개 더</p>
        </div>
      </section>

      {/* ── HIGHLIGHT STRIP ─────────────────────────────── */}
      <section className="py-20 px-5 lg:px-8 bg-gradient-to-r from-violet-600 via-violet-700 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest opacity-70 mb-4">왜 Sulab인가</p>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
            매일 <span className="text-yellow-300">4시간</span>을 아끼세요
          </h2>
          <p className="mt-5 text-[17px] text-white/80 max-w-xl mx-auto leading-relaxed">
            반복 업무에 쓰는 평균 4시간을 Sulab이 대신합니다.<br />
            월 <span className="font-black text-white">₩29,000</span>부터 시작할 수 있습니다.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-10 h-14 px-10 rounded-2xl bg-white text-violet-700 font-black text-[16px] hover:bg-violet-50 transition shadow-xl"
          >
            14일 무료로 시작 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── DARK STATS / TESTIMONIALS ───────────────────── */}
      <section className="py-20 px-5 lg:px-8 bg-[#0B0F19] text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-4xl lg:text-5xl font-black gradient-text">{s.value}</div>
                <div className="text-[13px] text-white/50 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[14.5px] text-white/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-[13px] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold">{t.name}</div>
                    <div className="text-[12px] text-white/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-5 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">합리적인 요금제</h2>
            <p className="mt-3 text-[15px] text-slate-500">모든 플랜은 14일 무료 체험으로 시작할 수 있습니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${plan.highlight ? "bg-violet-600 text-white shadow-2xl shadow-violet-600/30 scale-105" : "bg-white border border-slate-200"}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[11px] font-black px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className={`text-[13px] font-bold uppercase tracking-wider mb-2 ${plan.highlight ? "text-violet-200" : "text-violet-600"}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-3xl font-black ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                  {plan.period && <span className={`text-[13px] ${plan.highlight ? "text-violet-200" : "text-slate-500"}`}>{plan.period}</span>}
                </div>
                <p className={`text-[13px] mt-1.5 mb-5 ${plan.highlight ? "text-violet-200" : "text-slate-500"}`}>{plan.desc}</p>
                <Link
                  href="/login"
                  className={`w-full h-10 rounded-xl text-[13.5px] font-bold flex items-center justify-center transition mb-6 ${plan.highlight ? "bg-white text-violet-700 hover:bg-violet-50" : "bg-violet-600 text-white hover:bg-violet-700"}`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-[13.5px] ${plan.highlight ? "text-violet-100" : "text-slate-600"}`}>
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? "text-violet-200" : "text-violet-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-5 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 text-center mb-10">자주 묻는 질문</h2>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────── */}
      <section className="py-24 px-5 lg:px-8 relative overflow-hidden hero-violet grain text-white">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[12px] font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse" /> 지금 바로 시작하세요
          </span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
            AI가 만드는<br />성장의 시작
          </h2>
          <p className="mt-6 text-[17px] text-white/80 max-w-lg mx-auto leading-relaxed">
            카드 등록 없이 14일간 모든 기능을 무료로 체험하세요.<br />
            15,000개 팀이 이미 Sulab과 함께 성장하고 있습니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-2xl bg-white text-violet-700 font-black text-[16px] hover:bg-violet-50 transition shadow-2xl"
            >
              무료로 시작하기 <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-2xl border border-white/20 text-white/90 font-semibold text-[15px] hover:bg-white/10 transition backdrop-blur-sm"
            >
              기능 살펴보기
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white px-5 lg:px-8 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <Logo light />
              <p className="mt-4 text-[13.5px] text-white/50 leading-relaxed max-w-xs">
                AI로 업무 자동화를 실현하는 올인원 플랫폼. 마케팅·CS·운영을 한 번에.
              </p>
              <div className="flex gap-3 mt-6">
                {["T", "I", "L", "Y"].map((icon) => (
                  <button key={icon} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-[13px] font-bold transition">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            {[
              { heading: "제품", links: ["기능 소개", "요금제", "업데이트", "로드맵"] },
              { heading: "회사", links: ["소개", "블로그", "채용", "파트너"] },
              { heading: "지원", links: ["도움말 센터", "영업팀 문의", "커뮤니티", "상태 페이지"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-[12.5px] font-bold uppercase tracking-widest text-white/40 mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] text-white/60 hover:text-white transition">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40">
            <span>© 2026 Sulab Inc. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/70 transition">이용약관</a>
              <a href="#" className="hover:text-white/70 transition">개인정보처리방침</a>
              <a href="#" className="hover:text-white/70 transition">쿠키 정책</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
