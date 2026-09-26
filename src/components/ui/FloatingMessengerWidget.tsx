import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { innerContacts } from '../../data/innerContacts'
import { track } from '../../lib/analytics'

export function FloatingMessengerWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // 1. Initial entrance delay
    const enterTimer = window.setTimeout(() => {
      setIsVisible(true)
    }, 600)

    // 2. Scroll detection: dips away while scrolling, returns to initial spot with delay
    const handleScroll = () => {
      setIsScrolling(true)
      setIsOpen(false)
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
      // With a natural delay after scroll stops, it returns to where it was initially
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false)
        scrollTimeoutRef.current = null
      }, 420)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(enterTimer)
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const whatsappHref =
    'https://wa.me/79187477212?text=' +
    encodeURIComponent('Здравствуйте! Хочу узнать свободные даты на экскурсии из Кисловодска')

  return (
    <div
      ref={widgetRef}
      className={`floating-messenger ${isVisible ? 'is-visible' : ''} ${isScrolling ? 'is-scrolling' : ''} ${isOpen ? 'is-open' : ''}`}
      aria-label="Быстрая связь с гидом"
    >
      {/* Clean popup menu with WhatsApp and Direct Call */}
      <div className="floating-messenger__menu" aria-hidden={!isOpen}>
        <div className="floating-messenger__menu-head">
          <span className="floating-messenger__menu-title">Связь с гидом</span>
          <button
            type="button"
            className="floating-messenger__menu-close"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="floating-messenger__action floating-messenger__action--whatsapp"
          onClick={() => {
            track('contact_click', { channel: 'whatsapp', source: 'floating_widget' })
            setIsOpen(false)
          }}
        >
          <span className="floating-messenger__icon-wrap">
            <Icon name="whatsapp" size={22} />
          </span>
          <div className="floating-messenger__action-text">
            <strong>Написать в WhatsApp</strong>
            <small>Маршруты, даты и бронирование</small>
          </div>
        </a>

        <a
          href={innerContacts.primaryPhone.href}
          className="floating-messenger__action floating-messenger__action--phone"
          onClick={() => {
            track('contact_click', { channel: 'phone', source: 'floating_widget' })
            setIsOpen(false)
          }}
        >
          <span className="floating-messenger__icon-wrap">
            <Icon name="phone" size={19} />
          </span>
          <div className="floating-messenger__action-text">
            <strong>Позвонить Эльдару</strong>
            <small>+7 (918) 747-72-12</small>
          </div>
        </a>
      </div>

      {/* Main Floating Trigger Button with Dual Pulsating Rings */}
      <button
        type="button"
        className="floating-messenger__btn"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть контакты' : 'Быстрая связь в WhatsApp и по телефону'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="floating-messenger__ring" aria-hidden="true" />
        <span className="floating-messenger__ring floating-messenger__ring--delayed" aria-hidden="true" />

        {isOpen ? (
          <Icon name="close" size={24} className="floating-messenger__icon floating-messenger__icon--close" />
        ) : (
          <div className="floating-messenger__icons">
            <Icon name="whatsapp" size={28} className="floating-messenger__icon floating-messenger__icon--wa" />
            <span className="floating-messenger__icon--tel" title="Позвонить">
              <Icon name="phone" size={13} />
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
