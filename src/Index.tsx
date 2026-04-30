import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import CollectionSection from './components/CollectionSection'
import FinalSection from './components/FinalSection'

export default function Index() {
  return (
    <main className="relative bg-[#010828] text-[#EFF4FF]">
      <HeroSection />
      <IntroSection />
      <CollectionSection />
      <FinalSection />
      <div
        aria-hidden="true"
        className="texture-overlay"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}texture.png)` }}
      />
    </main>
  )
}
