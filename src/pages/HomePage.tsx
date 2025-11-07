import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="home" />
      <HeroSection />
      <ScrollSection1 />
      <ScrollSection2 />
      <ScrollSection3 />
      <CTASection />
      <DesignPixelFooter />
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          style={{ opacity, scale }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MjI2ODk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="SULAB Innovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.h3
            className="text-transparent mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.8, 0, 0.2, 1] }}
          >
            AI Technology.
          </motion.h3>

          <motion.h1
            className="text-white mb-12 text-center"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.8, 0, 0.2, 1] }}
          >
            SULAB Innovation
          </motion.h1>

          <motion.a
            href="#overview"
            className="group relative px-10 py-4 border border-white/60 text-white overflow-hidden"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.8, 0, 0.2, 1] }}
            whileHover={{ boxShadow: "0 0 30px rgba(203, 161, 53, 0.4)" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#CBA135]/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Explore SULAB
              <ArrowRight size={16} />
            </span>
          </motion.a>

          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
}

function ScrollSection1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.05, 1, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ opacity, scale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBtb2NrdXB8ZW58MXx8fHwxNzYyMTk4NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Web Development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "0.05em" }}
            >
              Web Development
            </motion.h2>
            <motion.p
              className="text-white/70 max-w-2xl mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              최신 기술 스택으로 반응형 웹사이트와<br />
              모던한 웹 애플리케이션을 제작합니다
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollSection2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.05, 1, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ opacity, scale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyMjI1NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mobile Development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "0.05em" }}
            >
              Mobile Apps
            </motion.h2>
            <motion.p
              className="text-white/70 max-w-2xl mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              사용자 경험을 최우선으로 하는<br />
              혁신적인 모바일 애플리케이션 개발
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollSection3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.05, 1, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ opacity, scale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760037028517-e5cc6e3ebd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjIyNjg5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Brand Identity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "0.05em" }}
            >
              Brand Identity
            </motion.h2>
            <motion.p
              className="text-white/70 max-w-2xl mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              브랜드의 본질을 담은<br />
              독창적인 아이덴티티 디자인
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-white mb-8"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "0.02em" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          당신의 아이디어를<br />AI와 함께 실현하세요
        </motion.h2>

        <motion.p
          className="text-white/60 mb-12 max-w-2xl mx-auto"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          SULAB은 최신 AI 기술로 당신의 비즈니스를 혁신합니다
        </motion.p>

        <motion.button
          onClick={() => window.location.hash = "/request"}
          className="group relative px-12 py-5 bg-transparent text-white overflow-hidden border border-white/60"
          style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "0.1em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ boxShadow: "0 0 40px rgba(203, 161, 53, 0.5)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#CBA135] to-[#CBA135]/80"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
          <span className="relative z-10 flex items-center gap-3 justify-center">
            프로젝트 시작하기
            <ArrowRight size={20} />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
