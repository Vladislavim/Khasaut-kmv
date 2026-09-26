import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/detail/dzhily-su-bermamyt', { waitUntil: 'networkidle' });

  const tests = [
    { fontRem: 2.8, copyFr: 0.88, sliderFr: 1.32 },
    { fontRem: 2.6, copyFr: 0.88, sliderFr: 1.32 },
    { fontRem: 2.5, copyFr: 0.85, sliderFr: 1.35 },
    { fontRem: 2.4, copyFr: 0.85, sliderFr: 1.35 },
    { fontRem: 2.3, copyFr: 0.82, sliderFr: 1.38 },
    { fontRem: 2.2, copyFr: 0.82, sliderFr: 1.38 },
  ];

  for (const t of tests) {
    const res = await page.evaluate((arg) => {
      const grid = document.querySelector('.inner-hero__content');
      grid.style.setProperty('grid-template-columns', `minmax(340px, ${arg.copyFr}fr) minmax(460px, ${arg.sliderFr}fr)`, 'important');
      const h1 = document.querySelector('.inner-hero__copy h1');
      const copy = document.querySelector('.inner-hero__copy');
      const slider = document.querySelector('.inner-hero__slider-wrap');
      h1.style.setProperty('white-space', 'nowrap', 'important');
      h1.style.setProperty('max-width', 'none', 'important');
      h1.style.setProperty('font-size', `${arg.fontRem}rem`, 'important');
      return {
        fontRem: arg.fontRem,
        fontSizePx: getComputedStyle(h1).fontSize,
        copyWidth: Math.round(copy.getBoundingClientRect().width),
        sliderWidth: Math.round(slider.getBoundingClientRect().width),
        h1Width: Math.round(h1.scrollWidth),
        fits: copy.getBoundingClientRect().width >= h1.scrollWidth
      };
    }, t);
    console.log(JSON.stringify(res));
  }
  await browser.close();
}

run();
