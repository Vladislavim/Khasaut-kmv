import type { RoutePracticalInfo } from '../../data/routeItineraries'
import { Icon } from '../ui/Icon'

type RoutePracticalSectionProps = {
  practical?: RoutePracticalInfo
  routeTitle?: string
}

export function RoutePracticalSection({ practical }: RoutePracticalSectionProps) {
  if (!practical) {
    return null
  }

  return (
    <section className="inner-section route-practical" aria-labelledby="route-practical-title">
      <div className="container">
        <div className="route-practical__header">
          <span className="inner-kicker">Важно знать перед выездом</span>
          <h2 id="route-practical-title" className="route-practical__title">
            Детали и организация поездки
          </h2>
          <p className="route-practical__intro">
            Всё прозрачно: точное время выезда, что включено в стоимость, возможные дополнительные расходы и что взять с собой в горы.
          </p>
        </div>

        {/* 1. Quick Info Chips Grid */}
        <div className="route-practical__chips-grid">
          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="location" size={18} />
            </span>
            <div>
              <strong>Выезд</strong>
              <span>{practical.departureTime} от вашего адреса на КМВ</span>
            </div>
          </div>

          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="flag" size={18} />
            </span>
            <div>
              <strong>Возвращение</strong>
              <span>{practical.returnTime} (обратно к порогу)</span>
            </div>
          </div>

          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="hourglass" size={18} />
            </span>
            <div>
              <strong>Длительность</strong>
              <span>{practical.duration}</span>
            </div>
          </div>

          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="mountain" size={18} />
            </span>
            <div>
              <strong>Сложность</strong>
              <span>{practical.difficulty}</span>
            </div>
          </div>

          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="users" size={18} />
            </span>
            <div>
              <strong>Группа</strong>
              <span>{practical.groupSize}</span>
            </div>
          </div>

          <div className="route-practical__chip">
            <span className="route-practical__chip-icon" aria-hidden="true">
              <Icon name="jeep" size={18} />
            </span>
            <div>
              <strong>Транспорт</strong>
              <span>{practical.transport}</span>
            </div>
          </div>
        </div>

        {/* 2. Inclusions vs Extra Costs 2-column card */}
        <div className="route-practical__costs-grid">
          {/* Included */}
          <div className="route-practical__card route-practical__card--included">
            <div className="route-practical__card-header">
              <span className="route-practical__card-badge route-practical__card-badge--green">
                <Icon name="check" size={13} /> Включено
              </span>
              <h3>В стоимость входит</h3>
            </div>
            <ul className="route-practical__list">
              {practical.included.map((item) => (
                <li key={item}>
                  <span className="route-practical__bullet" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Costs */}
          <div className="route-practical__card route-practical__card--extra">
            <div className="route-practical__card-header">
              <span className="route-practical__card-badge route-practical__card-badge--amber">+ Оплачивается отдельно</span>
              <h3>Дополнительные расходы</h3>
            </div>
            {practical.extraCosts && practical.extraCosts.length > 0 ? (
              <ul className="route-practical__list route-practical__list--extra">
                {practical.extraCosts.map((cost) => (
                  <li key={cost.title}>
                    <div className="route-practical__extra-head">
                      <strong>{cost.title}</strong>
                      {cost.amount && <span className="route-practical__extra-price">{cost.amount}</span>}
                    </div>
                    {cost.note && <p className="route-practical__extra-note">{cost.note}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="route-practical__empty-extra">
                В этом маршруте нет обязательных доплат — все основные локации и проезды уже включены. Питание в кафе оплачивается по меню по вашему выбору.
              </p>
            )}
          </div>
        </div>

        {/* 3. What to Bring & Rules */}
        <div className="route-practical__advice-grid">
          {/* To Bring */}
          <div className="route-practical__advice-card">
            <div className="route-practical__advice-header">
              <span className="route-practical__advice-icon" aria-hidden="true">
                <Icon name="backpack" size={20} />
              </span>
              <h4>Что взять с собой в поездку</h4>
            </div>
            <ul className="route-practical__checklist">
              {practical.toBring.map((item) => (
                <li key={item}>
                  <span className="route-practical__check-icon" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rules and Safety */}
          {practical.rules && practical.rules.length > 0 && (
            <div className="route-practical__advice-card">
              <div className="route-practical__advice-header">
                <span className="route-practical__advice-icon" aria-hidden="true">
                  <Icon name="shield" size={20} />
                </span>
                <h4>Правила и безопасность</h4>
              </div>
              <ul className="route-practical__rules-list">
                {practical.rules.map((rule) => (
                  <li key={rule}>
                    <span className="route-practical__rule-dot" aria-hidden="true">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
