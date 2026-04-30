import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FeaturedVideoSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="features"
      className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={sectionRef}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          className="relative aspect-video overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
                  Our Approach
                </p>
                <p className="text-sm leading-relaxed text-white md:text-base">
                  We believe in the power of curiosity-driven exploration. Every project
                  starts with a question, and every answer opens a new door to innovation.
                </p>
              </div>

              <motion.a
                className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white"
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore more
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
