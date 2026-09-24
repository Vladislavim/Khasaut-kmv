import type { ItineraryStep } from '../../data/routeItineraries'
import { Icon } from '../ui/Icon'

type RouteItinerarySectionProps = {
  itinerary?: ItineraryStep[]
  routeTitle?: string
}

export function RouteItinerarySection({ itinerary, routeTitle }: RouteItinerarySectionProps) {
  if (!itinerary || itinerary.length === 0) {
    return null
  }

  return (
    <section className="inner-section route-itinerary" aria-labelledby="route-itinerary-title">
      <div className="container">
        <div className="route-itinerary__header">
          <span className="inner-kicker route-itinerary__kicker">По часам и остановкам</span>
          <h2 id="route-itinerary-title" className="route-itinerary__title">
            Программа экскурсии
          </h2>
          <p className="route-itinerary__intro">
            {routeTitle ? `Как проходит поездка на «${routeTitle}»:` : 'Тайминг и ключевые точки маршрута:'}{' '}
            комфортный выезд от вашего адреса, остановки на лучших смотровых площадках и время для фото без спешки.
          </p>
        </div>

        <div className="route-itinerary__timeline" role="list">
          <div className="route-itinerary__track" aria-hidden="true" />

          {itinerary.map((step, index) => {
            const isEven = index % 2 === 1
            return (
              <div
                key={`${step.number}-${step.title}`}
                className={`route-itinerary__item ${isEven ? 'route-itinerary__item--even' : 'route-itinerary__item--odd'}`}
                role="listitem"
              >
                {/* Content Box */}
                <div className="route-itinerary__content">
                  <div className="route-itinerary__card">
                    <div className="route-itinerary__meta">
                      {step.time && (
                        <span className="route-itinerary__time">
                          <Icon name="clock" size={13} className="route-itinerary__time-icon" /> {step.time}
                        </span>
                      )}
                      <span className="route-itinerary__badge">Точка {step.number}</span>
                    </div>

                    <h3 className="route-itinerary__step-title">{step.title}</h3>
                    <p className="route-itinerary__step-desc">{step.description}</p>
                  </div>
                </div>

                {/* Numbered Center Circle */}
                <div className="route-itinerary__marker" aria-label={`Этап ${step.number}`}>
                  <span className="route-itinerary__number">{step.number}</span>
                </div>

                {/* Empty spacer for alternating balance on desktop */}
                <div className="route-itinerary__spacer" aria-hidden="true" />
              </div>
            )
          })}
        </div>

        <div className="route-itinerary__footer-note">
          <p>
            <Icon name="clock" size={15} className="route-itinerary__note-icon" /> <em>Тайминг и последовательность остановок могут гибко корректироваться гидом в зависимости от погодных условий, освещения и пожеланий вашей компании.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
