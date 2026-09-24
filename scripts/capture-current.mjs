import { chromium } from 'playwright'

async function run() {
  const browser = await chromium.launch()
  
  // Desktop
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await pageDesktop.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await pageDesktop.screenshot({ path: 'audit/current-excursions-desktop.png', fullPage: false })
  
  const catalogEl = pageDesktop.locator('.inner-section--catalog')
  if (await catalogEl.count() > 0) {
    await catalogEl.screenshot({ path: 'audit/current-excursions-section-desktop.png' })
  }

  await pageDesktop.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  const featuredEl = pageDesktop.locator('.featured-trips-section')
  if (await featuredEl.count() > 0) {
    await featuredEl.screenshot({ path: 'audit/current-featured-section-desktop.png' })
  }

  // Mobile
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await pageMobile.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await pageMobile.screenshot({ path: 'audit/current-excursions-mobile.png', fullPage: false })
  
  const catalogMobileEl = pageMobile.locator('.inner-section--catalog')
  if (await catalogMobileEl.count() > 0) {
    await catalogMobileEl.screenshot({ path: 'audit/current-excursions-section-mobile.png' })
  }

  await pageMobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  const featuredMobileEl = pageMobile.locator('.featured-trips-section')
  if (await featuredMobileEl.count() > 0) {
    await featuredMobileEl.screenshot({ path: 'audit/current-featured-section-mobile.png' })
  }

  await browser.close()
  console.log('Current screenshots captured!')
}

run().catch(console.error)
