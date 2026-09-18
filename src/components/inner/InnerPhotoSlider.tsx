import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { InnerSliderSlide } from '../../data/innerSlider'

type InnerPhotoSliderProps = {
  slides: InnerSliderSlide[]
}

export function InnerPhotoSlider({ slides }: InnerPhotoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const count = slides.length

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + count) % count)
  }, [count])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion || count < 2) return

    const timer = window.setInterval(goNext, 5600)
    return () => window.clearInterval(timer)
  }, [count, goNext, isPaused, reducedMotion])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrevious()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) < 48) return
    if (distance < 0) goNext()
    else goPrevious()
  }

  if (count === 0) return null

  const activeSlide = slides[activeIndex]

  return (
    <div
      className="inner-photo-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="inner-photo-slider__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Фотографии маршрута"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null }}
      >
        {slides.map((slide, index) => (
          <figure
            className={`inner-photo-slider__slide ${index === activeIndex ? 'is-active' : ''}`}
            aria-hidden={index !== activeIndex}
            key={`${slide.image}-${index}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              width="1600"
              height="1067"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="inner-photo-slider__rail" aria-live="polite">
        <div>
          <span className="inner-photo-slider__rail-kicker">Кадры с маршрута</span>
          <h3>{activeSlide.title}</h3>
          <p>{activeSlide.text}</p>
        </div>

        <div className="inner-photo-slider__controls">
          <div className="inner-photo-slider__arrows">
            <button type="button" onClick={goPrevious} aria-label="Предыдущая фотография">←</button>
            <button type="button" onClick={goNext} aria-label="Следующая фотография">→</button>
          </div>
          <div className="inner-photo-slider__dots" role="tablist" aria-label="Выбор фотографии">
            {slides.map((slide, index) => (
              <button
                type="button"
                role="tab"
                aria-label={`Показать фотографию ${index + 1}`}
                aria-selected={index === activeIndex}
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => goTo(index)}
                key={`${slide.title}-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
