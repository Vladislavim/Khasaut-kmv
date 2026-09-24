const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scratch/contact-full-1024.png', fullPage: true });

  const slider = await page.$('.contact-photo-slider');
  if (slider) {
    await slider.screenshot({ path: 'scratch/contact-slider-1024.png' });
  }

  await browser.close();
  console.log('Contact full screenshot saved');
})();
