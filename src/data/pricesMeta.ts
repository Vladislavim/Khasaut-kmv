import { assets } from './assets'
import { innerWebAssets } from './innerWebAssets'

export const pricesMeta = {
  eyebrow: 'Сезон 2026',
  title: 'Стоимость поездок',
  intro: 'Официальный прайс-лист Khasaut Tour. Честные фиксированные цены для всех городов КМВ без скрытых доплат.',
  heroImage: assets.heroBackground,
  heroAlt: 'Горный пейзаж Северного Кавказа',
  heroImages: [
    innerWebAssets.bermamyt[0],
    innerWebAssets['dzhily-su'][0],
    innerWebAssets.dombay[0],
    innerWebAssets.balkaria[0],
    innerWebAssets.arkhyz[0],
  ],
  heroPrimaryLabel: 'Скачать прайс-лист (PDF)',
  heroPrimaryHref: '/khasaut-price-list-2026.pdf',
  heroSecondaryLabel: 'Смотреть таблицу',
  heroSecondaryHref: '#price-table',
  seoTitle: 'Цены на джип-туры из Кисловодска 2026 — прайс-лист экскурсий по Кавказу и КМВ | Khasaut Tour',
  seoDescription: 'Актуальный прайс-лист на джип-туры и экскурсии из Кисловодска на сезон 2026 года. Стоимость индивидуальных и групповых поездок от 4 000 руб без скрытых доплат. Скачайте прайс в PDF.',
}
