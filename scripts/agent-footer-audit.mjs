import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const outputDir = path.resolve('artifacts/visual-check/agent-footer')
const routes = [
  '/',
  '/excursions',
  '/routes',
  '/horse-rides',
  '/thermal-springs',
  '/about',
  '/contact',
  '/detail/dzhily-su',
  '/detail/khurla-kol',
]
const viewports = [
  { label: '320', width: 320, height: 800 },
  { label: '390', width: 390, height: 844 },
  { label: '768', width: 768, height: 1024 },
  { label: '1024', width: 1024, height: 900 },
  { label: '1440', width: 1440, height: 1000 },
  { label: '1920', width: 1920, height: 1080 },
]
const expectedFooterLinks = ['Главная', 'Экскурсии', 'Необычные маршруты', 'Конные', 'Термальные']

await fs.mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push({ type: 'console', url: page.url(), text: message.text() })
})
page.on('pageerror', (error) => errors.push({ type: 'page', url: page.url(), text: error.message }))

async function revealAndLoadImages() {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = Math.max(260, Math.round(window.innerHeight * 0.72))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 70))
    }
    window.scrollTo(0, 0)
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
  })
  await page.waitForTimeout(1150)
}

const inspect = () => page.evaluate((expectedLinks) => {
  const visible = (node) => {
    if (!node) return false
    const style = getComputedStyle(node)
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0
  }
  const box = (node) => {
    if (!node) return null
    const rect = node.getBoundingClientRect()
    return {
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
  }
  const textOverflow = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button')]
    .filter(visible)
    .map((node) => ({ text: node.textContent.trim().slice(0, 80), rect: box(node) }))
    .filter(({ rect }) => rect && (rect.left < -1 || rect.right > window.innerWidth + 1))
  const nestedScrollContainers = [...document.querySelectorAll('*')]
    .filter((node) => node !== document.body && node !== document.documentElement)
    .filter((node) => {
      const style = getComputedStyle(node)
      return (node.scrollHeight > node.clientHeight + 1 && ['auto', 'scroll'].includes(style.overflowY))
        || (node.scrollWidth > node.clientWidth + 1 && ['auto', 'scroll'].includes(style.overflowX))
    })
    .map((node) => node.className || node.tagName.toLowerCase())
  const footerLinks = [...document.querySelectorAll('.footer-nav a')]
    .filter(visible)
    .map((node) => ({ text: node.textContent.trim(), href: node.getAttribute('href'), rect: box(node) }))
  const footer = document.querySelector('.footer-section')
  const mountain = document.querySelector('.footer-mountain')
  const footerNav = document.querySelector('.footer-nav')
  const email = document.querySelector('.footer-email')
  const socials = document.querySelector('.footer-socials')
  const footerRect = box(footer)
  const footerNavRect = box(footerNav)
  const mountainRect = box(mountain)
  const emailRect = box(email)
  const socialRect = box(socials)
  const overlaps = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
  const headings = [...document.querySelectorAll('h1,h2')].filter(visible).slice(0, 5).map((node) => ({ text: node.textContent.trim().slice(0, 80), rect: box(node) }))
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    nestedScrollContainers,
    failedImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
    textOverflow,
    headings,
    footer: Boolean(footer),
    footerLinks,
    footerLinksMatch: JSON.stringify(footerLinks.map((link) => link.text)) === JSON.stringify(expectedLinks),
    footerEmailVisible: visible(email) && Boolean(emailRect?.width),
    footerSocialsVisible: visible(socials) && Boolean(socialRect?.width),
    footerNavVisible: visible(footerNav) && Boolean(footerNavRect?.width),
    footerNavOverlapsMountain: overlaps(footerNavRect, mountainRect),
    footerEmailOverlapsMountain: overlaps(emailRect, mountainRect),
    footerSocialsOverlapsMountain: overlaps(socialRect, mountainRect),
    footerNavOverlapsEmail: overlaps(footerNavRect, emailRect),
    footerNavOverlapsSocials: overlaps(footerNavRect, socialRect),
    footerRect,
    footerNavRect,
    mountainRect,
    emailRect,
    socialRect,
  }
}, expectedFooterLinks)

const checks = []
for (const route of routes) {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts?.ready)
    await revealAndLoadImages()
    const result = await inspect()
    checks.push({ route, viewport: viewport.label, ...result })
    const routeSlug = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-')
    await page.screenshot({ path: path.join(outputDir, `${routeSlug}-${viewport.label}.png`), fullPage: true, animations: 'disabled' })
    if (viewport.label === '390' || viewport.label === '1440') {
      const footer = page.locator('.footer-section').first()
      if (await footer.count()) await footer.screenshot({ path: path.join(outputDir, `${routeSlug}-footer-${viewport.label}.png`), animations: 'disabled' })
    }
  }
}

await browser.close()

const failedChecks = checks.filter((check) => check.overflow || check.nestedScrollContainers.length || check.failedImages.length || check.textOverflow.length || !check.footer || !check.footerLinksMatch || !check.footerEmailVisible || !check.footerSocialsVisible || !check.footerNavVisible || check.footerNavOverlapsMountain || check.footerEmailOverlapsMountain || check.footerSocialsOverlapsMountain || check.footerNavOverlapsEmail || check.footerNavOverlapsSocials)
const summary = {
  baseURL,
  routes,
  viewports,
  checks: { total: checks.length, failed: failedChecks.length },
  failedChecks,
  errors,
}
await fs.writeFile(path.join(outputDir, 'results.json'), JSON.stringify({ summary, checks }, null, 2))
console.log(JSON.stringify(summary, null, 2))
if (failedChecks.length || errors.length) process.exitCode = 1
