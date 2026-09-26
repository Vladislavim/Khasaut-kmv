import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { RoutesSection } from '../components/sections/RoutesSection'
import { FooterSection } from '../components/sections/FooterSection'
import { QuickPriceCalculator } from '../components/pricing/QuickPriceCalculator'
import { FeaturedTripsSection } from '../components/sections/FeaturedTripsSection'
import { TripCallToAction } from '../components/ui/TripCallToAction'
import { ContactPhotoSlider } from '../components/inner/ContactPhotoSlider'
import { HomeFaqSection } from '../components/sections/HomeFaqSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="home-main">
        <ServicesSection />
        <FeaturedTripsSection />
        <RoutesSection />
        <QuickPriceCalculator id="home-price-calculator" />
        <HomeFaqSection />
        <ContactPhotoSlider />
        <TripCallToAction />
      </main>
      <FooterSection />
    </>
  )
}
