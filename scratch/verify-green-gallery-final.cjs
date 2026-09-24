const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // 1. Contact Page Desktop 1440
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await page1440.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page1440.waitForTimeout(500);
  await page1440.screenshot({ path: 'scratch/verified-contact-green-1440.png' });
  await page1440.screenshot({ path: 'scratch/verified-contact-full-1440.png', fullPage: true });
  await page1440.close();

  // 2. Contact Page Mobile 390
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page390.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await page390.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page390.waitForTimeout(500);
  await page390.screenshot({ path: 'scratch/verified-contact-green-390.png' });
  await page390.close();

  // 3. Homepage Desktop 1440
  const home1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await home1440.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await home1440.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await home1440.waitForTimeout(500);
  await home1440.screenshot({ path: 'scratch/verified-home-green-1440.png' });
  await home1440.close();

  // 4. Homepage Mobile 390
  const home390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await home390.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await home390.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await home390.waitForTimeout(500);
  await home390.screenshot({ path: 'scratch/verified-home-green-390.png' });
  await home390.close();

  await browser.close();
  console.log('All verification screenshots saved successfully!');
})();
