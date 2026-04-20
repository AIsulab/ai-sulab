import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const HERO_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const OPENCHAT_URL = 'https://open.kakao.com/o/siMggc8f'

const menuItems = [
  { id: 'about', label: 'About' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'request', label: 'Request' },
]

const projects = [
  {
    id: 'eclair',
    label: 'Powerful Energy.',
    title: 'éclair',
    category: 'Website / Film',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1800',
    description:
      '고급 테크 제품군에 어울리는 다크 기반 비주얼과 최소 텍스트 구조를 결합한 쇼케이스.',
  },
  {
    id: 'hugel',
    label: 'Korea Botox.',
    title: 'Hugel',
    category: 'Biotech / Brand',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1800',
    description:
      '과학적인 신뢰감과 브랜드 럭셔리를 동시에 잡는 기업형 풀스크린 레이아웃.',
  },
  {
    id: 'zaram',
    label: 'Semiconductor.',
    title: 'Zaram Technology',
    category: 'Corporate / Tech',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1800',
    description:
      '기술적 무게감이 느껴지도록 대비와 여백을 극단적으로 밀어붙인 히어로 중심 구성.',
  },
  {
    id: 'workup',
    label: 'HR Platform.',
    title: 'Workup',
    category: 'Platform / UX',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800',
    description:
      '설명보다 이미지가 먼저 들어오는 플랫폼형 레이아웃으로 부드러운 전환을 강조.',
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
    <div className="relative mx-auto flex max-w-6xl justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center text-[clamp(4rem,11vw,8.5rem)] font-black uppercase tracking-[0.14em]"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
      >
        <span className="block text-transparent">BEYOND</span>
        <span className="block text-transparent">AUTOMATION</span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-[0.18em] text-white md:tracking-[0.28em]">
            SULAB AI
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.6em] text-white/55 md:text-sm">
            Design Pixel Inspired
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SignatureRing() {
  const ringText = 'SULAB AI AUTOMATION SYSTEM • '

  return (
    <div className="fixed right-[-60px] top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="relative h-44 w-44">
        <div
          className="absolute inset-0 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm"
          style={{ animation: 'spin-slow 18s linear infinite' } as CSSProperties}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path
                id="signature-path"
                d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
              />
            </defs>
            <text className="fill-white/70 text-[14px] uppercase tracking-[0.42em]">
              <textPath href="#signature-path" startOffset="0%">
                {ringText.repeat(2)}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black text-white">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl font-light leading-none"
            >
              ↓
            </motion.span>
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
      className={`group w-full overflow-hidden rounded-[1.5rem] border text-left transition ${
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
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">{project.category}</div>
          <div className="mt-3 text-2xl font-light leading-tight text-white">{project.title}</div>
          <div className="mt-4 text-sm text-white/65">{project.label}</div>
        </div>
      </div>
    </button>
  )
}

function ProjectDetail({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -28, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="text-xs uppercase tracking-[0.35em] text-white/50">{project.category}</div>
          <h3 className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/70">{project.description}</p>
        </div>
      </div>
    </motion.div>
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
    document.title = 'SULAB AI | Design Pixel Inspired'
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed left-0 top-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#top" className="font-brand text-sm uppercase tracking-[0.5em] text-white/90">
            SULAB
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/85 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
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
            className="fixed inset-0 z-50 bg-black/96"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-5 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="font-brand text-sm uppercase tracking-[0.5em] text-white/70">
                  SULAB
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
                      initial={{ opacity: 0, y: 30 }}
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.07),_transparent_35%)]" />

          <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="mx-auto w-full max-w-7xl">
              <OutlineTitle />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 max-w-2xl text-sm uppercase tracking-[0.35em] text-white/50 md:text-base"
              >
                Luxury Tech / Visual Depth / Motion System
              </motion.p>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="mx-auto max-w-7xl"
          >
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">About</p>
                <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                  비주얼은 크게,
                  <br />
                  메시지는 조용하게.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-9 text-white/65">
                화면 전체를 지배하는 비디오, 중앙 타이틀, 오버레이 메뉴, 그리고 선택된 프로젝트가
                하나의 리듬으로 이어지도록 재구성했습니다.
              </p>
            </div>
          </motion.div>
        </section>

        <section id="portfolio" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="mx-auto max-w-7xl"
          >
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">Portfolio</p>
                <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                  큰 이미지가 먼저
                  <br />
                  공간을 점유합니다.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-9 text-white/65">
                카드를 클릭하면 우측의 메인 뷰가 부드럽게 전환됩니다. 디자인픽셀에서 느껴지는
                압도적인 이미지 중심 구조를 유지합니다.
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
                  <ProjectDetail project={activeProject} key={activeProject.id} />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="solutions" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="mx-auto max-w-7xl"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                'PROJECT REQUEST',
                'COMPANY PROFILE',
                'LOCATION',
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-500 ${
                    index === 1 ? 'md:translate-y-6' : ''
                  }`}
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/35">{item}</div>
                  <div className="mt-4 text-2xl font-light leading-tight text-white">
                    {item === 'PROJECT REQUEST'
                      ? '프로젝트 의뢰'
                      : item === 'COMPANY PROFILE'
                        ? '회사소개서와 영상'
                        : '오시는 길과 연락'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="request" className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm lg:px-14 lg:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">Request</p>
                <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
                  오픈톡으로 바로
                  <br />
                  프로젝트를 시작하세요.
                </h2>
              </div>
              <a
                href={OPENCHAT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105"
              >
                Request
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <SignatureRing />

      <footer className="border-t border-white/10 bg-[#050505] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <span>AI SULAB</span>
          <span>Luxury tech motion layout inspired by designpixel.co.kr</span>
        </div>
      </footer>
    </div>
  )
}
