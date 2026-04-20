import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import siteData from '../site.config.json'

type NavItem = {
  id: string
  label: string
}

type Hero = {
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
}

type StatItem = {
  value: number
  suffix: string
  label: string
}

type PortfolioItem = {
  title: string
  category: string
  description: string
  image: string
}

type Footer = {
  company: string
  owner: string
  youtubeUrl: string
  instagramUrl: string
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
  stats: StatItem[]
  portfolio: PortfolioItem[]
  tickerLogos: string[]
  footer: Footer
}

const data = siteData as SiteData

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
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

function CountUpNumber({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return
    }

    let frame = 0
    let animationFrame = 0
    const totalFrames = 54

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

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.5 3.7-6.5 3.7Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.7 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  )
}

export default function App() {
  const tickerItems = useMemo(
    () => [...data.tickerLogos, ...data.tickerLogos],
    [],
  )

  useEffect(() => {
    document.title = data.site_info.site_name
    ensureMetaTag('description', data.meta_description)
    ensureMetaTag('keywords', data.seo_keywords.join(', '))
    ensureMetaTag('og:title', data.site_info.site_name, 'property')
    ensureMetaTag('og:description', data.meta_description, 'property')
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#top" className="font-heading text-xl font-bold tracking-tight text-slate-900">
            SULAB
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {data.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            문의하기
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-white px-6 pb-20 pt-24 lg:px-8 lg:pt-32">
          <div className="absolute right-[-10%] top-12 h-72 w-72 rounded-full bg-emerald-100 blur-3xl" />
          <div className="absolute left-[-8%] top-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <SectionReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Premium AI Automation Agency
              </p>
              <h1 className="font-heading mt-8 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-slate-900 md:text-7xl">
                {data.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
                {data.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  className="rounded-full border border-slate-900 px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                >
                  {data.hero.primaryCta}
                </a>
                <a
                  href="#contact"
                  className="rounded-full bg-emerald-500 px-7 py-4 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  {data.hero.secondaryCta}
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08} className="lg:justify-self-end">
              <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-slate-900 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <div className="relative">
                  <div className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                    SULAB SYSTEM
                  </div>
                  <div className="mt-8 grid gap-4">
                    <div className="rounded-[1.5rem] bg-white/5 p-5 backdrop-blur">
                      <div className="text-sm font-semibold text-emerald-300">Automation</div>
                      <div className="mt-2 text-2xl font-semibold">유튜브, 웹빌더, 마케팅 운영 자동화</div>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/5 p-5 backdrop-blur">
                      <div className="text-sm font-semibold text-emerald-300">Conversion</div>
                      <div className="mt-2 text-2xl font-semibold">브랜드 카피와 전환 구조를 동시에 설계</div>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/5 p-5 backdrop-blur">
                      <div className="text-sm font-semibold text-emerald-300">Deployment</div>
                      <div className="mt-2 text-2xl font-semibold">빠르게 완성하고 곧바로 운영 가능한 시스템</div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="overflow-hidden border-y border-slate-200 bg-white py-6">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {tickerItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex min-w-[11rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </section>

        <section className="bg-slate-900 px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Trust Indicator
              </p>
              <h2 className="font-heading mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                신뢰를 숫자로 증명하는
                <br />
                AI 자동화 에이전시
              </h2>
            </SectionReveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {data.stats.map((item, index) => (
                <SectionReveal
                  key={item.label}
                  delay={index * 0.08}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur"
                >
                  <div className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                    <CountUpNumber value={item.value} suffix={item.suffix} />
                  </div>
                  <div className="mt-4 text-xl font-semibold text-white">{item.label}</div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white px-6 py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Portfolio Showcase
                </p>
                <h2 className="font-heading mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
                  디자인과 성과를
                  <br />
                  동시에 보여주는 구축 사례
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                누끼토끼의 큼직한 썸네일 쇼케이스와 노베이스 클래스의 정돈된 타이포 구조를
                합쳐, 사례 하나하나가 바로 신뢰로 이어지도록 구성했습니다.
              </p>
            </SectionReveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.portfolio.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.08}>
                  <article className="group relative overflow-hidden rounded-[2rem] bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/35" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-8 p-7 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                        {item.category}
                      </div>
                      <h3 className="font-heading mt-3 text-2xl font-bold tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="border-t border-slate-200 bg-white p-7">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        {item.category}
                      </div>
                      <h3 className="font-heading mt-3 text-2xl font-bold tracking-tight text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-500 to-slate-900 px-8 py-14 text-white lg:px-14 lg:py-20">
            <SectionReveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">
                  Final CTA
                </p>
                <h2 className="font-heading mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  고퀄리티 홈페이지로 브랜드 경쟁력을 높이고 싶다면?
                </h2>
              </div>
              <a
                href="mailto:hello@sulab.kr"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                지금 상담하기
              </a>
            </SectionReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-heading text-lg font-bold tracking-tight text-slate-900">SULAB</div>
            <div className="mt-2 text-sm text-slate-600">
              상호명: {data.footer.company} | 대표자: {data.footer.owner}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={data.footer.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 p-3 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
              aria-label="YouTube"
            >
              <YoutubeIcon />
            </a>
            <a
              href={data.footer.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 p-3 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
