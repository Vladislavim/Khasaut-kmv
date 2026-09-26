import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('audit/slider-width');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  const testCases = [
    { url: 'http://127.0.0.1:5173/excursions', name: 'excursions-1440', width: 1440, height: 900 },
    { url: 'http://127.0.0.1:5173/excursions', name: 'excursions-1600', width: 1600, height: 1000 },
    { url: 'http://127.0.0.1:5173/routes', name: 'routes-1440', width: 1440, height: 900 },
    { url: 'http://127.0.0.1:5173/detail/dzhily-su-bermamyt', name: 'detail-dzhilysu-1440', width: 1440, height: 950 },
    { url: 'http://127.0.0.1:5173/thermal-springs', name: 'thermal-1440', width: 1440, height: 900 },
    { url: 'http://127.0.0.1:5173/excursions', name: 'excursions-mobile-390', width: 390, height: 844 },
    { url: 'http://127.0.0.1:5173/detail/dzhily-su-bermamyt', name: 'detail-dzhilysu-mobile-390', width: 390, height: 844 },
  ];

  for (const tc of testCases) {
    const page = await browser.newPage({ viewport: { width: tc.width, height: tc.height } });
    await page.goto(tc.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Get slider dimensions
    const sliderBox = await page.evaluate(() => {
      const el = document.querySelector('.inner-hero__slider-wrap');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement ? el.parentElement.getBoundingClientRect() : null;
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        parentWidth: parentRect ? Math.round(parentRect.width) : null
      };
    });

    console.log(`[${tc.name}] Slider dimensions:`, JSON.stringify(sliderBox));

    const shotPath = path.join(outDir, `${tc.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured in', outDir);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
