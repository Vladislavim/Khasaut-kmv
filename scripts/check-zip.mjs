import { execSync } from 'child_process'

const zipPath = 'C:/Users/viman/OneDrive/Рабочий стол/эльдар сайт/web2.zip_khasaut_tour_ru.zip'
const output = execSync(`tar -tf "${zipPath}"`, { encoding: 'utf-8', maxBuffer: 15 * 1024 * 1024 })
const files = output.split(/\r?\n/).filter(Boolean)
console.log('Total entries:', files.length)

const html = execSync(`tar -xOf "${zipPath}" "khasaut-tour.ru/index.html"`, { encoding: 'utf-8', maxBuffer: 15 * 1024 * 1024 })
const matches = Array.from(html.matchAll(/(?:src|data-original|bgimg)="([^"]+?\.(?:jpg|jpeg|png|webp)[^"]*)"/gi)).map(m => m[1])
console.log('Image URLs found in index.html:')
console.log([...new Set(matches)])
