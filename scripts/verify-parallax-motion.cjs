const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // 1. Desktop Test
  console.log('--- Testing Desktop (1440x900) ---');
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });

  await desktopPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  // Scroll to calculator
  const calc = await desktopPage.$('.quick-calc-section');
  if (calc) {
    const box = await calc.boundingBox();
    console.log('Quick Calc Y:', box.y);

    // Position 1: top of calc enters viewport
    await desktopPage.evaluate((y) => window.scrollTo(0, y - 500), box.y);
    await desktopPage.waitForTimeout(200);
    const transform1 = await desktopPage.evaluate(() => {
      const left = document.querySelector('.quick-calc-pattern-left');
      const right = document.querySelector('.quick-calc-pattern-right');
      return {
        left: left ? left.style.transform : null,
        right: right ? right.style.transform : null,
      };
    });
    console.log('Scroll Pos 1 Transforms:', transform1);
    await desktopPage.screenshot({ path: 'audit/parallax-desktop-pos1.png' });

    // Position 2: center of calc in viewport
    await desktopPage.evaluate((y) => window.scrollTo(0, y), box.y);
    await desktopPage.waitForTimeout(200);
    const transform2 = await desktopPage.evaluate(() => {
      const left = document.querySelector('.quick-calc-pattern-left');
      const right = document.querySelector('.quick-calc-pattern-right');
      return {
        left: left ? left.style.transform : null,
        right: right ? right.style.transform : null,
      };
    });
    console.log('Scroll Pos 2 Transforms:', transform2);
    await desktopPage.screenshot({ path: 'audit/parallax-desktop-pos2.png' });

    // Position 3: calc scrolled down further
    await desktopPage.evaluate((y) => window.scrollTo(0, y + 450), box.y);
    await desktopPage.waitForTimeout(200);
    const transform3 = await desktopPage.evaluate(() => {
      const left = document.querySelector('.quick-calc-pattern-left');
      const right = document.querySelector('.quick-calc-pattern-right');
      return {
        left: left ? left.style.transform : null,
        right: right ? right.style.transform : null,
      };
    });
    console.log('Scroll Pos 3 Transforms:', transform3);
    await desktopPage.screenshot({ path: 'audit/parallax-desktop-pos3.png' });
  }

  // 2. Mobile Test (390x844)
  console.log('\n--- Testing Mobile (390x844) ---');
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });

  await mobilePage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileCalc = await mobilePage.$('.quick-calc-section');
  if (mobileCalc) {
    const box = await mobileCalc.boundingBox();

    // Scroll to center of calc on mobile
    await mobilePage.evaluate((y) => window.scrollTo(0, y - 100), box.y);
    await mobilePage.waitForTimeout(300);

    const mobileTransforms = await mobilePage.evaluate(() => {
      const left = document.querySelector('.quick-calc-pattern-left');
      const right = document.querySelector('.quick-calc-pattern-right');
      const leftStyle = window.getComputedStyle(left);
      return {
        leftTransform: left ? left.style.transform : null,
        leftDisplay: leftStyle ? leftStyle.display : null,
        leftOpacity: leftStyle ? leftStyle.opacity : null,
      };
    });
    console.log('Mobile Calc Pattern Status:', mobileTransforms);
    await mobilePage.screenshot({ path: 'audit/parallax-mobile-calc.png' });
  }

  await browser.close();
  console.log('Parallax verification completed!');
})();
