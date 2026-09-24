import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const OUT_DIR = path.resolve('docs/responsive-audit')
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

async function run() {
  const browser = await chromium.launch()

  // 1. Mobile 390x844 (iPhone 12/13/14)
  console.log('--- Testing Mobile 390x844 ---')
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })

  await mobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-01-home-hero.png'), clip: { x: 0, y: 0, width: 390, height: 750 } })

  const featured = mobile.locator('#featured-trips')
  await featured.scrollIntoViewIfNeeded()
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-02-featured.png') })

  const routes = mobile.locator('#routes')
  await routes.scrollIntoViewIfNeeded()
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-03-routes.png') })

  const calc = mobile.locator('#home-price-calculator')
  await calc.scrollIntoViewIfNeeded()
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-04-calc.png') })

  const about = mobile.locator('#about')
  if (await about.count() > 0) {
    await about.scrollIntoViewIfNeeded()
    await mobile.waitForTimeout(400)
    await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-05-about.png') })
  }

  const faq = mobile.locator('.home-faq-section')
  if (await faq.count() > 0) {
    await faq.scrollIntoViewIfNeeded()
    await mobile.waitForTimeout(400)
    await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-06-faq.png') })
  }

  // Excursions Catalog
  await mobile.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-07-catalog.png'), clip: { x: 0, y: 0, width: 390, height: 750 } })

  // Detail page
  await mobile.goto('http://127.0.0.1:5173/detail/dzhily-su', { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-08-detail-hero.png'), clip: { x: 0, y: 0, width: 390, height: 800 } })

  // Prices page
  await mobile.goto('http://127.0.0.1:5173/prices', { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-09-prices.png'), clip: { x: 0, y: 0, width: 390, height: 800 } })

  // Contacts page
  await mobile.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(400)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-10-contacts.png'), clip: { x: 0, y: 0, width: 390, height: 800 } })

  await mobile.close()

  // 2. Tablet Portrait 768x1024 (iPad)
  console.log('--- Testing Tablet 768x1024 ---')
  const tablet768 = await browser.newPage({ viewport: { width: 768, height: 1024 } })
  await tablet768.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await tablet768.waitForTimeout(400)
  await tablet768.screenshot({ path: path.join(OUT_DIR, 'tablet768-01-home-hero.png'), clip: { x: 0, y: 0, width: 768, height: 850 } })

  const tabletCalc = tablet768.locator('#home-price-calculator')
  await tabletCalc.scrollIntoViewIfNeeded()
  await tablet768.waitForTimeout(400)
  await tablet768.screenshot({ path: path.join(OUT_DIR, 'tablet768-02-calc.png') })

  await tablet768.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await tablet768.waitForTimeout(400)
  await tablet768.screenshot({ path: path.join(OUT_DIR, 'tablet768-03-catalog.png'), clip: { x: 0, y: 0, width: 768, height: 800 } })

  await tablet768.goto('http://127.0.0.1:5173/detail/dzhily-su', { waitUntil: 'networkidle' })
  await tablet768.waitForTimeout(400)
  await tablet768.screenshot({ path: path.join(OUT_DIR, 'tablet768-04-detail.png'), clip: { x: 0, y: 0, width: 768, height: 800 } })

  await tablet768.close()

  // 3. Tablet Landscape 1024x768 (iPad)
  console.log('--- Testing Tablet 1024x768 ---')
  const tablet1024 = await browser.newPage({ viewport: { width: 1024, height: 768 } })
  await tablet1024.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await tablet1024.waitForTimeout(400)
  await tablet1024.screenshot({ path: path.join(OUT_DIR, 'tablet1024-01-home-hero.png'), clip: { x: 0, y: 0, width: 1024, height: 750 } })

  await tablet1024.goto('http://127.0.0.1:5173/detail/dzhily-su', { waitUntil: 'networkidle' })
  await tablet1024.waitForTimeout(400)
  await tablet1024.screenshot({ path: path.join(OUT_DIR, 'tablet1024-02-detail.png'), clip: { x: 0, y: 0, width: 1024, height: 750 } })

  await tablet1024.close()

  console.log('All responsive audit screenshots successfully captured in:', OUT_DIR)
  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
