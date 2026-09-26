const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // 1. Desktop 1440
  const p1440 = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await p1440.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await p1440.waitForTimeout(500);
  await p1440.screenshot({ path: 'audit/hero-natural-1440.png' });
  console.log('Saved audit/hero-natural-1440.png');

  // 2. Mobile 390
  const p390 = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p390.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await p390.waitForTimeout(500);
  await p390.screenshot({ path: 'audit/hero-natural-390.png' });
  console.log('Saved audit/hero-natural-390.png');

  await browser.close();
})();
