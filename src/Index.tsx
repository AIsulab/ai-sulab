import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ServicesSection from './components/ServicesSection'

export default function Index() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </main>
  )
}
