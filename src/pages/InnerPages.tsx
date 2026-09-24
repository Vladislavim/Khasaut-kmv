import { assets } from '../data/assets'
import { innerContacts } from '../data/innerContacts'
import { innerWebAssets } from '../data/innerWebAssets'
import { innerAssets } from '../data/innerAssets'
import { aboutPage, excursions, excursionsPage, horsePage, routesPage, thermalPage, thermalSources, unusualRoutes } from '../data/innerPages'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { InnerCatalogPage } from '../components/inner/InnerCatalogPage'
import { InnerPageShell } from '../components/inner/InnerPageShell'
import { ContactPhotoSlider } from '../components/inner/ContactPhotoSlider'

export function ExcursionsPage() {
  return (
    <InnerCatalogPage
      meta={{
        ...excursionsPage,
        heroImages: [
          innerWebAssets.bermamyt[0],
          innerWebAssets['dzhily-su'][0],
          innerWebAssets.dombay[0],
          innerWebAssets.balkaria[0],
          innerWebAssets.arkhyz[0],
          innerWebAssets.aktoprak[0],
        ],
      }}
      cards={excursions}
      sectionTitle="Основные направления"
      sectionIntro="Джилы-Суу, Бермамыт, Домбай, Верхняя Балкария, Эльбрус, Актопрак и Северная Осетия."
      noteTitle="Не нашли свой маршрут?"
      noteText="Напишите нам — подскажем маршрут, время и стоимость."
      mobileInitialCount={7}
    />
  )
}

export function RoutesPage() {
  return (
    <InnerCatalogPage
      meta={{
        ...routesPage,
        heroImages: [
          innerWebAssets.makhar[0],
          innerWebAssets['khurla-kol'][0],
          innerWebAssets['baduk-lakes'][0],
          innerWebAssets['khudes-labyrinth'][0],
          innerWebAssets['mukhinskoe-gorge'][0],
        ],
      }}
      cards={unusualRoutes}
      sectionTitle="Необычные маршруты"
      sectionIntro="Озёра, ущелья и высокогорные долины с пешими участками."
      noteTitle="Сложность подберём честно"
      noteText="До поездки расскажем о дороге, пеших участках и нагрузке. Поможем выбрать подходящий темп."
    />
  )
}

export function ThermalSpringsPage() {
  return (
    <InnerCatalogPage
      meta={{
        ...thermalPage,
        heroImages: [
          innerWebAssets.suvorovskie[0],
          innerWebAssets.pearl[0],
          innerWebAssets.geduko[0],
          innerWebAssets.aushiger[0],
        ],
      }}
      cards={thermalSources}
      sectionTitle="Где сделать паузу"
      sectionIntro="Термальные источники для спокойной паузы после дороги или отдельного дня отдыха."
      noteTitle="Поможем выбрать источник"
      noteText="Подскажем время выезда и соберём маршрут с удобными остановками и временем у воды."
    />
  )
}

export function HorseRidesPage() {
  return (
    <InnerPageShell
      meta={{
        ...horsePage,
        heroImage: innerWebAssets['horse-rides'][0],
        heroImages: innerWebAssets['horse-rides'],
      }}
      className="inner-page--horse"
    >
      <main id="inner-main" className="inner-main">

        {/* Intro: editorial split — фото слева, текст справа */}
        <section className="inner-section inner-section--horse-intro" aria-labelledby="horse-intro-title">
          <div className="container inner-about-layout">
            <div className="inner-about-layout__art inner-about-layout__art--duo">
              <img
                src={innerAssets.horseMeadow}
                alt="Конная прогулка по горному лугу Кавказа"
                loading="lazy"
                className="inner-about-art__main"
              />
              <img
                src={innerAssets.horseForest}
                alt="Всадники в лесной тропе"
                loading="lazy"
                className="inner-about-art__accent"
              />
            </div>
            <Reveal className="inner-about-layout__copy">
              <span className="inner-kicker">Близость к ландшафту</span>
              <h2 id="horse-intro-title">Свобода движения и погружение в природу</h2>
              <p>Конные прогулки в горах — это особый формат отдыха, который сочетает в себе близость к природе, умеренную физическую нагрузку и глубокое эмоциональное расслабление.</p>
              <p>Маршруты проходят по природным тропам через леса, альпийские луга и горные перевалы. Лошадь берёт на себя основную нагрузку, позволяя наслаждаться панорамами. Прогулки проходят в сопровождении опытного инструктора и доступны даже для новичков без опыта верховой езды.</p>
            </Reveal>
          </div>
        </section>

        {/* Triptych gallery */}
        <section className="inner-section inner-section--gallery" aria-labelledby="horse-gallery-title">
          <div className="container">
            <div className="inner-section__intro inner-section__intro--compact">
              <div>
                <span className="inner-kicker">Тропы и воздух</span>
                <h2 id="horse-gallery-title">Маршрут в трёх кадрах</h2>
              </div>
              <p>От лесной дороги до открытой долины — три момента одной прогулки.</p>
            </div>
            <div className="inner-photo-triptych">
              <Reveal>
                <figure>
                  <img src={innerWebAssets['horse-rides'][0]} alt="Два всадника у снежных вершин Кавказа" loading="lazy" />
                  <figcaption>Начинаем спокойно</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={100}>
                <figure>
                  <img src={innerWebAssets['horse-rides'][1]} alt="Конная прогулка по горному хребту" loading="lazy" />
                  <figcaption>Горный хребет</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={180}>
                <figure>
                  <img src={innerWebAssets['horse-rides'][2]} alt="Всадники на зелёном горном лугу" loading="lazy" />
                  <figcaption>Выходим к простору</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Info accordion */}
        <section className="inner-section inner-section--horse-info" aria-labelledby="horse-info-title">
          <div className="container inner-info-layout">
            <div>
              <span className="inner-kicker">Что важно знать</span>
              <h2 id="horse-info-title">Комфорт начинается с подготовки</h2>
            </div>
            <div className="inner-accordion-list">
              <details open>
                <summary>Польза для организма и самочувствия <Icon name="arrow" size={15} /></summary>
                <p>Мягкая тренировка мышц спины и корпуса, улучшение осанки и координации. Снижение уровня стресса, перезагрузка нервной системы и ощущение подлинной свободы за счёт контакта с благородными животными.</p>
              </details>
              <details>
                <summary>Что вы увидите во время прогулки <Icon name="arrow" size={15} /></summary>
                <p>Панорамные виды на вершины и ущелья, цветущие альпийские луга, горные реки и нетронутые природные ландшафты Северного Кавказа, недоступные для обычного автотранспорта.</p>
              </details>
              <details>
                <summary>Форматы прогулок <Icon name="arrow" size={15} /></summary>
                <p>Короткие маршруты на 1–2 часа для новичков и семей, а также полудневные и дневные выезды с остановками и пикником в горах.</p>
              </details>
              <details>
                <summary>Важные рекомендации перед выездом <Icon name="arrow" size={15} /></summary>
                <p>Надевайте удобную одежду по погоде и обязательно закрытую обувь. Слушайте команды инструктора, соблюдайте спокойствие — лошади чутко реагируют на уверенность всадника.</p>
              </details>
            </div>
          </div>
        </section>

      </main>
    </InnerPageShell>
  )
}

export function AboutPage() {
  return (
    <InnerPageShell
      meta={{
        ...aboutPage,
        heroImages: [
          innerWebAssets.elbrus[0],
          innerWebAssets.bermamyt[0],
          innerWebAssets.dombay[0],
          innerWebAssets.balkaria[0],
        ],
      }}
      className="inner-page--about"
    >
      <main id="inner-main" className="inner-main">

        {/* Story: фото-коллаж + текст */}
        <section className="inner-section inner-section--about-story" aria-labelledby="about-story-title">
          <div className="container inner-about-layout">
            <div className="inner-about-layout__art inner-about-art--collage">
              <img
                src={innerWebAssets.elbrus[0]}
                alt="Горное озеро у подножия Эльбруса"
                loading="lazy"
                className="inner-about-art__main"
              />
              <img
                src={innerWebAssets.bermamyt[1]}
                alt="Плато Бермамыт на рассвете"
                loading="lazy"
                className="inner-about-art__float inner-about-art__float--top"
              />
              <img
                src={innerWebAssets['dzhily-su'][2]}
                alt="Водопады Джилы-Су в ущелье"
                loading="lazy"
                className="inner-about-art__float inner-about-art__float--bottom"
              />
              <span>Северный Кавказ</span>
            </div>
            <Reveal className="inner-about-layout__copy">
              <span className="inner-kicker">Наша история</span>
              <h2 id="about-story-title">Северный Кавказ по-настоящему</h2>
              <p>Мы — команда, влюблённая в Северный Кавказ и своё дело. Уже более 4 лет мы организуем экскурсии, открывая нашим гостям первозданную красоту гор, традиций и культуры региона.</p>
              <p>За это время с нами отправились в путешествие более 5000 довольных клиентов — и для нас это не просто цифра, а доверие, которое мы ценим и оправдываем в каждой поездке.</p>
              <p>Мы не работаем по шаблонам. Каждый маршрут продуман до мелочей: от живописных локаций и комфортных внедорожников до атмосферы, в которой вы чувствуете себя спокойно и уверенно. С нами вы не просто смотрите — вы проживаете каждое место.</p>
            </Reveal>
          </div>
        </section>

        {/* Principles: карточки с визуальным акцентом */}
        <section className="inner-section inner-section--principles" aria-labelledby="principles-title">
          <div className="container">
            <div className="inner-section__intro inner-section__intro--compact">
              <div>
                <span className="inner-kicker">Как мы работаем</span>
                <h2 id="principles-title">Мы выбираем</h2>
              </div>
              <p>Честный подход, забота о безопасности и искреннее уважение к земле, по которой мы путешествуем.</p>
            </div>
            <div className="inner-principles-grid">
              {([
                ['01', 'Безопасность и ответственность', 'Тщательно проверяем подготовку внедорожников, горные перевалы, прогноз погоды и самочувствие гостей.', innerWebAssets.bermamyt[0]],
                ['02', 'Честность и открытость', 'Рассказываем о маршрутах без прикрас и рекламных клише. Вы всегда знаете, чего ждать от дороги.', innerWebAssets.elbrus[1]],
                ['03', 'Уважение к культуре', 'Бережно относимся к традициям, святыням и обычаям кавказских народов, передавая их живую историю.', innerWebAssets.balkaria[0]],
                ['04', 'Искренний сервис', 'Никакой формальности: открытое человеческое общение, помощь на каждом шагу и тёплое гостеприимство.', innerWebAssets['dzhily-su'][0]],
              ] as const).map(([number, title, text, photo], index) => (
                <Reveal key={number} delay={index * 80}>
                  <article className="inner-principle-card inner-principle-card--photo">
                    <div className="inner-principle-card__img-wrap">
                      <img src={photo} alt={title} loading="lazy" />
                    </div>
                    <div className="inner-principle-card__body">
                      <span>{number}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>
    </InnerPageShell>
  )
}

export function ContactPage() {
  const contactMeta = {
    eyebrow: 'Связь начинается с простого сообщения',
    title: 'Контакты',
    intro: 'Расскажите, какой Кавказ вы хотите увидеть — предложим маршрут и ответим на вопросы.',
    heroImage: assets.heroBackground,
    heroAlt: 'Горный пейзаж Северного Кавказа',
    heroPrimaryLabel: 'Написать в WhatsApp',
    heroPrimaryHref: innerContacts.whatsapp.href,
    heroPrimaryIcon: 'whatsapp' as const,
    heroSecondaryLabel: null,
  }

  const contactCard = (
    <Reveal className="inner-contact-card" delay={100}>
      <span className="inner-contact-card__rule" aria-hidden="true" />
      <div className="inner-contact-card__row">
        <span>Телефон</span>
        <a href={innerContacts.primaryPhone.href}>{innerContacts.primaryPhone.label}</a>
      </div>
      <div className="inner-contact-card__row">
        <span>Дополнительный номер</span>
        <a href={innerContacts.secondaryPhone.href}>{innerContacts.secondaryPhone.label}</a>
      </div>
      <div className="inner-contact-card__row">
        <span>Почта</span>
        <a href={innerContacts.email.href}>{innerContacts.email.label}</a>
      </div>
      <p>Обычно отвечаем в течение дня и всегда предупреждаем, если на маршруте меняется дорога или погода.</p>
    </Reveal>
  )

  return (
    <InnerPageShell meta={contactMeta} heroRight={contactCard} className="inner-page--contact">
      <main id="inner-main" className="inner-main">
        {/* Слайдер со всеми реальными фотографиями из ассетов сайта */}
        <ContactPhotoSlider />
      </main>
    </InnerPageShell>
  )
}

export function NotFoundPage() {
  const meta = {
    eyebrow: 'Поворот не туда',
    title: 'Страница не найдена',
    intro: 'Вернитесь на главную и выберите направление.',
    heroImage: assets.heroBackground,
    heroAlt: 'Горный пейзаж Северного Кавказа',
  }

  return (
    <InnerPageShell meta={meta} className="inner-page--not-found">
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-section--not-found">
          <div className="container inner-not-found">
            <Icon name="routes" size={72} />
            <h2>Давайте начнём с маршрута</h2>
            <a className="inner-button inner-button--solid" href="/">На главную <Icon name="arrow" size={16} /></a>
          </div>
        </section>
      </main>
    </InnerPageShell>
  )
}
