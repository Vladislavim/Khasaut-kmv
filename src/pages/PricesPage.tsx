import { pricesMeta } from '../data/pricesMeta'
import { innerContacts } from '../data/innerContacts'
import { InnerPageShell } from '../components/inner/InnerPageShell'
import { BookingTerms, TripRequirements } from '../components/pricing/BookingTerms'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { TripCallToAction } from '../components/ui/TripCallToAction'

export function PricesPage() {
  return (
    <InnerPageShell meta={pricesMeta} className="inner-page--prices" showHero={false}>
      <main id="inner-main" className="inner-main">
        {/* Главная секция прайс-листа */}
        <section id="price-table" className="inner-section prices-sheet-section" aria-labelledby="prices-title">
          <div className="container">
            <div className="prices-sheet-header">
              <Reveal>
                <span className="inner-kicker">Официальный прайс-лист 2026</span>
                <h1 id="prices-title">Таблица стоимости всех маршрутов</h1>
                <p>
                  Фиксированные цены для всех направлений Кавказа и городов КМВ.
                  Стоимость указана за место в мини-группе (до 8 человек) и за индивидуальный внедорожник (1–4 или 5–6 человек).
                </p>
              </Reveal>

              <Reveal delay={80} className="prices-sheet-actions">
                <a
                  className="inner-button inner-button--solid prices-download-btn"
                  href="/khasaut-price-list-2026.pdf"
                  download="khasaut-tour-prices-2026.pdf"
                >
                  <Icon name="download" size={18} /> Скачать прайс-лист (PDF)
                </a>
                <a
                  className="inner-button inner-button--outline prices-whatsapp-btn"
                  href={innerContacts.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> Написать в WhatsApp
                </a>
              </Reveal>
            </div>

            {/* Карточка прайс-листа */}
            <Reveal delay={120} className="prices-sheet-card">
              <a
                href="/khasaut-price-list-2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="prices-sheet-card__link"
                title="Нажмите, чтобы открыть официальный PDF в новой вкладке"
              >
                <img
                  src="/khasaut-price-list-2026.webp"
                  alt="Официальный прайс-лист Khasaut Tour 2026: цены на джип-туры и экскурсии из Кисловодска, Ессентуков, Пятигорска, Железноводска и Минеральных Вод"
                  className="prices-sheet-card__image"
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="prices-sheet-card__zoom-hint">
                  <Icon name="arrow" size={15} /> Открыть официальный PDF в новой вкладке
                </span>
              </a>
            </Reveal>

            {/* Блок скидок и условий из таблицы */}
            <div className="prices-discounts-grid">
              <Reveal delay={140}>
                <div className="prices-discount-card">
                  <span className="prices-discount-card__tag">Детям до 7 лет</span>
                  <h3>Скидка 300 ₽</h3>
                  <p>Для семей с детьми до 7 лет скидка 300 ₽ за каждого ребёнка на место в мини-группе.</p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="prices-discount-card">
                  <span className="prices-discount-card__tag">Группам от 10 чел</span>
                  <h3>Скидка 500 ₽ / чел</h3>
                  <p>При заказе на компанию от 10 человек действует специальная скидка 500 ₽ за каждого гостя.</p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="prices-discount-card">
                  <span className="prices-discount-card__tag">Организаторам</span>
                  <h3>Бесплатный тур</h3>
                  <p>Для больших групп от 18 человек организатор поездки едет полностью бесплатно.</p>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <div className="prices-discount-card">
                  <span className="prices-discount-card__tag">Сервис Khasaut</span>
                  <h3>Трансфер от адреса</h3>
                  <p>Забираем от места проживания и привозим обратно. Автомобиль и темп подбираем под маршрут.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Блок условий перед поездкой */}
        <section className="inner-section inner-detail-practical" aria-labelledby="detail-practical-title">
          <div className="container inner-detail-practical__grid">
            <Reveal>
              <span className="inner-kicker">Перед выездом</span>
              <h2 id="detail-practical-title">Условия бронирования</h2>
              <a className="inner-button inner-button--solid" href={innerContacts.whatsapp.href} target="_blank" rel="noreferrer">
                Обсудить даты в WhatsApp <Icon name="arrow" size={16} />
              </a>
            </Reveal>
            <Reveal className="inner-detail-facts" delay={120}>
              <div className="inner-detail-fact"><span>Выезд</span><strong>Заберём от места проживания.</strong></div>
              <div className="inner-detail-fact"><span>Транспорт</span><strong>Автомобиль подбираем под маршрут.</strong></div>
              <TripRequirements />
              <BookingTerms />
              <a className="inner-detail-fact__phone" href={innerContacts.primaryPhone.href}>
                <Icon name="phone" size={18} />{innerContacts.primaryPhone.label}
              </a>
            </Reveal>
          </div>
        </section>

        <TripCallToAction />
      </main>
    </InnerPageShell>
  )
}
