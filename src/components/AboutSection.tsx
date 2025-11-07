import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Monitor, Palette, TrendingUp } from "lucide-react";

export function AboutSection() {
  const services = [
    {
      icon: Monitor,
      title: "Website",
      subtitle: "맞춤형 반응형 웹사이트 제작",
      description: "WordPress, Webflow부터 커스텀 개발까지 모든 플랫폼 지원",
      image: "https://images.unsplash.com/photo-1678690832311-bb6e361989ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYxODQzNjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#1C6DF2",
    },
    {
      icon: Palette,
      title: "Design",
      subtitle: "브랜드 아이덴티티 & 콘텐츠 디자인",
      description: "로고, 명함, 패키지부터 SNS 콘텐츠까지 통합 디자인",
      image: "https://images.unsplash.com/photo-1644725701777-0740945ebe7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MTc2OTE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#00BFA5",
    },
    {
      icon: TrendingUp,
      title: "Marketing",
      subtitle: "광고전략, 운영, 리포트 관리",
      description: "Google, Meta, 네이버 광고 통합 관리 및 최적화",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MTgxNzc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#1C6DF2",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#0A2540] mb-4" style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.3 }}>
            기획부터 디자인, 마케팅까지<br />
            모든 과정을 함께합니다.
          </h2>
          <p className="text-[#0A2540] opacity-70 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            SULAB은 AI 기술을 활용해 비즈니스의 디지털 성장을 만듭니다.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Image Background */}
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"
                  ></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    {service.title}
                  </h3>
                  <p className="mb-2 opacity-90" style={{ fontWeight: 600 }}>
                    {service.subtitle}
                  </p>
                  <p className="text-white/80" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
