import type { InnerDetailPage as InnerDetailPageData } from '../data/innerPages'
import { innerWebAssets } from '../data/innerWebAssets'
import { InnerPageShell } from '../components/inner/InnerPageShell'
import { getPriceKeyForRouteSlug } from '../data/prices'
import { RouteItinerarySection } from '../components/inner/RouteItinerarySection'
import { RoutePracticalSection } from '../components/inner/RoutePracticalSection'
import { HomeFaqSection } from '../components/sections/HomeFaqSection'
import { InnerInterestPicker } from '../components/inner/InnerInterestPicker'
import { TripCallToAction } from '../components/ui/TripCallToAction'

type InnerDetailPageProps = {
  page: InnerDetailPageData
}

export function InnerDetailPage({ page }: InnerDetailPageProps) {
  const heroPhotos = innerWebAssets[page.slug] ?? [page.image]
  const bookingMessage = `Здравствуйте! Хочу обсудить и забронировать экскурсию «${page.title}». Подскажите свободные даты и детали.`
  const whatsappHref = `https://wa.me/79187477212?text=${encodeURIComponent(bookingMessage)}`

  const meta = {
    eyebrow: page.eyebrow,
    title: page.title,
    intro: page.intro,
    heroImage: page.image,
    heroAlt: page.alt,
    heroImages: heroPhotos,
    priceKey: getPriceKeyForRouteSlug(page.slug),
    heroPrimaryLabel: 'Забронировать тур в WhatsApp',
    heroPrimaryHref: whatsappHref,
    heroPrimaryIcon: 'whatsapp' as const,
    heroSecondaryLabel: 'Программа экскурсии',
    heroSecondaryHref: '#route-itinerary-title',
    seoTitle: page.seoTitle ?? `${page.title} — экскурсия из Кисловодска и КМВ | Khasaut Tour`,
    seoDescription: page.seoDescription ?? `${page.intro} Узнайте стоимость, выберите формат и обсудите дату поездки с организатором.`,
  }

  return (
    <InnerPageShell meta={meta} className={`inner-page--detail inner-page--detail-${page.category}`}>
      <main id="inner-main" className="inner-main">
        {/* 1. Step-by-step Tour Itinerary Program Timeline */}
        <RouteItinerarySection itinerary={page.itinerary} routeTitle={page.title} />

        {/* 2. Story, atmosphere & route highlights */}
        <section className="inner-section route-editorial" aria-labelledby="route-editorial-title">
          <div className="container route-editorial__layout">
            <div>
              <span className="inner-kicker">Знакомство с маршрутом</span>
              <h2 id="route-editorial-title">Ради этих впечатлений</h2>
              {page.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <dl>
              {page.highlights.map((item, index) => (
                <div key={item.title}>
                  <dt><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. Practical info: inclusions, extra costs, timing, gear & rules */}
        <RoutePracticalSection practical={page.practical} routeTitle={page.title} />

        {/* 3.1 FAQ with Schema.org/FAQPage rich snippet support for search engines */}
        <HomeFaqSection
          kicker="Частые вопросы о поездке"
          title={`Частые вопросы: ${page.title}`}
          subtitle={`Всё об организации поездки по направлению «${page.title}»: что надеть, во сколько выезд, безопасность и бронирование.`}
          idPrefix={`detail-faq-${page.slug}`}
        />

        {/* 4. Interactive Interest Matcher Widget */}
        <InnerInterestPicker currentSlug={page.slug} />

        {/* 5. Booking call to action */}
        <TripCallToAction route={page.title} />
      </main>
    </InnerPageShell>
  )
}
