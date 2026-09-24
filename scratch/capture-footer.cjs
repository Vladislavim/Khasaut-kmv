const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  const footer = await page.$('.footer-section');
  if (footer) {
    await footer.screenshot({ path: 'scratch/current-footer-1440.png' });
  }
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  const footerContact = await page.$('.footer-section');
  if (footerContact) {
    await footerContact.screenshot({ path: 'scratch/current-footer-contact.png' });
  }
  await browser.close();
  console.log('Screenshots captured successfully!');
})();
