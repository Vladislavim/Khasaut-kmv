async function main() {
  const res = await fetch('https://skills.sh');
  const html = await res.text();
  // Find links or text related to design, skills, etc.
  const regex = /href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const list = [];
  while ((match = regex.exec(html)) !== null) {
    list.push({ href: match[1], text: match[2].replace(/<[^>]+>/g, '').trim() });
  }
  console.log('Total links:', list.length);
  const designSkills = list.filter(l => /design|ui|ux|frontend|web|css|style|landing/i.test(l.href + ' ' + l.text));
  console.log('Design skills:', designSkills);
}
main().catch(console.error);
