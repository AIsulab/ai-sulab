"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Settings, Terminal, ShieldAlert, CheckCircle2, Clock, Check, RefreshCw, LogOut, ArrowRight } from 'lucide-react';

export default function AdminAutoPostDashboard() {
  const [mode, setMode] = useState<'auto' | 'custom'>('auto');
  const [keyword, setKeyword] = useState('');
  const [topic, setTopic] = useState('');
  const [publishNow, setPublishNow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; url?: string } | null>(null);
  
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/github-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, keyword, topic, publish_now: publishNow }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch workflow');
      }

      setMessage({ type: 'success', text: data.message, url: data.url });
      if (mode === 'custom') {
        setTopic('');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1180px] mx-auto p-4 md:p-8 py-8 md:py-12 fade-up">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-extrabold text-[28px] md:text-[32px] tracking-tight text-slate-900">블로그 자동포스팅 관리</h1>
          <p className="text-[15px] text-slate-500 mt-2">GitHub Actions 기반 블로그 자동 발행을 수동으로 실행하고 상태를 확인합니다.</p>
        </div>
        <button onClick={handleLogout} className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-white ring-1 ring-slate-200 hover:bg-slate-50 text-slate-600 text-[13px] font-medium transition shadow-sm">
          <LogOut className="w-3.5 h-3.5" /> 로그아웃
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 md:gap-8">
        {/* Main Content Area */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Dispatch Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <h2 className="font-bold text-[18px] text-slate-900">수동 워크플로우 실행</h2>
                <p className="text-[13px] text-slate-500 mt-0.5">스케줄러와 무관하게 즉시 포스팅 파이프라인을 가동합니다.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[13.5px] font-semibold text-slate-700 mb-3">포스팅 모드</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className={`relative flex items-center gap-3 p-4 rounded-xl ring-1 cursor-pointer transition ${mode === 'auto' ? 'bg-violet-50/50 ring-violet-500' : 'bg-white ring-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="mode" value="auto" checked={mode === 'auto'} onChange={() => setMode('auto')} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${mode === 'auto' ? 'border-violet-600' : 'border-slate-300'}`}>
                      {mode === 'auto' && <div className="w-2 h-2 rounded-full bg-violet-600" />}
                    </div>
                    <div>
                      <div className={`text-[14px] font-semibold ${mode === 'auto' ? 'text-violet-900' : 'text-slate-700'}`}>Auto (스케줄러 모드)</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">설정된 주제 목록에서 자동으로 선정하여 작성</div>
                    </div>
                  </label>
                  
                  <label className={`relative flex items-center gap-3 p-4 rounded-xl ring-1 cursor-pointer transition ${mode === 'custom' ? 'bg-violet-50/50 ring-violet-500' : 'bg-white ring-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="mode" value="custom" checked={mode === 'custom'} onChange={() => setMode('custom')} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${mode === 'custom' ? 'border-violet-600' : 'border-slate-300'}`}>
                      {mode === 'custom' && <div className="w-2 h-2 rounded-full bg-violet-600" />}
                    </div>
                    <div>
                      <div className={`text-[14px] font-semibold ${mode === 'custom' ? 'text-violet-900' : 'text-slate-700'}`}>Custom Topic (맞춤 주제)</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">원하는 키워드와 주제를 직접 입력하여 작성</div>
                    </div>
                  </label>
                </div>
              </div>

              {mode === 'custom' && (
                <div className="p-5 rounded-xl bg-slate-50 ring-1 ring-slate-200/60 space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">검색 키워드 (Keyword) <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="예: 정부지원금"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">포스팅 주제 (Topic) <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="예: 2026 청년 도약 계좌 신청 방법"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-center justify-between p-4 rounded-xl bg-white ring-1 ring-slate-200 cursor-pointer hover:bg-slate-50 transition">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">즉시 발행 (Publish Immediately)</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">끄면 &apos;임시저장(Draft)&apos; 상태로 블로그에 업로드됩니다.</div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={publishNow} onChange={(e) => setPublishNow(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 border border-slate-200 peer-checked:border-violet-600"></div>
                  </div>
                </label>
              </div>

              {message && (
                <div className={`p-4 rounded-xl flex gap-3 items-start text-[13.5px] ${message.type === 'error' ? 'bg-red-50 ring-1 ring-red-100 text-red-800' : 'bg-emerald-50 ring-1 ring-emerald-100 text-emerald-800'}`}>
                  {message.type === 'error' ? <ShieldAlert className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  <div>
                    <p className="font-medium leading-relaxed">{message.text}</p>
                    {message.url && (
                      <a href={message.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold mt-2 hover:underline">
                        GitHub Actions에서 보기 <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto md:min-w-[200px] h-11 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold rounded-xl transition shadow-md shadow-slate-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> 실행 중...
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" /> 워크플로우 실행
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar / Info Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-slate-200 shadow-sm">
            <h3 className="flex items-center gap-2 font-semibold text-[15px] text-slate-800 mb-4">
              <Settings className="w-4 h-4 text-slate-400" /> 포스팅 설정 요약
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500">타겟 플랫폼</span>
                <span className="font-semibold text-slate-700">Tistory / Blogger</span>
              </li>
              <li className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500">생성 AI 모델</span>
                <span className="font-semibold text-slate-700">GPT-4o</span>
              </li>
              <li className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500">자동 스케줄</span>
                <span className="inline-flex items-center gap-1 font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded text-[11px]">
                  <Clock className="w-3 h-3" /> 매일 오전 9시
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-slate-200 shadow-sm">
            <h3 className="font-semibold text-[15px] text-slate-800 mb-4">최근 상태</h3>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-[13px] text-slate-600 font-medium">최근 실행 내역이 없습니다.</p>
              <p className="text-[11.5px] text-slate-400 mt-1">워크플로우를 실행하면 이곳에 결과가 표시됩니다.</p>
            </div>
          </div>

          <div className="rounded-2xl p-5 md:p-6 bg-rose-50 ring-1 ring-rose-100 text-rose-900">
            <h3 className="flex items-center gap-2 font-semibold text-[14px] mb-2">
              <ShieldAlert className="w-4 h-4" /> 주의사항
            </h3>
            <p className="text-[12.5px] leading-relaxed opacity-80">
              잦은 단기 포스팅은 검색 엔진에서 스팸으로 간주될 수 있습니다. Auto 모드를 권장하며, Custom 모드는 긴급 공지나 꼭 필요한 주제에만 사용해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
