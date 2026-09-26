import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { TornDivider } from '../ui/TornDivider'
import { services } from '../../data/services'
import { assets } from '../../data/assets'
import { ParallaxPattern } from '../ui/ParallaxPattern'

export function ServicesSection() {
  return (
    <Section id="services" className="services-section services-section--legacy-icons" ariaLabel="Наши услуги">
      <Container>
        <div className="section-heading section-heading--center">
          <TornDivider />
          <p className="section-kicker">мы знаем, куда ведут тропы</p>
          <h2>Наши услуги</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 65} className="service-item">
              <div className="service-icon service-icon--original" aria-hidden="true">
                <img src={assets.attachedServiceIcons} alt="" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a className="service-link" href={service.href}>Перейти <Icon name="arrow" size={16} /></a>
            </Reveal>
          ))}
        </div>
      </Container>
      <ParallaxPattern
        className="services-compass"
        src={assets.compassPattern}
        rotate={-8}
        distance={125}
        tilt={7}
        horizontalDistance={14}
      />
      <ParallaxPattern
        className="services-botanical"
        src={assets.botanicalLeftPattern}
        rotate={2}
        distance={-115}
        tilt={-6}
        horizontalDistance={-14}
      />
    </Section>
  )
}
