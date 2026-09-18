import { formatRubles, getMinimumGroupPrice, getPriceKeyForRouteSlug, getPriceRoute } from '../../data/prices'

type PriceBadgeProps = {
  priceKey?: string
  variant?: 'card' | 'hero'
}

export function PriceBadge({ priceKey, variant = 'card' }: PriceBadgeProps) {
  const resolvedKey = priceKey ? getPriceRoute(priceKey)?.id ?? getPriceKeyForRouteSlug(priceKey) : undefined
  const route = getPriceRoute(resolvedKey)
  const minimum = getMinimumGroupPrice(resolvedKey)
  const isHero = variant === 'hero'

  return (
    <div className={`price-badge price-badge--${variant}${route && minimum ? '' : ' price-badge--request'}`} aria-label={route && minimum ? `Стоимость от ${formatRubles(minimum)} за человека` : 'Стоимость по запросу'}>
      <span className="price-badge__label">Стоимость</span>
      {route && minimum ? (
        <>
          <strong>от {formatRubles(minimum)}</strong>
          <span className="price-badge__unit">{isHero ? 'за человека' : 'за человека'}</span>
        </>
      ) : (
        <>
          <strong>по запросу</strong>
          <span className="price-badge__unit">уточним формат поездки</span>
        </>
      )}
    </div>
  )
}
