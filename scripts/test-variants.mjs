import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();

  // Test Variant A: Crisp White with Forest Border
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `
        .hero-actions .hero-cta--secondary {
          background: #ffffff !important;
          color: #102e21 !important;
          border: 1.5px solid #102e21 !important;
          box-shadow: 0 4px 12px rgba(16, 46, 33, 0.12) !important;
          font-weight: 700 !important;
        }
      `
    });
    await page.screenshot({ path: 'audit/var-a-white-forest.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await page.close();
  }

  // Test Variant B: Warm Brand Gold Fill
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `
        .hero-actions .hero-cta--secondary {
          background: #c5a059 !important;
          color: #102e21 !important;
          border: 1px solid rgba(16, 46, 33, 0.25) !important;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.3) !important;
          font-weight: 700 !important;
        }
      `
    });
    await page.screenshot({ path: 'audit/var-b-gold.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await page.close();
  }

  // Test Variant C: Crisp White with Gold Border
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `
        .hero-actions .hero-cta--secondary {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #102e21 !important;
          border: 1.5px solid #b8934a !important;
          box-shadow: 0 4px 14px rgba(16, 46, 33, 0.1) !important;
          font-weight: 700 !important;
        }
      `
    });
    await page.screenshot({ path: 'audit/var-c-white-gold.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await page.close();
  }

  // Test Variant D: Subtle Frosted Glass with Forest Outline
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `
        .hero-actions .hero-cta--secondary {
          background: rgba(255, 255, 255, 0.82) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          color: #102e21 !important;
          border: 1.5px solid #1b3d2b !important;
          box-shadow: 0 4px 12px rgba(16, 46, 33, 0.1) !important;
          font-weight: 700 !important;
        }
      `
    });
    await page.screenshot({ path: 'audit/var-d-forest-outline.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await page.close();
  }

  await browser.close();
  console.log('All variants generated successfully');
}

main().catch(console.error);
