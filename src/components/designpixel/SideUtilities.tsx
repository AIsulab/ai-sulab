import { motion } from "motion/react";
import { Instagram, Linkedin, Youtube, Github } from "lucide-react";

export function SideUtilities() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Github, href: "https://github.com/AISulab/Sulab", label: "GitHub" },
  ];

  return (
    <div className="fixed right-8 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-8">
      {/* Rotated Phone Number */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p
          className="text-white/60 origin-center whitespace-nowrap"
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            transform: "rotate(90deg)",
          }}
        >
          T. 02 587 1152
        </p>
      </motion.div>

      {/* Divider Line */}
      <motion.div
        className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />

      {/* Social Icons */}
      <div className="flex flex-col gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.1, x: -5 }}
              aria-label={social.label}
            >
              <Icon size={16} />
            </motion.a>
          );
        })}
      </div>

      {/* Bottom Divider Line */}
      <motion.div
        className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/40"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      />
    </div>
  );
}
