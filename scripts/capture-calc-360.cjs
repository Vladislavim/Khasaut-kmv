const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 360, height: 740 },
    deviceScaleFactor: 2
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  const calc = await page.$('.quick-calc-section');
  if (calc) {
    await calc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'audit/calc-mobile-360px.png', fullPage: false });
    console.log('Saved audit/calc-mobile-360px.png');
  }

  await browser.close();
})();
