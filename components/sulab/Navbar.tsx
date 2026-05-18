"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

export type NavActive =
  | "home"
  | "features"
  | "integrations"
  | "portfolio"
  | "pricing"
  | "cases"
  | "faq"
  | "signup"
  | "login"
  | "admin";

const LINKS: [string, string, NavActive][] = [
  ["기능", "/#features", "features"],
  ["연동", "/#integrations", "integrations"],
  ["포트폴리오", "/portfolio", "portfolio"],
  ["요금제", "/#pricing", "pricing"],
  ["고객사례", "/#cases", "cases"],
  ["FAQ", "/#faq", "faq"],
];

export default function Navbar({ active = "home" }: { active?: NavActive }) {
  const [open, setOpen] = useState(false);
  const isActive = (k: NavActive) => k === active;

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="max-w-[1180px] mx-auto bg-white/85 backdrop-blur-xl ring-1 ring-slate-200/70 rounded-2xl shadow-sm shadow-slate-900/[0.03]">
        <NavTop open={open} setOpen={setOpen} isActive={isActive} active={active} />
        {open && <NavMobile setOpen={setOpen} isActive={isActive} />}
      </div>
    </header>
  );
}

function NavMobile({
  setOpen,
  isActive,
}: {
  setOpen: (v: boolean) => void;
  isActive: (k: NavActive) => boolean;
}) {
  return (
    <div className="lg:hidden border-t border-slate-200/70 p-2 grid">
      {LINKS.map(([t, h, k]) => (
        <Link
          key={t}
          href={h}
          className={`px-3 py-2.5 rounded-lg text-[14px] font-medium ${
            isActive(k) ? "text-violet-700 bg-violet-50" : "text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => setOpen(false)}
        >
          {t}
        </Link>
      ))}
      <div className="h-px bg-slate-100 my-1" />
      <Link
        href="/admin"
        className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-800 hover:bg-slate-100 inline-flex items-center gap-2"
        onClick={() => setOpen(false)}
      >
        <ShieldCheck className="w-4 h-4" /> 관리자 페이지
      </Link>
        <Link
          href="/signup"
          className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen(false)}
        >
          회원가입
        </Link>
        <Link
          href="/login"
          className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen(false)}
        >
          로그인
        </Link>
    </div>
  );
}

function NavTop({
  open,
  setOpen,
  isActive,
  active,
}: {
  open: boolean;
  setOpen: (v: boolean | ((o: boolean) => boolean)) => void;
  isActive: (k: NavActive) => boolean;
  active: NavActive;
}) {
  return (
    <div className="h-14 px-4 lg:px-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-8 min-w-0">
        <Link href="/" className="shrink-0">
          <Logo size={26} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-[13.5px]">
          {LINKS.map(([t, h, k]) => (
            <Link
              key={t}
              href={h}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                isActive(k)
                  ? "text-violet-700 bg-violet-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              {t}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Link
          href="/admin"
          className={`hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12.5px] font-semibold transition ring-1
            ${
              isActive("admin")
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-700 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50"
            }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          관리자
        </Link>
        {active !== "login" && active !== "signup" && (
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-[13.5px] font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            로그아웃
          </button>
        )}
        {(active === "login" || active === "signup") && (
          <Link
            href={active === "login" ? "/signup" : "/login"}
            className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-[13.5px] font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            {active === "login" ? "회원가입" : "로그인"}
          </Link>
        )}
        <Link
          href="/signup"
          className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13.5px] font-semibold transition shadow-sm
            ${
              isActive("signup")
                ? "bg-violet-700 text-white shadow-violet-600/30"
                : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/25"
            }`}
        >
          무료로 시작하기 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="메뉴"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
