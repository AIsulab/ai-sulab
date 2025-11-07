import { motion } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { PortfolioCard } from "../components/shared/PortfolioCard";

export function PortfolioPage() {
  const portfolioItems = [
    {
      category: "E-COMMERCE",
      title: "AI 기반 쇼핑몰 플랫폼",
      description: "머신러닝 추천 시스템과 결합된 차세대 이커머스 솔루션",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBtb2NrdXB8ZW58MXx8fHwxNzYyMTk4NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "CORPORATE",
      title: "글로벌 기업 웹사이트",
      description: "다국어 지원과 반응형 디자인의 엔터프라이즈급 웹사이트",
      image: "https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MjI2ODk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "PORTFOLIO",
      title: "크리에이터 포트폴리오",
      description: "인터랙티브 모션과 비주얼 스토리텔링이 돋보이는 포트폴리오 사이트",
      image: "https://images.unsplash.com/photo-1572457598110-2e060c4588ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIyNTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "SaaS",
      title: "클라우드 대시보드",
      description: "실시간 데이터 시각화와 직관적인 UX의 SaaS 플랫폼",
      image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "EDUCATION",
      title: "온라인 학습 플랫폼",
      description: "AI 튜터링 시스템과 개인화된 학습 경로 제공",
      image: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "HEALTHCARE",
      title: "헬스케어 예약 시스템",
      description: "환자 관리와 예약 자동화 통합 솔루션",
      image: "https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjB0ZWNobm9sb2d5JTIwaG9sb2dyYW18ZW58MXx8fHwxNzYyMjI2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="portfolio" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            WEB PORTFOLIO
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            웹 프로젝트
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            최신 기술과 창의적인 디자인으로 완성한<br />
            SULAB의 웹사이트 프로젝트를 소개합니다
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-white mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            다음 프로젝트의 주인공은<br />당신입니다
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SULAB과 함께 성공적인 웹 프로젝트를 시작하세요
          </motion.p>

          <motion.button
            onClick={() => window.location.hash = "/request"}
            className="px-12 py-5 bg-[#CBA135] text-black hover:bg-[#CBA135]/90 transition-all"
            style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(203, 161, 53, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            프로젝트 시작하기
          </motion.button>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
