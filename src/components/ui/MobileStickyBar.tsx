import { useEffect, useState } from 'react'
import { detailPages } from '../../data/innerPages'
import { formatRubles, getMinimumGroupPrice, getPriceKeyForRouteSlug } from '../../data/prices'
import { Icon } from './Icon'
import { track } from '../../lib/analytics'

type MobileStickyBarProps = {
  pathname?: string
}

export function MobileStickyBar({ pathname = '/' }: MobileStickyBarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 70
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resolve dynamic tour details if on a route detail page
  let routeTitle = 'Джип-туры по Кавказу'
  let priceText = 'от 3 500 ₽'

  if (pathname.startsWith('/detail/')) {
    const slug = pathname.slice('/detail/'.length).replace(/\/+$/, '')
    const page = detailPages.find((p) => p.slug === slug)
    if (page) {
      routeTitle = page.title
      const priceKey = getPriceKeyForRouteSlug(slug)
      const minPrice = priceKey ? getMinimumGroupPrice(priceKey) : undefined
      if (minPrice) {
        priceText = `от ${formatRubles(minPrice)}`
      }
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Хочу узнать свободные даты на тур «${routeTitle}»`
  )
  const whatsappHref = `https://wa.me/79187477212?text=${whatsappMessage}`

  return (
    <aside
      className={`mobile-sticky-bar ${scrolled ? 'is-visible' : ''}`}
      aria-label="Быстрое бронирование тура"
      aria-hidden={!scrolled}
    >
      <div className="mobile-sticky-bar__inner">
        <div className="mobile-sticky-bar__info">
          <div className="mobile-sticky-bar__badge">
            <span className="mobile-sticky-bar__pulse" aria-hidden="true" />
            <span className="mobile-sticky-bar__badge-text">Места на этой неделе</span>
          </div>
          <div className="mobile-sticky-bar__price-row">
            <span className="mobile-sticky-bar__price">{priceText}</span>
            <span className="mobile-sticky-bar__unit">/ чел</span>
          </div>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mobile-sticky-bar__btn"
          onClick={() => track('mobile_sticky_whatsapp_click', { path: pathname, route: routeTitle })}
        >
          <Icon name="whatsapp" size={18} />
          <span>Написать Эльдару</span>
        </a>
      </div>
    </aside>
  )
}
