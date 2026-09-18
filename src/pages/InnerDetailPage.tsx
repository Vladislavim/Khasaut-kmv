import type { InnerDetailPage as InnerDetailPageData } from '../data/innerPages'
import { innerContacts } from '../data/innerContacts'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { InnerPageShell } from '../components/inner/InnerPageShell'
import { InnerPhotoSlider } from '../components/inner/InnerPhotoSlider'
import { getDetailSliderSlides } from '../data/innerSlider'
import { getMinimumGroupPrice, getPriceKeyForRouteSlug } from '../data/prices'
import { DetailPricePanel } from '../components/pricing/DetailPricePanel'
import { TripCallToAction } from '../components/ui/TripCallToAction'
import { BookingTerms, TripRequirements } from '../components/pricing/BookingTerms'

type InnerDetailPageProps = {
  page: InnerDetailPageData
}

export function InnerDetailPage({ page }: InnerDetailPageProps) {
  const meta = {
    eyebrow: page.eyebrow,
    title: page.title,
    intro: page.intro,
    heroImage: page.image,
    heroAlt: page.alt,
    priceKey: getPriceKeyForRouteSlug(page.slug),
    seoTitle: `${page.title} — экскурсия из Кисловодска и КМВ | Khasaut Tour`,
    seoDescription: `${page.intro} Узнайте стоимость, выберите формат и обсудите дату поездки с организатором.`,
  }

  return (
    <InnerPageShell meta={meta} className={`inner-page--detail inner-page--detail-${page.category}`}>
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-detail-price" aria-labelledby="detail-price-title">
          <div className="container">
            <DetailPricePanel slug={page.slug} />
          </div>
        </section>

        <section className="inner-section route-editorial" aria-labelledby="route-editorial-title">
          <div className="container route-editorial__layout">
            <div><span className="inner-kicker">Знакомство с маршрутом</span><h2 id="route-editorial-title">Ради этих впечатлений</h2>{page.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <dl>{page.highlights.map((item, index) => <div key={item.title}><dt><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
          </div>
        </section>
        <section className="inner-section inner-detail-highlights" aria-labelledby="detail-highlights-title">
          <div className="container">
            <div className="inner-section__intro inner-section__intro--compact">
              <div>
                <span className="inner-kicker">Внутри поездки</span>
                <h2 id="detail-highlights-title">Что увидим по дороге</h2>
              </div>
            </div>
            <Reveal>
              <InnerPhotoSlider slides={getDetailSliderSlides(page)} />
            </Reveal>
          </div>
        </section>

        <section className="inner-section inner-detail-practical" aria-labelledby="detail-practical-title">
            <div className="container inner-detail-practical__grid">
            <Reveal>
              <span className="inner-kicker">Перед выездом</span>
              <h2 id="detail-practical-title">Перед поездкой</h2>
              <a className="inner-button inner-button--solid" href={innerContacts.whatsapp.href} target="_blank" rel="noreferrer">Написать в WhatsApp <Icon name="arrow" size={16} /></a>
            </Reveal>
            <Reveal className="inner-detail-facts" delay={120}>
              <div className="inner-detail-fact"><span>Выезд</span><strong>Заберём от места проживания.</strong></div>
              <div className="inner-detail-fact"><span>Транспорт</span><strong>Автомобиль подбираем под маршрут.</strong></div>
              <div className="inner-detail-fact"><span>Бронирование</span><strong>{(getMinimumGroupPrice(meta.priceKey) ?? 0) >= 1500 ? 'Предоплата - 1 500 ₽ с человека.' : 'Размер предоплаты уточним при подтверждении.'}</strong></div>
              <TripRequirements />
              <BookingTerms />
              <a className="inner-detail-fact__phone" href={innerContacts.primaryPhone.href}><Icon name="phone" size={18} />{innerContacts.primaryPhone.label}</a>
            </Reveal>
          </div>
        </section>
        <TripCallToAction route={page.title} />
      </main>
    </InnerPageShell>
  )
}
