import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  // 1. Home page sections
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Quick Price Calculator
  const calc = page.locator('.quick-calc-section');
  await calc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await calc.screenshot({ path: 'audit/pattern-parallax-calc.png' });
  console.log('Captured Calculator patterns');

  // Routes Section
  const routes = page.locator('.routes-section');
  await routes.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await routes.screenshot({ path: 'audit/pattern-parallax-routes.png' });
  console.log('Captured Routes patterns');

  // FAQ Section
  const faq = page.locator('.home-faq-section');
  await faq.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await faq.screenshot({ path: 'audit/pattern-parallax-faq.png' });
  console.log('Captured FAQ patterns');

  // Test parallax scroll effect: read transforms before and after scroll
  await calc.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy({ top: -300, behavior: 'instant' }));
  await page.waitForTimeout(150);
  const transform1 = await page.locator('.quick-calc-pattern-left').evaluate((el) => el.style.transform);

  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'instant' }));
  await page.waitForTimeout(150);
  const transform2 = await page.locator('.quick-calc-pattern-left').evaluate((el) => el.style.transform);

  console.log('Parallax transform 1:', transform1);
  console.log('Parallax transform 2:', transform2);

  // 2. About page principles
  await page.goto('http://127.0.0.1:5173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const about = page.locator('.inner-section--principles');
  await about.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await about.screenshot({ path: 'audit/pattern-parallax-about.png' });
  console.log('Captured About patterns');

  // 3. Contact page info
  await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const contact = page.locator('.inner-section--contact-info');
  await contact.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await contact.screenshot({ path: 'audit/pattern-parallax-contact.png' });
  console.log('Captured Contact patterns');

  await browser.close();
  console.log('All pattern verifications completed successfully!');
}

main().catch(console.error);
