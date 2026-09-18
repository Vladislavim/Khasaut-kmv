import {
  departureCities,
  formatRubles,
  tripFormats,
  type DepartureCity,
  type RoutePrice,
} from '../../data/prices'
import { Icon } from '../ui/Icon'

type PriceRoutePanelProps = {
  route: RoutePrice
  selectedCity: DepartureCity
  compareCities?: boolean
  defaultOpen?: boolean
}

export function PriceRoutePanel({ route, selectedCity, compareCities = false, defaultOpen = false }: PriceRoutePanelProps) {
  const selectedCityLabel = departureCities.find((city) => city.id === selectedCity)?.label ?? selectedCity

  return (
    <details className="price-route-panel" open={defaultOpen}>
      <summary>
        <span>
          <small>{route.category === 'thermal' ? 'Термальные источники' : route.category === 'routes' ? 'Пешие маршруты' : 'Экскурсии и джип-туры'}</small>
          <strong>{route.title}</strong>
        </span>
        <span className="price-route-panel__preview"><b>{formatRubles(route.prices.group[selectedCity])}</b><small>за человека</small></span>
        <Icon name="arrow" size={18} />
      </summary>
      <div className="price-route-panel__body">
        <a className="price-route-panel__calculate" href={`/prices?route=${route.id}&city=${selectedCity}&format=group#prices-calculator`}>Рассчитать для своей компании <Icon name="arrow" size={16} /></a>
        <div className="price-route-panel__mobile-summary">
          <span className="price-route-panel__mobile-city">{selectedCityLabel}</span>
          {tripFormats.map((format) => (
            <div className="price-route-panel__mobile-row" key={format.id}>
              <span>{format.id === 'group' ? 'В группе' : format.id === 'private1to4' ? 'Индивидуально 1-4' : 'Индивидуально 5-6'}</span>
              <strong>{formatRubles(route.prices[format.id][selectedCity])}</strong>
              <small>{format.unit}</small>
            </div>
          ))}
        </div>
        <div className={`price-route-panel__comparison ${compareCities ? 'is-visible' : ''}`}>
          {tripFormats.map((format) => (
            <section className="price-format" key={format.id} aria-labelledby={`${route.id}-${format.id}`}>
              <div className="price-format__heading">
                <h3 id={`${route.id}-${format.id}`}>{format.label}</h3>
                <span>{format.unit}</span>
              </div>
              <div className="price-city-grid">
                {departureCities.map((city) => (
                  <div className={`price-city ${selectedCity === city.id ? 'is-selected' : ''}`} key={city.id}>
                    <span>{city.label}</span>
                    <strong>{formatRubles(route.prices[format.id][city.id])}</strong>
                  </div>
              ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </details>
  )
}
