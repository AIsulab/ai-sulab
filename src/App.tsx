import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, ComponentType, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  CircleCheckBig,
  Menu,
  PenTool,
  Rocket,
  ShoppingCart,
  SquareTerminal,
  X,
  ArrowDown,
} from 'lucide-react'

const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/siMggc8f'

const menuItems = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'proof', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
]

const serviceCards = [
  {
    icon: SquareTerminal,
    title: 'Automation Build',
    desc: '문의, 예약, 알림, 반복 업무를 하나의 흐름으로 묶어 운영 부담을 줄입니다.',
  },
  {
    icon: ShoppingCart,
    title: 'Conversion Landing',
    desc: '상담과 구매 전환을 위한 구조를 설계해 브랜드 메시지를 선명하게 만듭니다.',
  },
  {
    icon: Boxes,
    title: 'AI Assistant',
    desc: '초보 고객도 쉽게 질문할 수 있는 챗봇과 견적 안내 흐름을 제공합니다.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Performance Review',
    desc: '유입, 문의, 전환을 숫자로 확인할 수 있는 성과 관점의 화면을 설계합니다.',
  },
]

const portfolioItems = [
  {
    title: '강남역 24시 무인 스터디카페',
    tag: '랜딩페이지 / 예약',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'AI 음악 학원',
    tag: '브랜딩 / 자동응답',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1600',
  },
]

const partnerLogos = [
  'Meta',
  'Lotte',
  'IMWEB',
  'KOSA',
  'Studio',
  'Clinic',
  'Academy',
  'Agency',
  'Retail',
  'Cafe',
]

const stats = [
  { value: '150+', label: '누적 프로젝트 구축' },
  { value: '80+', label: '함께한 파트너' },
  { value: '99%', label: '고객 만족도' },
]

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const number = Number.parseInt(value.replace(/[^0-9]/g, ''), 10)
    let current = 0
    const duration = 1400
    const step = Math.max(1, Math.floor(number / (duration / 16)))
    const timer = window.setInterval(() => {
      current += step
      if (current >= number) {
        setCount(number)
        window.clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 16)
    return () => window.clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <div className="text-5xl font-black tracking-tight text-white md:text-6xl">
        {count}
        {value.includes('%') ? '%' : '+'}
      </div>
      <div className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">{label}</div>
    </div>
  )
}

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-800/10 bg-[#f8fafc] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
    </div>
  )
}

function RotatingSignature() {
  const text = 'SULAB AI AUTOMATION SYSTEM'

  return (
    <div className="fixed right-[-96px] top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="relative h-56 w-56">
        <div
          className="ring-spin absolute inset-0 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
          style={
            {
              ['--ring-speed' as string]: '18s',
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path
                id="ring-path"
                d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
              />
            </defs>
            <text
              className="fill-white/20 text-[14px] uppercase tracking-[0.44em]"
              textAnchor="middle"
            >
              <textPath href="#ring-path" startOffset="50%">
                {`${text}   `.repeat(2)}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white">
            <ArrowDown className="h-6 w-6 animate-bounce text-white/90" />
          </div>
        </div>
      </div>
    </div>
  )
}

function RightRail() {
  return (
    <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
      <a
        href="#contact"
        className="rounded-none border border-white/20 px-3 py-4 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-white/85 [writing-mode:vertical-rl]"
      >
        Project Request
      </a>
      <div className="flex flex-col items-center gap-4 text-white/60">
        <span className="h-3 w-3 rounded-full border border-white/60" />
        <span className="h-3 w-3 rounded-full border border-white/60" />
        <span className="h-3 w-3 rounded-full border border-white/60" />
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePortfolio, setActivePortfolio] = useState(portfolioItems[0])

  useBodyLock(menuOpen)

  const tickerItems = useMemo(() => [...partnerLogos, ...partnerLogos], [])

  useEffect(() => {
    document.title = 'SULAB AI | Premium AI Agency'
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0f172a] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.35em] text-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-emerald-400">
              S
            </span>
            <span>SULAB AI</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-500/40 hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
            MENU
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a] text-white"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-5 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black uppercase tracking-[0.35em]">SULAB AI</div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  CLOSE
                </button>
              </div>
              <div className="flex flex-1 items-center">
                <nav className="grid w-full gap-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="border-b border-white/10 py-6 text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-[-0.05em]"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top">
        <section className="relative overflow-hidden bg-[#0f172a] text-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
          <div className="relative mx-auto flex max-w-7xl flex-col px-6 pb-16 pt-8 lg:px-8 lg:pt-10">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/70">
              <span>대표님의 시간을 아껴드립니다.</span>
              <span>1:1 Open Chat</span>
            </div>

            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <ScrollReveal>
                <div className="max-w-2xl">
                  <p className="text-sm font-light uppercase tracking-[0.35em] text-white/70">
                    AI AUTOMATION STUDIO
                  </p>
                  <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.06em]">
                    비즈니스의 모든 과정을 AI로 자동화합니다.
                  </h1>
                  <p className="mt-6 max-w-xl text-lg font-light leading-8 text-white/75">
                    상담, 견적, 콘텐츠, 예약, 응답까지 하나의 시스템으로 묶어 운영을 가볍게 만듭니다.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href="#portfolio"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:scale-105"
                    >
                      포트폴리오 보기
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={KAKAO_OPENCHAT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:border-emerald-500/40 hover:bg-white/10"
                    >
                      지금 상담하기
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="mx-auto flex max-w-sm justify-center">
                  <div className="rounded-full border-4 border-white/90 bg-[#0b1220] p-8 shadow-2xl shadow-black/30">
                    <div className="flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-emerald-500/80 text-center">
                      <div className="text-3xl font-black leading-none text-white">
                        S
                        <br />
                        AI
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.12}>
              <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:grid-cols-4">
                {serviceCards.map((item) => (
                  <div key={item.title} className="bg-[#f8fafc] p-6 text-center text-slate-900">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/15 text-emerald-600">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-sm font-black tracking-[0.18em] text-slate-900">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="services" className="bg-[#0f172a] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-xl">
                <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
                  Services
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                  초보 고객도 바로 이해하는 자동화 구조
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: PenTool,
                  title: '기획 정리',
                  desc: '복잡한 요구사항을 상담 질문지로 정리합니다.',
                },
                {
                  icon: Rocket,
                  title: '빠른 구축',
                  desc: '필요한 기능만 묶어 빠르게 런칭합니다.',
                },
                {
                  icon: CircleCheckBig,
                  title: '견적 안내',
                  desc: '단가와 옵션을 쉽게 확인할 수 있게 구성합니다.',
                },
                {
                  icon: Building2,
                  title: '신뢰 설계',
                  desc: '후기, 실적, 로고를 배치해 신뢰를 만듭니다.',
                },
              ].map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.05}>
                  <ServiceCard icon={item.icon} title={item.title} desc={item.desc} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-[#0f172a] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
                    Portfolio
                  </p>
                  <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                    실제 사례로 보여주는 설득력
                  </h2>
                </div>
                <p className="max-w-2xl text-lg font-light leading-8 text-white/70">
                  상담형 홈페이지, 무인 운영 시스템, 교육 업종, 소상공인 랜딩까지 다양한 사례를
                  시안과 함께 정리했습니다.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="grid gap-6">
                {portfolioItems.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActivePortfolio(item)}
                    className={`overflow-hidden rounded-[2rem] border text-left transition hover:-translate-y-1 hover:shadow-xl ${
                      activePortfolio.title === item.title
                        ? 'border-emerald-500/30 shadow-lg'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/75">
                          0{index + 1}
                        </div>
                        <div className="mt-2 text-2xl font-black">{item.title}</div>
                        <div className="mt-2 text-sm font-light text-white/80">{item.tag}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <ScrollReveal delay={0.08}>
                <div className="sticky top-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111827] shadow-sm">
                  <img
                    src={activePortfolio.image}
                    alt={activePortfolio.title}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="p-8">
                    <div className="text-xs uppercase tracking-[0.35em] text-emerald-400">
                      Featured Case
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                      {activePortfolio.title}
                    </h3>
                    <p className="mt-4 text-base font-light leading-8 text-white/70">
                      {activePortfolio.tag} 형태로 정리된 사례입니다. 대표 업종에 맞춰 구조와 CTA를
                      다르게 설계합니다.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="proof" className="bg-[#111827] px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[#0b1220] px-8 py-14 shadow-[0_24px_60px_rgba(0,0,0,0.2)] lg:px-12">
            <ScrollReveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
                  Trust Indicator
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">
                  믿고 맡길 수 있는 완성도
                </h2>
                <p className="mt-5 font-light text-white/75">
                  프로젝트 수, 파트너 수, 만족도 중심으로 실적을 한 번에 보여줍니다.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {stats.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 0.06}>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <CountUpStat value={item.value} label={item.label} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0f172a] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center">
                <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
                  Trusted by
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white md:text-4xl">
                  SULAB과 함께하는 기업들
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-light text-white/65">
                  다양한 업종에서 쌓은 협업 흐름을 로고 티커로 보여줍니다.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-10 overflow-hidden border-y border-white/10 py-8">
              <div
                className="flex w-max gap-6"
                style={{ animation: 'ticker 26s linear infinite' }}
              >
                {tickerItems.map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black uppercase text-slate-400 shadow-sm"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#0f172a] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[#111827] px-8 py-14 text-white lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                  고퀄리티 홈페이지로 브랜드 경쟁력을 높이고 싶다면?
                </h2>
              </div>
              <a
                href={KAKAO_OPENCHAT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-emerald-500 px-8 py-4 text-sm font-semibold text-[#0f172a] transition hover:scale-105"
              >
                문의하기
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <RightRail />
      <RotatingSignature />

      <footer className="border-t border-white/10 bg-[#0f172a] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <span>SULAB AI</span>
          <span>Premium AI automation studio for business growth.</span>
        </div>
      </footer>
    </div>
  )
}
