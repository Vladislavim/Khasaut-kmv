import { bookingRules, tripRules } from '../../data/bookingRules'
import { formatRubles } from '../../data/prices'

export function BookingSummary() {
  return (
    <div className="booking-summary" aria-label="Условия оплаты">
      <span>Предоплата - {formatRubles(bookingRules.prepaymentPerPerson)} с человека.</span>
      <span>Остальная сумма - после поездки.</span>
    </div>
  )
}

export function BookingTerms() {
  return (
    <details className="booking-terms">
      <summary>Условия бронирования <span aria-hidden="true">+</span></summary>
      <p>
        При отмене не позднее чем за {bookingRules.cancellationRefundHours} часов предоплата возвращается.
        При более поздней отмене предоплата не возвращается.
        {bookingRules.organizerCancellationRefund ? ' Если поездка не состоялась по нашей вине, деньги возвращаются полностью.' : ''}
      </p>
    </details>
  )
}

export function TripRequirements() {
  return (
    <div className="trip-requirements" aria-labelledby="trip-requirements-title">
      <span id="trip-requirements-title">Важно перед поездкой</span>
      <ul>
        {!tripRules.alcoholAllowed && <li>Во время поездки алкоголь запрещён.</li>}
        {!tripRules.petsAllowed && <li>С животными не принимаем.</li>}
        {tripRules.healthIssuesMustBeReported && <li>О проблемах со здоровьем сообщите заранее.</li>}
      </ul>
    </div>
  )
}
