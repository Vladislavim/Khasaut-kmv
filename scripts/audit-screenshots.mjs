import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.25,
  })
  const page = await context.newPage()

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  // Function to scroll and snap
  async function snap(selector, filename) {
    const el = await page.$(selector)
    if (el) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(800)
      await el.screenshot({ path: `docs/${filename}` })
      console.log(`Snapped ${filename}`)
    }
  }

  await snap('.services-section', 'audit-services-scrolled.png')
  await snap('#home-price-calculator', 'audit-calc-scrolled.png')
  await snap('.about-section', 'audit-about-scrolled.png')
  await snap('.values-section', 'audit-values-scrolled.png')
  await snap('.featured-trips', 'audit-featured-scrolled.png')

  await browser.close()
  console.log('[OK] Captured scrolled sections!')
}

main().catch(console.error)
