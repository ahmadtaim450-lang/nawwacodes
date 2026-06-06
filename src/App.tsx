import NavHeader from './components/ui/nav-header'
import MobileNav from './components/ui/mobile-nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { Stats } from './sections/Stats'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'

function App() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="hidden lg:block">
        <NavHeader />
      </div>
      <MobileNav />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
