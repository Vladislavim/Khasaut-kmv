import { useEffect, useState, type PropsWithChildren } from 'react'
import { innerContacts } from '../../data/innerContacts'
import type { InnerPageMeta } from '../../data/innerPages'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { FooterSection } from '../sections/FooterSection'
import { Icon } from '../ui/Icon'
import { PriceBadge } from '../pricing/PriceBadge'
import { InnerHeroSlider } from './InnerHeroSlider'
import { track } from '../../lib/analytics'

type InnerPageShellProps = PropsWithChildren<{
  meta: InnerPageMeta
  className?: string
  heroRight?: React.ReactNode
  showHero?: boolean
}>

const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Экскурсии', href: '/excursions' },
  { label: 'Стоимость', href: '/prices' },
  { label: 'Контакты', href: '/contact' },
]

const headerContacts = [
  { label: 'Телефон', icon: 'phone', href: innerContacts.primaryPhone.href },
  { label: 'WhatsApp', icon: 'whatsapp', href: innerContacts.whatsapp.href },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/khasaut_jeep_tours/' },
] as const

function setMeta(selector: string, attrName: string, attrVal: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrVal)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function InnerPageShell({ meta, className = '', heroRight, showHero = true, children }: InnerPageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const pageTitle = meta.seoTitle ?? `${meta.title} — Khasaut Tour`
    const pageDesc = meta.seoDescription ?? meta.intro
    const pagePath = typeof window !== 'undefined' ? `https://khasaut-kmv.ru${window.location.pathname}` : 'https://khasaut-kmv.ru/'

    // Resolve absolute image URL for OpenGraph / WhatsApp / Telegram sharing
    let imageUrl = 'https://khasaut-kmv.ru/og-image.jpg'
    if (meta.heroImage) {
      imageUrl = meta.heroImage.startsWith('http')
        ? meta.heroImage
        : `https://khasaut-kmv.ru${meta.heroImage.startsWith('/') ? '' : '/'}${meta.heroImage}`
    }

    document.title = pageTitle
    setMeta('meta[name="description"]', 'name', 'description', pageDesc)

    // OpenGraph (WhatsApp, Telegram, VK)
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDesc)
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[property="og:url"]', 'property', 'og:url', pagePath)

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDesc)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    // Canonical URL
    setLink('canonical', pagePath)
  }, [meta.heroImage, meta.intro, meta.seoDescription, meta.seoTitle, meta.title])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className={`inner-page ${className}`.trim()}>
      <a className="inner-skip" href="#inner-main">К содержанию</a>

      <header id="top" className="inner-site-header">
        <div className="container">
          <div className="site-header">
            <a href="/" className="brand-lockup" aria-label="Khasaut Tour - на главную" onClick={() => setMenuOpen(false)}>
              <BrandMark />
              <span className="brand-lockup__name">KHASAUT TOUR</span>
            </a>

            <nav id="inner-main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Основная навигация">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === item.href ? 'is-current' : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header-contacts" aria-label="Контакты">
              {headerContacts.map((contact) => <ContactButton key={contact.label} {...contact} />)}
            </div>

            <button
              className="menu-toggle inner-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="inner-main-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
              <Icon name={menuOpen ? 'close' : 'menu'} size={25} />
            </button>
          </div>
        </div>
      </header>

      {showHero && (
        <section className={`inner-hero ${meta.heroVariant ? `inner-hero--${meta.heroVariant}` : ''}`.trim()} aria-labelledby="inner-page-title">
          <div className="container inner-hero__content">
            <div className="inner-hero__copy">
              <span className="inner-kicker">{meta.eyebrow}</span>
              <h1 id="inner-page-title">{meta.title}</h1>
              <p>{meta.intro}</p>
              {meta.priceKey !== undefined && <PriceBadge priceKey={meta.priceKey} variant="hero" />}
              <div className="inner-hero__buttons inner-hero__buttons--desktop">
                <a
                  className="inner-button inner-button--solid"
                  href={meta.heroPrimaryHref ?? (meta.priceKey ? '#detail-price' : '/contact')}
                  target={meta.heroPrimaryHref?.startsWith('http') ? '_blank' : undefined}
                  rel={meta.heroPrimaryHref?.startsWith('http') ? 'noreferrer' : undefined}
                  onClick={() => track(meta.priceKey ? 'hero_price_click' : 'contact_click', { route: meta.priceKey, source: 'inner-hero' })}
                >
                  {meta.heroPrimaryLabel ?? (meta.priceKey ? 'Рассчитать стоимость' : 'Подобрать тур в WhatsApp')}{' '}
                  <Icon name={meta.heroPrimaryIcon ?? 'arrow'} size={16} />
                </a>
                {meta.heroSecondaryLabel !== null && meta.heroSecondaryLabel && (
                  <a className="inner-button inner-button--quiet" href={meta.heroSecondaryHref ?? '#inner-main'}>
                    {meta.heroSecondaryLabel} <Icon name="arrow" size={16} />
                  </a>
                )}
                <div className="inner-hero-trust-badges inner-hero-trust-badges--desktop" aria-label="Преимущества бронирования">
                  <span>✓ Предоплата всего 1 500 ₽</span>
                  <span>✓ Заберём от отеля</span>
                  <span>⭐ 4.98 (1000+ отзывов)</span>
                </div>
              </div>
            </div>
            {heroRight ? (
              <div className="inner-hero__right">{heroRight}</div>
            ) : (meta.heroImages && meta.heroImages.length > 0) || meta.heroImage ? (
              <div className="inner-hero__slider-wrap">
                {meta.heroImages && meta.heroImages.length > 1 ? (
                  <InnerHeroSlider images={meta.heroImages} alt={meta.heroAlt} />
                ) : (
                  <img className="inner-hero__image" src={meta.heroImage} alt={meta.heroAlt} fetchPriority="high" />
                )}
              </div>
            ) : null}
          </div>
          <div className="container inner-hero__mobile-action">
            <div className="inner-hero__buttons inner-hero__buttons--mobile">
              <a
                className="inner-button inner-button--solid"
                href={meta.heroPrimaryHref ?? (meta.priceKey ? '#detail-price' : '/contact')}
                target={meta.heroPrimaryHref?.startsWith('http') ? '_blank' : undefined}
                rel={meta.heroPrimaryHref?.startsWith('http') ? 'noreferrer' : undefined}
                onClick={() => track(meta.priceKey ? 'hero_price_click' : 'contact_click', { route: meta.priceKey, source: 'inner-hero' })}
              >
                {meta.heroPrimaryLabel ?? (meta.priceKey ? 'Рассчитать стоимость' : 'Подобрать тур в WhatsApp')}{' '}
                <Icon name={meta.heroPrimaryIcon ?? 'arrow'} size={16} />
              </a>
              {meta.heroSecondaryLabel !== null && meta.heroSecondaryLabel && (
                <a className="inner-button inner-button--quiet" href={meta.heroSecondaryHref ?? '#inner-main'}>
                  {meta.heroSecondaryLabel} <Icon name="arrow" size={16} />
                </a>
              )}
            </div>
            <div className="inner-hero-trust-badges inner-hero-trust-badges--mobile" aria-label="Преимущества бронирования">
              <span>✓ Бронь 1 500 ₽</span>
              <span>✓ От отеля</span>
              <span>⭐ 4.98 (1000+)</span>
            </div>
          </div>
        </section>
      )}

      {children}

      <FooterSection />
    </div>
  )
}
