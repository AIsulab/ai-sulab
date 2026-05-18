import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const pretendardCdn = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css";

export const metadata: Metadata = {
  title: "AI 콘텐츠 자동화 SaaS",
  description:
    "카드뉴스, 블로그, SNS 콘텐츠를 빠르게 생성하고 저장하는 AI 자동화 SaaS입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href={pretendardCdn} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "'Pretendard Variable', Pretendard, var(--font-sans-kr), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
