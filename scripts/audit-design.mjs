import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('artifacts/design-audit', { recursive: true });

const browser = await chromium.launch();

const pages = [
  { url: 'http://localhost:4173/', name: 'home' },
  { url: 'http://localhost:4173/excursions/', name: 'excursions' },
  { url: 'http://localhost:4173/detail/bermamyt/', name: 'bermamyt' },
  { url: 'http://localhost:4173/prices/', name: 'prices' },
  { url: 'http://localhost:4173/about/', name: 'about' },
  { url: 'http://localhost:4173/contact/', name: 'contact' },
];

for (const p of pages) {
  // Mobile — 1x scale, jpeg
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const mPage = await mCtx.newPage();
  await mPage.goto(p.url, { waitUntil: 'networkidle' });
  await mPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mPage.waitForTimeout(600);
  await mPage.evaluate(() => window.scrollTo(0, 0));
  await mPage.waitForTimeout(400);
  await mPage.screenshot({ path: `artifacts/design-audit/${p.name}-mobile.jpeg`, fullPage: true, type: 'jpeg', quality: 72 });
  await mCtx.close();

  // Desktop — 1280px wide, jpeg
  const dCtx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const dPage = await dCtx.newPage();
  await dPage.goto(p.url, { waitUntil: 'networkidle' });
  await dPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await dPage.waitForTimeout(600);
  await dPage.evaluate(() => window.scrollTo(0, 0));
  await dPage.waitForTimeout(400);
  await dPage.screenshot({ path: `artifacts/design-audit/${p.name}-desktop.jpeg`, fullPage: true, type: 'jpeg', quality: 72 });
  await dCtx.close();

  console.log(`Done: ${p.name}`);
}

await browser.close();
console.log('All screenshots saved to artifacts/design-audit/');
