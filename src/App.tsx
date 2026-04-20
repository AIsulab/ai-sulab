import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleHelp,
  MessageCircleMore,
  PlayCircle,
  Sparkles,
  Workflow,
} from 'lucide-react'

const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/siMggc8f'

const industries = [
  { label: '무인 카페', base: 450 },
  { label: 'AI 교육 플랫폼', base: 650 },
  { label: 'SaaS 서비스', base: 980 },
  { label: '쿠팡 파트너스', base: 380 },
  { label: '기획/마케팅 대행', base: 520 },
]

const features = [
  { id: 'chatbot', label: '챗봇', add: 180 },
  { id: 'youtube', label: '유튜브 자동화', add: 260 },
  { id: 'coupang', label: '쿠팡파트너스', add: 220 },
  { id: 'saas', label: 'SaaS', add: 420 },
]

const budgets = [
  { label: '300만원', value: 300 },
  { label: '500만원', value: 500 },
  { label: '1000만원', value: 1000 },
  { label: '2000만원', value: 2000 },
]

const serviceCards = [
  {
    icon: PlayCircle,
    title: '유튜브 자동화',
    desc: '콘텐츠 기획부터 발행 흐름까지 자동화해 반복 작업을 줄이고 운영 효율을 끌어올립니다.',
  },
  {
    icon: Sparkles,
    title: 'AI 콘텐츠 생성',
    desc: '브랜드 메시지에 맞춰 소개글, 상세페이지, 광고 문구를 빠르게 생성하는 파이프라인을 구축합니다.',
  },
  {
    icon: Workflow,
    title: 'SaaS형 자동화 시스템',
    desc: '반복되는 업무를 제품처럼 묶어, 고객이 실제로 쓰는 자동화 도구로 확장합니다.',
  },
]

const proofItems = [
  { value: 150, label: '프로젝트' },
  { value: 99, label: '만족도' },
  { value: 80, label: '파트너' },
]

const processSteps = [
  {
    step: '01',
    title: '기획',
    desc: '문제를 정리하고 자동화 범위를 빠르게 정의합니다.',
  },
  {
    step: '02',
    title: '개발',
    desc: '실행 가능한 구조로 설계하고 필요한 기능을 구현합니다.',
  },
  {
    step: '03',
    title: '완료',
    desc: '배포와 운영 가이드를 정리해 바로 쓸 수 있게 마무리합니다.',
  },
]

const faqItems = [
  {
    q: '견적은 어떻게 산출되나요?',
    a: '선택한 업종, 기능, 예산을 기준으로 실시간 예상 범위를 보여드립니다.',
  },
  {
    q: '챗봇도 같이 만들 수 있나요?',
    a: '가능합니다. FAQ 안내부터 오픈톡 유도까지 하나의 흐름으로 연결할 수 있습니다.',
  },
  {
    q: '바로 상담하려면 어떻게 하나요?',
    a: '오픈톡 버튼을 누르면 바로 1:1 상담 채팅으로 이동합니다.',
  },
]

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

function CountUp({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 1200
    const step = Math.max(1, Math.floor(value / (duration / 16)))
    const timer = window.setInterval(() => {
      current += step
      if (current >= value) {
        setCount(value)
        window.clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 16)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center">
      <div className="text-5xl font-black tracking-[-0.04em] text-white md:text-6xl">
        {count}
        {label === '만족도' ? '%' : '+'}
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/60">{label}</p>
    </div>
  )
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-[1.6] text-white/70 md:text-lg">
        {subtitle}
      </p>
    </div>
  )
}

function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(faqItems[0])

  useBodyLock(open)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-[#0f172a] shadow-2xl shadow-emerald-500/20 transition hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircleMore className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[22rem] rounded-[1.5rem] border border-white/10 bg-white p-4 text-slate-900 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">AI Chat</p>
                <h3 className="mt-1 text-lg font-black">SULAB AI 상담 비서</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm leading-[1.6] text-slate-700">
                안녕하세요. 궁금한 내용을 먼저 확인하고, 마지막에는 바로 오픈톡으로 연결됩니다.
              </p>
            </div>

            <div className="mt-4 grid gap-2">
              {faqItems.map((item) => (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setActiveFaq(item)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    activeFaq.q === item.q
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.q}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Answer</p>
              <p className="mt-2 text-sm leading-[1.6] text-slate-700">{activeFaq.a}</p>
            </div>

            <a
              href={KAKAO_OPENCHAT_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
            >
              오픈톡으로 상담하기
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function EstimateEngine() {
  const [industry, setIndustry] = useState(industries[0].label)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['chatbot'])
  const [budget, setBudget] = useState(budgets[1].value)

  const estimate = useMemo(() => {
    const industryBase = industries.find((item) => item.label === industry)?.base ?? 0
    const featureCost = features
      .filter((feature) => selectedFeatures.includes(feature.id))
      .reduce((sum, feature) => sum + feature.add, 0)

    return industryBase + featureCost
  }, [industry, selectedFeatures])

  const budgetGap = budget - estimate

  const toggleFeature = (id: string) => {
    setSelectedFeatures((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:col-span-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              업종
            </span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            >
              {industries.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              예산
            </span>
            <select
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            >
              {budgets.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            필요 기능
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {features.map((feature) => {
              const active = selectedFeatures.includes(feature.id)
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleFeature(feature.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? 'border-emerald-400 bg-emerald-500/10 text-white'
                      : 'border-white/10 bg-[#111827] text-white/80 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{feature.label}</span>
                    {active ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : null}
                  </div>
                  <p className="mt-2 text-xs text-white/55">+{feature.add}만원</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-4 text-sm leading-[1.6] text-white/60">
          업종과 기능을 고르면 대략적인 예상 견적 범위를 바로 확인할 수 있습니다.
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#111827] p-6 lg:col-span-5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
          예상 견적
        </p>
        <div className="mt-4 text-5xl font-black tracking-[-0.06em] text-white">
          {estimate.toLocaleString()}만원
        </div>

        <div className="mt-5 space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-white/75">
          <div className="flex items-center justify-between gap-4">
            <span>업종 기본가</span>
            <span>{industries.find((item) => item.label === industry)?.base ?? 0}만원</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>기능 추가비</span>
            <span>
              {features
                .filter((feature) => selectedFeatures.includes(feature.id))
                .reduce((sum, feature) => sum + feature.add, 0)}
              만원
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
            <span>예산 비교</span>
            <span className={budgetGap >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {budgetGap >= 0 ? `예산 내 여유 ${budgetGap}만원` : `예산 초과 ${Math.abs(budgetGap)}만원`}
            </span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-[1.6] text-white/65">
          실제 상담에서는 목표, 일정, 운영 방식에 따라 최종 견적을 조정합니다.
        </p>

        <a
          href={KAKAO_OPENCHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#0f172a] transition hover:scale-[1.01]"
        >
          이 견적으로 상담하기
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    document.title = 'SULAB AI | Revenue Automation'
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0f172a] text-white">
      <main>
        <section className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-12 lg:col-span-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
                SULAB AI
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] md:text-6xl">
                AI 자동화로 대표님의 시간을 10배로 늘려드립니다.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-white/70">
                기획부터 구축, 운영까지 SULAB이 책임지는 1인 AI 자동화 파이프라인.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#estimate"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:scale-105"
                >
                  견적 확인
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={KAKAO_OPENCHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400 hover:bg-white/5"
                >
                  상담하기
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 lg:col-span-5"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="aspect-[4/5] rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
                  <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-[#111827]/70 p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                        Revenue Engine
                      </div>
                      <Bot className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/50">업종</p>
                        <p className="mt-2 text-lg font-semibold">무인 카페 / 교육 / SaaS</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                          자동화 기능
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          챗봇 · 유튜브 자동화 · 콘텐츠 생성 · 시스템 구축
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-emerald-500/10 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                          Projects
                        </p>
                        <p className="mt-2 text-3xl font-black">150+</p>
                      </div>
                      <div className="rounded-2xl bg-emerald-500/10 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                          Satisfaction
                        </p>
                        <p className="mt-2 text-3xl font-black">99%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="estimate" className="py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="AI Estimate Engine"
              title="업종과 기능을 고르면 실시간으로 예상 견적이 산출됩니다."
              subtitle="상담 전 대략적인 비용 구조를 바로 확인할 수 있도록 단순하고 명확한 견적 흐름으로 설계했습니다."
            />
            <div className="mt-10">
              <EstimateEngine />
            </div>
          </div>
        </section>

        <section id="services" className="py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Solution"
              title="대표 서비스는 3개의 핵심 축으로 정리했습니다."
              subtitle="서비스 범위를 복잡하게 늘리지 않고, 실제로 문의가 많이 들어오는 영역만 선명하게 보여줍니다."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {serviceCards.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.6] text-white/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <SectionTitle
                  eyebrow="Social Proof"
                  title="숫자가 신뢰를 만듭니다."
                  subtitle="프로젝트와 만족도 수치는 실제 작업 경험과 운영 역량을 빠르게 보여주는 신호입니다."
                />
              </div>
              <div className="lg:col-span-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {proofItems.map((item) => (
                    <CountUp key={item.label} value={item.value} label={item.label} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16">
              <SectionTitle
                eyebrow="Process"
                title="기획 - 개발 - 완료, 세 단계로 단순하게 진행합니다."
                subtitle="복잡한 설명보다 실제로 이해하기 쉬운 진행 구조를 먼저 보여줍니다."
              />
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
                      {step.step}
                    </p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.6] text-white/70">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-4">
              <SectionTitle
                eyebrow="FAQ"
                title="자주 묻는 질문도 먼저 정리합니다."
                subtitle="상담 전 반복되는 질문을 줄여서 고객이 더 빠르게 판단할 수 있도록 돕습니다."
              />
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-4">
                {faqItems.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-start gap-3">
                      <CircleHelp className="mt-0.5 h-5 w-5 text-emerald-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                        <p className="mt-2 text-sm leading-[1.6] text-white/70">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
                    Contact
                  </p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white md:text-4xl">
                    고퀄리티 홈페이지로 브랜드 경쟁력을 높이고 싶다면?
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-[1.6] text-white/70 md:text-base">
                    견적 상담부터 기획안 초안까지, 바로 오픈톡으로 연결됩니다.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <a
                    href={KAKAO_OPENCHAT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-[#0f172a] transition hover:scale-105"
                  >
                    문의하기
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingChat />
    </div>
  )
}
