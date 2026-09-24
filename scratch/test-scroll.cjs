const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const footer = await page.$('.footer-section');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('.footer-ridge-backdrop img');
    return {
      naturalWidth: img ? img.naturalWidth : null,
      naturalHeight: img ? img.naturalHeight : null,
      complete: img ? img.complete : null,
    };
  });
  console.log(imgInfo);
  await footer.screenshot({ path: 'scratch/footer-scrolled.png' });
  await browser.close();
})();
