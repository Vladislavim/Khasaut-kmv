import { chromium } from 'playwright'

async function capture() {
  const browser = await chromium.launch()

  // 1. Desktop (1440px)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  })
  const pageDesktop = await desktopContext.newPage()

  // Excursions page desktop
  await pageDesktop.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await pageDesktop.waitForTimeout(400)
  
  // Scroll through page to trigger all reveal observers
  for (let y = 0; y <= 2000; y += 400) {
    await pageDesktop.evaluate(top => window.scrollTo(0, top), y)
    await pageDesktop.waitForTimeout(100)
  }
  await pageDesktop.waitForTimeout(400)
  
  const catalogDesktop = pageDesktop.locator('.inner-section--catalog')
  await catalogDesktop.scrollIntoViewIfNeeded()
  await pageDesktop.waitForTimeout(300)
  await catalogDesktop.screenshot({ path: 'audit/green-excursions-desktop.png' })
  console.log('Saved audit/green-excursions-desktop.png')

  // Homepage featured trips desktop
  await pageDesktop.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await pageDesktop.waitForTimeout(400)
  for (let y = 0; y <= 2000; y += 400) {
    await pageDesktop.evaluate(top => window.scrollTo(0, top), y)
    await pageDesktop.waitForTimeout(100)
  }
  const featuredDesktop = pageDesktop.locator('.featured-trips-section')
  await featuredDesktop.scrollIntoViewIfNeeded()
  await pageDesktop.waitForTimeout(400)
  await featuredDesktop.screenshot({ path: 'audit/green-featured-desktop.png' })
  console.log('Saved audit/green-featured-desktop.png')

  // 2. Mobile (390px)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const pageMobile = await mobileContext.newPage()

  // Excursions page mobile
  await pageMobile.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' })
  await pageMobile.waitForTimeout(400)
  // Scroll down progressively to reveal all cards
  for (let y = 0; y <= 3500; y += 300) {
    await pageMobile.evaluate(top => window.scrollTo(0, top), y)
    await pageMobile.waitForTimeout(80)
  }
  await pageMobile.waitForTimeout(400)
  const catalogMobile = pageMobile.locator('.inner-section--catalog')
  await catalogMobile.scrollIntoViewIfNeeded()
  await pageMobile.waitForTimeout(300)
  await catalogMobile.screenshot({ path: 'audit/green-excursions-mobile.png' })
  console.log('Saved audit/green-excursions-mobile.png')

  // Homepage featured trips mobile
  await pageMobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await pageMobile.waitForTimeout(400)
  for (let y = 0; y <= 2500; y += 300) {
    await pageMobile.evaluate(top => window.scrollTo(0, top), y)
    await pageMobile.waitForTimeout(80)
  }
  await pageMobile.waitForTimeout(400)
  const featuredMobile = pageMobile.locator('.featured-trips-section')
  await featuredMobile.scrollIntoViewIfNeeded()
  await pageMobile.waitForTimeout(300)
  await featuredMobile.screenshot({ path: 'audit/green-featured-mobile.png' })
  console.log('Saved audit/green-featured-mobile.png')

  await browser.close()
  console.log('All screenshots captured successfully!')
}

capture().catch(err => {
  console.error(err)
  process.exit(1)
})
