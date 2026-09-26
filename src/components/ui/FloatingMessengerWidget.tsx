import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { innerContacts } from '../../data/innerContacts'
import { track } from '../../lib/analytics'

export function FloatingMessengerWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const whatsappHref =
    'https://wa.me/79187477212?text=' +
    encodeURIComponent('Здравствуйте! Хочу узнать подробнее про экскурсии из Кисловодска')

  return (
    <div
      ref={widgetRef}
      className={`floating-messenger ${hasScrolled ? 'has-scrolled' : ''} ${isOpen ? 'is-open' : ''}`}
      aria-label="Быстрая связь с гидом"
    >
      {/* Pop-up menu with WhatsApp and Phone */}
      <div className="floating-messenger__menu" aria-hidden={!isOpen}>
        <div className="floating-messenger__status">
          <span className="floating-messenger__status-dot" aria-hidden="true" />
          <span>Эльдар на связи • КМВ</span>
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
            <small>Отвечаем за 2–5 минут</small>
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
            <Icon name="phone" size={20} />
          </span>
          <div className="floating-messenger__action-text">
            <strong>Позвонить Эльдару</strong>
            <small>+7 (918) 747-72-12</small>
          </div>
        </a>
      </div>

      {/* Main Floating Trigger Button */}
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
          <Icon name="whatsapp" size={30} className="floating-messenger__icon floating-messenger__icon--wa" />
        )}
      </button>
    </div>
  )
}
