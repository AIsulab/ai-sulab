import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SULAB | AI 콘텐츠 자동화 SaaS",
  description:
    "SULAB은 카드뉴스, 블로그, SNS 콘텐츠를 빠르게 생성하고 저장하는 AI 자동화 SaaS입니다.",
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
      <body className="min-h-full bg-[#090812] text-white">{children}</body>
    </html>
  );
}
