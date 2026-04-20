import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  MessageCircle,
  Monitor,
  Zap,
} from 'lucide-react'

const openChatUrl = 'https://open.kakao.com/o/siMggc8f'

const navItems = [
  { href: '#about', label: 'About SULAB' },
  { href: '#solutions', label: 'AI Solutions' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

const solutions = [
  {
    icon: Monitor,
    title: '전문가형 웹 구축',
    description:
      '누끼토끼 같은 신뢰 구조와 프리미엄 여백 설계를 바탕으로 고관여 고객이 바로 이해하는 사이트를 만듭니다.',
  },
  {
    icon: Cpu,
    title: 'AI 자동화 시스템',
    description:
      '상담, 예약, 콘텐츠 운영, 리드 수집까지 반복 업무를 자동화해 대표님의 시간을 구조적으로 줄입니다.',
  },
  {
    icon: Zap,
    title: '전환 중심 운영 설계',
    description:
      '오픈톡, 견적, 사례, CTA 동선을 하나의 흐름으로 정리해 문의 전환율을 높이는 방향으로 설계합니다.',
  },
]

const portfolioItems = [
  {
    title: '강남역 24시 무인 스터디카페',
    tags: ['랜딩페이지', '예약시스템', 'AI자동화'],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'AI 교육 플랫폼 브랜딩',
    tags: ['교육서비스', '브랜드사이트', '상담전환'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: '병원 프리미엄 예약 페이지',
    tags: ['의료', '예약시스템', '모바일최적화'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'AI 음악 학원 소개 사이트',
    tags: ['교육', '상담유도', '브랜딩'],
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: '수익형 블로그 자동화 허브',
    tags: ['콘텐츠자동화', '리드수집', '운영대시보드'],
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'B2B 에이전시 포트폴리오',
    tags: ['회사소개', '포트폴리오', '세일즈'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400',
  },
]

const partnerLogos = [
  'OPENAI',
  'NOTION',
  'SLACK',
  'GOOGLE',
  'YOUTUBE',
  'COUPANG',
  'IMWEB',
  'FIGMA',
  'META ADS',
  'SHOPIFY',
  'STRIPE',
  'WEBFLOW',
  'AIRTABLE',
  'MAKE',
  'ZAPIER',
  'GA4',
  'MAILCHIMP',
  'TALLY',
  'TYPEFORM',
  'HUBSPOT',
]

function FadeUp({
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
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

function StatCounter({
  end,
  suffix = '+',
  label,
}: {
  end: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) {
      return
    }

    let frame = 0
    let animationFrame = 0
    const totalFrames = 60

    const animate = () => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(end * eased))

      if (frame < totalFrames) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [end, inView])

  return (
    <div ref={ref} className="text-center p-8">
      <div className="mb-2 text-5xl font-black text-emerald-400 md:text-6xl">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-slate-300">{label}</div>
    </div>
  )
}

export default function App() {
  const repeatedLogos = [...partnerLogos, ...partnerLogos]

  useEffect(() => {
    document.title = 'SULAB AI | Premium Automation Studio'
  }, [])

  return (
    <div className="bg-white font-sans text-slate-900">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="font-brand text-2xl uppercase tracking-[0.22em] text-slate-900">
            SULAB AI
          </a>

          <div className="hidden items-center gap-10 text-sm font-semibold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-emerald-500">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={openChatUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105 hover:bg-emerald-700"
          >
            시작하기
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="px-6 pb-20 pt-40">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto mb-8 max-w-6xl text-6xl font-black leading-[0.92] tracking-tight md:text-8xl"
            >
              대표님들의 <span className="text-emerald-500">시간</span>을
              <br />
              아껴드립니다.
            </motion.h1>

            <p className="mx-auto mb-12 max-w-3xl text-xl leading-9 text-slate-500">
              고객 맞춤형 AI 자동화 시스템과 프리미엄 웹 디자인으로
              <br />
              비즈니스의 가치를 한 단계 더 높여드립니다.
            </p>

            <div className="flex justify-center gap-4">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:scale-105"
              >
                서비스 알아보기 <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="overflow-hidden border-y border-slate-100 bg-slate-50 py-10">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="mx-12 flex items-center text-2xl font-bold tracking-[0.24em] text-slate-300 opacity-70"
              >
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
            <StatCounter end={150} label="누적 프로젝트" />
            <StatCounter end={80} label="함께한 파트너" />
            <StatCounter end={99} suffix="%" label="고객 만족도" />
          </div>
        </section>

        <section id="solutions" className="px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <div className="mb-16 max-w-3xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-emerald-600">
                  AI Solutions
                </p>
                <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                  AI 수튜디오의 핵심은
                  <br />
                  보기 좋은 디자인에서 끝나지 않습니다.
                </h2>
              </div>
            </FadeUp>

            <div className="grid gap-8 md:grid-cols-3">
              {solutions.map((item, index) => {
                const Icon = item.icon
                return (
                  <FadeUp key={item.title} delay={index * 0.08}>
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                      <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                        <Icon size={28} />
                      </div>
                      <h3 className="mb-4 text-2xl font-black tracking-tight">{item.title}</h3>
                      <p className="leading-8 text-slate-600">{item.description}</p>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">PORTFOLIO</h2>
                  <p className="text-lg text-slate-500">
                    SULAB이 완성한 전문가형 AI 웹 솔루션 사례입니다.
                  </p>
                </div>
                <a
                  href={openChatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit border-b-2 border-emerald-600 pb-1 font-bold text-emerald-600"
                >
                  더 보기
                </a>
              </div>
            </FadeUp>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <FadeUp key={item.title} delay={index * 0.06}>
                  <article className="group cursor-pointer">
                    <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-all group-hover:opacity-100">
                        <span className="text-lg font-bold text-white">자세히 보기</span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                    <p className="text-slate-400">
                      {item.tags.map((tag) => `#${tag}`).join(' ')}
                    </p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-28">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-r from-emerald-600 to-slate-900 px-8 py-14 text-white md:px-14 md:py-20">
            <FadeUp>
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-emerald-100">
                    Contact
                  </p>
                  <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                    고퀄리티 홈페이지로 브랜드 경쟁력을 높이고 싶다면?
                  </h2>
                  <div className="mt-6 flex items-center gap-2 text-emerald-100">
                    <CheckCircle2 size={18} />
                    <span>오픈톡으로 바로 연결되는 1:1 상담 동선 포함</span>
                  </div>
                </div>

                <a
                  href={openChatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:scale-105"
                >
                  문의하기
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <a
        href={openChatUrl}
        target="_blank"
        rel="noreferrer"
        className="group fixed bottom-10 right-10 z-[100] flex items-center gap-2 rounded-2xl bg-[#FAE100] p-4 shadow-2xl transition-transform hover:scale-110"
      >
        <MessageCircle fill="black" />
        <span className="max-w-0 overflow-hidden font-bold text-black transition-all duration-500 group-hover:max-w-xs">
          오픈톡 문의
        </span>
      </a>
    </div>
  )
}
