import { useState } from 'react'
import { detailPages } from '../../data/innerPages'
import { formatRubles, getMinimumGroupPrice, getPriceKeyForRouteSlug } from '../../data/prices'
import { Icon, type IconName } from '../ui/Icon'

type InterestCategory = {
  id: string
  icon: IconName
  name: string
  kicker: string
  headline: string
  description: string
  routes: string[]
}

const categories: InterestCategory[] = [
  {
    id: 'panorama',
    icon: 'mountain',
    name: 'Панорамы и плато',
    kicker: 'Культовые вершины',
    headline: 'Грандиозные виды на Эльбрус и парящие обрывы',
    description: 'Для тех, кто хочет увидеть главный пик Европы на расстоянии вытянутой руки, встретить рассвет на краю бездны и увезти потрясающие кадры.',
    routes: ['bermamyt', 'dzhily-su-bermamyt', 'elbrus', 'dombay', 'gum-bashi'],
  },
  {
    id: 'waterfalls',
    icon: 'water',
    name: 'Водопады и нарзаны',
    kicker: 'Сила горной воды',
    headline: 'Бурные каскады, теснины и природные ключи',
    description: 'Маршруты к мощным водопадам и целебным нарзанным источникам прямо из скал. Пробуем воду из недр земли и дышим горной свежестью.',
    routes: ['dzhily-su', 'honey', 'aktoprak', 'narzan'],
  },
  {
    id: 'lakes',
    icon: 'hiking',
    name: 'Озёра и треккинг',
    kicker: 'Первозданная природа',
    headline: 'Бирюзовые высокогорные озёра и реликтовые леса',
    description: 'Маршруты с пешими переходами по заповедным эко-тропам, где чистейший воздух, альпийские луга и тишина дикого Кавказа.',
    routes: ['baduk-lakes', 'khurla-kol', 'arkhyz', 'makhar', 'mukhinskoe-gorge'],
  },
  {
    id: 'history',
    icon: 'castle',
    name: 'Башни и древности',
    kicker: 'Дух веков',
    headline: 'Средневековые родовые башни и древние города мёртвых',
    description: 'Погружение в культуру горцев: каменные боевые башни Ингушетии, древние склепы Осетии и старинные балкарские аулы в окружении скал.',
    routes: ['ingushetia', 'ossetia', 'balkaria', 'grozny'],
  },
  {
    id: 'relax',
    icon: 'thermal',
    name: 'Термы и релакс',
    kicker: 'Тёплый отдых',
    headline: 'Горячие минеральные бассейны под открытым небом',
    description: 'Идеальный выбор для спокойного восстановления: бассейны с целебной кремниевой водой разной температуры в любое время года.',
    routes: ['suvorovskie', 'geduko', 'honey', 'narzan'],
  },
]

type InnerInterestPickerProps = {
  currentSlug?: string
}

export function InnerInterestPicker({ currentSlug }: InnerInterestPickerProps) {
  // Pick an initial category that might match the current route or default to 'panorama'
  const initialCategory = categories.find((cat) => cat.routes.includes(currentSlug ?? ''))?.id ?? 'panorama'
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0]

  // Filter routes: prioritize alternative routes if currentSlug is in the category
  const filteredSlugs = currentCat.routes.filter((slug) => slug !== currentSlug).slice(0, 3)
  // If fewer than 3, fallback to first 3 routes
  const displaySlugs = filteredSlugs.length >= 2 ? filteredSlugs : currentCat.routes.slice(0, 3)

  return (
    <section id="inner-interest-picker" className="inner-section inner-interest-picker" aria-labelledby="interest-picker-title">
      <div className="container">
        {/* Header */}
        <div className="inner-interest-picker__header">
          <span className="inner-kicker">Другие впечатления</span>
          <h2 id="interest-picker-title" className="inner-interest-picker__title">
            Подобрать маршрут по интересам
          </h2>
          <p className="inner-interest-picker__intro">
            Кавказ многогранен: выберите то, что привлекает вас больше всего — грандиозные панорамы, скрытые водопады, старинные башни или треккинг к бирюзовым озёрам.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="inner-interest-picker__tabs" role="tablist" aria-label="Категории впечатлений">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`inner-interest-picker__tab ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="inner-interest-picker__tab-icon" aria-hidden="true">
                  <Icon name={cat.icon} size={18} />
                </span>
                <span className="inner-interest-picker__tab-name">{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Category Description Banner */}
        <div className="inner-interest-picker__highlight">
          <div className="inner-interest-picker__highlight-kicker">{currentCat.kicker}</div>
          <h3 className="inner-interest-picker__highlight-head">{currentCat.headline}</h3>
          <p className="inner-interest-picker__highlight-desc">{currentCat.description}</p>
        </div>

        {/* Route Cards Grid */}
        <div className="inner-interest-picker__grid">
          {displaySlugs.map((slug) => {
            const route = detailPages.find((p) => p.slug === slug)
            if (!route) return null

            const priceKey = getPriceKeyForRouteSlug(slug)
            const minPrice = getMinimumGroupPrice(priceKey)
            const waMessage = `Здравствуйте! Меня заинтересовал маршрут «${route.title}». Расскажите, пожалуйста, о свободных датах и деталях.`
            const waUrl = `https://wa.me/79187477212?text=${encodeURIComponent(waMessage)}`

            return (
              <article key={slug} className="inner-interest-picker__card">
                <a href={`/detail/${slug}/`} className="inner-interest-picker__card-media" tabIndex={-1}>
                  <img src={route.image} alt={route.alt} loading="lazy" />
                  <span className="inner-interest-picker__card-badge">
                    <Icon name="clock" size={13} /> 8–10 часов
                  </span>
                </a>

                <div className="inner-interest-picker__card-body">
                  <h4 className="inner-interest-picker__card-title">
                    <a href={`/detail/${slug}/`}>{route.title}</a>
                  </h4>
                  <p className="inner-interest-picker__card-intro">{route.intro}</p>

                  <div className="inner-interest-picker__card-footer">
                    <div className="inner-interest-picker__card-price">
                      <small>Стоимость от</small>
                      <strong>{minPrice ? `${formatRubles(minPrice)} / чел.` : 'По запросу'}</strong>
                    </div>

                    <div className="inner-interest-picker__card-actions">
                      <a
                        href={`/detail/${slug}/`}
                        className="inner-interest-picker__btn-detail"
                      >
                        Маршрут <span aria-hidden="true">→</span>
                      </a>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inner-interest-picker__btn-wa"
                        title="Спросить гида в WhatsApp"
                        aria-label={`Спросить гида про маршрут «${route.title}» в WhatsApp`}
                      >
                        <Icon name="whatsapp" size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Custom Itinerary Consult Footer */}
        <div className="inner-interest-picker__consult">
          <div className="inner-interest-picker__consult-copy">
            <strong>Хотите индивидуальный маршрут или совместить несколько локаций?</strong>
            <p>
              Эльдар составит персональный план поездки на 1–3 дня с учётом состава компании, пожеланий по активности и прогноза погоды.
            </p>
          </div>
          <a
            href={`https://wa.me/79187477212?text=${encodeURIComponent('Здравствуйте! Хочу составить индивидуальный маршрут по Кавказу. Помогите с подбором программы.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inner-button inner-button--solid inner-interest-picker__consult-btn"
          >
            <Icon name="whatsapp" size={16} />
            <span>Составить персональный план</span>
          </a>
        </div>
      </div>
    </section>
  )
}
