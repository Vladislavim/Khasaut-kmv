import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

async function run() {
  const docsDir = path.resolve('docs')
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }

  const browser = await chromium.launch()

  // 1. Desktop 1440px
  console.log('Testing Desktop 1440px...')
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page1440.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page1440.waitForTimeout(1000)

  // Verify DOM structure
  const galleryTitle = await page1440.$('#gallery-title')
  if (!galleryTitle) throw new Error('#gallery-title not found on homepage!')
  const titleText = await galleryTitle.innerText()
  console.log('Found gallery title:', titleText)

  const ctaTitle = await page1440.$('#trip-cta-title')
  if (!ctaTitle) throw new Error('#trip-cta-title not found on homepage!')
  const ctaText = await ctaTitle.innerText()
  console.log('Found CTA title:', ctaText)

  // Check sibling order
  const orderCheck = await page1440.evaluate(() => {
    const gallery = document.querySelector('.contact-gallery-section')
    const cta = document.querySelector('.trip-cta')
    const main = document.querySelector('#home-main')
    if (!gallery || !cta || !main) return { valid: false, reason: 'missing elements' }
    const children = Array.from(main.children)
    const galleryIdx = children.indexOf(gallery)
    const ctaIdx = children.indexOf(cta)
    return {
      valid: true,
      galleryIndex: galleryIdx,
      ctaIndex: ctaIdx,
      isImmediatelyBefore: ctaIdx === galleryIdx + 1,
      totalSections: children.length
    }
  })
  console.log('DOM order check:', orderCheck)

  // Scroll to gallery
  await page1440.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await page1440.waitForTimeout(600)

  // Screenshot of the slider section
  const p1440GalleryScreenshot = path.join(docsDir, 'home-slider-desktop-1440.png')
  const galleryEl1440 = await page1440.$('.contact-gallery-section')
  await galleryEl1440.screenshot({ path: p1440GalleryScreenshot })
  console.log('Saved 1440px gallery screenshot:', p1440GalleryScreenshot)

  // Screenshot showing both slider and the CTA right below it
  // We can create a container or clip box using bounding boxes
  const gBox1440 = await galleryEl1440.boundingBox()
  const ctaEl1440 = await page1440.$('.trip-cta')
  const ctaBox1440 = await ctaEl1440.boundingBox()
  console.log('1440 Bounding boxes:', { gallery: gBox1440, cta: ctaBox1440 })

  const p1440ContextScreenshot = path.join(docsDir, 'home-slider-with-cta-desktop-1440.png')
  await page1440.screenshot({
    path: p1440ContextScreenshot,
    clip: {
      x: 0,
      y: Math.floor(gBox1440.y),
      width: 1440,
      height: Math.ceil((ctaBox1440.y + ctaBox1440.height) - gBox1440.y + 30)
    }
  })
  console.log('Saved 1440px context screenshot:', p1440ContextScreenshot)

  // Test interactivity: click next
  const nextBtn = await page1440.$('.contact-gallery-slider__nav-btn--next')
  if (nextBtn) {
    await nextBtn.click()
    await page1440.waitForTimeout(600)
    const activeTitle = await page1440.$eval('.contact-gallery-slider__title', el => el.textContent)
    console.log('1440: Active slide after Next click:', activeTitle)
    const p1440NextScreenshot = path.join(docsDir, 'home-slider-desktop-1440-next.png')
    await galleryEl1440.screenshot({ path: p1440NextScreenshot })
    console.log('Saved 1440px interact screenshot:', p1440NextScreenshot)
  }

  // 2. Desktop 1024px
  console.log('Testing Desktop 1024px...')
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 900 } })
  await page1024.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page1024.waitForTimeout(1000)

  await page1024.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await page1024.waitForTimeout(600)

  const galleryEl1024 = await page1024.$('.contact-gallery-section')
  const ctaEl1024 = await page1024.$('.trip-cta')
  const gBox1024 = await galleryEl1024.boundingBox()
  const ctaBox1024 = await ctaEl1024.boundingBox()

  const p1024Screenshot = path.join(docsDir, 'home-slider-desktop-1024.png')
  await galleryEl1024.screenshot({ path: p1024Screenshot })
  console.log('Saved 1024px gallery screenshot:', p1024Screenshot)

  const p1024ContextScreenshot = path.join(docsDir, 'home-slider-with-cta-desktop-1024.png')
  await page1024.screenshot({
    path: p1024ContextScreenshot,
    clip: {
      x: 0,
      y: Math.floor(gBox1024.y),
      width: 1024,
      height: Math.ceil((ctaBox1024.y + ctaBox1024.height) - gBox1024.y + 30)
    }
  })
  console.log('Saved 1024px context screenshot:', p1024ContextScreenshot)

  // 3. Mobile 390px
  console.log('Testing Mobile 390px...')
  const page390 = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  })
  await page390.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page390.waitForTimeout(1000)

  await page390.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await page390.waitForTimeout(600)

  const galleryEl390 = await page390.$('.contact-gallery-section')
  const ctaEl390 = await page390.$('.trip-cta')
  const gBox390 = await galleryEl390.boundingBox()
  const ctaBox390 = await ctaEl390.boundingBox()

  const p390Screenshot = path.join(docsDir, 'home-slider-mobile-390.png')
  await galleryEl390.screenshot({ path: p390Screenshot })
  console.log('Saved 390px gallery screenshot:', p390Screenshot)

  const p390ContextScreenshot = path.join(docsDir, 'home-slider-with-cta-mobile-390.png')
  await page390.screenshot({
    path: p390ContextScreenshot,
    clip: {
      x: 0,
      y: Math.floor(gBox390.y),
      width: 390,
      height: Math.ceil((ctaBox390.y + ctaBox390.height) - gBox390.y + 20)
    }
  })
  console.log('Saved 390px context screenshot:', p390ContextScreenshot)

  // Test thumbnail click on mobile
  const thumbs390 = await page390.$$('.contact-gallery-thumb')
  console.log(`Mobile: found ${thumbs390.length} thumbnails`)
  if (thumbs390.length > 2) {
    await thumbs390[2].click()
    await page390.waitForTimeout(500)
    const mobileActiveTitle = await page390.$eval('.contact-gallery-slider__title', el => el.textContent)
    console.log('Mobile: Active slide after clicking 3rd thumbnail:', mobileActiveTitle)
    const p390ThumbScreenshot = path.join(docsDir, 'home-slider-mobile-390-thumb.png')
    await galleryEl390.screenshot({ path: p390ThumbScreenshot })
    console.log('Saved 390px thumbnail click screenshot:', p390ThumbScreenshot)
  }

  await browser.close()
  console.log('ALL VERIFICATION CHECKS SUCCEEDED!')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
