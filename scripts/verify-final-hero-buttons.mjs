import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();

  // 1. Mobile (390px)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit/final-hero-mobile-390.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await page.close();
  }

  // 2. Tablet (768px)
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 900 }, deviceScaleFactor: 1.5 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const box = await page.locator('.hero-actions').boundingBox();
    if (box) {
      await page.screenshot({
        path: 'audit/final-hero-tablet-768.png',
        clip: { x: 0, y: Math.max(0, box.y - 40), width: 600, height: 260 }
      });
    }
    await page.close();
  }

  // 3. Desktop (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const box = await page.locator('.hero-actions').boundingBox();
    if (box) {
      await page.screenshot({
        path: 'audit/final-hero-desktop-1440.png',
        clip: { x: 0, y: Math.max(0, box.y - 60), width: 900, height: 350 }
      });
    }
    await page.close();
  }

  await browser.close();
  console.log('All final hero screenshots captured!');
}

main().catch(console.error);
