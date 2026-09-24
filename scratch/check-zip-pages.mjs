import { execSync } from 'child_process';
import fs from 'fs';

const zipPath = 'C:/Users/viman/OneDrive/Рабочий стол/эльдар сайт/web2.zip_khasaut_tour_ru.zip';
const out = execSync(`tar -tf "${zipPath}"`, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });
const lines = out.split(/\r?\n/).filter(Boolean);

console.log('Total entries:', lines.length);

const htmlOrPages = lines.filter(f => f.includes('page') || f.endsWith('.html'));
console.log('Page/html entries:');
console.log(htmlOrPages);

// Check if index.html mentions pages
try {
  const indexHtml = execSync(`tar -xOf "${zipPath}" "khasaut-tour.ru/index.html"`, { encoding: 'utf-8', maxBuffer: 20 * 1024 * 1024 });
  const links = Array.from(indexHtml.matchAll(/href="([^"]+?\.html)"/gi)).map(m => m[1]);
  console.log('Links in index.html:');
  console.log([...new Set(links)]);
} catch (e) {
  console.error('Error reading index.html:', e.message);
}
