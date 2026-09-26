import { useEffect, useRef } from 'react'

export interface ParallaxPatternProps {
  src: string
  className?: string
  alt?: string
  /**
   * Distance in pixels that the pattern travels across viewport transit.
   * Positive drifts upwards as you scroll down; negative drifts downwards.
   * Default: 110
   */
  distance?: number
  /**
   * Base rotation angle in degrees, e.g. -8 or 12.
   * Default: 0
   */
  rotate?: number
  /**
   * Dynamic tilt range in degrees as the pattern travels during scroll.
   * Default: 6
   */
  tilt?: number
  /**
   * Horizontal drift in pixels across viewport transit.
   * Default: 0
   */
  horizontalDistance?: number
  /**
   * Custom styles if needed.
   */
  style?: React.CSSProperties
}

/**
 * ParallaxPattern renders an atmospheric watermark graphic in the section background
 * and applies a hardware-accelerated parallax drift and organic tilt during smooth scrolling.
 */
export function ParallaxPattern({
  src,
  className = '',
  alt = '',
  distance = 110,
  rotate = 0,
  tilt = 6,
  horizontalDistance = 0,
  style,
}: ParallaxPatternProps) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let rafId: number | null = null

    const updateParallax = () => {
      const parent = el.parentElement || el
      const rect = parent.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only calculate if parent section is in or near viewport buffer
      if (rect.bottom > -150 && rect.top < windowHeight + 150) {
        const totalDistance = windowHeight + rect.height
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / totalDistance))
        const centered = progress - 0.5 // -0.5 to +0.5

        // Responsive factor: maintain pleasant motion on small screens
        const isMobile = window.innerWidth <= 768
        const distFactor = isMobile ? 0.65 : 1.0

        const yOffset = centered * distance * distFactor
        const xOffset = centered * horizontalDistance * distFactor
        const currentRotate = rotate + centered * tilt

        el.style.transform = `translate3d(${xOffset.toFixed(1)}px, ${yOffset.toFixed(1)}px, 0) rotate(${currentRotate.toFixed(1)}deg)`
      }
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateParallax()
          rafId = null
        })
      }
    }

    updateParallax()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [distance, rotate, tilt, horizontalDistance])

  return (
    <img
      ref={ref}
      className={`section-pattern ${className}`}
      src={src}
      alt={alt}
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{
        ...style,
        transform: `translate3d(0, 0px, 0) rotate(${rotate}deg)`,
        willChange: 'transform',
      }}
    />
  )
}
