import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SULAB 광고 대행사 포털',
  description: 'AI 마케팅 자동화 및 광고 진행 현황 관리',
};

export default function MarketingAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
