import { ChevronRight } from 'lucide-react'

const nftCards = [
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.7/10',
  },
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9/10',
  },
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.2/10',
  },
]

export default function CollectionSection() {
  return (
    <section id="gallery" className="bg-[#010828] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1831px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-grotesk text-[32px] uppercase leading-[1.02] tracking-tight text-[#EFF4FF] sm:text-[44px] md:text-[56px] lg:text-[60px]">
              Collection of
              <br />
              <span className="ml-12 sm:ml-24 lg:ml-32">
                <span className="font-condiment italic text-neon">Space</span> objects
              </span>
            </h2>
          </div>

          <a className="group inline-flex flex-col items-start" href="#contact">
            <span className="flex items-start gap-3">
              <span className="font-grotesk text-[32px] uppercase leading-none text-[#EFF4FF] sm:text-[44px] md:text-[52px] lg:text-[60px]">
                SEE
              </span>
              <span className="flex flex-col pt-1 font-grotesk text-[20px] uppercase leading-none text-[#EFF4FF] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                <span>ALL</span>
                <span>CREATORS</span>
              </span>
            </span>
            <span className="mt-3 h-[6px] w-full bg-neon sm:h-[8px] lg:h-[10px]" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nftCards.map((card, index) => (
            <article
              key={card.video}
              className="liquid-glass rounded-[32px] p-[18px] transition-colors hover:bg-white/10"
            >
              <div className="relative overflow-hidden rounded-[24px]">
                <div className="pb-[100%]" />
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={card.video} type="video/mp4" />
                </video>
              </div>

              <div className="liquid-glass mt-4 flex items-center justify-between gap-4 rounded-[20px] px-5 py-4">
                <div className="min-w-0">
                  <p className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-[#EFF4FF]/70">
                    RARITY SCORE:
                  </p>
                  <p className="font-grotesk text-[16px] uppercase text-[#EFF4FF]">
                    {card.score}
                  </p>
                </div>

                <a
                  aria-label={`Open card ${index + 1}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] shadow-lg shadow-purple-500/50 transition-transform hover:scale-110"
                  href="#"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
