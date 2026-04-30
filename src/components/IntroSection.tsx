export default function IntroSection() {
  const bodyCopy =
    'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space'

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#010828]"
    >
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
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1831px] flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <div className="flex flex-1 flex-col justify-between gap-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="relative max-w-[900px]">
              <h2 className="font-grotesk text-[32px] uppercase leading-[1.02] tracking-tight text-[#EFF4FF] sm:text-[44px] md:text-[56px] lg:text-[60px]">
                Hello!
                <br />
                I&apos;m orbis
              </h2>

              <div className="pointer-events-none absolute bottom-[-8%] right-0 mix-blend-exclusion">
                <span className="font-condiment text-[36px] italic text-neon rotate-[-3deg] sm:text-[48px] md:text-[60px] lg:text-[68px]">
                  Orbis
                </span>
              </div>
            </div>

            <p className="font-mono max-w-[266px] text-[14px] uppercase leading-relaxed text-[#EFF4FF] md:text-[16px]">
              {bodyCopy}
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-6 font-mono text-[14px] uppercase leading-relaxed text-[#010828] lg:text-[#EFF4FF]/10 md:text-[16px]">
              <p>{bodyCopy}</p>
              <p>{bodyCopy}</p>
            </div>

            <div className="hidden space-y-6 font-mono text-[14px] uppercase leading-relaxed text-[#010828] lg:block md:text-[16px]">
              <p>{bodyCopy}</p>
              <p>{bodyCopy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
