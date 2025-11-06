import React from 'react';

const portfolioData = [
  {
    category: "AI 솔루션",
    projects: [
      {
        title: "AI 콘텐츠 자동화 플랫폼",
        description: "대규모 콘텐츠 제작 자동화 시스템 구축",
        tech: ["React", "TypeScript", "Python", "TensorFlow"],
        duration: "2024.09 - 2025.03",
        highlights: [
          "일일 10,000건 이상의 콘텐츠 자동 생성",
          "사용자 만족도 95% 달성",
          "운영 비용 60% 절감"
        ],
        image: "/portfolio/ai-platform.jpg"
      },
      {
        title: "데이터 분석 대시보드",
        description: "실시간 비즈니스 인사이트 도출 시스템",
        tech: ["Next.js", "D3.js", "Node.js", "MongoDB"],
        duration: "2024.06 - 2024.08",
        highlights: [
          "데이터 처리 속도 300% 개선",
          "의사결정 시간 50% 단축",
          "모바일 최적화 UI/UX"
        ],
        image: "/portfolio/dashboard.jpg"
      }
    ]
  },
  {
    category: "웹 서비스",
    projects: [
      {
        title: "스마트 워크스페이스",
        description: "기업용 협업 툴 개발 및 구축",
        tech: ["Vue.js", "Firebase", "Express", "WebRTC"],
        duration: "2024.03 - 2024.05",
        highlights: [
          "실시간 협업 기능 구현",
          "문서 버전 관리 시스템",
          "화상회의 솔루션 통합"
        ],
        image: "/portfolio/workspace.jpg"
      }
    ]
  }
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 히어로 섹션 */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            포트폴리오
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            SULAB의 혁신적인 프로젝트들을 소개합니다. AI 기술과 창의성이 만나 새로운 가치를 창출하는 과정을 확인하세요.
          </p>
        </div>
      </section>

      {/* 포트폴리오 그리드 */}
      <section className="px-4 pb-32">
        <div className="container mx-auto max-w-5xl">
          {portfolioData.map((category, idx) => (
            <div key={idx} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.projects.map((project, projectIdx) => (
                  <article key={projectIdx} className="card">
                    <div className="aspect-video rounded-lg bg-slate-100 mb-6">
                      {/* 이미지가 있으면 표시 */}
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        {project.title}
                      </h3>
                      <p className="text-slate-600">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4">
                        <h4 className="text-sm font-semibold text-slate-900 mb-2">
                          주요 성과
                        </h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                          {project.highlights.map((highlight, highlightIdx) => (
                            <li key={highlightIdx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm text-slate-500">
                        {project.duration}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            새로운 프로젝트를 함께 시작하세요
          </h2>
          <p className="text-slate-300 mb-8">
            SULAB과 함께라면 당신의 아이디어가 현실이 됩니다
          </p>
          <a
            href="mailto:sulabstore@naver.com"
            className="btn btn--primary inline-block"
          >
            프로젝트 문의하기
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;