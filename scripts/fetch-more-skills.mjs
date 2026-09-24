import fs from 'fs';
import path from 'path';

async function fetchFile(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Node-Fetch' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.text();
}

async function main() {
  const skillsToFetch = [
    { name: 'taste-skill', url: 'https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md' },
    { name: 'redesign-skill', url: 'https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/redesign-skill/SKILL.md' },
    { name: 'minimalist-skill', url: 'https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/minimalist-skill/SKILL.md' },
    { name: 'brandkit', url: 'https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/brandkit/SKILL.md' },
    { name: 'ui-ux-pro-max', url: 'https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/src/SKILL.md' }
  ];

  for (const s of skillsToFetch) {
    try {
      const text = await fetchFile(s.url);
      const outDir = path.join('.agents/skills', s.name);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'SKILL.md'), text);
      console.log(`[OK] Saved ${s.name} (${text.length} bytes)`);
    } catch (e) {
      console.log(`[FAIL] ${s.name}: ${e.message}`);
    }
  }
}
main().catch(console.error);
