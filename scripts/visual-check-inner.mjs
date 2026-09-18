import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const outputDir = path.resolve('artifacts/visual-check')
const routes = [
  ['excursions', '/excursions'],
  ['routes', '/routes'],
  ['horse-rides', '/horse-rides'],
  ['thermal-springs', '/thermal-springs'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['detail-dzhily-su', '/detail/dzhily-su'],
  ['detail-dzhily-su-bermamyt', '/detail/dzhily-su-bermamyt'],
  ['detail-bermamyt', '/detail/bermamyt'],
  ['detail-dombay', '/detail/dombay'],
  ['detail-arkhyz', '/detail/arkhyz'],
  ['detail-elbrus', '/detail/elbrus'],
  ['detail-aktoprak', '/detail/aktoprak'],
  ['detail-balkaria', '/detail/balkaria'],
  ['detail-ossetia', '/detail/ossetia'],
  ['detail-ingushetia', '/detail/ingushetia'],
  ['detail-grozny', '/detail/grozny'],
  ['detail-honey', '/detail/honey'],
  ['detail-narzan', '/detail/narzan'],
  ['detail-khurla-kol', '/detail/khurla-kol'],
  ['detail-khudes-labyrinth', '/detail/khudes-labyrinth'],
  ['detail-mukhinskoe-gorge', '/detail/mukhinskoe-gorge'],
  ['detail-makhar', '/detail/makhar'],
  ['detail-baduk-lakes', '/detail/baduk-lakes'],
  ['detail-suvorovskie', '/detail/suvorovskie'],
  ['detail-pearl', '/detail/pearl'],
  ['detail-geduko', '/detail/geduko'],
  ['detail-aushiger', '/detail/aushiger'],
]
const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['tablet', { width: 768, height: 1024 }],
  ['mobile', { width: 390, height: 844 }],
]

await fs.mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: viewports[0][1], deviceScaleFactor: 1 })
const consoleErrors = []
const pageErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(`${page.url()}: ${message.text()}`)
})
page.on('pageerror', (error) => pageErrors.push(`${page.url()}: ${error.message}`))

async function load(route, viewport) {
  await page.setViewportSize(viewport)
  await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(450)
}

async function revealAll() {
  await page.evaluate(async () => {
    const step = Math.max(280, Math.round(window.innerHeight * 0.72))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 150))
    }
    window.scrollTo(0, 0)
  })
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
  })
  await page.waitForTimeout(350)
}

const checks = {}
for (const [name, route] of routes) {
  checks[name] = {}
  for (const [size, viewport] of viewports) {
    await load(route, viewport)
    await revealAll()
    checks[name][size] = await page.evaluate(() => {
      const nestedScrollContainers = [...document.querySelectorAll('*')]
        .filter((node) => node !== document.body && node !== document.documentElement)
        .filter((node) => {
          const style = getComputedStyle(node)
          const vertical = node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(style.overflowY)
          const horizontal = node.scrollWidth > node.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX)
          return vertical || horizontal
        })
        .map((node) => node.className || node.tagName.toLowerCase())

      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        nestedScrollContainers,
        failedImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
        hasMain: Boolean(document.querySelector('.inner-main')),
        hasFooter: Boolean(document.querySelector('.footer-section')),
        heroHeight: Math.round(document.querySelector('.inner-hero')?.getBoundingClientRect().height || 0),
        sliderSlides: document.querySelectorAll('.inner-photo-slider__slide').length,
        sliderControls: document.querySelectorAll('.inner-photo-slider__arrows button').length,
      }
    })
    await page.screenshot({
      path: path.join(outputDir, `inner-${name}-${size}.png`),
      fullPage: true,
      animations: 'disabled',
    })
  }

  await load(route, viewports[0][1])
  await revealAll()
  const hero = page.locator('.inner-hero')
  if (await hero.count()) await hero.screenshot({ path: path.join(outputDir, `inner-${name}-hero.png`), animations: 'disabled' })
  const contentSelector = await page.locator('.inner-section').count() ? '.inner-section' : '.inner-main'
  await page.locator(contentSelector).first().screenshot({ path: path.join(outputDir, `inner-${name}-content.png`), animations: 'disabled' })
  await page.locator('.footer-section').screenshot({ path: path.join(outputDir, `inner-${name}-footer.png`), animations: 'disabled' })
}

await load('/', { width: 1440, height: 1000 })
const homeUntouched = await page.evaluate(() => Boolean(document.querySelector('#top') && document.querySelector('.hero-section')))

await load('/excursions', { width: 390, height: 844 })
const firstSummary = page.locator('.inner-route-card summary').first()
if (await firstSummary.count()) {
  await firstSummary.click()
}
const detailsOpened = await page.locator('.inner-route-card details[open]').count() > 0

await page.emulateMedia({ reducedMotion: 'reduce' })
await load('/horse-rides', { width: 390, height: 844 })
const reducedMotion = await page.evaluate(() => {
  const ribbon = document.querySelector('.inner-ribbon__track')
  return {
    ribbonAnimation: ribbon ? getComputedStyle(ribbon).animationName : 'none',
    revealsVisible: [...document.querySelectorAll('.reveal')].every((node) => getComputedStyle(node).opacity !== '0'),
  }
})

const result = {
  baseURL,
  routes: Object.fromEntries(routes),
  checks,
  homeUntouched,
  detailsOpened,
  reducedMotion,
  consoleErrors,
  pageErrors,
}

await fs.writeFile(path.join(outputDir, 'inner-visual-check-results.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()

const failed = consoleErrors.length || pageErrors.length || !homeUntouched || !detailsOpened || reducedMotion.ribbonAnimation !== 'none' || !reducedMotion.revealsVisible || Object.entries(checks).some(([name, sizes]) => Object.values(sizes).some((check) => check.overflow || check.nestedScrollContainers.length || check.failedImages.length || !check.hasMain || !check.hasFooter || (name.startsWith('detail-') && (check.sliderSlides < 3 || check.sliderControls !== 2))))
if (failed) process.exitCode = 1
