import fs from "fs";
import path from "path";

const root = "c:/website";

for (const rel of [
  "components/admin/AdminApp.tsx",
  "components/portfolio/PortfolioApp.tsx",
  "components/signup/SignupApp.tsx",
]) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, "utf8");
  c = c.replace(
    /import \{  useState, useEffect, useRef, useMemo  \} from "react";\r?\n\r?\nfunction Icon\([\s\S]*?return <span ref=\{ref\} className="inline-flex" \/>;\r?\n\}\r?\n\r?\n/,
    ""
  );
  c = c.replace(/ReactDOM\.createRoot\([\s\S]*?\);\r?\n\r?\n?/g, "");
  fs.writeFileSync(file, c);
  console.log("fixed", rel);
}

// Admin: autopost sidebar + usePathname for external routes
let admin = fs.readFileSync(path.join(root, "components/admin/AdminApp.tsx"), "utf8");
if (!admin.includes("autopost")) {
  admin = admin.replace(
    `{ k:"system",      n:"시스템 상태",  i:"server" },`,
    `{ k:"autopost",    n:"블로그 자동포스팅", i:"play", href:"/admin/autopost" },\n        { k:"system",      n:"시스템 상태",  i:"server" },`
  );
  admin = admin.replace(
    'import Link from "next/link";',
    'import Link from "next/link";\nimport { usePathname } from "next/navigation";'
  );
  admin = admin.replace(
    "function AdminSidebar({ tab, setTab }) {",
    "function AdminSidebar({ tab, setTab }) {\n  const pathname = usePathname();"
  );
  admin = admin.replace(
    `            {g.items.map(it => {
              const active = tab === it.k;
              return (
                <button key={it.k} onClick={()=>setTab(it.k)}
                  className={\`group w-full flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13px] font-medium transition
                    \${active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}\`}>
                  <Icon name={it.i} className={\`w-4 h-4 \${active ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"}\`}/>
                  <span className="flex-1 text-left">{it.n}</span>
                  {it.badge && (
                    <span className={\`text-[10.5px] font-semibold px-1.5 py-0.5 rounded \${active ? "bg-white text-violet-700 ring-1 ring-violet-200" : "bg-slate-100 text-slate-600"}\`}>{it.badge}</span>
                  )}
                </button>
              );
            })}`,
    `            {g.items.map(it => {
              const active = it.href ? pathname === it.href : tab === it.k;
              const cls = \`group w-full flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13px] font-medium transition
                    \${active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}\`;
              const inner = (<>
                  <Icon name={it.i} className={\`w-4 h-4 \${active ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"}\`}/>
                  <span className="flex-1 text-left">{it.n}</span>
                  {it.badge && (
                    <span className={\`text-[10.5px] font-semibold px-1.5 py-0.5 rounded \${active ? "bg-white text-violet-700 ring-1 ring-violet-200" : "bg-slate-100 text-slate-600"}\`}>{it.badge}</span>
                  )}
                </>);
              return it.href ? (
                <Link key={it.k} href={it.href} className={cls}>{inner}</Link>
              ) : (
                <button key={it.k} type="button" onClick={()=>setTab(it.k)} className={cls}>{inner}</button>
              );
            })}`
  );
}
admin = admin.replace(/<Navbar active="admin"\/>/g, '<Navbar active="admin" />');
fs.writeFileSync(path.join(root, "components/admin/AdminApp.tsx"), admin);

// portfolio css
const html = fs.readFileSync(path.join(root, "sulab-handoff/sulab/project/Sulab Portfolio.html"), "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  const css = styleMatch[1]
    .replace(/html, body \{[^}]+\}/, ".portfolio-page { font-family: 'Pretendard Variable', Pretendard, Inter, ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; background:#0a0a0c; color:#e7e7ea; }");
  fs.mkdirSync(path.join(root, "app/portfolio"), { recursive: true });
  fs.writeFileSync(path.join(root, "app/portfolio/portfolio.css"), css);
}

console.log("done");
