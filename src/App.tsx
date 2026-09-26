import './styles/tokens.css'
import './styles/globals.css'
import './styles/sections.css'
import './styles/inner-pages.css'
import './styles/pricing.css'
import './styles/trip-planner.css'
import './styles/design-polish.css'
import './styles/trip-finder.css'
import { useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { AboutPage, ContactPage, ExcursionsPage, HorseRidesPage, NotFoundPage, RoutesPage, ThermalSpringsPage } from './pages/InnerPages'
import { InnerDetailPage } from './pages/InnerDetailPage'
import { PricesPage } from './pages/PricesPage'
import { detailPages } from './data/innerPages'
import { FloatingMessengerWidget } from './components/ui/FloatingMessengerWidget'

import { trackHit } from './utils/metrika'
import { scrollTo } from './lib/lenis'

function getPathname() {
  const path = (typeof window === 'undefined' ? '/' : window.location.pathname).replace(/\/+$/, '')
  return path || '/'
}

function App({ path }: { path?: string } = {}) {
  const pathname = path ?? getPathname()
  useEffect(() => {
    trackHit()
    if (!window.location.hash) {
      scrollTo(0, { immediate: true })
      return
    }
    const frame = requestAnimationFrame(() => {
      let id = window.location.hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* Keep malformed fragments harmless. */ }
      const el = document.getElementById(id)
      if (el) {
        scrollTo(el, { offset: -70 })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  const renderContent = () => {
    if (pathname === '/' || pathname === '/index.html') return <HomePage />
    if (pathname === '/excursions' || pathname === '/services') return <ExcursionsPage />
    if (pathname === '/routes') return <RoutesPage />
    if (pathname === '/horse-rides') return <HorseRidesPage />
    if (pathname === '/thermal-springs') return <ThermalSpringsPage />
    if (pathname === '/about') return <AboutPage />
    if (pathname === '/contact') return <ContactPage />
    if (pathname === '/prices') return <PricesPage />

    if (pathname.startsWith('/detail/')) {
      const slug = pathname.slice('/detail/'.length)
      const detailPage = detailPages.find((page) => page.slug === slug)
      if (detailPage) return <InnerDetailPage page={detailPage} />
    }

    return <NotFoundPage />
  }

  return (
    <>
      {renderContent()}
      <FloatingMessengerWidget />
    </>
  )
}

export default App
