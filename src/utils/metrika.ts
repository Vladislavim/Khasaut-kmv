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
        reachGoal('whatsapp_click')
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
