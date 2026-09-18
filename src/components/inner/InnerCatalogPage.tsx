import { useState } from 'react'
import { detailPages, type CatalogCard, type InnerPageMeta } from '../../data/innerPages'
import { getPriceKeyForRouteSlug, type PriceRouteKey } from '../../data/prices'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { InnerPageShell } from './InnerPageShell'
import { PriceBadge } from '../pricing/PriceBadge'
import { QuickPriceSheet } from '../pricing/QuickPriceSheet'

type InnerCatalogPageProps = {
  meta: InnerPageMeta
  cards: CatalogCard[]
  sectionTitle: string
  sectionIntro: string
  noteTitle: string
  noteText: string
  mobileInitialCount?: number
}

export function InnerCatalogPage({ meta, cards, sectionTitle, sectionIntro, noteTitle, noteText, mobileInitialCount }: InnerCatalogPageProps) {
  const [quickRouteKey, setQuickRouteKey] = useState<PriceRouteKey | null>(null)
  const [showAdditional, setShowAdditional] = useState(false)
  const hasAdditional = mobileInitialCount !== undefined && cards.length > mobileInitialCount

  return (
    <InnerPageShell meta={meta} className="inner-page--catalog">
      <main id="inner-main" className="inner-main">
        <section className="inner-section inner-section--catalog" id="catalog" aria-labelledby="catalog-title">
          <div className="container">
            <div className="inner-section__intro">
              <div>
                <span className="inner-kicker">Выберите своё направление</span>
                <h2 id="catalog-title">{sectionTitle}</h2>
              </div>
              <p>{sectionIntro}</p>
            </div>

            <div id="inner-catalog-grid" className={`inner-catalog-grid ${showAdditional ? 'is-expanded' : ''}`}>
              {cards.map((card, index) => (
                <Reveal key={card.title} className="inner-card-reveal" delay={(index % 3) * 80}>
                  {(() => {
                    const detailPage = detailPages.find((page) => page.title === card.title)
                    const detailHref = detailPage ? `/detail/${detailPage.slug}` : '/contact'
                    const priceKey = detailPage ? getPriceKeyForRouteSlug(detailPage.slug) : undefined
                    return (
                  <article className="inner-route-card">
                    <figure className="inner-route-card__media">
                      <img src={detailPage?.image ?? card.image} alt={card.alt} loading={index < 3 ? 'eager' : 'lazy'} />
                      <span className="inner-route-card__number">{String(index + 1).padStart(2, '0')}</span>
                    </figure>
                    <div className="inner-route-card__body">
                      <span className="inner-route-card__kicker">{card.kicker}</span>
                      <h3>{card.title}</h3>
                      <p>{card.blurb}</p>
                      <PriceBadge priceKey={priceKey} />
                      <div className="inner-route-card__actions">
                        {priceKey ? (
                          <button className="inner-button inner-button--solid" type="button" onClick={() => setQuickRouteKey(priceKey)}>
                            Рассчитать <Icon name="arrow" size={14} />
                          </button>
                        ) : (
                          <a className="inner-button inner-button--outline" href="/contact">Уточнить <Icon name="arrow" size={14} /></a>
                        )}
                      </div>
                      <a className="inner-route-card__detail-link" href={detailHref}>
                        Подробнее <Icon name="arrow" size={15} />
                      </a>
                    </div>
                  </article>
                    )
                  })()}
                </Reveal>
              ))}
            </div>
            {hasAdditional && (
              <button className="inner-catalog-more-toggle" type="button" aria-expanded={showAdditional} aria-controls="inner-catalog-grid" onClick={() => setShowAdditional((value) => !value)}>
                {showAdditional ? 'Скрыть маршруты' : 'Другие маршруты'} <span aria-hidden="true">{showAdditional ? '−' : '+'}</span>
              </button>
            )}
          </div>
        </section>

        <section className="inner-section inner-section--note" aria-labelledby="inner-note-title">
          <div className="container inner-note">
            <div className="inner-note__mark" aria-hidden="true" />
            <div>
              <span className="inner-kicker">Личный подход</span>
              <h2 id="inner-note-title">{noteTitle}</h2>
              <p>{noteText}</p>
            </div>
            <a className="inner-button inner-button--outline" href="/contact">Спросить команду <Icon name="arrow" size={16} /></a>
          </div>
        </section>

        <QuickPriceSheet routeKey={quickRouteKey} onClose={() => setQuickRouteKey(null)} />
      </main>
    </InnerPageShell>
  )
}
