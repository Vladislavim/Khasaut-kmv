async function main() {
  const res = await fetch('https://khasaut-tour.ru/page148227646.html')
  const html = await res.text()
  const matches = [...html.matchAll(/https:\/\/static\.tildacdn\.com\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)]
  const urls = [...new Set(matches.map(m => m[0]))]
  console.log('Found Makhar images:', urls.length)
  for (const u of urls) {
    console.log(u)
  }
}
main().catch(console.error)
