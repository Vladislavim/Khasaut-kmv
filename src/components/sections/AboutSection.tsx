import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { assets } from '../../data/assets'

export function AboutSection() {
  return (
    <Section id="about" className="about-section about-section--refined" ariaLabel="О нас">
      <Container>
        <div className="about-grid">
          <Reveal className="about-art" delay={60}>
            <img className="about-etching" src={assets.attachedAboutMountain} alt="" loading="lazy" width="1536" height="1024" />
          </Reveal>
          <Reveal className="about-copy" delay={130}>
            <span className="section-kicker">Команда Khasaut Tour</span>
            <h2>Познакомим с Кавказом</h2>
            <p>Мы организуем поездки по Северному Кавказу уже 4 года и открываем гостям красоту гор, традиций и культуры региона.</p>
            <p>До поездки обсудим дорогу, пешие участки, формат и дополнительные расходы. Дату и места подтверждаем лично.</p>
            <a className="about-more" href="/about/">О команде и поездках <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
