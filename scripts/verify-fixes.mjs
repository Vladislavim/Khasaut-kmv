import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  // 1. Homepage Other Formats
  await page.goto('http://localhost:5173/#routes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const routesSection = await page.$('.routes-section');
  if (routesSection) {
    await routesSection.screenshot({ path: 'docs/verify-desktop-other-formats-done.png' });
  }

  // 2. Routes catalog with Makhar
  await page.goto('http://localhost:5173/routes/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const catalog = await page.$('.inner-catalog-grid');
  if (catalog) {
    await catalog.screenshot({ path: 'docs/verify-routes-cards-done.png' });
  }

  // 3. Detail Makhar page
  await page.goto('http://localhost:5173/detail/makhar/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'docs/verify-detail-makhar-done.png', fullPage: false });

  await browser.close();
  console.log('[OK] Done capturing finished animations!');
}

main().catch(console.error);
