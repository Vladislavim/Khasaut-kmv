import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const targetDir = path.resolve('design-reference/khasaut/assets/inner-web')
const scrapedDir = path.resolve('tmp/scraped-highres')

async function downloadToFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(dest, buf)
}

async function convertToWebp(inputPath, outputPath, maxWidth = 1600) {
  const image = sharp(inputPath)
  const meta = await image.metadata()
  let pipeline = image
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true })
  }
  await pipeline.webp({ quality: 85, effort: 4 }).toFile(outputPath)
  console.log(`Saved: ${path.basename(outputPath)}`)
}

async function main() {
  await fs.mkdir(targetDir, { recursive: true })

  // 1. Extra Makhar photos
  const makharExtraUrls = [
    'https://static.tildacdn.com/tild3236-3632-4637-b733-313538343235/24be37992e8478595c70.jpg',
    'https://static.tildacdn.com/tild3437-6464-4964-b932-363061626562/93ca04es-1920.jpg',
    'https://static.tildacdn.com/tild3161-3637-4638-a536-356535316337/523091_main.jpg',
    'https://static.tildacdn.com/tild3861-3161-4133-b462-616531313866/WAAAAgGySOA-960.jpg',
  ]

  for (let i = 0; i < makharExtraUrls.length; i++) {
    const tmpFile = path.resolve(scrapedDir, `makhar-extra-${i + 4}.jpg`)
    try {
      console.log(`Downloading Makhar extra ${i + 4}...`)
      await downloadToFile(makharExtraUrls[i], tmpFile)
      const outWebp = path.resolve(targetDir, `makhar-0${i + 4}-optimized.webp`)
      await convertToWebp(tmpFile, outWebp)
    } catch (e) {
      console.error(`Error downloading makhar extra:`, e.message)
    }
  }

  // 2. Mapping from tmp/scraped-highres to inner-web WebP
  const conversions = [
    // Bermamyt
    { in: 'bermamyt-1.jpg', out: 'bermamyt-04-optimized.webp' },
    { in: 'bermamyt-2.jpg', out: 'bermamyt-05-optimized.webp' },
    { in: 'bermamyt-3.jpg', out: 'bermamyt-06-optimized.webp' },

    // Dzhily-Su
    { in: 'dzhilySu-1.jpg', out: 'dzhily-su-04-optimized.webp' },
    { in: 'dzhilySu-4.jpg', out: 'dzhily-su-05-optimized.webp' },
    { in: 'dzhilySu-5.jpg', out: 'dzhily-su-06-optimized.webp' },

    // Dombay
    { in: 'dombay-1.jpg', out: 'dombay-04-optimized.webp' },
    { in: 'dombay-2.jpg', out: 'dombay-05-optimized.webp' },
    { in: 'dombay-3.jpg', out: 'dombay-06-optimized.webp' },

    // Arkhyz
    { in: 'arkhyz-1.jpg', out: 'arkhyz-04-optimized.webp' },
    { in: 'arkhyz-2.jpg', out: 'arkhyz-05-optimized.webp' },
    { in: 'arkhyz-4.jpg', out: 'arkhyz-06-optimized.webp' },

    // Balkaria
    { in: 'balkaria-1.jpg', out: 'balkaria-04-optimized.webp' },
    { in: 'balkaria-3.jpg', out: 'balkaria-05-optimized.webp' },
    { in: 'balkaria-4.jpg', out: 'balkaria-06-optimized.webp' },

    // Aktoprak
    { in: 'aktoprak-1.jpg', out: 'aktoprak-04-optimized.webp' },
    { in: 'aktoprak-2.jpg', out: 'aktoprak-05-optimized.webp' },
    { in: 'aktoprak-4.jpg', out: 'aktoprak-06-optimized.webp' },

    // Khurla-Kol
    { in: 'khurlaKol-1.jpg', out: 'khurla-kol-04-optimized.webp' },
    { in: 'khurlaKol-2.jpg', out: 'khurla-kol-05-optimized.webp' },
    { in: 'khurlaKol-4.jpg', out: 'khurla-kol-06-optimized.webp' },

    // Khudes
    { in: 'khudes-1.jpg', out: 'khudes-labyrinth-04-optimized.webp' },
    { in: 'khudes-2.jpg', out: 'khudes-labyrinth-05-optimized.webp' },
    { in: 'khudes-4.jpg', out: 'khudes-labyrinth-06-optimized.webp' },

    // Ossetia
    { in: 'ossetia-1.jpg', out: 'ossetia-04-optimized.webp' },
    { in: 'ossetia-2.jpg', out: 'ossetia-05-optimized.webp' },
    { in: 'ossetia-4.jpg', out: 'ossetia-06-optimized.webp' },

    // Grozny
    { in: 'grozny-1.jpg', out: 'grozny-04-optimized.webp' },
    { in: 'grozny-2.jpg', out: 'grozny-05-optimized.webp' },
    { in: 'grozny-3.jpg', out: 'grozny-06-optimized.webp' },

    // Horse rides
    { in: 'horse-1.jpg', out: 'horse-web-04-optimized.webp' },
    { in: 'horse-2.jpg', out: 'horse-web-05-optimized.webp' },

    // Dzhily-Su + Bermamyt combo (reuse stunning shots from dzhilySu and bermamyt)
    { in: 'dzhilySu-2.jpg', out: 'dzhily-su-bermamyt-04-optimized.webp' },
    { in: 'bermamyt-4.jpg', out: 'dzhily-su-bermamyt-05-optimized.webp' },
    { in: 'dzhilySu-6.jpg', out: 'dzhily-su-bermamyt-06-optimized.webp' },

    // Baduk Lakes (from dombay set which includes Baduk lakes)
    { in: 'dombay-4.jpg', out: 'baduk-lakes-04-optimized.webp' },
    { in: 'dombay-5.jpg', out: 'baduk-lakes-05-optimized.webp' },
    { in: 'dombay-6.jpg', out: 'baduk-lakes-06-optimized.webp' },
  ]

  for (const c of conversions) {
    const inPath = path.resolve(scrapedDir, c.in)
    const outPath = path.resolve(targetDir, c.out)
    try {
      await convertToWebp(inPath, outPath)
    } catch (err) {
      console.warn(`Could not convert ${c.in}:`, err.message)
    }
  }

  console.log('Finished converting all expanded photos!')
}

main().catch(console.error)
