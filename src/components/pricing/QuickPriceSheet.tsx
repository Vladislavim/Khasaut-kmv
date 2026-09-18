import { useEffect, useRef, useState } from 'react'
import { getStoredDepartureCity, type PriceRouteKey } from '../../data/prices'
import { track } from '../../lib/analytics'
import { PriceConfigurator, type PriceSelection } from './PriceConfigurator'
import { Icon } from '../ui/Icon'

type QuickPriceSheetProps = {
  routeKey: PriceRouteKey | null
  title?: string
  onClose: () => void
}

export function QuickPriceSheet({ routeKey, title = 'Рассчитать стоимость', onClose }: QuickPriceSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const [selection, setSelection] = useState<PriceSelection | undefined>(() => routeKey ? {
    routeKey,
    city: getStoredDepartureCity(),
    format: 'group',
  } : undefined)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!routeKey) return
    setSelection({ routeKey, city: getStoredDepartureCity(), format: 'group' })
    track('quick_calculator_open', { route: routeKey })
  }, [routeKey])

  useEffect(() => {
    if (!routeKey) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [routeKey])

  if (!routeKey || !selection) return null

  return (
    <div className="quick-price-sheet" role="presentation">
      <button className="quick-price-sheet__backdrop" type="button" aria-label="Закрыть расчёт стоимости" onClick={onClose} />
      <section className="quick-price-sheet__dialog" role="dialog" aria-modal="true" aria-labelledby="quick-price-sheet-title">
        <div className="quick-price-sheet__header">
          <div>
            <span className="section-kicker">Быстрый расчёт</span>
            <h2 id="quick-price-sheet-title">{title}</h2>
          </div>
          <button ref={closeButtonRef} className="quick-price-sheet__close" type="button" onClick={onClose} aria-label="Закрыть расчёт стоимости">
            <Icon name="close" size={20} />
          </button>
        </div>
        <PriceConfigurator
          className="price-configurator--sheet"
          compact
          showHeading={false}
          showRoute={false}
          showAllPricesLink={false}
          titleId="quick-price-configurator-title"
          selection={selection}
          onSelectionChange={setSelection}
        />
      </section>
    </div>
  )
}
