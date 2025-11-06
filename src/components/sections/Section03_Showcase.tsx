import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function Section03_Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const projects = [
    {
      category: "AI Platform",
      title: "Content Generation System",
      image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "Innovation",
      title: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjIyNjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      category: "Technology",
      title: "Future Solutions",
      image: "https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjB0ZWNobm9sb2d5JTIwaG9sb2dyYW18ZW58MXx8fHwxNzYyMjI2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black py-32 overflow-hidden"
    >
      {/* Background Grid */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.8, 0, 0.2, 1] }}
        >
          <h2
            className="text-white mb-6"
            style={{
              fontSize: "4rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            SELECTED WORKS
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-white/60 to-transparent"></div>
        </motion.div>

        {/* Project Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: index * 0.2,
                ease: [0.8, 0, 0.2, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href="#"
                className="block relative overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.8, 0, 0.2, 1] }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                  </motion.div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <motion.p
                      className="text-white/60 mb-2"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                      }}
                      animate={{
                        y: hoveredIndex === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {project.category}
                    </motion.p>

                    <motion.h3
                      className="text-white mb-4"
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                      }}
                      animate={{
                        y: hoveredIndex === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.div
                      className="flex items-center gap-2 text-white"
                      animate={{
                        x: hoveredIndex === index ? 10 : 0,
                        opacity: hoveredIndex === index ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                        }}
                      >
                        VIEW PROJECT
                      </span>
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Line */}
                <motion.div
                  className="h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-8"
                  animate={{
                    scaleX: hoveredIndex === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.6, ease: [0.8, 0, 0.2, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
