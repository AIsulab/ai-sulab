import { Github, Mail, Twitter } from 'lucide-react'

const navItems = [
  { label: 'Homepage', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Buy NFT', href: '#gallery' },
  { label: 'FAQ', href: '#contact' },
  { label: 'Contact', href: '#contact' },
]
const socialLinks = [
  { label: 'Mail', icon: Mail },
  { label: 'Twitter', icon: Twitter },
  { label: 'Github', icon: Github },
]

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden rounded-b-[32px] bg-[#010828]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1831px] flex-col px-4 pb-10 pt-5 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between gap-6">
          <a
            className="font-grotesk text-[16px] uppercase tracking-wide text-[#EFF4FF]"
            href="#home"
          >
            Orbis.Nft
          </a>

          <nav className="liquid-glass hidden rounded-[28px] px-[52px] py-[24px] lg:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    className="font-grotesk text-[13px] uppercase text-[#EFF4FF] transition-colors hover:text-neon"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-[112px]" aria-hidden="true" />
        </header>

        <div className="relative flex flex-1 flex-col">
          <div className="absolute right-0 top-12 hidden flex-col gap-4 lg:flex">
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  aria-label={item.label}
                  className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-[#EFF4FF] transition-colors hover:bg-white/10"
                  href="#"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>

          <div className="flex flex-1 items-center">
            <div className="relative w-full lg:ml-32 lg:max-w-[780px]">
              <h1 className="max-w-[780px] font-grotesk text-[40px] uppercase leading-[1.05] tracking-tight text-[#EFF4FF] sm:text-[60px] md:text-[75px] lg:text-[90px] lg:leading-[1]">
                Beyond earth
                <br />
                and ( its ) familiar boundaries
              </h1>

              <div className="pointer-events-none absolute right-[-4%] top-[12%] mix-blend-exclusion">
                <span className="font-condiment text-[24px] italic text-neon opacity-90 rotate-[-1deg] sm:text-[36px] md:text-[44px] lg:text-[48px]">
                  Nft collection
                </span>
              </div>

              <div className="mt-8 flex justify-center lg:hidden">
                <div className="flex gap-4">
                  {socialLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.label}
                        aria-label={item.label}
                        className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-[#EFF4FF] transition-colors hover:bg-white/10"
                        href="#"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
