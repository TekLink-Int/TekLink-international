import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import EcosystemFlow from '@/components/EcosystemFlow'
import SolutionCards from '@/components/SolutionCards'
import About from '@/components/About'
import FinancialTeaser from '@/components/FinancialTeaser'
import CollaborateForm from '@/components/CollaborateForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      <Navbar />
      <Hero />
      <EcosystemFlow />
      <SolutionCards />
      <About />
      <FinancialTeaser />
      <CollaborateForm />
      <Footer />
    </main>
  )
}
