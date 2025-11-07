import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ScrollTransitionSection() {
  const scenes = [
    {
      title: "AI Content.",
      subtitle: "인공지능이 만드는 창작의 미래",
      image: "https://images.unsplash.com/photo-1761223976272-0d6d4bc38636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGlubm92YXRpb24lMjBkaWdpdGFsfGVufDF8fHx8MTc2MjIyNDU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Innovation.",
      subtitle: "끊임없는 혁신으로 새로운 가치를 창출합니다",
      image: "https://images.unsplash.com/photo-1742678531208-7513a486fe9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjIxNjEzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Fast Creation.",
      subtitle: "아이디어를 몇 초 만에 현실로",
      image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyMTY3OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="relative">
      {scenes.map((scene, index) => (
        <ScenePanel key={index} scene={scene} index={index} />
      ))}
    </div>
  );
}

function ScenePanel({ scene, index }: { scene: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1.2, 1, 1, 1.2]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black sticky top-0"
      style={{ zIndex: 10 - index }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <ImageWithFallback
          src={scene.image}
          alt={scene.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-4"
        style={{ y }}
      >
        <div className="text-center">
          <motion.h2
            className="text-white mb-4"
            style={{
              fontSize: "4.5rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.05em" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2 }}
          >
            {scene.title}
          </motion.h2>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.25rem", lineHeight: 1.6 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {scene.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent"
        style={{ opacity }}
      />
    </section>
  );
}
