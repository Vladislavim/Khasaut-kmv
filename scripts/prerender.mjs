import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const origin = 'https://khasaut-kmv.ru'
const out = resolve('dist')
const template = await readFile(resolve(out, 'index.html'), 'utf8')
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
  const entries = [
    { path:'/', title:'Экскурсии и джип-туры из Кисловодска и КМВ | Khasaut Tour', description:'Джилы-Су, Бермамыт, Домбай и Архыз. Выберите поездку по Кавказу, рассчитайте стоимость для своей компании и уточните дату у организатора.', image:assets.heroBackground },
    ...[['/excursions',data.excursionsPage],['/routes',data.routesPage],['/thermal-springs',data.thermalPage],['/horse-rides',data.horsePage],['/about',data.aboutPage],['/prices',pricesMeta]].map(([path, meta]) => ({path,title:meta.seoTitle ?? `${meta.title} | Khasaut Tour`,description:meta.seoDescription ?? meta.intro,image:meta.heroImage})),
    {path:'/contact',title:'Контакты организатора экскурсий | Khasaut Tour',description:'Обсудите маршрут, дату и стоимость поездки по Северному Кавказу. Телефоны и WhatsApp организатора Khasaut Tour.',image:assets.heroBackground},
    ...data.detailPages.map(page => ({path:`/detail/${page.slug}`,title:`${page.title} — экскурсия из Кисловодска и КМВ | Khasaut Tour`,description:`${page.intro} Узнайте стоимость, выберите формат и обсудите дату поездки с организатором.`,image:page.image})),
    {path:'/404',title:'Страница не найдена | Khasaut Tour',description:'Выберите экскурсию из каталога Khasaut Tour.',image:assets.heroBackground},
  ]
  for (const entry of entries) {
    const canonical = `${origin}${entry.path === '/' ? '/' : `${entry.path}/`}`
    let content = asset(renderToString(createElement(App, { path: entry.path })))
    // Reveal content is available before JavaScript and when scripts are disabled.
    const schema = { '@context':'https://schema.org', '@graph':[
      { '@type':'TravelAgency', '@id':`${origin}/#organization`, name:'Khasaut Tour',url:`${origin}/`,telephone:innerContacts.primaryPhone.label,email:innerContacts.email.label,areaServed:'Кавказские Минеральные Воды' },
      { '@type':'WebPage', '@id':canonical,url:canonical,name:entry.title,description:entry.description,inLanguage:'ru-RU',isPartOf:{'@id':`${origin}/#website`} },
      { '@type':'WebSite','@id':`${origin}/#website`,name:'Khasaut Tour',url:`${origin}/`,inLanguage:'ru-RU',publisher:{'@id':`${origin}/#organization`} },
      ...(entry.path === '/' || entry.path === '/404' ? [] : [{ '@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Главная',item:`${origin}/`},{'@type':'ListItem',position:2,name:entry.title.split(' | ')[0],item:canonical}] }]),
    ] }
    const head = `<link rel="canonical" href="${canonical}" />\n<meta property="og:type" content="website" /><meta property="og:locale" content="ru_RU" /><meta property="og:site_name" content="Khasaut Tour" /><meta property="og:title" content="${escape(entry.title)}" /><meta property="og:description" content="${escape(entry.description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${origin}${asset(entry.image)}" /><meta name="twitter:card" content="summary_large_image" /><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>${entry.path === '/404' ? '<meta name="robots" content="noindex,follow" />' : ''}`
    const html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(entry.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(entry.description)}" />`).replace('</head>',`${head}</head>`).replace('<div id="root"></div>',`<div id="root">${content}</div>`)
    if (/\/(?:src|design-reference)\//.test(html)) throw new Error(`Unmapped source asset in ${entry.path}: ${html.match(/[^"' <>]*\/(?:src|design-reference)\/[^"' <>]*/g)?.slice(0,5).join(', ')}`)
    const destination = entry.path === '/' ? resolve(out,'index.html') : entry.path === '/404' ? resolve(out,'404.html') : resolve(out,`.${entry.path}`,'index.html')
    await mkdir(resolve(destination,'..'),{recursive:true})
    await writeFile(destination,html)
    if (entry.path !== '/404') generated.push({path:entry.path,url:canonical,title:entry.title})
  }
  await writeFile(resolve(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${generated.map(entry => `<url><loc>${entry.url}</loc></url>`).join('')}</urlset>`)
  await writeFile(resolve(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
  await writeFile(resolve(out,'.htaccess'),`DirectoryIndex index.html\nErrorDocument 404 /404.html\nRewriteEngine On\nRewriteCond %{HTTPS} !=on\nRewriteRule ^ https://khasaut-kmv.ru%{REQUEST_URI} [R=301,L]\nRewriteCond %{HTTP_HOST} ^www\\.khasaut-kmv\\.ru$ [NC]\nRewriteRule ^ https://khasaut-kmv.ru%{REQUEST_URI} [R=301,L]\nRewriteRule ^services/?$ /excursions/ [R=301,L]\n`)
  await mkdir(resolve('artifacts/seo-research'),{recursive:true})
  await writeFile(resolve('artifacts/seo-research/generated-pages.json'),JSON.stringify(generated,null,2))
  console.log(`Prerendered ${generated.length} pages + 404; sitemap, canonical, Open Graph and structured data generated for ${origin}`)
} finally { await server.close() }
