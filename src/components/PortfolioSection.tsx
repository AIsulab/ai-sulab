const portfolioItems = [
  {
    category: 'Total Engineering.',
    title: '한국종합기술',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    category: 'Korea Botox.',
    title: 'Hugel',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    category: 'Semiconductor.',
    title: 'Zaram Technology',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    category: 'Beyond Tech.',
    title: 'Soulbrain',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
  },
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <article key={item.title} className="text-left">
              <div className="overflow-hidden rounded-3xl bg-neutral-100">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[400px] w-full object-cover md:h-[600px]"
                >
                  <source src={item.videoSrc} type="video/mp4" />
                </video>
              </div>

              <div className="mt-4">
                <p className="text-base text-gray-500">{item.category}</p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
