import { chromium } from 'playwright'

async function main() {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto('http://localhost:5173/detail/makhar/', { waitUntil: 'networkidle' })
  await p.waitForTimeout(600)
  const el = await p.$('#detail-highlights-title')
  if (el) await el.scrollIntoViewIfNeeded()
  await p.waitForTimeout(800)
  const sec = await p.$('.inner-detail-highlights')
  if (sec) await sec.screenshot({ path: 'docs/test-makhar-slider-scrolled.png' })
  await b.close()
}

main().catch(console.error)
