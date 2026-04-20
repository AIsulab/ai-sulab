import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import siteData from '../site.config.json'

type NavItem = {
  id: string
  label: string
}

type Hero = {
  label: string
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
}

type Story = {
  label: string
  title: string
  description: string
  image: string
}

type ValueItem = {
  number: string
  title: string
  description: string
}

type StatItem = {
  value: number
  suffix: string
  label: string
  description: string
}

type PortfolioItem = {
  title: string
  category: string
  description: string
  image: string
}

type PartnerItem = {
  name: string
}

type Contact = {
  label: string
  title: string
  description: string
  email: string
  cta: string
}

type SiteData = {
  site_info: {
    site_name: string
    main_color: string
  }
  meta_description: string
  seo_keywords: string[]
  nav: NavItem[]
  hero: Hero
  story: Story
  values: ValueItem[]
  stats: StatItem[]
  portfolio: PortfolioItem[]
  partners: PartnerItem[]
  contact: Contact
}

type InquiryForm = {
  company: string
  name: string
  message: string
}

const data = siteData as SiteData

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const smoothEase = [0.22, 1, 0.36, 1] as const

function ensureMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
) {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function CountUpNumber({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.65 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return
    }

    let frame = 0
    let animationFrame = 0
    const totalFrames = 56

    const animate = () => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(value * eased))

      if (frame < totalFrames) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.8, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [form, setForm] = useState<InquiryForm>({
    company: '',
    name: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = data.site_info.site_name
    ensureMetaTag('description', data.meta_description)
    ensureMetaTag('keywords', data.seo_keywords.join(', '))
    ensureMetaTag('og:title', data.site_info.site_name, 'property')
    ensureMetaTag('og:description', data.meta_description, 'property')
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#EEEEEE] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <a href="#top" className="text-base font-black tracking-[-0.05em] text-[#111111]">
            SUTUDIO
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {data.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-semibold text-[#666666] transition hover:text-[#111111]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="text-sm font-semibold text-[#111111] transition hover:text-emerald-700"
          >
            Contact
          </a>
        </div>
      </header>

      <main id="top">
        <section className="bg-white px-6 py-32 md:py-40">
          <SectionReveal className="mx-auto max-w-[1200px]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
              {data.hero.label}
            </p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 className="max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.05em] text-[#111111] md:text-7xl">
                  {data.hero.title}
                </h1>
              </div>
              <div>
                <p className="max-w-xl text-base leading-[1.6] text-[#666666] md:text-lg">
                  {data.hero.subtitle}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="border border-[#111111] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#111111] hover:text-white"
                  >
                    {data.hero.primaryCta}
                  </a>
                  <a
                    href="#portfolio"
                    className="border border-[#EEEEEE] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#111111]"
                  >
                    {data.hero.secondaryCta}
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>

        <section id="about" className="bg-[#F8F8F8] px-6 py-32 md:py-40">
          <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                {data.story.label}
              </p>
              <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                {data.story.title}
              </h2>
              <p className="mt-8 max-w-md text-base leading-[1.6] text-[#666666]">
                {data.story.description}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <img
                src={data.story.image}
                alt={data.story.title}
                className="aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
            </SectionReveal>
          </div>
        </section>

        <section className="bg-white px-6 py-32 md:py-40">
          <div className="mx-auto max-w-[1200px]">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                Values
              </p>
              <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                수튜디오가 집중하는 핵심 가치
              </h2>
            </SectionReveal>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {data.values.map((item, index) => (
                <SectionReveal
                  key={item.number}
                  delay={index * 0.08}
                  className="border-t border-[#EEEEEE] pt-8"
                >
                  <div className="text-4xl font-light tracking-[-0.05em] text-[#AAAAAA]">
                    {item.number}
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-[-0.05em] text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.6] text-[#666666]">
                    {item.description}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F8F8] px-6 py-32 md:py-40">
          <div className="mx-auto max-w-[1200px]">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                Numbers
              </p>
              <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                자동화 구축 성과를 숫자로 보여줍니다
              </h2>
            </SectionReveal>

            <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
              {data.stats.map((item, index) => (
                <SectionReveal key={item.label} delay={index * 0.08}>
                  <div className="border-t border-[#EEEEEE] pt-8">
                    <div className="text-5xl font-black tracking-[-0.05em] text-[#111111] md:text-6xl">
                      <CountUpNumber value={item.value} suffix={item.suffix} />
                    </div>
                    <h3 className="mt-5 text-xl font-black tracking-[-0.05em] text-[#111111]">
                      {item.label}
                    </h3>
                    <p className="mt-4 text-base leading-[1.6] text-[#666666]">
                      {item.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white px-6 py-32 md:py-40">
          <div className="mx-auto max-w-[1200px]">
            <SectionReveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                  Portfolio
                </p>
                <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                  브랜드와 자동화의 결과물을 한 화면에서 보여줍니다
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-[1.6] text-[#666666] md:text-lg">
                시안은 보기 좋게 끝나지 않고 실제 문의와 운영 효율로 이어져야 합니다. 수튜디오는
                브랜드 사이트와 자동화 시스템을 하나의 비즈니스 흐름으로 설계합니다.
              </p>
            </SectionReveal>

            <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {data.portfolio.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.08}>
                  <article>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="mt-8">
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                        {item.category}
                      </p>
                      <h3 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[#111111]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-[1.6] text-[#666666]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-[#EEEEEE] bg-[#F8F8F8] py-10">
          <div className="logo-marquee">
            <div className="logo-track">
              {[...data.partners, ...data.partners].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="mx-3 flex min-w-[14rem] items-center justify-center border border-[#EEEEEE] bg-white px-6 py-4 text-sm font-semibold tracking-[0.18em] text-[#666666]"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white px-6 py-32 md:py-40">
          <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#666666]">
                {data.contact.label}
              </p>
              <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] md:text-6xl">
                {data.contact.title}
              </h2>
              <p className="mt-8 max-w-md text-base leading-[1.6] text-[#666666]">
                {data.contact.description}
              </p>
              <a
                href={`mailto:${data.contact.email}`}
                className="mt-8 inline-block text-lg font-black tracking-[-0.05em] text-[#111111]"
              >
                {data.contact.email}
              </a>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <input
                  className="border border-[#EEEEEE] bg-[#F8F8F8] px-5 py-4 text-base text-[#111111] outline-none transition focus:border-[#111111]"
                  placeholder="회사명 또는 브랜드명"
                  value={form.company}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, company: event.target.value }))
                  }
                />
                <input
                  className="border border-[#EEEEEE] bg-[#F8F8F8] px-5 py-4 text-base text-[#111111] outline-none transition focus:border-[#111111]"
                  placeholder="담당자명"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
                <textarea
                  className="min-h-56 border border-[#EEEEEE] bg-[#F8F8F8] px-5 py-4 text-base leading-[1.6] text-[#111111] outline-none transition focus:border-[#111111]"
                  placeholder="자동화하고 싶은 업무와 필요한 결과를 적어주세요."
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                />
                <button
                  type="submit"
                  className="mt-2 w-fit border border-[#111111] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#111111] hover:text-white"
                >
                  {data.contact.cta}
                </button>
                {submitted ? (
                  <p className="text-sm text-[#666666]">
                    문의 내용이 정리되었습니다. 현재는 화면 상에서만 제출 상태를 확인합니다.
                  </p>
                ) : null}
              </form>
            </SectionReveal>
          </div>
        </section>
      </main>
    </div>
  )
}
