import { Lightbulb, Palette, Code, Rocket } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: Lightbulb,
      title: "기획",
      description: "프로젝트 목표와 요구사항을 분석하고 최적의 전략을 수립합니다.",
    },
    {
      icon: Palette,
      title: "디자인",
      description: "브랜드 아이덴티티를 반영한 시각적 디자인을 제작합니다.",
    },
    {
      icon: Code,
      title: "개발",
      description: "최신 기술로 안정적이고 확장 가능한 웹사이트를 구현합니다.",
    },
    {
      icon: Rocket,
      title: "마케팅",
      description: "런칭 후 효과적인 마케팅으로 비즈니스 성과를 만듭니다.",
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            체계적인 진행 프로세스
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            4단계 프로세스로 성공적인 프로젝트를 완성합니다.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-blue-300 to-[#2563EB] opacity-20" style={{ width: "calc(100% - 8rem)", left: "4rem" }}></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-[#2563EB] rounded-full mb-4" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#2563EB] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-gray-900 mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile Only */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#2563EB] to-blue-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
