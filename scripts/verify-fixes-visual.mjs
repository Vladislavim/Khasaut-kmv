import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const distDir = path.resolve('dist');
const outDir = path.resolve('artifacts/verification');
fs.mkdirSync(outDir, { recursive: true });

function getMime(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) return 'image/jpeg';
  if (file.endsWith('.webp')) return 'image/webp';
  if (file.endsWith('.svg')) return 'image/svg+xml';
  if (file.endsWith('.woff2')) return 'font/woff2';
  return 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': getMime(filePath) });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const notFound = path.join(distDir, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFound).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(4175, async () => {
  console.log('Verification server running at http://localhost:4175');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results = {
    hero: {},
    footer: {},
    contactCard: {},
    bannerBtn: {}
  };

  // 1. Homepage at 1024px and 1440px
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Hero verification
    const heroEl = await page.$('.hero-section');
    await heroEl.screenshot({ path: path.join(outDir, `hero-${width}.png`) });

    const heroTitleData = await page.evaluate(() => {
      const h1 = document.querySelector('.hero-copy h1');
      const style = window.getComputedStyle(h1);
      // measure text line nodes
      const range = document.createRange();
      range.selectNodeContents(h1);
      const rects = Array.from(range.getClientRects());
      return {
        text: h1.innerText,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        whiteSpace: style.whiteSpace,
        wordBreak: style.wordBreak,
        overflowWrap: style.overflowWrap,
        rectsCount: rects.length,
        lines: h1.innerText.split('\n')
      };
    });
    results.hero[width] = heroTitleData;

    // Footer verification
    // scroll to footer
    await page.evaluate(() => {
      const footer = document.querySelector('.footer-section');
      footer.scrollIntoView();
    });
    await page.waitForTimeout(600);

    const footerEl = await page.$('.footer-section');
    await footerEl.screenshot({ path: path.join(outDir, `footer-${width}.png`) });

    const footerData = await page.evaluate(() => {
      const nav = document.querySelector('.footer-nav');
      const contacts = document.querySelector('.footer-contacts');
      const navRect = nav.getBoundingClientRect();
      const contactsRect = contacts.getBoundingClientRect();
      const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      return {
        navRect: { left: Math.round(navRect.left), right: Math.round(navRect.right), top: Math.round(navRect.top), bottom: Math.round(navRect.bottom) },
        contactsRect: { left: Math.round(contactsRect.left), right: Math.round(contactsRect.right), top: Math.round(contactsRect.top), bottom: Math.round(contactsRect.bottom) },
        overlap: overlaps(navRect, contactsRect),
        navTransform: window.getComputedStyle(nav).transform,
        contactsTransform: window.getComputedStyle(contacts).transform
      };
    });
    results.footer[width] = footerData;
  }

  // Also test footer across all desktop breakpoints: 840px, 1200px, 1920px
  for (const width of [840, 1200, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' });
    const footerData = await page.evaluate(() => {
      const nav = document.querySelector('.footer-nav');
      const contacts = document.querySelector('.footer-contacts');
      const navRect = nav.getBoundingClientRect();
      const contactsRect = contacts.getBoundingClientRect();
      const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      return {
        overlap: overlaps(navRect, contactsRect),
        navTransform: window.getComputedStyle(nav).transform,
        contactsTransform: window.getComputedStyle(contacts).transform
      };
    });
    results.footer[width] = footerData;
  }

  // 2. Contact card at 1024px
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('http://localhost:4175/contact/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const contactCardEl = await page.$('.inner-page--contact .inner-contact-card');
  if (contactCardEl) {
    await contactCardEl.screenshot({ path: path.join(outDir, 'contact-card-1024.png') });
  }

  const contactEmailData = await page.evaluate(() => {
    const emailLink = Array.from(document.querySelectorAll('.inner-contact-card__row a')).find(a => a.textContent.includes('@'));
    if (!emailLink) return null;
    const style = window.getComputedStyle(emailLink);
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    const rects = Array.from(range.getClientRects());
    return {
      text: emailLink.textContent,
      fontSize: style.fontSize,
      whiteSpace: style.whiteSpace,
      wordBreak: style.wordBreak,
      lineCount: rects.length,
      height: emailLink.getBoundingClientRect().height
    };
  });
  results.contactCard['1024'] = contactEmailData;

  // 3. Banner button
  await page.goto('http://localhost:4175/excursions/', { waitUntil: 'networkidle' });
  const bannerBtnData = await page.evaluate(() => {
    const btn = document.querySelector('.inner-note .inner-button');
    if (!btn) return null;
    const style = window.getComputedStyle(btn);
    return {
      text: btn.textContent.trim(),
      whiteSpace: style.whiteSpace
    };
  });
  results.bannerBtn = bannerBtnData;

  console.log('\n=== VERIFICATION RESULTS ===');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
  server.close();
  process.exit(0);
});
