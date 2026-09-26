import { useMemo } from 'react'
import { homeFaqItems, type FaqItem } from '../../data/homeFaqData'
import { assets } from '../../data/assets'
import { ParallaxPattern } from '../ui/ParallaxPattern'

type HomeFaqSectionProps = {
  kicker?: string
  title?: string
  subtitle?: string
  items?: FaqItem[]
  idPrefix?: string
}

export function HomeFaqSection({
  kicker = 'Частые вопросы перед поездкой',
  title = 'Всё, что важно знать о джиппинге в Кисловодске',
  subtitle = 'Честно и подробно рассказываем об автопарке внедорожников, ценах 2026, безопасности, трансфере и подготовке к поездке в горы.',
  items = homeFaqItems,
  idPrefix = 'home-faq',
}: HomeFaqSectionProps) {
  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }), [items])

  return (
    <section className="home-faq-section inner-section" aria-labelledby={`${idPrefix}-heading`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ParallaxPattern
        className="home-faq-pattern-left section-pattern--campfire"
        src={assets.patterns.campfire}
        rotate={-6}
        distance={35}
      />
      <ParallaxPattern
        className="home-faq-pattern-right section-pattern--compass"
        src={assets.patterns.compass}
        rotate={10}
        distance={-45}
      />
      <div className="container">
        <header className="home-faq-section__header">
          <span className="inner-kicker">{kicker}</span>
          <h2 id={`${idPrefix}-heading`} className="home-faq-section__title">
            {title}
          </h2>
          <p className="home-faq-section__subtitle">
            {subtitle}
          </p>
        </header>

        <div className="home-faq-accordion" role="region" aria-label="Вопросы и ответы о джип-турах по Кавказу">
          {items.map((item, index) => (
            <details key={item.question} className="home-faq-item" open={index === 0}>
              <summary className="home-faq-question">
                <span className="home-faq-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="home-faq-text">{item.question}</span>
                <span className="home-faq-icon" aria-hidden="true" />
              </summary>
              <div className="home-faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

