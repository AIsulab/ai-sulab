import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

interface DesignPixelHeaderProps {
  currentPage?: string;
}

export function DesignPixelHeader({ currentPage = "home" }: DesignPixelHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrolled > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Overview", path: "/overview" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Mobile", path: "/mobile" },
    { name: "CI/BI", path: "/cibi" },
    { name: "Request", path: "/request" },
    { name: "Contact", path: "/contact" },
    { name: "Notice", path: "/notice" },
  ];

  const handleNavigation = (path: string) => {
    window.location.hash = path;
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 py-6">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavigation("/")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="cursor-pointer"
          >
            <img
              src={logo}
              alt="SULAB"
              className="h-8 w-auto brightness-0 invert"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.slice(1, 5).map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="text-white/80 hover:text-white transition-colors relative group"
                style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.1em" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </nav>

          {/* Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-12 h-12 flex flex-col items-end justify-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="block w-8 h-[1px] bg-white"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 5 : 0,
              }}
            />
            <motion.span
              className="block w-6 h-[1px] bg-white"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-8 h-[1px] bg-white"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -5 : 0,
              }}
            />
          </motion.button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </motion.header>

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
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="block text-white hover:text-[#CBA135] transition-colors mb-8"
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ x: 20, scale: 1.05 }}
                  >
                    {item.name}
                  </motion.button>
                ))}

                <motion.div
                  className="mt-16 text-white/40"
                  style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="mb-2">T. 010 7707 7057 | F. 0504 436 7057</p>
                  <p className="mb-2">대표자: 이진수</p>
                  <p>SULAB © 2025</p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
