import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Icon, type IconName } from '../ui/Icon'
import { values } from '../../data/values'

export function ValuesSection() {
  return (
    <Section id="values" className="values-section" ariaLabel="Наши ценности">
      <Container>
        <div className="values-heading">
          <span className="values-heading__line" aria-hidden="true" />
          <h2>Мы выбираем</h2>
          <span className="values-heading__line" aria-hidden="true" />
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 75} className="value-item">
              <Icon name={value.icon as IconName} size={52} />
              <p>{value.title}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
