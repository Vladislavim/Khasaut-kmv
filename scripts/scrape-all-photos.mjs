import fs from 'fs';
import path from 'path';

async function main() {
  const sitemapRes = await fetch('https://khasaut-tour.ru/sitemap.xml');
  const xml = await sitemapRes.text();
  const urlMatches = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  console.log(`Found ${urlMatches.length} pages in sitemap`);

  const allImages = new Map();

  for (const pageUrl of urlMatches) {
    try {
      const res = await fetch(pageUrl);
      const html = await res.text();
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || pageUrl;
      const imgs = Array.from(html.matchAll(/data-original=["']([^"']+\.(jpg|jpeg|png|webp))["']/gi)).map(m => m[1]);
      console.log(`${title} (${pageUrl}): ${imgs.length} images`);
      for (const img of imgs) {
        if (!allImages.has(img)) {
          allImages.set(img, title);
        }
      }
    } catch (e) {
      console.error(`Error fetching ${pageUrl}:`, e.message);
    }
  }

  console.log(`\nTotal unique high-res images found: ${allImages.size}`);
  const out = Array.from(allImages.entries()).map(([url, page]) => ({ url, page }));
  fs.writeFileSync('tmp/all-scraped-images.json', JSON.stringify(out, null, 2));
}

main().catch(console.error);
