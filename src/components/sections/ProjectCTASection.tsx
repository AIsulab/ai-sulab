import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ProjectCTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#111111] via-[#1a1a2e] to-[#0f0f23]">
      {/* Blur Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2E6EFF]/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C2B7]/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-6 py-2 border border-white/30 text-white/80 rounded-full backdrop-blur-sm">
              <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}>
                START YOUR PROJECT
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-white mb-8"
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.02em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            당신의 아이디어를<br />
            AI와 함께 실현하세요.
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12 max-w-2xl mx-auto"
            style={{ fontSize: "1.25rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            SULAB은 최신 AI 기술로 당신의 비즈니스를 혁신합니다.<br />
            지금 바로 프로젝트를 시작하세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="group relative px-12 py-5 bg-transparent text-white overflow-hidden"
              style={{ fontSize: "1.125rem", fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Border */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ stroke: "white", strokeWidth: 2, fill: "none" }}
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  className="transition-all duration-300 group-hover:stroke-[#2E6EFF]"
                />
              </svg>

              {/* Hover Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#2E6EFF] to-[#00C2B7]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />

              <span className="relative z-10 flex items-center gap-3 justify-center">
                SULAB과 함께하기
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#2E6EFF] rounded-full"></div>
              <span style={{ fontSize: "0.875rem" }}>sulabstore@naver.com</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#00C2B7] rounded-full"></div>
              <span style={{ fontSize: "0.875rem" }}>전북특별자치도 전주시</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
