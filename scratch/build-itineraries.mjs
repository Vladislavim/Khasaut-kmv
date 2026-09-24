import fs from 'fs';

const tildaData = JSON.parse(fs.readFileSync('scratch/all-tilda-routes.json', 'utf8'));

// Slug mapping from Tilda page to our site slugs
const pageToSlug = {
  'page128389916.html': 'dzhily-su',
  'page145494976.html': 'dzhily-su-bermamyt',
  'page128418576.html': 'bermamyt',
  'page128703716.html': 'dombay',
  'page128736336.html': 'arkhyz',
  'page128779406.html': 'elbrus',
  'page128782856.html': 'aktoprak',
  'page129003296.html': 'balkaria',
  'page129008016.html': 'ossetia',
  'page129013416.html': 'ingushetia',
  'page129016296.html': 'grozny'
};

console.log('Mapped slugs count:', Object.keys(pageToSlug).length);
