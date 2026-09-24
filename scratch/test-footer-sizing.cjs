const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Test 1: Full-height container, bottom-aligned, object-fit: contain
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: visible;';
    img.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center bottom; opacity: 0.22; mix-blend-mode: multiply;';
  });
  await page.$('.footer-section').then(el => el.screenshot({ path: 'scratch/footer-opt1.png' }));

  // Test 2: Bottom-aligned, width: 100%, height: auto, bottom: 0 (natural aspect ratio)
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
    img.style.cssText = 'position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; min-width: 1300px; max-width: 1920px; height: auto; opacity: 0.26; mix-blend-mode: multiply;';
  });
  await page.$('.footer-section').then(el => el.screenshot({ path: 'scratch/footer-opt2.png' }));

  // Test 3: Like Option 2, but bottom: -20px with opacity 0.32
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
    img.style.cssText = 'position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 100%; min-width: 1400px; max-width: 2100px; height: auto; opacity: 0.32; mix-blend-mode: multiply; filter: contrast(1.05);';
  });
  await page.$('.footer-section').then(el => el.screenshot({ path: 'scratch/footer-opt3.png' }));

  await browser.close();
  console.log('Options captured');
})();
