import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { Icon } from '../ui/Icon'
import { assets } from '../../data/assets'
import { contacts } from '../../data/contacts'

const footerNavItems = [
  { label: 'Главная', href: '/' },
  { label: 'Экскурсии', href: '/excursions' },
  { label: 'Необычные маршруты', href: '/routes' },
  { label: 'Конные', href: '/horse-rides' },
  { label: 'Термальные', href: '/thermal-springs' },
] as const

export function FooterSection() {
  return (
    <Section id="contact" className="footer-section" ariaLabel="Контакты">
      <img
        className="footer-mountain"
        src={assets.footerMountain}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="2172"
        height="724"
      />
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <BrandMark compact />
            <p>Кавказ, который остаётся с вами.</p>
          </div>
          <div className="footer-contacts">
            <p className="section-kicker">будем на связи</p>
            <a className="footer-email" href={contacts.email.href}><Icon name="mail" size={22} />{contacts.email.value}</a>
            <div className="footer-socials">
              {contacts.footerLinks.map((contact) => <ContactButton key={contact.label} {...contact} />)}
            </div>
          </div>
          <nav className="footer-nav" aria-label="Навигация в подвале">
            {footerNavItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2022 Khasaut Tour</span>
          <span>Путешествия по Северному Кавказу</span>
        </div>
      </Container>
    </Section>
  )
}
