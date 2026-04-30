import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    tag: 'Strategy',
    title: 'Research & Insight',
    description:
      'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Craft',
    title: 'Design & Execution',
    description:
      'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]">
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="mb-16 flex items-end justify-between gap-6 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">What we do</h2>
          <p className="hidden text-sm text-white/40 md:block">Our services</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              className="group liquid-glass overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={service.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <p className="text-xs uppercase tracking-widest text-white/40">{service.tag}</p>
                  <div className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{service.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
