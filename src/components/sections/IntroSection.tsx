import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video Background (using image as placeholder) */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjE1MjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="SULAB Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <motion.h1
            className="text-white mb-6"
            style={{ 
              fontSize: "5rem", 
              fontWeight: 700, 
              letterSpacing: "0.02em",
              lineHeight: 1.1
            }}
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.02em" }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            AI Beyond<br />
            Imagination.
          </motion.h1>

          <motion.p
            className="text-white/80 mb-12 max-w-2xl mx-auto"
            style={{ fontSize: "1.5rem", lineHeight: 1.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            SULAB — We Create with Intelligence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.button
              className="group px-10 py-4 bg-white text-[#111111] rounded-none relative overflow-hidden"
              style={{ fontWeight: 700, fontSize: "1.125rem" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                사이트 바로가기
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-[#2E6EFF]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-10 py-4 border-2 border-white text-white rounded-none hover:bg-white hover:text-[#111111] transition-all"
              style={{ fontWeight: 700, fontSize: "1.125rem" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              프로젝트 문의
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm tracking-widest">SCROLL</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
