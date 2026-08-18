import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { RoutesSection } from '../components/sections/RoutesSection'
import { AboutSection } from '../components/sections/AboutSection'
import { ValuesSection } from '../components/sections/ValuesSection'
import { FooterSection } from '../components/sections/FooterSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <RoutesSection />
        <AboutSection />
        <ValuesSection />
      </main>
      <FooterSection />
    </>
  )
}
