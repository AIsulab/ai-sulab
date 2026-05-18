import fs from "fs";
import path from "path";

const root = path.resolve("c:/website");

function extractBabelScript(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const scripts = [...html.matchAll(/<script type="text\/babel"[^>]*>\n([\s\S]*?)<\/script>/g)];
  const main = scripts.find((s) => s[1].includes("function App")) || scripts[scripts.length - 1];
  return main[1];
}

function convertJsx(src) {
  let out = src;
  out = out.replace(/ReactDOM\.createRoot\([^)]+\)\.render\(<App\/>\);?/g, "");
  out = out.replace(/const \{([^}]+)\} = React;/g, 'import { $1 } from "react";');
  out = out.replace(/React\.Fragment/g, "Fragment");
  out = out.replace(/\bclass=/g, "className=");
  out = out.replace(/<a href="([^"]+)"([^>]*)>/g, (_, href, rest) => {
    if (href.startsWith("#") || href.startsWith("/")) {
      return `<Link href="${href}"${rest}>`;
    }
    const map = {
      "Sulab Landing.html": "/",
      "Sulab Signup.html": "/signup",
      "Sulab Signup.html#login": "/login",
      "Sulab Admin.html": "/admin",
      "Sulab Portfolio.html": "/portfolio",
      "Sulab.html": "/dashboard",
    };
    let h = href;
    for (const [k, v] of Object.entries(map)) {
      if (href.startsWith(k)) {
        h = href.replace(k, v.split("#")[0]) + (href.includes("#") ? "#" + href.split("#")[1] : "");
        break;
      }
    }
    if (href.includes("Sulab Landing.html#")) {
      h = "/" + href.split("#")[1];
    }
    return `<Link href="${h}"${rest}>`;
  });
  out = out.replace(/<\/a>/g, "</Link>");
  out = out.replace(/<SulabNav/g, "<Navbar");
  out = out.replace(/active="login"/g, 'active="signup"');
  return out;
}

function wrapClient(name, body, extraImports = "") {
  return `"use client";

import Link from "next/link";
import { Fragment, useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navbar from "@/components/sulab/Navbar";
import { Icon } from "@/components/sulab/Icon";
import { Logo } from "@/components/logo";
${extraImports}

${body}

export default function ${name}() {
  return <App />;
}
`;
}

function run(file, outFile, exportName, extra = "") {
  const htmlPath = path.join(root, "sulab-handoff/sulab/project", file);
  let body = extractBabelScript(htmlPath);
  body = convertJsx(body);
  body = body.replace(/function App\(/, "function App(");
  const content = wrapClient(exportName, body, extra);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, content);
  console.log("Wrote", outFile, content.length);
}

run("Sulab Admin.html", path.join(root, "components/admin/AdminApp.tsx"), "AdminPage");
run(
  "Sulab Portfolio.html",
  path.join(root, "components/portfolio/PortfolioApp.tsx"),
  "PortfolioPage",
  'import "@/app/portfolio/portfolio.css";\n'
);
run("Sulab Signup.html", path.join(root, "components/signup/SignupApp.tsx"), "SignupPage");
