const { chromium } = require('playwright');

async function testMobileFooter() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Inject improved footer
  await page.evaluate(() => {
    const footer = document.querySelector('.footer-section');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-mountain-backdrop" aria-hidden="true"></div>
      <div class="container footer-container">
        <div class="footer-grid">
          
          <!-- Column 1: Brand -->
          <div class="footer-col footer-col--brand">
            <span class="footer-brand-title">KHASAUT TOUR</span>
            <p class="footer-brand-desc">
              Индивидуальные и групповые джип-туры по Северному Кавказу из городов КМВ.
            </p>
            <div class="footer-cities">
              Кисловодск · Пятигорск · Ессентуки · Железноводск · Минводы
            </div>
          </div>

          <!-- Column 2: Routes -->
          <div class="footer-col">
            <h3 class="footer-col-title">Маршруты</h3>
            <ul class="footer-links">
              <li><a href="/excursions">Экскурсии и джип-туры</a></li>
              <li><a href="/routes">Необычные маршруты</a></li>
              <li><a href="/horse-rides">Конные прогулки</a></li>
              <li><a href="/thermal-springs">Термальные источники</a></li>
            </ul>
          </div>

          <!-- Column 3: Info -->
          <div class="footer-col">
            <h3 class="footer-col-title">Информация</h3>
            <ul class="footer-links">
              <li><a href="/">Главная</a></li>
              <li><a href="/about">О компании</a></li>
              <li><a href="/prices">Прайс-лист и цены</a></li>
              <li><a href="/contact">Контакты</a></li>
            </ul>
          </div>

          <!-- Column 4: Contacts -->
          <div class="footer-col footer-col--contacts">
            <h3 class="footer-col-title">Связь с гидом</h3>
            <div class="footer-phone-group">
              <a href="tel:+79187477212" class="footer-phone">+7 918 747-72-12 <span class="footer-phone-name">(Эльдар)</span></a>
              <a href="tel:+79257600909" class="footer-phone">+7 925 760-09-09</a>
            </div>
            <a href="mailto:Eldar090807@yandex.ru" class="footer-email-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Eldar090807@yandex.ru
            </a>
            <div class="footer-social-strip">
              <a href="https://wa.me/79187477212" target="_blank" class="footer-social-btn" aria-label="WhatsApp">WhatsApp</a>
              <a href="tel:+79187477212" class="footer-social-btn footer-social-btn--phone" aria-label="Позвонить">Позвонить</a>
            </div>
          </div>

        </div>

        <div class="footer-bottom-bar">
          <span>© 2026 Khasaut Tour. Все права защищены.</span>
          <span>Путешествия по Северному Кавказу</span>
        </div>
      </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      .footer-section {
        background: #fbf8f1 !important;
        color: #102e21 !important;
        padding-top: 40px !important;
        padding-bottom: 24px !important;
        border-top: 1px solid rgba(25, 62, 45, 0.12) !important;
        position: relative !important;
        overflow: hidden !important;
      }
      .footer-mountain-backdrop {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 140px;
        background: url('/design-reference/khasaut/assets/decor/footer-mountain-ridge.png') no-repeat bottom center;
        background-size: cover;
        opacity: 0.10;
        pointer-events: none;
      }
      .footer-container {
        position: relative;
        z-index: 2;
        padding: 0 20px;
      }
      .footer-grid {
        display: flex;
        flex-direction: column;
        gap: 28px;
        margin-bottom: 32px;
      }
      .footer-brand-title {
        font-family: 'Cinzel', 'Spectral', serif;
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #102e21;
        display: inline-block;
        margin-bottom: 8px;
      }
      .footer-brand-desc {
        font-size: 0.9rem;
        line-height: 1.5;
        color: #3b5245;
        margin-bottom: 12px;
      }
      .footer-cities {
        font-size: 0.78rem;
        color: #6b8073;
        line-height: 1.5;
      }
      .footer-col-title {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #c5a059;
        margin-bottom: 12px;
      }
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .footer-links a {
        color: #102e21;
        font-size: 0.92rem;
        text-decoration: none;
      }
      .footer-phone-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 10px;
      }
      .footer-phone {
        font-size: 1.05rem;
        font-weight: 600;
        color: #102e21;
        text-decoration: none;
      }
      .footer-phone-name {
        font-size: 0.85rem;
        font-weight: 400;
        color: #6b8073;
      }
      .footer-email-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.88rem;
        color: #3b5245;
        text-decoration: none;
        margin-bottom: 14px;
      }
      .footer-social-strip {
        display: flex;
        gap: 10px;
      }
      .footer-social-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 9px 16px;
        border-radius: 999px;
        background: #102e21;
        color: #fbf8f1;
        font-size: 0.85rem;
        font-weight: 500;
        text-decoration: none;
      }
      .footer-social-btn--phone {
        background: transparent;
        color: #102e21;
        border: 1px solid rgba(16, 46, 33, 0.3);
      }
      .footer-bottom-bar {
        border-top: 1px solid rgba(25, 62, 45, 0.12);
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 0.78rem;
        color: #6b8073;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/new-footer-mobile-preview.png' });
  await browser.close();
}

testMobileFooter().catch(console.error);
