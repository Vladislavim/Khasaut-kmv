const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5173/prices', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  const sheet = await page.$('.prices-sheet-section');
  if (sheet) {
    await sheet.screenshot({ path: 'scratch/prices-desktop-sheet.png' });
  }

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5173/prices', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  const mobileSheet = await mobilePage.$('.prices-sheet-section');
  if (mobileSheet) {
    await mobileSheet.screenshot({ path: 'scratch/prices-mobile-sheet.png' });
  }

  await browser.close();
  console.log('Prices page captured');
})();
