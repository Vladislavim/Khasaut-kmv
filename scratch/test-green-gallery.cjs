const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // Test Contact Page
  const pageContact = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageContact.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });

  await pageContact.addStyleTag({
    content: `
      .contact-gallery-section {
        background: var(--forest-deep, #102e21) !important;
        color: #f5efe6 !important;
        border-top: none !important;
        position: relative !important;
      }
      .contact-gallery-section .inner-kicker {
        color: #c5a059 !important;
        font-size: 0.82rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.14em !important;
        text-transform: uppercase !important;
      }
      .contact-gallery-section .contact-gallery-header h2 {
        color: #f5efe6 !important;
      }
      .contact-gallery-section .contact-gallery-header p {
        color: rgba(245, 239, 230, 0.82) !important;
      }
      .contact-gallery-slider__stage {
        border: 1px solid rgba(255, 255, 255, 0.16) !important;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35) !important;
      }
      .contact-gallery-thumbnails {
        scrollbar-color: rgba(255, 255, 255, 0.22) transparent !important;
      }
      .contact-gallery-thumbnails::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.22) !important;
      }
      .contact-gallery-thumb {
        background: #0b1e15 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        opacity: 0.65;
      }
      .contact-gallery-thumb:hover {
        opacity: 0.95;
        border-color: rgba(255, 255, 255, 0.4) !important;
      }
      .contact-gallery-thumb.is-active {
        opacity: 1 !important;
        border-color: #c5a059 !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(197, 160, 89, 0.45) !important;
      }
    `
  });

  await pageContact.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView();
  });
  await pageContact.waitForTimeout(400);
  await pageContact.screenshot({ path: 'scratch/contact-green-1440.png' });

  // Mobile Contact Page
  await pageContact.setViewportSize({ width: 390, height: 844 });
  await pageContact.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView();
  });
  await pageContact.waitForTimeout(400);
  await pageContact.screenshot({ path: 'scratch/contact-green-390.png' });
  await pageContact.close();

  // Test Homepage
  const pageHome = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHome.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await pageHome.addStyleTag({
    content: `
      .contact-gallery-section {
        background: var(--forest-deep, #102e21) !important;
        color: #f5efe6 !important;
        border-top: none !important;
        position: relative !important;
      }
      .contact-gallery-section .inner-kicker {
        color: #c5a059 !important;
        font-size: 0.82rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.14em !important;
        text-transform: uppercase !important;
      }
      .contact-gallery-section .contact-gallery-header h2 {
        color: #f5efe6 !important;
      }
      .contact-gallery-section .contact-gallery-header p {
        color: rgba(245, 239, 230, 0.82) !important;
      }
      .contact-gallery-slider__stage {
        border: 1px solid rgba(255, 255, 255, 0.16) !important;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35) !important;
      }
      .contact-gallery-thumbnails {
        scrollbar-color: rgba(255, 255, 255, 0.22) transparent !important;
      }
      .contact-gallery-thumbnails::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.22) !important;
      }
      .contact-gallery-thumb {
        background: #0b1e15 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        opacity: 0.65;
      }
      .contact-gallery-thumb:hover {
        opacity: 0.95;
        border-color: rgba(255, 255, 255, 0.4) !important;
      }
      .contact-gallery-thumb.is-active {
        opacity: 1 !important;
        border-color: #c5a059 !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(197, 160, 89, 0.45) !important;
      }
    `
  });
  await pageHome.evaluate(() => {
    const el = document.querySelector('.contact-gallery-section');
    if (el) el.scrollIntoView();
  });
  await pageHome.waitForTimeout(400);
  await pageHome.screenshot({ path: 'scratch/home-green-gallery-1440.png' });
  await pageHome.close();

  await browser.close();
  console.log('Green gallery screenshots captured!');
})();
