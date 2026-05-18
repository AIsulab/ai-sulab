"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Logo } from "@/components/logo";
import {
  ArrowRight, Play, Check, Clock, Users, Layers, AlertTriangle,
  Home, Plug, LineChart, GitBranch, Zap, Brain, Send, Lock,
  Sparkles, TrendingUp, Calendar, Database, Wand2, Bell,
  Quote, Plus, ExternalLink,
  Menu, X, Workflow,
} from "lucide-react";

/* ── ProductPreview ──────────────────────────────────────── */
function ProductPreview() {
  return (
    <div className="relative mt-16 max-w-[1080px] mx-auto fade-up" style={{ animationDelay: "260ms" }}>
      <div className="absolute -inset-x-8 -inset-y-6 bg-gradient-to-b from-violet-200/40 to-transparent blur-2xl -z-10 rounded-[40px]" />
      <div className="rounded-2xl bg-slate-900 p-1.5 shadow-2xl shadow-violet-600/20 ring-1 ring-slate-900/10">
        <div className="rounded-xl bg-white overflow-hidden">
          {/* window chrome */}
          <div className="h-9 flex items-center gap-1.5 px-3 bg-slate-50 border-b border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="mx-auto h-5 px-3 rounded-md bg-white ring-1 ring-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> app.yourteam.ai/workflows/new-customer
            </div>
          </div>
          {/* fake app */}
          <div className="grid md:grid-cols-[200px_1fr] min-h-[320px] md:min-h-[440px]">
            {/* sidebar — hidden on mobile */}
            <aside className="hidden md:block border-r border-slate-200 p-3 bg-slate-50/40">
              <div className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold px-2 mb-2">Workspace</div>
              {[
                { n: "홈", Icon: Home },
                { n: "워크플로우", Icon: Workflow, active: true },
                { n: "연동", Icon: Plug },
                { n: "인사이트", Icon: LineChart },
                { n: "팀", Icon: Users },
              ].map(it => (
                <div key={it.n} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] mb-0.5 ${it.active ? "bg-violet-100 text-violet-700 font-semibold" : "text-slate-600"}`}>
                  <it.Icon className="w-3.5 h-3.5" /> {it.n}
                </div>
              ))}
              <div className="mt-4 rounded-lg bg-white ring-1 ring-slate-200 p-2.5">
                <div className="text-[10.5px] text-slate-500">크레딧</div>
                <div className="text-[14px] font-bold font-mono-num">8,420 <span className="text-slate-400 font-normal text-[11px]">/ 10,000</span></div>
                <div className="mt-1.5 h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[84%] bg-violet-600" />
                </div>
              </div>
            </aside>
            {/* canvas */}
            <div className="p-4 md:p-5 grid-bg relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] text-slate-500 mb-1">워크플로우 · 편집 중</div>
                  <div className="font-semibold text-[13px] md:text-[15px]">신규 고객 응대 v3</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-medium ring-1 ring-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse" />저장됨
                  </span>
                  <button className="h-7 px-2.5 rounded-md bg-violet-600 text-white text-[11.5px] font-semibold">실행</button>
                </div>
              </div>
              <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 relative">
                <svg className="absolute left-0 right-0 top-1/2 -translate-y-[18px] w-full h-6 pointer-events-none" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" className="flow-dash" />
                </svg>
                {[
                  { t: "트리거", s: "Webhook · IG", Icon: Zap, c: "violet" },
                  { t: "AI 분류", s: "GPT-4o", Icon: Brain, c: "fuchsia", running: true },
                  { t: "분기", s: "조건 라우팅", Icon: GitBranch, c: "slate" },
                  { t: "응대", s: "Slack · 이메일", Icon: Send, c: "slate" },
                ].map((n, i) => (
                  <div key={i} className={`relative rounded-xl p-2.5 ring-1 bg-white ${n.running ? "ring-violet-400 shadow-md shadow-violet-500/20" : "ring-slate-200"}`}>
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${n.c === "violet" ? "bg-violet-100 text-violet-700" : n.c === "fuchsia" ? "bg-fuchsia-100 text-fuchsia-700" : "bg-slate-100 text-slate-600"}`}>
                      <n.Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11.5px] font-semibold mt-2">{n.t}</div>
                    <div className="text-[10px] text-slate-500 truncate">{n.s}</div>
                  </div>
                ))}
              </div>
              {/* mini insight cards */}
              <div className="mt-4 md:mt-5 grid grid-cols-3 gap-2 md:gap-2.5">
                {[
                  { l: "오늘 처리", v: "1,284" },
                  { l: "성공률", v: "99.4%" },
                  { l: "절감 시간", v: "4h 12m" },
                ].map(s => (
                  <div key={s.l} className="rounded-lg bg-white ring-1 ring-slate-200 p-2.5">
                    <div className="text-[10px] text-slate-500">{s.l}</div>
                    <div className="text-[15px] font-bold font-mono-num">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div className="hidden md:flex absolute -left-6 top-24 floaty rounded-xl bg-white ring-1 ring-slate-200 shadow-lg shadow-slate-900/[0.05] px-3 py-2 items-center gap-2 text-[12px]">
        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <div className="font-semibold">댓글 응대 완료</div>
          <div className="text-slate-500 text-[10.5px]">방금 · IG · 1.2s</div>
        </div>
      </div>
      <div className="hidden md:flex absolute -right-6 top-56 floaty rounded-xl bg-white ring-1 ring-slate-200 shadow-lg shadow-slate-900/[0.05] px-3 py-2 items-center gap-2 text-[12px]" style={{ animationDelay: "1s" }}>
        <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="font-semibold">AI가 리포트 생성 중</div>
          <div className="text-slate-500 text-[10.5px]">주간 · 12 / 18 단계</div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-28 pb-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-violet-200/40 blur-[120px]" />
        <div className="absolute top-40 right-10 w-[400px] h-[400px] rounded-full bg-fuchsia-200/40 blur-[100px]" />
      </div>
      <div className="max-w-[1180px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white ring-1 ring-violet-200 shadow-sm shadow-violet-500/10 text-[12.5px] font-medium text-violet-700 fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dot-pulse" />
          v3.2 출시 · 워크플로우 빌더 베타 오픈
        </div>
        <h1 className="font-display font-extrabold text-[34px] sm:text-[44px] md:text-[72px] leading-[1.05] md:leading-[1.02] tracking-tight mt-6 max-w-[900px] mx-auto fade-up" style={{ animationDelay: "60ms" }}>
          반복 업무는 그만,<br />
          <span className="gradient-text">AI가 다 도와드립니다.</span>
        </h1>
        <p className="text-slate-600 text-[15px] md:text-[18px] mt-5 md:mt-6 max-w-[640px] mx-auto leading-relaxed fade-up" style={{ animationDelay: "120ms" }}>
          마케팅 · CS · 운영 워크플로우를 자동화해 매일 4시간을 돌려드립니다.<br className="hidden sm:block" />
          연동만 하면, AI가 24시간 대신 일합니다.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap fade-up" style={{ animationDelay: "180ms" }}>
          <Link href="/login" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25">
            7일 무료로 시작하기 <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#features" className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-800 font-medium text-[15px] transition">
            <Play className="w-4 h-4 text-violet-600" /> 데모 영상 보기 · 90초
          </a>
        </div>
        <div className="mt-5 flex items-center justify-center gap-4 text-[12.5px] text-slate-500 fade-up" style={{ animationDelay: "220ms" }}>
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600" />카드 등록 불필요</span>
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600" />5분 안에 첫 자동화</span>
          <span className="hidden sm:inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600" />한글 완벽 지원</span>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}

/* ── LogoStrip ───────────────────────────────────────────── */
function LogoStrip() {
  const items = ["Toss", "NAVER", "Kakao", "Coupang", "당근", "LINE", "배민", "Riot"];
  return (
    <section className="border-y border-slate-100 bg-slate-50/60">
      <div className="max-w-[1180px] mx-auto px-6 py-7 md:py-8">
        <p className="text-center text-[12px] text-slate-400 font-medium mb-5 md:mb-0 md:hidden">15,000+ 팀이 신뢰합니다</p>
        <div className="flex items-center md:justify-between flex-wrap justify-center gap-x-7 gap-y-3 md:gap-x-0 md:gap-y-0">
          <span className="hidden md:inline text-[12px] text-slate-500 font-medium shrink-0">15,000+ 팀이 신뢰합니다</span>
          <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-10 flex-wrap">
            {items.map(n => (
              <span key={n} className="font-display font-bold text-slate-400 text-[15px] md:text-[16px] tracking-tight opacity-80 hover:opacity-100 transition cursor-default">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Problem ─────────────────────────────────────────────── */
function Problem() {
  const pains = [
    { Icon: Clock, t: "끝없는 반복 작업", d: "댓글 응대, 리드 분류, 리포트 정리… 매일 같은 일을 반복합니다." },
    { Icon: Users, t: "부족한 인력", d: "채용은 어렵고, 외주는 비쌉니다. 누군가는 이 일을 해야 하는데요." },
    { Icon: Layers, t: "흩어진 데이터", d: "Notion, Slack, GA, CRM. 한 곳에서 보기가 너무 어렵습니다." },
    { Icon: AlertTriangle, t: "느린 의사결정", d: "리포트가 나오는 데 며칠. 그동안 기회는 지나갑니다." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full bg-rose-50 ring-1 ring-rose-100 text-rose-700 text-[12.5px] font-medium">현실</span>
          <h2 className="font-display font-extrabold text-[34px] md:text-[42px] leading-[1.1] mt-4 tracking-tight">
            마케팅이 본업보다 힘들지 않나요?
          </h2>
          <p className="text-slate-500 text-[15px] mt-3">팀이 작아도, 큰 팀처럼 일할 수 있어야 합니다.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((p, i) => (
            <div key={p.t} className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 hover:shadow-lg hover:shadow-slate-900/[0.04] transition fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <p.Icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-[15px] mt-4">{p.t}</div>
              <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        {/* CTA card */}
        <div className="mt-10 relative overflow-hidden rounded-2xl hero-violet grain text-white px-6 md:px-10 py-7 md:py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="relative z-10">
            <div className="text-[12.5px] font-medium opacity-80">한 번에 해결</div>
            <div className="font-display font-bold text-[20px] md:text-[24px] mt-1">AI 자동화를 5분만 써 보세요.</div>
          </div>
          <Link href="/login" className="relative z-10 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-violet-700 font-semibold text-[14px] hover:bg-violet-50 transition">
            지금 무료로 시작 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Feature mock visuals ────────────────────────────────── */
function MockComments() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-violet-200/30 blur-2xl -z-10 rounded-3xl" />
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-900/[0.05] p-4 space-y-3">
        {[
          { u: "@minji.lee", c: "이 제품 사이즈 어떻게 되나요?", ai: "안녕하세요 민지님! S/M/L 사이즈로 출시되며, 자세한 사이즈표는 상품 페이지에서 확인하실 수 있어요. 😊" },
          { u: "@jay_run", c: "배송 며칠 걸려요?", ai: "평일 오후 2시 이전 주문은 당일 출고되며, 보통 1~2일 내에 도착합니다!" },
        ].map((m, i) => (
          <div key={i} className="rounded-xl bg-slate-50 ring-1 ring-slate-100 p-3">
            <div className="flex items-center gap-2 text-[12px] text-slate-500">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-300 to-violet-400" />
              <span className="font-medium text-slate-700">{m.u}</span>
              <span>· 2분 전</span>
            </div>
            <div className="text-[13.5px] mt-1.5 text-slate-800">{m.c}</div>
            <div className="mt-2.5 rounded-lg bg-white ring-1 ring-violet-100 p-2.5 flex items-start gap-2">
              <div className="w-6 h-6 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] text-violet-700 font-semibold mb-0.5">AI · 응답 제안</div>
                <div className="text-[13px] text-slate-700 leading-relaxed">{m.ai}</div>
                <div className="mt-2 flex gap-1.5">
                  <button className="h-6 px-2 rounded-md bg-violet-600 text-white text-[11px] font-medium">전송</button>
                  <button className="h-6 px-2 rounded-md bg-white ring-1 ring-slate-200 text-slate-600 text-[11px]">수정</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockChart() {
  const points = [40, 55, 48, 70, 62, 88, 95, 110, 102, 130, 124, 148];
  const max = 160, w = 380, h = 180, pad = 16;
  const step = (w - pad * 2) / (points.length - 1);
  const pathD = points.map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * step} ${h - pad - (v / max) * (h - pad * 2)}`).join(" ");
  const areaD = pathD + ` L ${pad + (points.length - 1) * step} ${h - pad} L ${pad} ${h - pad} Z`;
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-fuchsia-200/30 blur-2xl -z-10 rounded-3xl" />
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-900/[0.05] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11.5px] text-slate-500">노출 대비 전환율</div>
            <div className="font-bold text-[20px] font-mono-num mt-0.5">
              +38.4%
              <span className="text-emerald-600 text-[12px] font-semibold ml-2 inline-flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />지난주 대비
              </span>
            </div>
          </div>
          <div className="inline-flex p-0.5 rounded-md bg-slate-100 text-[11px]">
            {["7D", "30D", "90D"].map((t, i) => (
              <span key={t} className={`px-2 py-1 rounded ${i === 1 ? "bg-white shadow-sm font-semibold text-slate-800" : "text-slate-500"}`}>{t}</span>
            ))}
          </div>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-4">
          <defs>
            <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1={pad} x2={w - pad} y1={pad + i * ((h - pad * 2) / 3)} y2={pad + i * ((h - pad * 2) / 3)} stroke="#F1F5F9" />
          ))}
          <path d={areaD} fill="url(#ga)" />
          <path d={pathD} fill="none" stroke="#7C3AED" strokeWidth="2.5" />
          {points.map((v, i) => i === points.length - 1 && (
            <circle key={i} cx={pad + i * step} cy={h - pad - (v / max) * (h - pad * 2)} r="4" fill="#7C3AED" stroke="white" strokeWidth="2" />
          ))}
        </svg>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          {[{ l: "노출", v: "482K" }, { l: "클릭", v: "38K" }, { l: "전환", v: "4.2K" }].map(s => (
            <div key={s.l} className="rounded-lg bg-slate-50 px-2 py-2">
              <div className="text-[10.5px] text-slate-500">{s.l}</div>
              <div className="text-[13px] font-bold font-mono-num">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockWorkflow() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-violet-200/30 blur-2xl -z-10 rounded-3xl" />
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-900/[0.05] p-5 grid-bg">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[14px]">예약 발행 워크플로우</div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-medium ring-1 ring-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse" />활성
          </span>
        </div>
        <div className="mt-5 space-y-2.5 relative">
          <svg className="absolute left-[18px] top-3 bottom-3 w-[2px]" preserveAspectRatio="none" viewBox="0 0 2 200" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="200" stroke="rgba(124,58,237,0.4)" strokeWidth="2" className="flow-dash" />
          </svg>
          {[
            { t: "매일 09:00에 시작", Icon: Calendar, c: "violet" },
            { t: "DB에서 콘텐츠 가져오기", Icon: Database, c: "slate" },
            { t: "AI 카피라이팅", Icon: Wand2, c: "fuchsia" },
            { t: "Instagram + Threads 발행", Icon: Send, c: "slate" },
          ].map((s, i) => (
            <div key={i} className="relative pl-12">
              <div className={`absolute left-2 top-1 w-9 h-9 rounded-lg flex items-center justify-center ring-1 ring-white shadow-sm ${s.c === "violet" ? "bg-violet-100 text-violet-700" : s.c === "fuchsia" ? "bg-fuchsia-100 text-fuchsia-700" : "bg-slate-100 text-slate-600"}`}>
                <s.Icon className="w-4 h-4" />
              </div>
              <div className="rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2.5">
                <div className="text-[13px] font-semibold text-slate-800">{s.t}</div>
                <div className="text-[11px] text-slate-500">단계 {i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockPhone() {
  return (
    <div className="relative flex justify-center">
      <div className="absolute -inset-6 bg-violet-200/30 blur-2xl -z-10 rounded-3xl" />
      <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] rounded-[36px] sm:rounded-[44px] bg-slate-900 p-2 sm:p-2.5 shadow-2xl shadow-slate-900/30">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[36px] bg-white overflow-hidden">
          <div className="h-12" />
          <div className="px-4">
            <div className="text-[10.5px] text-slate-500">오늘</div>
            <div className="font-display font-bold text-[20px] tracking-tight">안녕하세요, 수정님</div>
          </div>
          <div className="px-4 mt-4 grid grid-cols-2 gap-2">
            {[
              { l: "새 응대", v: "12", c: "bg-violet-50 text-violet-700" },
              { l: "검토 대기", v: "3", c: "bg-amber-50 text-amber-700" },
              { l: "오늘 발행", v: "8", c: "bg-emerald-50 text-emerald-700" },
              { l: "성공률", v: "99%", c: "bg-fuchsia-50 text-fuchsia-700" },
            ].map(s => (
              <div key={s.l} className={`rounded-xl px-3 py-2.5 ${s.c}`}>
                <div className="text-[10.5px] opacity-75">{s.l}</div>
                <div className="text-[18px] font-extrabold font-mono-num">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="px-4 mt-3 space-y-2">
            {[
              { n: "댓글 응대", s: "방금 · 자동 전송됨", c: "emerald" },
              { n: "주간 리포트", s: "오전 9:00 · 슬랙 발송됨", c: "violet" },
              { n: "검토 요청", s: "브랜드 톤 확인 필요", c: "amber" },
            ].map(t => (
              <div key={t.n} className="rounded-xl bg-slate-50 ring-1 ring-slate-100 p-2.5 flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.c === "emerald" ? "bg-emerald-100 text-emerald-700" : t.c === "violet" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"}`}>
                  {t.c === "amber" ? <Bell className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="text-[12px] font-semibold">{t.n}</div>
                  <div className="text-[10.5px] text-slate-500">{t.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-slate-900/30" />
        </div>
      </div>
    </div>
  );
}

/* ── FeatureBlocks ───────────────────────────────────────── */
function FeatureRow({ tag, title, desc, bullets, visual, reverse = false }: {
  tag: string; title: React.ReactNode; desc: string;
  bullets: string[]; visual: React.ReactNode; reverse?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mt-16 md:mt-20">
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="inline-flex px-3 py-1 rounded-full bg-white ring-1 ring-violet-100 text-violet-700 text-[12px] font-semibold tracking-wider uppercase">{tag}</span>
        <h3 className="font-display font-extrabold text-[28px] md:text-[36px] leading-[1.1] mt-4 tracking-tight">{title}</h3>
        <p className="text-slate-600 text-[15.5px] mt-4 leading-relaxed">{desc}</p>
        <ul className="mt-5 space-y-2.5">
          {bullets.map(b => (
            <li key={b} className="flex items-start gap-2.5 text-[14px] text-slate-700">
              <span className="mt-[3px] inline-flex w-4 h-4 items-center justify-center rounded-full bg-violet-100 text-violet-700 shrink-0">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link href="/login" className="inline-flex items-center gap-1.5 mt-6 text-[13.5px] text-violet-700 hover:text-violet-800 font-semibold">
          자세히 알아보기 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}

function FeatureBlocks() {
  return (
    <section id="features" className="py-24 bg-slate-50/60">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[680px] mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[12.5px] font-medium">기능</span>
          <h2 className="font-display font-extrabold text-[34px] md:text-[44px] leading-[1.08] mt-4 tracking-tight">
            연동만 하면, <span className="gradient-text">마케팅 끝.</span>
          </h2>
          <p className="text-slate-500 text-[15px] mt-3">필요한 만큼만 켜고, 결과만 받아 보세요.</p>
        </div>
        <FeatureRow
          tag="응대 자동화"
          title={<>댓글 · DM까지 AI가 알아서 <span className="gradient-text">관리합니다.</span></>}
          desc="브랜드 톤을 학습한 AI가 24시간 댓글과 DM을 응대하고, 민감한 문의만 사람에게 알립니다."
          bullets={["브랜드 톤 학습 (5분)", "민감 키워드 자동 에스컬레이션", "Instagram · Threads · 카카오톡"]}
          visual={<MockComments />}
        />
        <FeatureRow
          reverse
          tag="실시간 인사이트"
          title={<>뭐가 잘 되고 있는지, <span className="gradient-text">AI가 분석해드립니다.</span></>}
          desc="채널, 콘텐츠, 시간대별 성과를 자동으로 측정하고, 다음 액션을 한국어로 제안합니다."
          bullets={["채널·콘텐츠 자동 비교", "주간 인사이트 리포트", "Slack으로 매주 자동 발송"]}
          visual={<MockChart />}
        />
        <FeatureRow
          tag="워크플로우 빌더"
          title={<>예약부터 발행까지, <span className="gradient-text">한 곳에서 관리.</span></>}
          desc="드래그 한 번으로 트리거 · AI 단계 · 발송 채널을 연결합니다. 코드 없이 모든 자동화를."
          bullets={["150+ 앱 연동 · Webhook", "조건부 분기 · 재시도 정책", "팀원과 함께 편집"]}
          visual={<MockWorkflow />}
        />
        <FeatureRow
          reverse
          tag="모바일"
          title={<>마케팅팀의 <span className="gradient-text">생산성을 10배로.</span></>}
          desc="이동 중에도 알림을 받고, AI 응대 결과를 검토하고, 한 번의 탭으로 승인합니다."
          bullets={["iOS · Android 네이티브", "Apple Watch 알림", "오프라인 검토 모드"]}
          visual={<MockPhone />}
        />
      </div>
    </section>
  );
}

/* ── Integrations ────────────────────────────────────────── */
function Integrations() {
  const apps = [
    { n: "Slack", c: "bg-purple-100 text-purple-700", i: "S" },
    { n: "Notion", c: "bg-slate-100 text-slate-800", i: "N" },
    { n: "Instagram", c: "bg-pink-100 text-pink-700", i: "IG" },
    { n: "Gmail", c: "bg-red-100 text-red-700", i: "G" },
    { n: "Google Analytics", c: "bg-amber-100 text-amber-700", i: "GA" },
    { n: "HubSpot", c: "bg-orange-100 text-orange-700", i: "H" },
    { n: "Stripe", c: "bg-indigo-100 text-indigo-700", i: "$" },
    { n: "Webhook", c: "bg-violet-100 text-violet-700", i: "</>" },
    { n: "Airtable", c: "bg-yellow-100 text-yellow-700", i: "A" },
    { n: "Zapier", c: "bg-orange-100 text-orange-700", i: "Z" },
    { n: "Figma", c: "bg-rose-100 text-rose-700", i: "F" },
    { n: "GitHub", c: "bg-slate-100 text-slate-800", i: "GH" },
  ];
  return (
    <section id="integrations" className="py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[12.5px] font-medium">연동</span>
            <h2 className="font-display font-extrabold text-[34px] md:text-[44px] leading-[1.08] mt-4 tracking-tight">
              이미 쓰는 도구와 <span className="gradient-text">바로 연결.</span>
            </h2>
            <p className="text-slate-600 text-[15.5px] mt-4 leading-relaxed">
              150개 이상의 앱과 네이티브 연동. Webhook과 REST API로 어떤 시스템과도 연결할 수 있습니다.
            </p>
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <Link href="/login" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[13.5px] font-semibold transition">
                전체 연동 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href="#" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg ring-1 ring-slate-200 hover:ring-slate-300 text-slate-700 text-[13.5px] font-medium transition">API 문서</a>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
            {apps.map(a => (
              <div key={a.n} className="rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-violet-200 hover:shadow-md hover:shadow-violet-500/10 transition p-3 md:p-4 flex flex-col items-center gap-1.5 md:gap-2">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${a.c} flex items-center justify-center font-display font-bold text-[11px] md:text-[12px]`}>{a.i}</div>
                <div className="text-[11px] md:text-[12px] text-slate-700 font-medium text-center leading-tight">{a.n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HighlightStrip ──────────────────────────────────────── */
function HighlightStrip() {
  return (
    <section className="bg-slate-50/60 py-16">
      <div className="max-w-[1180px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 flex-wrap justify-center">
          <span className="font-display font-extrabold text-[28px] md:text-[36px] tracking-tight">매일 4시간</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="font-display font-extrabold text-[28px] md:text-[36px] tracking-tight gradient-text">월 ₩29,000</span>
        </div>
        <p className="text-slate-500 text-[14.5px] mt-3">시간당 7,250원으로 AI팀 한 명을 채용하는 셈입니다.</p>
      </div>
    </section>
  );
}

/* ── DarkStats + Testimonials ────────────────────────────── */
function DarkStats() {
  const cases = [
    { q: "댓글 응대 시간을 90% 줄였어요. 이제 본업에 집중합니다.", n: "김지원", r: "패션 브랜드 · 마케팅 리드" },
    { q: "매주 자동 리포트가 슬랙으로 와요. 의사결정이 정말 빨라졌습니다.", n: "박서연", r: "D2C 스타트업 · CEO" },
    { q: "개발자 없이 워크플로우를 직접 만들었습니다. 코드를 모르는데도요.", n: "이도현", r: "에이전시 · AE" },
    { q: "고객 응대 품질이 일관되어서 좋아요. AI가 브랜드 톤을 잘 잡아줘요.", n: "최유진", r: "뷰티 브랜드 · 운영팀장" },
  ];
  return (
    <section id="cases" className="relative bg-[#0B0F19] text-white overflow-hidden py-24">
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="relative max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[680px] mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/80 text-[12.5px] font-medium">고객 사례</span>
          <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] md:text-[44px] leading-[1.08] mt-4 tracking-tight">
            함께한 팀들의<br /><span className="gradient-text">생산성 실화 1년.</span>
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 max-w-[760px] mx-auto">
          {[
            { v: "11억+", vFull: "1,161,009,690", l: "AI가 처리한 작업 수", g: true },
            { v: "539K+", l: "활성 사용자", g: false },
          ].map(s => (
            <div key={s.l} className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm px-4 md:px-6 py-4 md:py-5 text-center">
              <div className={`font-display font-extrabold text-[24px] sm:text-[28px] md:text-[40px] font-mono-num tracking-tight ${s.g ? "gradient-text" : ""}`}>
                <span className="sm:hidden">{s.v}</span>
                <span className="hidden sm:inline">{s.vFull ?? s.v}</span>
              </div>
              <div className="text-[11.5px] md:text-[12.5px] text-slate-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-3 md:gap-4">
          {cases.map(c => (
            <div key={c.n} className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm p-5 md:p-6 hover:bg-white/[0.06] transition">
              <Quote className="w-6 h-6 text-violet-400" />
              <p className="text-[15px] mt-3 leading-relaxed text-slate-200">&ldquo;{c.q}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
                <div>
                  <div className="text-[13px] font-semibold">{c.n}</div>
                  <div className="text-[11.5px] text-slate-400">{c.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing TABLE ───────────────────────────────────────── */
function Pricing() {
  const cols = [
    { name: "Starter", price: "₩0", desc: "개인 · 일주일 체험", btn: "무료로 시작", popular: false },
    { name: "Pro", price: "₩29,000", desc: "성장 중인 팀", btn: "Pro 시작하기", popular: true },
    { name: "Team", price: "₩89,000", desc: "전체 워크플로우 자동화", btn: "Team 시작하기", popular: false },
    { name: "Enterprise", price: "문의", desc: "대규모 · 보안 요구", btn: "문의하기", popular: false },
  ];
  const rows: { c: string; v: (string | boolean)[] }[] = [
    { c: "워크플로우 수", v: ["3", "무제한", "무제한", "무제한"] },
    { c: "AI 크레딧 / 월", v: ["1,000", "10,000", "50,000", "협의"] },
    { c: "앱 연동", v: ["기본 10개", "150+", "150+", "150+ · 커스텀"] },
    { c: "팀원", v: ["1명", "5명", "20명", "무제한"] },
    { c: "우선 응답 지원", v: [false, true, true, true] },
    { c: "SSO · SAML", v: [false, false, true, true] },
    { c: "감사 로그 · SOC2", v: [false, false, false, true] },
    { c: "전담 매니저", v: [false, false, false, true] },
  ];
  const cell = (v: string | boolean) => {
    if (v === true) return <Check className="w-4 h-4 text-violet-600 mx-auto" />;
    if (v === false) return <span className="text-slate-300">—</span>;
    return <span className="text-slate-700">{v}</span>;
  };
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[680px] mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[12.5px] font-medium">요금제</span>
          <h2 className="font-display font-extrabold text-[34px] md:text-[44px] leading-[1.08] mt-4 tracking-tight">
            충분히 못 풀리고 있다면,<br />본인도 <span className="gradient-text">팀입니다.</span>
          </h2>
          <p className="text-slate-500 text-[15px] mt-3">팀 크기에 맞춰 자유롭게 시작하세요. 언제든 변경할 수 있습니다.</p>
        </div>
        <p className="mt-4 text-center text-[12px] text-slate-400 sm:hidden">← 표를 좌우로 스크롤하세요</p>
        <div className="mt-4 md:mt-12 rounded-2xl ring-1 ring-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px] min-w-[820px]">
              <thead>
                <tr>
                  <th className="text-left p-5 align-bottom w-[28%]">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">요금제 비교</div>
                    <div className="font-display font-bold text-[16px] mt-1 text-slate-900">기능</div>
                  </th>
                  {cols.map(c => (
                    <th key={c.name} className={`p-5 align-bottom text-left ${c.popular ? "bg-violet-50/60" : ""}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{c.name}</span>
                        {c.popular && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-600 text-white">POPULAR</span>}
                      </div>
                      <div className="font-display font-extrabold text-[22px] mt-1.5 font-mono-num text-slate-900">
                        {c.price}<span className="text-[11px] text-slate-500 font-normal ml-1">/ 월</span>
                      </div>
                      <div className="text-[11.5px] text-slate-500 mt-1">{c.desc}</div>
                      <Link href="/login" className={`mt-3 inline-flex items-center justify-center w-full h-9 rounded-lg text-[12.5px] font-semibold transition ${c.popular ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-600/25" : "bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-800"}`}>
                        {c.btn}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.c} className={`border-t border-slate-100 ${i % 2 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-5 py-3.5 text-slate-700 font-medium">{r.c}</td>
                    {r.v.map((v, idx) => (
                      <td key={idx} className={`px-5 py-3.5 text-center ${cols[idx].popular ? "bg-violet-50/40" : ""}`}>{cell(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQ() {
  const items = [
    { q: "결제하면 바로 사용할 수 있나요?", a: "네. 결제 즉시 모든 기능을 이용할 수 있으며, 7일 무료 체험 기간 동안 언제든 취소할 수 있습니다." },
    { q: "AI 응답의 품질은 어느 정도인가요?", a: "GPT-4o와 자체 한국어 모델을 함께 사용합니다. 브랜드 톤을 학습시키면 사람과 구분이 어려운 수준의 응대가 가능합니다." },
    { q: "데이터는 안전하게 보관되나요?", a: "모든 데이터는 AES-256으로 암호화되며, AWS 서울 리전에 저장됩니다. SOC2 Type II 준수 (Enterprise)." },
    { q: "팀 단위로 사용할 수 있나요?", a: "Pro는 5명, Team은 20명까지 함께 사용할 수 있으며, Enterprise는 무제한 팀원을 지원합니다." },
    { q: "개발자 없이도 쓸 수 있나요?", a: "네. 워크플로우 빌더는 코드 없이 드래그앤드롭으로 동작합니다. 필요하면 Webhook과 REST API도 제공합니다." },
    { q: "환불 정책은 어떻게 되나요?", a: "7일 무료 체험 기간 종료 전 언제든 취소 가능하며, 결제 후 14일 이내에는 100% 환불 받으실 수 있습니다." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 bg-slate-50/60">
      <div className="max-w-[820px] mx-auto px-6">
        <div className="text-center">
          <span className="inline-flex px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[12.5px] font-medium">FAQ</span>
          <h2 className="font-display font-extrabold text-[34px] md:text-[42px] leading-[1.08] mt-4 tracking-tight">무엇이든 물어보세요</h2>
        </div>
        <div className="mt-10 space-y-2.5">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-[15px] text-slate-900">{it.q}</span>
                <span className={`w-7 h-7 rounded-full bg-slate-100 text-slate-500 inline-flex items-center justify-center transition-transform duration-200 ${open === i ? "rotate-45 bg-violet-100 text-violet-700" : ""}`}>
                  <Plus className="w-4 h-4" />
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[14px] text-slate-600 leading-relaxed fade-up">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FinalCTA ────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="relative bg-white py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl hero-violet grain text-white p-8 sm:p-10 md:p-16 text-center">
          <div className="absolute -top-24 -left-20 w-[400px] h-[400px] rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-[400px] h-[400px] rounded-full bg-fuchsia-300/30 blur-3xl" />
          <div className="relative z-10 max-w-[680px] mx-auto">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/15 ring-1 ring-white/20 text-white text-[12.5px] font-medium">7일 무료 체험</span>
            <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] md:text-[52px] leading-[1.05] mt-5 tracking-tight">
              마케팅, 더 이상 직접 하지 마세요.<br /><span className="text-white/85">지금 바로 시작해 보세요.</span>
            </h2>
            <p className="text-white/80 text-[15.5px] mt-5">카드 등록 없이 5분 안에 첫 자동화를 만들 수 있습니다.</p>
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <Link href="/login" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-violet-700 font-bold text-[15px] hover:bg-violet-50 transition shadow-lg shadow-black/10">
                무료로 시작하기 <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-white/10 ring-1 ring-white/25 text-white font-semibold text-[15px] hover:bg-white/15 transition">
                <Play className="w-4 h-4" /> 데모 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { t: "제품", l: ["기능", "연동", "요금제", "변경 로그", "로드맵"] },
    { t: "회사", l: ["소개", "고객 사례", "채용", "뉴스룸", "미디어 키트"] },
    { t: "자료", l: ["문서", "API", "블로그", "상태 페이지", "커뮤니티"] },
    { t: "법적 고지", l: ["이용약관", "개인정보처리방침", "쿠키 정책", "DPA", "SLA"] },
  ];
  const socials = ["Twitter", "Instagram", "YouTube", "LinkedIn", "GitHub"];
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-[1180px] mx-auto px-6 py-10 md:py-14 grid lg:grid-cols-[1.4fr_2fr] gap-8 md:gap-12">
        <div>
          <Link href="/"><Logo /></Link>
          <p className="text-[14px] text-slate-500 mt-4 max-w-[300px] leading-relaxed">
            AI로 더 쉽게 성장하는 비즈니스. 마케팅 · CS · 운영을 자동화합니다.
          </p>
          <div className="flex items-center gap-2 mt-6">
            {socials.map(s => (
              <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-lg ring-1 ring-slate-200 hover:ring-slate-300 text-slate-500 hover:text-slate-800 inline-flex items-center justify-center transition">
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {cols.map(c => (
            <div key={c.t}>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{c.t}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map(it => (
                  <li key={it}><a href="#" className="text-[13.5px] text-slate-600 hover:text-slate-900 transition">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="max-w-[1180px] mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[12px] text-slate-500">© 2026 · 서울특별시 강남구 · 사업자등록번호 000-00-00000</span>
          <span className="text-[12px] text-slate-500 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse" /> 모든 시스템 정상
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 antialiased overflow-x-hidden">
      <Navbar active="home" />
      <Hero />
      <LogoStrip />
      <Problem />
      <FeatureBlocks />
      <Integrations />
      <HighlightStrip />
      <DarkStats />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

