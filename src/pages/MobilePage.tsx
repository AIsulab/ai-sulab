import { motion } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { PortfolioCard } from "../components/shared/PortfolioCard";

export function MobilePage() {
  const mobileProjects = [
    {
      category: "iOS / ANDROID",
      title: "소셜 네트워킹 앱",
      description: "실시간 채팅과 콘텐츠 공유 기능의 소셜 미디어 플랫폼",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyMjI1NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "FINTECH",
      title: "모바일 뱅킹 앱",
      description: "안전하고 직관적인 금융 거래 및 자산 관리 솔루션",
      image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "FITNESS",
      title: "AI 헬스케어 트래커",
      description: "개인화된 운동 계획과 건강 모니터링 앱",
      image: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "DELIVERY",
      title: "음식 배달 플랫폼",
      description: "실시간 주문 추적과 AI 추천 시스템",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBtb2NrdXB8ZW58MXx8fHwxNzYyMTk4NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const features = [
    "Native iOS & Android 개발",
    "크로스 플랫폼 솔루션",
    "실시간 동기화",
    "오프라인 기능",
    "푸시 알림",
    "앱 내 결제",
  ];

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="mobile" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CBA135]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CBA135]/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            MOBILE PORTFOLIO
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            모바일 앱
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto mb-16"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            사용자 경험을 최우선으로 하는<br />
            혁신적인 모바일 애플리케이션
          </motion.p>

          {/* Feature Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="px-5 py-2 border border-white/20 text-white/70 hover:border-[#CBA135] hover:text-white transition-all"
                style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-white mb-6"
              style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "0.02em" }}
            >
              프로젝트 갤러리
            </h2>
            <div className="w-20 h-[2px] bg-[#CBA135]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {mobileProjects.map((item, index) => (
              <PortfolioCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-white mb-6"
              style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "0.02em" }}
            >
              기술 스택
            </h2>
            <div className="w-20 h-[2px] bg-[#CBA135] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "React Native", desc: "크로스 플랫폼 개발" },
              { title: "Swift / Kotlin", desc: "네이티브 앱 개발" },
              { title: "Firebase", desc: "백엔드 서비스" },
              { title: "GraphQL", desc: "효율적인 데이터 통신" },
              { title: "Redux", desc: "상태 관리" },
              { title: "Jest", desc: "테스트 자동화" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="p-8 border border-white/10 hover:border-[#CBA135]/50 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {tech.title}
                </h3>
                <p
                  className="text-white/60"
                  style={{ fontSize: "0.9375rem" }}
                >
                  {tech.desc}
                </p>
                <div className="w-12 h-[1px] bg-[#CBA135] mt-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            모바일 앱 아이디어가 있으신가요?
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SULAB이 당신의 아이디어를 현실로 만들어드립니다
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
            앱 개발 문의하기
          </motion.button>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
