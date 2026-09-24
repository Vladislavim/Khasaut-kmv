import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const data = JSON.parse(fs.readFileSync('tmp/all-scraped-images.json', 'utf8'));
  console.log(`Loaded ${data.length} images from list.`);

  const destDir = 'tmp/scraped-highres';
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  // Map of routes to find best photos for
  const categories = {
    bermamyt: data.filter(d => /бермамыт/i.test(d.page)),
    dzhilySu: data.filter(d => /джилы|джылы/i.test(d.page)),
    dombay: data.filter(d => /домбай/i.test(d.page)),
    arkhyz: data.filter(d => /архыз/i.test(d.page)),
    aktoprak: data.filter(d => /актопрак/i.test(d.page)),
    khurlaKol: data.filter(d => /хурла/i.test(d.page)),
    khudes: data.filter(d => /худес/i.test(d.page)),
    balkaria: data.filter(d => /балкария/i.test(d.page)),
    ossetia: data.filter(d => /осетия/i.test(d.page)),
    grozny: data.filter(d => /грозный/i.test(d.page)),
    horse: data.filter(d => /конные/i.test(d.page)),
  };

  console.log('Categories summary:');
  for (const [k, v] of Object.entries(categories)) {
    console.log(`- ${k}: ${v.length} images`);
  }

  // Download key photos
  let count = 0;
  for (const [cat, items] of Object.entries(categories)) {
    for (let i = 0; i < Math.min(items.length, 6); i++) {
      const item = items[i];
      const filename = path.join(destDir, `${cat}-${i + 1}.jpg`);
      if (!fs.existsSync(filename)) {
        try {
          const res = await fetch(item.url);
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(filename, buf);
          count++;
        } catch (e) {
          console.warn(`Failed ${item.url}:`, e.message);
        }
      }
    }
  }
  console.log(`Downloaded ${count} new category images.`);
}

main().catch(console.error);
