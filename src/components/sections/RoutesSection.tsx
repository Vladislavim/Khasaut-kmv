import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { routes } from '../../data/routes'
import { assets } from '../../data/assets'
import { PriceBadge } from '../pricing/PriceBadge'

export function RoutesSection() {
  return (
    <Section id="routes" className="routes-section" ariaLabel="Маршруты">
      <Container>
        <div className="routes-heading">
          <h2>
            <span className="routes-heading__label">
              Другие форматы
              <span className="routes-heading__underline" aria-hidden="true">
                <svg viewBox="0 0 150 14" role="presentation">
                  <path d="M2 9.5C30 6 55 11 78 7s42 2 70-2" />
                  <path d="M3 11c25-2 51 1 75-2 23-3 44 2 69-2" />
                </svg>
              </span>
            </span>
          </h2>
          <span className="routes-stamp" aria-hidden="true">K / 2022</span>
        </div>
        <div className="routes-grid">
          {routes.map((route, index) => (
            <Reveal key={route.title} delay={index * 90} className="route-card-wrap">
              <a className="route-card" href={route.href}>
                <div className="route-card__media" role="img" aria-label={`${route.title}: вид на Кавказ`} style={{ backgroundImage: `url(${assets.routeCardImages[index]})`, backgroundPosition: route.backgroundPosition }}>
                  <span className="route-card__veil" aria-hidden="true" />
                </div>
                <div className="route-card__content">
                  <h3>{route.title}</h3>
                  <PriceBadge />
                  <p>Перейти <Icon name="arrow" size={19} /></p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
