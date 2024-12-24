import HeroSection from './components/HeroSection'

export const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <HeroSection />

      <section className='z-0 min-h-screen bg-orange-500' />
    </main>
  )
}
