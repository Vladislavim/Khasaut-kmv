import { useEffect, useState, type ChangeEvent } from 'react'
import {
  departureCities,
  formatRubles,
  getStoredDepartureCity,
  getPriceRoute,
  getRoutePrice,
  persistDepartureCity,
  priceRoutes,
  tripFormats,
  type DepartureCity,
  type PriceRouteKey,
  type TripFormat,
} from '../../data/prices'
import { buildEstimatePath, buildWhatsAppBookingUrl } from '../../data/booking'
import { track } from '../../lib/analytics'
import { Icon } from '../ui/Icon'
import { PriceInclusions } from './PriceInclusions'
import { BookingTerms } from './BookingTerms'
import { innerContacts } from '../../data/innerContacts'
import { bookingRules } from '../../data/bookingRules'

export type PriceSelection = {
  routeKey: PriceRouteKey
  city: DepartureCity
  format: TripFormat
}

type PriceConfiguratorProps = {
  selection?: PriceSelection
  onSelectionChange?: (selection: PriceSelection) => void
  className?: string
  compact?: boolean
  heading?: string
  intro?: string
  showHeading?: boolean
  showRoute?: boolean
  showAllPricesLink?: boolean
  showInclusions?: boolean
  showBookingTerms?: boolean
  titleId?: string
  id?: string
}

const defaultSelection: PriceSelection = {
  routeKey: priceRoutes[0].id,
  city: 'kislovodsk',
  format: 'group',
}

export function PriceConfigurator({ selection, onSelectionChange, className = '', compact = false, heading = 'Стоимость поездки', intro = '', showHeading = true, showRoute = true, showAllPricesLink = true, showInclusions = true, showBookingTerms = true, titleId = 'price-configurator-title', id }: PriceConfiguratorProps) {
  const [internalSelection, setInternalSelection] = useState(() => ({ ...defaultSelection, city: getStoredDepartureCity() }))
  const current = selection ?? internalSelection
  const route = getPriceRoute(current.routeKey) ?? priceRoutes[0]
  const format = tripFormats.find((item) => item.id === current.format) ?? tripFormats[0]
  const amount = getRoutePrice(route.id, current.city, current.format)
  const [guestCount, setGuestCount] = useState(() => {
    const value = typeof window === 'undefined' ? 2 : Number(new URLSearchParams(window.location.search).get('guests') ?? 2)
    return Number.isInteger(value) && value > 0 ? value : 2
  })
  const [date, setDate] = useState(() => {
    const value = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('date') ?? ''
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) ? value : ''
  })
  const [savedLink, setSavedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState(false)
  const minGuests = current.format === 'private5to6' ? 5 : 1
  const maxGuests = current.format === 'group' ? 8 : current.format === 'private1to4' ? 4 : 6
  const guests = Math.max(minGuests, Math.min(maxGuests, guestCount))
  const total = amount ? current.format === 'group' ? amount * guests : amount : undefined
  const city = departureCities.find((item) => item.id === current.city)
  const today = new Date().toLocaleDateString('sv-SE')
  const validDate = date >= today ? date : ''
  const privatePrice = getRoutePrice(route.id, current.city, guests <= 4 ? 'private1to4' : 'private5to6')
  const samePricePrivate = current.format === 'group' && guests <= 6 && total === privatePrice
  useEffect(() => {
    if (touched) window.dispatchEvent(new CustomEvent('khasaut:estimate', { detail: { routeKey: current.routeKey, city: current.city, format: current.format, guests, date: validDate } }))
  }, [touched, current.routeKey, current.city, current.format, guests, validDate])

  const updateSelection = (patch: Partial<PriceSelection>) => {
    const next = { ...current, ...patch }
    if (patch.format) setGuestCount(Math.max(patch.format === 'private5to6' ? 5 : 1, Math.min(patch.format === 'group' ? 8 : patch.format === 'private1to4' ? 4 : 6, guests)))
    if (!selection) setInternalSelection(next)
    if (patch.city) persistDepartureCity(next.city)
    track('price_selection_change', { route: next.routeKey, city: next.city, format: next.format })
    onSelectionChange?.(next)
  }

  const handleRouteChange = (event: ChangeEvent<HTMLSelectElement>) => updateSelection({ routeKey: event.target.value as PriceRouteKey })
  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => updateSelection({ city: event.target.value as DepartureCity })
  const bookingHref = buildWhatsAppBookingUrl({ ...current, guests, date: validDate })
  const saveEstimate = async () => {
    const url = new URL(buildEstimatePath({ ...current, guests, date: validDate }), window.location.origin)
    setSavedLink(url.href)
    setCopied(false)
    try {
      await navigator.clipboard.writeText(url.href)
      setCopied(true)
      track('estimate_copy', { route: current.routeKey })
    } catch { /* The visible field supports manual copying. */ }
  }

  return (
    <section id={id} className={`price-configurator trip-planner ${compact ? 'price-configurator--compact' : ''} ${!showHeading ? 'price-configurator--no-heading' : ''} ${!showRoute ? 'price-configurator--route-known' : ''} ${className}`.trim()} aria-labelledby={showHeading ? titleId : undefined} aria-label={showHeading ? undefined : 'Расчёт стоимости'}>
      {showHeading && (
        <div className="price-configurator__heading">
          <div>
            <span className="section-kicker">Ваша поездка начинается здесь</span>
            <h2 id={titleId}>{heading}</h2>
          </div>
          <p>{intro || 'Соберите свой день в горах. Узнайте бюджет и уточните свободные места у организатора.'}</p>
        </div>
      )}

      <div className="trip-planner__layout">
      <div className="trip-planner__controls" onChangeCapture={() => setTouched(true)} onInputCapture={() => setTouched(true)} onClickCapture={event => { if ((event.target as HTMLElement).closest('button')) setTouched(true) }}>
      <div className="trip-planner__step"><span>01</span> Настройте поездку</div>
      <div className="price-configurator__fields">
        {showRoute && (
          <label className="price-field">
            <span>Маршрут</span>
            <select name="route" value={current.routeKey} onChange={handleRouteChange}>
              {priceRoutes.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
            </select>
          </label>
        )}
        <label className="price-field">
            <span>Город выезда</span>
          <select name="departure-city" value={current.city} onChange={handleCityChange}>
            {departureCities.map((city) => <option value={city.id} key={city.id}>{city.label}</option>)}
          </select>
        </label>
        <fieldset className="price-field price-field--format">
          <legend>Формат поездки</legend>
          <div className="price-format-options" role="group" aria-label="Формат поездки">
            {tripFormats.map((item) => (
              <button
                className={current.format === item.id ? 'is-active' : ''}
                type="button"
                key={item.id}
                data-format-option={item.id}
                aria-pressed={current.format === item.id}
                onClick={() => updateSelection({ format: item.id })}
              >
                <span>{item.id === 'group' ? 'Мини-группа' : item.id === 'private1to4' ? 'Своя компания' : 'Большая компания'}</span>
                <small>{item.id === 'group' ? 'до 8 человек · с другими гостями' : item.id === 'private1to4' ? '1–4 человека · индивидуально' : '5–6 человек · индивидуально'}</small>
                <b>{formatRubles(getRoutePrice(route.id, current.city, item.id) ?? 0)} <em>{item.id === 'group' ? '/ чел.' : '/ комп.'}</em></b>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="price-field">
          <span id={`${titleId}-guests`}>Сколько вас едет</span>
          <div className="trip-planner__stepper" role="group" aria-labelledby={`${titleId}-guests`}>
            <button type="button" aria-label="Уменьшить число гостей" disabled={guests <= minGuests} onClick={() => { setGuestCount(guests - 1); track('price_selection_change', { guests: guests - 1 }) }}>−</button>
            <output aria-live="polite">{guests} <small>чел.</small></output>
            <button type="button" aria-label="Увеличить число гостей" disabled={guests >= maxGuests} onClick={() => { setGuestCount(guests + 1); track('price_selection_change', { guests: guests + 1 }) }}>+</button>
          </div>
        </div>
        <label className="price-field">
          <span>Желаемая дата · необязательно</span>
          <input type="date" name="trip-date" min={today} value={date} onInput={(event) => setDate(event.currentTarget.value)} onChange={(event) => setDate(event.target.value)} />
          {date && !validDate && <small role="alert">Выберите сегодняшнюю или будущую дату.</small>}
        </label>
      </div>
      {showRoute && route.title.includes('/') && <p className="trip-planner__hint">Через «/» указаны разные маршруты с одинаковым тарифом. Нужное направление уточним в переписке.</p>}
      <p className="trip-planner__hint">Дети тоже считаются гостями. Детские условия и поездки от 9 человек обсудим лично.</p>
      {samePricePrivate && <button className="trip-planner__suggestion" type="button" onClick={() => updateSelection({ format: guests <= 4 ? 'private1to4' : 'private5to6' })}>Для вас индивидуально — за ту же цену. Выбрать <span aria-hidden="true">↗</span></button>}
      {showInclusions && <PriceInclusions />}
      {showBookingTerms && <BookingTerms />}
      </div>

      <div className="trip-ticket">
        <div className="trip-ticket__eyebrow"><span>02 / Ваш маршрут</span><span aria-hidden="true">↗</span></div>
        <h3>{route.title}</h3>
        <p className="trip-ticket__departure">Выезд: {city?.label}</p>
        <div className="trip-ticket__details"><span>{guests} чел.</span><span>{validDate ? new Date(`${validDate}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) : 'Дату подберём'}</span><span>{current.format === 'group' ? 'Мини-группа' : 'Индивидуально'}</span></div>
        <div className="trip-ticket__total" aria-live="polite" aria-atomic="true">
          <span>Ориентир за всех гостей</span>
          <strong>{total ? formatRubles(total) : 'По запросу'}</strong>
          <small>{amount ? current.format === 'group' ? `${formatRubles(amount)} × ${guests} чел.` : `${formatRubles(Math.round(amount / guests))} на человека при ${guests} гостях` : format.unit}</small>
        </div>
        <p className="trip-ticket__note">Поездка по маршруту и обратно. Питание, билеты и другие расходы — отдельно.</p>
        <a className="trip-ticket__cta" href={bookingHref} target="_blank" rel="noreferrer" data-booking-link onClick={() => track('booking_click', { route: current.routeKey, city: current.city, format: current.format, guests, total, source: 'calculator' })}>Уточнить дату и места <Icon name="arrow" size={18} /></a>
        <p className="trip-ticket__micro">Откроется WhatsApp с вашим расчётом.<br />Дату и итоговую стоимость подтвердит организатор.</p>
        <button className="trip-ticket__save" type="button" onClick={saveEstimate}>Сохранить ссылку на расчёт</button>
        {savedLink && <div className="trip-ticket__save-note" role="status"><label>{copied ? 'Ссылка скопирована. Можно отправить попутчикам.' : 'Скопируйте ссылку, чтобы вернуться к расчёту.'}<input aria-label="Ссылка на расчёт" readOnly value={savedLink} onFocus={event => event.target.select()} /></label></div>}
        <a className="trip-ticket__phone" href={innerContacts.primaryPhone.href} onClick={() => track('contact_click', { source: 'calculator', channel: 'phone' })}>Или позвоните: {innerContacts.primaryPhone.label}</a>
      </div>
      </div>
      <div className="trip-planner__footer">
        <p>{total && bookingRules.prepaymentPerPerson * guests <= total ? `Предоплата — ${formatRubles(bookingRules.prepaymentPerPerson)} с человека после подтверждения. Остальное — после поездки.` : 'Размер предоплаты для этого варианта уточните у организатора.'}</p>
        {showAllPricesLink && <a className="inner-button inner-button--quiet" href="/prices">Все цены <Icon name="arrow" size={16} /></a>}
      </div>
    </section>
  )
}
