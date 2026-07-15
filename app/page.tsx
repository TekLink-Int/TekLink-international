import Navbar from '@/components/Navbar'
import HomeHero from '@/components/HomeHero'
import SolutionsCatalog from '@/components/SolutionsCatalog'
import CompanyIntro from '@/components/CompanyIntro'
import CollaborateForm from '@/components/CollaborateForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      <Navbar />
      <HomeHero />
      <SolutionsCatalog />
      <CompanyIntro />
      <CollaborateForm />
      <Footer />
    </main>
  )
}
