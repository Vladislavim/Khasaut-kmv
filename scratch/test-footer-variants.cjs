const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll down so footer is reached
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Variant A: full height, object-fit cover, opacity 0.22, mask-image gradient
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    if (!backdrop) return;
    backdrop.style.cssText = `
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      z-index: 0 !important;
      overflow: hidden !important;
      opacity: 0.25 !important;
    `;
    const img = backdrop.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.style.cssText = `
        position: absolute !important;
        bottom: 0 !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 100% !important;
        min-width: 1400px !important;
        max-width: 2200px !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center bottom !important;
        mix-blend-mode: multiply !important;
        -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%) !important;
        mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%) !important;
      `;
    }
  });

  await page.waitForTimeout(500);
  const footerA = await page.$('.footer-section');
  if (footerA) {
    await footerA.screenshot({ path: 'scratch/footer-variant-a.png' });
  }

  // Variant B: opacity 0.35, slightly more prominent
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    if (backdrop) backdrop.style.opacity = '0.35';
  });
  await page.waitForTimeout(200);
  const footerB = await page.$('.footer-section');
  if (footerB) {
    await footerB.screenshot({ path: 'scratch/footer-variant-b.png' });
  }

  // Variant C: opacity 0.18, subtle
  await page.evaluate(() => {
    const backdrop = document.querySelector('.footer-ridge-backdrop');
    if (backdrop) backdrop.style.opacity = '0.18';
  });
  await page.waitForTimeout(200);
  const footerC = await page.$('.footer-section');
  if (footerC) {
    await footerC.screenshot({ path: 'scratch/footer-variant-c.png' });
  }

  // Also test mobile at 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  const footerMobile = await page.$('.footer-section');
  if (footerMobile) {
    await footerMobile.screenshot({ path: 'scratch/footer-variant-mobile.png' });
  }

  await browser.close();
  console.log('Variants generated!');
})();
