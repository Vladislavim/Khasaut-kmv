import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/viman/.gemini/antigravity/brain/ae73e42e-440a-4e5d-b213-e3fb72ee678e';

async function run() {
  const browser = await chromium.launch();

  console.log('Testing live site: https://khasaut-kmv.ru...');

  // 1. Live Home Desktop (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const response = await page.goto('https://khasaut-kmv.ru/', { waitUntil: 'networkidle' });
    console.log('Home HTTP status:', response?.status());
    await page.screenshot({ path: path.join(outDir, 'live-home-desktop.png') });
  }

  // 2. Live Home Mobile (390px)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto('https://khasaut-kmv.ru/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, 'live-home-mobile.png') });
  }

  // 3. Live Detail Page Dzhily-Su Desktop (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const res = await page.goto('https://khasaut-kmv.ru/detail/dzhily-su/', { waitUntil: 'networkidle' });
    console.log('Detail Dzhily-Su HTTP status:', res?.status());

    // Check that calculator is NOT in DOM
    const calcCount = await page.locator('.inner-detail-price').count();
    console.log('Calculator in DOM:', calcCount);

    // Scroll down to check itinerary
    const itinerary = page.locator('.route-itinerary');
    if (await itinerary.count() > 0) {
      await itinerary.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await itinerary.screenshot({ path: path.join(outDir, 'live-itinerary-desktop.png') });
    }

    // Scroll down to check interest picker
    const picker = page.locator('#inner-interest-picker');
    if (await picker.count() > 0) {
      await picker.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await picker.screenshot({ path: path.join(outDir, 'live-interest-picker-desktop.png') });
    }
  }

  // 4. Live Detail Page Dzhily-Su Mobile (390px)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto('https://khasaut-kmv.ru/detail/dzhily-su/', { waitUntil: 'networkidle' });

    const picker = page.locator('#inner-interest-picker');
    if (await picker.count() > 0) {
      await picker.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await picker.screenshot({ path: path.join(outDir, 'live-interest-picker-mobile.png') });
    }
  }

  // 5. Live Prices Page Desktop
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const res = await page.goto('https://khasaut-kmv.ru/prices/', { waitUntil: 'networkidle' });
    console.log('Prices HTTP status:', res?.status());
    await page.screenshot({ path: path.join(outDir, 'live-prices-desktop.png') });
  }

  await browser.close();
  console.log('Live verification complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
