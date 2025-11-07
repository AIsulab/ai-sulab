import { Globe, Palette, TrendingUp, Target } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: "홈페이지 제작",
      description: "WordPress, Webflow부터 커스텀 개발까지 비즈니스에 최적화된 웹사이트를 제작합니다.",
      features: ["반응형 디자인", "CMS 구축", "SEO 최적화", "유지보수"],
    },
    {
      icon: Palette,
      title: "브랜딩·디자인",
      description: "브랜드 아이덴티티부터 콘텐츠 디자인까지 일관된 시각적 경험을 제공합니다.",
      features: ["로고 디자인", "브랜드 가이드", "UI/UX", "콘텐츠 제작"],
    },
    {
      icon: TrendingUp,
      title: "광고",
      description: "Google, Meta, 네이버 광고를 통해 타겟 고객에게 정확하게 도달합니다.",
      features: ["광고 기획", "캠페인 운영", "A/B 테스트", "리포팅"],
    },
    {
      icon: Target,
      title: "전환 최적화",
      description: "데이터 기반 분석과 개선으로 실질적인 비즈니스 성과를 만듭니다.",
      features: ["전환율 분석", "UX 개선", "성과 측정", "컨설팅"],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            SULAB의 핵심 서비스
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            디지털 비즈니스 성장을 위한 통합 솔루션을 제공합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors">
                  <Icon size={28} className="text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"></div>
                      <span className="text-gray-700" style={{ fontSize: "0.875rem" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
