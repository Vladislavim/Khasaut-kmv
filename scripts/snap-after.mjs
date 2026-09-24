import { chromium } from 'playwright'
import fs from 'fs'

const pages = [
  { path: '/excursions', name: 'excursions' },
  { path: '/routes', name: 'routes' },
  { path: '/horse-rides', name: 'horse-rides' },
  { path: '/thermal-springs', name: 'thermal-springs' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/detail/dzhily-su-bermamyt', name: 'detail-dzhily-su-bermamyt' },
]

async function main() {
  if (!fs.existsSync('audit')) {
    fs.mkdirSync('audit', { recursive: true })
  }
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  for (const p of pages) {
    await page.goto(`http://localhost:5173${p.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: `audit/mobile-hero-button-${p.name}.png` })
    console.log(`Snapped mobile-hero-button-${p.name}.png`)
  }

  // Also check desktop to make sure no regression
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto('http://localhost:5173/excursions', { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: 'audit/desktop-excursions-after.png' })
  console.log('Snapped desktop-excursions-after.png')

  await browser.close()
}

main().catch(console.error)
