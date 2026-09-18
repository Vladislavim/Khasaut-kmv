import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{
  id: string
  className?: string
  ariaLabel?: string
  reveal?: 'none' | 'left' | 'right' | 'fade'
}>

export function Section({ children, id, className = '', ariaLabel, reveal = 'none' }: SectionProps) {
  const inferredReveal = reveal
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(inferredReveal === 'none')

  useEffect(() => {
    if (inferredReveal === 'none') return

    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inferredReveal])

  const revealClass = inferredReveal !== 'none'
    ? `section-reveal section-reveal--${inferredReveal} ${visible ? 'is-visible' : ''}`
    : ''

  return (
    <section ref={ref} id={id} className={`section ${className} ${revealClass}`.trim()} aria-label={ariaLabel}>
      {inferredReveal !== 'none' && inferredReveal !== 'fade' && <span className="section-reveal__veil" aria-hidden="true" />}
      {children}
    </section>
  )
}
