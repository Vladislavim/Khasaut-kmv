import fs from 'fs';

const pages = [
  'page128192986.html',
  'page128172616.html',
  'page128355436.html',
  'page128386636.html',
  'page128359026.html',
  'page128389916.html'
];

async function main() {
  const results = {};
  for (const page of pages) {
    const url = `https://khasaut-tour.ru/${page}`;
    console.log('Fetching', url);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`Failed ${url}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(`scratch/${page}`, html);
      
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
      console.log(`Saved ${page}: Title = "${title}", Length = ${html.length}`);
      results[page] = { title, length: html.length };
    } catch (e) {
      console.error(`Error fetching ${url}:`, e.message);
    }
  }
  fs.writeFileSync('scratch/tilda-pages-summary.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
