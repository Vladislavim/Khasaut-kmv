import { innerAssets } from './innerAssets'
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
    kicker: 'Водопады и плато',
    title: 'Джилы-Суу + Бермамыт',
    blurb: 'Водопады и нарзаны Джилы-Суу, затем плато с видом на Эльбрус. Два направления за один день.',
    image: innerAssets.excursionBermamytDzhilySu,
    alt: 'Горная долина на маршруте Джилы-Суу и Бермамыт',
    href: '/detail/dzhily-su-bermamyt',
    priceKey: 'dzhily-su-plus-bermamyt',
  },
  {
    kicker: 'Большой день в горах',
    title: 'Домбай',
    blurb: 'Ущелья, ледяные вершины и серпантины.',
    image: innerAssets.excursionDombay,
    alt: 'Горное ущелье Домбая',
    href: '/detail/dombay',
    priceKey: 'dombay-elbrus-aktoprak',
  },
  {
    kicker: 'Луга и ледяные вершины',
    title: 'Архыз',
    blurb: 'Зелёные долины и широкий горный хребет.',
    image: innerAssets.excursionArkhyz,
    alt: 'Зелёная долина Архыза среди гор',
    href: '/detail/arkhyz',
    priceKey: 'arkhyz',
  },
  {
    kicker: 'Горы, память, вкус',
    title: 'Северная Осетия',
    blurb: 'Горные ущелья, история края и знакомство с осетинской культурой.',
    image: innerAssets.excursionOssetia,
    alt: 'Горный пейзаж Северной Осетии',
    href: '/detail/ossetia',
    priceKey: 'ossetia-ingushetia',
  },
]
