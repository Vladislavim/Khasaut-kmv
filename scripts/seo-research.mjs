import { mkdir, writeFile } from 'node:fs/promises'

// Run locally with environment credentials. Never import this script in the app.
const phrases = ['джип туры из Кисловодска', 'Бермамыт из Кисловодска экскурсия цена', 'Джилы Су из Кисловодска экскурсия цена']
const directory = new URL('../artifacts/seo-research/', import.meta.url)
await mkdir(directory, { recursive: true })
const findings = []
for (const [index, phrase] of phrases.entries()) {
  if (!process.env.YANDEX_SEARCH_API_KEY || !process.env.YANDEX_FOLDER_ID) throw new Error('Set YANDEX_SEARCH_API_KEY and YANDEX_FOLDER_ID locally')
  const response = await fetch('https://searchapi.api.cloud.yandex.net/v2/web/search', {
    method: 'POST', signal: AbortSignal.timeout(30000),
    headers: { Authorization: `Api-Key ${process.env.YANDEX_SEARCH_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ folderId: process.env.YANDEX_FOLDER_ID, query: { searchType: 'SEARCH_TYPE_RU', queryText: phrase }, responseFormat: 'FORMAT_XML' }),
  })
  if (!response.ok) throw new Error(`Search API: HTTP ${response.status}`)
  const result = await response.json()
  const xml = Buffer.from(result.rawData, 'base64').toString('utf8')
  await writeFile(new URL(`search-${index + 1}.xml`, directory), xml)
  const urls = [...xml.matchAll(/<url>(.*?)<\/url>/gs)].map((match) => match[1])
  findings.push({ phrase, checkedAt: new Date().toISOString(), region: 'not specified; not a city-specific rank check', urls })
  console.log(JSON.stringify({ phrase, urls }))
  if (process.env.YANDEX_WORDSTAT_TOKEN) {
    const wordstat = await fetch('https://api.wordstat.yandex.net/v1/topRequests', {
      method: 'POST', signal: AbortSignal.timeout(30000),
      headers: { Authorization: `Bearer ${process.env.YANDEX_WORDSTAT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase }),
    })
    if (!wordstat.ok) throw new Error(`Wordstat API: HTTP ${wordstat.status}`)
    await writeFile(new URL(`wordstat-${index + 1}.json`, directory), JSON.stringify(await wordstat.json(), null, 2))
  }
}
await writeFile(new URL('summary.json', directory), JSON.stringify({ wordstat: process.env.YANDEX_WORDSTAT_TOKEN ? 'requested' : 'not available; OAuth token required', findings }, null, 2))
