export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black px-4 pt-20 text-white md:px-8">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="max-w-4xl text-left text-5xl font-bold leading-tight md:text-7xl md:leading-tight">
            AI 자동화로 대표님의 시간을 10배로 늘려드립니다.
          </h1>
          <p className="mt-6 max-w-3xl text-left text-xl text-gray-400">
            기획부터 구축, 운영까지 SULAB이 책임지는 1인 AI 자동화 파이프라인.
          </p>
        </div>
      </div>
    </section>
  )
}
