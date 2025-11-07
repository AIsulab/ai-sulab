import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Play, MapPin, MessageSquare, X } from "lucide-react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

interface SlideData {
  outlineText: string;
  mainTitle: string;
  linkText: string;
  linkUrl: string;
  backgroundImage: string;
  additionalInfo?: string;
}

const slides: SlideData[] = [
  {
    outlineText: "Global R&BD.",
    mainTitle: "SULAB AI",
    linkText: "Go to site",
    linkUrl: "#",
    backgroundImage: "https://images.unsplash.com/photo-1626908013943-df94de54984c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjI4NTE0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    additionalInfo: "?곹샇紐?SULAB | ??쒖옄 ?댁쭊??| T. 010 7707 7057 | F. 0504 436 7057",
  },
  {
    outlineText: "HR Platform.",
    mainTitle: "Web Development",
    linkText: "Go to site",
    linkUrl: "#portfolio",
    backgroundImage: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBkaWdpdGFsfGVufDF8fHx8MTc2MjMyMTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    additionalInfo: "?곹샇紐?SULAB | ??쒖옄 ?댁쭊??| T. 010 7707 7057 | F. 0504 436 7057",
  },
  {
    outlineText: "Record.",
    mainTitle: "Mobile Apps",
    linkText: "Go to site",
    linkUrl: "#mobile",
    backgroundImage: "https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMzIxMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    additionalInfo: "?곹샇紐?SULAB | ??쒖옄 ?댁쭊??| T. 010 7707 7057 | F. 0504 436 7057",
  },
  {
    outlineText: "Brand Identity.",
    mainTitle: "CI/BI Design",
    linkText: "Go to site",
    linkUrl: "#cibi",
    backgroundImage: "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjIyNTA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    additionalInfo: "?곹샇紐?SULAB | ??쒖옄 ?댁쭊??| T. 010 7707 7057 | F. 0504 436 7057",
  },
  {
    outlineText: "Marketing.",
    mainTitle: "AI Automation",
    linkText: "Go to site",
    linkUrl: "#overview",
    backgroundImage: "https://images.unsplash.com/photo-1644725701777-0740945ebe7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MjI5OTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    additionalInfo: "?곹샇紐?SULAB | ??쒖옄 ?댁쭊??| T. 010 7707 7057 | F. 0504 436 7057",
  },
];

export function HorizontalSlideLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const isScrolling = useRef(false);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

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

  // Auto slide every 6 seconds
  useEffect(() => {
    if (isMenuOpen) return;

    autoSlideTimer.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [isMenuOpen]);

  // Handle wheel scroll for horizontal slide
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || isMenuOpen) return;

      e.preventDefault();
      isScrolling.current = true;

      // Reset auto slide timer
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }

      if (e.deltaY > 0) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }

      setTimeout(() => {
        isScrolling.current = false;
        autoSlideTimer.current = setInterval(() => {
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSlide, isMenuOpen]);

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleNavigation = (path: string) => {
    window.location.hash = path;
    setIsMenuOpen(false);
  };

  const currentSlideData = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex items-center justify-between px-6 lg:px-12 py-6 lg:py-8">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavigation("/")}
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="SULAB"
                className="h-6 lg:h-8 w-auto brightness-0 invert"
              />
            </div>
          </motion.button>

          {/* Hamburger Menu */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="pointer-events-auto flex flex-col items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]">
              <span className="block w-7 h-[1px] bg-white"></span>
              <span className="block w-7 h-[1px] bg-white"></span>
              <span className="block w-7 h-[1px] bg-white"></span>
            </div>
            <span className="text-white text-[0.625rem] tracking-wider">MENU</span>
          </motion.button>
        </div>
      </header>

      {/* Right Side Utilities - DesignPixel Style */}
      <div className="fixed right-6 lg:right-8 top-0 bottom-0 z-40 flex flex-col items-center justify-between py-20">
        {/* Top: Vertical Text Box */}
        <motion.div
          className="hidden lg:block border border-white/30 px-3 py-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p
            className="text-white whitespace-nowrap"
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              transform: "rotate(90deg)",
              transformOrigin: "center",
              width: "150px",
              textAlign: "center",
            }}
          >
            SULAB io
          </p>
        </motion.div>

        {/* Middle: Circular Text Logo */}
        <motion.div
          className="relative w-32 h-32 hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className="text-[0.625rem] fill-white" style={{ letterSpacing: "0.15em" }}>
              <textPath href="#circlePath" startOffset="0%">
                Group web agency SULAB High Quality & Creative Designer
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border border-white/30 rotate-45"></div>
          </div>
        </motion.div>

        {/* Bottom: Phone + Icons */}
        <div className="flex flex-col items-center gap-4">
          {/* Phone Number (Vertical) */}
          <motion.div
            className="hidden lg:block mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p
              className="text-white/60 whitespace-nowrap"
              style={{
                fontSize: "0.625rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                transform: "rotate(90deg)",
                transformOrigin: "center",
                width: "120px",
              }}
            >
              T. 010 7707 7057
            </p>
          </motion.div>

          {/* Icons */}
          <div className="hidden lg:flex flex-col gap-3">
            {[
              { icon: FileText, label: "?뚯궗媛쒖슂" },
              { icon: Play, label: "?뚭컻?곸긽" },
              { icon: MapPin, label: "?ㅼ떆?붽만" },
              { icon: MessageSquare, label: "釉붾줈洹? },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={i}
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  aria-label={item.label}
                >
                  <Icon size={16} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={currentSlideData.backgroundImage}
              alt={currentSlideData.mainTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20 max-w-[1920px] mx-auto">
            <div className="max-w-4xl">
              {/* Outline Text */}
              <motion.h2
                className="text-transparent mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {currentSlideData.outlineText}
              </motion.h2>

              {/* Main Title */}
              <motion.h1
                className="text-white mb-8"
                style={{
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {currentSlideData.mainTitle}
              </motion.h1>

              {/* Link */}
              <motion.a
                href={currentSlideData.linkUrl}
                className="inline-block text-white relative group"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span>{currentSlideData.linkText}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Left: Address (DesignPixel Style) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent px-8 lg:px-20 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-white/70" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            ?곹샇紐?SULAB | ??쒖옄 ?댁쭊??          </p>
          <p className="text-white/50" style={{ fontSize: "0.625rem", letterSpacing: "0.05em" }}>
            (C) 2025 SULAB.CO.KR ALL RIGHTS RESERVED T.010.7707.7057
          </p>
        </div>
      </motion.div>

      {/* Bottom Navigation Dots */}
      <div className="fixed bottom-20 left-8 lg:left-20 z-40 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-[1px] transition-all ${
              index === currentSlide ? "w-12 bg-white" : "w-6 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Full Screen Menu - DesignPixel Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="fixed top-6 right-6 lg:top-8 lg:right-12 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-[70]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <X size={20} />
            </motion.button>

            <div className="h-full flex">
              {/* Left Section */}
              <div className="flex-1 flex items-center justify-center lg:justify-start px-8 lg:px-20">
                <nav className="lg:text-left text-center">
                  {/* Title */}
                  <motion.h2
                    className="text-white mb-12"
                    style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "0.02em" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    SULAB
                    <br />
                    Portfolio
                  </motion.h2>

                  {/* Menu Categories */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => handleNavigation("/portfolio")}
                      className="block text-white/70 hover:text-white transition-colors mb-2 text-left"
                      style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                    >
                      Website
                    </button>
                    <button
                      onClick={() => handleNavigation("/mobile")}
                      className="block text-white/70 hover:text-white transition-colors mb-2 text-left"
                      style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                    >
                      Mobile
                    </button>
                    <button
                      onClick={() => handleNavigation("/portfolio")}
                      className="block text-white/70 hover:text-white transition-colors mb-2 text-left"
                      style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                    >
                      Movie
                    </button>
                    <button
                      onClick={() => handleNavigation("/cibi")}
                      className="block text-white/70 hover:text-white transition-colors text-left"
                      style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                    >
                      CI, BI
                    </button>
                  </motion.div>

                  {/* Main Menu Items */}
                  <motion.div
                    className="space-y-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => handleNavigation("/request")}
                      className="block text-white hover:text-white/70 transition-colors text-left"
                      style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      Project Request
                    </button>
                    <button
                      onClick={() => handleNavigation("/contact")}
                      className="block text-white hover:text-white/70 transition-colors text-left"
                      style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      Contact Us
                    </button>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    className="text-white/40 text-left"
                    style={{ fontSize: "0.75rem", lineHeight: 1.6, letterSpacing: "0.05em" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p>?곹샇紐? SULAB | ??쒖옄: ?댁쭊??/p>
                    <p>짤 2025 SULAB.CO.KR ALL RIGHTS RESERVED T.010.7707.7057</p>
                  </motion.div>
                </nav>
              </div>

              {/* Right Section - Business Area */}
              <motion.div
                className="hidden lg:flex flex-col justify-center w-80 px-12 border-l border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-white mb-8"
                  style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.15em" }}
                >
                  BUSINESS AREA
                </h3>

                {/* Links */}
                <div className="space-y-3 mb-12">
                  <a
                    href="https://sulab.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/60 hover:text-white transition-colors"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    sulab.vercel.app
                  </a>
                  <a
                    href="#"
                    className="block text-white/60 hover:text-white transition-colors"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    sulab.co.kr
                  </a>
                  <a
                    href="#"
                    className="block text-white/60 hover:text-white transition-colors"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    bio.sulab.co.kr
                  </a>
                </div>

                {/* Icons */}
                <div className="flex gap-3 mb-8">
                  {[FileText, Play, MapPin, MessageSquare].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>

                {/* Phone */}
                <p className="text-white mb-6" style={{ fontSize: "1.125rem", letterSpacing: "0.05em" }}>
                  T. 010 7707 7057
                </p>

                {/* Request Button */}
                <button
                  onClick={() => handleNavigation("/request")}
                  className="w-full py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  ?꾨줈?앺듃 ?섎ː
                </button>

                {/* Note */}
                <p
                  className="mt-6 text-white/40"
                  style={{ fontSize: "0.625rem", lineHeight: 1.6 }}
                >
                  寃ъ쟻 ?몄텧??ZERO???꾨줈?앺듃???섏젙怨쇱젙?대굹<br />
                  ?듭뀡???곸슜?섏? ?딆뒿?덈떎.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

