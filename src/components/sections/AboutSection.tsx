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
            <h2>Горы, какими их знаем мы</h2>
            <p>Мы — команда коренных горных гидов во главе с Эльдаром. Уже более 4 лет возим гостей по тайным тропам Кавказа, куда не проедет ни один экскурсионный автобус.</p>
            <p>Рамные внедорожники, трансфер от дверей вашего отеля и неспешный темп без суеты. До поездки честно расскажем про дорогу, пешие участки и погоду, а бронь зафиксируем по минимальной предоплате.</p>
            <a className="about-more" href="/about">О команде и поездках <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
