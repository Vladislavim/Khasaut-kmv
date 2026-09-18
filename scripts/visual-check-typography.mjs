import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = 'http://127.0.0.1:5173'
const cases = [
  { name: 'home', path: '/', viewports: [[1440, 1000], [768, 1024], [390, 844]] },
  { name: 'routes', path: '/routes', viewports: [[1440, 1000], [768, 1024], [390, 844]] },
  { name: 'detail-khurla-kol', path: '/detail/khurla-kol', viewports: [[1440, 1000], [768, 1024], [390, 844]] },
]

const outputDir = 'artifacts/visual-check'
await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const results = []

for (const testCase of cases) {
  for (const [width, height] of testCase.viewports) {
    const page = await browser.newPage({ viewport: { width, height } })
    const consoleErrors = []
    const pageErrors = []
    const failedRequests = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('pageerror', (error) => pageErrors.push(String(error)))
    page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`))

    await page.goto(`${origin}${testCase.path}`, { waitUntil: 'domcontentloaded' })
    await page.evaluate(async () => {
      await document.fonts.ready
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
      document.querySelectorAll('.section-reveal').forEach((element) => element.classList.add('is-visible'))
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y)
        await new Promise((resolve) => requestAnimationFrame(resolve))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(250)

    const snapshot = await page.evaluate(() => {
      const styleOf = (selector) => {
        const element = document.querySelector(selector)
        if (!element) return null
        const style = getComputedStyle(element)
        return {
          family: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          lineHeight: style.lineHeight,
        }
      }

      return {
        fontsReady: document.fonts.status === 'loaded',
        cormorantLoaded: document.fonts.check('500 48px "Cormorant Garamond"'),
        spectralLoaded: document.fonts.check('400 16px Spectral'),
        marckRequired: Boolean(document.querySelector('.hero-script')),
        marckLoaded: !document.querySelector('.hero-script') || document.fonts.check('400 32px "Marck Script"'),
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        nestedOverflow: [...document.querySelectorAll('*')].filter((element) => {
          const style = getComputedStyle(element)
          return (style.overflowX === 'auto' || style.overflowX === 'scroll') && element.scrollWidth > element.clientWidth + 1
        }).length,
        type: {
          body: styleOf('body'),
          hero: styleOf('h1'),
          heading: styleOf('h2'),
          paragraph: styleOf('p'),
          script: styleOf('.hero-script, .inner-hero__stamp strong'),
        },
      }
    })

    const screenshotPath = `${outputDir}/typography-${testCase.name}-${width}.png`
    await page.screenshot({ path: screenshotPath, fullPage: true })
    results.push({
      page: testCase.path,
      viewport: `${width}x${height}`,
      screenshot: screenshotPath,
      consoleErrors,
      pageErrors,
      failedRequests,
      ...snapshot,
    })
    await page.close()
  }
}

await browser.close()
const resultPath = `${outputDir}/typography-check-results.json`
await writeFile(resultPath, `${JSON.stringify(results, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ resultPath, results }, null, 2))

if (results.some((result) => result.overflow || result.nestedOverflow || result.consoleErrors.length || result.pageErrors.length || result.failedRequests.length || !result.fontsReady || !result.cormorantLoaded || !result.spectralLoaded || !result.marckLoaded)) {
  process.exitCode = 1
}
