import { chromium } from 'playwright'

async function captureForViewport(browser, { width, height, isMobile, deviceScaleFactor, outputFile }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
    isMobile: !!isMobile,
    hasTouch: !!isMobile,
  })
  const page = await context.newPage()
  await page.goto('http://localhost:5173/prices', { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)

  // Scroll through each section to trigger all Reveal IntersectionObservers
  const selectors = [
    '#top',
    '#price-table',
    '.prices-sheet-header',
    '.prices-sheet-actions',
    '.prices-sheet-card',
    '.prices-discounts-grid',
    '.inner-detail-practical',
    '.trip-cta',
    'footer',
  ]

  for (const sel of selectors) {
    const el = page.locator(sel).first()
    if (await el.count() > 0) {
      await el.scrollIntoViewIfNeeded().catch(() => {})
      await page.waitForTimeout(100)
    }
  }

  // Also ensure any lingering reveals are triggered
  const reveals = page.locator('.reveal')
  const count = await reveals.count()
  for (let i = 0; i < count; i++) {
    await reveals.nth(i).scrollIntoViewIfNeeded().catch(() => {})
  }

  await page.waitForTimeout(400)

  await page.screenshot({
    path: outputFile,
    fullPage: true,
  })
  console.log(`[OK] Captured ${outputFile}`)
  await context.close()
}

async function run() {
  const browser = await chromium.launch()

  // Desktop (1440px)
  await captureForViewport(browser, {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    isMobile: false,
    outputFile: 'audit/green-prices-desktop.png',
  })

  // Mobile (390px - iPhone 14/15 size)
  await captureForViewport(browser, {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    outputFile: 'audit/green-prices-mobile.png',
  })

  await browser.close()
  console.log('[SUCCESS] All screenshots captured!')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
