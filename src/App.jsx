import HeroSection from './components/HeroSection'
import About from './components/About'
export const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <HeroSection />
      <About />
    </main>
  )
}