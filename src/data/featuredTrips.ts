import { innerAssets } from './innerAssets'
import { innerWebAssets } from './innerWebAssets'
import type { PriceRouteKey } from './prices'

export type FeaturedTrip = {
  kicker: string
  title: string
  blurb: string
  image: string
  alt: string
  href: string
  priceKey: PriceRouteKey
}

export const featuredTrips: FeaturedTrip[] = [
  {
    kicker: 'Взрыв эмоций',
    title: 'Джилы-Суу + Бермамыт',
    blurb: 'Два легендарных места силы за один день: водопады и целебные нарзаны Джилы-Суу плюс закатное плато Бермамыт с панорамой Эльбруса.',
    image: innerAssets.excursionBermamytDzhilySu,
    alt: 'Горная долина на маршруте Джилы-Суу и Бермамыт',
    href: '/detail/dzhily-su-bermamyt',
    priceKey: 'dzhily-su-plus-bermamyt',
  },
  {
    kicker: 'Перебор эмоций',
    title: 'Домбай',
    blurb: 'Панорама с перевала Гум-Баши, Сырные пещеры, тысячелетний Шоанинский храм, серебряная река Уллу-Муруджу и канатные дороги к вечным снегам.',
    image: innerAssets.excursionDombay,
    alt: 'Горное ущелье Домбая',
    href: '/detail/dombay',
    priceKey: 'dombay-elbrus-aktoprak',
  },
  {
    kicker: 'Отдых душой и телом',
    title: 'Архыз',
    blurb: 'Древняя столица Алании с византийскими храмами X века, наскальный Лик Христа, Сырные пещеры и современный курорт Романтик.',
    image: innerWebAssets.arkhyz[1],
    alt: 'Зелёная долина Архыза среди гор',
    href: '/detail/arkhyz',
    priceKey: 'arkhyz',
  },
  {
    kicker: 'Душа и культура края',
    title: 'Северная Осетия',
    blurb: 'Куртатинское ущелье, 60-метровый каньон Кадаргаван, наскальная Дзивгисская крепость, некрополь Даргавс и Кармадонское ущелье.',
    image: innerAssets.excursionOssetia,
    alt: 'Горный пейзаж Северной Осетии',
    href: '/detail/ossetia',
    priceKey: 'ossetia-ingushetia',
  },
]
