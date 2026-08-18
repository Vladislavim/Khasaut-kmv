import { useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { Icon } from '../ui/Icon'
import { assets } from '../../data/assets'
import { contacts } from '../../data/contacts'

const navItems = [
  { label: 'Главная', href: '#top' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contact' },
]

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const collageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const collage = collageRef.current
    if (!collage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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

  const closeMenu = () => setMenuOpen(false)

  return (
    <header id="top" className="hero-section">
      <img className="hero-background" src={assets.heroBackground} alt="" width="1672" height="941" />
      <div className="hero-atmosphere" aria-hidden="true" />
      <Container className="hero-container">
        <div className="site-header">
          <a href="#top" className="brand-lockup" aria-label="Khasaut Tour — на главную" onClick={closeMenu}>
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
            <p className="hero-kicker">Travel journal / 2022</p>
            <h1>KHASAUT<br />TOUR</h1>
            <p className="hero-script">Северный Кавказ</p>
            <p className="hero-description">Путешествуйте с командой,<br className="desktop-only" /> влюблённой в горы, традиции<br className="desktop-only" /> и настоящие эмоции.</p>
            <div className="hero-rule" aria-hidden="true" />
            <a className="hero-location" href="#routes">
              <Icon name="location" size={33} />
              <span>Минеральные Воды, Кисловодск,<br />Пятигорск, Ессентуки, Железноводск</span>
            </a>
            <a className="hero-cta" href="#services">
              <span>Смотреть маршруты</span>
              <Icon name="arrow" size={22} />
            </a>
          </div>

          <div ref={collageRef} className="hero-collage" aria-label="Фотографии путешествий по Северному Кавказу">
            <img className="hero-layer hero-layer--elbrus" data-layer="photo-01-elbrus-bermamyt" src={assets.photoElbrus} alt="Горный хребет Бермамыт на закате" width="1122" height="1402" />
            <img className="hero-layer hero-layer--arch" data-layer="photo-02-rock-arch-sunset" src={assets.photoArch} alt="Каменная арка над долиной на закате" width="1122" height="1402" />
            <img className="hero-layer hero-layer--lake" data-layer="photo-03-caucasus-lake" src={assets.photoLake} alt="Горное озеро среди осенних склонов" width="1122" height="1402" />
            <img className="hero-layer hero-layer--jeep" data-layer="photo-04-jeep-elbrus" src={assets.photoJeep} alt="Джип на горной дороге у озера" width="1122" height="1402" />
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
