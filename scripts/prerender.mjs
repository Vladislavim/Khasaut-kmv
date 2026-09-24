import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const origin = 'https://khasaut-kmv.ru'
const out = resolve('dist')
const rawTemplate = await readFile(resolve(out, 'index.html'), 'utf8')
const manifest = JSON.parse(await readFile(resolve(out, '.vite/manifest.json'), 'utf8'))
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]))
const asset = (s) => {
  let value = s
  for (const [source, entry] of Object.entries(manifest)) {
    if (!entry.file) continue
    value = value.split(`/${source}`).join(`/${entry.file}`)
  }
  return value
}
const generated = []
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const data = await server.ssrLoadModule('/src/data/innerPages.ts')
  const { assets } = await server.ssrLoadModule('/src/data/assets.ts')
  const { pricesMeta } = await server.ssrLoadModule('/src/data/pricesMeta.ts')
  const { innerContacts } = await server.ssrLoadModule('/src/data/innerContacts.ts')
  const { homeFaqItems } = await server.ssrLoadModule('/src/data/homeFaqData.ts')
  const { getMinimumGroupPrice, getPriceKeyForRouteSlug } = await server.ssrLoadModule('/src/data/prices.ts')

  // Clean raw template: remove static meta tags that will be injected dynamically per page
  const cleanTemplate = rawTemplate
    .replace(/<link rel="canonical"[^>]*\/>/gi, '')
    .replace(/<meta property="og:[^"]*" content="[^"]*"\s*\/>/gi, '')
    .replace(/<meta name="twitter:[^"]*" content="[^"]*"\s*\/>/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')

  const entries = [
    { path:'/', title:'Джип-туры и джиппинг в Кисловодске 2026 — экскурсии по горам Кавказа: цены от 4 000 ₽ | Khasaut Tour', description:'Индивидуальные джип-туры и джиппинг из Кисловодска по горам Кавказа в 2026 году: Джилы-Су, Бермамыт, Эльбрус, Домбай, Архыз. Комфортные внедорожники, опытные гиды, честные цены от 4 000 руб.', image:'/og-image.jpg' },
    ...[['/excursions',data.excursionsPage],['/routes',data.routesPage],['/thermal-springs',data.thermalPage],['/horse-rides',data.horsePage],['/about',data.aboutPage],['/prices',pricesMeta]].map(([path, meta]) => ({path,title:meta.seoTitle ?? `${meta.title} | Khasaut Tour`,description:meta.seoDescription ?? meta.intro,image:meta.heroImage})),
    {path:'/contact',title:'Контакты организатора экскурсий в Кисловодске | Khasaut Tour',description:'Обсудите маршрут, дату и стоимость поездки по Северному Кавказу. Телефоны и WhatsApp организатора Khasaut Tour: +7 (928) 009-88-81.',image:'/og-image.jpg'},
    ...data.detailPages.map(page => ({path:`/detail/${page.slug}`,title:page.seoTitle ?? `${page.title} — джип-тур из Кисловодска 2026: цены | Khasaut Tour`,description:page.seoDescription ?? `${page.intro} Узнайте стоимость, маршрут и забронируйте поездку онлайн.`,image:page.image,slug:page.slug,pageTitle:page.title,intro:page.intro})),
    {path:'/404',title:'Страница не найдена | Khasaut Tour',description:'Выберите экскурсию из каталога Khasaut Tour.',image:'/og-image.jpg'},
  ]

  for (const entry of entries) {
    const canonical = `${origin}${entry.path === '/' ? '/' : `${entry.path}/`}`
    let content = asset(renderToString(createElement(App, { path: entry.path })))

    const graph = [
      {
        '@type': ['TravelAgency', 'TouristInformationCenter'],
        '@id': `${origin}/#organization`,
        name: 'Khasaut Tour',
        alternateName: 'Хасаут Тур',
        url: `${origin}/`,
        logo: `${origin}/favicon.svg`,
        image: `${origin}/og-image.jpg`,
        telephone: ['+7-928-009-88-81', '+7-925-760-09-09'],
        email: innerContacts.email.label,
        priceRange: '4000 - 25000 RUB',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Кисловодск',
          addressRegion: 'Ставропольский край',
          addressCountry: 'RU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.9056,
          longitude: 42.7161
        },
        areaServed: [
          { '@type': 'City', name: 'Кисловодск' },
          { '@type': 'City', name: 'Пятигорск' },
          { '@type': 'City', name: 'Ессентуки' },
          { '@type': 'City', name: 'Железноводск' },
          { '@type': 'City', name: 'Минеральные Воды' }
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '23:00'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.98',
          bestRating: '5',
          worstRating: '1',
          ratingCount: 1040,
          reviewCount: 1040
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'Khasaut Tour',
        url: `${origin}/`,
        inLanguage: 'ru-RU',
        publisher: { '@id': `${origin}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/excursions/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: entry.title,
        description: entry.description,
        inLanguage: 'ru-RU',
        isPartOf: { '@id': `${origin}/#website` }
      },
      ...(entry.path === '/' || entry.path === '/404' ? [] : [{
        '@type': 'BreadcrumbList',
        itemListElement: entry.slug ? [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Экскурсии', item: `${origin}/excursions/` },
          { '@type': 'ListItem', position: 3, name: entry.pageTitle, item: canonical }
        ] : [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: `${origin}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: entry.path === '/prices' ? 'Цены и прайс-лист'
              : entry.path === '/about' ? 'О компании'
              : entry.path === '/contact' ? 'Контакты'
              : entry.path === '/routes' ? 'Необычные маршруты'
              : entry.path === '/thermal-springs' ? 'Термальные источники'
              : entry.path === '/horse-rides' ? 'Конные прогулки'
              : entry.path === '/excursions' ? 'Экскурсии'
              : entry.title.split(' — ')[0].split(' | ')[0],
            item: canonical
          }
        ]
      }])
    ]

    // Homepage Schema additions: FAQPage and SiteNavigationElement (Sitelinks / быстрые ссылки)
    if (entry.path === '/') {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${origin}/#faq`,
        mainEntity: homeFaqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      })

      graph.push({
        '@type': 'ItemList',
        '@id': `${origin}/#sitelinks`,
        name: 'Быстрые ссылки Khasaut Tour',
        itemListElement: [
          {
            '@type': 'SiteNavigationElement',
            position: 1,
            name: 'Экскурсии и джип-туры',
            description: 'Каталог маршрутов по горам Кавказа из Кисловодска',
            url: `${origin}/excursions/`
          },
          {
            '@type': 'SiteNavigationElement',
            position: 2,
            name: 'Цены и прайс-лист 2026',
            description: 'Стоимость поездок в мини-группах и индивидуально от 4 000 ₽',
            url: `${origin}/prices/`
          },
          {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: 'Плато Бермамыт на рассвете',
            description: 'Джип-тур на высоту 2592 м с панорамой Эльбруса от 4 000 ₽',
            url: `${origin}/detail/bermamyt/`
          },
          {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: 'Урочище Джилы-Су',
            description: 'Водопады, термальные источники и Долина Замков от 4 500 ₽',
            url: `${origin}/detail/dzhily-su/`
          },
          {
            '@type': 'SiteNavigationElement',
            position: 5,
            name: 'О компании и гидах',
            description: 'История Khasaut Tour, подготовленные внедорожники и отзывы 4.98',
            url: `${origin}/about/`
          },
          {
            '@type': 'SiteNavigationElement',
            position: 6,
            name: 'Контакты и бронь',
            description: 'Прямая связь с организатором в WhatsApp и по телефону',
            url: `${origin}/contact/`
          }
        ]
      })
    }

    // Detail page additions: TouristTrip and Product schemas with Offer prices & AggregateRating
    if (entry.slug) {
      const priceKey = getPriceKeyForRouteSlug(entry.slug)
      const minPrice = getMinimumGroupPrice(priceKey)
      graph.push({
        '@type': ['Product', 'TouristTrip'],
        '@id': `${canonical}#trip`,
        name: `${entry.pageTitle} — джип-тур из Кисловодска`,
        description: entry.intro,
        image: `${origin}${asset(entry.image)}`,
        category: 'Джип-туры и экскурсии по Кавказу',
        touristType: ['AdventureTourism', 'CulturalTourism'],
        provider: { '@id': `${origin}/#organization` },
        brand: {
          '@type': 'Brand',
          name: 'Khasaut Tour'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.98',
          bestRating: '5',
          worstRating: '1',
          ratingCount: 1040,
          reviewCount: 1040
        },
        ...(minPrice ? {
          offers: {
            '@type': 'Offer',
            price: minPrice,
            priceCurrency: 'RUB',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: canonical,
            seller: { '@id': `${origin}/#organization` }
          }
        } : {})
      })
    }

    const schema = { '@context': 'https://schema.org', '@graph': graph }

    const head = [
      `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="ru_RU" />`,
      `<meta property="og:site_name" content="Khasaut Tour" />`,
      `<meta property="og:title" content="${escape(entry.title)}" />`,
      `<meta property="og:description" content="${escape(entry.description)}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${origin}${asset(entry.image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escape(entry.title)}" />`,
      `<meta name="twitter:description" content="${escape(entry.description)}" />`,
      `<meta name="twitter:image" content="${origin}${asset(entry.image)}" />`,
      `<meta name="robots" content="${entry.path === '/404' ? 'noindex,follow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'}" />`,
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    ].filter(Boolean).join('\n    ')

    const html = cleanTemplate
      .replace(/<title>.*?<\/title>/s, `<title>${escape(entry.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(entry.description)}" />`)
      .replace('</head>', `    ${head}\n  </head>`)
      .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${content}</div>`)

    if (/\/(?:src|design-reference)\//.test(html)) {
      throw new Error(`Unmapped source asset in ${entry.path}: ${html.match(/[^"' <>]*\/(?:src|design-reference)\/[^"' <>]*/g)?.slice(0, 5).join(', ')}`)
    }

    const destination = entry.path === '/'
      ? resolve(out, 'index.html')
      : entry.path === '/404'
        ? resolve(out, '404.html')
        : resolve(out, `.${entry.path}`, 'index.html')

    await mkdir(resolve(destination, '..'), { recursive: true })
    await writeFile(destination, html)
    if (entry.path !== '/404') generated.push({ path: entry.path, url: canonical, title: entry.title })
  }

  await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${generated.map(entry => `<url><loc>${entry.url}</loc></url>`).join('')}</urlset>`)
  await writeFile(resolve(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\nHost: ${origin}\n`)
  await writeFile(resolve(out, '.htaccess'), `DirectoryIndex index.html\nErrorDocument 404 /404.html\nRewriteEngine On\nRewriteCond %{HTTPS} !=on\nRewriteRule ^ https://khasaut-kmv.ru%{REQUEST_URI} [R=301,L]\nRewriteCond %{HTTP_HOST} ^www\\.khasaut-kmv\\.ru$ [NC]\nRewriteRule ^ https://khasaut-kmv.ru%{REQUEST_URI} [R=301,L]\nRewriteRule ^services/?$ /excursions/ [R=301,L]\n`)
  await mkdir(resolve('artifacts/seo-research'), { recursive: true })
  await writeFile(resolve('artifacts/seo-research/generated-pages.json'), JSON.stringify(generated, null, 2))
  console.log(`Prerendered ${generated.length} pages + 404; sitemap, canonical, Open Graph and structured data generated for ${origin}`)
} finally {
  await server.close()
}
