import { chromium } from 'playwright'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5174'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
page.setDefaultTimeout(15000)
const failures = []

async function open(route, viewport = { width: 390, height: 844 }) {
  await page.setViewportSize(viewport)
  await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(450)
}

function check(condition, message) {
  if (!condition) failures.push(message)
}

await open('/prices')
check(await page.getByRole('heading', { name: 'Стоимость экскурсий' }).count() === 1, '/prices has the compact hero heading')
check(await page.getByRole('link', { name: 'Рассчитать стоимость' }).getAttribute('href') === '#prices-calculator', '/prices hero CTA points to calculator')
check(await page.locator('select[name="price-route-filter"]').count() === 0, '/prices has no duplicate route filter')
check(await page.locator('.price-configurator .booking-terms').count() === 0, '/prices calculator has no duplicate terms accordion')
check(await page.locator('.price-conditions .booking-terms').count() === 1, '/prices has one terms accordion below the table')
await page.locator('select[name="departure-city"]').selectOption('pyatigorsk')
check(await page.locator('.price-city-filters button.is-active').getAttribute('aria-pressed') === 'true', 'price city tabs stay synced with calculator')
check(await page.locator('select[name="mobile-price-city"]').inputValue() === 'pyatigorsk', 'price mobile city select stays synced')
check(await page.locator('.price-routes-list details[open]').count() === 1, '/prices opens the selected route only')

await open('/excursions')
check(await page.locator('.inner-catalog-grid > .inner-card-reveal:visible').count() === 7, 'mobile excursions initially shows seven priority routes')
check(await page.locator('.inner-catalog-more-toggle').isVisible(), 'mobile excursions has an additional routes disclosure')
await page.locator('.inner-catalog-more-toggle').click()
check(await page.locator('.inner-catalog-grid > .inner-card-reveal:visible').count() === 13, 'mobile excursions disclosure reveals remaining routes')
check(await page.locator('.inner-card-reveal').filter({ hasText: 'Рассчитать' }).count() === 13, 'excursion cards expose one clear price CTA')

await open('/detail/dzhily-su')
check(await page.locator('.detail-price-panel .booking-terms').count() === 0, 'detail calculator has no duplicate terms accordion')
check(await page.locator('.inner-detail-facts .booking-terms').count() === 1, 'detail page keeps one terms accordion in practical facts')
check((await page.locator('body').innerText()).includes('Собираем день вокруг') === false, 'generic slider intro is removed')
check((await page.locator('body').innerText()).includes('Подтвердим город выезда') === false, 'duplicate pre-booking copy is removed')

await open('/')
const menu = page.locator('.menu-toggle').first()
if (await menu.count()) {
  await menu.click()
  check(await page.locator('.main-nav.is-open').count() === 1, 'mobile menu opens')
  await page.keyboard.press('Escape')
  check(await page.locator('.main-nav.is-open').count() === 0, 'mobile menu closes with Escape')
}

await browser.close()
console.log(JSON.stringify({ passed: failures.length === 0, failures }, null, 2))
if (failures.length) process.exitCode = 1
