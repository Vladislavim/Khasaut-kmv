import Lenis from 'lenis'

export type LenisScrollToTarget = string | number | HTMLElement

export interface LenisScrollToOptions {
  offset?: number
  immediate?: boolean
  duration?: number
  easing?: (t: number) => number
  lock?: boolean
  force?: boolean
  onComplete?: (lenis: Lenis) => void
}

let lenisInstance: Lenis | null = null
let rafId: number | null = null
let anchorHandlerAttached = false

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  if (lenisInstance) return lenisInstance

  // Honor prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    document.documentElement.classList.remove('lenis')
    return null
  }

  // Ultra-smooth, tuned physics for luxury editorial feel
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.2,
    infinite: false,
    autoRaf: false,
  })

  // Global exposure for debugging and external controls
  const win = window as unknown as { __lenis: Lenis; lenis: Lenis }
  win.__lenis = lenisInstance
  win.lenis = lenisInstance

  // Custom requestAnimationFrame loop
  function raf(time: number) {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // Smooth scroll interception for internal anchor links (#id)
  if (!anchorHandlerAttached) {
    anchorHandlerAttached = true
    document.addEventListener('click', (e: MouseEvent) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (href.startsWith('#') && href.length > 1) {
        const id = href.slice(1)
        let targetEl: HTMLElement | null = null
        try {
          targetEl = document.getElementById(decodeURIComponent(id))
        } catch {
          targetEl = document.getElementById(id)
        }

        if (targetEl) {
          e.preventDefault()
          lenisInstance?.scrollTo(targetEl, {
            offset: -75,
            duration: 1.2,
          })
          try {
            history.pushState(null, '', href)
          } catch {
            // Ignore state errors if any
          }
        }
      }
    })
  }

  return lenisInstance
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function stopLenis() {
  lenisInstance?.stop()
}

export function startLenis() {
  lenisInstance?.start()
}

export function scrollTo(target: LenisScrollToTarget, options?: LenisScrollToOptions) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options)
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' })
    } else if (typeof target === 'string') {
      const el = document.querySelector(target) as HTMLElement | null
      if (el) {
        el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
    }
  }
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
  if (typeof window !== 'undefined') {
    delete (window as unknown as { __lenis?: unknown }).__lenis
    delete (window as unknown as { lenis?: unknown }).lenis
  }
}
