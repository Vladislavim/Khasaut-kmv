import { homeFaqItems } from '../../data/homeFaqData'

export function HomeFaqSection() {
  return (
    <section className="home-faq-section inner-section" aria-labelledby="home-faq-heading">
      <div className="container">
        <header className="home-faq-section__header">
          <span className="inner-kicker">Частые вопросы перед поездкой</span>
          <h2 id="home-faq-heading" className="home-faq-section__title">
            Всё, что важно знать о джиппинге в Кисловодске
          </h2>
          <p className="home-faq-section__subtitle">
            Честно и подробно рассказываем об автопарке внедорожников, ценах 2026, безопасности, трансфере и подготовке к поездке в горы.
          </p>
        </header>

        <div className="home-faq-accordion" role="region" aria-label="Вопросы и ответы о джип-турах по Кавказу">
          {homeFaqItems.map((item, index) => (
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
