import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { BrandMark } from '../ui/BrandMark'
import { Icon } from '../ui/Icon'
import { DevCreditBadge } from '../common/DevCreditBadge'
import { assets } from '../../data/assets'
import { innerContacts } from '../../data/innerContacts'

const routeLinks = [
  { label: 'Экскурсии и джип-туры', href: '/excursions' },
  { label: 'Необычные маршруты', href: '/routes' },
  { label: 'Конные прогулки', href: '/horse-rides' },
  { label: 'Термальные источники', href: '/thermal-springs' },
] as const

const infoLinks = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Стоимость и цены', href: '/prices' },
  { label: 'Контакты', href: '/contact' },
] as const

export function FooterSection() {
  return (
    <Section id="contact" className="footer-section" ariaLabel="Контакты и информация">
      <div className="footer-ridge-backdrop" aria-hidden="true">
        <img
          src={assets.footerRidge}
          alt=""
          loading="lazy"
          decoding="async"
          width="2172"
          height="724"
        />
      </div>

      <Container>
        <div className="footer-grid">
          {/* Col 1: Brand & Identity */}
          <div className="footer-col footer-col--brand">
            <a href="/" className="footer-brand-header" aria-label="KHASAUT TOUR — на главную">
              <BrandMark compact />
              <div className="footer-brand-title">
                <span className="footer-brand-name">KHASAUT TOUR</span>
                <span className="footer-brand-subtitle">Кавказ, который остаётся с вами</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              Индивидуальные и групповые джип-туры, авторские маршруты и конные прогулки из Кисловодска и городов КМВ.
            </p>
            <div className="footer-brand-cities">
              <Icon name="location" size={15} />
              <span>Кисловодск · Пятигорск · Ессентуки · Железноводск</span>
            </div>
          </div>

          {/* Col 2: Routes */}
          <div className="footer-col footer-col--nav">
            <h3 className="footer-col-title">Маршруты</h3>
            <ul className="footer-links-list">
              {routeLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-nav-link">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="footer-col footer-col--nav">
            <h3 className="footer-col-title">Информация</h3>
            <ul className="footer-links-list">
              {infoLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-nav-link">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="footer-col footer-col--contacts">
            <h3 className="footer-col-title">Связь с гидом</h3>

            <div className="footer-phone-list">
              <a href={innerContacts.primaryPhone.href} className="footer-phone-item">
                <Icon name="phone" size={16} />
                <span className="footer-phone-number">{innerContacts.primaryPhone.label}</span>
                <span className="footer-phone-tag">Эльдар</span>
              </a>
              <a href={innerContacts.secondaryPhone.href} className="footer-phone-item">
                <Icon name="phone" size={16} />
                <span className="footer-phone-number">{innerContacts.secondaryPhone.label}</span>
              </a>
            </div>

            <a href={innerContacts.email.href} className="footer-email-link">
              <Icon name="mail" size={16} />
              <span>{innerContacts.email.label}</span>
            </a>

            <div className="footer-actions">
              <a
                href={innerContacts.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-btn"
              >
                <Icon name="whatsapp" size={16} />
                <span>Написать в WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/khasaut_jeep_tours/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-insta-btn"
                aria-label="Instagram Эльдара"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Full-width bottom bar */}
        <div className="footer-bottom-bar">
          <span className="footer-bottom-copy">© {new Date().getFullYear()} Khasaut Tour. Все права защищены.</span>
          <DevCreditBadge />
          <span className="footer-bottom-tagline">Путешествия и джип-туры по Северному Кавказу</span>
        </div>
      </Container>
    </Section>
  )
}
