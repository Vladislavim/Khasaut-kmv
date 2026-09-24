import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('dist/.vite/manifest.json', 'utf8'));

// Helper to find asset hashed path
function getAssetPath(filenamePart) {
  const entry = Object.entries(manifest).find(([k]) => k.includes(filenamePart) && (k.endsWith('.webp') || k.endsWith('.jpg') || k.endsWith('.jpeg')));
  if (entry) {
    return `https://khasaut-kmv.ru/${entry[1].file}`;
  }
  return `https://khasaut-kmv.ru/assets/${filenamePart}`;
}

const tours = [
  // 1. Джип-туры в горы (Category 2)
  {
    id: 1,
    slug: 'dzhily-su',
    name: 'Джип-тур на урочище Джилы-Су из Кисловодска',
    category: 2,
    price: 3700,
    image: getAssetPath('dzhily-su-01-optimized'),
    desc: 'Однодневный джип-тур в урочище Джилы-Су к северному подножию Эльбруса. Водопады Султан и Каракая-Су, Долина Замков, скалы Аватары и природные теплые нарзанные ванны.',
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
    desc: 'Поездка на внедорожнике к плато Бермамыт на высоте 2592 метра: скалы-амфитеатры, скалы Два Монаха и панорамный вид на Эльбрус на рассвете.',
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
    desc: 'Внедорожный маршрут на 1 день: плато Бермамыт и урочище Джилы-Су за один выезд на подготовленном джипе 4х4 с опытным водителем.',
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
    desc: 'Горный курорт Домбай: перевал Гум-Баши с панорамой Эльбруса, ущелье Гоначхир, озеро Туманлы-Кёль, канатные дороги на высоту 3200 м и вершина Мусса-Ачитара.',
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
    desc: 'Баксанское ущелье, поляна Азау и поляна Чегет. Подъём на канатной дороге до станции Гарабаши на высоту 3847 метров к ледникам Эльбруса.',
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
    desc: 'Маршрут через каньоны перевала Актопрак, средневековый комплекс Эльтюбю, Чегемская теснина с водопадами и высокогорное озеро Гижгит.',
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
    desc: 'Винный замок Шато-Эркен, Черекская теснина, скальный выступ Язык Дракона, средневековые башни Амирхановых и карстовые Голубые озёра.',
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
    desc: 'Софийская поляна, ледниковые водопады, аланские христианские храмы X века Нижне-Архызского городища и территория обсерватории САО РАН.',
    transport: 'Внедорожник 4х4',
    duration: '1 день (12 часов)'
  },
  {
    id: 12,
    slug: 'pereval-vosmerka',
    name: 'Джип-тур на перевал Восьмёрка и плато Шаджатмаз',
    category: 2,
    price: 3500,
    image: getAssetPath('excursion-vosmerka-optimized'),
    desc: 'Панорамный джип-тур над Кисловодском на высоту 2100 м с видом на Эльбрус, горные серпантины перевала Восьмёрка и субальпийские луга.',
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
    desc: 'Группа из 5 Медовых водопадов в каньоне реки Аликоновка, природная скала Кольцо и Чайный домик с дегустацией горного чая и мёда.',
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
    desc: 'Долина в ущелье реки Хасаут с 11 природными источниками минеральной воды нарзанного типа, старинный охотничий замок и горные пейзажи.',
    transport: 'Внедорожник 4х4',
    duration: '4-5 часов'
  },
  {
    id: 15,
    slug: 'khurla-kol',
    name: 'Джип-тур на высокогорное озеро Хурла-Кёль',
    category: 2,
    price: 5500,
    image: getAssetPath('khurla-kol-01-optimized'),
    desc: 'Труднодоступное озеро на высоте 2000 м в окружении хвойного леса, прозрачная горная вода и спокойная природная атмосфера без плотного потока туристов.',
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
    desc: 'Природные песчаные лабиринты, причудливые скалы-останцы выветривания и дикие горные панорамы урочища Худес.',
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
    desc: 'Высокогорный оффроуд-маршрут над Тебердой: альпийские луга, панорама Главного Кавказского хребта и спуск к высокогорным озёрам.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (10-11 часов)'
  },
  {
    id: 18,
    slug: 'makhar',
    name: 'Джип-тур в ущелье Махар к водопадам и нарзанам',
    category: 2,
    price: 5500,
    image: getAssetPath('makhar-01-optimized'),
    desc: 'Ущелье реки Махар в Карачаево-Черкесии: водопады Махар-Су и Гондарай, минеральные нарзанные выходы и хвойные лесные массивы.',
    transport: 'Подготовленный внедорожник 4х4',
    duration: '1 день (10-11 часов)'
  },

  // 2. Туры по республикам Кавказа (Category 3)
  {
    id: 9,
    slug: 'ossetia',
    name: 'Экскурсия в горную Северную Осетию: Куртатинское ущелье',
    category: 3,
    price: 5500,
    image: getAssetPath('ossetia-01'),
    desc: 'Кармадонское ущелье, средневековый некрополь Даргавс (Город мёртвых), высокогорный Аланский Успенский монастырь и арт-объект осетинская буква «АЕ».',
    transport: 'Комфортный внедорожник',
    duration: '1 день (13-14 часов)'
  },
  {
    id: 10,
    slug: 'ingushetia',
    name: 'Экскурсия в горную Ингушетию: страна башен и Вовнушки',
    category: 3,
    price: 5500,
    image: getAssetPath('ingushetia-01-optimized'),
    desc: 'Джейрахское ущелье, башенные комплексы Эгикал и Таргим, старинный башенный замок Вовнушки и виды на Цей-Лоамский перевал.',
    transport: 'Внедорожник / минивэн',
    duration: '1 день (13-14 часов)'
  },
  {
    id: 11,
    slug: 'grozny',
    name: 'Экскурсия в Грозный и Аргунское ущелье',
    category: 3,
    price: 6000,
    image: getAssetPath('grozny-01'),
    desc: 'Мечеть «Сердце Чечни», высотный комплекс Грозный-Сити со смотровой площадкой, Ушкалойские башни в Аргунском ущелье и Нихалойские водопады.',
    transport: 'Комфортабельный транспорт',
    duration: '1 день (14 часов)'
  },

  // 3. Горный треккинг и пешие маршруты (Category 4)
  {
    id: 19,
    slug: 'baduk-lakes',
    name: 'Треккинг на Бадукские озёра в Тебердинском национальном парке',
    category: 4,
    price: 5500,
    image: getAssetPath('baduk-lakes-01'),
    desc: 'Пеший экотреккинг по Тебердинскому национальному парку: каскад из трёх высокогорных озёр с бирюзовой водой среди пихтового леса.',
    transport: 'Внедорожник + пеший треккинг',
    duration: '1 день (10 часов)'
  },

  // 4. Термальные комплексы и источники (Category 5)
  {
    id: 20,
    slug: 'suvorovskie',
    name: 'Поездка на Суворовские термальные источники №1',
    category: 5,
    price: 900,
    image: getAssetPath('suvorovskie-01-optimized'),
    desc: 'Купание в оборудованных термальных бассейнах с природной минеральной водой различной температуры от +34 °C до +42 °C.',
    transport: 'Минивэн / авто',
    duration: '4 часа'
  },
  {
    id: 21,
    slug: 'pearl',
    name: 'Поездка в термальный спа-комплекс «Жемчужина Кавказа»',
    category: 5,
    price: 900,
    image: getAssetPath('pearl-01-optimized'),
    desc: 'Оздоровительный спа-комплекс: 8 термальных бассейнов с минеральной водой, сауны, хамам и зоны гидромассажа.',
    transport: 'Минивэн / авто',
    duration: '4-5 часов'
  },
  {
    id: 22,
    slug: 'geduko',
    name: 'Поездка на термальные источники «Гедуко»',
    category: 5,
    price: 900,
    image: getAssetPath('geduko-01-optimized'),
    desc: 'Термальный комплекс в Баксанском районе: контрастные и релакс-бассейны с минеральной водой, водные аттракционы и зоны отдыха.',
    transport: 'Минивэн / авто',
    duration: '5 часов'
  },
  {
    id: 23,
    slug: 'aushiger',
    name: 'Поездка на термальные источники Аушигер',
    category: 5,
    price: 900,
    image: getAssetPath('aushiger-01-optimized'),
    desc: 'Природные горячие источники из глубокой скважины с минеральным составом солей для релаксации и купания в открытых бассейнах.',
    transport: 'Минивэн / авто',
    duration: '5-6 часов'
  },

  // 5. Конные прогулки (Category 6)
  {
    id: 24,
    slug: 'horse-rides',
    name: 'Конные прогулки в горах Кисловодска',
    category: 6,
    price: 2000,
    image: getAssetPath('horse-hero-optimized'),
    desc: 'Верховые прогулки на карачаевских лошадях по горным перевалам, лесным тропам и лугам в сопровождении инструктора.',
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
      <category id="2" parentId="1">Джип-туры в горы</category>
      <category id="3" parentId="1">Туры по республикам Кавказа</category>
      <category id="4" parentId="1">Горный треккинг и пешие маршруты</category>
      <category id="5" parentId="1">Термальные комплексы и источники</category>
      <category id="6" parentId="1">Конные прогулки</category>
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
        <param name="Тип цены">От (за человека в мини-группе)</param>
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
