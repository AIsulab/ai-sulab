import { motion } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { PortfolioCard } from "../components/shared/PortfolioCard";

export function CIBIPage() {
  const brandingProjects = [
    {
      category: "BRAND IDENTITY",
      title: "테크 스타트업 브랜딩",
      description: "AI 기술 기업의 혁신적 이미지를 담은 종합 브랜드 아이덴티티",
      image: "https://images.unsplash.com/photo-1760037028517-e5cc6e3ebd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjIyNjg5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "LOGO DESIGN",
      title: "럭셔리 브랜드 로고",
      description: "프리미엄 감성을 표현한 미니멀 로고 디자인",
      image: "https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MjI2ODk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "CORPORATE IDENTITY",
      title: "글로벌 기업 CI",
      description: "명함, 레터헤드, 봉투 등 통합 CI 시스템",
      image: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MjI2ODk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "REBRANDING",
      title: "전통 기업 리브랜딩",
      description: "전통과 혁신의 조화를 담은 브랜드 리뉴얼",
      image: "https://images.unsplash.com/photo-1572457598110-2e060c4588ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIyNTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const services = [
    {
      title: "로고 디자인",
      items: ["심볼 마크", "워드 마크", "로고타입", "시그니처"],
    },
    {
      title: "브랜드 가이드라인",
      items: ["컬러 시스템", "타이포그래피", "그래픽 요소", "적용 규정"],
    },
    {
      title: "인쇄물 디자인",
      items: ["명함", "레터헤드", "봉투", "폴더"],
    },
    {
      title: "디지털 에셋",
      items: ["소셜 미디어", "이메일 서명", "프레젠테이션", "아이콘 세트"],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="cibi" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#CBA135]/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-[#CBA135]/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            CI / BI PORTFOLIO
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            브랜드 아이덴티티
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            브랜드의 본질을 시각화하고<br />
            독창적인 가치를 전달하는 아이덴티티 디자인
          </motion.p>
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
            {brandingProjects.map((item, index) => (
              <PortfolioCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
              제공 서비스
            </h2>
            <div className="w-20 h-[2px] bg-[#CBA135] mx-auto mb-8"></div>
            <p className="text-white/60 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              브랜드 아이덴티티 구축을 위한 종합 디자인 솔루션
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group p-8 border border-white/10 hover:border-[#CBA135]/50 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#CBA135]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <h3
                    className="text-white mb-6 pb-4 border-b border-white/10"
                    style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "0.05em" }}
                  >
                    {service.title}
                  </h3>

                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 flex items-center gap-2"
                        style={{ fontSize: "0.9375rem" }}
                      >
                        <span className="w-1 h-1 bg-[#CBA135] rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="w-12 h-[1px] bg-[#CBA135] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              디자인 프로세스
            </h2>
            <div className="w-20 h-[2px] bg-[#CBA135] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "리서치", desc: "브랜드 분석 및 시장 조사" },
              { step: "02", title: "전략 수립", desc: "브랜드 포지셔닝 정의" },
              { step: "03", title: "디자인", desc: "시각적 아이덴티티 개발" },
              { step: "04", title: "적용", desc: "가이드라인 및 에셋 제작" },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div
                  className="text-[#CBA135] mb-4"
                  style={{ fontSize: "2.5rem", fontWeight: 700 }}
                >
                  {process.step}
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "1.25rem", fontWeight: 700 }}
                >
                  {process.title}
                </h3>
                <p
                  className="text-white/60"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}
                >
                  {process.desc}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-[1px] bg-gradient-to-r from-[#CBA135] to-transparent transform translate-x-1/2"></div>
                )}
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
            브랜드에 생명을 불어넣으세요
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SULAB과 함께 독창적인 브랜드 아이덴티티를 구축하세요
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
            브랜딩 프로젝트 시작하기
          </motion.button>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
