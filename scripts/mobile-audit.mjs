import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const outputDir = path.resolve('artifacts/visual-check')
const routes = [
  '/',
  '/excursions',
  '/routes',
  '/horse-rides',
  '/thermal-springs',
  '/about',
  '/contact',
  '/detail/dzhily-su',
  '/detail/dzhily-su-bermamyt',
  '/detail/bermamyt',
  '/detail/dombay',
  '/detail/arkhyz',
  '/detail/elbrus',
  '/detail/aktoprak',
  '/detail/balkaria',
  '/detail/ossetia',
  '/detail/ingushetia',
  '/detail/grozny',
  '/detail/honey',
  '/detail/narzan',
  '/detail/khurla-kol',
  '/detail/khudes-labyrinth',
  '/detail/mukhinskoe-gorge',
  '/detail/makhar',
  '/detail/baduk-lakes',
  '/detail/suvorovskie',
  '/detail/pearl',
  '/detail/geduko',
  '/detail/aushiger',
]

const viewports = {
  '320x800': { width: 320, height: 800 },
  '360x800': { width: 360, height: 800 },
  '390x844': { width: 390, height: 844 },
  '412x915': { width: 412, height: 915 },
}

await fs.mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: viewports['390x844'], deviceScaleFactor: 1 })
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
  await page.waitForTimeout(250)
}

async function revealAndLoadImages() {
  await page.evaluate(async () => {
    const step = Math.max(240, Math.round(window.innerHeight * 0.68))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
  })
  await page.waitForTimeout(220)
}

const inspectPage = () => page.evaluate(() => {
  const visible = (node) => {
    const style = getComputedStyle(node)
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0
  }
  const textOverflow = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,label')]
    .filter((node) => visible(node) && node.textContent?.trim())
    .map((node) => ({
      tag: node.tagName.toLowerCase(),
      text: node.textContent.trim().slice(0, 60),
      rect: (() => {
        const box = node.getBoundingClientRect()
        return { left: Math.round(box.left), right: Math.round(box.right), top: Math.round(box.top), bottom: Math.round(box.bottom) }
      })(),
    }))
    .filter(({ rect }) => rect.left < -1 || rect.right > window.innerWidth + 1)

  const nestedScrollContainers = [...document.querySelectorAll('*')]
    .filter((node) => node !== document.body && node !== document.documentElement)
    .filter((node) => {
      const style = getComputedStyle(node)
      const vertical = node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(style.overflowY)
      const horizontal = node.scrollWidth > node.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX)
      return vertical || horizontal
    })
    .map((node) => node.className || node.tagName.toLowerCase())

  const primaryHeadings = [...document.querySelectorAll('h1')]
    .filter(visible)
    .map((node) => {
      const box = node.getBoundingClientRect()
      return { text: node.textContent.trim().slice(0, 50), left: Math.round(box.left), right: Math.round(box.right), top: Math.round(box.top), bottom: Math.round(box.bottom) }
    })

  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    nestedScrollContainers,
    failedImages: [...document.images].filter((image) => {
      const style = getComputedStyle(image)
      return image.getClientRects().length > 0 && style.display !== 'none' && style.visibility !== 'hidden' && (!image.complete || image.naturalWidth === 0)
    }).map((image) => image.currentSrc || image.src),
    textOverflow,
    primaryHeadings,
    navLinks: [...document.querySelectorAll('.main-nav a')].map((link) => ({ text: link.textContent.trim(), href: link.getAttribute('href') })),
    menuToggle: Boolean(document.querySelector('.menu-toggle')),
    footer: Boolean(document.querySelector('.footer-section')),
  }
})

const checks = {}
for (const route of routes) {
  checks[route] = {}
  for (const [label, viewport] of Object.entries(viewports)) {
    await load(route, viewport)
    await revealAndLoadImages()
    checks[route][label] = await inspectPage()

    if (route === '/' && label === '320x800') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-home-320.png'), fullPage: true, animations: 'disabled' })
    }
    if (route === '/' && label === '390x844') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-home-390.png'), fullPage: true, animations: 'disabled' })
    }
    if (route === '/about' && label === '390x844') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-about-390.png'), fullPage: true, animations: 'disabled' })
    }
    if (route === '/excursions' && label === '390x844') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-excursions-390.png'), fullPage: true, animations: 'disabled' })
    }
    if (route === '/detail/dzhily-su' && label === '390x844') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-detail-dzhily-su-390.png'), fullPage: true, animations: 'disabled' })
    }
    if (route === '/contact' && label === '390x844') {
      await page.screenshot({ path: path.join(outputDir, 'mobile-audit-contact-390.png'), fullPage: true, animations: 'disabled' })
    }
  }
}

await load('/', viewports['390x844'])
await revealAndLoadImages()
const menuToggle = page.locator('.menu-toggle')
let mobileMenuOpened = false
if (await menuToggle.isVisible()) {
  await menuToggle.click()
  mobileMenuOpened = await page.locator('.main-nav.is-open').count() === 1
  await page.screenshot({ path: path.join(outputDir, 'mobile-audit-home-menu-390.png'), fullPage: true, animations: 'disabled' })
}

await load('/about', viewports['390x844'])
await revealAndLoadImages()
const innerMenuToggle = page.locator('.inner-site-header .menu-toggle')
let innerMobileMenuOpened = false
if (await innerMenuToggle.isVisible()) {
  await innerMenuToggle.click()
  innerMobileMenuOpened = await page.locator('.inner-site-header .main-nav.is-open').count() === 1
  await page.screenshot({ path: path.join(outputDir, 'mobile-audit-inner-menu-390.png'), fullPage: true, animations: 'disabled' })
}

await load('/contact', viewports['390x844'])
await revealAndLoadImages()
const footer = page.locator('.footer-section')
if (await footer.count()) {
  await footer.screenshot({ path: path.join(outputDir, 'mobile-audit-footer-390.png'), animations: 'disabled' })
}

await page.emulateMedia({ reducedMotion: 'reduce' })
await load('/detail/dzhily-su', viewports['390x844'])
const reducedMotion = await page.evaluate(() => ({
  revealsVisible: [...document.querySelectorAll('.reveal')].every((node) => getComputedStyle(node).opacity !== '0'),
  ribbonAnimation: document.querySelector('.inner-ribbon__track') ? getComputedStyle(document.querySelector('.inner-ribbon__track')).animationName : 'none',
  sectionTransitions: [...document.querySelectorAll('.section-reveal__veil')].every((node) => getComputedStyle(node).transitionDuration === '0s'),
}))

const result = {
  baseURL,
  routes,
  viewports,
  checks,
  mobileMenuOpened,
  innerMobileMenuOpened,
  reducedMotion,
  consoleErrors,
  pageErrors,
}
await fs.writeFile(path.join(outputDir, 'mobile-audit-results.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()

const failed = consoleErrors.length || pageErrors.length || !mobileMenuOpened || !innerMobileMenuOpened || !reducedMotion.revealsVisible || reducedMotion.ribbonAnimation !== 'none' || !reducedMotion.sectionTransitions || Object.values(checks).some((sizes) => Object.values(sizes).some((check) => check.overflow || check.nestedScrollContainers.length || check.failedImages.length || check.textOverflow.length || !check.footer))
if (failed) process.exitCode = 1
