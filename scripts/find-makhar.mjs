async function main() {
  const pages = ['page128380866.html', 'page128381376.html', 'page128381666.html'];
  for (const page of pages) {
    const res = await fetch('https://khasaut-tour.ru/' + page);
    const html = await res.text();
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const bgMatches = html.match(/data-original=["']([^"']+)["']/gi) || [];
    console.log(page, title, bgMatches);
  }
}
main().catch(console.error);
