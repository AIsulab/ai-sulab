import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

export function DesignPixelNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-8 py-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src={logo}
              alt="SULAB"
              className="h-8 w-auto brightness-0 invert"
            />
          </motion.div>

          {/* Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-12 h-12 flex flex-col items-end justify-center gap-2 group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="block w-8 h-[1px] bg-white transition-all"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 5 : 0,
                width: isMenuOpen ? "2rem" : "2rem",
              }}
            />
            <motion.span
              className="block w-6 h-[1px] bg-white transition-all"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                width: "1.5rem",
              }}
            />
            <motion.span
              className="block w-8 h-[1px] bg-white transition-all"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -5 : 0,
                width: isMenuOpen ? "2rem" : "2rem",
              }}
            />
          </motion.button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Side Indicators */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {[1, 2, 3, 4, 5].map((num, index) => (
          <motion.div
            key={num}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
          >
            <span
              className="text-white/40 text-xs"
              style={{ fontWeight: 500, letterSpacing: "0.1em" }}
            >
              0{num}
            </span>
            <div className={`w-8 h-[1px] ${
              Math.floor(scrollProgress / 20) >= index
                ? "bg-white"
                : "bg-white/30"
            }`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="h-full flex items-center justify-center">
              <nav className="text-center">
                {["Work", "Services", "About", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-[#2E6EFF] transition-colors mb-8"
                    style={{
                      fontSize: "4rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 20, scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}

                <motion.div
                  className="mt-16 text-white/40"
                  style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="mb-2">SULAB@2025</p>
                  <p>sulabstore@naver.com</p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
