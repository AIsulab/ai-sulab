import { motion } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Lightbulb, Users, Award } from "lucide-react";

export function OverviewPage() {
  const stats = [
    { number: "100+", label: "프로젝트 완료" },
    { number: "50+", label: "만족한 고객" },
    { number: "5년+", label: "업계 경험" },
    { number: "24/7", label: "고객 지원" },
  ];

  const values = [
    {
      icon: Target,
      title: "명확한 목표",
      description: "고객의 비즈니스 목표를 정확히 이해하고 최적의 솔루션을 제공합니다",
    },
    {
      icon: Lightbulb,
      title: "혁신적 사고",
      description: "최신 AI 기술과 창의적 아이디어로 차별화된 가치를 창출합니다",
    },
    {
      icon: Users,
      title: "협력적 파트너십",
      description: "고객과의 긴밀한 소통을 통해 함께 성장하는 관계를 구축합니다",
    },
    {
      icon: Award,
      title: "품질 보증",
      description: "철저한 품질 관리와 지속적인 개선으로 최고의 결과물을 보장합니다",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="overview" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MjI2ODk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="SULAB Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            COMPANY OVERVIEW
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            AI 기술로<br />미래를 창조합니다
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            SULAB은 인공지능 기술을 활용한 웹사이트 제작과 마케팅 자동화로<br />
            고객의 비즈니스 성장을 가속화하는 혁신적인 디지털 에이전시입니다
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
      </section>

      {/* Stats Section */}
      <section className="relative py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="text-white mb-3" style={{ fontSize: "3.5rem", fontWeight: 700 }}>
                  {stat.number}
                </div>
                <div className="text-white/60" style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}>
                  {stat.label}
                </div>
                <div className="w-12 h-[1px] bg-[#CBA135] mx-auto mt-4"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2
                className="text-white mb-6"
                style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "0.02em" }}
              >
                우리의 미션
              </h2>
              <div className="w-20 h-[2px] bg-[#CBA135] mb-8"></div>
              <p className="text-white/70 mb-6" style={{ fontSize: "1.125rem", lineHeight: 1.8 }}>
                SULAB은 AI 기술의 무한한 가능성을 믿습니다. 우리는 최신 인공지능 기술을 활용하여 
                고객의 비즈니스를 디지털화하고, 효율적인 마케팅 자동화 시스템을 구축합니다.
              </p>
              <p className="text-white/70" style={{ fontSize: "1.125rem", lineHeight: 1.8 }}>
                단순한 웹사이트 제작을 넘어, 고객의 성공이 곧 우리의 성공이라는 철학으로 
                장기적인 파트너십을 구축하며 함께 성장해 나갑니다.
              </p>
            </motion.div>

            <motion.div
              className="relative aspect-square"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1572457598110-2e060c4588ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIyNTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="SULAB Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-white mb-6"
              style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "0.02em" }}
            >
              핵심 가치
            </h2>
            <div className="w-20 h-[2px] bg-[#CBA135] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative p-8 border border-white/10 hover:border-[#CBA135]/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#CBA135]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="w-14 h-14 border border-white/20 flex items-center justify-center mb-6 group-hover:border-[#CBA135] transition-colors">
                      <Icon className="text-white" size={24} />
                    </div>

                    <h3
                      className="text-white mb-4"
                      style={{ fontSize: "1.25rem", fontWeight: 700 }}
                    >
                      {value.title}
                    </h3>

                    <p
                      className="text-white/60"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                    >
                      {value.description}
                    </p>

                    <div className="w-12 h-[1px] bg-[#CBA135] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-white mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            함께 성장할 준비가 되셨나요?
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SULAB과 함께 비즈니스의 새로운 가능성을 발견하세요
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={() => window.location.hash = "/request"}
              className="px-10 py-4 bg-[#CBA135] text-black hover:bg-[#CBA135]/90 transition-all"
              style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(203, 161, 53, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              프로젝트 의뢰하기
            </motion.button>

            <motion.button
              onClick={() => window.location.hash = "/contact"}
              className="px-10 py-4 border border-white/60 text-white hover:bg-white/10 transition-all"
              style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              문의하기
            </motion.button>
          </motion.div>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
