const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: '1920', width: 1920, height: 1000 },
    { name: '1440', width: 1440, height: 900 },
    { name: '1280', width: 1280, height: 800 },
    { name: '1024', width: 1024, height: 768 },
    { name: '390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Apply proper full-backdrop CSS
    await page.evaluate(() => {
      const backdrop = document.querySelector('.footer-ridge-backdrop');
      const img = backdrop.querySelector('img');
      backdrop.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
      img.style.cssText = 'position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; min-width: 1200px; height: 100%; object-fit: cover; object-position: center bottom; opacity: 0.18; mix-blend-mode: multiply;';
    });

    const footer = await page.$('.footer-section');
    if (footer) {
      await footer.screenshot({ path: `scratch/footer-${vp.name}-test.png` });
    }
    await page.close();
  }

  await browser.close();
  console.log('All viewports tested');
})();
