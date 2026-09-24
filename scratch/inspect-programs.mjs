import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/all-tilda-routes.json', 'utf8'));

for (const [file, route] of Object.entries(data)) {
  console.log(`\n========================================`);
  console.log(`PAGE: ${file} | TITLE: ${route.title}`);
  console.log(`PROGRAM STEPS (${route.programSteps.length}):`);
  route.programSteps.forEach((s, i) => {
    console.log(`  [${i+1}] ${s.replace(/\n+/g, ' -- ')}`);
  });
}
