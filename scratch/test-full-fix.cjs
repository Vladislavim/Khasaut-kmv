const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const footer = await page.$('.footer-section');
  await footer.scrollIntoViewIfNeeded();

  // Test Fix 1: Full height container, object-fit: cover, center bottom
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; object-position: center bottom; mix-blend-mode: multiply; opacity: 0.18;';
  });
  await page.waitForTimeout(300);
  await footer.screenshot({ path: 'scratch/fix-1.png' });

  // Test Fix 2: Full height container, object-fit: contain, bottom center (shows full natural mountain silhouette from base to peak!)
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
    img.style.cssText = 'position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 1920px; height: 100%; object-fit: contain; object-position: center bottom; mix-blend-mode: multiply; opacity: 0.22;';
  });
  await page.waitForTimeout(300);
  await footer.screenshot({ path: 'scratch/fix-2.png' });

  // Test Fix 3: Full height container, with gradient mask fade at top so peaks fade out softly if tall
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    const img = backdrop.querySelector('img');
    backdrop.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
    img.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center bottom; mix-blend-mode: multiply; opacity: 0.22; -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%); mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%);';
  });
  await page.waitForTimeout(300);
  await footer.screenshot({ path: 'scratch/fix-3.png' });

  await browser.close();
  console.log('Fixes captured');
})();
