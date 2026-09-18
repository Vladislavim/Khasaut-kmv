import { useCallback, useEffect, useRef, useState } from 'react'
import { formatRubles, getMinimumGroupPrice, type PriceRouteKey } from '../../data/prices'
import { Icon } from '../ui/Icon'

type MobilePriceBarProps = {
  routeKey: PriceRouteKey
}

export function MobilePriceBar({ routeKey }: MobilePriceBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const [sectionHidden, setSectionHidden] = useState(true)
  const [contentOverlap, setContentOverlap] = useState(false)

  const checkContentOverlap = useCallback(() => {
    const bar = barRef.current
    if (!bar || sectionHidden) {
      setContentOverlap(false)
      return
    }

    const barRect = bar.getBoundingClientRect()
    const overlaps = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button')].some((node) => {
      if (bar.contains(node)) return false
      const element = node as HTMLElement
      if (!element.textContent?.trim() || getComputedStyle(element).visibility === 'hidden') return false
      const rect = element.getBoundingClientRect()
      return rect.bottom > barRect.top + 4 && rect.top < barRect.bottom - 4 && rect.right > 0 && rect.left < window.innerWidth
    })

    setContentOverlap(overlaps)
  }, [sectionHidden])

  useEffect(() => {
    const pricePanel = document.querySelector('#detail-price')
    const footer = document.querySelector('.footer-section')
    if (!pricePanel) return

    let priceVisible = false
    let footerVisible = false
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === pricePanel) priceVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      })
      setSectionHidden(priceVisible || footerVisible)
    }, { threshold: 0.1, rootMargin: '0px 0px -14% 0px' })

    observer.observe(pricePanel)
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        checkContentOverlap()
      })
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [checkContentOverlap])

  const isHidden = sectionHidden || contentOverlap

  const minimum = getMinimumGroupPrice(routeKey)
  const scrollToPrice = () => {
    const target = document.querySelector('#detail-price')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div ref={barRef} className={`mobile-price-bar ${isHidden ? 'is-hidden' : ''}`} aria-hidden={isHidden}>
      <div>
        <span>Стоимость от</span>
        <strong>{minimum ? formatRubles(minimum) : 'по запросу'}</strong>
      </div>
      <button type="button" onClick={scrollToPrice} tabIndex={isHidden ? -1 : 0}>
        Рассчитать <Icon name="arrow" size={15} />
      </button>
    </div>
  )
}
