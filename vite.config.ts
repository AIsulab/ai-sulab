import fs from "fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

function headFromConfigAppend(): Plugin {
  return {
    name: "html-head-append-from-config",
    transformIndexHtml(html) {
      try {
        const cfgPath = path.resolve(process.cwd(), "site.config.json");
        const raw = fs.existsSync(cfgPath) ? fs.readFileSync(cfgPath, "utf8") : "{}";
        const cfg = JSON.parse(raw || "{}");
        const lang = cfg.lang || "ko";
        const ga = cfg.googleAnalyticsId;
        const title = cfg.title || "SULAB";
        const desc = cfg.description || "";
        const favicon = cfg.favicon || "/favicon.png";
        const faviconIco = cfg.faviconIco || "/favicon.ico";
        const appleTouch = cfg.appleTouchIcon || "/apple-touch-icon.png";
        const siteUrl = cfg.siteUrl || "/";
        const social = cfg.socialImage || "/social-1200x630.png";
        const robots = cfg.robots || "index, follow";

        const chunk = [
          `<link rel="canonical" href="${siteUrl.endsWith('/')?siteUrl:siteUrl + '/'}" />`,
          `<meta name="robots" content="${robots}" />`,
          `<meta name="description" content="${desc}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:url" content="${siteUrl}" />`,
          `<meta property="og:title" content="${title}" />`,
          `<meta property="og:description" content="${desc}" />`,
          `<meta property="og:image" content="${social}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${title}" />`,
          `<meta name="twitter:description" content="${desc}" />`,
          `<meta name="twitter:image" content="${social}" />`,
          `<link rel="icon" type="image/png" href="${favicon}" />`,
          `<link rel="icon" href="${faviconIco}" sizes="any" />`,
          `<link rel="apple-touch-icon" href="${appleTouch}" />`,
          ga ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>` : "",
          ga ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');</script>` : "",
        ].filter(Boolean).join('\n    ');

        let out = html;
        // Ensure lang exists
        if (!/<html[^>]*lang=/i.test(out)) {
          out = out.replace(/<html(.*?)>/i, `<html lang="${lang}"$1>`);
        }
        // Append chunk before </head>
        if (/<\/head>/i.test(out)) {
          out = out.replace(/<\/head>/i, `    ${chunk}\n  </head>`);
        } else {
          // If no head, create one after <html>
          out = out.replace(/<html[^>]*>/i, (m)=> `${m}\n  <head>\n    ${chunk}\n  </head>`);
        }
        // Title: if none present, add a basic one
        if (!/<title>/i.test(out)) {
          out = out.replace(/<head>/i, `<head>\n    <title>${title}</title>`);
        }
        return out;
      } catch {
        return html;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), headFromConfigAppend()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png': path.resolve(__dirname, './src/assets/abf9816ebaecbe448905f80cd9fb228c25413530.png'),
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});