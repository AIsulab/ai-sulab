/* global React, lucide */
// Shared top navigator for sulab pages (landing / signup / admin)
// Props:
//   active: one of "home" | "features" | "integrations" | "pricing" | "cases" | "faq" | "signup" | "admin"
//   variant: "light" (default, on white) | "dark" (on dark background)
const { useState: __navUseState, useEffect: __navUseEffect, useRef: __navUseRef } = React;

function __NavIcon({ name, className = "w-4 h-4", strokeWidth = 1.75 }) {
  const ref = __navUseRef(null);
  __navUseEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const key = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
      const svg = window.lucide.createElement(window.lucide.icons[key] || window.lucide.icons.Circle);
      svg.setAttribute("class", className);
      svg.setAttribute("stroke-width", strokeWidth);
      ref.current.appendChild(svg);
    }
  }, [name, className, strokeWidth]);
  return <span ref={ref} className="inline-flex" />;
}

function NavLogo({ size = 26 }) {
  return (
    <img src="assets/sulab-logo.png" alt="sulab" style={{ height: size + "px", width: "auto" }} className="block select-none" draggable="false"/>
  );
}

function SulabNav({ active = "home" }) {
  const [open, setOpen] = __navUseState(false);
  const links = [
    ["기능",       "Sulab Landing.html#features",      "features"],
    ["연동",       "Sulab Landing.html#integrations",  "integrations"],
    ["포트폴리오", "Sulab Portfolio.html",             "portfolio"],
    ["요금제",     "Sulab Landing.html#pricing",       "pricing"],
    ["고객사례",   "Sulab Landing.html#cases",         "cases"],
    ["FAQ",        "Sulab Landing.html#faq",           "faq"],
  ];
  const isActive = (k) => k === active;

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="max-w-[1180px] mx-auto bg-white/85 backdrop-blur-xl ring-1 ring-slate-200/70 rounded-2xl shadow-sm shadow-slate-900/[0.03]">
        <div className="h-14 px-4 lg:px-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-8 min-w-0">
            <a href="Sulab Landing.html" className="shrink-0"><NavLogo/></a>
            <nav className="hidden lg:flex items-center gap-1 text-[13.5px]">
              {links.map(([t, h, k]) => (
                <a key={t} href={h}
                   className={`px-3 py-1.5 rounded-lg transition font-medium ${
                     isActive(k)
                       ? "text-violet-700 bg-violet-50"
                       : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                   }`}>{t}</a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* admin button — visually distinct */}
            <a href="Sulab Admin.html"
               className={`hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12.5px] font-semibold transition ring-1
                 ${isActive("admin")
                    ? "bg-slate-900 text-white ring-slate-900"
                    : "bg-white text-slate-700 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50"}`}>
              <__NavIcon name="shield-check" className="w-3.5 h-3.5"/>
              관리자
            </a>
            <a href="Sulab Signup.html#login"
               className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-[13.5px] font-medium text-slate-700 hover:bg-slate-100 transition">
              로그인
            </a>
            <a href="Sulab Signup.html"
               className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13.5px] font-semibold transition shadow-sm
                 ${isActive("signup")
                    ? "bg-violet-700 text-white shadow-violet-600/30"
                    : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/25"}`}>
              무료로 시작하기 <__NavIcon name="arrow-right" className="w-3.5 h-3.5"/>
            </a>
            <button onClick={() => setOpen(o => !o)}
                    className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">
              <__NavIcon name={open ? "x" : "menu"} className="w-5 h-5"/>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-slate-200/70 p-2 grid">
            {links.map(([t, h, k]) => (
              <a key={t} href={h}
                 className={`px-3 py-2.5 rounded-lg text-[14px] font-medium ${
                   isActive(k) ? "text-violet-700 bg-violet-50" : "text-slate-700 hover:bg-slate-100"
                 }`}>{t}</a>
            ))}
            <div className="h-px bg-slate-100 my-1"></div>
            <a href="Sulab Admin.html"
               className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-800 hover:bg-slate-100 inline-flex items-center gap-2">
              <__NavIcon name="shield-check" className="w-4 h-4"/> 관리자 페이지
            </a>
            <a href="Sulab Signup.html#login"
               className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100">
              로그인
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

// expose globally so each page's babel script can use them
Object.assign(window, { SulabNav, NavLogo });
