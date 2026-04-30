import { useEffect, useRef, type FormEvent } from 'react'
import { ArrowRight, Globe, Instagram, Twitter } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

const socialLinks = [
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'Website', icon: Globe },
]

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const restartTimeoutRef = useRef<number | null>(null)
  const fadeOutQueuedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    let frameId: number | null = null

    if (!video) {
      return undefined
    }

    const cancelFrame = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    const fadeOpacity = (target: number, duration = 500) => {
      cancelFrame()

      const startOpacity = Number.parseFloat(video.style.opacity || '0') || 0
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const nextOpacity = startOpacity + (target - startOpacity) * progress

        video.style.opacity = String(nextOpacity)

        if (progress < 1) {
          frameId = requestAnimationFrame(step)
        } else {
          frameId = null
        }
      }

      frameId = requestAnimationFrame(step)
    }

    const handleCanPlay = () => {
      void video.play().catch(() => undefined)
      fadeOpacity(1, 500)
    }

    const handleTimeUpdate = () => {
      if (fadeOutQueuedRef.current || !Number.isFinite(video.duration) || video.duration <= 0) {
        return
      }

      const remaining = video.duration - video.currentTime

      if (remaining <= 0.55) {
        fadeOutQueuedRef.current = true
        fadeOpacity(0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'

      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current)
      }

      restartTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0
        fadeOutQueuedRef.current = false
        void video.play().then(() => fadeOpacity(1, 500)).catch(() => undefined)
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)

      cancelFrame()

      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          type="video/mp4"
        />
      </video>

      <header className="relative z-20 px-6 py-6">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold text-white">Asme</span>
          </div>

          <div className="hidden items-center gap-8 ml-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              className="text-sm font-medium text-white transition-colors hover:text-white/80"
              href="#about"
            >
              Sign Up
            </a>
            <a className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white" href="#about">
              Login
            </a>
          </div>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <div className="w-full max-w-5xl">
          <h1 className="text-7xl tracking-tight whitespace-nowrap text-white max-[420px]:text-5xl md:text-8xl lg:text-9xl">
            Know it then <em className="italic">all</em>.
          </h1>

          <form
            className="liquid-glass mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-full pl-6 pr-2 py-2"
            onSubmit={handleSubmit}
          >
            <input
              aria-label="Email"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40"
              placeholder="Enter your email"
              type="email"
            />
            <button
              aria-label="Submit email"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
              type="submit"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mx-auto mt-6 max-w-3xl px-4 text-sm leading-relaxed text-white/80">
            Stay updated with the latest news and insights. Subscribe to our newsletter
            today and never miss out on exciting updates.
          </p>

          <a
            className="liquid-glass mt-8 inline-flex rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            href="#about"
          >
            Manifesto
          </a>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {socialLinks.map((item) => {
          const Icon = item.icon

          return (
            <a
              key={item.label}
              aria-label={item.label}
              className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
              href="#about"
            >
              <Icon className="h-5 w-5" />
            </a>
          )
        })}
      </div>
    </section>
  )
}
