import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { TornDivider } from '../ui/TornDivider'

function MountainEtching() {
  return (
    <svg className="about-etching" viewBox="0 0 620 430" role="img" aria-label="Гравюра горного хребта">
      <path d="M0 366 82 280l42 35 93-147 61 101 58-71 84 91 68-59 132 136H0Z" />
      <path d="m69 360 67-83M106 362l73-133M152 359l58-82M224 359l44-104M275 363l71-95M345 364l48-81M402 363l50-81M477 363l46-63" />
      <path d="M0 374h620M0 389h620M0 405h620" />
      <path d="m188 170 29 36 22-37M375 285l16 20 18-21" />
    </svg>
  )
}

export function AboutSection() {
  return (
    <Section id="about" className="about-section" ariaLabel="О нас">
      <Container>
        <div className="about-grid">
          <Reveal className="about-art" delay={60}>
            <TornDivider />
            <h2>О нас</h2>
            <MountainEtching />
          </Reveal>
          <Reveal className="about-copy" delay={130}>
            <p>Мы — команда, влюблённая в Северный Кавказ и своё дело. Уже более 4 лет мы организуем экскурсии, открывая нашим гостям настоящую красоту гор, традиций и культуры региона.</p>
            <p>За это время с нами отправились в путешествие более 5000 довольных клиентов — и для нас это не просто цифра, а доверие, которое мы ценим и оправдываем каждый день.</p>
            <p>Мы не работаем по шаблонам. Каждый маршрут продуман до мелочей: от живописных локаций и комфортного транспорта до атмосферы, в которой вы чувствуете себя спокойно и уверенно.</p>
            <p>С нами вы не просто смотрите — вы проживаете каждое место.</p>
          </Reveal>
          <Reveal className="goal-note" delay={200}>
            <span className="goal-note__eyebrow">Наше дело —</span>
            <p>чтобы вы вернулись не только с фотографиями, но и с эмоциями, которые останутся с вами надолго.</p>
            <svg className="goal-note__sketch" viewBox="0 0 120 180" aria-hidden="true">
              <path d="M22 160c15-42 18-76 21-118M44 125c18-5 30-18 36-36M43 106c-14-4-24-14-28-28M48 76c15-4 24-14 28-27M42 54c-11-4-18-13-20-24" />
              <path d="m76 88 20-28 8 14 8-22 8 38M74 91h42" />
            </svg>
            <span className="goal-note__seal" aria-hidden="true">K</span>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
