import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { routes } from '../../data/routes'
import { assets } from '../../data/assets'

export function RoutesSection() {
  return (
    <Section id="routes" className="routes-section" ariaLabel="Маршруты">
      <Container>
        <div className="routes-heading">
          <p className="section-kicker section-kicker--light">открываем места, в которые хочется вернуться</p>
          <h2>Маршруты,<br /><em>которые запомнятся</em></h2>
          <span className="routes-stamp" aria-hidden="true">K / 2022</span>
        </div>
        <div className="routes-grid">
          {routes.map((route, index) => (
            <Reveal key={route.title} delay={index * 90} className="route-card-wrap">
              <a className="route-card" href="#contact">
                <div className="route-card__media" role="img" aria-label={`${route.title}: вид на Кавказ`} style={{ backgroundImage: `url(${assets.routeCardsStrip})`, backgroundPosition: route.backgroundPosition }}>
                  <span className="route-card__veil" aria-hidden="true" />
                </div>
                <div className="route-card__content">
                  <span>{route.eyebrow}</span>
                  <h3>{route.title}</h3>
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
