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
    id: 'eclair',
    eyebrow: 'Powerful Energy.',
    title: 'éclair',
    category: 'Website / Film',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1800',
    description:
      '하이엔드 제품군을 위한 차콜 베이스의 풀스크린 비주얼 쇼케이스.',
  },
  {
    id: 'hugel',
    eyebrow: 'Korea Botox.',
    title: 'Hugel',
    category: 'Biotech / Brand',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1800',
    description:
      '의료와 바이오 영역에 맞춘 엄격한 정보 구조와 강한 대비의 레이아웃.',
  },
  {
    id: 'zaram',
    eyebrow: 'Semiconductor.',
    title: 'Zaram Technology',
    category: 'Corporate / Tech',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1800',
    description:
      '기술 기업의 무게감과 선명함을 담아낸 산업형 메인 비주얼.',
  },
  {
    id: 'workup',
    eyebrow: 'HR Platform.',
    title: 'Workup',
    category: 'Platform / UX',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800',
    description:
      '서비스 설명보다 이미지와 타이포의 리듬으로 먼저 설득하는 플랫폼형 섹션.',
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

function OutlineHeadline() {
  return (
    <svg viewBox="0 0 1200 240" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-stroke" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <motion.text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-brand text-[92px] font-light tracking-[0.38em] md:text-[132px]"
        fill="none"
        stroke="url(#hero-stroke)"
        strokeWidth="1.1"
        strokeDasharray="12 12"
        initial={{ strokeDashoffset: 0, opacity: 0.75 }}
        animate={{ strokeDashoffset: -260 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        SULAB AI
      </motion.text>
    </svg>
  )
}

function RotatingSignature() {
  const text = 'SULAB AI AUTOMATION SYSTEM'
  return (
    <div className="fixed left-1/2 top-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 md:block">
      <div className="relative h-40 w-40">
        <div
          className="ring-spin absolute inset-0 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
          style={
            {
              ['--ring-speed' as string]: '16s',
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
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
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

          <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="mx-auto w-full max-w-7xl">
              <OutlineHeadline />
              <div className="mt-8 flex max-w-2xl flex-wrap items-center gap-4 text-sm uppercase tracking-[0.35em] text-white/55">
                <span>High-End Minimal</span>
                <span className="h-px w-12 bg-white/25" />
                <span>Full Screen VOD</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/45">About</p>
              <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                짙은 톤과 여백으로
                <br />
                메시지를 압축합니다.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-9 text-white/65">
              디자인픽셀처럼 비주얼이 중심이 되는 구조를 유지하면서, AI 수튜디오의 비즈니스 정체성을
              선명하게 드러내는 다크 무드 레이아웃으로 재구성했습니다.
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
                  이미지가 먼저 말하고,
                  <br />
                  정보는 천천히 따라옵니다.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-9 text-white/65">
                클릭할 때마다 부드럽게 화면이 전환되는 큰 쇼케이스 구조로, 프로젝트 자체가 충분히
                압도적으로 보이도록 설계했습니다.
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
                      ? '프로젝트 의뢰'
                      : item === 'Company Profile'
                        ? '회사 소개서와 핵심 영역'
                        : item === 'Location'
                          ? '오시는 길과 연락'
                          : '기록과 업데이트'}
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
                  지금 바로
                  <br />
                  문의를 시작할 수 있습니다.
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
        </section>
      </main>

      <RotatingSignature />

      <footer className="border-t border-white/10 bg-[#050505] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <span>AI SULAB</span>
          <span>Dark high-end layout inspired by designpixel.co.kr</span>
        </div>
      </footer>
    </div>
  )
}
