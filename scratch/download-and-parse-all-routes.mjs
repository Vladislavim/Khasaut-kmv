import fs from 'fs';
import { chromium } from 'playwright';

const pages = [
  'page128389916.html', // Джилы-Су
  'page145494976.html',
  'page128418576.html',
  'page128703716.html',
  'page128736336.html',
  'page128779406.html',
  'page128782856.html',
  'page129003296.html',
  'page129008016.html',
  'page129013416.html',
  'page129016296.html',
  'page129028116.html',
  'page129025176.html'
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const allRoutes = {};

  for (const pageFile of pages) {
    const url = `https://khasaut-tour.ru/${pageFile}`;
    console.log(`Fetching ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      
      const routeData = await page.evaluate(() => {
        const title = document.title.replace(/[\r\n\t]+/g, ' ').trim();
        
        // Find "Программа Экскурсии" or timeline block
        let programSteps = [];
        const records = Array.from(document.querySelectorAll('.r.t-rec'));
        
        for (const rec of records) {
          const text = rec.innerText || '';
          if (text.includes('Программа') || text.includes('программа')) {
            // Check for step items inside
            const items = Array.from(rec.querySelectorAll('.t512__item, .t513__item, .t544__item, .t-card__item, [class*="step"], [class*="timeline"], [class*="item"]'));
            if (items.length > 0) {
              programSteps = items.map(el => el.innerText.trim()).filter(Boolean);
            }
            if (programSteps.length === 0) {
              // Fallback to text lines
              programSteps = text.split(/\n{2,}/).map(s => s.trim()).filter(s => s.length > 5);
            }
          }
        }

        // Extract all text records
        const allBlocks = records.map(r => ({
          id: r.id,
          type: r.getAttribute('data-record-type') || '',
          text: (r.innerText || '').trim()
        })).filter(b => b.text.length > 0);

        return {
          title,
          programSteps,
          allBlocks
        };
      });

      console.log(`Route: ${routeData.title} (${routeData.programSteps.length} program steps, ${routeData.allBlocks.length} blocks)`);
      allRoutes[pageFile] = routeData;
    } catch (e) {
      console.error(`Error on ${pageFile}:`, e.message);
    }
  }

  fs.writeFileSync('scratch/all-tilda-routes.json', JSON.stringify(allRoutes, null, 2));
  await browser.close();
  console.log('Saved all parsed routes to scratch/all-tilda-routes.json');
}

main().catch(console.error);
