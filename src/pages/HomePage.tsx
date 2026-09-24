import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { RoutesSection } from '../components/sections/RoutesSection'
import { FooterSection } from '../components/sections/FooterSection'
import { PriceConfigurator } from '../components/pricing/PriceConfigurator'
import { FeaturedTripsSection } from '../components/sections/FeaturedTripsSection'
import { TripCallToAction } from '../components/ui/TripCallToAction'
import { ContactPhotoSlider } from '../components/inner/ContactPhotoSlider'
import { HomeSeoArticle } from '../components/sections/HomeSeoArticle'
import { HomeFaqSection } from '../components/sections/HomeFaqSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="home-main">
        <ServicesSection />
        <FeaturedTripsSection />
        <RoutesSection />
        <PriceConfigurator id="home-price-calculator" className="home-price-configurator" />
        <HomeSeoArticle />
        <HomeFaqSection />
        <ContactPhotoSlider />
        <TripCallToAction />
      </main>
      <FooterSection />
    </>
  )
}

