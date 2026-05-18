"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // Redirect to dashboard on success
      router.push("/admin/autopost");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-[380px] fade-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-slate-900">관리자 로그인</h1>
          <p className="text-[14px] text-slate-500 mt-2">시스템 접근을 위해 로그인해주세요.</p>
        </div>

        <div className="bg-white ring-1 ring-slate-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-900/[0.03]">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 ring-1 ring-red-100 flex items-start gap-2.5 text-red-700 text-[13px] mb-6">
                <AlertCircle className="w-4 h-4 shrink-0 mt-[1.5px]" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">관리자 아이디</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">비밀번호</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-[14px] transition shadow-md shadow-violet-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  로그인 중...
                </>
              ) : (
                <>
                  로그인 <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* TODO: Future OAuth Integration
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-white ring-1 ring-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-[13.5px] transition">
               Google 계정으로 로그인
            </button>
          </div> 
          */}
        </div>
      </div>
    </div>
  );
}
