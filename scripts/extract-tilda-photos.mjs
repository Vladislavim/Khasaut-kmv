import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const zipPath = 'C:/Users/viman/OneDrive/Рабочий стол/эльдар сайт/web2.zip_khasaut_tour_ru.zip'
const outDir = 'design-reference/khasaut/assets/tilda'
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Extract the zip to a temp dir
const tempDir = 'scratch/tilda-extracted'
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
execSync(`tar -xf "${zipPath}" -C "${tempDir}"`)

// Find all image files
function findImages(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const item of list) {
    const p = path.join(dir, item)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      results = results.concat(findImages(p))
    } else if (/\.(jpe?g|png|webp)$/i.test(item) && stat.size > 15000) {
      results.push({ path: p, name: item, size: stat.size })
    }
  }
  return results
}

const images = findImages(tempDir)
console.log(`Found ${images.length} images in zip (>15KB)`)

// Calculate MD5 of existing images in project
const existingHashes = new Set()
function hashDir(dir) {
  if (!fs.existsSync(dir)) return
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      hashDir(p)
    } else if (/\.(jpe?g|png|webp)$/i.test(item)) {
      const buf = fs.readFileSync(p)
      const h = crypto.createHash('md5').update(buf).digest('hex')
      existingHashes.add(h)
    }
  }
}
hashDir('design-reference/khasaut/assets')

// Copy non-duplicate images to tilda/
let copied = 0
for (const img of images) {
  const buf = fs.readFileSync(img.path)
  const h = crypto.createHash('md5').update(buf).digest('hex')
  if (!existingHashes.has(h)) {
    existingHashes.add(h)
    const dest = path.join(outDir, img.name)
    fs.writeFileSync(dest, buf)
    console.log(`[NEW] Copied ${img.name} (${img.size} bytes) -> ${dest}`)
    copied++
  } else {
    console.log(`[DUPLICATE] Skipped ${img.name} (already in project)`)
  }
}

console.log(`Done! Extracted ${copied} unique photos from zip without duplicates.`)
