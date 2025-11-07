import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FullScreenHeader } from "../components/designpixel/FullScreenHeader";
import { SideUtilities } from "../components/designpixel/SideUtilities";
import { FullScreenSection } from "../components/designpixel/FullScreenSection";

export function NewHomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      subtitle: "Global Innovation.",
      title: "SULAB",
      linkText: "Explore More",
      linkHref: "#overview",
      backgroundImage: "https://images.unsplash.com/photo-1626908013943-df94de54984c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjI4NTE0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      subtitle: "AI Technology.",
      title: "Smart Creation",
      linkText: "View Projects",
      linkHref: "#portfolio",
      backgroundImage: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBkaWdpdGFsfGVufDF8fHx8MTc2MjMyMTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      subtitle: "Digital Agency.",
      title: "Web Development",
      linkText: "See Portfolio",
      linkHref: "#portfolio",
      backgroundImage: "https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMzIxMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      subtitle: "Mobile Solutions.",
      title: "App Development",
      linkText: "Discover Apps",
      linkHref: "#mobile",
      backgroundImage: "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjIyNTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      subtitle: "Brand Identity.",
      title: "Creative Design",
      linkText: "View Branding",
      linkHref: "#cibi",
      backgroundImage: "https://images.unsplash.com/photo-1644725701777-0740945ebe7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MjI5OTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-transition on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSection((prev) => (prev + 1) % sections.length);
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [isMobile, sections.length]);

  // Mobile view - single section at a time
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        <FullScreenHeader />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            className="h-screen w-full relative"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
          >
            <div className="absolute inset-0">
              <img
                src={sections[currentSection].backgroundImage}
                alt={sections[currentSection].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
            </div>

            <div className="relative z-10 h-full flex items-center px-6">
              <div>
                <motion.p
                  className="text-white/70 mb-3"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {sections[currentSection].subtitle}
                </motion.p>

                <motion.h1
                  className="text-white mb-6"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 3rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {sections[currentSection].title}
                </motion.h1>

                <motion.a
                  href={sections[currentSection].linkHref}
                  className="inline-flex items-center gap-2 text-white text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span>{sections[currentSection].linkText}</span>
                  <span className="w-8 h-[1px] bg-white"></span>
                </motion.a>
              </div>
            </div>

            {/* Section Indicators */}
            <div className="absolute bottom-8 left-6 flex gap-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`h-[2px] transition-all ${
                    index === currentSection
                      ? "w-12 bg-white"
                      : "w-6 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Desktop view - scroll-based sections
  return (
    <div className="min-h-screen bg-black">
      <FullScreenHeader />
      <SideUtilities />

      {sections.map((section, index) => (
        <FullScreenSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          linkText={section.linkText}
          linkHref={section.linkHref}
          backgroundImage={section.backgroundImage}
          index={index}
        />
      ))}

      {/* Footer CTA */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="text-center px-6">
          <motion.h2
            className="text-white mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            당신의 프로젝트를<br />
            시작하세요
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SULAB과 함께 혁신적인 디지털 경험을 만들어보세요
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={() => window.location.hash = "/request"}
              className="px-12 py-5 bg-[#3C89FF] text-white hover:bg-[#2E6EFF] transition-all"
              style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(60, 137, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              프로젝트 시작하기
            </motion.button>

            <motion.button
              onClick={() => window.location.hash = "/contact"}
              className="px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-black transition-all"
              style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.05em" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              문의하기
            </motion.button>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white/40"
          style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p>T. 02 587 1152 | sulabstore@naver.com</p>
          <p className="mt-2">© 2025 SULAB. All rights reserved.</p>
        </motion.div>
      </section>
    </div>
  );
}
