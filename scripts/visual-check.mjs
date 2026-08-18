import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4174'
const outputDir = path.resolve('artifacts/visual-check')
const mode = process.argv[2] || 'all'

await fs.mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const consoleErrors = []
const pageErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => pageErrors.push(error.message))

async function load(viewport) {
  await page.setViewportSize(viewport)
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(1100)
}

async function captureSection(filename, selector) {
  const section = page.locator(selector)
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(250)
  await section.screenshot({ path: path.join(outputDir, filename), animations: 'disabled' })
}

async function primeRevealSections() {
  for (const [, selector] of sections) {
    await page.locator(selector).scrollIntoViewIfNeeded()
    await page.waitForTimeout(180)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  await page.waitForTimeout(250)
}

const sections = [
  ['01-hero.png', '#top'],
  ['02-services.png', '#services'],
  ['03-routes.png', '#routes'],
  ['04-about.png', '#about'],
  ['05-values.png', '#values'],
  ['06-footer.png', '#contact'],
]

const sectionModes = {
  hero: sections.slice(0, 1),
  services: sections.slice(1, 2),
  routes: sections.slice(2, 3),
  about: sections.slice(3, 4),
  values: sections.slice(4, 5),
  footer: sections.slice(5, 6),
}

if (sectionModes[mode] || mode === 'sections' || mode === 'all') {
  await load({ width: 1440, height: 1000 })
  const requested = sectionModes[mode] || sections
  for (const [filename, selector] of requested) await captureSection(filename, selector)
}

if (mode === 'full' || mode === 'all') {
  const fullPageSizes = [
    ['desktop-full-page.png', { width: 1440, height: 1000 }],
    ['tablet-full-page.png', { width: 768, height: 1024 }],
    ['mobile-full-page.png', { width: 390, height: 844 }],
  ]
  for (const [filename, viewport] of fullPageSizes) {
    await load(viewport)
    await primeRevealSections()
    await page.screenshot({ path: path.join(outputDir, filename), fullPage: true, animations: 'disabled' })
  }
}

const responsiveViewports = {
  '320x700': { width: 320, height: 700 },
  '360x800': { width: 360, height: 800 },
  '390x844': { width: 390, height: 844 },
  '430x932': { width: 430, height: 932 },
  '768x1024': { width: 768, height: 1024 },
  '1024x768': { width: 1024, height: 768 },
  '1280x900': { width: 1280, height: 900 },
  '1440x1000': { width: 1440, height: 1000 },
  '1920x1080': { width: 1920, height: 1080 },
}

await page.emulateMedia({ reducedMotion: 'no-preference' })
const responsiveChecks = {}
for (const [label, viewport] of Object.entries(responsiveViewports)) {
  await load(viewport)
  responsiveChecks[label] = await page.evaluate(() => {
    const copy = document.querySelector('.hero-copy')?.getBoundingClientRect()
    const collage = document.querySelector('.hero-collage')?.getBoundingClientRect()
    const overlap = copy && collage
      ? !(copy.right <= collage.left || copy.left >= collage.right || copy.bottom <= collage.top || copy.top >= collage.bottom)
      : false
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      imageFailures: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      heroTextCollageOverlap: window.innerWidth < 720 ? overlap : false,
    }
  })
}

await load({ width: 390, height: 844 })
const validation = await page.evaluate(() => ({
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
  imageFailures: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
  heroLayers: [...document.querySelectorAll('[data-layer]')].map((element) => element.getAttribute('data-layer')),
  linksWithoutTargets: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href')).length,
}))
validation.responsiveChecks = responsiveChecks

const menuButton = page.locator('.menu-toggle')
if (await menuButton.isVisible()) {
  await menuButton.click()
  validation.mobileMenuOpened = await page.locator('.main-nav.is-open').count() === 1
}

await page.emulateMedia({ reducedMotion: 'reduce' })
await page.goto(baseURL, { waitUntil: 'networkidle' })
await page.waitForTimeout(250)
validation.reducedMotionVisible = await page.locator('.hero-layer').evaluateAll((layers) => layers.every((layer) => getComputedStyle(layer).opacity !== '0'))

const result = {
  baseURL,
  viewport: { width: 390, height: 844 },
  validation,
  consoleErrors,
  pageErrors,
}
await fs.writeFile(path.join(outputDir, 'visual-check-results.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()

const responsiveFailures = Object.values(responsiveChecks).some((check) => check.overflow || check.imageFailures.length || check.heroTextCollageOverlap)
if (consoleErrors.length || pageErrors.length || validation.horizontalOverflow || validation.imageFailures.length || validation.heroLayers.length !== 5 || !validation.mobileMenuOpened || !validation.reducedMotionVisible || responsiveFailures) process.exitCode = 1
