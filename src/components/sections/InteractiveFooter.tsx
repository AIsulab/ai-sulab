import { motion } from "motion/react";
import { Instagram, Youtube, Linkedin, Github } from "lucide-react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

export function InteractiveFooter() {
  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/AISulab/Sulab", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a1a] to-[#000000] text-white py-20">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E6EFF] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <img src={logo} alt="SULAB" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-white/60 mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                AI 기술로 콘텐츠 창작의<br />
                새로운 기준을 만들어갑니다.
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
                      className="w-11 h-11 border border-white/20 flex items-center justify-center hover:border-[#2E6EFF] hover:bg-[#2E6EFF]/10 transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="mb-6" style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                PRODUCT
              </h3>
              <ul className="space-y-4">
                {["Features", "Pricing", "Use Cases", "API"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white transition-colors inline-block"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="mb-6" style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                RESOURCES
              </h3>
              <ul className="space-y-4">
                {["Documentation", "Tutorials", "Blog", "Community"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white transition-colors inline-block"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="mb-6" style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                COMPANY
              </h3>
              <ul className="space-y-4">
                {["About", "Careers", "Contact", "Partners"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white transition-colors inline-block"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="mb-6" style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                STAY UPDATED
              </h3>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#2E6EFF] transition-colors"
                  style={{ fontSize: "0.875rem" }}
                />
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#2E6EFF] text-white hover:bg-[#1e5eff] transition-all"
                  style={{ fontSize: "0.875rem", fontWeight: 700 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-white/40"
              style={{ fontSize: "0.75rem" }}
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
              <a href="https://sulab.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Vercel ↗
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
