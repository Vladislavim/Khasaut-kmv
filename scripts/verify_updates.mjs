import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/viman/.gemini/antigravity/brain/ae73e42e-440a-4e5d-b213-e3fb72ee678e';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('--- 1. Testing /detail/makhar ---');
  await page.goto('http://localhost:5173/detail/makhar', { waitUntil: 'networkidle' });

  // Check hero slider
  const slider = await page.$('.inner-hero-slider');
  console.log('Slider found:', !!slider);

  const counter = await page.$eval('.inner-hero-slider__counter', el => el.textContent.trim());
  console.log('Initial slider counter:', counter);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify-makhar-hero-slider-01.png') });

  // Click next button
  await page.click('.inner-hero-slider__arrow--next');
  await page.waitForTimeout(300);
  const counterAfterNext = await page.$eval('.inner-hero-slider__counter', el => el.textContent.trim());
  console.log('Counter after next:', counterAfterNext);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify-makhar-hero-slider-02.png') });

  // Check highlights section ("Что увидим по дороге") is NOT present
  const highlights = await page.$('.inner-detail-highlights');
  console.log('Highlights section ("Что увидим по дороге") present:', !!highlights);

  // Check section order
  const sectionClasses = await page.$$eval('main > section', sections => sections.map(s => s.className));
  console.log('Main sections order:', sectionClasses);

  // Scroll down to editorial and practical
  await page.evaluate(() => {
    const el = document.querySelector('.route-editorial');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify-makhar-editorial-practical.png') });

  // Test mobile view of makhar slider
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify-makhar-mobile-slider.png') });

  console.log('\n--- 2. Testing /excursions card click ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/excursions', { waitUntil: 'networkidle' });

  const excursionsCounter = await page.$eval('.inner-hero-slider__counter', el => el.textContent.trim());
  console.log('Excursions hero counter:', excursionsCounter);

  // Find the first route card and click its text body (not the button)
  const firstCard = await page.$('.inner-route-card');
  const cardTitle = await firstCard.$eval('h3', el => el.textContent.trim());
  console.log('First catalog card title:', cardTitle);

  // Click on the body of the card
  await firstCard.$eval('.inner-route-card__body p', el => el.click());
  await page.waitForTimeout(500);
  console.log('URL after clicking card body:', page.url());

  console.log('\n--- 3. Testing Homepage card click & hero intactness ---');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Verify homepage hero exists and has slides
  const homeHeroTitle = await page.$eval('.hero-section h1', el => el.textContent.trim());
  console.log('Home hero title:', homeHeroTitle);

  // Test clicking featured trip card body
  const firstFeatured = await page.$('.featured-trip-card');
  const featuredTitle = await firstFeatured.$eval('h3', el => el.textContent.trim());
  console.log('First featured trip title:', featuredTitle);

  await firstFeatured.$eval('.featured-trip-card__body p', el => el.click());
  await page.waitForTimeout(500);
  console.log('URL after clicking featured trip card body:', page.url());

  await browser.close();
  console.log('Verification finished successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
