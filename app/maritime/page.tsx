import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import EcosystemFlow from '@/components/EcosystemFlow'
import MaritimeUtilitiesSection from '@/components/MaritimeUtilitiesSection'
import SolutionCards from '@/components/SolutionCards'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Maritime Technology Platforms | TekLink',
  description:
    'TekLink builds maritime technology platforms for freight, chartering, ship owning feasibility, commodity exposure, shipping workflows, and port operations.',
}

export default function MaritimePage() {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      <Navbar />
      <Hero />
      <EcosystemFlow />
      <MaritimeUtilitiesSection />
      <SolutionCards />
      <Footer />
    </main>
  )
}
