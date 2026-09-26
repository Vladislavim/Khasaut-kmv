import { useState } from 'react'
import {
  departureCities,
  formatRubles,
  getRoutePrice,
  priceRoutes,
  type DepartureCity,
  type PriceRouteKey,
  type TripFormat,
} from '../../data/prices'
import { Icon } from '../ui/Icon'
import { track } from '../../lib/analytics'
import { assets } from '../../data/assets'

const quickRouteChips: { id: PriceRouteKey; label: string }[] = [
  { id: 'dzhily-su-bermamyt', label: 'Джилы-Су' },
  { id: 'rassvet-bermamyt', label: 'Бермамыт' },
  { id: 'dombay-elbrus-aktoprak', label: 'Эльбрус' },
  { id: 'arkhyz', label: 'Архыз' },
]

export function QuickPriceCalculator({ id = 'home-price-calculator' }: { id?: string }) {
  const [routeKey, setRouteKey] = useState<PriceRouteKey>('dzhily-su-bermamyt')
  const [city, setCity] = useState<DepartureCity>('kislovodsk')
  const [format, setFormat] = useState<TripFormat>('group')

  const currentRoute = priceRoutes.find((r) => r.id === routeKey) || priceRoutes[0]
  const currentCity = departureCities.find((c) => c.id === city) || departureCities[0]
  const price = getRoutePrice(routeKey, city, format) ?? 4000

  const formatLabel = format === 'group' ? 'в мини-группе за 1 чел.' : 'за весь джип (до 4 чел.)'

  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Интересует тур «${currentRoute.title}» (${format === 'group' ? 'в группе' : 'индивидуально'}) с выездом из г. ${currentCity.label}. Подскажите свободные даты!`
  )
  const whatsappHref = `https://wa.me/79187477212?text=${whatsappMessage}`

  return (
    <section id={id} className="quick-calc-section" aria-label="Быстрый расчет стоимости">
      <img
        className="section-pattern section-pattern--compass quick-calc-pattern-left"
        src={assets.compassPattern}
        alt=""
        aria-hidden="true"
      />
      <img
        className="section-pattern section-pattern--botanical-right quick-calc-pattern-right"
        src={assets.botanicalRightPattern}
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <div className="quick-calc-card">
          <div className="quick-calc-header">
            <span className="inner-kicker">Расчёт за 5 секунд</span>
            <h2 className="quick-calc-title">Узнайте стоимость вашей поездки</h2>
            <p className="quick-calc-sub">Без скрытых доплат. Трансфер от отеля включён.</p>
          </div>

          <div className="quick-calc-body">
            {/* 1. Quick Route Selection */}
            <div className="quick-calc-group">
              <label className="quick-calc-label">Куда хотите поехать?</label>
              <div className="quick-calc-chips" role="group" aria-label="Популярные направления">
                {quickRouteChips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    className={`quick-calc-chip ${routeKey === chip.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setRouteKey(chip.id)
                      track('price_selection_change', { route: chip.id })
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <div className="quick-calc-select-wrap">
                <select
                  value={routeKey}
                  onChange={(e) => {
                    const key = e.target.value as PriceRouteKey
                    setRouteKey(key)
                    track('price_selection_change', { route: key })
                  }}
                  aria-label="Все направления"
                >
                  {priceRoutes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
                <span className="quick-calc-arrow" aria-hidden="true">
                  <Icon name="chevronDown" size={14} />
                </span>
              </div>
            </div>

            {/* 2. Format & City Row */}
            <div className="quick-calc-row">
              <div className="quick-calc-group quick-calc-group--half">
                <label className="quick-calc-label">Формат</label>
                <div className="quick-calc-toggle" role="group" aria-label="Формат">
                  <button
                    type="button"
                    className={`quick-calc-toggle-btn ${format === 'group' ? 'is-active' : ''}`}
                    onClick={() => {
                      setFormat('group')
                      track('price_selection_change', { format: 'group' })
                    }}
                  >
                    В группе
                  </button>
                  <button
                    type="button"
                    className={`quick-calc-toggle-btn ${format === 'private1to4' ? 'is-active' : ''}`}
                    onClick={() => {
                      setFormat('private1to4')
                      track('price_selection_change', { format: 'private' })
                    }}
                  >
                    Свой джип
                  </button>
                </div>
              </div>

              <div className="quick-calc-group quick-calc-group--half">
                <label className="quick-calc-label">Город выезда</label>
                <div className="quick-calc-select-wrap">
                  <select
                    value={city}
                    onChange={(e) => {
                      const c = e.target.value as DepartureCity
                      setCity(c)
                      track('price_selection_change', { city: c })
                    }}
                    aria-label="Город выезда"
                  >
                    {departureCities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span className="quick-calc-arrow" aria-hidden="true">
                    <Icon name="chevronDown" size={14} />
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Output & Primary Action */}
            <div className="quick-calc-result">
              <div className="quick-calc-price-wrap">
                <span className="quick-calc-price-sum">{formatRubles(price)}</span>
                <span className="quick-calc-price-note">{formatLabel}</span>
              </div>

              <div className="quick-calc-actions">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="quick-calc-whatsapp-btn"
                  onClick={() => track('booking_click', { route: routeKey, city, format, price, source: 'quick_calc' })}
                >
                  <Icon name="whatsapp" size={19} />
                  <span>Забронировать в WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="quick-calc-footer-meta">
              <span className="quick-calc-badge">
                <Icon name="check" size={12} /> Предоплата всего 1 500 ₽
              </span>
              <span className="quick-calc-badge">
                <Icon name="check" size={12} /> Заберём от отеля
              </span>
              <a href="/prices" className="quick-calc-all-link">
                Полный прайс-лист на 18 маршрутов →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
