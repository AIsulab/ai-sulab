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

const projects = [
  {
    id: 'studio',
    eyebrow: 'Powerful Energy.',
    title: 'Studio Commerce',
    category: 'Website / Film',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1800',
    description:
      '브랜드의 첫인상을 단단하게 만드는 프리미엄 랜딩 구조와 움직임 중심의 화면 설계.',
  },
  {
    id: 'health',
    eyebrow: 'Korea Botox.',
    title: 'Hugel',
    category: 'Biotech / Brand',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1800',
    description:
      '클린한 정보 구조와 강한 시각 리듬으로 의료·전문 서비스의 신뢰를 끌어올리는 디자인.',
  },
  {
    id: 'tech',
    eyebrow: 'Semiconductor.',
    title: 'Zaram Technology',
    category: 'Corporate / Tech',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1800',
    description:
      '기술 기업의 복잡한 메시지를 최소한의 레이아웃으로 선명하게 전달하는 구성.',
  },
  {
    id: 'platform',
    eyebrow: 'HR Platform.',
    title: 'Workup',
    category: 'Platform / UX',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800',
    description:
      '데이터와 CTA를 균형 있게 배치해 전환을 유도하는 서비스형 플랫폼 스타일.',
  },
]

const secondaryLinks = ['Project Request', 'Company Profile', 'Location', 'Blog']

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

function OutlineHeadline({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 1600 260" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-stroke" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.text
        x="0"
        y="52%"
        textAnchor="start"
        dominantBaseline="middle"
        className="font-brand text-[88px] font-light tracking-[0.22em] md:text-[130px]"
        fill="none"
        stroke="url(#hero-stroke)"
        strokeWidth="1.1"
        strokeDasharray="12 12"
        initial={{ strokeDashoffset: 0, opacity: 0.85 }}
        animate={{ strokeDashoffset: -260 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {label}
      </motion.text>
    </svg>
  )
}

function RotatingSignature() {
  const text = 'SULAB AI AUTOMATION SYSTEM'

  return (
    <div className="fixed right-[-72px] top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="relative h-52 w-52">
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
                d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
              />
            </defs>
            <text
              className="fill-white/70 text-[14px] uppercase tracking-[0.42em]"
              textAnchor="middle"
            >
              <textPath href="#ring-path" startOffset="50%">
                {`${text}   `.repeat(2)}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <ArrowDown className="h-6 w-6 animate-bounce" />
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
        href="#request"
        className="rounded-none border border-white/45 px-3 py-4 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-white/90 [writing-mode:vertical-rl]"
      >
        Project Request
      </a>
      <div className="flex flex-col items-center gap-4 text-white/70">
        <span className="h-3 w-3 rounded-full border border-white/70" />
        <span className="h-3 w-3 rounded-full border border-white/70" />
        <span className="h-3 w-3 rounded-full border border-white/70" />
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  active,
  onClick,
}: {
  project: (typeof projects)[number]
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full overflow-hidden rounded-[1.75rem] border text-left transition ${
        active ? 'border-white/30' : 'border-white/10 opacity-80 hover:opacity-100'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
            active ? 'scale-105' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">
            {project.category}
          </div>
          <div className="mt-3 text-2xl font-light leading-tight text-white">
            {project.title}
          </div>
          <div className="mt-4 text-sm text-white/65">{project.eyebrow}</div>
        </div>
      </div>
    </button>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)

  useBodyLock(menuOpen)

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  )

  useEffect(() => {
    document.title = 'AI SULAB | High-End Motion Layout'
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
        <section className="relative min-h-screen overflow-hidden">
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
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.09),_transparent_35%)]" />
          <div className="absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-white/20" />

          <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-16">
              <div className="max-w-5xl">
                <div className="mb-6 text-sm uppercase tracking-[0.45em] text-white/55">
                  Design-driven AI automation
                </div>
                <div className="max-w-6xl">
                  <OutlineHeadline label="BEYOND AUTOMATION" />
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  className="mt-6 max-w-4xl font-brand text-[clamp(4rem,9vw,8rem)] font-black leading-[0.92] tracking-[-0.05em] text-white"
                >
                  SULAB AI
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.35 }}
                  className="mt-8 flex items-center gap-4 text-sm uppercase tracking-[0.35em] text-white/55"
                >
                  <span>High-End Motion</span>
                  <span className="h-px w-12 bg-white/30" />
                  <span>Dark Luxury UI</span>
                </motion.div>
                <a
                  href="#portfolio"
                  className="mt-10 inline-flex items-center gap-3 border-b border-white/70 pb-2 text-sm font-medium uppercase tracking-[0.28em] text-white transition hover:border-emerald-400 hover:text-emerald-400"
                >
                  Go to site
                  <span className="text-lg">→</span>
                </a>
              </div>

              <div className="flex flex-col gap-6 text-white/75 md:flex-row md:items-end md:justify-between">
                <div className="max-w-sm text-sm leading-7">
                  Seoul, Korea / AI automation systems / premium web experiences
                </div>
                <div className="max-w-xs text-right text-xs uppercase tracking-[0.3em] text-white/45">
                  © 2026 SULAB AI
                  <br />
                  Dark high-end motion layout
                </div>
              </div>
            </div>
          </div>
        </section>

        <RightRail />
        <RotatingSignature />

        <section id="about" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/45">About</p>
              <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                AI automation with
                <br />
                editorial-grade precision.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-9 text-white/65">
              브랜드의 시각적 무게감과 실제 전환을 동시에 설계합니다. 디자인, 자동화, 상담 흐름까지
              하나의 럭셔리한 사용자 경험으로 연결합니다.
            </p>
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
                  Selected work,
                  <br />
                  presented with restraint.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-9 text-white/65">
                화면은 단순하게, 디테일은 선명하게. 각 프로젝트는 브랜드의 신뢰와 기술력을
                한 장면으로 전달하도록 설계했습니다.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    active={project.id === activeProjectId}
                    onClick={() => setActiveProjectId(project.id)}
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
                          {activeProject.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              {secondaryLinks.map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/35">{item}</div>
                  <div className="mt-4 text-2xl font-light leading-tight text-white">
                    {item === 'Project Request'
                      ? 'Brief, scope, and quote'
                      : item === 'Company Profile'
                        ? 'Studio profile and capabilities'
                        : item === 'Location'
                          ? 'Seoul, Korea'
                          : 'Editorial notes and updates'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="request"
          className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm lg:px-14 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">Request</p>
                <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                  Start a new
                  <br />
                  project with SULAB AI.
                </h2>
              </div>
              <a
                href={KAKAO_OPENCHAT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105"
              >
                Open Chat
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#050505] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <span>AI SULAB</span>
          <span>Dark high-end layout inspired by designpixel.co.kr</span>
        </div>
      </footer>
    </div>
  )
}
