import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface FullScreenSectionProps {
  subtitle: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  backgroundImage: string;
  index: number;
}

export function FullScreenSection({
  subtitle,
  title,
  linkText = "Go to site",
  linkHref = "#",
  backgroundImage,
  index,
}: FullScreenSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1.1, 1, 1, 1.05]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100, 0, 0, -100]
  );

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
          <ImageWithFallback
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        </motion.div>

        {/* Content - Center-Left Alignment */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
            <motion.div
              className="max-w-3xl"
              style={{ y }}
            >
              {/* Subtitle */}
              <motion.p
                className="text-white/70 mb-4"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.8, 0, 0.2, 1] }}
              >
                {subtitle}
              </motion.p>

              {/* Main Title */}
              <motion.h1
                className="text-white mb-8"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.8, 0, 0.2, 1] }}
              >
                {title}
              </motion.h1>

              {/* Link */}
              <motion.a
                href={linkHref}
                className="group inline-flex items-center gap-3 text-white relative"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.8, 0, 0.2, 1] }}
                whileHover={{ x: 10 }}
              >
                <span>{linkText}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                
                {/* Animated Underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-white"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "calc(100% - 30px)" }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Section Number Indicator */}
        <motion.div
          className="absolute bottom-12 left-8 lg:left-16 text-white/30"
          style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
      </div>
    </section>
  );
}
