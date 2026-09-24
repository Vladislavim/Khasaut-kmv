const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  const viewports = [
    { name: '1920', width: 1920, height: 1080 },
    { name: '1440', width: 1440, height: 900 },
    { name: '1024', width: 1024, height: 768 },
    { name: '768', width: 768, height: 1024 },
    { name: '390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const footer = await page.$('.footer-section');
    if (footer) {
      await footer.screenshot({ path: `scratch/final-footer-home-${vp.name}.png` });
    }
    await page.close();
  }

  // Also test Contact page at 1440 and 390
  const pageContact = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageContact.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await pageContact.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageContact.waitForTimeout(400);
  const footerContact = await pageContact.$('.footer-section');
  if (footerContact) {
    await footerContact.screenshot({ path: 'scratch/final-footer-contact-1440.png' });
  }
  await pageContact.close();

  const pageContactMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageContactMobile.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await pageContactMobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageContactMobile.waitForTimeout(400);
  const footerContactMob = await pageContactMobile.$('.footer-section');
  if (footerContactMob) {
    await footerContactMob.screenshot({ path: 'scratch/final-footer-contact-390.png' });
  }
  await pageContactMobile.close();

  // Also test Prices page at 1440
  const pagePrices = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pagePrices.goto('http://localhost:5173/prices', { waitUntil: 'networkidle' });
  await pagePrices.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pagePrices.waitForTimeout(400);
  const footerPrices = await pagePrices.$('.footer-section');
  if (footerPrices) {
    await footerPrices.screenshot({ path: 'scratch/final-footer-prices-1440.png' });
  }
  await pagePrices.close();

  await browser.close();
  console.log('All final footer screenshots captured!');
})();
