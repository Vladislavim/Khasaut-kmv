import { useEffect, useState, type PropsWithChildren } from 'react'
import { innerContacts } from '../../data/innerContacts'
import type { InnerPageMeta } from '../../data/innerPages'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { FooterSection } from '../sections/FooterSection'
import { Icon } from '../ui/Icon'
import { PriceBadge } from '../pricing/PriceBadge'
import { track } from '../../lib/analytics'

type InnerPageShellProps = PropsWithChildren<{
  meta: InnerPageMeta
  className?: string
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
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/eldar_e_7212?igsi=MWltZzl1Y2luejN5bw==' },
] as const

export function InnerPageShell({ meta, className = '', children }: InnerPageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.title = meta.seoTitle ?? `${meta.title} - Khasaut Tour`
    if (meta.seoDescription) {
      const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta')
      description.setAttribute('name', 'description')
      description.setAttribute('content', meta.seoDescription)
      if (!description.parentElement) document.head.appendChild(description)
    }
  }, [meta.seoDescription, meta.seoTitle, meta.title])

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

      <section className={`inner-hero ${meta.heroVariant ? `inner-hero--${meta.heroVariant}` : ''}`.trim()} aria-labelledby="inner-page-title">
        <div className="inner-hero__image-wrap">
          <img className="inner-hero__image" src={meta.heroImage} alt={meta.heroAlt} fetchPriority="high" />
        </div>
        <div className="inner-hero__wash" aria-hidden="true" />
        <div className="container inner-hero__content">
          <div className="inner-hero__copy">
            <span className="inner-kicker">{meta.eyebrow}</span>
            <h1 id="inner-page-title">{meta.title}</h1>
            <p>{meta.intro}</p>
            {meta.priceKey !== undefined && <PriceBadge priceKey={meta.priceKey} variant="hero" />}
            <div className="inner-hero__buttons">
              <a className="inner-button inner-button--solid" href={meta.heroPrimaryHref ?? (meta.priceKey ? '#detail-price' : '/contact')} onClick={() => track(meta.priceKey ? 'hero_price_click' : 'contact_click', { route: meta.priceKey, source: 'inner-hero' })}>
                {meta.heroPrimaryLabel ?? (meta.priceKey ? 'Рассчитать стоимость' : 'Обсудить поездку')} <Icon name="arrow" size={16} />
              </a>
              {meta.heroSecondaryLabel !== null && (
                <a className="inner-button inner-button--quiet" href={meta.heroSecondaryHref ?? '#inner-main'}>
                  {meta.heroSecondaryLabel ?? 'Смотреть маршрут'} <Icon name="arrow" size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="inner-hero__stamp" aria-hidden="true">
            <span>Северный</span>
            <strong>Кавказ</strong>
            <i />
            <small>Khasaut Tour</small>
          </div>
        </div>
      </section>

      {children}

      <FooterSection />
    </div>
  )
}
