import { motion } from "motion/react";
import { Instagram, Youtube, Linkedin, Github } from "lucide-react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

export function DesignPixelFooter() {
  const handleNavigation = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "PAGES",
      links: [
        { name: "Overview", path: "/overview" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Mobile", path: "/mobile" },
        { name: "CI/BI", path: "/cibi" },
      ],
    },
    {
      title: "SERVICES",
      links: [
        { name: "Web Development", path: "/portfolio" },
        { name: "Mobile Apps", path: "/mobile" },
        { name: "Brand Identity", path: "/cibi" },
        { name: "AI Solutions", path: "/overview" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { name: "About Us", path: "/overview" },
        { name: "Request Project", path: "/request" },
        { name: "Contact", path: "/contact" },
        { name: "Notice", path: "/notice" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/AISulab/Sulab", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={logo} alt="SULAB" className="h-10 w-auto mb-6 brightness-0 invert" />
              <p className="text-white/60 mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                AI 기술로 홈페이지 제작과 마케팅 자동화를<br />
                수행하는 혁신적인 브랜드 SULAB
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#CBA135] hover:bg-[#CBA135]/10 transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={sectionIndex} className="md:col-span-2 md:col-start-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (sectionIndex + 1), duration: 0.6 }}
              >
                <h3 className="mb-6" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em" }}>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className="text-white/50 hover:text-white transition-colors inline-block text-left"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}

          {/* Contact Info */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="mb-6" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em" }}>
                CONTACT
              </h3>
              <ul className="space-y-4 text-white/50" style={{ fontSize: "0.875rem" }}>
                <li>T. 010 7707 7057</li>
                <li>F. 0504 436 7057</li>
                <li>대표자: 이진수</li>
                <li className="pt-2">
                  <a href="https://open.kakao.com/o/siMggc8f" target="_blank" rel="noopener noreferrer" className="text-[#CBA135] hover:underline">
                    카카오톡 문의 ↗
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-white/40"
              style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              © 2025 SULAB. All rights reserved.
            </motion.p>

            <motion.div
              className="flex gap-8 text-white/40"
              style={{ fontSize: "0.75rem" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <span className="text-white/20">
                Designed like DesignPixel
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
