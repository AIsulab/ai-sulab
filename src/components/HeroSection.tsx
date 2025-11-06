import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjIxMDYwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="AI Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E6EFF]/90 via-[#2E6EFF]/70 to-[#00C2B7]/60"></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30">
              <span style={{ fontWeight: 600 }}>✨ AI 기반 콘텐츠 플랫폼</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-white mb-6"
            style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            AI로 만들어지는<br />
            <span className="text-[#00C2B7]">나만의 콘텐츠 세상</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-white/90 mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "1.25rem", lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            SULAB이 당신의 아이디어를 가장 빠르게 현실로 만듭니다
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="group px-8 py-4 bg-white text-[#2E6EFF] rounded-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
              <span style={{ fontSize: "1.125rem", fontWeight: 700 }}>시작하기</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToFeatures}
              className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Play size={22} />
              <span style={{ fontSize: "1.125rem", fontWeight: 700 }}>기능 살펴보기</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-white mb-1" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                10K+
              </div>
              <div className="text-white/80" style={{ fontWeight: 500 }}>사용자</div>
            </div>
            <div className="text-center">
              <div className="text-white mb-1" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                100K+
              </div>
              <div className="text-white/80" style={{ fontWeight: 500 }}>생성된 콘텐츠</div>
            </div>
            <div className="text-center">
              <div className="text-white mb-1" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                99%
              </div>
              <div className="text-white/80" style={{ fontWeight: 500 }}>만족도</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
