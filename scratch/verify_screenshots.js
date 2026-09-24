const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyPages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  const outDir = path.resolve('scratch/screenshots-archive-info');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const urls = [
    { name: 'excursions', url: 'http://localhost:5173/excursions' },
    { name: 'routes', url: 'http://localhost:5173/routes' },
    { name: 'thermal-springs', url: 'http://localhost:5173/thermal-springs' },
    { name: 'horse-rides', url: 'http://localhost:5173/horse-rides' },
    { name: 'about', url: 'http://localhost:5173/about' },
    { name: 'detail-dzhily-su', url: 'http://localhost:5173/detail/dzhily-su' },
    { name: 'detail-dombay', url: 'http://localhost:5173/detail/dombay' },
    { name: 'detail-aktoprak', url: 'http://localhost:5173/detail/aktoprak' },
  ];

  for (const item of urls) {
    console.log(`Navigating to ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, `${item.name}.png`), fullPage: false });
    console.log(`  Screenshot saved: ${item.name}.png`);
  }

  await browser.close();
  console.log('All verification screenshots saved successfully!');
}

verifyPages().catch(err => {
  console.error(err);
  process.exit(1);
});
