import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const outputRoot = path.resolve('artifacts/page-scan')
const routes = [
  '/',
  '/excursions',
  '/routes',
  '/horse-rides',
  '/thermal-springs',
  '/about',
  '/contact',
  '/prices',
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
  phone320: { width: 320, height: 740 },
  phone375: { width: 375, height: 812 },
  mobile390: { width: 390, height: 844 },
  phone430: { width: 430, height: 932 },
  tablet768: { width: 768, height: 1024 },
  tablet1024: { width: 1024, height: 1000 },
  desktop: { width: 1440, height: 1000 },
  wide1920: { width: 1920, height: 1080 },
}

function routeSlug(route) {
  return route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
}

async function revealAndLoadImages(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const step = Math.max(320, Math.round(window.innerHeight * 0.72))
    const height = document.documentElement.scrollHeight

    for (let y = 0; y <= height + window.innerHeight; y += step) {
      window.scrollTo(0, y)
      await wait(130)
    }

    // Some browser/dev-server image requests can keep a load event pending
    // indefinitely. The inspector below still reports incomplete images, so
    // keep the reveal phase bounded instead of hanging the full matrix scan.
    await wait(1200)
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(450)
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const textOverflow = [...document.querySelectorAll('h1, h2, h3, p, a, button')]
      .filter((node) => {
        const style = getComputedStyle(node)
        const box = node.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && (box.right > window.innerWidth + 1 || box.left < -1)
      })
      .slice(0, 20)
      .map((node) => ({ text: node.textContent.trim().slice(0, 70), left: Math.round(node.getBoundingClientRect().left), right: Math.round(node.getBoundingClientRect().right) }))

    return {
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      failedImages: [...document.images].filter((image) => {
      const style = getComputedStyle(image)
        return image.getClientRects().length > 0 && style.display !== 'none' && style.visibility !== 'hidden' && (!image.complete || image.naturalWidth === 0)
      }).map((image) => image.currentSrc || image.src),
      textOverflow,
      headings: [...document.querySelectorAll('h1, h2')].slice(0, 8).map((node) => node.textContent.trim()),
      footerLinks: [...document.querySelectorAll('.footer-nav a')].map((link) => ({ text: link.textContent.trim(), href: link.getAttribute('href') })),
    }
  })
}

await fs.rm(outputRoot, { recursive: true, force: true })
await fs.mkdir(outputRoot, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: viewports.desktop, deviceScaleFactor: 1 })
await page.emulateMedia({ reducedMotion: 'reduce' })
page.setDefaultTimeout(60000)

const results = []
const runtimeErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') runtimeErrors.push({ type: 'console', text: message.text(), url: page.url() })
})
page.on('pageerror', (error) => runtimeErrors.push({ type: 'page', text: error.message, url: page.url() }))

for (const route of routes) {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    await page.setViewportSize(viewport)
    await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(350)
    await page.evaluate(() => document.fonts?.ready)
    await revealAndLoadImages(page)

    if (viewport.width < 720) {
      const menuToggle = page.locator('.menu-toggle').first()
      if (await menuToggle.count()) {
        await menuToggle.click()
        if (!(await page.locator('.main-nav.is-open').count())) throw new Error(`Mobile menu did not open on ${route}`)
        await page.keyboard.press('Escape')
        if (await page.locator('.main-nav.is-open').count()) throw new Error(`Mobile menu did not close on ${route}`)
      }
    }

    const slug = routeSlug(route)
    const outputPath = path.join(outputRoot, `${viewportName}-${slug}.png`)
    await page.screenshot({ path: outputPath, fullPage: true, animations: 'disabled' })
    const inspection = await inspectPage(page)

    results.push({
      route,
      viewport: viewportName,
      screenshot: path.relative(process.cwd(), outputPath),
      ...inspection,
    })
  }
}

const manifest = {
  baseURL,
  generatedAt: new Date().toISOString(),
  routes: routes.length,
  screenshots: results.length,
  viewports,
  results,
  runtimeErrors,
  summary: {
    failures: results.filter((result) => result.overflow || result.failedImages.length || result.textOverflow.length).length,
    overflow: results.filter((result) => result.overflow).length,
    failedImages: results.filter((result) => result.failedImages.length).length,
    textOverflow: results.filter((result) => result.textOverflow.length).length,
    runtimeErrors: runtimeErrors.length,
  },
}

await fs.writeFile(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await browser.close()
console.log(JSON.stringify(manifest.summary, null, 2))
