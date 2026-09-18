const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const cache = new Map()
function load(file) {
  const absolute = path.resolve(__dirname, '..', file)
  if (cache.has(absolute)) return cache.get(absolute)
  const exports = {}
  cache.set(absolute, exports)
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
  vm.runInNewContext(code, { exports, require: (name) => load(path.relative(path.resolve(__dirname, '..'), path.resolve(path.dirname(absolute), `${name}.ts`))), Intl, URLSearchParams })
  return exports
}
const { buildWhatsAppBookingUrl, buildEstimatePath } = load('src/data/booking.ts')
const message = (format, guests) => new URL(buildWhatsAppBookingUrl({ routeKey: 'dzhily-su-plus-bermamyt', city: 'kislovodsk', format, guests, date: '2026-10-12' })).searchParams.get('text').replace(/\u00a0/g, ' ')
assert.match(message('group', 4), /За всех гостей: 24 000 ₽/)
assert.match(message('private1to4', 4), /За всех гостей: 24 000 ₽/)
assert.match(message('private5to6', 5), /За всех гостей: 36 000 ₽/)
assert.match(message('group', 4), /Гостей: 4\nЖелаемая дата: 2026-10-12/)
assert.match(message('group', 4), /Дополнительные расходы не включены/)
assert.equal(new URL(buildWhatsAppBookingUrl({routeKey:'arkhyz',city:'kislovodsk',format:'group'})).hostname, 'wa.me')
console.log('Booking totals, guest count, date, destination and cost qualification: passed')

const saved = new URL(buildEstimatePath({routeKey:'arkhyz',city:'kislovodsk',format:'group',guests:3,date:'2026-10-18'}),'https://khasaut-kmv.ru')
assert.equal(saved.pathname,'/prices/')
assert.equal(saved.searchParams.get('guests'),'3')
assert.equal(saved.searchParams.get('date'),'2026-10-18')
assert.equal(saved.hash,'#prices-calculator')
console.log('Shareable estimate preserves route, guests and date: passed')
