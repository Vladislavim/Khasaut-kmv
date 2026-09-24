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
import { Icon, type IconName } from '../ui/Icon'
import { PriceInclusions } from './PriceInclusions'
import { BookingTerms } from './BookingTerms'
import { innerContacts } from '../../data/innerContacts'
import { innerWebAssets } from '../../data/innerWebAssets'

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

// Visual and metadata enhancement for every route on the ticket
const routeMeta: Record<PriceRouteKey, {
  image: string
  badge: string
  code: string
  altitude?: string
  highlights: string
}> = {
  'dzhily-su-bermamyt': {
    image: innerWebAssets['dzhily-su-bermamyt'][0],
    badge: 'Водопады и скалы Аватары',
    code: 'DZH-BERM',
    altitude: '2 592 м',
    highlights: 'Водопад Султан · Плато Бермамыт · Нарзанные ванны',
  },
  'rassvet-bermamyt': {
    image: innerWebAssets.bermamyt[0],
    badge: 'Встреча солнца над облаками',
    code: 'SUN-BERM',
    altitude: '2 592 м',
    highlights: 'Рассвет над облаками · Вид на Эльбрус · Скалы Монахи',
  },
  'dzhily-su-plus-bermamyt': {
    image: innerWebAssets['dzhily-su'][0],
    badge: 'Два легендарных плато за 1 день',
    code: 'MAX-DAY',
    altitude: '2 592 м',
    highlights: 'Джилы-Суу + Бермамыт · Максимум впечатлений',
  },
  'dombay-elbrus-aktoprak': {
    image: innerWebAssets.dombay[0],
    badge: 'Ледники, вершины и перевалы',
    code: 'DOM-ELB',
    altitude: 'до 3 847 м',
    highlights: 'Панорамы ледников · Канатные дороги · Озеро Гижгит',
  },
  'arkhyz': {
    image: innerWebAssets.arkhyz[0],
    badge: 'Бирюзовые озёра и пихтовые леса',
    code: 'ARKH-AL',
    altitude: '2 200 м',
    highlights: 'Софийские водопады · Древние храмы · Альпийские луга',
  },
  'ullu-tau-kanjol-balkaria': {
    image: innerWebAssets.balkaria[0],
    badge: 'Древние башни и скальные теснины',
    code: 'BALK-KAN',
    altitude: '2 100 м',
    highlights: 'Черекская теснина · Замок Шато-Эркен · Горячие термы',
  },
  'ossetia-ingushetia': {
    image: innerWebAssets.ossetia[0],
    badge: 'Средневековые башенные города',
    code: 'OSS-ING',
    altitude: '1 950 м',
    highlights: 'Башенные комплексы · Кармадон · Даргавс',
  },
  'grozny': {
    image: innerWebAssets.grozny[0],
    badge: 'Величественные мечети и вечерние огни',
    code: 'GROZ-CITY',
    highlights: 'Сердце Чечни · Мечеть Гордость Мусульман · Грозный Сити',
  },
  'pereval-vosmerka': {
    image: innerWebAssets['pereval-vosmerka'][0],
    badge: 'Настоящее джип-сафари 4×4',
    code: 'PER-VOSM',
    altitude: '2 400 м',
    highlights: 'Грунтовые перевалы · Высокогорные панорамы',
  },
  'narzan-honey': {
    image: innerWebAssets.narzan[0],
    badge: 'Минеральные ключи и ущелья',
    code: 'NARZ-HON',
    altitude: '1 100 м',
    highlights: 'Долина Нарзанов · Медовые водопады · Чай и хычыны',
  },
  'suvorovskie': {
    image: innerWebAssets.suvorovskie[0],
    badge: 'Горячие целебные бассейны',
    code: 'SUV-TERM',
    altitude: 'Термы',
    highlights: 'Бассейны +45 °C · Минеральный релакс после гор',
  },
  'baduk-and-hiking': {
    image: innerWebAssets['baduk-lakes'][0],
    badge: 'Заповедные тропы Теберды',
    code: 'BAD-HIK',
    altitude: '1 980 м',
    highlights: 'Три высокогорных озера · Хвойный реликтовый лес',
  },
}

// Quick filter chips for popular destinations
const popularQuickRoutes: { id: PriceRouteKey; label: string; icon: IconName }[] = [
  { id: 'dzhily-su-bermamyt', label: 'Джилы-Суу', icon: 'star' },
  { id: 'rassvet-bermamyt', label: 'Рассвет Бермамыт', icon: 'sunrise' },
  { id: 'dombay-elbrus-aktoprak', label: 'Домбай / Эльбрус', icon: 'mountain' },
  { id: 'ullu-tau-kanjol-balkaria', label: 'Балкария', icon: 'castle' },
  { id: 'arkhyz', label: 'Архыз', icon: 'forest' },
  { id: 'suvorovskie', label: 'Термы', icon: 'water' },
]

export function PriceConfigurator({
  selection,
  onSelectionChange,
  className = '',
  compact = false,
  heading = 'Стоимость поездки',
  intro = '',
  showHeading = true,
  showRoute = true,
  showAllPricesLink = true,
  showInclusions = true,
  showBookingTerms = true,
  titleId = 'price-configurator-title',
  id,
}: PriceConfiguratorProps) {
  const [internalSelection, setInternalSelection] = useState(() => ({
    ...defaultSelection,
    city: getStoredDepartureCity(),
  }))
  const current = selection ?? internalSelection
  const route = getPriceRoute(current.routeKey) ?? priceRoutes[0]
  const format = tripFormats.find((item) => item.id === current.format) ?? tripFormats[0]
  const amount = getRoutePrice(route.id, current.city, current.format)
  const meta = routeMeta[current.routeKey] ?? routeMeta['dzhily-su-bermamyt']

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
  const total = amount ? (current.format === 'group' ? amount * guests : amount) : undefined
  const city = departureCities.find((item) => item.id === current.city)
  const today = new Date().toLocaleDateString('sv-SE')
  const validDate = date >= today ? date : ''
  const privatePrice = getRoutePrice(route.id, current.city, guests <= 4 ? 'private1to4' : 'private5to6')
  const samePricePrivate = current.format === 'group' && guests <= 6 && total === privatePrice

  useEffect(() => {
    if (touched) {
      window.dispatchEvent(
        new CustomEvent('khasaut:estimate', {
          detail: { routeKey: current.routeKey, city: current.city, format: current.format, guests, date: validDate },
        })
      )
    }
  }, [touched, current.routeKey, current.city, current.format, guests, validDate])

  const updateSelection = (patch: Partial<PriceSelection>) => {
    const next = { ...current, ...patch }
    if (patch.format) {
      setGuestCount(
        Math.max(
          patch.format === 'private5to6' ? 5 : 1,
          Math.min(patch.format === 'group' ? 8 : patch.format === 'private1to4' ? 4 : 6, guests)
        )
      )
    }
    if (!selection) setInternalSelection(next)
    if (patch.city) persistDepartureCity(next.city)
    track('price_selection_change', { route: next.routeKey, city: next.city, format: next.format })
    onSelectionChange?.(next)
  }

  const handleRouteChange = (event: ChangeEvent<HTMLSelectElement>) =>
    updateSelection({ routeKey: event.target.value as PriceRouteKey })
  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) =>
    updateSelection({ city: event.target.value as DepartureCity })
  const bookingHref = buildWhatsAppBookingUrl({ ...current, guests, date: validDate })

  const saveEstimate = async () => {
    const url = new URL(buildEstimatePath({ ...current, guests, date: validDate }), window.location.origin)
    setSavedLink(url.href)
    setCopied(false)
    try {
      await navigator.clipboard.writeText(url.href)
      setCopied(true)
      track('estimate_copy', { route: current.routeKey })
      setTimeout(() => setCopied(false), 3000)
    } catch {
      /* The visible field supports manual copying. */
    }
  }

  const formatCards: {
    id: TripFormat
    badge: string
    title: string
    icon: IconName
    desc: string
    unit: string
  }[] = [
    {
      id: 'group',
      badge: 'Популярный',
      title: 'Мини-группа',
      icon: 'users',
      desc: 'до 8 человек · с другими гостями',
      unit: '/ чел.',
    },
    {
      id: 'private1to4',
      badge: 'Индивидуально',
      title: 'Своя компания (1–4)',
      icon: 'car',
      desc: 'Весь внедорожник 4×4 только для вас',
      unit: '/ авто',
    },
    {
      id: 'private5to6',
      badge: 'Для семьи',
      title: 'Большая компания (5–6)',
      icon: 'van',
      desc: 'Просторный джип для дружной группы',
      unit: '/ авто',
    },
  ]

  return (
    <section
      id={id}
      className={`price-configurator trip-planner ${compact ? 'price-configurator--compact' : ''} ${
        !showHeading ? 'price-configurator--no-heading' : ''
      } ${!showRoute ? 'price-configurator--route-known' : ''} ${className}`.trim()}
      aria-labelledby={showHeading ? titleId : undefined}
      aria-label={showHeading ? undefined : 'Расчёт стоимости'}
    >
      {showHeading && (
        <div className="price-configurator__heading">
          <div>
            <span className="section-kicker">Ваша поездка начинается здесь</span>
            <h2 id={titleId}>{heading}</h2>
          </div>
          <p>{intro || 'Соберите свой идеальный день в горах. Мгновенный расчёт без скрытых платежей.'}</p>
        </div>
      )}

      <div className="trip-planner__layout">
        {/* Left column: Controls */}
        <div
          className="trip-planner__controls"
          onChangeCapture={() => setTouched(true)}
          onInputCapture={() => setTouched(true)}
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest('button')) setTouched(true)
          }}
        >
          <div className="trip-planner__step">
            <span>01</span>
            <strong>Параметры поездки</strong>
          </div>

          {/* Route Selector with Quick Chips */}
          {showRoute && (
            <div className="price-field price-field--route-wrap">
              <div className="price-field__header">
                <span>Выберите маршрут</span>
                <span className="price-field__count">12 направлений</span>
              </div>

              {/* Popular quick-pick pills */}
              <div className="trip-planner__quick-routes" role="tablist" aria-label="Популярные направления">
                {popularQuickRoutes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`trip-planner__quick-chip ${current.routeKey === item.id ? 'is-active' : ''}`}
                    onClick={() => updateSelection({ routeKey: item.id })}
                  >
                    <span className="quick-chip__icon">
                      <Icon name={item.icon} size={14} />
                    </span>
                    <span className="quick-chip__label">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Full select dropdown */}
              <div className="price-select-wrap">
                <select name="route" value={current.routeKey} onChange={handleRouteChange} aria-label="Все направления">
                  {priceRoutes.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <span className="price-select-arrow" aria-hidden="true">
                  <Icon name="chevronDown" size={14} />
                </span>
              </div>
            </div>
          )}

          {/* Departure City & Format */}
          <div className="price-configurator__fields">
            <label className="price-field">
              <div className="price-field__header">
                <span>Город выезда (КМВ)</span>
              </div>
              <div className="price-select-wrap">
                <select name="departure-city" value={current.city} onChange={handleCityChange}>
                  {departureCities.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <span className="price-select-arrow" aria-hidden="true">
                  <Icon name="chevronDown" size={14} />
                </span>
              </div>
              <small className="price-field__subhint">Заберём вас прямо от отеля, санатория или дома</small>
            </label>

            {/* Date Input */}
            <label className="price-field">
              <div className="price-field__header">
                <span>Желаемая дата</span>
                <small className="price-field__optional">необязательно</small>
              </div>
              <input
                type="date"
                name="trip-date"
                min={today}
                value={date}
                onInput={(event) => setDate(event.currentTarget.value)}
                onChange={(event) => setDate(event.target.value)}
                className="price-field__date-input"
              />
              {date && !validDate && <small role="alert" className="price-field__error">Выберите сегодняшнюю или будущую дату.</small>}
              {!date && <small className="price-field__subhint">Дату можно согласовать позже в переписке</small>}
            </label>
          </div>

          {/* Trip Format Selection Cards */}
          <fieldset className="price-field price-field--format">
            <legend>Формат поездки</legend>
            <div className="price-format-grid" role="group" aria-label="Формат поездки">
              {formatCards.map((item) => {
                const formatPrice = getRoutePrice(route.id, current.city, item.id) ?? 0
                const isActive = current.format === item.id
                return (
                  <button
                    key={item.id}
                    className={`format-card ${isActive ? 'is-active' : ''}`}
                    type="button"
                    data-format-option={item.id}
                    aria-pressed={isActive}
                    onClick={() => updateSelection({ format: item.id })}
                  >
                    <div className="format-card__top">
                      <span className="format-card__icon">
                        <Icon name={item.icon} size={22} />
                      </span>
                      {item.badge && <span className="format-card__badge">{item.badge}</span>}
                    </div>
                    <span className="format-card__title">{item.title}</span>
                    <small className="format-card__desc">{item.desc}</small>
                    <div className="format-card__price">
                      <strong>{formatRubles(formatPrice)}</strong>
                      <em>{item.unit}</em>
                    </div>
                    <span className="format-card__indicator" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Guest Count Stepper */}
          <div className="price-field price-field--stepper">
            <div className="price-field__header">
              <span id={`${titleId}-guests`}>Количество гостей</span>
              <small className="price-field__subhint">Включая детей</small>
            </div>
            <div className="trip-planner__stepper-row">
              <div className="trip-planner__stepper" role="group" aria-labelledby={`${titleId}-guests`}>
                <button
                  type="button"
                  aria-label="Уменьшить число гостей"
                  disabled={guests <= minGuests}
                  onClick={() => {
                    setGuestCount(guests - 1)
                    track('price_selection_change', { guests: guests - 1 })
                  }}
                >
                  −
                </button>
                <output aria-live="polite">
                  <strong>{guests}</strong> <small>{guests === 1 ? 'человек' : guests < 5 ? 'человека' : 'человек'}</small>
                </output>
                <button
                  type="button"
                  aria-label="Увеличить число гостей"
                  disabled={guests >= maxGuests}
                  onClick={() => {
                    setGuestCount(guests + 1)
                    track('price_selection_change', { guests: guests + 1 })
                  }}
                >
                  +
                </button>
              </div>
              <div className="trip-planner__guest-icons" aria-hidden="true">
                {Array.from({ length: Math.min(guests, 8) }).map((_, i) => (
                  <span key={i} className="guest-icon-dot">
                    <Icon name="user" size={13} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hints & Upsell */}
          {showRoute && route.title.includes('/') && (
            <p className="trip-planner__hint">
              <Icon name="info" size={15} /> Через «/» указаны разные маршруты с единым тарифом. Точную локацию согласуем при подтверждении.
            </p>
          )}

          {samePricePrivate && (
            <button
              className="trip-planner__suggestion"
              type="button"
              onClick={() => updateSelection({ format: guests <= 4 ? 'private1to4' : 'private5to6' })}
            >
              <Icon name="star" size={16} /> <strong>Индивидуальный джип по той же цене!</strong> Нажмите, чтобы выбрать индивидуальный формат без других попутчиков →
            </button>
          )}

          {/* High-value Inclusions Banner */}
          <div className="trip-planner__inclusions-strip">
            <div className="inclusions-strip__item">
              <span className="inclusions-strip__icon">
                <Icon name="car" size={16} />
              </span>
              <span>Внедорожник 4×4</span>
            </div>
            <div className="inclusions-strip__item">
              <span className="inclusions-strip__icon">
                <Icon name="location" size={16} />
              </span>
              <span>Заберём от дома / отеля</span>
            </div>
            <div className="inclusions-strip__item">
              <span className="inclusions-strip__icon">
                <Icon name="camera" size={16} />
              </span>
              <span>Время на фото без спешки</span>
            </div>
            <div className="inclusions-strip__item">
              <span className="inclusions-strip__icon">
                <Icon name="lock" size={16} />
              </span>
              <span>Предоплата 1 500 ₽</span>
            </div>
          </div>

          {(showInclusions || showBookingTerms) && (
            <div className="trip-planner__extra-meta">
              {showInclusions && <PriceInclusions />}
              {showBookingTerms && <BookingTerms />}
            </div>
          )}
        </div>

        {/* Right column: Alpine Mountain Boarding Pass (Ticket) */}
        <div className="trip-ticket">
          {/* Visual Header / Cover Photo */}
          <div className="trip-ticket__cover">
            <img src={meta.image} alt={route.title} className="trip-ticket__cover-img" />
            <div className="trip-ticket__cover-overlay" />
            <div className="trip-ticket__cover-badge">
              <span>{meta.badge}</span>
              {meta.altitude && <strong className="trip-ticket__altitude">{meta.altitude}</strong>}
            </div>
            <div className="trip-ticket__pass-id">
              <span>ЭКСПЕДИЦИОННЫЙ БИЛЕТ</span>
              <code>{meta.code}-2026</code>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="trip-ticket__body">
            <div className="trip-ticket__route-title">
              <h3>{route.title}</h3>
              <p className="trip-ticket__departure">
                <Icon name="location" size={14} /> Выезд: <strong>{city?.label}</strong> (от отеля)
              </p>
            </div>

            {/* Dynamic travel chips */}
            <div className="trip-ticket__details">
              <span>
                <Icon name="users" size={13} /> {guests} {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}
              </span>
              <span>
                <Icon name="calendar" size={13} /> {validDate ? new Date(`${validDate}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) : 'Дату подберём'}
              </span>
              <span>
                <Icon name={current.format === 'group' ? 'tag' : 'car'} size={13} /> {current.format === 'group' ? 'Мини-группа' : 'Индивидуально'}
              </span>
            </div>

            {/* Perforated ticket tear line with cutouts */}
            <div className="trip-ticket__perforation" aria-hidden="true">
              <span className="ticket-cutout ticket-cutout--left" />
              <span className="ticket-line" />
              <span className="ticket-cutout ticket-cutout--right" />
            </div>

            {/* Price section */}
            <div className="trip-ticket__total" aria-live="polite" aria-atomic="true">
              <span className="trip-ticket__total-label">Ориентир за всех гостей</span>
              <div className="trip-ticket__price-lockup">
                <strong className="trip-ticket__price-sum">{total ? formatRubles(total) : 'По запросу'}</strong>
              </div>
              <small className="trip-ticket__price-sub">
                {amount
                  ? current.format === 'group'
                    ? `${formatRubles(amount)} × ${guests} чел.`
                    : `${formatRubles(Math.round(amount / guests))} на человека при ${guests} гостях`
                  : format.unit}
              </small>
            </div>

            {/* Reassurance points */}
            <div className="trip-ticket__perks">
              <div className="trip-ticket__perk">
                <span className="perk-check">
                  <Icon name="check" size={12} />
                </span>
                <span>Предоплата всего <strong>1 500 ₽</strong> за весь тур</span>
              </div>
              <div className="trip-ticket__perk">
                <span className="perk-check">
                  <Icon name="check" size={12} />
                </span>
                <span>Остаток оплаты — в день выезда гиду</span>
              </div>
              <div className="trip-ticket__perk">
                <span className="perk-check">
                  <Icon name="check" size={12} />
                </span>
                <span>Комфортный внедорожник 4×4 от места проживания</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <a
              className="trip-ticket__cta"
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              data-booking-link
              onClick={() =>
                track('booking_click', {
                  route: current.routeKey,
                  city: current.city,
                  format: current.format,
                  guests,
                  total,
                  source: 'calculator',
                })
              }
            >
              <Icon name="whatsapp" size={20} />
              <span>Уточнить дату и места</span>
              <Icon name="arrow" size={16} />
            </a>

            <p className="trip-ticket__micro">
              Откроется WhatsApp с готовым расчётом.<br />
              Дату и свободные места подтвердит Эльдар лично.
            </p>

            {/* Secondary actions */}
            <div className="trip-ticket__actions">
              <button className="trip-ticket__save" type="button" onClick={saveEstimate}>
                {copied ? (
                  <>
                    <Icon name="check" size={14} /> Ссылка скопирована!
                  </>
                ) : (
                  <>
                    <Icon name="link" size={14} /> Скопировать ссылку на расчёт
                  </>
                )}
              </button>

              {savedLink && !copied && (
                <div className="trip-ticket__save-note" role="status">
                  <input
                    aria-label="Ссылка на расчёт"
                    readOnly
                    value={savedLink}
                    onFocus={(event) => event.target.select()}
                  />
                </div>
              )}

              <a
                className="trip-ticket__phone"
                href={innerContacts.primaryPhone.href}
                onClick={() => track('contact_click', { source: 'calculator', channel: 'phone' })}
              >
                <Icon name="phone" size={14} /> Или позвонить: {innerContacts.primaryPhone.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="trip-planner__footer">
        <p>
          Все выезды индивидуально согласовываются под погодные условия в горах. Питание и экологические сборы парков оплачиваются на месте.
        </p>
        {showAllPricesLink && (
          <a className="inner-button inner-button--quiet" href="/prices">
            Все цены и направления <Icon name="arrow" size={16} />
          </a>
        )}
      </div>
    </section>
  )
}
