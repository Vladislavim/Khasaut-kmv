import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  async function snap(selector, filename) {
    const el = await page.$(selector)
    if (el) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(600)
      await el.screenshot({ path: `docs/${filename}` })
      console.log(`Snapped mobile ${filename}`)
    }
  }

  await snap('.services-section--modern', 'audit-mobile-services.png')
  await snap('.about-section--modern', 'audit-mobile-about.png')
  await snap('.values-section--modern', 'audit-mobile-values.png')

  // Also check detail page on mobile
  await page.goto('http://localhost:5173/detail/makhar/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const slider = await page.$('.inner-detail-highlights')
  if (slider) {
    await slider.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    await slider.screenshot({ path: 'docs/audit-mobile-makhar-slider.png' })
    console.log('Snapped mobile audit-mobile-makhar-slider.png')
  }

  await browser.close()
  console.log('[OK] Done mobile audit!')
}

main().catch(console.error)
