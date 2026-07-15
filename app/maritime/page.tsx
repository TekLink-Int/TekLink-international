import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import EcosystemFlow from '@/components/EcosystemFlow'
import SolutionCards from '@/components/SolutionCards'
import About from '@/components/About'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'TekLink - Maritime & Trade',
  description:
    'The maritime ecosystem end to end — freight, chartering, vessel feasibility, and commodity hedging and trading, connected in one suite.',
}

export default function MaritimePage() {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      <Navbar />
      <Hero />
      <EcosystemFlow />
      <SolutionCards />
      <About />
      <Footer />
    </main>
  )
}
