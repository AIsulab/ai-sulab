import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink } from "lucide-react";

export function PortfolioSection() {
  const projects = [
    {
      title: "모던 커머스 웹사이트",
      category: "Website",
      description: "반응형 이커머스 플랫폼 제작 및 결제 시스템 통합",
      image: "https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2MTgzNjYwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "브랜드 아이덴티티 시스템",
      category: "Design",
      description: "로고, 명함, 브랜드 가이드라인 전체 제작",
      image: "https://images.unsplash.com/photo-1686417199134-44656c560e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjE3ODQwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "통합 마케팅 캠페인",
      category: "Marketing",
      description: "Meta/Google 광고 통합 운영 및 ROI 300% 달성",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBzdHJhdGVneXxlbnwxfHx8fDE3NjE4MjY4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            성공 사례 포트폴리오
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            SULAB이 완성한 다양한 프로젝트를 확인해보세요.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <ExternalLink size={20} className="text-white" />
                </div>
              </div>

              {/* Content - Always Visible */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block px-3 py-1 bg-[#2563EB] rounded-full mb-3">
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{project.category}</span>
                </div>
                <h3 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {project.title}
                </h3>
                <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
