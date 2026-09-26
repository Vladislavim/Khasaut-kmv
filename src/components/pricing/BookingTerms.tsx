import { bookingRules, tripRules } from '../../data/bookingRules'

export function BookingSummary() {
  return (
    <div className="booking-summary" aria-label="Условия оплаты">
      <span>Предоплата всего {bookingRules.prepaymentPerPerson.toLocaleString('ru-RU')} ₽ за бронь места или машины. Остаток — водителю в день поездки перед стартом.</span>
    </div>
  )
}

export function BookingTerms() {
  return (
    <details className="booking-terms">
      <summary>Условия бронирования и отмены <span aria-hidden="true">+</span></summary>
      <div className="booking-terms__content">
        <p>
          <strong>Предоплата:</strong> всего {bookingRules.prepaymentPerPerson.toLocaleString('ru-RU')} ₽ для гарантированной фиксации даты и мест за вами.
        </p>
        <p>
          <strong>Бесплатный перенос:</strong> если в горах штормовой туман или непогода, мы бесплатно перенесём выезд на удобную свободную дату либо предложим солнечное альтернативное ущелье без потери брони.
        </p>
        <p>
          <strong>Отмена:</strong> при отмене не позднее чем за {bookingRules.cancellationRefundHours} часов предоплата возвращается полностью. При отмене по нашей вине — моментальный возврат 100%.
        </p>
      </div>
    </details>
  )
}

export function TripRequirements() {
  return (
    <div className="trip-requirements" aria-labelledby="trip-requirements-title">
      <span id="trip-requirements-title">Что важно знать перед выездом</span>
      <ul>
        <li><strong>Паспорт РФ:</strong> оригинал обязателен для каждого взрослого (проверка документов на контрольных постах в ущельях).</li>
        <li><strong>Наличные рубли:</strong> в горах терминалы и связь часто не работают; наличные понадобятся для обеда в кафе и экосборов.</li>
        <li><strong>Одежда слоями и обувь:</strong> удобные кроссовки на нескользкой подошве, ветровка или кофта (на высоте на 8–12 °C прохладнее).</li>
        <li><strong>Укачивание:</strong> если вас укачивает на горных серпантинах, скажите гиду — посадим на переднее сиденье и поедем плавно.</li>
        {!tripRules.alcoholAllowed && <li>Во время поездки запрещено распитие крепкого алкоголя; с домашними животными в общие группы не принимаем.</li>}
      </ul>
    </div>
  )
}

