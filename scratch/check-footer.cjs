const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const footer = await page.$('.footer-section');
  if (footer) {
    await footer.screenshot({ path: 'scratch/footer-current-desktop.png' });
  }

  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const mobileFooter = await mobilePage.$('.footer-section');
  if (mobileFooter) {
    await mobileFooter.screenshot({ path: 'scratch/footer-current-mobile.png' });
  }

  await browser.close();
  console.log('Footer screenshots saved');
})();
