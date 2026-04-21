import { useEffect, useRef, useState, type WheelEvent } from 'react'

const slides = [
  {
    category: 'Revenue Engine.',
    title: 'AI 자동화로 대표님의 시간을 10배로 늘려드립니다.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    category: '150+ Projects.',
    title: '무인 카페 / 교육 / SaaS 맞춤 자동화',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    category: 'AI Estimate Engine.',
    title: '업종과 기능을 고르면 실시간으로 예상 견적이 산출됩니다.',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    category: '3-Step Solution.',
    title: '유튜브 자동화, AI 콘텐츠 생성, SaaS형 자동화 시스템 구축',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
  },
]

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const wheelLockRef = useRef(false)
  const wheelUnlockTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (wheelUnlockTimeoutRef.current !== null) {
        window.clearTimeout(wheelUnlockTimeoutRef.current)
      }
    }
  }, [])

  const goNext = () => {
    setCurrentIndex((current) => (current + 1) % slides.length)
  }

  const goPrev = () => {
    setCurrentIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (wheelLockRef.current) {
      return
    }

    wheelLockRef.current = true

    if (event.deltaY > 0) {
      goNext()
    } else if (event.deltaY < 0) {
      goPrev()
    }

    wheelUnlockTimeoutRef.current = window.setTimeout(() => {
      wheelLockRef.current = false
    }, 1000)
  }

  return (
    <div
      className="h-screen w-full overflow-hidden bg-black"
      onWheel={handleWheel}
    >
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide) => (
          <section key={slide.category} className="relative h-full w-screen flex-shrink-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex h-full items-end px-4 pb-16 md:px-8 md:pb-20">
              <div className="max-w-5xl">
                <p className="mb-2 text-xl text-gray-400 md:text-2xl">
                  {slide.category}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                  {slide.title}
                </h1>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
