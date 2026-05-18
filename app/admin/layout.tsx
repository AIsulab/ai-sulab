import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";
// TODO: For future integration with OAuth (Google/Kakao), import auth components or hooks here.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1180px] mx-auto h-14 px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-80 transition">
              <Logo size={24} />
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-slate-200"></span>
            <span className="hidden sm:inline-flex text-[13px] font-semibold text-slate-500">관리자 센터</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-900 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> 메인으로 돌아가기
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
