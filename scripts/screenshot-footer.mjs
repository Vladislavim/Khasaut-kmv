import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('artifacts/footer-check', { recursive: true });

const browser = await chromium.launch();

// --- About page mobile ---
const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mPage = await mCtx.newPage();
await mPage.goto('http://localhost:4173/about/', { waitUntil: 'networkidle' });
await mPage.waitForTimeout(800);
// Scroll to bottom to trigger IntersectionObserver reveals
await mPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await mPage.waitForTimeout(800);
await mPage.evaluate(() => window.scrollTo(0, 0));
await mPage.waitForTimeout(400);
await mPage.screenshot({ path: 'artifacts/footer-check/about-mobile-full.png', fullPage: true });
await mCtx.close();

// --- Home page mobile ---
const mCtx2 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mPage2 = await mCtx2.newPage();
await mPage2.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await mPage2.waitForTimeout(1200);
await mPage2.screenshot({ path: 'artifacts/footer-check/home-mobile-full.png', fullPage: true });
await mCtx2.close();

// --- About page desktop ---
const dCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dPage = await dCtx.newPage();
await dPage.goto('http://localhost:4173/about/', { waitUntil: 'networkidle' });
await dPage.waitForTimeout(1200);
await dPage.screenshot({ path: 'artifacts/footer-check/about-desktop-full.png', fullPage: true });
await dCtx.close();

await browser.close();
console.log('Done');
