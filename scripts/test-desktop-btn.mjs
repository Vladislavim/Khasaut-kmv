import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();

  // Desktop test with white card button
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `
      .hero-actions .hero-cta--secondary {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.4rem !important;
        background: #ffffff !important;
        padding: 0.52rem 1.1rem !important;
        border-radius: 12px !important;
        border: 1.5px solid #102e21 !important;
        color: #102e21 !important;
        font-weight: 700 !important;
        text-decoration: none !important;
        box-shadow: 0 4px 12px rgba(16, 46, 33, 0.08) !important;
      }
    `
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'audit/test-desktop-white-btn.png', clip: { x: 0, y: 500, width: 900, height: 350 } });
  await page.close();
  await browser.close();
  console.log('Desktop white button captured');
}

main().catch(console.error);
