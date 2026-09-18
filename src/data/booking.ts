import { innerContacts } from './innerContacts'
import {
  formatRubles,
  getPriceRoute,
  getRoutePrice,
  departureCities,
  tripFormats,
  type DepartureCity,
  type PriceRouteKey,
  type TripFormat,
} from './prices'

export type BookingSelection = {
  routeKey: PriceRouteKey
  city: DepartureCity
  format: TripFormat
  guests?: number
  date?: string
}

export function buildEstimatePath(selection: BookingSelection) {
  return `/prices/?${new URLSearchParams({ route: selection.routeKey, city: selection.city, format: selection.format, guests: String(selection.guests ?? 2), ...(selection.date ? { date: selection.date } : {}) })}#prices-calculator`
}

export function buildWhatsAppBookingUrl(selection: BookingSelection) {
  const route = getPriceRoute(selection.routeKey)
  const city = departureCities.find((item) => item.id === selection.city)
  const format = tripFormats.find((item) => item.id === selection.format)
  const amount = route ? getRoutePrice(route.id, selection.city, selection.format) : undefined

  const message = [
    'Здравствуйте! Хочу уточнить дату и места на экскурсию.',
    `Маршрут: ${route?.title ?? 'уточним маршрут'}`,
    `Город отправления: ${city?.label ?? 'уточним город'}`,
    `Формат: ${format?.label ?? 'уточним формат'}`,
    ...(selection.guests ? [`Гостей: ${selection.guests}`] : []),
    ...(selection.date ? [`Желаемая дата: ${selection.date}`] : []),
    `Ориентир по стоимости: ${amount ? `${formatRubles(amount)} ${format?.unit ?? ''}`.trim() : 'по запросу'}`,
    ...(amount && selection.guests ? [`За всех гостей: ${formatRubles(selection.format === 'group' ? amount * selection.guests : amount)}. Дополнительные расходы не включены.`] : []),
    '',
    'Подскажите, пожалуйста, доступные даты и детали поездки.',
  ].join('\n')

  const whatsappBaseUrl = innerContacts.whatsapp.href.split('?')[0]
  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`
}
