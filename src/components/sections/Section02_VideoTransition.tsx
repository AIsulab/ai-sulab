import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SceneData {
  outlineText: string;
  boldText: string;
  ctaText: string;
  image: string;
}

const scenes: SceneData[] = [
  {
    outlineText: "AI Content.",
    boldText: "Smart Creation",
    ctaText: "Explore Features",
    image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    outlineText: "Innovation.",
    boldText: "Digital Transform",
    ctaText: "Learn More",
    image: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    outlineText: "Future Tech.",
    boldText: "Beyond Tomorrow",
    ctaText: "Discover Now",
    image: "https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjB0ZWNobm9sb2d5JTIwaG9sb2dyYW18ZW58MXx8fHwxNzYyMjI2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    outlineText: "Data Center.",
    boldText: "Cloud Infrastructure",
    ctaText: "View Details",
    image: "https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyc3xlbnwxfHx8fDE3NjIxNjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Section02_VideoTransition() {
  return (
    <div className="relative">
      {scenes.map((scene, index) => (
        <VideoScene key={index} scene={scene} index={index} />
      ))}
    </div>
  );
}

function VideoScene({ scene, index }: { scene: SceneData; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Crossfade effect with cubic-bezier easing
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
    { ease: [0.8, 0, 0.2, 1] }
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1.05, 1, 1, 1.05],
    { ease: [0.8, 0, 0.2, 1] }
  );

  // Text animations based on scroll progress
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.7, 0.8],
    [0, 0, 1, 1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.7, 0.8],
    [40, 40, 0, 0, -40]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background Image/Video */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity, scale }}
        >
          <ImageWithFallback
            src={scene.image}
            alt={scene.boldText}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Outline Text */}
          <motion.h3
            className="text-transparent mb-4"
            style={{
              opacity: textOpacity,
              y: textY,
              fontSize: "4rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
              textStroke: "1px rgba(255, 255, 255, 0.6)",
            }}
          >
            {scene.outlineText}
          </motion.h3>

          {/* Bold Main Text */}
          <motion.h1
            className="text-white mb-12"
            style={{
              opacity: textOpacity,
              y: useTransform(textY, (value) => value + 10),
              fontSize: "6rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            {scene.boldText}
          </motion.h1>

          {/* CTA Button */}
          <motion.a
            href="#"
            className="group relative px-8 py-3 border border-white/60 text-white overflow-hidden"
            style={{
              opacity: textOpacity,
              y: useTransform(textY, (value) => value + 20),
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
            whileHover={{ boxShadow: "0 0 20px rgba(0, 194, 183, 0.5)" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00C2B7]/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.8, 0, 0.2, 1] }}
            />
            <span className="relative z-10">{scene.ctaText}</span>
          </motion.a>

          {/* Divider Line */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white/30 to-transparent"
            style={{ opacity: textOpacity }}
          />
        </div>

        {/* Scene Number Indicator */}
        <motion.div
          className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col items-center gap-2"
          style={{ opacity: textOpacity }}
        >
          <span className="text-white/40 text-xs tracking-widest rotate-90 origin-center">
            0{index + 2}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
