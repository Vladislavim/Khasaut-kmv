const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:5173/#home-price-calculator', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  
  const calc = await page.$('#home-price-calculator');
  if (calc) {
    await calc.screenshot({ path: 'scratch/calc-desktop-preview.png' });
  } else {
    await page.screenshot({ path: 'scratch/calc-desktop-page.png' });
  }

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5173/#home-price-calculator', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  const mobileCalc = await mobilePage.$('#home-price-calculator');
  if (mobileCalc) {
    await mobileCalc.screenshot({ path: 'scratch/calc-mobile-preview.png' });
  }

  await browser.close();
  console.log('Screenshots captured successfully');
})();
