import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Menu, X } from 'lucide-react'

const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/siMggc8f'
const HERO_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

const menuItems = [
  { id: 'about', label: 'About' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'request', label: 'Request' },
]

const showcaseProjects = [
  {
    id: 'studio-cafe',
    title: '강남역 24시 무인 스터디카페',
    category: 'Commercial / Landing',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1800',
    summary:
      '고신뢰 랜딩과 예약 동선을 결합한 하이엔드 무인 비즈니스 쇼케이스.',
  },
  {
    id: 'bio',
    title: 'AI 바이오 브랜드',
    category: 'Biotech / Corporate',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1800',
    summary:
      '다크 톤의 정보 구조와 고급 인포그래픽으로 전문성을 강조한 기업형 사이트.',
  },
  {
    id: 'academy',
    title: '프리미엄 AI 아카데미',
    category: 'Education / Experience',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1800',
    summary:
      '전면 이미지와 극단적으로 절제된 타이포만으로 학원 브랜드의 신뢰감을 설계한 구성.',
  },
  {
    id: 'commerce',
    title: '로컬 커머스 브랜드',
    category: 'Commerce / Showcase',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1800',
    summary:
      '상품성보다 분위기를 먼저 보여주는 감각적인 커머스형 그리드 레이아웃.',
  },
]

const solutionBlocks = [
  {
    title: 'About',
    description: 'AI 수튜디오의 철학과 작업 방식',
  },
  {
    title: 'Solutions',
    description: '전환율과 자동화를 동시에 올리는 설계',
  },
  {
    title: 'Request',
    description: '상담과 의뢰를 빠르게 연결하는 흐름',
  },
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

function OutlineTitle() {
  return (
    <div className="relative flex justify-center">
      <svg
        viewBox="0 0 1200 220"
        className="h-auto w-full max-w-5xl"
        aria-label="SULAB AI"
      >
        <defs>
          <linearGradient id="stroke-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <motion.text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-brand fill-none text-[88px] font-light tracking-[0.36em] md:text-[124px]"
          stroke="url(#stroke-gradient)"
          strokeWidth="1.25"
          strokeDasharray="12 10"
          initial={{ strokeDashoffset: 0, opacity: 0.7 }}
          animate={{ strokeDashoffset: -240 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          SULAB AI
        </motion.text>
      </svg>
    </div>
  )
}

function RotatingSignature() {
  const ringText = 'SULAB AI AUTOMATION SYSTEM '

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative h-32 w-32 md:h-40 md:w-40">
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          style={
            {
              animation: 'spin 14s linear infinite',
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path
                id="ring-path"
                d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
              />
            </defs>
            <text className="fill-white/70 text-[14px] uppercase tracking-[0.46em]">
              <textPath href="#ring-path" startOffset="0%">
                {ringText.repeat(2)}
              </textPath>
            </text>
          </svg>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({
  project,
  isActive,
  onSelect,
}: {
  project: (typeof showcaseProjects)[number]
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full overflow-hidden rounded-[2rem] border text-left transition ${
        isActive ? 'border-white/30' : 'border-white/10 opacity-80 hover:opacity-100'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
            isActive ? 'scale-105' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">
            {project.category}
          </div>
          <div className="mt-3 text-2xl font-semibold leading-tight text-white">
            {project.title}
          </div>
          <div className="mt-4 text-sm text-white/65">{project.year}</div>
        </div>
      </div>
    </button>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(showcaseProjects[0].id)

  useBodyLock(menuOpen)

  const activeProject = useMemo(
    () => showcaseProjects.find((project) => project.id === activeProjectId) ?? showcaseProjects[0],
    [activeProjectId],
  )

  useEffect(() => {
    document.title = 'AI SULAB | Design Pixel Inspired'
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed left-0 top-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#top" className="font-brand text-sm uppercase tracking-[0.5em] text-white/90">
            SULAB AI
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/85 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-5 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="font-brand text-sm uppercase tracking-[0.5em] text-white/70">
                  SULAB AI
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  Close
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
                      className="group flex flex-col border-b border-white/10 py-6 text-left"
                    >
                      <span className="font-brand text-[clamp(3rem,8vw,7rem)] font-light tracking-[0.08em] text-white transition group-hover:translate-x-2">
                        {item.label}
                      </span>
                      <span className="mt-2 text-sm uppercase tracking-[0.35em] text-white/35">
                        {item.id}
                      </span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1800"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%)]" />

          <div className="relative z-10 w-full px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="mx-auto max-w-7xl">
              <OutlineTitle />
              <div className="mt-8 flex max-w-2xl flex-wrap items-center gap-4 text-sm uppercase tracking-[0.35em] text-white/55">
                <span>High-End Minimal</span>
                <span className="h-px w-12 bg-white/25" />
                <span>Full Screen VOD</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/45">About</p>
              <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                심플한 레이아웃 안에
                <br />
                신뢰와 밀도를 남깁니다.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-9 text-white/65">
              디자인픽셀처럼 절제된 여백과 강한 대비를 바탕으로, AI 수튜디오의 비즈니스 정체성을
              정리했습니다. 불필요한 장식은 줄이고, 메뉴, 포트폴리오, 요청 동선만 명확하게 남깁니다.
            </p>
          </div>
        </section>

        <section
          id="solutions"
          className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              {solutionBlocks.map((block) => (
                <div
                  key={block.title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/35">
                    {block.title}
                  </div>
                  <div className="mt-4 text-2xl font-light leading-tight text-white">
                    {block.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">Portfolio</p>
                <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                  이미지가 먼저 말하고,
                  <br />
                  텍스트는 뒤에서 정리합니다.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-9 text-white/65">
                큰 그리드와 부드러운 전환을 통해 작품 자체가 압도적으로 보이도록 구성했습니다. 카드를
                클릭하면 주변 요소가 정리되고, 선택된 프로젝트가 중심이 됩니다.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {showcaseProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    isActive={project.id === activeProjectId}
                    onSelect={() => setActiveProjectId(project.id)}
                  />
                ))}
              </div>

              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-8">
                        <div className="text-xs uppercase tracking-[0.35em] text-white/50">
                          {activeProject.category}
                        </div>
                        <h3 className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
                          {activeProject.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                          {activeProject.summary}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section
          id="request"
          className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm lg:px-14 lg:py-20">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/45">Request</p>
                  <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                    프로젝트 의뢰는
                    <br />
                    오픈톡으로 바로 연결됩니다.
                  </h2>
                </div>
                <a
                  href={KAKAO_OPENCHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105"
                >
                  Request
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RotatingSignature />

      <footer className="border-t border-white/10 bg-[#050505] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <span>AI SULAB</span>
          <span>Full reset layout inspired by designpixel.co.kr</span>
        </div>
      </footer>
    </div>
  )
}
