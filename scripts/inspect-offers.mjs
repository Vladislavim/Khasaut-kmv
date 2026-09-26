import fs from 'node:fs';

const details = fs.readdirSync('dist/detail');
for (const slug of details) {
  const html = fs.readFileSync('dist/detail/' + slug + '/index.html', 'utf8');
  const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (schemaMatch) {
    const json = JSON.parse(schemaMatch[1]);
    const trip = json['@graph'].find(x => Array.isArray(x['@type']) && x['@type'].includes('TouristTrip'));
    if (trip) {
      console.log(`${slug} -> Name: "${trip.name}" | Price: ${trip.offers ? trip.offers.price : 'NO OFFER'}`);
    }
  }
}
