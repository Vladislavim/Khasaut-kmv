import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5173'
const outputDir = resolve('artifacts/visual-check/prices')
mkdirSync(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
await page.emulateMedia({ reducedMotion: 'reduce' })
const consoleErrors = []
const pageErrors = []
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
page.on('pageerror', (error) => pageErrors.push(error.message))

await page.goto(`${baseUrl}/detail/dzhily-su-bermamyt`, { waitUntil: 'networkidle' })
await page.screenshot({ path: resolve(outputDir, 'mobile-detail-top.png'), fullPage: false })

await page.locator('.inner-detail-story').scrollIntoViewIfNeeded()
await page.screenshot({ path: resolve(outputDir, 'mobile-detail-story.png'), fullPage: false })

await page.locator('#detail-price').scrollIntoViewIfNeeded()
await page.waitForTimeout(120)
await page.screenshot({ path: resolve(outputDir, 'mobile-detail-price.png'), fullPage: false })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(120)
await page.screenshot({ path: resolve(outputDir, 'mobile-detail-footer.png'), fullPage: false })

const result = await page.evaluate(() => ({
  viewportWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  sticky: document.querySelector('.mobile-price-bar')?.className ?? null,
  stickyText: document.querySelector('.mobile-price-bar')?.textContent?.trim() ?? null,
}))

await browser.close()
console.log(JSON.stringify({ result, consoleErrors, pageErrors }, null, 2))
