import { chromium } from 'playwright'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

async function run() {
  const docsDir = path.resolve('docs')
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true })

  // Start Vite preview server on dist
  const server = await preview({ preview: { port: 4173, host: '127.0.0.1' } })
  const url = 'http://127.0.0.1:4173'
  console.log(`Preview server running at ${url}`)

  const browser = await chromium.launch()

  try {
    // 1. Desktop 1440px
    console.log('Testing Desktop 1440px...')
    const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page1440.goto(`${url}/`, { waitUntil: 'networkidle' })

    const seoSection = page1440.locator('.home-seo-article')
    await seoSection.scrollIntoViewIfNeeded()
    await page1440.waitForTimeout(500)
    await page1440.screenshot({ path: 'docs/seo-article-desktop-1440.png', clip: await seoSection.boundingBox() })

    const faqSection = page1440.locator('.home-faq-section')
    await faqSection.scrollIntoViewIfNeeded()
    await page1440.waitForTimeout(500)
    await page1440.screenshot({ path: 'docs/seo-faq-desktop-1440.png', clip: await faqSection.boundingBox() })

    // Test FAQ interactive click
    const secondFaq = faqSection.locator('.home-faq-item').nth(1)
    await secondFaq.locator('summary').click()
    await page1440.waitForTimeout(300)
    await page1440.screenshot({ path: 'docs/seo-faq-opened-desktop-1440.png', clip: await faqSection.boundingBox() })

    // 2. Mobile 390px
    console.log('Testing Mobile 390px...')
    const page390 = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })
    await page390.goto(`${url}/`, { waitUntil: 'networkidle' })

    const mobileSeo = page390.locator('.home-seo-article')
    await mobileSeo.scrollIntoViewIfNeeded()
    await page390.waitForTimeout(500)
    await page390.screenshot({ path: 'docs/seo-article-mobile-390.png', clip: await mobileSeo.boundingBox() })

    const mobileFaq = page390.locator('.home-faq-section')
    await mobileFaq.scrollIntoViewIfNeeded()
    await page390.waitForTimeout(500)
    await page390.screenshot({ path: 'docs/seo-faq-mobile-390.png', clip: await mobileFaq.boundingBox() })

    // 3. Test Pereval Vosmerka page
    console.log('Testing Pereval Vosmerka page...')
    const pageVosm = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await pageVosm.goto(`${url}/detail/pereval-vosmerka/`, { waitUntil: 'networkidle' })
    const vosmItinerary = pageVosm.locator('.route-itinerary')
    await vosmItinerary.scrollIntoViewIfNeeded()
    await pageVosm.waitForTimeout(500)
    await pageVosm.screenshot({ path: 'docs/seo-pereval-vosmerka-itinerary.png', clip: await vosmItinerary.boundingBox() })

    console.log('All visual verification screenshots captured successfully!')
  } finally {
    await browser.close()
    await server.httpServer.close()
  }
}

run().catch((err) => {
  console.error('Error verifying SEO components:', err)
  process.exit(1)
})
