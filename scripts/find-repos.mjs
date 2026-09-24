async function main() {
  const res = await fetch('https://api.github.com/repos/leonxlnx/taste-skill/contents/skills', { headers: { 'User-Agent': 'Node-Fetch' } });
  const data = await res.json();
  console.log('skills in taste-skill:', data.map(d => ({ name: d.name, type: d.type })));
}
main().catch(console.error);
