import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import siteData from '../site.config.json'

type PlannerResult = {
  schedule: Array<{
    focus: string
    task: string
    time: string
  }>
  summary: string
  tips: string[]
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-2.5-flash'
const HERO_SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const smoothReveal = [0.22, 1, 0.36, 1] as const

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

function extractCandidateText(response: GeminiGenerateContentResponse) {
  return (
    response.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('')
      .trim() ?? ''
  )
}

function extractJsonBlock(text: string) {
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) {
    return fenced[1]
  }

  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1)
  }

  return text
}

function normalizePlannerResult(value: unknown): PlannerResult {
  const fallback: PlannerResult = {
    summary: '학습 목표에 맞춘 1일 집중 루틴입니다.',
    tips: [],
    schedule: [],
  }

  if (!value || typeof value !== 'object') {
    return fallback
  }

  const candidate = value as Partial<PlannerResult>

  return {
    summary:
      typeof candidate.summary === 'string' && candidate.summary.trim()
        ? candidate.summary.trim()
        : fallback.summary,
    tips: Array.isArray(candidate.tips)
      ? candidate.tips.filter((tip): tip is string => typeof tip === 'string')
      : fallback.tips,
    schedule: Array.isArray(candidate.schedule)
      ? candidate.schedule.filter(
          (
            item,
          ): item is {
            focus: string
            task: string
            time: string
          } =>
            Boolean(
              item &&
                typeof item === 'object' &&
                typeof item.time === 'string' &&
                typeof item.task === 'string' &&
                typeof item.focus === 'string',
            ),
        )
      : fallback.schedule,
  }
}

function buildPlannerPrompt(goal: string) {
  return [
    '너는 학습 효율을 높이는 한국어 학습 코치다.',
    `공간 컨셉: ${siteData.site_info.site_name}`,
    `사용자 목표: ${goal}`,
    '조건:',
    '- 오늘 하루 기준 1일 학습 계획표를 짠다.',
    '- 현실적인 시간 블록 5~7개로 나눈다.',
    '- 각 블록은 시간(time), 할 일(task), 집중 포인트(focus)를 포함한다.',
    '- 결과는 반드시 JSON 객체만 반환한다.',
    '- JSON 스키마: {"summary":"string","tips":["string"],"schedule":[{"time":"string","task":"string","focus":"string"}]}',
    '- 설명 문장, 코드블록 마크다운, 추가 텍스트는 넣지 않는다.',
  ].join('\n')
}

export default function App() {
  const [goal, setGoal] = useState('')
  const [plan, setPlan] = useState<PlannerResult | null>(null)
  const [plannerError, setPlannerError] = useState<string | null>(null)
  const [isPlannerLoading, setIsPlannerLoading] = useState(false)
  const heroImageUrl = HERO_SAMPLE_IMAGE

  const geminiEnabled = Boolean(GEMINI_API_KEY)

  useEffect(() => {
    document.title = siteData.site_info.site_name
    ensureMetaTag('description', siteData.meta_description)
    ensureMetaTag('keywords', siteData.seo_keywords.join(', '))
    ensureMetaTag('og:title', siteData.site_info.site_name, 'property')
    ensureMetaTag('og:description', siteData.meta_description, 'property')
  }, [])

  async function handlePlannerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedGoal = goal.trim()

    if (!trimmedGoal) {
      setPlannerError('목표를 입력해 주세요.')
      return
    }

    if (!geminiEnabled) {
      setPlannerError('VITE_GEMINI_API_KEY 설정이 필요합니다.')
      return
    }

    try {
      setIsPlannerLoading(true)
      setPlannerError(null)

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: buildPlannerPrompt(trimmedGoal),
                  },
                ],
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Gemini request failed with ${response.status}`)
      }

      const data = (await response.json()) as GeminiGenerateContentResponse
      const text = extractCandidateText(data)

      if (!text) {
        throw new Error('Gemini returned an empty response.')
      }

      const parsed = JSON.parse(extractJsonBlock(text))
      setPlan(normalizePlannerResult(parsed))
    } catch (error) {
      setPlan(null)
      setPlannerError(
        error instanceof Error ? error.message : '학습 계획을 생성하지 못했습니다.',
      )
    } finally {
      setIsPlannerLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="flex items-center justify-between border-b bg-white p-6 shadow-sm">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: siteData.site_info.main_color }}
          >
            {siteData.site_info.site_name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Image keyword: {siteData.image_keyword}
          </p>
        </div>
      </nav>

      <header
        className="relative overflow-hidden bg-slate-900 px-6 py-24 text-white"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: smoothReveal }}
        >
          <motion.h2
            className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-6xl"
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.05, ease: smoothReveal }}
          >
            {siteData.hero.title}
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/85"
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.18, ease: smoothReveal }}
          >
            {siteData.hero.subtitle}
          </motion.p>
          <motion.button
            className="rounded-xl px-10 py-4 text-lg font-bold text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-all hover:brightness-110"
            style={{ backgroundColor: siteData.site_info.main_color }}
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.3, ease: smoothReveal }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.16), 0 0 28px rgba(255,255,255,0.22), 0 18px 50px rgba(0,0,0,0.32)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {siteData.hero.cta_button}
          </motion.button>
        </motion.div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
        {siteData.services.map((service, index) => (
          <motion.div
            key={index}
            className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50 transition-transform hover:-translate-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.65, delay: index * 0.12, ease: smoothReveal }}
          >
            <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
            <p className="text-lg leading-relaxed text-gray-500">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="border-t border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: siteData.site_info.main_color }}
            >
              AI 학습 플래너
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-900">
              오늘 목표만 입력하면 1일 학습 계획표를 바로 생성합니다.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
              공부할 과목, 시험 일정, 오늘 확보한 시간을 입력하면 Gemini가 집중도
              흐름까지 고려한 하루 루틴을 제안합니다.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handlePlannerSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  오늘의 목표
                </span>
                <textarea
                  className="min-h-36 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-teal-700"
                  placeholder="예: 토익 900점 목표로 LC 2세트와 RC 문법 복습, 저녁에 오답정리까지 끝내고 싶어요."
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="submit"
                  className="rounded-xl px-6 py-3 text-base font-bold text-white shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: siteData.site_info.main_color }}
                  disabled={isPlannerLoading}
                  whileHover={
                    isPlannerLoading
                      ? undefined
                      : {
                          scale: 1.03,
                          boxShadow:
                            '0 0 0 1px rgba(255,255,255,0.12), 0 0 24px rgba(255,255,255,0.18), 0 14px 40px rgba(0,0,0,0.2)',
                        }
                  }
                  whileTap={isPlannerLoading ? undefined : { scale: 0.98 }}
                >
                  {isPlannerLoading ? '계획 생성 중...' : 'AI 계획표 만들기'}
                </motion.button>
                <p className="text-sm text-gray-500">
                  {geminiEnabled
                    ? 'Gemini API가 연결되어 있습니다.'
                    : 'VITE_GEMINI_API_KEY를 설정하면 기능이 활성화됩니다.'}
                </p>
              </div>

              {plannerError ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {plannerError}
                </p>
              ) : null}
            </form>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-xl shadow-gray-200/60">
            {plan ? (
              <div>
                <h3 className="text-2xl font-black text-gray-900">오늘의 학습 로드맵</h3>
                <p className="mt-3 text-base leading-7 text-gray-600">{plan.summary}</p>

                <div className="mt-8 space-y-4">
                  {plan.schedule.map((item, index) => (
                    <div
                      key={`${item.time}-${index}`}
                      className="rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <div className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        {item.time}
                      </div>
                      <div className="mt-2 text-xl font-bold text-gray-900">
                        {item.task}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-gray-500">
                        집중 포인트: {item.focus}
                      </div>
                    </div>
                  ))}
                </div>

                {plan.tips.length ? (
                  <div className="mt-8">
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
                      집중 팁
                    </h4>
                    <ul className="mt-4 space-y-3 text-base leading-7 text-gray-600">
                      {plan.tips.map((tip, index) => (
                        <li key={index} className="rounded-xl bg-white px-4 py-3">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex h-full min-h-80 items-center justify-center rounded-[1.5rem] border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                목표를 입력하면 이 영역에 1일 학습 계획표가 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
