import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44"
    >
      <div className="mx-auto max-w-6xl bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]">
        <motion.p
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-sm uppercase tracking-widest text-white/40"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.p>

        <motion.h2
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          className="mt-5 text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Pioneering <span className="italic text-white/60">ideas</span> for
          <br className="hidden md:block" />
          <span className="italic text-white/60"> minds that create, build, and inspire.</span>
        </motion.h2>
      </div>
    </section>
  )
}
