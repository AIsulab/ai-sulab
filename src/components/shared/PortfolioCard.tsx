import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  category: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export function PortfolioCard({ category, title, description, image, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.8, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"></div>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#CBA135]/20 via-transparent to-transparent"></div>
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <motion.p
            className="text-white/60 mb-2"
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
            }}
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {category}
          </motion.p>

          <motion.h3
            className="text-white mb-3"
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-white/70 mb-4"
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-white"
            animate={{
              x: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.4 }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
              }}
            >
              VIEW PROJECT
            </span>
            <ArrowUpRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Line Animation */}
      <motion.div
        className="h-[1px] bg-gradient-to-r from-[#CBA135] to-transparent mt-6"
        animate={{
          scaleX: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.6, ease: [0.8, 0, 0.2, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
