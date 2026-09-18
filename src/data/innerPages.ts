import { innerAssets } from './innerAssets'
import { innerWebAssets } from './innerWebAssets'
import thermalSuvorovskieEntrance from '../../design-reference/khasaut/assets/attached/thermal-suvorovskie-entrance.png'

export type CatalogCard = {
  title: string
  kicker: string
  blurb: string
  details: string
  image: string
  alt: string
}

export type InnerPageMeta = {
  eyebrow: string
  title: string
  intro: string
  heroImage: string
  heroAlt: string
  priceKey?: string
  seoTitle?: string
  seoDescription?: string
  heroVariant?: 'compact'
  heroPrimaryLabel?: string
  heroPrimaryHref?: string
  heroSecondaryLabel?: string | null
  heroSecondaryHref?: string | null
}

export type InnerDetailPage = {
  slug: string
  category: 'excursions' | 'routes' | 'thermal'
  sourceUrl: string
  eyebrow: string
  title: string
  intro: string
  image: string
  alt: string
  story: string[]
  highlights: { title: string; text: string }[]
  facts: { label: string; value: string }[]
}

export const excursionsPage: InnerPageMeta = {
  eyebrow: 'Дороги, ради которых выезжают на Кавказ',
  title: 'Экскурсии и джип-туры',
  intro: 'Маршруты на целый день: горные дороги, смотровые и короткие прогулки.',
  heroImage: innerWebAssets['dzhily-su'][0],
  heroAlt: 'Горная дорога к урочищу Джилы-Суу',
}

export const excursions: CatalogCard[] = [
  { title: 'Джилы-Суу', kicker: 'Водопады и нарзаны', blurb: 'Горный день с видами на Эльбрус, водопадами и остановками у минеральных источников.', details: 'В пути - смотровые площадки, короткие прогулки и остановки у воды.', image: innerAssets.excursionDzhilySu, alt: 'Горный пейзаж Джилы-Суу' },
  { title: 'Плато Бермамыт', kicker: 'Большой горизонт', blurb: 'Скалы, облака под ногами и панорама Эльбруса.', details: 'Поднимаемся к плато по грунтовой дороге, делаем остановки на смотровых и оставляем время для прогулки.', image: innerAssets.excursionBermamyt, alt: 'Плато Бермамыт на закате' },
  { title: 'Домбай', kicker: 'Горные ущелья', blurb: 'Высокие вершины, ущелья и прогулки.', details: 'Можно выбрать короткие прогулки или провести больше времени на высоте.', image: innerAssets.excursionDombay, alt: 'Горное ущелье Домбая' },
  { title: 'Верхняя Балкария', kicker: 'История и простор', blurb: 'Ущелья, старые дороги и горные сёла.', details: 'Маршрут соединяет природные виды и историю региона, поэтому день получается насыщенным, но понятным по темпу.', image: innerAssets.excursionBalkaria, alt: 'Горное ущелье Верхней Балкарии' },
  { title: 'Эльбрус с Терскола', kicker: 'У подножия вершины', blurb: 'Путь к вершинам и альпийским лугам.', details: 'Остановки с видами на Эльбрус, время для прогулки и фотографий.', image: innerAssets.excursionElbrus, alt: 'Эльбрус и горная долина' },
  { title: 'Актопрак', kicker: 'Дорога над ущельем', blurb: 'Серпантины и открытые склоны.', details: 'Актопрак подойдёт тем, кто любит горные дороги.', image: innerAssets.excursionAktoprak, alt: 'Горная дорога Актопрака' },
  { title: 'Северная Осетия', kicker: 'Горы, история и кухня', blurb: 'Горные виды, осетинская культура и история края.', details: 'Рассказываем о местах, людях и традициях региона.', image: innerAssets.excursionOssetia, alt: 'Горный пейзаж Северной Осетии' },
  { title: 'Джилы-Суу + Бермамыт', kicker: 'Два места за один день', blurb: 'Высокогорное плато, скалистые долины и панорама Эльбруса.', details: 'Маршрут соединяет Джилы-Суу и Бермамыт в один день с остановками на разных высотах.', image: innerAssets.excursionBermamytDzhilySu, alt: 'Плато и горные склоны Кавказа' },
  { title: 'Архыз', kicker: 'Луга и ледяные вершины', blurb: 'Зелёные долины и холодные линии хребтов.', details: 'Лес сменяется открытыми лугами, а затем появляются широкие горные панорамы.', image: innerAssets.excursionArkhyz, alt: 'Зелёная долина Архыза' },
  { title: 'Ингушетия', kicker: 'Башни и ущелья', blurb: 'Горные виды, древние башни и история края.', details: 'Остановки у исторических мест и природных площадок в течение дня.', image: innerAssets.excursionIngushetia, alt: 'Горный пейзаж Ингушетии' },
  { title: 'Грозный', kicker: 'Городской маршрут', blurb: 'Мечети, парки и архитектура города.', details: 'К горной поездке можно добавить несколько часов в Грозном.', image: innerAssets.excursionGrozny, alt: 'Архитектура Грозного' },
  { title: 'Медовые водопады', kicker: 'Для спокойной прогулки', blurb: 'Вода, скалы и короткий маршрут, который легко добавить к насыщенному дню.', details: 'Неспешная прогулка у водопадов с возможностью попробовать блюда местной кухни.', image: innerAssets.excursionNarzanValley, alt: 'Водопады в горной долине' },
  { title: 'Долина нарзанов', kicker: 'Для любителей минеральной воды', blurb: 'Тихая долина, источники и прогулка среди горных склонов.', details: 'Неспешный формат с природными остановками и возможностью набрать воду из источников.', image: innerAssets.excursionNarzanValley, alt: 'Долина нарзанов в горах' },
]

export const routesPage: InnerPageMeta = {
  eyebrow: 'Точки, которых нет в стандартных путеводителях',
  title: 'Необычные маршруты',
  intro: 'Озёра, ущелья и высокогорные долины с пешими участками.',
  heroImage: innerWebAssets['khurla-kol'][0],
  heroAlt: 'Высокогорное озеро Хурла-Кёль',
}

export const unusualRoutes: CatalogCard[] = [
  { title: 'Хурла-Кёль', kicker: 'Горное озеро', blurb: 'Бирюзовое озеро, высота и пеший участок.', details: 'Цельный день в горах с прогулкой, видами и остановками у озера.', image: innerAssets.routeKhurlaKol, alt: 'Бирюзовое озеро Хурла-Кёль' },
  { title: 'Худесский лабиринт', kicker: 'Затерянный мир на плато', blurb: 'Скальные формы и узкие проходы.', details: 'В маршруте - каменные коридоры, валуны и короткие пешие участки.', image: innerAssets.routeKhudesLabyrinth, alt: 'Скальные формы Худесского лабиринта' },
  { title: 'Мухинское ущелье', kicker: 'Лес и водопады', blurb: 'Зелёное ущелье, река и пешая прогулка.', details: 'Сложность и длительность пешего участка подбираем под группу.', image: innerAssets.routeMukhinskoe, alt: 'Мухинское ущелье' },
  { title: 'Махар', kicker: 'Альпийские луга', blurb: 'Прохладный воздух и широкие линии горного хребта.', details: 'Подходит для первой поездки в высокогорье и прогулки по долине.', image: innerAssets.routeMakhar, alt: 'Долина Махар' },
  { title: 'Бадукские озёра', kicker: 'Три горных озера', blurb: 'Цепочка озёр среди хвойного леса и скалистых склонов.', details: 'Маршрут с пешей частью и остановками у озёр.', image: innerAssets.routeBadukLakes, alt: 'Бадукские озёра среди гор' },
]

export const thermalPage: InnerPageMeta = {
  eyebrow: 'Тёплая вода и свежий горный воздух',
  title: 'Термальные источники',
  intro: 'После дороги - вода. Собрали места для спокойной паузы и отдыха.',
  heroImage: thermalSuvorovskieEntrance,
  heroAlt: 'Вход в термальный комплекс «Термальный источник здоровья»',
}

export const thermalSources: CatalogCard[] = [
  { title: 'Суворовские', kicker: 'Классика Кавминвод', blurb: 'Тёплая минеральная вода и отдых после горной дороги.', details: 'Подбираем время выезда и продолжительность остановки у воды.', image: innerAssets.thermalSuvorovskie, alt: 'Суворовские термальные источники' },
  { title: 'Жемчужина Кавказа', kicker: 'Бассейны и SPA', blurb: 'Открытые и крытые бассейны, свежий воздух и зоны отдыха.', details: 'Можно совместить с другими точками маршрута.', image: innerAssets.thermalPearl, alt: 'Термальный бассейн Жемчужины Кавказа' },
  { title: 'Гедуко', kicker: 'Термальные бассейны', blurb: 'Минеральная вода, бассейны и зоны отдыха.', details: 'На территории есть бассейны, зоны отдыха и SPA.', image: innerAssets.thermalGeduko, alt: 'Термальные воды Гедуко' },
  { title: 'Аушигер', kicker: 'Тёплая вода и предгорья', blurb: 'Бассейны с видом на предгорья и открытое небо.', details: 'Источник можно добавить к маршруту по предгорьям.', image: innerAssets.thermalAushiger, alt: 'Источник Аушигер' },
]

export const aboutPage: InnerPageMeta = {
  eyebrow: 'Команда, которая знает, куда ведут тропы',
  title: 'О нас',
  intro: 'Организуем поездки по Северному Кавказу с вниманием к дороге и месту.',
  heroImage: innerWebAssets['dzhily-su-bermamyt'][0],
  heroAlt: 'Закат над ущельем Джилы-Суу и Бермамытом',
}

export const horsePage: InnerPageMeta = {
  eyebrow: 'Конные прогулки в горах',
  title: 'Конные прогулки',
  intro: 'Прогулки с инструктором по горным тропам.',
  heroImage: innerAssets.horseHero,
  heroAlt: 'Лошадь на фоне горного пейзажа',
}

const excursionDetailSources = {
  'dzhily-su': 'https://khasaut-tour.ru/page128389916.html',
  'dzhily-su-bermamyt': 'https://khasaut-tour.ru/page145494976.html',
  bermamyt: 'https://khasaut-tour.ru/page128418576.html',
  dombay: 'https://khasaut-tour.ru/page128703716.html',
  arkhyz: 'https://khasaut-tour.ru/page128736336.html',
  elbrus: 'https://khasaut-tour.ru/page128779406.html',
  aktoprak: 'https://khasaut-tour.ru/page128782856.html',
  balkaria: 'https://khasaut-tour.ru/page129003296.html',
  ossetia: 'https://khasaut-tour.ru/page129008016.html',
  ingushetia: 'https://khasaut-tour.ru/page129013416.html',
  grozny: 'https://khasaut-tour.ru/page129016296.html',
  honey: 'https://khasaut-tour.ru/page129028116.html',
  narzan: 'https://khasaut-tour.ru/page129025176.html',
} as const

const routeDetailSources = {
  'khurla-kol': 'https://khasaut-tour.ru/page148224266.html',
  'khudes-labyrinth': 'https://khasaut-tour.ru/page148225966.html',
  'mukhinskoe-gorge': 'https://khasaut-tour.ru/page148227216.html',
  makhar: 'https://khasaut-tour.ru/page128736336.html',
  'baduk-lakes': 'https://khasaut-tour.ru/page128779406.html',
} as const

const thermalDetailSources = {
  suvorovskie: 'https://khasaut-tour.ru/page128376976.html',
  pearl: 'https://khasaut-tour.ru/page128380866.html',
  geduko: 'https://khasaut-tour.ru/page128381376.html',
  aushiger: 'https://khasaut-tour.ru/page128381666.html',
} as const

const detailFacts = [
  { label: 'Выезд', value: 'По договорённости из городов КМВ' },
  { label: 'Формат', value: 'Индивидуально или группа до 8 человек' },
  { label: 'Связь', value: 'Обсудим маршрут и сезон до поездки' },
]

const excursionDetailCopy: Record<string, { slug: string; intro: string; story: string[]; highlights: { title: string; text: string }[] }> = {
  'dzhily-su': {
    slug: 'dzhily-su',
    intro: 'Джилы-Суу - горная сказка у подножия Эльбруса: водопады, нарзаны, скалы и открытые луга плато Шатджатмаз.',
    story: ['В маршруте - водопады Султан, Кызыл-Кол и Каракая-Су, скалы Аватары и Зубы дракона.', 'На остановках можно набрать нарзан, пройтись по долине и увидеть колонии сусликов.'],
    highlights: [{ title: 'Панорамы', text: 'Облака под ногами и вид на Эльбрус.' }, { title: 'Вода', text: 'Водопады и минеральные источники на маршруте.' }, { title: 'Остановки', text: 'Пешие участки чередуются с переездами.' }],
  },
  'dzhily-su-bermamyt': {
    slug: 'dzhily-su-bermamyt',
    intro: 'Джилы-Суу и плато Бермамыт за один день: водопады, нарзаны и панорамы Эльбруса.',
    story: ['Маршрут соединяет несколько высот: водопады и нарзаны Джилы-Суу, скальные амфитеатры и плато Бермамыт.', 'Остановки проходят на разных участках дороги и высотах.'],
    highlights: [{ title: 'Два маршрута', text: 'Урочище у Эльбруса и плато с панорамой главной вершины.' }, { title: 'Смотровые', text: 'Остановки на естественных площадках по пути.' }, { title: 'За один день', text: 'Водопады, нарзаны, скалы и плато в одном маршруте.' }],
  },
  bermamyt: {
    slug: 'bermamyt',
    intro: 'Плато Бермамыт - открытая панорама Эльбруса на высоте около 2600 метров.',
    story: ['На рассвете скалы и туман меняют вид плато, а к вечеру меняется свет.', 'На плато есть время для прогулки и фотографий.'],
    highlights: [{ title: 'Высота', text: 'Открытая панорама и вид на Эльбрус.' }, { title: 'Свет', text: 'Рассветы и закаты над скальными останцами.' }, { title: 'Смотровые', text: 'Площадки по краю плато и облака ниже дороги.' }],
  },
}

const fallbackExcursionDetailCopy = (card: CatalogCard, slug: string) => ({
  slug,
  intro: card.blurb,
  story: [card.details, 'В маршруте - смотровые площадки, короткие прогулки и остановки по погоде.'],
  highlights: [{ title: card.kicker, text: card.blurb }, { title: 'По пути', text: 'Смотровые площадки, короткие прогулки и природные точки.' }, { title: 'Формат', text: 'Сложность, темп и длительность обсуждаем заранее.' }],
})

const excursionDetailCards = [
  ['dzhily-su', excursions[0]], ['dzhily-su-bermamyt', excursions[7]], ['bermamyt', excursions[1]], ['dombay', excursions[2]], ['arkhyz', excursions[8]], ['elbrus', excursions[4]], ['aktoprak', excursions[5]], ['balkaria', excursions[3]], ['ossetia', excursions[6]], ['ingushetia', excursions[9]], ['grozny', excursions[10]], ['honey', excursions[11]], ['narzan', excursions[12]],
] as const

const routeDetailCopy: Record<string, { slug: string; intro: string; story: string[]; highlights: { title: string; text: string }[] }> = {
  'khurla-kol': {
    slug: 'khurla-kol',
    intro: 'Хурла-Кёль - горное озеро на высоте более 2000 метров.',
    story: ['С высоты открывается вид на озеро, Эльбрус и горные склоны.', 'Маршрут включает пеший участок и остановки у воды.'],
    highlights: [{ title: 'У озера', text: 'Остановки у воды и панорама Приэльбрусья.' }, { title: 'Высота', text: 'Горное озеро на высоте более 2000 метров.' }, { title: 'Прогулка', text: 'Пеший участок, фотографии и время у берега.' }],
  },
  'khudes-labyrinth': {
    slug: 'khudes-labyrinth',
    intro: 'Худесское плато - каменный лабиринт с необычными природными формами.',
    story: ['Узкие коридоры, ржаво-красные и чёрные скалы, каменные своды и валуны.', 'Маршрут включает пешие участки по каменному лабиринту.'],
    highlights: [{ title: 'Фактура', text: 'Камень, свет и необычные формы на каждом повороте.' }, { title: 'Масштаб', text: 'Скальные коридоры и валуны на пешем участке.' }, { title: 'Маршрут', text: 'Пешая прогулка по каменному лабиринту.' }],
  },
  'mukhinskoe-gorge': {
    slug: 'mukhinskoe-gorge',
    intro: 'Мухинское ущелье - река, вековые леса и ледяные водопады.',
    story: ['Дорога начинается с серпантина, затем тропа уходит в каньон и сосновый лес.', 'Маршрут требует внимания на пеших участках и после дождя.'],
    highlights: [{ title: 'Вода', text: 'Кристально чистые водопады и радуга в водяной пыли.' }, { title: 'Тропа', text: 'Каменные завалы, узкие карнизы и лесные участки.' }, { title: 'Дикая мощь', text: 'Место, где городская усталость действительно остаётся позади.' }],
  },
}

const thermalDetailCopy: Record<string, { slug: string; intro: string; story: string[]; highlights: { title: string; text: string }[] }> = {
  suvorovskie: { slug: 'suvorovskie', intro: 'Суворовские источники - природный комплекс в Ставропольском крае с горячей водой 38-45 °C.', story: ['Источник открыли в 1959 году. Вода слабоминерализованная, с гидрокарбонатами и микроэлементами.', 'Бассейны подходят для отдыха после горного маршрута.'], highlights: [{ title: 'Вода', text: 'Комфортные бассейны и природный минеральный состав.' }, { title: 'Формат', text: 'Можно совместить источник с маршрутом по КМВ.' }, { title: 'Локация', text: 'Станица Суворовская в районе Кавказских Минеральных Вод.' }] },
  pearl: { slug: 'pearl', intro: '«Жемчужина Кавказа» - термальный комплекс недалеко от Нальчика с бассейнами, SPA и зонами отдыха.', story: ['Температура воды в бассейнах держится примерно в диапазоне 30-42 °C.', 'На территории есть открытые и крытые бассейны, гидромассаж и зоны отдыха.'], highlights: [{ title: 'Комфорт', text: 'Открытые и крытые бассейны, гидромассаж и зоны отдыха.' }, { title: 'Формат', text: 'Подходит для поездки с семьёй.' }, { title: 'Локация', text: 'Комплекс недалеко от Нальчика.' }] },
  geduko: { slug: 'geduko', intro: 'Гедуко - благоустроенный термальный курорт в Кабардино-Балкарии, недалеко от Нальчика.', story: ['Минеральная вода поступает из глубины около 1000-1500 метров, температура в бассейнах - около 30-42 °C.', 'На территории есть бассейны, зоны отдыха и SPA.'], highlights: [{ title: 'Инфраструктура', text: 'Бассейны, зоны отдыха и SPA-формат.' }, { title: 'Вода', text: 'Бассейны работают в тёплый сезон и зимой.' }, { title: 'Локация', text: 'Курорт недалеко от Нальчика.' }] },
  aushiger: { slug: 'aushiger', intro: 'Аушигерские источники - природный комплекс недалеко от Нальчика, где купаются круглый год.', story: ['Горячая вода выходит с глубины около 1500 метров. В бассейнах её охлаждают до 35-45 °C.', 'Источник можно добавить к маршруту по предгорьям.'], highlights: [{ title: 'Круглый год', text: 'Тёплые бассейны работают и в холодный сезон.' }, { title: 'Состав', text: 'Гидрокарбонаты, натрий, кальций, магний и микроэлементы.' }, { title: 'Локация', text: 'Комплекс недалеко от Нальчика.' }] },
}

const makeDetail = (card: CatalogCard, sourceUrl: string, category: InnerDetailPage['category'], copy: { slug: string; intro: string; story: string[]; highlights: { title: string; text: string }[] }): InnerDetailPage => ({
  ...copy,
  category,
  sourceUrl,
  eyebrow: card.kicker,
  title: card.title,
  image: innerWebAssets[copy.slug]?.[0] ?? card.image,
  alt: card.alt,
  facts: detailFacts,
})

export const detailPages: InnerDetailPage[] = [
  ...excursionDetailCards.map(([slug, card]) => makeDetail(card, excursionDetailSources[slug], 'excursions', excursionDetailCopy[slug] ?? fallbackExcursionDetailCopy(card, slug))),
  ...unusualRoutes.map((card, index) => {
    const slug = ['khurla-kol', 'khudes-labyrinth', 'mukhinskoe-gorge', 'makhar', 'baduk-lakes'][index]
    const copy = routeDetailCopy[slug] ?? fallbackExcursionDetailCopy(card, slug)
    return makeDetail(card, routeDetailSources[slug as keyof typeof routeDetailSources], 'routes', copy)
  }),
  ...thermalSources.map((card, index) => {
    const slug = ['suvorovskie', 'pearl', 'geduko', 'aushiger'][index]
    return makeDetail(card, thermalDetailSources[slug as keyof typeof thermalDetailSources], 'thermal', thermalDetailCopy[slug])
  }),
]
