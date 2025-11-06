import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "개인 사용자를 위한 무료 플랜",
      features: [
        "월 10개 AI 콘텐츠 생성",
        "기본 템플릿 사용",
        "커뮤니티 지원",
        "720p 품질 영상",
      ],
      cta: "무료 시작하기",
      popular: false,
    },
    {
      name: "Pro",
      price: "29,000",
      description: "전문가를 위한 프리미엄 플랜",
      features: [
        "무제한 AI 콘텐츠 생성",
        "모든 프리미엄 템플릿",
        "우선 지원",
        "4K 품질 영상",
        "팀 협업 기능",
        "브랜딩 워터마크 제거",
      ],
      cta: "Pro로 시작하기",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "문의",
      description: "기업을 위한 맞춤형 솔루션",
      features: [
        "Pro 플랜 모든 기능",
        "전담 매니저 배정",
        "API 접근 권한",
        "맞춤형 AI 모델 학습",
        "온프레미스 배포 옵션",
        "24/7 기술 지원",
      ],
      cta: "영업팀 문의하기",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-[#2E6EFF]/10 to-[#00C2B7]/10 text-[#2E6EFF] rounded-full mb-4">
            <span style={{ fontWeight: 600 }}>💰 요금제</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            당신에게 맞는 플랜을 선택하세요
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            모든 플랜은 14일 무료 체험이 가능합니다
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-[#2E6EFF] shadow-2xl scale-105"
                  : "border-2 border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#2E6EFF] to-[#00C2B7] text-white rounded-full shadow-lg inline-flex items-center gap-1">
                    <Zap size={14} fill="white" />
                    <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>인기</span>
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: "0.9375rem" }}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                {plan.price === "문의" ? (
                  <div className="text-gray-900" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                    문의
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-900" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                      {plan.price === "0" ? "무료" : `₩${plan.price}`}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-gray-600" style={{ fontSize: "1rem" }}>
                        /월
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-[#2E6EFF]" />
                    </div>
                    <span className="text-gray-700" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-md ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#2E6EFF] to-[#00C2B7] text-white hover:shadow-2xl"
                    : "bg-white text-[#2E6EFF] border-2 border-[#2E6EFF] hover:bg-[#2E6EFF] hover:text-white"
                }`}
                style={{ fontWeight: 700 }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
