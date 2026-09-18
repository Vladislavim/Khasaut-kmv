import { useState } from 'react'
import { getPriceKeyForRouteSlug, getStoredDepartureCity, priceDate } from '../../data/prices'
import { PriceConfigurator, type PriceSelection } from './PriceConfigurator'

type DetailPricePanelProps = {
  slug: string
}

export function DetailPricePanel({ slug }: DetailPricePanelProps) {
  const routeKey = getPriceKeyForRouteSlug(slug)
  const [selection, setSelection] = useState<PriceSelection | undefined>(routeKey ? { routeKey, city: getStoredDepartureCity(), format: 'group' } : undefined)

  if (!routeKey || !selection) {
    return (
      <section id="detail-price" className="detail-price-panel detail-price-panel--request" aria-labelledby="detail-price-title">
        <div>
          <span className="inner-kicker">Стоимость</span>
          <h2 id="detail-price-title">Стоимость</h2>
          <p>Уточним город отправления и формат поездки.</p>
        </div>
        <a className="inner-button inner-button--solid" href="/contact">Уточнить стоимость <span aria-hidden="true">→</span></a>
      </section>
    )
  }

  return (
    <div id="detail-price" className="detail-price-panel">
      <PriceConfigurator
        className="price-configurator--detail"
        compact
        heading="Стоимость"
        showRoute={false}
        showAllPricesLink={false}
        showInclusions={false}
        showBookingTerms={false}
        titleId="detail-price-title"
        selection={selection}
        onSelectionChange={setSelection}
      />
      <p className="detail-price-panel__date">Актуальная стоимость на {priceDate}</p>
    </div>
  )
}
