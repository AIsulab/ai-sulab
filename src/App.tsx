import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'

const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/siMggc8f'
const companyName = 'AI 수튜디오 SULAB'

const navItems = [
  { href: '#service', label: '서비스' },
  { href: '#portfolio', label: '제작사례' },
  { href: '#media', label: '미디어' },
  { href: '#contact', label: '작업문의' },
  { href: '#faq', label: 'FAQ' },
  { href: '#class', label: '클래스' },
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
  'STRIPE',
  'SHOPIFY',
  'AIRTABLE',
  'MAKE',
  'ZAPIER',
  'WEBFLOW',
  'HUBSPOT',
  'GA4',
  'MAILCHIMP',
  'TALLY',
  'TYPEFORM',
  'FRAMER',
]

const stats = [
  { value: 150, suffix: '+', label: '누적 프로젝트' },
  { value: 80, suffix: '+', label: '함께한 클라이언트' },
  { value: 99, suffix: '%', label: '고객 만족도' },
]

const featuredCases = [
  {
    title: '강남역 24시 무인 스터디카페',
    category: 'Premium Landing',
    description:
      '무인 운영과 실시간 문의 전환을 한 화면에 담은 고신뢰 랜딩 구조입니다.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'AI 교육 플랫폼',
    category: 'Education Brand',
    description:
      '교육 서비스의 전문성을 강조하고 상담 전환을 높이는 구조로 설계했습니다.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: '병원 예약 페이지',
    category: 'Booking System',
    description:
      '예약과 문의를 한 흐름으로 이어주는 의료 특화 전환형 페이지입니다.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'AI 음악 학원',
    category: 'Creative Education',
    description:
      '브랜드 감도와 상담 흐름을 동시에 잡는 감성형 교육 사이트입니다.',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: '수익형 블로그 자동화 허브',
    category: 'Automation',
    description:
      '콘텐츠 생성과 운영 효율을 강조한 AI 자동화형 서비스 허브입니다.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1600',
  },
  {
    title: 'B2B 에이전시 소개',
    category: 'Corporate Website',
    description:
      '전문성, 신뢰, 문의 전환이 모두 드러나는 기업형 소개 페이지입니다.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
  },
]

const caseTiles = [
  'Oompaa',
  '시선뉴스',
  '롯데한국후지필름',
  'CATE',
  'ROND',
  '한국소프트웨어산업협회',
  '리바이오',
  '비주얼아카데미',
  '공간D',
  '청소나이스',
  'GHL Medical',
  'Buildnity',
]

const faqItems = [
  {
    question: '제작 기간은 얼마나 소요되나요?',
    answer:
      '프로젝트 규모에 따라 다르지만, 보통 기획 확정 후 시안 제작과 수정, 최종 반영까지 단계적으로 진행합니다.',
  },
  {
    question: '수정은 몇 회까지 가능한가요?',
    answer:
      '기본 제공 수정 횟수 안에서 진행하고, 범위를 초과하는 요청은 별도 협의 후 반영합니다.',
  },
  {
    question: '홈페이지 기획도 함께 가능한가요?',
    answer:
      '가능합니다. 사이트맵, 와이어프레임, 전환 흐름까지 포함한 기획을 함께 설계합니다.',
  },
  {
    question: '정기 유지보수도 되나요?',
    answer:
      '네. 운영형 사이트는 정기 유지보수와 콘텐츠 관리, 배포 후 안정화까지 지원합니다.',
  },
]

const classCourses = [
  '누끼토끼 AI 웹클래스',
  '고단가 견적서 전략',
  '아임웹 실전 제작',
  'AI 자동화 콘텐츠 설계',
]

const testimonials = [
  '“설명 없이도 구조가 믿음직스럽게 정리되어 상담 전환이 빨라졌습니다.”',
  '“브랜드 톤이 깔끔하고 전문적이라 바로 신뢰가 생겼습니다.”',
  '“기획부터 수정까지 흐름이 명확해서 진행이 수월했습니다.”',
]

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
        {title}
      </h2>
      {description ? <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p> : null}
    </div>
  )
}

function CountUp({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let frame = 0
    const totalFrames = 55
    let animationFrame = 0

    const animate = () => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(value * eased))

      if (frame < totalFrames) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [value])

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

function AccordionItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left transition hover:border-emerald-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-slate-900">{question}</div>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 overflow-hidden text-base leading-7 text-slate-600"
              >
                {answer}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 flex-none text-slate-400 transition ${open ? 'rotate-180' : ''}`}
        />
      </div>
    </button>
  )
}

function FloatingKakaoButton() {
  return (
    <a
      href={KAKAO_OPENCHAT_URL}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-2xl bg-[#FEE500] px-4 py-4 text-sm font-bold text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.18)] transition-all hover:scale-105 hover:shadow-[0_30px_80px_rgba(15,23,42,0.24)]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[9rem]">
        오픈톡 문의
      </span>
    </a>
  )
}

function PortfolioRail() {
  const [index, setIndex] = useState(0)
  const total = featuredCases.length
  const visible = [index, (index + 1) % total, (index + 2) % total]

  const prev = () => setIndex((current) => (current - 1 + total) % total)
  const next = () => setIndex((current) => (current + 1) % total)

  return (
    <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
          01 - 10
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {visible.map((itemIndex) => {
          const item = featuredCases[itemIndex]
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="border-t border-slate-200 p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  {item.category}
                </div>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const ticker = useMemo(() => [...partnerLogos, ...partnerLogos], [])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = `${companyName} | 홈페이지 제작`
  }, [])

  return (
    <div className="bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#top"
            className="font-brand text-2xl uppercase tracking-[0.24em] text-slate-900"
          >
            AI SULAB
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={KAKAO_OPENCHAT_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 hover:scale-105"
          >
            상담하기
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8 lg:pt-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                대표님의 비즈니스를 위한 선택
              </p>
              <h1 className="mt-8 max-w-4xl text-6xl font-black leading-[0.92] tracking-tight md:text-8xl">
                대표님들의
                <span className="text-emerald-500"> 시간을</span>
                <br />
                아껴드립니다.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-500">
                고객 맞춤형 디자인과 AI 자동화 시스템으로 비즈니스의 가치를 한 단계 더 높여드립니다.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 font-bold text-white transition hover:scale-105"
                >
                  자세히 알아보기 <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={KAKAO_OPENCHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-900 px-7 py-4 font-bold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                >
                  작업문의
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-50 p-5">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <div className="mt-4 text-2xl font-black tracking-tight">맞춤형 전략</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    업종과 목적에 맞는 구조로 바로 설계합니다.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5">
                  <Zap className="h-6 w-6 text-emerald-500" />
                  <div className="mt-4 text-2xl font-black tracking-tight">빠른 제작</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    전환 흐름을 먼저 정리하고 제작 속도를 높입니다.
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-[1.5rem] bg-slate-900 px-6 py-6 text-white">
                <div className="text-sm uppercase tracking-[0.18em] text-emerald-300">
                  NOOKITOKKI STYLE
                </div>
                <p className="mt-3 text-base leading-7 text-slate-200">
                  누끼토끼에서 확인되는 신뢰감 있는 구조와 기능을 AI 수튜디오 기준으로 재해석했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-slate-200 bg-slate-50 py-6">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
          >
            {ticker.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex min-w-[11rem] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </section>

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="왜 선택할까요"
              title="신뢰감 있는 구조와 설득력 있는 흐름으로"
              description="누끼토끼처럼 훑어보기만 해도 믿음이 생기는 레이아웃을 유지하면서, AI 수튜디오의 자동화 역량과 상담 전환 기능을 함께 넣었습니다."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: CheckCircle2,
                  title: '전문가형 신뢰 구조',
                  text: '대표님들이 가장 먼저 보는 첫인상을 안정적으로 구성합니다.',
                },
                {
                  icon: Star,
                  title: '실적 기반 사회적 증거',
                  text: '숫자, 사례, 후기, 로고를 함께 배치해 신뢰를 빠르게 만듭니다.',
                },
                {
                  icon: Zap,
                  title: '전환 동선 최적화',
                  text: '문의하기, 오픈톡, 견적 시스템을 한 흐름으로 연결합니다.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                    <div className="inline-flex rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-2xl font-black tracking-tight">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionTitle
                eyebrow="제작사례"
                title="브랜드의 비전을 향상시키는"
                description="실제 마켓플레이스처럼 썸네일을 크게 보여주고, 하단에 프로젝트명과 카테고리를 정리했습니다."
              />
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                01 - 10
              </div>
            </div>
            <PortfolioRail />
          </div>
        </section>

        <section id="media" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="미디어"
              title="누끼토끼가 선택받는 이유를 숫자와 후기, 로고로 보여드립니다"
              description="대표 페이지에 들어가면 먼저 보이는 신뢰 섹션과 고객 후기 흐름을 그대로 재현했습니다."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-6 md:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white"
                  >
                    <div className="text-5xl font-black tracking-tight text-emerald-400">
                      <CountUp value={item.value} suffix={item.suffix} />
                    </div>
                    <div className="mt-3 text-lg text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-4">
                {testimonials.map((quote) => (
                  <div
                    key={quote}
                    className="rounded-[2rem] border border-slate-200 bg-white p-6 text-lg leading-8 text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                  >
                    {quote}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="신뢰받는 선택"
              title="누끼토끼와 함께하는 기업들"
              description="업종을 불문하고 다양한 브랜드와 협력하는 느낌을 그대로 살렸습니다."
            />
            <div className="logo-marquee mt-12">
              <div className="logo-track gap-4">
                {[...caseTiles, ...caseTiles].map((tile, index) => (
                  <div
                    key={`${tile}-${index}`}
                    className="flex min-w-[12rem] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-500"
                  >
                    {tile}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="FAQ"
              title="자주 묻는 질문"
              description="작업 전 준비사항과 진행 방식, 유지보수에 대한 기본 안내를 한눈에 볼 수 있도록 구성했습니다."
            />
            <div className="mt-14 grid gap-4">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        <section id="class" className="bg-white px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Class"
              title="누끼토끼 AI 웹 클래스 느낌의 교육/상품 영역"
              description="교육과 상품 카테고리를 하단에 두어 실제 사이트처럼 확장 가능한 구조로 만들었습니다."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {classCourses.map((course) => (
                <div
                  key={course}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    Class
                  </div>
                  <div className="mt-4 text-2xl font-black tracking-tight">{course}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    실전 제작과 자동화, 고단가 견적 전략까지 다루는 교육형 카드입니다.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.75rem] bg-gradient-to-br from-emerald-600 via-emerald-500 to-slate-900 px-8 py-14 text-white lg:px-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">
                  작업문의
                </p>
                <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                  고퀄리티 홈페이지로
                  <br />
                  비즈니스 경쟁력을 높이고 싶다면?
                </h2>
                <p className="mt-6 text-lg leading-8 text-emerald-50/90">
                  오픈톡으로 바로 연결되는 상담 동선과 함께, 초보 고객도 쉽게 작성할 수 있는 문의 폼을
                  제공하는 구성입니다.
                </p>
                <a
                  href={KAKAO_OPENCHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-bold text-slate-900 transition hover:scale-105"
                >
                  바로 문의하기
                </a>
              </div>

              <form
                className="grid gap-4 rounded-[2rem] bg-white/10 p-6 backdrop-blur"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="업체명" />
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="성함 / 직책" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="연락처" />
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="이메일 주소" />
                </div>
                <textarea
                  className="min-h-32 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none"
                  placeholder="프로젝트에 대해 간단히 설명해주세요"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="벤치마킹 사이트" />
                  <input className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none" placeholder="희망 예산" />
                </div>
                <label className="flex items-start gap-3 text-sm text-emerald-50/90">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-white" />
                  개인정보 수집 및 이용에 동의합니다.
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white transition hover:scale-105"
                >
                  문의 접수하기
                </button>
                <AnimatePresence>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-2xl bg-white/15 px-4 py-3 text-sm text-white"
                    >
                      정상적으로 접수되었습니다.
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-brand text-xl uppercase tracking-[0.24em] text-slate-900">
              AI SULAB
            </div>
            <div className="mt-3 text-sm text-slate-600">
              상호명: {companyName} | 대표자: 이진수
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      <FloatingKakaoButton />
    </div>
  )
}
