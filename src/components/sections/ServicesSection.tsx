import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { TornDivider } from '../ui/TornDivider'
import { services } from '../../data/services'

export function ServicesSection() {
  return (
    <Section id="services" className="services-section" ariaLabel="Наши услуги">
      <Container>
        <div className="section-heading section-heading--center">
          <TornDivider />
          <p className="section-kicker">мы знаем, куда ведут тропы</p>
          <h2>Наши услуги</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 65} className="service-item">
              <div className="service-icon"><Icon name={service.icon} size={52} /></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">Перейти <Icon name="arrow" size={16} /></a>
            </Reveal>
          ))}
        </div>
      </Container>
      <svg className="services-compass" viewBox="0 0 160 160" aria-hidden="true">
        <circle cx="80" cy="80" r="60" />
        <circle cx="80" cy="80" r="50" />
        <path d="m80 17 9 53 54 10-54 9-9 54-9-54-54-9 54-10 9-53Z" />
        <path d="m80 30 6 44-6 6-6-6 6-44ZM130 80l-44 6-6-6 6-6 44 6ZM80 130l-6-44 6-6 6 6-6 44ZM30 80l44-6 6 6-6 6-44-6Z" />
        <circle cx="80" cy="80" r="5" />
      </svg>
      <svg className="services-botanical" viewBox="0 0 120 220" aria-hidden="true">
        <path d="M55 214C53 165 55 115 74 59" />
        <path d="M60 166c-20-3-31-15-34-29 18-2 31 7 34 29ZM61 139c19-4 29-14 32-27-15-3-28 6-32 27ZM67 106c-17-4-25-14-27-26 14-1 24 8 27 26ZM70 84c15-4 23-13 24-24-13 0-22 8-24 24ZM75 59c-13-4-19-13-20-23 11 1 18 8 20 23Z" />
      </svg>
    </Section>
  )
}
