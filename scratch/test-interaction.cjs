const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:5173/#home-price-calculator', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Click on "Рассвет Бермамыт" chip
  const chips = await page.$$('.trip-planner__quick-chip');
  console.log('Total quick chips found:', chips.length);
  
  // Click on chip 1 (Рассвет Бермамыт)
  if (chips.length > 1) {
    await chips[1].click();
    await page.waitForTimeout(400);
    const passCode = await page.$eval('.trip-ticket__pass-id code', el => el.textContent);
    const priceText = await page.$eval('.trip-ticket__price-sum', el => el.textContent);
    console.log('After clicking Рассвет Бермамыт: Code =', passCode, ', Price =', priceText);
    await page.$('#home-price-calculator').then(el => el.screenshot({ path: 'scratch/calc-rassvet.png' }));
  }

  // Click on chip 2 (Домбай / Эльбрус)
  if (chips.length > 2) {
    await chips[2].click();
    await page.waitForTimeout(400);
    const passCode = await page.$eval('.trip-ticket__pass-id code', el => el.textContent);
    const priceText = await page.$eval('.trip-ticket__price-sum', el => el.textContent);
    console.log('After clicking Домбай: Code =', passCode, ', Price =', priceText);
    await page.$('#home-price-calculator').then(el => el.screenshot({ path: 'scratch/calc-dombay.png' }));
  }

  await browser.close();
  console.log('Interaction test completed successfully');
})();
