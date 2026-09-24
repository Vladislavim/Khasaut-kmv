const { chromium } = require('playwright');

async function testFooters() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/current-footer-desktop.png' });
  await browser.close();
}

testFooters().catch(console.error);
