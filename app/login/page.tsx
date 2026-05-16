"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithPopup,
} from "firebase/auth";
import {
  Globe, LifeBuoy, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2,
} from "lucide-react";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { Logo } from "@/components/logo";

declare global {
  interface Window {
    Kakao: {
      init(key: string): void;
      isInitialized(): boolean;
      Auth: {
        login(opts: { success(o: { access_token: string }): void; fail?(e: unknown): void }): void;
        logout(cb?: () => void): void;
      };
    };
  }
}

const CHIPS = ["워크플로우 자동화", "고객 응대 AI", "리포트 생성", "Slack · Notion 연동"];
const METRICS = [
  { v: "15K+", l: "팀이 사용 중" },
  { v: "550K+", l: "작업 자동화" },
  { v: "99.98%", l: "가동률" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState<"email" | "google" | "kakao" | null>(null);
  const [kakaoReady, setKakaoReady] = useState(false);
  const [err, setErr] = useState("");

  /* redirect if already logged in */
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      if (u) router.replace("/dashboard");
    });
  }, [router]);

  /* load Kakao SDK */
  useEffect(() => {
    if (document.querySelector('script[src*="kakao_js_sdk"]')) {
      initKakao(); return;
    }
    const s = document.createElement("script");
    s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    s.onload = initKakao;
    document.head.appendChild(s);
  }, []);

  function initKakao() {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (key && window.Kakao && !window.Kakao.isInitialized()) window.Kakao.init(key);
    setKakaoReady(true);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!email.includes("@")) { setErr("이메일 형식을 확인해 주세요."); return; }
    if (pw.length < 4) { setErr("비밀번호는 4자 이상이어야 합니다."); return; }
    setLoading("email");
    // Email/password auth placeholder — enable Firebase Email auth to activate
    setTimeout(() => { setLoading(null); setErr("이메일 로그인은 준비 중입니다. 소셜 로그인을 이용해 주세요."); }, 800);
  }

  const handleGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    setLoading("google"); setErr("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch (e) {
      setErr("Google 로그인에 실패했습니다.");
    } finally { setLoading(null); }
  }, [router]);

  const handleKakao = useCallback(() => {
    if (!window.Kakao?.isInitialized()) return;
    setLoading("kakao"); setErr("");
    window.Kakao.Auth.login({
      success: async ({ access_token }) => {
        try {
          const res = await fetch("/api/auth/kakao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: access_token }),
          });
          const data = await res.json() as { customToken?: string; error?: string };
          if (!res.ok || !data.customToken) throw new Error(data.error ?? "로그인 실패");
          const auth = getFirebaseAuth();
          if (!auth) throw new Error("Firebase 미설정");
          await signInWithCustomToken(auth, data.customToken);
          router.replace("/dashboard");
        } catch (e) {
          setErr(e instanceof Error ? e.message : "카카오 로그인 실패");
        } finally { setLoading(null); }
      },
      fail: () => { setErr("카카오 인증이 취소됐습니다."); setLoading(null); },
    });
  }, [router]);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900">

      {/* ── LEFT: violet hero ─────────────────────── */}
      <aside className="relative hero-violet grain text-white overflow-hidden flex flex-col p-10 lg:p-14 min-h-[420px]">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-violet-300/30 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <Logo light />
          <span className="hidden lg:inline-flex items-center gap-1.5 text-sm text-white/80">
            <Globe className="w-4 h-4" /> 한국어
          </span>
        </div>

        <div className="relative z-10 mt-auto pt-16 max-w-[520px]">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[12px] font-medium tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse" />
            AI Automation Platform
          </span>
          <h1 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] mt-6">
            AI로 더 쉽게 성장하는<br />
            <span className="text-white/90">비즈니스</span>
          </h1>
          <p className="mt-5 text-white/80 text-[15px] leading-relaxed max-w-[440px]">
            반복 업무는 자동화하고, 의사결정은 더 빠르게.
            워크플로우 AI가 마케팅 · CS · 운영을 24시간 대신합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 max-w-[460px]">
            {CHIPS.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-[12.5px] text-white/90 ring-1 ring-white/10">
                <span className="w-1 h-1 rounded-full bg-white/90" />{t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-3 gap-6 max-w-[520px] pt-8 border-t border-white/15">
          {METRICS.map((m) => (
            <div key={m.l}>
              <div className="font-display font-extrabold text-2xl font-mono-num">{m.v}</div>
              <div className="text-white/70 text-[12.5px] mt-1">{m.l}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── RIGHT: login form ─────────────────────── */}
      <section className="relative bg-white flex flex-col">
        <div className="flex items-center justify-end px-8 lg:px-12 pt-8">
          <button className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition">
            <LifeBuoy className="w-4 h-4" /> 도움말
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
          <div className="w-full max-w-[420px]">
            <div className="text-center">
              <div className="inline-flex"><Logo size={32} /></div>
              <h2 className="font-display font-bold text-[28px] mt-6 tracking-tight text-slate-900">
                다시 오신 것을 환영합니다
              </h2>
              <p className="text-slate-500 text-[14px] mt-1.5">일주일 완전 무료 체험 · 카드 등록 불필요</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="mt-9 space-y-3.5">
              <label className="block">
                <span className="block text-[12.5px] font-medium text-slate-700 mb-1.5">이메일</span>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] text-slate-900 placeholder-slate-400 focus-violet transition"
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12.5px] font-medium text-slate-700">비밀번호</span>
                  <a href="#" className="text-[12.5px] text-violet-600 hover:text-violet-700 font-medium">비밀번호를 잊으셨나요?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 h-12 rounded-xl border border-slate-200 bg-white text-[14.5px] text-slate-900 placeholder-slate-400 focus-violet transition"
                  />
                  <button type="button" onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </label>

              {err && (
                <div className="flex items-center gap-2 text-[13px] text-rose-600 bg-rose-50 ring-1 ring-rose-100 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {err}
                </div>
              )}

              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-[13px] text-slate-600">로그인 상태 유지</span>
              </label>

              <button type="submit" disabled={loading !== null}
                className="relative w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[15px] transition shadow-lg shadow-violet-600/25 disabled:opacity-70 overflow-hidden">
                {loading === "email" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> 로그인 중…
                  </span>
                ) : "로그인"}
                {loading === "email" && <span className="absolute inset-0 shimmer pointer-events-none" />}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[12px] text-slate-400">또는 다음으로 계속</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Google */}
              <button onClick={handleGoogle} disabled={loading !== null}
                className="h-11 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md hover:ring-slate-300 transition flex items-center justify-center gap-2 text-[14px] font-medium text-slate-800 disabled:opacity-60">
                {loading === "google" ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
                    <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.4 34.7 26.8 35.7 24 35.7c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z" />
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.5C40.9 36.4 44 30.7 44 24c0-1.2-.1-2.3-.4-3.5z" />
                  </svg>
                )}
                Google
              </button>

              {/* Kakao */}
              <button onClick={handleKakao} disabled={loading !== null || !kakaoReady}
                className="h-11 rounded-xl bg-[#FEE500] hover:brightness-95 transition flex items-center justify-center gap-2 text-[14px] font-semibold text-[#191600] disabled:opacity-60">
                {loading === "kakao" ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="#191600">
                    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.86 5.31 4.66 6.77L5.4 21.5c-.1.34.28.62.58.43l4.5-2.96c.5.05 1 .08 1.52.08 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
                  </svg>
                )}
                Kakao
              </button>
            </div>

            <p className="text-center text-[13.5px] text-slate-500 mt-8">
              계정이 없으신가요?{" "}
              <a href="#" className="text-violet-600 hover:text-violet-700 font-semibold">회원 가입</a>
            </p>
          </div>
        </div>

        <footer className="px-8 lg:px-12 py-6 text-center text-[12px] text-slate-400">
          이용약관 · 개인정보처리방침 · © 2026
        </footer>
      </section>
    </div>
  );
}
