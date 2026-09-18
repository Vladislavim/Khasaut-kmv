import { useEffect, useState } from 'react'
import { pricesMeta } from '../data/pricesMeta'
import {
  departureCities,
  getStoredDepartureCity,
  priceRoutes,
  type DepartureCity,
  type PriceRouteKey,
  type TripFormat,
} from '../data/prices'
import { InnerPageShell } from '../components/inner/InnerPageShell'
import { PriceConfigurator, type PriceSelection } from '../components/pricing/PriceConfigurator'
import { PriceRoutePanel } from '../components/pricing/PriceRoutePanel'
import { BookingTerms } from '../components/pricing/BookingTerms'
import { priceDate } from '../data/prices'
import { PriceFaq } from '../components/pricing/PriceFaq'


const isCity = (value: string | null): value is DepartureCity => departureCities.some((city) => city.id === value)
const isFormat = (value: string | null): value is TripFormat => ['group', 'private1to4', 'private5to6'].includes(value ?? '')
const isPriceRoute = (value: string | null): value is PriceRouteKey => priceRoutes.some((route) => route.id === value)

function getInitialState() {
  const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
  const route = isPriceRoute(params.get('route')) ? params.get('route') as PriceRouteKey : 'dzhily-su-bermamyt'
  const city = isCity(params.get('city')) ? params.get('city') as DepartureCity : getStoredDepartureCity()
  const format = isFormat(params.get('format')) ? params.get('format') as TripFormat : 'group'
  return { route, city, format }
}

export function PricesPage() {
  const initial = getInitialState()
  const [selectedRoute, setSelectedRoute] = useState<PriceRouteKey>(initial.route)
  const [selectedCity, setSelectedCity] = useState<DepartureCity>(initial.city)
  const [selectedFormat, setSelectedFormat] = useState<TripFormat>(initial.format)
  const [compareCities, setCompareCities] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('route', selectedRoute)
    params.set('city', selectedCity)
    params.set('format', selectedFormat)
    const query = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
  }, [selectedRoute, selectedCity, selectedFormat])

  const calculatorSelection: PriceSelection = { routeKey: selectedRoute, city: selectedCity, format: selectedFormat }

  const handleSelectionChange = (selection: PriceSelection) => {
    setSelectedRoute(selection.routeKey)
    setSelectedCity(selection.city)
    setSelectedFormat(selection.format)
  }

  return (
    <InnerPageShell meta={pricesMeta} className="inner-page--prices">
      <main id="inner-main" className="inner-main">
        <section className="inner-section price-page-intro" aria-labelledby="prices-calculator-title">
          <div className="container">
            <PriceConfigurator id="prices-calculator" titleId="prices-calculator-title" heading="Спланируйте день в горах" selection={calculatorSelection} onSelectionChange={handleSelectionChange} showBookingTerms={false} showAllPricesLink={false} compact />
          </div>
        </section>

        <section className="inner-section price-list-section" aria-labelledby="price-list-title">
          <div className="container">
            <div className="price-list-heading">
              <div>
                <span className="inner-kicker">Актуально на {priceDate}</span>
                <h2 id="price-list-title">Все цены</h2>
              </div>
            </div>

            <div className="price-filters" aria-label="Выбор города">
              <div className="price-city-filters" role="group" aria-label="Город отправления">
                {departureCities.map((city) => (
                  <button className={selectedCity === city.id ? 'is-active' : ''} type="button" key={city.id} onClick={() => setSelectedCity(city.id)} aria-pressed={selectedCity === city.id}>
                    {city.label}
                  </button>
                ))}
              </div>
              <label className="price-city-mobile-select">
                <span>Город отправления</span>
                <select name="mobile-price-city" value={selectedCity} onChange={(event) => setSelectedCity(event.target.value as DepartureCity)}>
                  {departureCities.map((city) => <option value={city.id} key={city.id}>{city.label}</option>)}
                </select>
              </label>
            </div>

            <button className="price-compare-toggle" type="button" aria-expanded={compareCities} onClick={() => setCompareCities((value) => !value)}>
              {compareCities ? 'Скрыть сравнение' : 'Сравнить города'} <span aria-hidden="true">{compareCities ? '−' : '+'}</span>
            </button>

            <div className={`price-routes-list ${compareCities ? 'is-comparing' : ''}`}>
              {priceRoutes.map((route) => <PriceRoutePanel key={route.id} route={route} selectedCity={selectedCity} compareCities={compareCities} defaultOpen={route.id === selectedRoute} />)}
            </div>
          </div>
        </section>

        <PriceFaq />
        <section className="inner-section price-conditions-section" aria-labelledby="price-conditions-title">
          <div className="container price-conditions">
              <div>
                <span className="inner-kicker">Перед поездкой</span>
                <h2 id="price-conditions-title">Бронирование</h2>
              </div>
              <div className="price-conditions__content">
                <BookingTerms />
              </div>
          </div>
        </section>
      </main>
    </InnerPageShell>
  )
}
