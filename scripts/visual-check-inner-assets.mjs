import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const outputDir = path.resolve('artifacts/visual-check')
const viewports = {
  compact: { width: 320, height: 780 },
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 900 },
  desktop: { width: 1440, height: 1000 },
  wide: { width: 1920, height: 1080 },
}
const catalogRoutes = ['/excursions', '/routes', '/thermal-springs', '/horse-rides']
const detailSlugs = [
  'dzhily-su', 'dzhily-su-bermamyt', 'bermamyt', 'dombay', 'arkhyz', 'elbrus', 'aktoprak',
  'balkaria', 'ossetia', 'ingushetia', 'grozny', 'honey', 'narzan', 'khurla-kol',
  'khudes-labyrinth', 'mukhinskoe-gorge', 'makhar', 'baduk-lakes', 'suvorovskie', 'pearl',
  'geduko', 'aushiger',
]

await fs.mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: viewports.desktop, deviceScaleFactor: 1 })
const consoleErrors = []
const pageErrors = []
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`${page.url()}: ${message.text()}`) })
page.on('pageerror', (error) => pageErrors.push(`${page.url()}: ${error.message}`))

async function load(route, viewport) {
  await page.setViewportSize(viewport)
  await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(250)
}

async function inspect(route) {
  return page.evaluate((currentRoute) => {
    const nestedScrollContainers = [...document.querySelectorAll('*')]
      .filter((node) => node !== document.body && node !== document.documentElement)
      .filter((node) => {
        const style = getComputedStyle(node)
        return (node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(style.overflowY))
          || (node.scrollWidth > node.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX))
      })
      .map((node) => node.className || node.tagName.toLowerCase())
    const sliderImages = [...document.querySelectorAll('.inner-photo-slider__slide img')].map((image) => image.currentSrc || image.src)
    const cardImage = document.querySelector('.inner-route-card__media img')?.currentSrc || ''
    return {
      route: currentRoute,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      nestedScrollContainers,
      failedImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      sliderImageCount: sliderImages.length,
      uniqueSliderImages: new Set(sliderImages).size,
      sliderImages,
      cardImage,
      hasMain: Boolean(document.querySelector('.inner-main')),
      hasFooter: Boolean(document.querySelector('.footer-section')),
    }
  }, route)
}

const checks = []
for (const [size, viewport] of Object.entries(viewports)) {
  for (const route of [...catalogRoutes, ...detailSlugs.map((slug) => `/detail/${slug}`)]) {
    await load(route, viewport)
    checks.push({ size, ...(await inspect(route)) })
  }
}

for (const [name, route] of [['routes', '/routes'], ['khurla-kol', '/detail/khurla-kol'], ['baduk-lakes', '/detail/baduk-lakes']]) {
  for (const [size, viewport] of Object.entries({ desktop: viewports.desktop, tablet: viewports.tablet, mobile: viewports.mobile })) {
    await load(route, viewport)
    await page.screenshot({ path: path.join(outputDir, `inner-assets-${name}-${size}.png`), fullPage: true, animations: 'disabled' })
  }
}

await load('/', viewports.desktop)
const homeUntouched = await page.evaluate(() => Boolean(document.querySelector('#top.hero-section, .hero-section #top, .hero-section')))
await page.emulateMedia({ reducedMotion: 'reduce' })
await load('/detail/baduk-lakes', viewports.mobile)
const reducedMotion = await page.evaluate(() => ({
  ribbonAnimation: document.querySelector('.inner-ribbon__track') ? getComputedStyle(document.querySelector('.inner-ribbon__track')).animationName : 'none',
  revealsVisible: [...document.querySelectorAll('.reveal')].every((node) => getComputedStyle(node).opacity !== '0'),
}))

const detailImages = checks.filter((check) => check.route.startsWith('/detail/')).flatMap((check) => check.sliderImages)
const globalUniqueSliderImages = new Set(detailImages).size === detailImages.length
const result = { baseURL, viewports, checks, globalUniqueSliderImages, homeUntouched, reducedMotion, consoleErrors, pageErrors }
await fs.writeFile(path.join(outputDir, 'inner-assets-visual-check-results.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify({
  checks: checks.length,
  globalUniqueSliderImages,
  homeUntouched,
  reducedMotion,
  consoleErrors,
  pageErrors,
  failures: checks.filter((check) => check.overflow || check.nestedScrollContainers.length || check.failedImages.length || (check.route.startsWith('/detail/') && (check.sliderImageCount !== 3 || check.uniqueSliderImages !== 3))),
}, null, 2))
await browser.close()

if (!homeUntouched || !globalUniqueSliderImages || consoleErrors.length || pageErrors.length || reducedMotion.ribbonAnimation !== 'none' || !reducedMotion.revealsVisible || checks.some((check) => check.overflow || check.nestedScrollContainers.length || check.failedImages.length || !check.hasMain || !check.hasFooter || (check.route.startsWith('/detail/') && (check.sliderImageCount !== 3 || check.uniqueSliderImages !== 3)))) process.exitCode = 1
