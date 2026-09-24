import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/all-tilda-routes.json', 'utf8'));

for (const [page, route] of Object.entries(data)) {
  console.log(`\n========================================`);
  console.log(`PAGE: ${page} -> ${route.title}`);
  
  // Find blocks
  const blocks = route.allBlocks;
  for (const b of blocks) {
    const t = b.text;
    if (t.includes('Информация по поездке') || t.includes('В стоимость входит') || t.includes('Дополнительные расходы') || t.includes('Иметь в наличии')) {
      console.log(`--- BLOCK ${b.id} (${b.type}) ---`);
      console.log(t);
    }
  }
}
