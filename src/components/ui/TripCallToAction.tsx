import { innerContacts } from '../../data/innerContacts'
import { track } from '../../lib/analytics'

export function TripCallToAction({ route }: { route?: string }) {
  const message = route
    ? `Здравствуйте! Интересует маршрут «${route}». Помогите выбрать дату и формат поездки. Расскажите, пожалуйста, о дороге и дополнительных расходах.`
    : 'Здравствуйте! Помогите выбрать экскурсию из КМВ. Хотим обсудить маршрут, дату и стоимость для нашей компании.'

  const handleFinder = () => {
    const el = document.getElementById('inner-interest-picker')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.dispatchEvent(new CustomEvent('khasaut:open-finder'))
    }
  }

  return (
    <section className="trip-cta" aria-labelledby="trip-cta-title">
      <div>
        <span className="section-kicker">Спланируем вместе</span>
        <h2 id="trip-cta-title">{route ? 'Обсудим вашу поездку?' : 'Горы выбрали. А маршрут?'}</h2>
        <p>
          {route
            ? `Напишите, когда хотите поехать на маршрут «${route}» и сколько вас будет. Обсудим дорогу, остановки и бюджет.`
            : 'Расскажите, что вам интереснее: панорамы, водопады или пешая прогулка. Поможем сузить выбор.'}
        </p>
      </div>
      <div className="trip-cta__actions">
        <a
          href={`${innerContacts.whatsapp.href.split('?')[0]}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          data-booking-link
          onClick={() => track('conversion_cta_click', { source: 'inline', route, action: 'whatsapp' })}
        >
          {route ? 'Забронировать тур в WhatsApp' : 'Подобрать маршрут в WhatsApp'} <span aria-hidden="true">↗</span>
        </a>
        <button type="button" onClick={handleFinder}>
          Подобрать по интересам <span aria-hidden="true">→</span>
        </button>
        <small>Предоплата всего 1 500 ₽ • Остаток гиду в день выезда • Ответим за 5 минут</small>
      </div>
    </section>
  )
}
