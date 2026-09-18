import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { RoutesSection } from '../components/sections/RoutesSection'
import { AboutSection } from '../components/sections/AboutSection'
import { ValuesSection } from '../components/sections/ValuesSection'
import { FooterSection } from '../components/sections/FooterSection'
import { PriceConfigurator } from '../components/pricing/PriceConfigurator'
import { FeaturedTripsSection } from '../components/sections/FeaturedTripsSection'
import { TripCallToAction } from '../components/ui/TripCallToAction'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="home-main">
        <ServicesSection />
        <FeaturedTripsSection />
        <RoutesSection />
        <PriceConfigurator id="home-price-calculator" className="home-price-configurator" />
        <TripCallToAction />
        <AboutSection />
        <ValuesSection />
      </main>
      <FooterSection />
    </>
  )
}
