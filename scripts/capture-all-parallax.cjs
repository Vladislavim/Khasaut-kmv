const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Services section
  const services = await page.$('.services-section');
  if (services) {
    await services.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'audit/parallax-desktop-services.png' });
  }

  // 2. Routes section
  const routes = await page.$('.routes-section');
  if (routes) {
    await routes.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'audit/parallax-desktop-routes.png' });
  }

  // 3. FAQ section
  const faq = await page.$('.home-faq-section');
  if (faq) {
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'audit/parallax-desktop-faq.png' });
  }

  await browser.close();
  console.log('Screenshots saved for services, routes, faq!');
})();
