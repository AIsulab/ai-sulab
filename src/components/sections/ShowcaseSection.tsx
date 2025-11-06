import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: "AI Content Platform",
      client: "Tech Startup",
      image: "https://images.unsplash.com/photo-1628017973088-8feb5de8dddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjIyMDgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "AI 기반 콘텐츠 자동 생성 플랫폼",
    },
    {
      title: "Creative Studio Website",
      client: "Design Agency",
      image: "https://images.unsplash.com/photo-1730206562928-0efd62560435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjIxOTA3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "모던 디자인 스튜디오 브랜딩",
    },
    {
      title: "Data Analytics Dashboard",
      client: "Enterprise",
      image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyMTY3OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "실시간 데이터 분석 시스템",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="relative min-h-screen bg-[#111111] py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2
            className="text-white mb-6"
            style={{ fontSize: "3.5rem", fontWeight: 700, letterSpacing: "0.05em" }}
          >
            SHOWCASE
          </h2>
          <p className="text-white/60" style={{ fontSize: "1.25rem" }}>
            우리가 만든 프로젝트들
          </p>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="relative aspect-video rounded-none overflow-hidden">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 1.1,
              }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[#2E6EFF] mb-2" style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em" }}>
                    {project.client}
                  </p>
                  <h3 className="text-white mb-3" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                    {project.title}
                  </h3>
                  <p className="text-white/70" style={{ fontSize: "1.125rem" }}>
                    {project.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <motion.button
            onClick={prevSlide}
            className="w-14 h-14 border border-white/30 text-white hover:bg-white hover:text-[#111111] transition-all flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="w-14 h-14 border border-white/30 text-white hover:bg-white hover:text-[#111111] transition-all flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-8 justify-center">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 transition-all ${
                index === currentIndex ? "w-16 bg-[#2E6EFF]" : "w-8 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
