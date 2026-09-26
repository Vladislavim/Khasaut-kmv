import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { innerContacts } from '../../data/innerContacts'
import { track } from '../../lib/analytics'

export function FloatingMessengerWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. WhatsApp button drops into its corner with a smooth spring after 800ms
    const enterTimer = window.setTimeout(() => {
      setIsVisible(true)
    }, 800)

    // 2. Prompt bubble drops down towards WhatsApp anchor with a natural delay at 2.2s
    const promptTimer = window.setTimeout(() => {
      setIsPromptOpen(true)
    }, 2200)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(promptTimer)
    }
  }, [])

  const whatsappHref =
    'https://wa.me/79187477212?text=' +
    encodeURIComponent('Здравствуйте! Хочу узнать свободные даты на экскурсии из Кисловодска')

  return (
    <div
      ref={widgetRef}
      className={`floating-messenger ${isVisible ? 'is-visible' : ''}`}
      aria-label="Связь с организатором"
    >
      {/* Prompt bubble that drops down with delay to where WhatsApp is anchored */}
      {isPromptOpen && !dismissed && (
        <div className="floating-messenger__drop-bubble" role="dialog" aria-label="Быстрая связь">
          <button
            type="button"
            className="floating-messenger__drop-close"
            onClick={() => setDismissed(true)}
            aria-label="Закрыть"
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

      {/* Main WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="floating-messenger__main-btn"
        aria-label="Написать в WhatsApp"
        onClick={() => track('contact_click', { channel: 'whatsapp', source: 'floating_btn' })}
      >
        <span className="floating-messenger__ping" aria-hidden="true" />
        <Icon name="whatsapp" size={32} className="floating-messenger__wa-icon" />
      </a>
    </div>
  )
}
