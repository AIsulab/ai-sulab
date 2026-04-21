import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import PortfolioSection from './components/PortfolioSection'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PortfolioSection />
      <Footer />
    </div>
  )
}
