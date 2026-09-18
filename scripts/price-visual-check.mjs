import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5173'
const outputDir = resolve('artifacts/visual-check/prices')
mkdirSync(outputDir, { recursive: true })

const viewports = {
  desktop: { width: 1440, height: 1000 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
}

const browser = await chromium.launch({ headless: true })
const results = []

for (const [viewportName, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' })
  const consoleErrors = []
  const pageErrors = []
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const route of ['/', '/prices', '/excursions', '/detail/dzhily-su-bermamyt']) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(120)
    await page.evaluate(() => window.scrollTo(0, 0))

    const measurements = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      priceTextCount: document.body.innerText.match(/₽/g)?.length ?? 0,
      pricePanels: document.querySelectorAll('.price-route-panel').length,
      priceConfigurators: document.querySelectorAll('.price-configurator').length,
      detailPrice: document.querySelectorAll('.detail-price-panel').length,
    }))

    if (route === '/') {
      const heroCta = page.locator('.hero-cta').first()
      const catalogCta = page.locator('.hero-cta').nth(1)
      measurements.heroCtaText = await heroCta.innerText()
      measurements.heroCtaHref = await heroCta.getAttribute('href')
      measurements.catalogCtaText = await catalogCta.innerText()
      measurements.catalogCtaHref = await catalogCta.getAttribute('href')
      await heroCta.click()
      await page.waitForTimeout(80)
      measurements.heroCtaHash = await page.evaluate(() => window.location.hash)
      measurements.calculatorInViewport = await page.locator('#home-price-calculator').evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return rect.bottom > 0 && rect.top < window.innerHeight
      })
      await page.evaluate(() => {
        window.history.replaceState(null, '', window.location.pathname)
        window.scrollTo(0, 0)
      })
    }

    if (route === '/prices') {
      const routeSelect = page.locator('select[name="price-route-filter"]')
      await routeSelect.selectOption('suvorovskie')
      await page.getByRole('button', { name: 'Минеральные Воды' }).click()
      await page.locator('.price-configurator [data-format-option="private1to4"]').click()
      await page.waitForTimeout(50)
      measurements.filteredRoute = await routeSelect.inputValue()
      measurements.filteredCity = await page.getByRole('button', { name: 'Минеральные Воды' }).getAttribute('aria-pressed')
      measurements.calculatorResult = await page.locator('.price-configurator__result').innerText()
      measurements.inclusions = await page.locator('.price-inclusions').count()
      await page.locator('.price-configurator').screenshot({ path: resolve(outputDir, `${viewportName}-prices-calculator.png`) })
      await page.locator('.price-list-section').screenshot({ path: resolve(outputDir, `${viewportName}-prices-list.png`) })
    }

    if (route === '/excursions') {
      const quickButton = page.getByRole('button', { name: /Рассчитать стоимость/ }).first()
      if (await quickButton.count()) {
        await quickButton.click()
        measurements.quickSheet = await page.locator('[role="dialog"]').count()
        measurements.quickSheetBooking = await page.locator('[role="dialog"] [data-booking-link]').count()
        await page.locator('.quick-price-sheet__close').click()
      }
    }

    if (['/', '/prices', '/detail/dzhily-su-bermamyt'].includes(route)) {
      const bookingLink = page.locator('[data-booking-link]').first()
      const bookingHref = await bookingLink.getAttribute('href')
      const bookingTarget = await bookingLink.getAttribute('target')
      const bookingUrl = new URL(bookingHref, baseUrl)
      const bookingMessage = bookingUrl.searchParams.get('text') ?? ''
      measurements.bookingHref = bookingHref
      measurements.bookingTarget = bookingTarget
      measurements.bookingMessage = bookingMessage
      if (bookingTarget !== '_blank' || !bookingUrl.hostname.endsWith('wa.me') || !bookingMessage.includes('Маршрут:') || !bookingMessage.includes('Город отправления:') || !bookingMessage.includes('Формат:')) {
        throw new Error(`Booking link is incomplete on ${route}`)
      }
    }

    const routeSlug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
    await page.screenshot({ path: resolve(outputDir, `${viewportName}-${routeSlug}.png`), fullPage: true })
    results.push({ viewport: viewportName, route, measurements, consoleErrors: [...consoleErrors], pageErrors: [...pageErrors] })
  }
  await page.close()
}

await browser.close()
console.log(JSON.stringify({ results }, null, 2))
