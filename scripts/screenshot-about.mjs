import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('artifacts/spacing-check', { recursive: true });

const browser = await chromium.launch();
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await mobile.newPage();
await page.goto('http://localhost:4173/about/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Full page only
await page.screenshot({ path: 'artifacts/spacing-check/about-mobile-full.png', fullPage: true });

await browser.close();
console.log('Done');
