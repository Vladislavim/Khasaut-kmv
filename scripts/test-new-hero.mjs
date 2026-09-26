import { chromium } from 'playwright'
import fs from 'fs'

const pages = [
  { path: '/excursions', name: 'excursions' },
  { path: '/routes', name: 'routes' },
  { path: '/thermal-springs', name: 'thermal-springs' },
  { path: '/detail/dzhily-su-bermamyt', name: 'detail-dzhily-su-bermamyt' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
]

async function main() {
  if (!fs.existsSync('audit')) {
    fs.mkdirSync('audit', { recursive: true })
  }
  const browser = await chromium.launch()

  // 1. Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  })
  const dPage = await desktopContext.newPage()

  for (const p of pages) {
    await dPage.goto(`http://127.0.0.1:5173${p.path}`, { waitUntil: 'networkidle' })
    await dPage.waitForTimeout(400)
    await dPage.screenshot({ path: `audit/compact-hero-desktop-${p.name}.png` })
    console.log(`Desktop: compact-hero-desktop-${p.name}.png`)
  }

  // 2. Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const mPage = await mobileContext.newPage()

  for (const p of pages) {
    await mPage.goto(`http://127.0.0.1:5173${p.path}`, { waitUntil: 'networkidle' })
    await mPage.waitForTimeout(400)
    await mPage.screenshot({ path: `audit/compact-hero-mobile-${p.name}.png` })
    console.log(`Mobile: compact-hero-mobile-${p.name}.png`)
  }

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
