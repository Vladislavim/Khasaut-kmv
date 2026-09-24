import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('artifacts/spacing-check', { recursive: true });

const browser = await chromium.launch();

// Mobile hero
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mPage = await mobile.newPage();
await mPage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await mPage.waitForTimeout(1500);
await mPage.screenshot({ path: 'artifacts/spacing-check/mobile-hero.png', clip: { x:0, y:0, width:390, height:844 } });
await mPage.screenshot({ path: 'artifacts/spacing-check/mobile-full.png', fullPage: true });
await mobile.close();

// Desktop hero
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dPage = await desktop.newPage();
await dPage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await dPage.waitForTimeout(1500);
await dPage.screenshot({ path: 'artifacts/spacing-check/desktop-hero.png', clip: { x:0, y:0, width:1440, height:900 } });
await dPage.screenshot({ path: 'artifacts/spacing-check/desktop-full.png', fullPage: true });
await desktop.close();

await browser.close();
console.log('Screenshots saved to artifacts/spacing-check/');
