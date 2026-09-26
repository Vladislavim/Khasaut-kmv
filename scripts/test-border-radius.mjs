import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('audit/border-radius');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Desktop viewport 1440x900
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('1. Testing Homepage at 1440px...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Screenshot hero collage
  const heroCollage = page.locator('.hero-collage');
  if (await heroCollage.isVisible()) {
    await heroCollage.screenshot({ path: path.join(outDir, '01-homepage-hero-collage.png') });
  }

  // Screenshot featured trips
  const featuredSection = page.locator('.featured-trips-section');
  if (await featuredSection.isVisible()) {
    await featuredSection.screenshot({ path: path.join(outDir, '02-homepage-featured-trips.png') });
  }

  // Screenshot routes section
  const routesSection = page.locator('.routes-section');
  if (await routesSection.isVisible()) {
    await routesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await routesSection.screenshot({ path: path.join(outDir, '03-homepage-routes-section.png') });
  }

  // Screenshot quick calc section
  const quickCalc = page.locator('.quick-calc-section');
  if (await quickCalc.isVisible()) {
    await quickCalc.screenshot({ path: path.join(outDir, '04-homepage-quick-calc.png') });
  }

  // Screenshot trip-cta
  const tripCta = page.locator('.trip-cta');
  if (await tripCta.isVisible()) {
    await tripCta.screenshot({ path: path.join(outDir, '05-homepage-trip-cta.png') });
  }

  console.log('2. Testing /excursions at 1440px...');
  await page.goto('http://127.0.0.1:5173/excursions', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const innerHero = page.locator('.inner-hero');
  if (await innerHero.isVisible()) {
    await innerHero.screenshot({ path: path.join(outDir, '06-excursions-hero-slider.png') });
  }

  const catalogGrid = page.locator('.inner-catalog-grid');
  if (await catalogGrid.isVisible()) {
    await catalogGrid.screenshot({ path: path.join(outDir, '07-excursions-catalog-cards.png') });
  }

  const innerNote = page.locator('.inner-note');
  if (await innerNote.isVisible()) {
    await innerNote.screenshot({ path: path.join(outDir, '08-excursions-inner-note.png') });
  }

  console.log('3. Testing /prices at 1440px...');
  await page.goto('http://127.0.0.1:5173/prices', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const pricesSheet = page.locator('.prices-sheet-section');
  if (await pricesSheet.isVisible()) {
    await pricesSheet.screenshot({ path: path.join(outDir, '09-prices-sheet-section.png') });
  }

  console.log('4. Testing /detail/dzhily-su-bermamyt at 1440px...');
  await page.goto('http://127.0.0.1:5173/detail/dzhily-su-bermamyt', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const itinerary = page.locator('.route-itinerary');
  if (await itinerary.isVisible()) {
    await itinerary.screenshot({ path: path.join(outDir, '10-detail-itinerary.png') });
  }

  const practical = page.locator('.route-practical');
  if (await practical.isVisible()) {
    await practical.screenshot({ path: path.join(outDir, '11-detail-practical.png') });
  }

  console.log('5. Testing /contact at 1440px...');
  await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const contactLayout = page.locator('.inner-contact-layout');
  if (await contactLayout.isVisible()) {
    await contactLayout.screenshot({ path: path.join(outDir, '13-contact-layout.png') });
  }

  console.log('6. Testing Mobile (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({ path: path.join(outDir, '12-mobile-home-viewport.png') });

  console.log('All screenshots captured in', outDir);
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
