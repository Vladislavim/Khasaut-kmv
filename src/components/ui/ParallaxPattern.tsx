import { useEffect, useRef } from 'react'

export interface ParallaxPatternProps {
  src: string
  className?: string
  alt?: string
  /**
   * Distance in pixels that the pattern travels across viewport transit.
   * Positive drifts upwards as you scroll down; negative drifts downwards.
   * Default: 45
   */
  distance?: number
  /**
   * Base rotation angle in degrees, e.g. -8 or 12.
   * Default: 0
   */
  rotate?: number
  /**
   * Custom styles if needed.
   */
  style?: React.CSSProperties
}

/**
 * ParallaxPattern renders an atmospheric watermark graphic in the section background
 * and applies a hardware-accelerated parallax drift during smooth scrolling.
 */
export function ParallaxPattern({
  src,
  className = '',
  alt = '',
  distance = 45,
  rotate = 0,
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
      if (rect.bottom > -120 && rect.top < windowHeight + 120) {
        const totalDistance = windowHeight + rect.height
        const progress = (windowHeight - rect.top) / totalDistance
        // Offset is 0 when the section is centered in the viewport
        const offset = (progress - 0.5) * distance
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) rotate(${rotate}deg)`
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
  }, [distance, rotate])

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
