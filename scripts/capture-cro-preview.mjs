import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const OUT_DIR = path.resolve('docs/cro-preview')
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

async function run() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  console.log('Navigating to http://127.0.0.1:5173/...')
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })

  // 1. Hero
  const heroActions = page.locator('.hero-actions')
  await heroActions.scrollIntoViewIfNeeded()
  await page.screenshot({ path: path.join(OUT_DIR, '01-hero-cta.png'), clip: { x: 0, y: 0, width: 1440, height: 750 } })

  // 2. Featured Trips cards
  const featured = page.locator('#featured-trips')
  await featured.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT_DIR, '02-featured-trips-cards.png') })

  // 3. Routes section
  const routes = page.locator('#routes')
  await routes.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT_DIR, '03-routes-cards.png') })

  // 4. Calculator ticket
  const calc = page.locator('#home-price-calculator')
  await calc.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(OUT_DIR, '04-calc-ticket.png') })

  // 5. Excursions Catalog
  await page.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT_DIR, '05-catalog-hero-and-cards.png') })

  // 6. Detail page Dzhily-Su
  await page.goto('http://127.0.0.1:5173/detail/dzhily-su', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT_DIR, '06-detail-hero.png'), clip: { x: 0, y: 0, width: 1440, height: 700 } })

  // 7. Detail CTA & Calculator
  const detailCta = page.locator('.trip-cta')
  if (await detailCta.count() > 0) {
    await detailCta.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT_DIR, '07-detail-trip-cta.png') })
  }

  // 8. Mobile Hero check (390px)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:5173/detail/dzhily-su', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT_DIR, '08-detail-mobile-hero.png') })

  console.log('Screenshots saved to:', OUT_DIR)
  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
