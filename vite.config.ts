import fs from "fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

function headFromConfig(): Plugin {
  return {
    name: "html-head-from-config",
    transformIndexHtml(html) {
      try {
        const cfgPath = path.resolve(process.cwd(), "site.config.json");
        const raw = fs.readFileSync(cfgPath, "utf8");
        const cfg = JSON.parse(raw);
        const lang = cfg.lang || "ko";
        const ga = cfg.googleAnalyticsId;
        const title = cfg.title || "";
        const desc = cfg.description || "";
        const favicon = cfg.favicon || "/favicon.png";
        const social = cfg.socialImage || "/social-1200x630.png";

        const head = [
          '<meta charset="UTF-8" />',
          '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
          `<title>${title}</title>`,
          `<meta name="description" content="${desc}" />`,
          `<link rel="icon" type="image/png" sizes="48x48" href="${favicon}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:title" content="${title}" />`,
          `<meta property="og:description" content="${desc}" />`,
          `<meta property="og:image" content="${social}" />`,
          ga
            ? [
                `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>`,
                `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');</script>`,
              ].join("")
            : "",
        ].join("\n    ");

        // Ensure <html ...> has correct lang
        let out = html.replace(/<html[^>]*>/i, (m) => {
          return `<html lang="${lang}">`;
        });

        // Replace between <head>...</head>
        out = out.replace(/<head>[\s\S]*?<\/head>/i, `<head>\n    ${head}\n  </head>`);
        // Deduplicate stray </html>
        out = out.replace(/(<\/html>\s*){2,}$/i, '</html>');
        return out;
      } catch (e) {
        return html; // fail-safe
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), headFromConfig()],
  build: { target: "esnext" },
});