const METRIKA_ID = 112941764

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: any[]) => void
  }
}

/**
 * Отправка достижения цели в Яндекс Метрику
 */
export function reachGoal(target: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', target, params)
    }
  } catch (err) {
    console.warn('[Metrika] reachGoal failed:', target, err)
  }
}

/**
 * Отправка хита (просмотра страницы) в SPA
 */
export function trackHit(url?: string) {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'hit', url || window.location.href)
    }
  } catch (err) {
    console.warn('[Metrika] trackHit failed:', err)
  }
}

export function getAttributionSource(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return sessionStorage.getItem('khasaut_utm_source') || null
  } catch {
    return null
  }
}

let initialized = false

/**
 * Глобальный перехватчик кликов по ключевым конверсионным элементам:
 * - Звонки (tel:)
 * - WhatsApp (wa.me)
 * - Telegram (t.me)
 * - Скачивание прайс-листов (.pdf)
 * - Кнопки бронирования и подбора тура
 * - Кнопки калькулятора
 */
export function initMetrikaTracking() {
  if (typeof window === 'undefined' || initialized) return
  initialized = true

  // 0. Отслеживание перехода по QR-коду из брошюры/буклета
  try {
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source')
    const utmCampaign = params.get('utm_campaign')
    const utmMedium = params.get('utm_medium')

    if (utmSource) {
      sessionStorage.setItem('khasaut_utm_source', utmSource)
      if (utmSource === 'brochure' || utmSource === 'booklet') {
        reachGoal('brochure_qr_scan', {
          utm_source: utmSource,
          utm_campaign: utmCampaign || 'kmv_hotels_2026',
          utm_medium: utmMedium || 'print',
        })
      }
    }
  } catch {
    // sessionStorage might be restricted in private browsing
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null
    if (!target) return

    // 1. Явно указанные цели через data-атрибут
    const goalEl = target.closest<HTMLElement>('[data-metrika-goal]')
    if (goalEl) {
      const goal = goalEl.dataset.metrikaGoal
      if (goal) {
        reachGoal(goal)
      }
    }

    // 2. Ссылки
    const link = target.closest<HTMLAnchorElement>('a')
    if (link) {
      const href = (link.getAttribute('href') || '').trim()

      if (href.startsWith('tel:')) {
        reachGoal('phone_click')
        return
      }

      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const source = getAttributionSource()
        reachGoal('whatsapp_click', source ? { source } : undefined)
        return
      }

      if (href.includes('t.me') || href.includes('telegram.me')) {
        reachGoal('telegram_click')
        return
      }

      if (href.endsWith('.pdf') || href.includes('price-list') || href.includes('khasaut-price-list')) {
        reachGoal('price_pdf_download')
        return
      }
    }

    // 3. Кнопки и CTA
    const button = target.closest<HTMLElement>('button, a, .inner-button, .cta-button')
    if (button) {
      const text = (button.textContent || '').toLowerCase().trim()

      if (
        text.includes('забронировать') ||
        text.includes('выбрать маршрут') ||
        text.includes('обсудить поездку') ||
        text.includes('подобрать маршрут') ||
        text.includes('заказать тур') ||
        text.includes('забронируйте')
      ) {
        reachGoal('booking_click')
        return
      }

      if (
        text.includes('рассчитать') ||
        text.includes('отправить расчет') ||
        text.includes('отправить заявку')
      ) {
        reachGoal('calc_submit')
        return
      }
    }
  }, { passive: true })
}
