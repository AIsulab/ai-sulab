import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import designPixelImage from "figma:asset/6ebf4da1408947f67b67f706ea9ee03548b9f354.png";

export function Section01_Hero() {
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
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity, scale }}
        >
          <img
            src={designPixelImage}
            alt="Semiconductor Technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Outline Text */}
          <motion.h3
            className="text-transparent mb-4"
            style={{
              fontSize: "4rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
              textStroke: "1px rgba(255, 255, 255, 0.6)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.8, 0, 0.2, 1] }}
          >
            AI Technology.
          </motion.h3>

          {/* Bold Main Text */}
          <motion.h1
            className="text-white mb-12"
            style={{
              fontSize: "6rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.8, 0, 0.2, 1] }}
          >
            SULAB Innovation
          </motion.h1>

          {/* CTA Button */}
          <motion.a
            href="#"
            className="group relative px-8 py-3 border border-white/60 text-white overflow-hidden"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.8, 0, 0.2, 1] }}
            whileHover={{ boxShadow: "0 0 20px rgba(46, 110, 255, 0.5)" }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-[#2E6EFF]/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">Go to site</span>
          </motion.a>

          {/* Bottom Divider Line */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
