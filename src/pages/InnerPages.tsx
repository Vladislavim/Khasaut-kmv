import { assets } from '../data/assets'
import { innerContacts } from '../data/innerContacts'
import { innerWebAssets } from '../data/innerWebAssets'
import { aboutPage, excursions, excursionsPage, horsePage, routesPage, thermalPage, thermalSources, unusualRoutes } from '../data/innerPages'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { InnerCatalogPage } from '../components/inner/InnerCatalogPage'
import { InnerPageShell } from '../components/inner/InnerPageShell'

export function ExcursionsPage() {
  return (
    <InnerCatalogPage
      meta={excursionsPage}
      cards={excursions}
      sectionTitle="Основные направления"
      sectionIntro="Джилы-Суу, Бермамыт, Домбай, Верхняя Балкария, Эльбрус, Актопрак и Северная Осетия."
      noteTitle="Не нашли свой маршрут?"
      noteText="Напишите нам - подскажем маршрут, время и стоимость."
      mobileInitialCount={7}
    />
  )
}

export function RoutesPage() {
  return (
    <InnerCatalogPage
      meta={routesPage}
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
      meta={thermalPage}
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
    <InnerPageShell meta={{ ...horsePage, heroImage: innerWebAssets['horse-rides'][0] }} className="inner-page--horse">
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-section--horse-intro" aria-labelledby="horse-intro-title">
          <div className="container inner-editorial-grid">
            <Reveal className="inner-editorial-grid__heading">
              <span className="inner-kicker">Близость к ландшафту</span>
              <h2 id="horse-intro-title">Спокойная прогулка в горах.</h2>
            </Reveal>
            <Reveal className="inner-editorial-grid__copy" delay={100}>
              <p>Прогулки проходят с инструктором. Продолжительность и маршрут подбираем под опыт участников.</p>
            </Reveal>
          </div>
        </section>

        <section className="inner-section inner-section--gallery" aria-labelledby="horse-gallery-title">
          <div className="container">
            <div className="inner-section__intro inner-section__intro--compact">
              <div>
                <span className="inner-kicker">Тропы и воздух</span>
                <h2 id="horse-gallery-title">Маршрут в три кадра</h2>
              </div>
              <p>Три спокойных кадра прогулки - от лесной дороги до открытой долины.</p>
            </div>
            <div className="inner-photo-triptych">
              <Reveal><figure><img src={innerWebAssets['horse-rides'][0]} alt="Два всадника у снежных вершин Кавказа" loading="lazy" /><figcaption>Начинаем спокойно</figcaption></figure></Reveal>
              <Reveal delay={100}><figure><img src={innerWebAssets['horse-rides'][1]} alt="Конная прогулка по горному хребту" loading="lazy" /><figcaption>Горный хребет</figcaption></figure></Reveal>
              <Reveal delay={180}><figure><img src={innerWebAssets['horse-rides'][2]} alt="Всадники на зелёном горном лугу" loading="lazy" /><figcaption>Выходим к простору</figcaption></figure></Reveal>
            </div>
          </div>
        </section>

        <section className="inner-section inner-section--horse-info" aria-labelledby="horse-info-title">
          <div className="container inner-info-layout">
            <div>
              <span className="inner-kicker">Что важно знать</span>
              <h2 id="horse-info-title">Комфорт начинается с подготовки</h2>
            </div>
            <div className="inner-accordion-list">
              <details open>
                <summary>Для кого подходит прогулка <Icon name="arrow" size={15} /></summary>
                <p>Для новичков, семей и тех, кто хочет провести несколько часов на природе без сложного походного темпа.</p>
              </details>
              <details>
                <summary>Что взять с собой <Icon name="arrow" size={15} /></summary>
                <p>Закрытую удобную обувь, одежду по погоде и воду. Перед выездом расскажем о прогнозе.</p>
              </details>
              <details>
                <summary>Какие бывают форматы <Icon name="arrow" size={15} /></summary>
                <p>Короткая прогулка на 1-2 часа или маршрут на полдня с остановками.</p>
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
    <InnerPageShell meta={aboutPage} className="inner-page--about">
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-section--about-story" aria-labelledby="about-story-title">
          <div className="container inner-about-layout">
            <div className="inner-about-layout__art">
              <img src={innerWebAssets.elbrus[0]} alt="Горное озеро у подножия Эльбруса" loading="lazy" />
              <span>Северный Кавказ</span>
            </div>
            <Reveal className="inner-about-layout__copy">
              <span className="inner-kicker">Наша история</span>
              <h2 id="about-story-title">Едем не за галочкой.</h2>
              <p>Мы организуем поездки по Северному Кавказу уже 4 года и бережно относимся к каждой детали маршрута.</p>
              <p>Каждый маршрут продуман до мелочей: от живописных локаций и комфортного транспорта до атмосферы, в которой можно спокойно смотреть по сторонам и быть собой.</p>
            </Reveal>
          </div>
        </section>

        <section className="inner-section inner-section--principles" aria-labelledby="principles-title">
          <div className="container">
            <div className="inner-section__intro inner-section__intro--compact">
              <div>
                <span className="inner-kicker">Как мы работаем</span>
                <h2 id="principles-title">Четыре простых принципа</h2>
              </div>
              <p>Спокойная организация, честный разговор и уважение к месту, куда мы приезжаем.</p>
            </div>
            <div className="inner-principles-grid">
              {[
                ['01', 'Безопасность', 'Проверяем дорогу, прогноз и темп группы до выезда.'],
                ['02', 'Честность', 'Рассказываем о маршруте так, как он есть, без обещаний из рекламы.'],
                ['03', 'Культура', 'Показываем регион бережно - с уважением к его людям и истории.'],
                ['04', 'Сервис', 'Остаёмся на связи и помогаем с деталями, которые делают день проще.'],
              ].map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 80}>
                  <article className="inner-principle-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
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
    intro: 'Расскажите, какой Кавказ вы хотите увидеть - предложим маршрут и ответим на вопросы.',
    heroImage: assets.heroBackground,
    heroAlt: 'Горный пейзаж Северного Кавказа',
  }

  return (
    <InnerPageShell meta={contactMeta} className="inner-page--contact">
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-section--contact" aria-labelledby="contact-title">
          <div className="container inner-contact-layout">
            <Reveal className="inner-contact-layout__intro">
              <span className="inner-kicker">Как связаться</span>
              <h2 id="contact-title">Будем рады услышать вас</h2>
              <p>Напишите или позвоните - обсудим даты, состав группы и формат поездки.</p>
              <a className="inner-button inner-button--solid" href={innerContacts.whatsapp.href} target="_blank" rel="noreferrer">Написать в WhatsApp <Icon name="arrow" size={16} /></a>
            </Reveal>
            <Reveal className="inner-contact-card" delay={120}>
              <span className="inner-contact-card__rule" aria-hidden="true" />
              <div className="inner-contact-card__row"><span>Телефон</span><a href={innerContacts.primaryPhone.href}>{innerContacts.primaryPhone.label}</a></div>
              <div className="inner-contact-card__row"><span>Дополнительный номер</span><a href={innerContacts.secondaryPhone.href}>{innerContacts.secondaryPhone.label}</a></div>
              <div className="inner-contact-card__row"><span>Почта</span><a href={innerContacts.email.href}>{innerContacts.email.label}</a></div>
              <p>Обычно отвечаем в течение дня и всегда предупреждаем, если на маршруте меняется дорога или погода.</p>
            </Reveal>
          </div>
        </section>
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
