export type AnalyticsEvent =
  | 'hero_price_click'
  | 'hero_photo_click'
  | 'catalog_open'
  | 'quick_calculator_open'
  | 'price_selection_change'
  | 'booking_click'
  | 'route_detail_open'
  | 'contact_click'
  | 'trip_finder_open'
  | 'trip_finder_select'
  | 'estimate_copy'
  | 'conversion_prompt_open'
  | 'conversion_prompt_dismiss'
  | 'conversion_cta_click'

export function track(event: AnalyticsEvent, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent('khasaut:analytics', {
    detail: { event, properties },
  }))
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] }
  analyticsWindow.dataLayer ??= []
  analyticsWindow.dataLayer.push({ event: `khasaut_${event}`, ...properties })
}
