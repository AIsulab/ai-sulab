import { Github, Mail, Twitter } from 'lucide-react'

const socialLinks = [
  { label: 'Mail', icon: Mail },
  { label: 'Twitter', icon: Twitter },
  { label: 'Github', icon: Github },
]

export default function FinalSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#010828]">
      <div className="relative">
        <video
          className="block h-auto w-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0">
          <div className="absolute right-[8%] top-[8%] max-w-[42rem] text-right lg:right-[20%] lg:pl-[15%] lg:pr-[20%]">
            <div className="relative inline-block">
              <span className="absolute left-0 top-[-1.25rem] font-condiment text-[17px] italic text-neon mix-blend-exclusion sm:text-[32px] md:text-[48px] lg:text-[68px]">
                Go beyond
              </span>

              <h2 className="font-grotesk text-[16px] uppercase leading-[1.02] tracking-tight text-[#EFF4FF] sm:text-[24px] md:text-[40px] lg:text-[60px]">
                <span className="mb-4 block sm:mb-8 md:mb-12">JOIN US.</span>
                REVEAL WHAT&apos;S HIDDEN.
                <br />
                DEFINE WHAT&apos;S NEXT.
                <br />
                FOLLOW THE SIGNAL.
              </h2>
            </div>
          </div>

          <div className="absolute bottom-[12%] left-[8%] lg:bottom-[20%]">
            <div className="liquid-glass divide-y divide-white/10 overflow-hidden rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.25rem]">
              {socialLinks.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    aria-label={item.label}
                    className="flex h-[3.25rem] w-[14vw] items-center justify-center px-4 text-[#EFF4FF] transition-transform hover:scale-105 sm:h-[3.5rem] sm:w-[14.375rem] sm:px-5 md:h-[3.75rem] md:w-[10.78125rem] lg:h-[4.25rem] lg:w-[16.77rem]"
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
    </section>
  )
}
