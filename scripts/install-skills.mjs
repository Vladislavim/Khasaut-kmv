import fs from 'fs';
import path from 'path';

async function fetchFile(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return await res.text();
}

async function main() {
  const targets = [
    // Anthropics frontend design
    {
      name: 'frontend-design',
      urls: [
        'https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md',
        'https://raw.githubusercontent.com/anthropics/skills/main/frontend-design/SKILL.md',
        'https://raw.githubusercontent.com/anthropics/skills/master/skills/frontend-design/SKILL.md',
      ]
    },
    // Vercel web design guidelines
    {
      name: 'web-design-guidelines',
      urls: [
        'https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md',
        'https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md',
      ]
    },
    // Leonxlnx taste skill
    {
      name: 'design-taste-frontend',
      urls: [
        'https://raw.githubusercontent.com/leonxlnx/taste-skill/main/skills/design-taste-frontend/SKILL.md',
        'https://raw.githubusercontent.com/leonxlnx/taste-skill/main/SKILL.md',
      ]
    },
    {
      name: 'high-end-visual-design',
      urls: [
        'https://raw.githubusercontent.com/leonxlnx/taste-skill/main/skills/high-end-visual-design/SKILL.md',
      ]
    },
    {
      name: 'redesign-existing-projects',
      urls: [
        'https://raw.githubusercontent.com/leonxlnx/taste-skill/main/skills/redesign-existing-projects/SKILL.md',
      ]
    },
    // NextLevelBuilder UI UX Pro Max
    {
      name: 'ui-ux-pro-max',
      urls: [
        'https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/skills/ui-ux-pro-max/SKILL.md',
        'https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/SKILL.md',
      ]
    }
  ];

  const baseDir = '.agents/skills';
  for (const t of targets) {
    let content = null;
    let foundUrl = null;
    for (const u of t.urls) {
      try {
        content = await fetchFile(u);
        foundUrl = u;
        break;
      } catch (e) {
        // try next
      }
    }

    if (content) {
      const skillDir = path.join(baseDir, t.name);
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), content);
      console.log(`[OK] Saved skill ${t.name} from ${foundUrl} (${content.length} bytes)`);
    } else {
      console.log(`[FAIL] Could not fetch ${t.name}`);
    }
  }
}

main().catch(console.error);
