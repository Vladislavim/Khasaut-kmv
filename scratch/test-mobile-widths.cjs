const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);

  const widths = [750, 950, 1150, 1400];
  for (const w of widths) {
    await page.evaluate((width) => {
      const backdrop = document.querySelector('.footer-ridge-backdrop');
      if (!backdrop) return;
      backdrop.style.cssText = 'position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none !important; z-index: 0 !important; overflow: hidden !important; opacity: 0.22 !important;';
      const img = backdrop.querySelector('img');
      if (!img) return;
      img.loading = 'eager';
      img.style.cssText = 'position: absolute !important; bottom: 0 !important; left: 50% !important; transform: translateX(-50%) !important; width: 100% !important; min-width: ' + width + 'px !important; max-width: 2400px !important; height: 100% !important; object-fit: cover !important; object-position: center bottom !important; mix-blend-mode: multiply !important; -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%) !important; mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%) !important;';
    }, w);
    await page.waitForTimeout(200);
    const footer = await page.$('.footer-section');
    if (footer) {
      await footer.screenshot({ path: 'scratch/mobile-w' + w + '.png' });
    }
  }
  await browser.close();
  console.log('Mobile width tests complete!');
})();
