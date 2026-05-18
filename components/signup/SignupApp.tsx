// @ts-nocheck
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navbar from "@/components/sulab/Navbar";
import { Icon } from "@/components/sulab/Icon";
import { Logo } from "@/components/logo";


// ============================================================
// Password strength
// ============================================================
function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const STRENGTH_LABEL = ["너무 약함","약함","보통","강함","아주 강함"];
const STRENGTH_COLOR = ["bg-rose-400","bg-rose-400","bg-amber-400","bg-violet-500","bg-emerald-500"];

// ============================================================
// SIDE (left) — value prop
// ============================================================
function SignupSide({ step }) {
  return (
    <aside className="relative hero-violet grain text-white overflow-hidden flex flex-col p-10 lg:p-14 min-h-[520px] rounded-3xl">
      <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-white/15 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-violet-300/30 blur-3xl"></div>

      <div className="relative z-10 max-w-[460px] mt-auto pt-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[12px] font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse"></span>
          7일 무료 · 카드 등록 불필요
        </span>
        <h1 className="font-display font-extrabold text-[40px] lg:text-[48px] leading-[1.05] mt-6">
          오늘 가입하고,<br/>
          <span className="text-white/90">내일부터 AI팀 합류.</span>
        </h1>
        <p className="mt-5 text-white/80 text-[15px] leading-relaxed">
          15,000+ 팀이 수랩으로 매일 4시간을 돌려받습니다.
          5분 안에 첫 자동화를 만들어 보세요.
        </p>

        {/* benefits */}
        <ul className="mt-8 space-y-3">
          {[
            "월 10,000 크레딧 7일간 전부 사용 가능",
            "150+ 앱 즉시 연동 · 코드 불필요",
            "팀원 5명까지 함께 작업",
            "한글 우선 지원 · 카카오 알림톡 연동",
          ].map(b => (
            <li key={b} className="flex items-start gap-2.5 text-[14px] text-white/90">
              <span className="mt-[3px] inline-flex w-4 h-4 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 shrink-0">
                <Icon name="check" className="w-3 h-3" strokeWidth={3}/>
              </span>{b}
            </li>
          ))}
        </ul>
      </div>

      {/* metrics */}
      <div className="relative z-10 mt-12 grid grid-cols-3 gap-4 pt-7 border-t border-white/15">
        {[
          { v: "15K+", l: "팀이 사용 중" },
          { v: "550K+", l: "작업 자동화" },
          { v: "99.98%", l: "가동률" },
        ].map(m => (
          <div key={m.l}>
            <div className="font-display font-extrabold text-[22px] font-mono-num">{m.v}</div>
            <div className="text-white/70 text-[12px] mt-0.5">{m.l}</div>
          </div>
        ))}
      </div>

      {/* step indicator (mobile only — main one is in the form) */}
      <div className="relative z-10 mt-8 lg:hidden flex items-center gap-2 text-[12px] text-white/80">
        <span>단계 {step}/3</span>
        <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
          <div className="h-full bg-white" style={{width: `${(step/3)*100}%`}}></div>
        </div>
      </div>
    </aside>
  );
}

// ============================================================
// STEP 1 — account
// ============================================================
function StepAccount({ form, set, next, err, setErr }) {
  const [showPw, setShowPw] = useState(false);
  const s = getStrength(form.pw);

  function submit(e) {
    e?.preventDefault?.();
    setErr({});
    const newErr = {};
    if (!form.name.trim()) newErr.name = "이름을 입력해 주세요.";
    if (!form.email.includes("@")) newErr.email = "이메일 형식을 확인해 주세요.";
    if (form.pw.length < 8) newErr.pw = "비밀번호는 8자 이상이어야 합니다.";
    if (!form.agree) newErr.agree = "약관 동의가 필요합니다.";
    if (Object.keys(newErr).length) { setErr(newErr); return; }
    next();
  }

  return (
    <form onSubmit={submit} className="space-y-3.5 fade-up">
      {/* social — quick start */}
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" className="h-11 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md hover:ring-slate-300 transition flex items-center justify-center gap-2 text-[14px] font-medium text-slate-800">
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.4 34.7 26.8 35.7 24 35.7c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.5C40.9 36.4 44 30.7 44 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          Google로 가입
        </button>
        <button type="button" className="h-11 rounded-xl bg-[#FEE500] hover:brightness-95 transition flex items-center justify-center gap-2 text-[14px] font-semibold text-[#191600]">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="#191600">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.86 5.31 4.66 6.77L5.4 21.5c-.1.34.28.62.58.43l4.5-2.96c.5.05 1 .08 1.52.08 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
          Kakao로 가입
        </button>
      </div>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-[12px] text-slate-400">또는 이메일로 가입</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* name */}
      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">이름</span>
        <div className="relative">
          <Icon name="user" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={form.name} onChange={e=>set("name", e.target.value)}
            placeholder="홍길동"
            className={`w-full pl-10 pr-3.5 h-12 rounded-xl border text-[14.5px] placeholder-slate-400 focus-violet transition
              ${err.name ? "border-rose-300" : "border-slate-200"}`}/>
        </div>
        {err.name && <span className="text-[12px] text-rose-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.name}</span>}
      </label>

      {/* email */}
      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">업무용 이메일</span>
        <div className="relative">
          <Icon name="mail" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="email" value={form.email} onChange={e=>set("email", e.target.value)}
            placeholder="name@company.com"
            className={`w-full pl-10 pr-3.5 h-12 rounded-xl border text-[14.5px] placeholder-slate-400 focus-violet transition
              ${err.email ? "border-rose-300" : "border-slate-200"}`}/>
        </div>
        {err.email && <span className="text-[12px] text-rose-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.email}</span>}
      </label>

      {/* password */}
      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">비밀번호</span>
        <div className="relative">
          <Icon name="lock" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type={showPw?"text":"password"} value={form.pw} onChange={e=>set("pw", e.target.value)}
            placeholder="8자 이상 · 영문 · 숫자 포함"
            className={`w-full pl-10 pr-11 h-12 rounded-xl border text-[14.5px] placeholder-slate-400 focus-violet transition
              ${err.pw ? "border-rose-300" : "border-slate-200"}`}/>
          <button type="button" onClick={()=>setShowPw(s=>!s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md">
            <Icon name={showPw ? "eye-off" : "eye"} className="w-4 h-4"/>
          </button>
        </div>

        {/* strength meter */}
        {form.pw.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition ${i < s ? STRENGTH_COLOR[s] : "bg-slate-200"}`}></div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[11.5px]">
              <span className={`font-medium ${s>=3 ? "text-emerald-600" : s>=2 ? "text-amber-600" : "text-rose-600"}`}>{STRENGTH_LABEL[s]}</span>
              <span className="text-slate-400">{form.pw.length}자</span>
            </div>
          </div>
        )}
        {err.pw && <span className="text-[12px] text-rose-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.pw}</span>}
      </label>

      {/* agree */}
      <div className="pt-1">
        <label className="flex items-start gap-2 select-none cursor-pointer">
          <input type="checkbox" checked={form.agree} onChange={e=>set("agree", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"/>
          <span className="text-[13px] text-slate-600 leading-relaxed">
            <Link href="#" className="text-slate-800 underline underline-offset-2">이용약관</Link>과
            <Link href="#" className="text-slate-800 underline underline-offset-2 ml-1">개인정보처리방침</Link>에 동의합니다.
            <span className="text-slate-400 ml-1">(필수)</span>
          </span>
        </label>
        <label className="flex items-start gap-2 select-none cursor-pointer mt-2">
          <input type="checkbox" checked={form.marketing} onChange={e=>set("marketing", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"/>
          <span className="text-[13px] text-slate-600 leading-relaxed">
            제품 업데이트와 마케팅 정보 수신에 동의합니다. <span className="text-slate-400">(선택)</span>
          </span>
        </label>
        {err.agree && <span className="text-[12px] text-rose-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.agree}</span>}
      </div>

      <button type="submit"
        className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25 inline-flex items-center justify-center gap-2">
        다음 단계 <Icon name="arrow-right" className="w-4 h-4"/>
      </button>

      <p className="text-center text-[13.5px] text-slate-500 mt-1">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-violet-600 hover:text-violet-700 font-semibold">로그인</Link>
      </p>
    </form>
  );
}

// ============================================================
// STEP 2 — workspace
// ============================================================
function StepWorkspace({ form, set, next, prev, err, setErr }) {
  const roles = ["마케터","CS · 운영","대표 · 임원","개발자","디자이너","기타"];
  const sizes = ["1명 (개인)","2–9명","10–49명","50–199명","200명 이상"];

  function submit(e) {
    e?.preventDefault?.();
    const newErr = {};
    if (!form.company.trim()) newErr.company = "회사/팀 이름을 입력해 주세요.";
    if (!form.role) newErr.role = "역할을 선택해 주세요.";
    if (!form.size) newErr.size = "팀 크기를 선택해 주세요.";
    if (Object.keys(newErr).length) { setErr(newErr); return; }
    setErr({});
    next();
  }

  return (
    <form onSubmit={submit} className="space-y-4 fade-up">
      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">회사 / 팀 이름</span>
        <div className="relative">
          <Icon name="building-2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={form.company} onChange={e=>set("company", e.target.value)}
            placeholder="수랩 주식회사"
            className={`w-full pl-10 pr-3.5 h-12 rounded-xl border text-[14.5px] placeholder-slate-400 focus-violet transition
              ${err.company ? "border-rose-300" : "border-slate-200"}`}/>
        </div>
        {err.company && <span className="text-[12px] text-rose-600 mt-1 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.company}</span>}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-3">
        {/* workspace URL */}
        <label className="block">
          <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">워크스페이스 주소</span>
          <div className={`flex items-stretch rounded-xl border overflow-hidden focus-within:shadow-[0_0_0_4px_rgba(124,58,237,0.18)] focus-within:border-violet-600 transition
            ${err.url ? "border-rose-300" : "border-slate-200"}`}>
            <input value={form.url} onChange={e=>set("url", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,""))}
              placeholder="my-team"
              className="flex-1 px-3.5 h-12 bg-white text-[14.5px] placeholder-slate-400 outline-none"/>
            <span className="inline-flex items-center px-3 bg-slate-50 text-slate-500 text-[13px] border-l border-slate-200">.sulab.ai</span>
          </div>
        </label>
        {/* country */}
        <label className="block">
          <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">국가 · 시간대</span>
          <div className="relative">
            <Icon name="globe" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <select value={form.country} onChange={e=>set("country", e.target.value)}
              className="w-full pl-10 pr-3.5 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] focus-violet transition appearance-none">
              <option value="KR">대한민국 · GMT+9</option>
              <option value="JP">일본 · GMT+9</option>
              <option value="US">미국 · GMT-5</option>
              <option value="EU">유럽 · GMT+1</option>
              <option value="SG">싱가포르 · GMT+8</option>
            </select>
            <Icon name="chevron-down" className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>
        </label>
      </div>

      {/* role */}
      <div>
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">담당 역할</span>
        <div className="grid grid-cols-3 gap-2">
          {roles.map(r => (
            <button type="button" key={r} onClick={()=>set("role", r)}
              className={`h-10 rounded-lg text-[13px] font-medium transition ring-1 px-2
                ${form.role===r ? "bg-violet-600 text-white ring-violet-600" : "bg-white text-slate-700 ring-slate-200 hover:ring-slate-300"}`}>
              {r}
            </button>
          ))}
        </div>
        {err.role && <span className="text-[12px] text-rose-600 mt-1.5 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.role}</span>}
      </div>

      {/* size */}
      <div>
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">팀 크기</span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {sizes.map(s => (
            <button type="button" key={s} onClick={()=>set("size", s)}
              className={`h-10 rounded-lg text-[12.5px] font-medium transition ring-1 px-2 text-center
                ${form.size===s ? "bg-violet-600 text-white ring-violet-600" : "bg-white text-slate-700 ring-slate-200 hover:ring-slate-300"}`}>
              {s}
            </button>
          ))}
        </div>
        {err.size && <span className="text-[12px] text-rose-600 mt-1.5 inline-flex items-center gap-1"><Icon name="alert-circle" className="w-3.5 h-3.5"/>{err.size}</span>}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button type="button" onClick={prev} className="h-12 px-5 rounded-xl bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-700 font-medium text-[14.5px] transition inline-flex items-center gap-1.5">
          <Icon name="arrow-left" className="w-4 h-4"/> 이전
        </button>
        <button type="submit" className="flex-1 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25 inline-flex items-center justify-center gap-2">
          다음 단계 <Icon name="arrow-right" className="w-4 h-4"/>
        </button>
      </div>
    </form>
  );
}

// ============================================================
// STEP 3 — goals
// ============================================================
function StepGoals({ form, set, prev, submit, loading }) {
  const goals = [
    { v:"comment", t:"댓글 · DM 응대", i:"message-square" },
    { v:"lead",    t:"리드 수집 · 분류", i:"users" },
    { v:"report",  t:"리포트 자동화",   i:"file-bar-chart" },
    { v:"social",  t:"SNS 콘텐츠 발행", i:"send" },
    { v:"cs",      t:"고객 응대 (CS)",  i:"life-buoy" },
    { v:"data",    t:"데이터 정리",      i:"database" },
  ];
  const apps = [
    {v:"instagram", t:"Instagram", c:"bg-pink-100 text-pink-700", i:"IG"},
    {v:"slack",     t:"Slack",     c:"bg-purple-100 text-purple-700", i:"S"},
    {v:"notion",    t:"Notion",    c:"bg-slate-100 text-slate-800", i:"N"},
    {v:"gmail",     t:"Gmail",     c:"bg-red-100 text-red-700", i:"G"},
    {v:"kakao",     t:"카카오톡",  c:"bg-yellow-100 text-yellow-800", i:"K"},
    {v:"hubspot",   t:"HubSpot",   c:"bg-orange-100 text-orange-700", i:"H"},
    {v:"ga",        t:"GA4",       c:"bg-amber-100 text-amber-700", i:"GA"},
    {v:"webhook",   t:"Webhook",   c:"bg-violet-100 text-violet-700", i:"</>"},
  ];

  function toggle(field, v) {
    const arr = form[field] || [];
    set(field, arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]);
  }

  return (
    <form onSubmit={(e)=>{e.preventDefault(); submit();}} className="space-y-5 fade-up">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] font-medium text-slate-700">무엇을 자동화하고 싶으세요?</span>
          <span className="text-[11.5px] text-slate-400">중복 선택 가능</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {goals.map(g => {
            const on = (form.goals||[]).includes(g.v);
            return (
              <button key={g.v} type="button" onClick={()=>toggle("goals", g.v)}
                className={`relative text-left p-3 rounded-xl ring-1 transition
                  ${on ? "bg-violet-50 ring-violet-300 shadow-sm shadow-violet-500/10" : "bg-white ring-slate-200 hover:ring-slate-300"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${on ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                  <Icon name={g.i} className="w-4 h-4"/>
                </div>
                <div className="text-[13px] font-semibold mt-2.5 text-slate-800">{g.t}</div>
                {on && <Icon name="check" className="w-4 h-4 text-violet-600 absolute top-2.5 right-2.5"/>}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] font-medium text-slate-700">이미 사용 중인 도구</span>
          <span className="text-[11.5px] text-slate-400">선택 시 자동 연동 추천</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {apps.map(a => {
            const on = (form.apps||[]).includes(a.v);
            return (
              <button key={a.v} type="button" onClick={()=>toggle("apps", a.v)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl ring-1 transition
                  ${on ? "bg-violet-50 ring-violet-300" : "bg-white ring-slate-200 hover:ring-slate-300"}`}>
                <div className={`w-9 h-9 rounded-lg ${a.c} flex items-center justify-center font-display font-bold text-[12px]`}>{a.i}</div>
                <div className="text-[11.5px] text-slate-700 font-medium">{a.t}</div>
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">초대 코드 <span className="text-slate-400 font-normal">(선택)</span></span>
        <div className="relative">
          <Icon name="ticket" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={form.invite||""} onChange={e=>set("invite", e.target.value)}
            placeholder="INVITE-XXXX"
            className="w-full pl-10 pr-3.5 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] placeholder-slate-400 focus-violet transition uppercase"/>
        </div>
      </label>

      <div className="flex items-center gap-2 pt-2">
        <button type="button" onClick={prev} className="h-12 px-5 rounded-xl bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-700 font-medium text-[14.5px] transition inline-flex items-center gap-1.5">
          <Icon name="arrow-left" className="w-4 h-4"/> 이전
        </button>
        <button type="submit" disabled={loading} className="flex-1 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25 inline-flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? (<><Icon name="loader-2" className="w-4 h-4 animate-spin"/> 계정 생성 중…</>) : (<>가입 완료 <Icon name="sparkles" className="w-4 h-4"/></>)}
        </button>
      </div>
      <p className="text-center text-[12px] text-slate-400">가입 시 <Link href="#" className="underline">이용약관</Link>과 <Link href="#" className="underline">개인정보처리방침</Link>에 동의하게 됩니다.</p>
    </form>
  );
}

// ============================================================
// SUCCESS
// ============================================================
function StepSuccess({ form }) {
  return (
    <div className="text-center fade-up py-4">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center shadow-lg shadow-violet-600/30">
        <Icon name="check" className="w-8 h-8" strokeWidth={2.5}/>
      </div>
      <h2 className="font-display font-extrabold text-[28px] mt-6 tracking-tight">환영합니다, {form.name||"고객"}님!</h2>
      <p className="text-slate-500 text-[14.5px] mt-2">
        <span className="font-semibold text-slate-700">{form.email}</span>로 인증 메일을 보냈습니다.<br/>
        메일을 확인하시면 워크스페이스가 활성화됩니다.
      </p>
      <div className="mt-7 rounded-2xl bg-violet-50 ring-1 ring-violet-100 p-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-violet-700 font-bold">워크스페이스 URL</div>
            <div className="font-mono text-[14px] text-slate-900 mt-0.5">{(form.url||"my-team")}.sulab.ai</div>
          </div>
          <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white ring-1 ring-violet-200 text-violet-700">7일 체험 중</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link href="/dashboard" className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-[14.5px] transition shadow-lg shadow-violet-600/25">
          대시보드로 이동 <Icon name="arrow-right" className="w-4 h-4"/>
        </Link>
        <Link href="/" className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-slate-700 font-medium text-[14.5px] transition">
          <Icon name="book-open" className="w-4 h-4"/> 시작 가이드 보기
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// STEPPER
// ============================================================
function Stepper({ step }) {
  const steps = [
    { i: 1, t: "계정 정보" },
    { i: 2, t: "워크스페이스" },
    { i: 3, t: "목표 설정" },
  ];
  return (
    <div className="flex items-center gap-1.5 mb-7">
      {steps.map((s, idx) => {
        const done = step > s.i;
        const active = step === s.i;
        return (
          <Fragment key={s.i}>
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition shrink-0
                ${done ? "bg-violet-600 text-white" : active ? "bg-violet-100 text-violet-700 ring-2 ring-violet-600" : "bg-slate-100 text-slate-400"}`}>
                {done ? <Icon name="check" className="w-3.5 h-3.5"/> : s.i}
              </div>
              <span className={`text-[12.5px] font-medium hidden sm:inline truncate ${active ? "text-slate-900" : done ? "text-slate-700" : "text-slate-400"}`}>{s.t}</span>
            </div>
            {idx < steps.length-1 && (
              <div className={`flex-1 h-px ${done ? "bg-violet-300" : "bg-slate-200"}`}></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ============================================================
// LOGIN FORM (auth mode: login)
// ============================================================
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const redirectParam = searchParams.get("redirect");
  const redirectTo =
    redirectParam?.startsWith("/") &&
    redirectParam !== "/login" &&
    redirectParam !== "/signup"
      ? redirectParam
      : "/";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!email.includes("@")) {
      setErr("이메일 형식을 확인해 주세요.");
      return;
    }
    if (pw.length < 4) {
      setErr("비밀번호는 4자 이상이어야 합니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: pw }),
      });

      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.status === 500) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      setErr(data.error || "아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch {
      setErr("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3.5 fade-up">
      {/* social */}
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" className="h-11 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md hover:ring-slate-300 transition flex items-center justify-center gap-2 text-[14px] font-medium text-slate-800">
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.4 34.7 26.8 35.7 24 35.7c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.5C40.9 36.4 44 30.7 44 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          Google로 로그인
        </button>
        <button type="button" className="h-11 rounded-xl bg-[#FEE500] hover:brightness-95 transition flex items-center justify-center gap-2 text-[14px] font-semibold text-[#191600]">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="#191600">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.86 5.31 4.66 6.77L5.4 21.5c-.1.34.28.62.58.43l4.5-2.96c.5.05 1 .08 1.52.08 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
          Kakao로 로그인
        </button>
      </div>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-[12px] text-slate-400">또는 이메일로 로그인</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      <label className="block">
        <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">이메일</span>
        <div className="relative">
          <Icon name="mail" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full pl-10 pr-3.5 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] placeholder-slate-400 focus-violet transition"/>
        </div>
      </label>

      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12.5px] font-medium text-slate-700">비밀번호</span>
          <Link href="#" className="text-[12.5px] text-violet-600 hover:text-violet-700 font-medium">비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="relative">
          <Icon name="lock" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-11 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] placeholder-slate-400 focus-violet transition"/>
          <button type="button" onClick={()=>setShowPw(s=>!s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md">
            <Icon name={showPw ? "eye-off" : "eye"} className="w-4 h-4"/>
          </button>
        </div>
      </label>

      {err && (
        <div className="flex items-center gap-2 text-[13px] text-rose-600 bg-rose-50 ring-1 ring-rose-100 rounded-lg px-3 py-2">
          <Icon name="alert-circle" className="w-4 h-4"/> {err}
        </div>
      )}

      <label className="flex items-center gap-2 select-none cursor-pointer">
        <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"/>
        <span className="text-[13px] text-slate-600">로그인 상태 유지</span>
      </label>

      <button type="submit" disabled={loading}
        className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25 disabled:opacity-80 inline-flex items-center justify-center gap-2">
        {loading ? (<><Icon name="loader-2" className="w-4 h-4 animate-spin"/> 로그인 중…</>) : "로그인"}
      </button>

      <p className="text-center text-[13.5px] text-slate-500 pt-2">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-violet-600 hover:text-violet-700 font-semibold">회원 가입</Link>
      </p>
    </form>
  );
}

// ============================================================
// APP
// ============================================================
function App({ initialModeProp = "signup" }: { initialModeProp?: "signup" | "login" }) {
  const [mode, setMode] = useState(initialModeProp);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});
  const [form, setForm] = useState({
    name: "", email: "", pw: "", agree: false, marketing: true,
    company: "", url: "", country: "KR", role: "", size: "",
    goals: [], apps: [], invite: "",
  });
  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  // auto-fill workspace URL from company
  useEffect(() => {
    if (!form.url && form.company) {
      set("url", form.company.toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").slice(0,24));
    }
  }, [form.company]);

  function finishSignup() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(4); }, 1000);
  }

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar active={isLogin ? "login" : "signup"}/>
      <main className="flex-1 px-3 lg:px-6 pt-6 pb-12" data-screen-label={isLogin ? "01 Login" : "01 Signup"}>
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-4 lg:gap-6 items-stretch">
          {/* Left value side */}
          <div className="hidden lg:block">
            <SignupSide step={step}/>
          </div>

          {/* Form card */}
          <section className="bg-white rounded-3xl ring-1 ring-slate-200 shadow-sm shadow-slate-900/[0.03] p-7 lg:p-10 flex flex-col">
            {/* Mode tabs */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 ring-1 ring-slate-200/70 self-start">
              <button onClick={()=>{ setMode("signup"); setStep(1); }}
                className={`px-4 h-9 rounded-lg text-[13px] font-semibold transition ${
                  !isLogin ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"
                }`}>회원가입</button>
              <button onClick={()=>setMode("login")}
                className={`px-4 h-9 rounded-lg text-[13px] font-semibold transition ${
                  isLogin ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"
                }`}>로그인</button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 ring-1 ring-violet-100 text-violet-700 text-[11.5px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dot-pulse"></span> {isLogin ? "다시 만나서 반가워요" : "7일 무료 체험"}
                </span>
                {!isLogin && step <= 3 && (
                  <span className="text-[12px] text-slate-400 font-mono-num">단계 {step}/3</span>
                )}
              </div>
              <h2 className="font-display font-extrabold text-[26px] mt-4 tracking-tight">
                {isLogin && <>수랩에 로그인</>}
                {!isLogin && step===1 && <>수랩 워크스페이스 만들기</>}
                {!isLogin && step===2 && <>팀에 대해 알려주세요</>}
                {!isLogin && step===3 && <>마지막으로, <span className="gradient-text">자동화할 항목</span>은?</>}
                {!isLogin && step===4 && <>가입이 완료됐어요</>}
              </h2>
              <p className="text-slate-500 text-[14px] mt-1.5">
                {isLogin && "계정 정보를 입력하고 워크스페이스로 이동하세요."}
                {!isLogin && step===1 && "이메일과 비밀번호로 30초 안에 시작."}
                {!isLogin && step===2 && "추천 템플릿을 더 정확하게 제공해 드릴게요."}
                {!isLogin && step===3 && "AI가 첫 워크플로우를 자동으로 추천해 드립니다."}
                {!isLogin && step===4 && "인증 메일을 확인하고 첫 자동화를 시작해 보세요."}
              </p>
            </div>

            <div className="mt-7 flex-1">
              {isLogin && <LoginForm />}
              {!isLogin && (
                <>
                  {step <= 3 && <Stepper step={step}/>}
                  {step === 1 && <StepAccount form={form} set={set} err={err} setErr={setErr} next={()=>setStep(2)}/>}
                  {step === 2 && <StepWorkspace form={form} set={set} err={err} setErr={setErr} next={()=>setStep(3)} prev={()=>setStep(1)}/>}
                  {step === 3 && <StepGoals form={form} set={set} prev={()=>setStep(2)} submit={finishSignup} loading={loading}/>}
                  {step === 4 && <StepSuccess form={form}/>}
                </>
              )}
            </div>

            {/* security note */}
            {(isLogin || step <= 3) && (
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-[12px] text-slate-500">
                <Icon name="shield-check" className="w-4 h-4 text-emerald-600"/>
                <span>AES-256 암호화 · SOC2 Type II 준수 · AWS 서울 리전</span>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}


export default function SignupPage({ initialMode = "signup" }: { initialMode?: "signup" | "login" }) {
  return <App initialModeProp={initialMode} />;
}
