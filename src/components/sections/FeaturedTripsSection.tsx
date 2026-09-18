import { useState } from 'react'
import { featuredTrips } from '../../data/featuredTrips'
import { track } from '../../lib/analytics'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { PriceBadge } from '../pricing/PriceBadge'
import { QuickPriceSheet } from '../pricing/QuickPriceSheet'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function FeaturedTripsSection() {
  const [quickRouteKey, setQuickRouteKey] = useState<typeof featuredTrips[number]['priceKey'] | null>(null)

  return (
    <Section id="featured-trips" className="featured-trips-section" ariaLabel="Экскурсии с известной стоимостью">
      <Container>
        <div className="featured-trips-heading">
          <div>
            <span className="section-kicker">Направления и ориентиры</span>
            <h2>Основные направления</h2>
          </div>
          <div className="featured-trips-heading__aside"><p>Выберите пейзаж, ради которого хочется проснуться пораньше. Стоимость можно рассчитать для своей компании.</p><a href="/excursions">Все экскурсии <Icon name="arrow" size={16} /></a></div>
        </div>
        <div className="featured-trips-grid">
          {featuredTrips.map((trip, index) => (
            <Reveal key={trip.title} delay={index * 70} className="featured-trip-wrap">
              <article className="featured-trip-card">
                <a className="featured-trip-card__media" href={trip.href} onClick={() => track('route_detail_open', { route: trip.priceKey })}>
                  <img src={trip.image} alt={trip.alt} loading={index < 2 ? 'eager' : 'lazy'} />
                  <span className="featured-trip-card__veil" aria-hidden="true" />
                  <span className="featured-trip-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="featured-trip-card__kicker">{trip.kicker}</span>
                  <h3>{trip.title}</h3>
                </a>
                <div className="featured-trip-card__body">
                  <p>{trip.blurb}</p>
                  <PriceBadge priceKey={trip.priceKey} />
                  <div className="featured-trip-card__actions">
                    <button className="inner-button inner-button--solid" type="button" onClick={() => setQuickRouteKey(trip.priceKey)}>Рассчитать <Icon name="arrow" size={14} /></button>
                    <a className="inner-button inner-button--outline" href={trip.href} onClick={() => track('route_detail_open', { route: trip.priceKey })}>Подробнее <Icon name="arrow" size={14} /></a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
      <QuickPriceSheet routeKey={quickRouteKey} onClose={() => setQuickRouteKey(null)} />
    </Section>
  )
}
