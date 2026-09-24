import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(fs.readFileSync('dist/.vite/manifest.json', 'utf8'));

// Helper to find asset hashed path
function getAssetPath(filenamePart) {
  const entry = Object.entries(manifest).find(([k]) => k.includes(filenamePart) && (k.endsWith('.webp') || k.endsWith('.jpg') || k.endsWith('.jpeg')));
  if (entry) {
    return `https://khasaut-kmv.ru/${entry[1].file}`;
  }
  // Fallback
  return `https://khasaut-kmv.ru/assets/${filenamePart}`;
}

const tours = [
  {
    id: 1,
    slug: 'dzhily-su',
    name: 'Джип-тур на урочище Джилы-Су из Кисловодска',
    category: 2,
    price: 3700,
    image: getAssetPath('dzhily-su-01-optimized'),
    desc: 'Однодневный джип-тур в урочище Джилы-Су к подножию Эльбруса. Водопады Султан и Каракая-Су, Долина Замков, скалы Аватары и теплые минеральные нарзанные ванны.',
    transport: 'Внедорожник 4х4',
    duration: '1 день (8-9 часов)'
  },
  {
    id: 2,
    slug: 'bermamyt',
    name: 'Джип-тур на плато Бермамыт на рассвете',
    category: 2,
    price: 4200,
    image: getAssetPath('photo-01-bermamyt-target-generated'),
    desc: 'Встреча рассвета на высоте 2592 метра: скалы-амфитеатры, скалы Два Монаха и грандиозный вид на двуглавый Эльбрус с лучшей смотровой площадки Кавказа.',
    transport: 'Внедорожник 4х4',
    duration: '8-9 часов'
  },
  {
    id: 3,
    slug: 'dzhily-su-bermamyt',
    name: 'Комбо джип-тур: Джилы-Су и плато Бермамыт за 1 день',
    category: 2,
    price: 6000,
    image: getAssetPath('dzhily-su-bermamyt-01'),
    desc: 'Максимальный внедорожный маршрут: два главных символа Северного Кавказа за один выезд на подготовленном джипе с опытным гидом-водителем.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (11-12 часов)'
  },
  {
    id: 4,
    slug: 'dombay',
    name: 'Экскурсия в Домбай на внедорожнике из Кисловодска',
    category: 2,
    price: 4200,
    image: getAssetPath('dombay-01-optimized'),
    desc: 'Высокогорный курорт Домбай: перевал Гум-Баши с видом на Эльбрус, ущелье Гоначхир, озеро Туманлы-Кёль, канатные дороги на высоту 3200 м и пик Мусса-Ачитара.',
    transport: 'Внедорожник / микроавтобус',
    duration: '1 день (12 часов)'
  },
  {
    id: 5,
    slug: 'elbrus',
    name: 'Экскурсия на Эльбрус и поляну Азау из Кисловодска',
    category: 2,
    price: 4200,
    image: getAssetPath('elbrus-01-optimized'),
    desc: 'Баксанское ущелье, поляна Азау и поляна Чегет. Подъём на канатной дороге до станции Гарабаши на высоту 3847 метров к вечным ледникам Эльбруса.',
    transport: 'Внедорожник / минивэн',
    duration: '1 день (12-13 часов)'
  },
  {
    id: 6,
    slug: 'aktoprak',
    name: 'Джип-тур через перевал Актопрак и Чегемские водопады',
    category: 2,
    price: 4200,
    image: getAssetPath('aktoprak-01-optimized'),
    desc: 'Древний караванный путь через глиняные каньоны Актопрак, средневековый город мёртвых Эльтюбю, Чегемская теснина и высокогорное бирюзовое озеро Гижгит.',
    transport: 'Внедорожник 4х4',
    duration: '1 день (10-11 часов)'
  },
  {
    id: 7,
    slug: 'balkaria',
    name: 'Джип-тур в Верхнюю Балкарию и Черекскую теснину',
    category: 2,
    price: 5000,
    image: getAssetPath('balkaria-01-optimized'),
    desc: 'Винный замок Шато-Эркен, головокружительная Черекская теснина, скала Язык Дракона, древние башни Амирхановых и карстовые Голубые озёра.',
    transport: 'Внедорожник 4х4',
    duration: '1 день (11-12 часов)'
  },
  {
    id: 8,
    slug: 'arkhyz',
    name: 'Джип-тур в Архыз к Софийским водопадам и храмам',
    category: 2,
    price: 4700,
    image: getAssetPath('arkhyz-01-optimized'),
    desc: 'Софийская поляна, ледниковые водопады, древнейшие аланские христианские храмы X века и крупнейшая астрофизическая обсерватория САО РАН.',
    transport: 'Внедорожник 4х4',
    duration: '1 день (12 часов)'
  },
  {
    id: 9,
    slug: 'ossetia',
    name: 'Экскурсия в горную Северную Осетию: Куртатинское ущелье',
    category: 2,
    price: 5500,
    image: getAssetPath('ossetia-01'),
    desc: 'Кармадонское ущелье, древний некрополь Даргавс (Город мёртвых), высокогорный Фиагдонский монастырь и арт-объект осетинская буква «АЕ».',
    transport: 'Комфортный внедорожник',
    duration: '1 день (13-14 часов)'
  },
  {
    id: 10,
    slug: 'ingushetia',
    name: 'Экскурсия в горную Ингушетию: страна башен и Вовнушки',
    category: 2,
    price: 5500,
    image: getAssetPath('ingushetia-01-optimized'),
    desc: 'Джейрахское ущелье, средневековый башенный комплекс Эгикал, Таргим и легендарный замок-крепость Вовнушки на Великом шёлковом пути.',
    transport: 'Внедорожник / минивэн',
    duration: '1 день (13-14 часов)'
  },
  {
    id: 11,
    slug: 'grozny',
    name: 'Экскурсия в Грозный и Аргунское ущелье',
    category: 2,
    price: 6000,
    image: getAssetPath('grozny-01'),
    desc: 'Мечеть «Сердце Чечни», небоскрёбы Грозный-Сити, смотровая площадка, старинные Ушкалойские башни-близнецы и Нихалойские водопады.',
    transport: 'Комфортабельный транспорт',
    duration: '1 день (14 часов)'
  },
  {
    id: 12,
    slug: 'pereval-vosmerka',
    name: 'Джип-тур на перевал Восьмёрка и плато Шаджатмаз',
    category: 2,
    price: 3500,
    image: getAssetPath('excursion-vosmerka-optimized'),
    desc: 'Панорамный джип-тур над Кисловодском на высоту 2100 м с открытым видом на Эльбрус, живописные серпантины перевала Восьмёрка и альпийские луга.',
    transport: 'Внедорожник 4х4',
    duration: '5-6 часов'
  },
  {
    id: 13,
    slug: 'honey',
    name: 'Экскурсия на Медовые водопады и гору Кольцо',
    category: 2,
    price: 2000,
    image: getAssetPath('honey-01-optimized'),
    desc: 'Каскад из 5 Медовых водопадов в каньоне реки Аликоновка, природная скала Кольцо из романа Лермонтова, Чайный домик с дегустацией варенья и мёда.',
    transport: 'Минивэн / внедорожник',
    duration: '4-5 часов'
  },
  {
    id: 14,
    slug: 'narzan',
    name: 'Экскурсия в Долину Нарзанов из Кисловодска',
    category: 2,
    price: 2000,
    image: getAssetPath('narzan-01'),
    desc: 'Живописная долина в ущелье реки Хасаут с 11 природными источниками минеральной воды, старинный охотничий замок и первозданная кавказская природа.',
    transport: 'Внедорожник 4х4',
    duration: '4-5 часов'
  },
  {
    id: 15,
    slug: 'khurla-kol',
    name: 'Джип-тур на реликтовое озеро Хурла-Кёль',
    category: 2,
    price: 5500,
    image: getAssetPath('khurla-kol-01-optimized'),
    desc: 'Тайное горное озеро на высоте 2000 м в окружении реликтового хвойного леса, чистейшая вода, первозданная тишина и отсутствие туристических толп.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (10 часов)'
  },
  {
    id: 16,
    slug: 'khudes-labyrinth',
    name: 'Джип-тур в Худесский лабиринт и Каменные грибы',
    category: 2,
    price: 5500,
    image: getAssetPath('khudes-labyrinth-01-optimized'),
    desc: 'Уникальные природные песчаные лабиринты, причудливые скалы-останцы выветривания и дикие малоизведанные пейзажи урочища Худес.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (9-10 часов)'
  },
  {
    id: 17,
    slug: 'mukhinskoe-gorge',
    name: 'Джип-тур в Мухинское ущелье и перевал Муху (2764 м)',
    category: 2,
    price: 5500,
    image: getAssetPath('mukhinskoe-gorge-01'),
    desc: 'Настоящий высокогорный оффроуд над Тебердой: альпийские луга, панорама Главного Кавказского хребта и спуск к высокогорным озёрам.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (10-11 часов)'
  },
  {
    id: 18,
    slug: 'makhar',
    name: 'Джип-тур в ущелье Махар: первозданные водопады и нарзаны',
    category: 2,
    price: 5500,
    image: getAssetPath('makhar-01-optimized'),
    desc: 'Дикая первозданная Карачаево-Черкесия: мощные водопады Махар-Су и Гондарай, минеральные нарзанные источники и реликтовые хвойные леса.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (10-11 часов)'
  },
  {
    id: 19,
    slug: 'baduk-lakes',
    name: 'Треккинг на Бадукские озёра в Тебердинском заповеднике',
    category: 2,
    price: 5500,
    image: getAssetPath('baduk-lakes-01'),
    desc: 'Экологический треккинг по Тебердинскому заповеднику: каскад из трёх высокогорных озёр с хрустальной бирюзовой водой среди вековых пихт.',
    transport: 'Внедорожник + пеший треккинг',
    duration: '1 день (10 часов)'
  },
  {
    id: 20,
    slug: 'suvorovskie',
    name: 'Поездка на Суворовские термальные источники №1',
    category: 3,
    price: 900,
    image: getAssetPath('suvorovskie-01-optimized'),
    desc: 'Купание в целебных термальных бассейнах с природной щелочной минеральной водой различной температуры от +34 °C до +42 °C.',
    transport: 'Минивэн / авто',
    duration: '4 часа'
  },
  {
    id: 21,
    slug: 'pearl',
    name: 'Поездка в термальный спа-комплекс «Жемчужина Кавказа»',
    category: 3,
    price: 900,
    image: getAssetPath('pearl-01-optimized'),
    desc: 'Современный оздоровительный спа-комплекс: 8 термальных бассейнов с минеральной водой, сауны, хамам и зоны гидромассажа.',
    transport: 'Минивэн / авто',
    duration: '4-5 часов'
  },
  {
    id: 22,
    slug: 'geduko',
    name: 'Поездка на горячие термальные источники «Гедуко»',
    category: 3,
    price: 900,
    image: getAssetPath('geduko-01-optimized'),
    desc: 'Горячие термальные источники в Баксанском районе: контрастные и релакс-бассейны с минеральной водой, водные горки и зоны отдыха.',
    transport: 'Минивэн / авто',
    duration: '5 часов'
  },
  {
    id: 23,
    slug: 'aushiger',
    name: 'Поездка на азотно-термальные источники Аушигер',
    category: 3,
    price: 900,
    image: getAssetPath('aushiger-01-optimized'),
    desc: 'Природные горячие источники из скважины глубиной 4000 м с уникальным составом солей и минералов для оздоровления суставов и кожи.',
    transport: 'Минивэн / авто',
    duration: '5-6 часов'
  },
  {
    id: 24,
    slug: 'horse-rides',
    name: 'Конные прогулки в горах Кисловодска',
    category: 4,
    price: 2000,
    image: getAssetPath('horse-hero-optimized'),
    desc: 'Прогулки верхом на породистых карачаевских лошадях по горным перевалам, ущельям и альпийским лугам в сопровождении опытного инструктора.',
    transport: 'Верховая езда',
    duration: '1-2 часа / полдня',
    urlOverride: 'https://khasaut-kmv.ru/horse-rides/'
  }
];

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function buildXml() {
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${dateStr}">
  <shop>
    <name>Khasaut Tour</name>
    <company>Khasaut Tour</company>
    <url>https://khasaut-kmv.ru</url>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Экскурсии и активный отдых</category>
      <category id="2" parentId="1">Джип-туры по Кавказу</category>
      <category id="3" parentId="1">Термальные источники</category>
      <category id="4" parentId="1">Конные прогулки</category>
    </categories>
    <offers>
`;

  for (const t of tours) {
    const url = t.urlOverride ?? `https://khasaut-kmv.ru/detail/${t.slug}/`;
    xml += `      <offer id="${t.id}" available="true">
        <name>${escapeXml(t.name)}</name>
        <url>${escapeXml(url)}</url>
        <price>${t.price}</price>
        <currencyId>RUR</currencyId>
        <categoryId>${t.category}</categoryId>
        <picture>${escapeXml(t.image)}</picture>
        <description>${escapeXml(t.desc)}</description>
        <vendor>Khasaut Tour</vendor>
        <param name="Город отправления">Кисловодск</param>
        <param name="Транспорт">${escapeXml(t.transport)}</param>
        <param name="Длительность">${escapeXml(t.duration)}</param>
        <param name="Формат">В мини-группе и индивидуально</param>
      </offer>
`;
  }

  xml += `    </offers>
  </shop>
</yml_catalog>
`;

  return xml;
}

const xml = buildXml();
fs.writeFileSync('public/feed.yml', xml, 'utf8');
fs.writeFileSync('dist/feed.yml', xml, 'utf8');
console.log('Successfully generated public/feed.yml and dist/feed.yml');
console.log('Offers count:', tours.length);
console.log('XML size:', xml.length, 'bytes');
