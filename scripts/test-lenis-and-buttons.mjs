import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch()

  // 1. Mobile verification of detail page button
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const mPage = await mobileContext.newPage()
  await mPage.goto('http://127.0.0.1:5173/detail/dzhily-su-bermamyt', { waitUntil: 'networkidle' })
  await mPage.waitForTimeout(600)

  // Verify Lenis instance on window
  const hasLenis = await mPage.evaluate(() => {
    return typeof (window).__lenis !== 'undefined' && typeof (window).lenis !== 'undefined'
  })
  console.log('Lenis initialized on window:', hasLenis)

  // Check button text
  const primaryButtonText = await mPage.locator('.inner-hero__buttons--mobile .inner-button--solid').innerText()
  const primaryButtonHref = await mPage.locator('.inner-hero__buttons--mobile .inner-button--solid').getAttribute('href')
  console.log('Mobile primary button text:', primaryButtonText)
  console.log('Mobile primary button href:', primaryButtonHref)

  await mPage.screenshot({ path: 'audit/verify-detail-booking-btn-mobile.png' })
  console.log('Snapped verify-detail-booking-btn-mobile.png')

  // 2. Test Lenis smooth scroll down
  await mPage.evaluate(() => {
    window.lenis?.scrollTo(1200, { duration: 1.2 })
  })
  await mPage.waitForTimeout(700)
  const scrollPos = await mPage.evaluate(() => window.scrollY)
  console.log('Scroll position after Lenis scrollTo:', scrollPos)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
