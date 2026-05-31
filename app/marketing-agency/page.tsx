'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { LogOut, BarChart3, MessageSquare, FileText, CreditCard, TrendingUp } from 'lucide-react';

export default function MarketingAgencyPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'orders' | 'payments' | 'reports'>('overview');
  const router = useRouter();

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SL</span>
              </div>
              <span className="font-bold text-lg">SULAB</span>
              <span className="text-cyan-600 font-semibold">.광고</span>
            </div>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {[
                { id: 'overview', label: '대시보드', icon: BarChart3 },
                { id: 'inquiries', label: '문의 관리', icon: MessageSquare },
                { id: 'orders', label: '광고 주문', icon: FileText },
                { id: 'payments', label: '결제', icon: CreditCard },
                { id: 'reports', label: '성과 리포트', icon: TrendingUp },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeTab === item.id
                      ? 'bg-cyan-50 text-cyan-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.displayName || user.email}</p>
              <p className="text-xs text-slate-500">광고주</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">대시보드</h1>
            <p className="text-slate-600 mb-8">광고 진행 현황과 성과를 한눈에 확인하세요.</p>
            
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: '진행 중인 광고', value: '3', color: 'bg-blue-50 text-blue-700' },
                { label: '이번 달 예상 비용', value: '₩450,000', color: 'bg-purple-50 text-purple-700' },
                { label: '완료된 광고', value: '12', color: 'bg-emerald-50 text-emerald-700' },
                { label: '평균 ROI', value: '3.2x', color: 'bg-orange-50 text-orange-700' },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-lg p-6 ${stat.color}`}>
                  <p className="text-sm font-medium opacity-75 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">최근 활동</h2>
              <p className="text-slate-500">아직 활동이 없습니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">문의 관리</h1>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-slate-500">문의 관리 기능이 준비 중입니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">광고 주문</h1>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-slate-500">광고 주문 관리 기능이 준비 중입니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">결제 관리</h1>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-slate-500">결제 관리 기능이 준비 중입니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">성과 리포트</h1>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-slate-500">성과 리포트 기능이 준비 중입니다.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
