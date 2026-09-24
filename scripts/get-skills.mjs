async function main() {
  const urls = [
    'https://skills.sh/anthropics/skills/frontend-design',
    'https://skills.sh/vercel-labs/agent-skills/web-design-guidelines',
    'https://skills.sh/leonxlnx/taste-skill/design-taste-frontend',
    'https://skills.sh/leonxlnx/taste-skill/high-end-visual-design',
    'https://skills.sh/leonxlnx/taste-skill/redesign-existing-projects',
    'https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max'
  ];

  for (const url of urls) {
    const res = await fetch(url);
    const html = await res.text();
    const cmd = html.match(/npx skills add [^\s"'<]+/i)?.[0];
    const gh = html.match(/https:\/\/github\.com\/[^\s"'<]+/i)?.[0];
    const raw = html.match(/https:\/\/raw\.githubusercontent\.com[^\s"'<]+/i)?.[0];
    console.log(url, { cmd, gh, raw });
  }
}
main().catch(console.error);
