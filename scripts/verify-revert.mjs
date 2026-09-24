import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.25,
  })
  const page = await context.newPage()

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  // 1. Services section (restored original)
  const servicesEl = await page.$('.services-section')
  if (servicesEl) {
    await servicesEl.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    await servicesEl.screenshot({ path: 'docs/revert-services.png' })
    console.log('Snapped revert-services.png')
  }

  // 2. Bottom of homepage: CTA + Footer
  const ctaEl = await page.$('.trip-cta')
  if (ctaEl) {
    await ctaEl.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'docs/revert-bottom.png' })
    console.log('Snapped revert-bottom.png')
  }

  await browser.close()
  console.log('[OK] Done checking reverted homepage!')
}

main().catch(console.error)
