const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  // Scroll to calculator
  const calc = await page.$('.quick-calc-section');
  if (calc) {
    await calc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // 1. With prompt bubble open
    await page.screenshot({ path: 'audit/calc-mobile-bubble-open.png', fullPage: false });
    console.log('Saved audit/calc-mobile-bubble-open.png');

    // 2. Dismiss prompt bubble (click close)
    const closeBtn = await page.$('.floating-messenger__drop-close');
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: 'audit/calc-mobile-fixed.png', fullPage: false });
    console.log('Saved audit/calc-mobile-fixed.png');
  }

  await browser.close();
})();
