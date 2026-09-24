const { chromium } = require('playwright');
const path = require('path');

async function testNewFooter() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Inject improved footer HTML and CSS
  await page.evaluate(() => {
    const footer = document.querySelector('.footer-section');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-mountain-backdrop" aria-hidden="true"></div>
      <div class="container footer-container">
        <div class="footer-grid">
          
          <!-- Column 1: Brand -->
          <div class="footer-col footer-col--brand">
            <div class="footer-logo">
              <span class="footer-brand-title">KHASAUT TOUR</span>
            </div>
            <p class="footer-brand-desc">
              Индивидуальные и групповые джип-туры по Северному Кавказу из городов КМВ.
              Показываем не «для галочки», а то, что действительно впечатляет.
            </p>
            <div class="footer-cities">
              <span>Кисловодск</span> · <span>Пятигорск</span> · <span>Ессентуки</span><br>
              <span>Железноводск</span> · <span>Минводы</span>
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
              <a href="https://wa.me/79187477212" target="_blank" class="footer-social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                WhatsApp
              </a>
              <a href="tel:+79187477212" class="footer-social-btn footer-social-btn--phone" aria-label="Позвонить">
                Позвонить
              </a>
            </div>
          </div>

        </div>

        <div class="footer-bottom-bar">
          <span>© 2026 Khasaut Tour. Все права защищены.</span>
          <span>Путешествия и джип-туры по Северному Кавказу</span>
        </div>
      </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      .footer-section {
        background: #fbf8f1 !important;
        color: #102e21 !important;
        padding-top: 56px !important;
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
        height: 180px;
        background: url('/design-reference/khasaut/assets/decor/footer-mountain-ridge.png') no-repeat bottom center;
        background-size: cover;
        opacity: 0.12;
        pointer-events: none;
      }
      .footer-container {
        position: relative;
        z-index: 2;
        max-width: 1220px;
        margin: 0 auto;
        padding: 0 24px;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
        gap: 40px;
        margin-bottom: 48px;
      }
      .footer-brand-title {
        font-family: 'Cinzel', 'Spectral', serif;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #102e21;
        display: inline-block;
        margin-bottom: 12px;
      }
      .footer-brand-desc {
        font-size: 0.92rem;
        line-height: 1.55;
        color: #3b5245;
        margin-bottom: 16px;
        max-width: 320px;
      }
      .footer-cities {
        font-size: 0.8rem;
        color: #6b8073;
        line-height: 1.6;
        letter-spacing: 0.02em;
      }
      .footer-col-title {
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #c5a059;
        margin-bottom: 18px;
      }
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .footer-links a {
        color: #102e21;
        font-size: 0.92rem;
        text-decoration: none;
        transition: color 150ms ease;
      }
      .footer-links a:hover {
        color: #c5a059;
      }
      .footer-phone-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 12px;
      }
      .footer-phone {
        font-size: 1.05rem;
        font-weight: 600;
        color: #102e21;
        text-decoration: none;
        display: flex;
        align-items: baseline;
        gap: 6px;
      }
      .footer-phone-name {
        font-size: 0.85rem;
        font-weight: 400;
        color: #6b8073;
      }
      .footer-email-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.88rem;
        color: #3b5245;
        text-decoration: none;
        margin-bottom: 18px;
      }
      .footer-email-link:hover {
        color: #102e21;
      }
      .footer-social-strip {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .footer-social-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 999px;
        background: #102e21;
        color: #fbf8f1;
        font-size: 0.85rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 150ms ease;
      }
      .footer-social-btn:hover {
        background: #1b4532;
        transform: translateY(-1px);
      }
      .footer-social-btn--phone {
        background: transparent;
        color: #102e21;
        border: 1px solid rgba(16, 46, 33, 0.3);
      }
      .footer-social-btn--phone:hover {
        background: rgba(16, 46, 33, 0.05);
      }
      .footer-bottom-bar {
        border-top: 1px solid rgba(25, 62, 45, 0.12);
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.82rem;
        color: #6b8073;
      }
      @media (max-width: 900px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
      }
      @media (max-width: 600px) {
        .footer-grid {
          grid-template-columns: 1fr;
          gap: 28px;
        }
        .footer-bottom-bar {
          flex-direction: column;
          gap: 8px;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/new-footer-preview.png' });
  await browser.close();
}

testNewFooter().catch(console.error);
