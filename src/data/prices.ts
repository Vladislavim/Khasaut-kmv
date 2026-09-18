export const departureCities = [
  { id: 'kislovodsk', label: 'Кисловодск' },
  { id: 'essentuki', label: 'Ессентуки' },
  { id: 'pyatigorsk', label: 'Пятигорск' },
  { id: 'zheleznovodsk', label: 'Железноводск' },
  { id: 'mineralnye-vody', label: 'Минеральные Воды' },
] as const

export type DepartureCity = typeof departureCities[number]['id']

export const departureCityStorageKey = 'khasaut-departure-city'

export function getStoredDepartureCity(): DepartureCity {
  if (typeof window === 'undefined') return 'kislovodsk'
  let stored: string | null = null
  try { stored = window.localStorage.getItem(departureCityStorageKey) } catch { return 'kislovodsk' }
  return departureCities.some((city) => city.id === stored) ? stored as DepartureCity : 'kislovodsk'
}

export function persistDepartureCity(city: DepartureCity) {
  try { if (typeof window !== 'undefined') window.localStorage.setItem(departureCityStorageKey, city) } catch { /* Calculation remains usable when storage is unavailable. */ }
}

export const tripFormats = [
  { id: 'group', label: 'В группе до 8 человек', shortLabel: 'В группе', unit: 'за человека', cardUnit: 'за человека' },
  { id: 'private1to4', label: 'Индивидуальный формат 1-4 человека', shortLabel: '1-4', unit: 'за компанию до 4 человек', cardUnit: 'за компанию' },
  { id: 'private5to6', label: 'Индивидуальный формат 5-6 человек', shortLabel: '5-6', unit: 'за компанию 5-6 человек', cardUnit: 'за компанию' },
] as const

export type TripFormat = typeof tripFormats[number]['id']
export type PriceRouteKey =
  | 'dzhily-su-bermamyt'
  | 'rassvet-bermamyt'
  | 'dzhily-su-plus-bermamyt'
  | 'dombay-elbrus-aktoprak'
  | 'arkhyz'
  | 'ullu-tau-kanjol-balkaria'
  | 'ossetia-ingushetia'
  | 'grozny'
  | 'pereval-vosmerka'
  | 'narzan-honey'
  | 'suvorovskie'
  | 'baduk-and-hiking'

export type PriceRecord = Record<DepartureCity, number>

export type RoutePrice = {
  id: PriceRouteKey
  title: string
  category: 'excursions' | 'routes' | 'thermal'
  prices: {
    group: PriceRecord
    private1to4: PriceRecord
    private5to6: PriceRecord
  }
  note?: string
}

const price = (
  kislovodsk: number,
  essentuki: number,
  pyatigorsk: number,
  zheleznovodsk: number,
  mineralnyeVody: number,
): PriceRecord => ({ kislovodsk, essentuki, pyatigorsk, zheleznovodsk, 'mineralnye-vody': mineralnyeVody })

export const priceDate = '01.03.2026'

export const priceRoutes: RoutePrice[] = [
  {
    id: 'dzhily-su-bermamyt',
    title: 'Джилы-Суу / Бермамыт',
    category: 'excursions',
    prices: {
      group: price(3700, 4000, 4200, 4200, 4700),
      private1to4: price(14800, 16000, 16800, 16800, 18800),
      private5to6: price(22200, 24000, 25200, 25200, 28200),
    },
  },
  {
    id: 'rassvet-bermamyt',
    title: 'Рассвет Бермамыт',
    category: 'excursions',
    prices: {
      group: price(4200, 4500, 4700, 4700, 5200),
      private1to4: price(16800, 18000, 18800, 18800, 20800),
      private5to6: price(25200, 27000, 28200, 28200, 31200),
    },
  },
  {
    id: 'dzhily-su-plus-bermamyt',
    title: 'Джилы-Суу + Бермамыт',
    category: 'excursions',
    prices: {
      group: price(6000, 6000, 6500, 6500, 7000),
      private1to4: price(24000, 24000, 26000, 26000, 28000),
      private5to6: price(36000, 36000, 39000, 39000, 42000),
    },
  },
  {
    id: 'dombay-elbrus-aktoprak',
    title: 'Домбай / Эльбрус / Актопрак',
    category: 'excursions',
    prices: {
      group: price(4200, 4200, 4200, 4200, 4700),
      private1to4: price(16800, 16800, 16800, 16800, 18800),
      private5to6: price(25200, 25200, 25200, 25200, 28200),
    },
  },
  {
    id: 'arkhyz',
    title: 'Архыз',
    category: 'excursions',
    prices: {
      group: price(4700, 4700, 4700, 4700, 5200),
      private1to4: price(18800, 18800, 18800, 18800, 20800),
      private5to6: price(28200, 28200, 28200, 28200, 31200),
    },
  },
  {
    id: 'ullu-tau-kanjol-balkaria',
    title: 'Уллу-Тау / Канжол / Верхняя Балкария',
    category: 'excursions',
    prices: {
      group: price(5000, 5000, 5000, 5000, 5500),
      private1to4: price(20000, 20000, 20000, 20000, 22000),
      private5to6: price(30000, 30000, 30000, 30000, 33000),
    },
  },
  {
    id: 'ossetia-ingushetia',
    title: 'Северная Осетия / Ингушетия',
    category: 'excursions',
    note: '*4,5',
    prices: {
      group: price(5500, 5500, 5500, 5500, 6000),
      private1to4: price(24500, 24500, 24500, 24500, 26000),
      private5to6: price(33000, 33000, 33000, 33000, 36000),
    },
  },
  {
    id: 'grozny',
    title: 'Грозный',
    category: 'excursions',
    note: '*4,5',
    prices: {
      group: price(6000, 6000, 6000, 6000, 6500),
      private1to4: price(27000, 27000, 27000, 27000, 29000),
      private5to6: price(36000, 36000, 36000, 36000, 39000),
    },
  },
  {
    id: 'pereval-vosmerka',
    title: 'Перевал Восьмёрка',
    category: 'excursions',
    prices: {
      group: price(3500, 3800, 4300, 4300, 4800),
      private1to4: price(14000, 15200, 17200, 17200, 19200),
      private5to6: price(21000, 22800, 25800, 25800, 28800),
    },
  },
  {
    id: 'narzan-honey',
    title: 'Долина Нарзанов / Медовые',
    category: 'excursions',
    prices: {
      group: price(2000, 2300, 2500, 2500, 3000),
      private1to4: price(8000, 9200, 10000, 10000, 12000),
      private5to6: price(12000, 13800, 15000, 15000, 18000),
    },
  },
  {
    id: 'suvorovskie',
    title: 'Суворовские источники',
    category: 'thermal',
    prices: {
      group: price(900, 900, 900, 900, 900),
      private1to4: price(3600, 3600, 3600, 3600, 3600),
      private5to6: price(5400, 5400, 5400, 5400, 5400),
    },
  },
  {
    id: 'baduk-and-hiking',
    title: 'Бадукские и другие пешие',
    category: 'routes',
    prices: {
      group: price(5500, 5500, 5500, 5500, 6000),
      private1to4: price(22000, 22000, 22000, 22000, 24000),
      private5to6: price(33000, 33000, 33000, 33000, 36000),
    },
  },
]

export const routePriceKeys: Partial<Record<string, PriceRouteKey>> = {
  'dzhily-su': 'dzhily-su-bermamyt',
  'dzhily-su-bermamyt': 'dzhily-su-plus-bermamyt',
  bermamyt: 'rassvet-bermamyt',
  dombay: 'dombay-elbrus-aktoprak',
  elbrus: 'dombay-elbrus-aktoprak',
  aktoprak: 'dombay-elbrus-aktoprak',
  arkhyz: 'arkhyz',
  balkaria: 'ullu-tau-kanjol-balkaria',
  ossetia: 'ossetia-ingushetia',
  ingushetia: 'ossetia-ingushetia',
  grozny: 'grozny',
  honey: 'narzan-honey',
  narzan: 'narzan-honey',
  'baduk-lakes': 'baduk-and-hiking',
  suvorovskie: 'suvorovskie',
}

export const additionalPriceConditions = [
  'Детям до 7 лет рекомендуется делать скидку не более 300 ₽ / чел.',
  'При обращении групп от 10 человек в мини-группу до 8 человек можно сделать скидку 500 ₽ / чел.',
  'При обращении групп от 18 человек указана возможность бесплатно отвезти организатора.',
]

export function getPriceRoute(priceKey?: string | null) {
  return priceRoutes.find((route) => route.id === priceKey)
}

export function getPriceKeyForRouteSlug(slug: string) {
  return routePriceKeys[slug]
}

export function getRoutePrice(priceKey: string | undefined, city: DepartureCity, format: TripFormat) {
  const route = getPriceRoute(priceKey)
  return route?.prices[format][city]
}

export function getMinimumGroupPrice(priceKey: string | undefined) {
  const route = getPriceRoute(priceKey)
  if (!route) return undefined
  return Math.min(...Object.values(route.prices.group))
}

export function formatRubles(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
}
