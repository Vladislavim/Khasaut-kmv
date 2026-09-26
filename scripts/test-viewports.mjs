import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  for (const width of [390, 480, 720, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const box = await page.locator('.hero-actions').boundingBox();
    if (box) {
      await page.screenshot({
        path: `audit/vp-${width}-hero-actions.png`,
        clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: Math.min(width, 520), height: 180 }
      });
      console.log(`Captured ${width}px`);
    }
    await page.close();
  }
  await browser.close();
}

main().catch(console.error);
