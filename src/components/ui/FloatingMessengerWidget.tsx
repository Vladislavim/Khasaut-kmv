import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { innerContacts } from '../../data/innerContacts'
import { track } from '../../lib/analytics'

export function FloatingMessengerWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [isLagging, setIsLagging] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // 1. Initial entrance delay for WhatsApp button
    const enterTimer = window.setTimeout(() => {
      setIsVisible(true)
    }, 700)

    // 2. Prompt bubble drops down towards WhatsApp anchor
    const promptTimer = window.setTimeout(() => {
      setIsPromptOpen(true)
    }, 1800)

    // 3. Scroll tracking physics:
    // "если вниз листаем то чуть задерживаться и прыгать вниз, если наверх то никуда"
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (delta > 3) {
        // Scrolling DOWN: lag behind (displaced upward relative to viewport movement)
        setIsLagging(true)

        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current)
        }

        // When scrolling down pauses or stops, spring-jump DOWN to catch up!
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsLagging(false)
          scrollTimeoutRef.current = null
        }, 160)
      } else if (delta < -3) {
        // Scrolling UP: "если наверх то никуда" — stay anchored, zero lag
        setIsLagging(false)
        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current)
          scrollTimeoutRef.current = null
        }
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(promptTimer)
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const whatsappHref =
    'https://wa.me/79187477212?text=' +
    encodeURIComponent('Здравствуйте! Хочу узнать свободные даты на экскурсии из Кисловодска')

  const handleMainBtnClick = (e: React.MouseEvent) => {
    if (dismissed || !isPromptOpen) {
      e.preventDefault()
      setDismissed(false)
      setIsPromptOpen(true)
    }
  }

  return (
    <div
      ref={widgetRef}
      className={`floating-messenger ${isVisible ? 'is-visible' : ''} ${isLagging ? 'is-lagging' : ''}`}
      aria-label="Связь с организатором"
    >
      {/* Speech bubble that drops down towards WhatsApp anchor */}
      {isPromptOpen && !dismissed && (
        <div className="floating-messenger__drop-bubble" role="dialog" aria-label="Быстрая связь">
          <button
            type="button"
            className="floating-messenger__drop-close"
            onClick={() => setDismissed(true)}
            aria-label="Закрыть подсказку"
          >
            ×
          </button>
          <p className="floating-messenger__drop-text">Подсказать по свободным датам и маршрутам?</p>
          <div className="floating-messenger__drop-actions">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="floating-messenger__drop-btn floating-messenger__drop-btn--wa"
              onClick={() => track('contact_click', { channel: 'whatsapp', source: 'drop_bubble' })}
            >
              <Icon name="whatsapp" size={16} />
              <span>WhatsApp</span>
            </a>
            <a
              href={innerContacts.primaryPhone.href}
              className="floating-messenger__drop-btn floating-messenger__drop-btn--phone"
              onClick={() => track('contact_click', { channel: 'phone', source: 'drop_bubble' })}
            >
              <Icon name="phone" size={14} />
              <span>Позвонить</span>
            </a>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button with dual pulsating radar rings */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="floating-messenger__main-btn"
        aria-label="Написать в WhatsApp"
        onClick={handleMainBtnClick}
      >
        <span className="floating-messenger__ring" aria-hidden="true" />
        <span className="floating-messenger__ring floating-messenger__ring--delayed" aria-hidden="true" />
        <Icon name="whatsapp" size={32} className="floating-messenger__wa-icon" />
      </a>
    </div>
  )
}
