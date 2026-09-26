import { useEffect, useState } from 'react'

const PHRASES = [
  'Хотите такой же сайт?',
  'Подберем под ваш бюджет!',
  'Обсудить проект в Telegram →',
]

export function DevCreditBadge() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex]

    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentPhrase) {
      // Pause at complete phrase
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayText === '') {
      // Move to next phrase after deleting
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length)
      timeout = setTimeout(() => {}, 400)
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? 28 : 55
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <a
      href="https://t.me/vimanakov"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-dev-badge"
      title="Написать разработчику Владиславу в Telegram"
      aria-label="Хотите такой же сайт? Подберем под ваш бюджет. Разработчик: Vlad Imanakov"
    >
      <span className="footer-dev-badge__status" aria-hidden="true">
        <span className="footer-dev-badge__dot" />
      </span>
      <span className="footer-dev-badge__content">
        <span className="footer-dev-badge__typewriter">
          {displayText}
          <span className="footer-dev-badge__cursor" aria-hidden="true">|</span>
        </span>
      </span>
      <span className="footer-dev-badge__author">
        <span className="footer-dev-badge__author-label">dev:</span>
        <strong>imanakov</strong>
        <svg className="footer-dev-badge__icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </a>
  )
}
