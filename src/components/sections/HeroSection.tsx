import { type PointerEvent as ReactPointerEvent, type TouchEvent as ReactTouchEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { Icon } from '../ui/Icon'
import { assets } from '../../data/assets'
import { contacts } from '../../data/contacts'
import { track } from '../../lib/analytics'

// Маршруты привязанные к каждой фотографии в коллаже
const photoLinks = [
  { href: '/detail/bermamyt',         label: 'Плато Бермамыт' },
  { href: '/detail/dzhily-su',        label: 'Джилы-Су' },
  { href: '/detail/khurla-kol',       label: 'Озеро Хурла-Кёль' },
  { href: '/detail/dzhily-su-bermamyt', label: 'Джилы-Су и Бермамыт' },
]

const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Экскурсии', href: '/excursions' },
  { label: 'Стоимость', href: '/prices' },
  { label: 'Контакты', href: '/contact' },
]

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collageReady, setCollageReady] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(3)
  const [transitioningTo, setTransitioningTo] = useState<number | null>(null)
  const [stackOrder, setStackOrder] = useState([3, 2, 1, 0])
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number | null>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const activePhotoRef = useRef(3)
  const transitioningRef = useRef(false)
  const transitionTimerRef = useRef<number | null>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const autoplayPausedRef = useRef(false)
  // touch swipe tracking
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const touchMovedRef = useRef(false)

  const advanceTo = useCallback((nextIndex: number) => {
    if (transitioningRef.current || nextIndex === activePhotoRef.current) return

    transitioningRef.current = true
    setTransitioningTo(nextIndex)
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current)

    transitionTimerRef.current = window.setTimeout(() => {
      setStackOrder((currentOrder) => [nextIndex, ...currentOrder.filter((index) => index !== nextIndex)])
      activePhotoRef.current = nextIndex
      setActivePhotoIndex(nextIndex)
      setTransitioningTo(null)
      transitioningRef.current = false
      transitionTimerRef.current = null
    }, 460)
  }, [])

  useEffect(() => {
    const collage = collageRef.current
    if (!collage || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const render = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      collage.style.setProperty('--parallax-x', `${x}px`)
      collage.style.setProperty('--parallax-y', `${y}px`)
      frame = 0
      if (Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05) {
        frame = window.requestAnimationFrame(render)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const bounds = collage.getBoundingClientRect()
      const localX = (event.clientX - bounds.left) / bounds.width - 0.5
      const localY = (event.clientY - bounds.top) / bounds.height - 0.5
      targetX = Math.max(-1, Math.min(1, localX)) * 8
      targetY = Math.max(-1, Math.min(1, localY)) * 7
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const reset = () => {
      targetX = 0
      targetY = 0
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    collage.addEventListener('pointermove', onPointerMove)
    collage.addEventListener('pointerleave', reset)
    return () => {
      collage.removeEventListener('pointermove', onPointerMove)
      collage.removeEventListener('pointerleave', reset)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setCollageReady(true)
      return
    }

    const readyTimer = window.setTimeout(() => setCollageReady(true), 1300)
    const autoplayTimer = window.setInterval(() => {
      if (!autoplayPausedRef.current) advanceTo((activePhotoRef.current + 1) % 4)
    }, 3300)

    return () => {
      window.clearTimeout(readyTimer)
      window.clearInterval(autoplayTimer)
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current)
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    }
  }, [advanceTo])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const getPhotoState = (index: number) => {
    if (transitioningTo !== null) {
      if (index === activePhotoIndex) return 'retreating'
      if (index === transitioningTo) return 'incoming'
    }
    return index === activePhotoIndex ? 'active' : 'background'
  }

  const handlePhotoMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const localX = (event.clientX - bounds.left) / bounds.width - 0.5
    const localY = (event.clientY - bounds.top) / bounds.height - 0.5
    const x = Math.max(-1, Math.min(1, localX))
    const y = Math.max(-1, Math.min(1, localY))

    event.currentTarget.style.setProperty('--photo-hover-x', `${x * 7}px`)
    event.currentTarget.style.setProperty('--photo-hover-y', `${y * 5}px`)
    event.currentTarget.style.setProperty('--photo-hover-rotate', `${x * 0.7}deg`)
  }

  const handlePhotoEnter = (index: number, event: ReactPointerEvent<HTMLImageElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    autoplayPausedRef.current = true
    setHoveredPhotoIndex(index)
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    handlePhotoMove(event)
    if (index !== activePhotoRef.current) advanceTo(index)
  }

  const handlePhotoLeave = (event: ReactPointerEvent<HTMLImageElement>) => {
    setHoveredPhotoIndex(null)
    event.currentTarget.style.setProperty('--photo-hover-x', '0px')
    event.currentTarget.style.setProperty('--photo-hover-y', '0px')
    event.currentTarget.style.setProperty('--photo-hover-rotate', '0deg')
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => {
      autoplayPausedRef.current = false
      resumeTimerRef.current = null
    }, 1900)
  }

  // Touch swipe: left → next photo, right → previous photo
  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX
    touchStartYRef.current = event.touches[0].clientY
    touchMovedRef.current = false
    autoplayPausedRef.current = true
  }

  const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return
    const dx = Math.abs(event.touches[0].clientX - touchStartXRef.current)
    const dy = Math.abs(event.touches[0].clientY - touchStartYRef.current)
    if (dx > 8 || dy > 8) touchMovedRef.current = true
    // prevent page scroll when swiping horizontally
    if (dx > dy && dx > 10) event.preventDefault()
  }

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return
    const dx = event.changedTouches[0].clientX - touchStartXRef.current
    const dy = Math.abs(event.changedTouches[0].clientY - (touchStartYRef.current ?? 0))

    if (touchMovedRef.current && Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      // horizontal swipe
      if (dx < 0) {
        // swipe left → next
        advanceTo((activePhotoRef.current + 1) % 4)
      } else {
        // swipe right → previous
        advanceTo((activePhotoRef.current + 3) % 4)
      }
    }

    touchStartXRef.current = null
    touchStartYRef.current = null
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => {
      autoplayPausedRef.current = false
      resumeTimerRef.current = null
    }, 2500)
  }

  // Tap on photo: navigate to route page
  const handlePhotoClick = (index: number) => {
    if (index !== activePhotoRef.current) {
      advanceTo(index)
      return
    }
    track('hero_photo_click', { slug: photoLinks[index].href })
    window.location.href = photoLinks[index].href
  }

  return (
    <header id="top" className="hero-section">
      <a className="inner-skip" href="#home-main">К содержанию</a>
      <img className="hero-background" src={assets.heroBackground} alt="" width="1672" height="941" />
      <div className="hero-atmosphere" aria-hidden="true" />
      <Container className="hero-container">
        <div className="site-header">
          <a href="/" className="brand-lockup" aria-label="Khasaut Tour - на главную" onClick={closeMenu}>
            <BrandMark />
            <span className="brand-lockup__name">KHASAUT TOUR</span>
          </a>

          <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Основная навигация">
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} className={index === 0 ? 'is-current' : ''} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-contacts" aria-label="Контакты">
            {contacts.links.slice(0, 4).map((contact) => (
              <ContactButton key={contact.label} {...contact} />
            ))}
          </div>

          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="sr-only">{menuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
            <Icon name={menuOpen ? 'close' : 'menu'} size={25} />
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>KHASAUT<br />TOUR</h1>
            <p className="hero-script"><img src={assets.generatedCaucasusScript} alt="" /><span className="sr-only">Северный Кавказ</span></p>
            <div className="hero-intro">
              <div className="hero-rule" aria-hidden="true">
                <span className="hero-rule__arrow">
                  <svg viewBox="0 0 14 18" role="presentation">
                    <path d="m1.5 3.5 5.5 5.5 5.5-5.5" />
                    <path d="m1.5 9 5.5 5.5 5.5-5.5" />
                  </svg>
                </span>
              </div>
              <p className="hero-description">Экскурсии и джип-туры<br className="desktop-only" /> из Кисловодска и КМВ. <br />Выберите маршрут на свой день.</p>
            </div>
            <a className="hero-location" href="/routes">
              <Icon name="location" size={33} />
              <span>Минеральные Воды, Кисловодск,<br />Пятигорск, Ессентуки, Железноводск</span>
            </a>
            <div className="hero-actions">
              <a className="hero-cta" href="#home-price-calculator" onClick={() => track('hero_price_click')}>
              Узнать стоимость <Icon name="arrow" size={16} />
              </a>
              <a className="hero-cta hero-cta--secondary" href="/excursions" onClick={() => track('catalog_open')}>
                Смотреть экскурсии <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>

          <div ref={collageRef} className={`hero-collage ${collageReady ? 'is-ready' : ''}`} aria-label="Фотографии путешествий по Северному Кавказу" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <img className="hero-layer hero-layer--photo hero-layer--elbrus" data-layer="photo-01-elbrus-bermamyt" data-carousel-state={getPhotoState(0)} data-selected={activePhotoIndex === 0} data-hovered={hoveredPhotoIndex === 0} style={{ zIndex: 10 + (3 - stackOrder.indexOf(0)) * 10, cursor: 'pointer' }} onPointerEnter={(event) => handlePhotoEnter(0, event)} onPointerMove={handlePhotoMove} onPointerLeave={handlePhotoLeave} onClick={() => handlePhotoClick(0)} src={assets.photoElbrus} alt={`Перейти: ${photoLinks[0].label}`} width="1122" height="1402" />
            <img className="hero-layer hero-layer--photo hero-layer--arch" data-layer="photo-02-rock-arch-sunset" data-carousel-state={getPhotoState(1)} data-selected={activePhotoIndex === 1} data-hovered={hoveredPhotoIndex === 1} style={{ zIndex: 10 + (3 - stackOrder.indexOf(1)) * 10, cursor: 'pointer' }} onPointerEnter={(event) => handlePhotoEnter(1, event)} onPointerMove={handlePhotoMove} onPointerLeave={handlePhotoLeave} onClick={() => handlePhotoClick(1)} src={assets.photoArch} alt={`Перейти: ${photoLinks[1].label}`} width="1122" height="1402" />
            <img className="hero-layer hero-layer--photo hero-layer--lake" data-layer="photo-03-caucasus-lake" data-carousel-state={getPhotoState(2)} data-selected={activePhotoIndex === 2} data-hovered={hoveredPhotoIndex === 2} style={{ zIndex: 10 + (3 - stackOrder.indexOf(2)) * 10, cursor: 'pointer' }} onPointerEnter={(event) => handlePhotoEnter(2, event)} onPointerMove={handlePhotoMove} onPointerLeave={handlePhotoLeave} onClick={() => handlePhotoClick(2)} src={assets.photoLake} alt={`Перейти: ${photoLinks[2].label}`} width="1122" height="1402" />
            <img className="hero-layer hero-layer--photo hero-layer--jeep" data-layer="photo-04-jeep-elbrus" data-carousel-state={getPhotoState(3)} data-selected={activePhotoIndex === 3} data-hovered={hoveredPhotoIndex === 3} style={{ zIndex: 10 + (3 - stackOrder.indexOf(3)) * 10, cursor: 'pointer' }} onPointerEnter={(event) => handlePhotoEnter(3, event)} onPointerMove={handlePhotoMove} onPointerLeave={handlePhotoLeave} onClick={() => handlePhotoClick(3)} src={assets.photoJeep} alt={`Перейти: ${photoLinks[3].label}`} width="1122" height="1402" />
            <img className="hero-layer hero-layer--tag" data-layer="khasaut-hanging-tag" src={assets.heroTag} alt="Бирка Khasaut Jeep Tour 2022" width="1086" height="1448" />
            <span className="collage-caption collage-caption--top" aria-hidden="true">where the road ends</span>
            <span className="collage-caption collage-caption--bottom" aria-hidden="true">Caucasus / 44°</span>
          </div>
        </div>
      </Container>
      <span className="hero-tear" aria-hidden="true" />
    </header>
  )
}
