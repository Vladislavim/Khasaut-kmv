import fs from 'fs';

const html = fs.readFileSync('scratch/page128172616.html', 'utf8');
const links = Array.from(html.matchAll(/href="([^"#]+?\.html)"/gi)).map(m => m[1]);
console.log('Links in excursions page:');
console.log([...new Set(links)]);

// Also let's check all pageXXXXXX.html occurrences in the file
const allPages = Array.from(html.matchAll(/page\d+\.html/g)).map(m => m[0]);
console.log('All page numbers in excursions:');
console.log([...new Set(allPages)]);
