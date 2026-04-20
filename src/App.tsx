import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import siteData from '../site.config.json'

type NavItem = {
  id: string
  label: string
}

type Hero = {
  badge: string
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
}

type Intro = {
  headline: string
  mission: string
  description: string
}

type ValueItem = {
  icon: string
  title: string
  description: string
}

type StatItem = {
  value: number
  suffix: string
  label: string
  description: string
}

type AutomationItem = {
  title: string
  description: string
  detail: string
}

type PortfolioItem = {
  title: string
  category: string
  description: string
  image: string
}

type ContactInfo = {
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
  intro: Intro
  values: ValueItem[]
  stats: StatItem[]
  automation: AutomationItem[]
  portfolio: PortfolioItem[]
  partners: string[]
  contact: ContactInfo
}

type ContactForm = {
  company: string
  name: string
  inquiry: string
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

export default function App() {
  const [form, setForm] = useState<ContactForm>({
    company: '',
    name: '',
    inquiry: '',
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
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-lg font-extrabold tracking-[0.18em] text-zinc-900">
            SUTUDIO
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {data.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:border-emerald-600 hover:text-emerald-700"
          >
            협업 문의
          </a>
        </nav>
      </div>

      <main id="top" className="pt-24">
        <section className="relative overflow-hidden px-6 pb-20 pt-14">
          <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-emerald-100/70 blur-3xl" />
          <motion.div
            className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-zinc-200 bg-white px-8 py-12 shadow-[0_30px_100px_rgba(24,24,27,0.06)] lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-16"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.9, ease: smoothEase }}
          >
            <div>
              <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold tracking-[0.18em] text-emerald-700">
                {data.hero.badge}
              </div>
              <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[0.92] tracking-tight text-zinc-950 md:text-7xl">
                {data.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
                {data.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  {data.hero.primaryCta}
                </a>
                <a
                  href="#portfolio"
                  className="rounded-full border border-zinc-200 px-7 py-4 text-sm font-bold text-zinc-900 transition hover:border-zinc-400"
                >
                  {data.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              {data.stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-[2rem] bg-zinc-50 p-7"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: smoothEase }}
                >
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {stat.label}
                  </div>
                  <div className="mt-3 text-5xl font-extrabold tracking-tight text-zinc-950">
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="about" className="px-6 py-20">
          <motion.div
            className="mx-auto grid max-w-7xl gap-10 border-t border-zinc-200 pt-16 lg:grid-cols-[1fr_0.9fr]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                About SUTUDIO
              </p>
              <h2 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 md:text-6xl">
                {data.intro.headline}
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl font-bold leading-10 text-zinc-900">{data.intro.mission}</p>
              <p className="mt-6 text-lg leading-8 text-zinc-600">{data.intro.description}</p>
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: smoothEase }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                Core Value
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
                AI 수튜디오가 일하는 방식
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {data.values.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-[2rem] bg-zinc-50 p-7"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-emerald-700 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-zinc-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="automation" className="px-6 py-24">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-zinc-950 px-8 py-12 text-white lg:px-14 lg:py-16">
            <motion.div
              className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: smoothEase }}
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                  Automation
                </p>
                <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
                  유튜브부터 웹빌더까지
                  <br />
                  AI 자동화 솔루션을 설계합니다
                </h2>
              </div>
              <div className="grid gap-4">
                {data.automation.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                  >
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                      {item.detail}
                    </div>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-zinc-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-2">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: smoothEase }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                Numbers
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
                숫자로 증명하는 자동화 구축 성과
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_20px_50px_rgba(24,24,27,0.04)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                >
                  <div className="text-5xl font-extrabold tracking-tight text-zinc-950">
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-4 text-xl font-bold text-zinc-900">{stat.label}</div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: smoothEase }}
            >
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                  Portfolio
                </p>
                <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
                  구축 사례와 시안으로 보는
                  <br />
                  수튜디오의 결과물
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600">
                브랜드의 결을 살리면서도 실제 문의와 매출 전환으로 이어지는 구조를 우선으로
                설계합니다.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.portfolio.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="overflow-hidden rounded-[2rem] bg-zinc-50"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-80 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-7">
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                      {item.category}
                    </div>
                    <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-zinc-600">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-zinc-200 py-8">
          <div className="logo-marquee">
            <div className="logo-track">
              {[...data.partners, ...data.partners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="mx-3 flex min-w-[13rem] items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-500"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-zinc-50 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: smoothEase }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                Contact
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
                {data.contact.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600">{data.contact.description}</p>
              <div className="mt-8 rounded-[1.75rem] bg-white p-6 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Email
                </div>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="mt-3 block text-xl font-bold text-zinc-950"
                >
                  {data.contact.email}
                </a>
              </div>
            </motion.div>

            <motion.form
              className="grid gap-4"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.08, ease: smoothEase }}
            >
              <input
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 outline-none transition focus:border-emerald-600"
                placeholder="회사명 또는 브랜드명"
                value={form.company}
                onChange={(event) =>
                  setForm((current) => ({ ...current, company: event.target.value }))
                }
              />
              <input
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 outline-none transition focus:border-emerald-600"
                placeholder="담당자명"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
              <textarea
                className="min-h-48 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 outline-none transition focus:border-emerald-600"
                placeholder="자동화하고 싶은 업무, 필요한 페이지, 기대하는 결과를 적어주세요."
                value={form.inquiry}
                onChange={(event) =>
                  setForm((current) => ({ ...current, inquiry: event.target.value }))
                }
              />
              <button
                type="submit"
                className="rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                {data.contact.cta}
              </button>
              {submitted ? (
                <p className="text-sm text-emerald-700">
                  문의 내용이 정리되었습니다. 실제 연동 전 단계이므로 현재는 화면에서만 확인됩니다.
                </p>
              ) : null}
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  )
}
