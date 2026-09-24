import { readFileSync } from 'node:fs';

const htmlBermamyt = readFileSync('dist/detail/bermamyt/index.html', 'utf8');
const matchB = htmlBermamyt.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (matchB) {
  const g = JSON.parse(matchB[1])['@graph'];
  console.log('--- BERMAMYT SCHEMA ---');
  console.log('Graph Types:', g.map(x => x['@type']));
  const breadcrumbs = g.find(x => x['@type'] === 'BreadcrumbList');
  console.log('Breadcrumbs:', JSON.stringify(breadcrumbs, null, 2));
  const product = g.find(x => Array.isArray(x['@type']) && x['@type'].includes('Product'));
  console.log('Product/Trip:', JSON.stringify(product, null, 2));
}

const htmlHome = readFileSync('dist/index.html', 'utf8');
const matchH = htmlHome.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (matchH) {
  const g = JSON.parse(matchH[1])['@graph'];
  console.log('\n--- HOMEPAGE SCHEMA ---');
  console.log('Graph Types:', g.map(x => x['@type']));
  const sitelinks = g.find(x => x['@id'] && x['@id'].includes('sitelinks'));
  console.log('Sitelinks / Navigation:', JSON.stringify(sitelinks, null, 2));
}
