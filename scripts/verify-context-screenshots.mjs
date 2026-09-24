import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

async function run() {
  const docsDir = path.resolve('docs')
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }

  const browser = await chromium.launch()

  // 1. Desktop 1440px - capture full context
  const p1440 = await browser.newPage({ viewport: { width: 1440, height: 2200 } })
  await p1440.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p1440.waitForTimeout(1000)

  // Scroll to gallery
  await p1440.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await p1440.waitForTimeout(600)

  const context1440 = path.join(docsDir, 'home-slider-context-1440.png')
  const gEl1440 = await p1440.$('.contact-gallery-section')
  const cEl1440 = await p1440.$('.trip-cta')
  const gBox = await gEl1440.boundingBox()
  const cBox = await cEl1440.boundingBox()

  await p1440.screenshot({
    path: context1440,
    clip: {
      x: 0,
      y: Math.floor(gBox.y),
      width: 1440,
      height: Math.ceil((cBox.y + cBox.height) - gBox.y + 40)
    }
  })
  console.log('Saved 1440 context:', context1440)

  // 2. Desktop 1024px
  const p1024 = await browser.newPage({ viewport: { width: 1024, height: 2200 } })
  await p1024.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p1024.waitForTimeout(1000)

  await p1024.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await p1024.waitForTimeout(600)

  const context1024 = path.join(docsDir, 'home-slider-context-1024.png')
  const gEl1024 = await p1024.$('.contact-gallery-section')
  const cEl1024 = await p1024.$('.trip-cta')
  const gBox1024 = await gEl1024.boundingBox()
  const cBox1024 = await cEl1024.boundingBox()

  await p1024.screenshot({
    path: context1024,
    clip: {
      x: 0,
      y: Math.floor(gBox1024.y),
      width: 1024,
      height: Math.ceil((cBox1024.y + cBox1024.height) - gBox1024.y + 40)
    }
  })
  console.log('Saved 1024 context:', context1024)

  // 3. Mobile 390px - scroll to where slider meets trip-cta
  const p390 = await browser.newPage({
    viewport: { width: 390, height: 1600 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  })
  await p390.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p390.waitForTimeout(1000)

  await p390.evaluate(() => {
    document.querySelector('.contact-gallery-section')?.scrollIntoView({ block: 'start' })
  })
  await p390.waitForTimeout(600)

  const context390 = path.join(docsDir, 'home-slider-context-390.png')
  const gEl390 = await p390.$('.contact-gallery-section')
  const cEl390 = await p390.$('.trip-cta')
  const gBox390 = await gEl390.boundingBox()
  const cBox390 = await cEl390.boundingBox()

  await p390.screenshot({
    path: context390,
    clip: {
      x: 0,
      y: Math.floor(gBox390.y),
      width: 390,
      height: Math.ceil((cBox390.y + cBox390.height) - gBox390.y + 30)
    }
  })
  console.log('Saved 390 context:', context390)

  await browser.close()
}

run().catch(console.error)
