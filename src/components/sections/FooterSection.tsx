import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { BrandMark } from '../ui/BrandMark'
import { ContactButton } from '../ui/ContactButton'
import { Icon } from '../ui/Icon'
import { assets } from '../../data/assets'
import { contacts } from '../../data/contacts'

export function FooterSection() {
  return (
    <Section id="contact" className="footer-section" ariaLabel="Контакты">
      <div className="footer-ridge-wrap" aria-hidden="true">
        <img src={assets.footerRidge} alt="" loading="lazy" width="2172" height="724" />
      </div>
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
              {contacts.links.map((contact) => <ContactButton key={contact.label} {...contact} />)}
            </div>
          </div>
          <nav className="footer-nav" aria-label="Навигация в подвале">
            <a href="#top">Главная</a>
            <a href="#services">Услуги</a>
            <a href="#routes">Маршруты</a>
            <a href="#about">О нас</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2022 Khasaut Tour</span>
          <span>Ссылки на контакты можно заменить в <code>src/data/contacts.ts</code></span>
        </div>
      </Container>
    </Section>
  )
}
