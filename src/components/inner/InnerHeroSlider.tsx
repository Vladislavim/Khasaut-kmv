import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '../ui/Icon'

type InnerHeroSliderProps = {
  images: readonly string[]
  alt: string
  className?: string
  autoPlayInterval?: number
}

export function InnerHeroSlider({
  images,
  alt,
  className = '',
  autoPlayInterval = 6000,
}: InnerHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const count = images.length

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % count)
  }, [count])

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + count) % count)
  }, [count])


  // Auto-advance
  useEffect(() => {
    if (isPaused || count <= 1 || autoPlayInterval <= 0) return
    const timer = setInterval(() => {
      next()
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [autoPlayInterval, count, isPaused, next])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        next()
      } else {
        prev()
      }
    }
    touchStartX.current = null
    touchStartY.current = null
    setIsPaused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  if (count === 0) return null

  return (
    <div
      className={`inner-hero-slider ${className}`.trim()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Фотогалерея ${alt}`}
      tabIndex={0}
    >
      <div className="inner-hero-slider__stage">
        {images.map((src, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={src}
              className={`inner-hero-slider__slide ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={src}
                alt={`${alt} — фото ${index + 1} из ${count}`}
                className="inner-hero__image inner-hero-slider__img"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <div className="inner-hero-slider__controls" onClick={(e) => e.stopPropagation()}>
          <div className="inner-hero-slider__bar">
            <button
              type="button"
              className="inner-hero-slider__arrow inner-hero-slider__arrow--prev"
              onClick={prev}
              aria-label="Предыдущее фото"
            >
              <Icon name="arrow" size={13} />
            </button>

            <span className="inner-hero-slider__counter" aria-live="polite">
              <strong>{String(currentIndex + 1).padStart(2, '0')}</strong>
              <span className="inner-hero-slider__divider">/</span>
              <span>{String(count).padStart(2, '0')}</span>
            </span>

            <button
              type="button"
              className="inner-hero-slider__arrow inner-hero-slider__arrow--next"
              onClick={next}
              aria-label="Следующее фото"
            >
              <Icon name="arrow" size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
