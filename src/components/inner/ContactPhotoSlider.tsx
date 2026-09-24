import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { innerWebAssets } from '../../data/innerWebAssets'
import { Reveal } from '../ui/Reveal'

export type GallerySlide = {
  id: string
  image: string
  title: string
  region: string
  description: string
}

export const contactGallerySlides: GallerySlide[] = [
  {
    id: 'bermamyt-1',
    image: innerWebAssets.bermamyt[0],
    title: 'Плато Бермамыт',
    region: 'Карачаево-Черкесия',
    description: 'Панорама на Эльбрус с высоты 2 592 м, скалы-амфитеатры и «море облаков».',
  },
  {
    id: 'dzhily-su-1',
    image: innerWebAssets['dzhily-su'][1],
    title: 'Урочище Джилы-Су',
    region: 'Кабардино-Балкария',
    description: 'Северный склон Эльбруса, мощные водопады Султан и Каракая-Су, нарзанные ванны.',
  },
  {
    id: 'dombay-1',
    image: innerWebAssets.dombay[0],
    title: 'Домбай и Мусса-Ачитара',
    region: 'Карачаево-Черкесия',
    description: 'Вечные ледники, альпийские луга и вид на Главный Кавказский хребет с канатной дороги.',
  },
  {
    id: 'elbrus-1',
    image: innerWebAssets.elbrus[0],
    title: 'Эльбрус и Баксанское ущелье',
    region: 'Кабардино-Балкария',
    description: 'Высочайшая вершина Европы (5 642 м), подъем до станции Гарабаши на высоту 3 847 м.',
  },
  {
    id: 'arkhyz-1',
    image: innerWebAssets.arkhyz[0],
    title: 'Архыз и Софийские водопады',
    region: 'Карачаево-Черкесия',
    description: 'Каскады ледниковых водопадов, вековые реликтовые пихты и зеркальные горные озера.',
  },
  {
    id: 'balkaria-1',
    image: innerWebAssets.balkaria[0],
    title: 'Верхняя Балкария и Черекская теснина',
    region: 'Кабардино-Балкария',
    description: 'Средневековая башня Абаевых, древние аулы и глубочайшие пропасти Черекского ущелья.',
  },
  {
    id: 'ossetia-1',
    image: innerWebAssets.ossetia[0],
    title: 'Северная Осетия — Кармадон и Даргавс',
    region: 'Северная Осетия',
    description: 'Таинственный «Город мертвых» Даргавс, Кармадонское ущелье и арт-объекты в скалах.',
  },
  {
    id: 'ingushetia-1',
    image: innerWebAssets.ingushetia[0],
    title: 'Горная Ингушетия — Вовнушки и Таргим',
    region: 'Ингушетия',
    description: 'Величественные башенные замки XIII–XVII веков на неприступных скалах.',
  },
  {
    id: 'makhar-1',
    image: innerWebAssets.makhar[0],
    title: 'Ущелье Махар и Гондарай',
    region: 'Карачаево-Черкесия',
    description: 'Дикая первозданная природа без толп туристов, водопады и нарзанные ключи прямо в лесу.',
  },
  {
    id: 'aktoprak-1',
    image: innerWebAssets.aktoprak[0],
    title: 'Перевал Актопрак',
    region: 'Кабардино-Балкария',
    description: '«Белая глина» — фантастическая серпантинная дорога между Баксаном и Чегемом.',
  },
  {
    id: 'khurla-kol-1',
    image: innerWebAssets['khurla-kol'][0],
    title: 'Озеро Хурла-Кёль',
    region: 'Карачаево-Черкесия',
    description: 'Реликтовое озеро возрастом 15 000 лет на высоте более 2 000 м среди первозданной тайги.',
  },
  {
    id: 'baduk-lakes-1',
    image: innerWebAssets['baduk-lakes'][0],
    title: 'Бадукские озёра',
    region: 'Карачаево-Черкесия',
    description: 'Каскад трех бирюзовых высокогорных озер в Тебердинском биосферном заповеднике.',
  },
  {
    id: 'khudes-1',
    image: innerWebAssets['khudes-labyrinth'][0],
    title: 'Худесский лабиринт',
    region: 'Карачаево-Черкесия',
    description: 'Каменные лабиринты и останцы выветривания на высокогорном плато.',
  },
  {
    id: 'horse-1',
    image: innerWebAssets['horse-rides'][0],
    title: 'Конные прогулки в горах',
    region: 'Карачаево-Черкесия / КМВ',
    description: 'Верхом по живописным перевалам, субальпийским лугам и лесным тропам Кавказа.',
  },
  {
    id: 'grozny-1',
    image: innerWebAssets.grozny[0],
    title: 'Грозный и Шали',
    region: 'Чеченская Республика',
    description: 'Мечеть «Гордость мусульман» в Шали, небоскребы «Грозный-Сити» и мечеть «Сердце Чечни».',
  },
  {
    id: 'honey-1',
    image: innerWebAssets.honey[0],
    title: 'Медовые водопады и Рим-гора',
    region: 'Карачаево-Черкесия',
    description: 'Каскад пяти водопадов в тесном скалистом ущелье реки Аликоновка.',
  },
  {
    id: 'narzan-1',
    image: innerWebAssets.narzan[1],
    title: 'Долина Нарзанов',
    region: 'Кабардино-Балкария',
    description: '20 природных источников углекислой минеральной воды в живописной долине реки Хасаут.',
  },
  {
    id: 'bermamyt-sunrise',
    image: innerWebAssets.bermamyt[4],
    title: 'Рассвет на Бермамыте',
    region: 'Карачаево-Черкесия',
    description: 'Первые лучи солнца, озаряющие ледяную шапку Эльбруса над утренним облачным морем.',
  },
  {
    id: 'dzhily-bermamyt-combo',
    image: innerWebAssets['dzhily-su-bermamyt'][2],
    title: 'Джилы-Су + Бермамыт за 1 день',
    region: 'КБР / КЧР',
    description: 'Максимальный джип-маршрут: скалы Бермамыта на рассвете и водопады Джилы-Су днем.',
  },
  {
    id: 'dombay-waterfalls',
    image: innerWebAssets.dombay[2],
    title: 'Суфруджинские водопады и Алибек',
    region: 'Карачаево-Черкесия',
    description: 'Грохочущие ледниковые потоки, падающие со скал высотой с многоэтажный дом.',
  },
  {
    id: 'arkhyz-lakes',
    image: innerWebAssets.arkhyz[2],
    title: 'Семицветное озеро и Дукка',
    region: 'Карачаево-Черкесия',
    description: 'Кристально чистые ледниковые озера, меняющие цвет в зависимости от освещения.',
  },
  {
    id: 'balkaria-blue-lakes',
    image: innerWebAssets.balkaria[2],
    title: 'Голубые озёра (Церик-Кёль)',
    region: 'Кабардино-Балкария',
    description: 'Одно из глубочайших карстовых озер мира с неизменной лазурно-бирюзовой водой.',
  },
  {
    id: 'ossetia-waterfalls',
    image: innerWebAssets.ossetia[3],
    title: 'Мидаграбинские водопады',
    region: 'Северная Осетия',
    description: 'Высочайшие водопады Европы, срывающиеся с ледников горы Джимарай-хох.',
  },
  {
    id: 'makhar-springs',
    image: innerWebAssets.makhar[2],
    title: 'Уллу-Кёль и Махарские нарзаны',
    region: 'Карачаево-Черкесия',
    description: 'Газированные целебные источники прямо из недр земли в окружении вековых сосен.',
  },
]

export function ContactPhotoSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const thumbnailsRef = useRef<HTMLDivElement | null>(null)

  const count = contactGallerySlides.length

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + count) % count)
  }, [count])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  // Autoplay
  useEffect(() => {
    if (isPaused || count <= 1) return
    const timer = setInterval(goNext, 5500)
    return () => clearInterval(timer)
  }, [count, goNext, isPaused])

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current) return
    const container = thumbnailsRef.current
    const activeThumb = container.children[activeIndex] as HTMLElement
    if (activeThumb) {
      const scrollLeft = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeIndex])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrevious()
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsPaused(true)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goNext()
      else goPrevious()
    }
    touchStartX.current = null
    touchStartY.current = null
    setIsPaused(false)
  }

  const activeSlide = contactGallerySlides[activeIndex]

  return (
    <section className="inner-section contact-gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <div className="contact-gallery-header">
          <Reveal>
            <span className="inner-kicker">Фотоархив путешествий</span>
            <h2 id="gallery-title">Живой Кавказ нашими глазами</h2>
            <p>
              Все направления, куда мы отправляемся каждый день из Кисловодска и городов КМВ.
              Никаких фотостоков — только реальные кадры из поездок Khasaut Tour.
            </p>
          </Reveal>
        </div>

        <div
          className="contact-gallery-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Галерея фотографий Кавказа"
        >
          {/* Основной экран слайдера */}
          <div className="contact-gallery-slider__stage">
            {contactGallerySlides.map((slide, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={slide.id}
                  className={`contact-gallery-slider__slide ${isActive ? 'is-active' : ''}`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={`${slide.title} — ${slide.region}`}
                    className="contact-gallery-slider__img"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              )
            })}

            {/* Карточка-подпись поверх фотографии */}
            <div className="contact-gallery-slider__caption">
              <div className="contact-gallery-slider__caption-content">
                <span className="contact-gallery-slider__tag">{activeSlide.region}</span>
                <h3 className="contact-gallery-slider__title">{activeSlide.title}</h3>
                <p className="contact-gallery-slider__desc">{activeSlide.description}</p>
              </div>

              <div className="contact-gallery-slider__counter">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <i>/</i>
                <small>{String(count).padStart(2, '0')}</small>
              </div>
            </div>

            {/* Кнопки навигации по бокам */}
            <button
              type="button"
              className="contact-gallery-slider__nav-btn contact-gallery-slider__nav-btn--prev"
              onClick={goPrevious}
              aria-label="Предыдущее фото"
            >
              ←
            </button>
            <button
              type="button"
              className="contact-gallery-slider__nav-btn contact-gallery-slider__nav-btn--next"
              onClick={goNext}
              aria-label="Следующее фото"
            >
              →
            </button>
          </div>

          {/* Лента миниатюр внизу */}
          <div
            className="contact-gallery-thumbnails"
            ref={thumbnailsRef}
            role="tablist"
            aria-label="Миниатюры фотографий"
          >
            {contactGallerySlides.map((slide, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  type="button"
                  key={`thumb-${slide.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Перейти к фото ${slide.title}`}
                  className={`contact-gallery-thumb ${isActive ? 'is-active' : ''}`}
                  onClick={() => goTo(index)}
                >
                  <img src={slide.image} alt="" loading="lazy" />
                  <span className="contact-gallery-thumb__label">{slide.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
