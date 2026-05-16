"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  Zap, Bell, ChevronDown, User as UserIcon, CreditCard, Settings, LogOut,
  Plus, Sparkles, Workflow, Bot, LineChart, Plug, Activity,
  GitBranch, Send, Brain, ExternalLink, Check, X,
  ChevronLeft, ChevronRight, Download, MoreHorizontal, ArrowRight,
} from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase";
import { Logo } from "@/components/logo";

// ── Types ─────────────────────────────────────────────────────
type RunStatus = "success" | "running" | "failed";
type NodeState = "done" | "running" | "queued";
type FilterKey = "all" | RunStatus;

// ── Static data ───────────────────────────────────────────────
const FEATURES = [
  { icon: Workflow,   title: "워크플로우 빌더",  desc: "드래그 한 번으로 자동화 시나리오 구성",       tint: "violet" },
  { icon: Bot,        title: "AI 응답 에이전트", desc: "고객 문의 · 댓글을 24시간 자동 응대",          tint: "indigo" },
  { icon: LineChart,  title: "실시간 인사이트",  desc: "성과를 한 화면에서 추적 · 비교",               tint: "fuchsia" },
  { icon: Plug,       title: "150+ 앱 연동",     desc: "Notion · Slack · GA · HubSpot · Webhook",  tint: "sky" },
] as const;

const TINT: Record<string, string> = {
  violet:  "bg-violet-100 text-violet-700",
  indigo:  "bg-indigo-100 text-indigo-700",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700",
  sky:     "bg-sky-100 text-sky-700",
};

const NODES: { id: number; title: string; sub: string; icon: React.ElementType; state: NodeState }[] = [
  { id: 0, title: "트리거",    sub: "신규 리드 · Webhook", icon: Zap,       state: "done" },
  { id: 1, title: "AI 분류",   sub: "GPT-4o · 의도 분석",  icon: Brain,     state: "running" },
  { id: 2, title: "분기 처리", sub: "조건부 라우팅",         icon: GitBranch, state: "queued" },
  { id: 3, title: "응대 발송", sub: "Slack · 이메일",        icon: Send,      state: "queued" },
];

const RUNS = [
  { id: "RUN-9241", name: "Instagram 댓글 응대",    trig: "Webhook · IG",      status: "success" as RunStatus, credits: 32,  dur: "1.2s", time: "방금" },
  { id: "RUN-9240", name: "리드 분류 · CRM 동기화", trig: "Scheduled · 5min",  status: "success" as RunStatus, credits: 18,  dur: "0.8s", time: "2분 전" },
  { id: "RUN-9239", name: "주간 리포트 생성",        trig: "Cron · Mon 09:00",  status: "running" as RunStatus, credits: 124, dur: "—",    time: "3분 전" },
  { id: "RUN-9238", name: "고객 NPS 후속 메일",      trig: "Form · Typeform",   status: "success" as RunStatus, credits: 9,   dur: "0.4s", time: "12분 전" },
  { id: "RUN-9237", name: "Slack 알림 · 결제 실패",  trig: "Stripe · webhook",  status: "failed"  as RunStatus, credits: 4,   dur: "0.3s", time: "34분 전" },
  { id: "RUN-9236", name: "Notion 데이터 정리",      trig: "Manual",            status: "success" as RunStatus, credits: 56,  dur: "2.1s", time: "1시간 전" },
  { id: "RUN-9235", name: "SEO 키워드 리서치",       trig: "Scheduled · daily", status: "success" as RunStatus, credits: 84,  dur: "4.6s", time: "2시간 전" },
];

// ── Status chip ───────────────────────────────────────────────
function StatusChip({ status }: { status: RunStatus }) {
  if (status === "success") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11.5px] font-medium ring-1 ring-emerald-100">
      <Check className="w-3 h-3" />성공
    </span>
  );
  if (status === "running") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-[11.5px] font-medium ring-1 ring-violet-100">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dot-pulse" />실행 중
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11.5px] font-medium ring-1 ring-rose-100">
      <X className="w-3 h-3" />실패
    </span>
  );
}

// ── DashHeader ────────────────────────────────────────────────
function DashHeader({ user, onLogout }: { user: User | null; onLogout(): void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const name = user?.displayName ?? user?.email ?? "사용자";
  const initial = name.slice(0, 1).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1 text-[14px]">
            {["대시보드", "워크플로우", "연동", "분석", "설정"].map((t, i) => (
              <a key={t} href="#"
                className={`px-3 py-1.5 rounded-lg font-medium transition ${i === 0 ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"}`}>
                {t}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-full bg-violet-50 ring-1 ring-violet-100 text-[12.5px] font-medium text-violet-700">
            <Zap className="w-3.5 h-3.5" /> 크레딧 <span className="font-mono-num font-bold">8,420</span>
            <span className="text-violet-400">/10,000</span>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white" />
          </button>
          <div className="relative">
            <button onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-full ring-1 ring-slate-200 hover:ring-slate-300 transition">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-[12px] font-bold flex items-center justify-center">
                {initial}
              </div>
              <span className="text-[13px] font-medium text-slate-700 hidden md:inline">{name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-11 w-56 rounded-xl bg-white ring-1 ring-slate-200 shadow-xl p-1.5 fade-up">
                {[
                  { Icon: UserIcon,   label: "프로필" },
                  { Icon: CreditCard, label: "요금제 / 크레딧" },
                  { Icon: Settings,   label: "설정" },
                ].map(({ Icon, label }) => (
                  <a key={label} href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13.5px] text-slate-700 hover:bg-slate-50">
                    <Icon className="w-4 h-4 text-slate-400" />{label}
                  </a>
                ))}
                <div className="h-px bg-slate-100 my-1" />
                <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13.5px] text-rose-600 hover:bg-rose-50">
                  <LogOut className="w-4 h-4" />로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ── HeroSection ───────────────────────────────────────────────
function HeroSection({ user }: { user: User | null }) {
  const greeting = user?.displayName ?? user?.email?.split("@")[0] ?? null;
  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-14 pb-16">
      <div className="text-center max-w-[760px] mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[12.5px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dot-pulse" /> 새 워크스페이스가 준비됐어요
        </span>
        <h1 className="font-display font-extrabold text-[40px] md:text-[52px] leading-[1.08] mt-5 tracking-tight text-slate-900">
          반복은 자동화,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">성과는 매일</span>
          <br />
          오늘도 좋은 하루 보내세요{greeting ? `, ${greeting}` : ""}.
        </h1>
        <p className="text-slate-500 text-[15.5px] mt-4 max-w-[560px] mx-auto leading-relaxed">
          Sulab은 마케팅 · CS · 운영 워크플로우를 AI로 자동화합니다.
          새 워크플로우를 만들거나, 추천 템플릿으로 30초 만에 시작해 보세요.
        </p>
        <div className="mt-7 flex items-center justify-center gap-2 flex-wrap">
          <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 transition text-white font-semibold text-[14.5px] shadow-lg shadow-violet-600/25">
            <Plus className="w-4 h-4" /> 새 워크플로우 만들기
          </button>
          <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-800 font-medium text-[14.5px] transition">
            <Sparkles className="w-4 h-4 text-violet-500" /> 템플릿 둘러보기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {FEATURES.map((f, i) => (
          <button key={f.title}
            className="group text-left bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-violet-200 hover:shadow-lg hover:shadow-violet-500/10 transition p-5 fade-up"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`w-10 h-10 rounded-xl ${TINT[f.tint]} flex items-center justify-center`}>
              <f.icon className="w-5 h-5" />
            </div>
            <div className="mt-4 font-semibold text-[15px] text-slate-900">{f.title}</div>
            <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-violet-600 opacity-0 group-hover:opacity-100 transition">
              열기 <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── WorkflowSection ───────────────────────────────────────────
function WorkflowSection() {
  const [active, setActive] = useState(1);
  return (
    <section className="relative bg-[#0B0F19] text-white overflow-hidden">
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-[120px]" />

      <div className="relative max-w-[1240px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full ring-1 ring-violet-400/40 bg-violet-500/10 text-violet-200 text-[12.5px] font-medium">
              <Activity className="w-3.5 h-3.5" /> Live workflow
            </span>
            <h2 className="font-display font-extrabold text-[34px] md:text-[42px] leading-[1.08] mt-5 tracking-tight">
              AI가 지금<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">대신 일하고 있어요.</span>
            </h2>
            <p className="text-slate-400 text-[15px] mt-4 max-w-[420px] leading-relaxed">
              현재 4개의 워크플로우가 실시간으로 실행 중입니다.
              모든 단계는 자동 모니터링되며, 실패 시 즉시 알림을 보냅니다.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-[420px]">
              {[
                { l: "실행 중",  v: "4",      c: "text-violet-300" },
                { l: "오늘 처리", v: "1,284", c: "text-fuchsia-300" },
                { l: "성공률",   v: "99.4%", c: "text-emerald-300" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2.5">
                  <div className={`font-display font-extrabold text-[20px] font-mono-num ${s.c}`}>{s.v}</div>
                  <div className="text-[11.5px] text-slate-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="neon-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-violet-500/20 ring-1 ring-violet-400/40 flex items-center justify-center">
                  <Workflow className="w-4 h-4 text-violet-200" />
                </div>
                <div>
                  <div className="font-semibold text-[14.5px]">신규 고객 응대 · v3</div>
                  <div className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
                    실행 중 · 14초 전 마지막 트리거
                  </div>
                </div>
              </div>
              <button className="text-[12px] text-slate-300 hover:text-white inline-flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> 자세히
              </button>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3 relative">
              <svg className="absolute left-0 right-0 top-1/2 -translate-y-[18px] w-full h-6 pointer-events-none"
                viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" className="flow-dash" />
              </svg>
              {NODES.map((n) => {
                const isActive = n.id === active;
                const isDone   = n.state === "done";
                const NodeIcon = isDone ? Check : n.icon;
                return (
                  <button key={n.id} onClick={() => setActive(n.id)}
                    className={`relative text-left rounded-xl p-3 ring-1 transition ${isActive ? "bg-violet-500/15 ring-violet-400/60 neon-ring" : isDone ? "bg-white/5 ring-white/10" : "bg-white/[0.03] ring-white/10 hover:bg-white/5"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-violet-500/30 text-violet-100" : isDone ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-slate-300"}`}>
                      <NodeIcon className="w-4 h-4" />
                    </div>
                    <div className="text-[12.5px] font-semibold mt-2.5">{n.title}</div>
                    <div className="text-[10.5px] text-slate-400 mt-0.5 truncate">{n.sub}</div>
                    <div className={`mt-2 inline-flex items-center gap-1 text-[10px] font-medium ${isActive ? "text-violet-200" : isDone ? "text-emerald-300" : "text-slate-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-300 dot-pulse" : isDone ? "bg-emerald-400" : "bg-slate-500"}`} />
                      {isActive ? "running" : isDone ? "done" : "queued"}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl bg-black/40 ring-1 ring-white/10 p-3.5 font-mono text-[11.5px] leading-relaxed text-slate-300">
              <div className="flex items-center justify-between text-[10.5px] text-slate-500 mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 dot-pulse" /> 실시간 로그
                </span>
                <span>{NODES[active].title}</span>
              </div>
              <div><span className="text-slate-500">12:42:18</span> <span className="text-emerald-300">✓</span> trigger.received <span className="text-slate-500">id=lead_8421</span></div>
              <div><span className="text-slate-500">12:42:19</span> <span className="text-violet-300">→</span> classify.intent <span className="text-slate-500">model=gpt-4o</span></div>
              <div><span className="text-slate-500">12:42:21</span> <span className="text-violet-300">…</span> awaiting response <span className="text-slate-500">conf=0.93</span></div>
              <div className="text-slate-500">12:42:22 _</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── RunsTable ─────────────────────────────────────────────────
function RunsTable() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const visible = filter === "all" ? RUNS : RUNS.filter((r) => r.status === filter);
  const LABELS: Record<FilterKey, string> = { all: "전체", success: "성공", running: "실행 중", failed: "실패" };

  return (
    <section className="max-w-[1240px] mx-auto px-6 py-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-display font-bold text-[24px] tracking-tight text-slate-900">최근 실행 내역</h3>
          <p className="text-slate-500 text-[14px] mt-1">최근 24시간 동안 AI가 처리한 작업입니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-lg bg-slate-100 ring-1 ring-slate-200/70">
            {(["all", "success", "running", "failed"] as FilterKey[]).map((k) => (
              <button key={k} onClick={() => setFilter(k)}
                className={`px-3 h-8 rounded-md text-[12.5px] font-medium transition ${filter === k ? "bg-white shadow-sm text-slate-900 ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}>
                {LABELS[k]}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-[13px] font-medium text-slate-700 transition">
            <Download className="w-3.5 h-3.5" /> 내보내기
          </button>
        </div>
      </div>

      <div className="mt-5 bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-slate-500 text-[12px] font-medium bg-slate-50/60 border-b border-slate-100">
                <th className="px-5 py-3 font-medium">실행 ID</th>
                <th className="px-5 py-3 font-medium">워크플로우</th>
                <th className="px-5 py-3 font-medium">트리거</th>
                <th className="px-5 py-3 font-medium">상태</th>
                <th className="px-5 py-3 font-medium text-right">크레딧</th>
                <th className="px-5 py-3 font-medium text-right">소요</th>
                <th className="px-5 py-3 font-medium">시간</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0 border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="px-5 py-3.5 font-mono text-[12.5px] text-slate-500">{r.id}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{r.name}</td>
                  <td className="px-5 py-3.5 text-slate-600">{r.trig}</td>
                  <td className="px-5 py-3.5"><StatusChip status={r.status} /></td>
                  <td className="px-5 py-3.5 text-right font-mono-num text-slate-800">{r.credits}</td>
                  <td className="px-5 py-3.5 text-right font-mono-num text-slate-600">{r.dur}</td>
                  <td className="px-5 py-3.5 text-slate-500">{r.time}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">해당 상태의 실행 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-white">
          <span className="text-[12px] text-slate-500">
            총 <span className="font-mono-num font-semibold text-slate-700">{visible.length}</span>개 실행 · 최근 24시간 기준
          </span>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 inline-flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button key={n} className={`h-7 px-2.5 inline-flex items-center justify-center rounded-md text-[12px] ${n === 1 ? "bg-slate-100 text-slate-800 font-medium" : "text-slate-500 hover:bg-slate-100"}`}>
                {n}
              </button>
            ))}
            <button className="h-7 w-7 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) { setChecking(false); return; }
    return onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/login");
      else { setUser(u); setChecking(false); }
    });
  }, [router]);

  const handleLogout = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
    router.replace("/login");
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashHeader user={user} onLogout={handleLogout} />
      <HeroSection user={user} />
      <WorkflowSection />
      <RunsTable />
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Logo size={22} />
            <span className="text-[12px] text-slate-400">© 2026 Sulab Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[12.5px] text-slate-500">
            {["상태 페이지", "변경 로그", "고객 지원"].map((t) => (
              <a key={t} href="#" className="hover:text-slate-800">{t}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
