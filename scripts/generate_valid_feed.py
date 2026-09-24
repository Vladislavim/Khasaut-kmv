import os
import xml.etree.ElementTree as ET
from xml.dom import minidom
import datetime

# 23 Tour definitions
tours = [
    {
        "slug": "dzhily-su",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Джип-тур на Джилы-Су из Кисловодска",
        "price": "3700",
        "image": "dzhily-su-01-optimized-bDKggXql.webp",
        "desc": "Северное Приэльбрусье: водопады Султан и Каракая-Су, Долина Замков, горячие нарзанные ванны и панорама Эльбруса.",
        "reviews": "52",
        "conversion": "2.8"
    },
    {
        "slug": "bermamyt",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Плато Бермамыт: рассвет и панорама Эльбруса",
        "price": "4200",
        "image": "bermamyt-01-optimized-d9Ef7g94.webp",
        "desc": "Встреча рассвета на высоте 2592 метра: скалы-амфитеатры, скалы Монахи и грандиозный вид на двуглавый Эльбрус.",
        "reviews": "46",
        "conversion": "2.7"
    },
    {
        "slug": "dombay",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Экскурсия в Домбай из Кисловодска и КМВ",
        "price": "4200",
        "image": "dombay-01-optimized-Cr7GHhew.webp",
        "desc": "Сердце Кавказских гор: ущелье Гоначхир, озеро Туманлы-Кёль, канатные дороги на высоту более 3000 м и пик Мусса-Ачитара.",
        "reviews": "39",
        "conversion": "2.4"
    },
    {
        "slug": "balkaria",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Верхняя Балкария и Черекская теснина",
        "price": "4200",
        "image": "balkaria-01-optimized-CNPcno1R.webp",
        "desc": "Винный замок Шато-Эркен, Черекское ущелье, скала Язык Дракона, древние башни Амирхановых и Голубые озёра.",
        "reviews": "31",
        "conversion": "2.2"
    },
    {
        "slug": "elbrus",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Эльбрус и поляна Азау: подъём на канатке",
        "price": "4700",
        "image": "elbrus-01-optimized-BbN8cyvU.webp",
        "desc": "Баксанское ущелье, подножие Эльбруса, поляна Чегет, подъём на канатной дороге до станции Гарабаши на 3847 метров.",
        "reviews": "44",
        "conversion": "2.6"
    },
    {
        "slug": "aktoprak",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Перевал Актопрак и Чегемские водопады",
        "price": "4200",
        "image": "aktoprak-01-optimized-dbMaRQTh.webp",
        "desc": "Древний караванный путь через глиняные каньоны, средневековый город мёртвых Эльтюбю, Чегемская теснина и озеро Гижгит.",
        "reviews": "28",
        "conversion": "2.1"
    },
    {
        "slug": "ossetia",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Горная Северная Осетия: Куртатинское ущелье",
        "price": "5000",
        "image": "ossetia-01-CtrV4MsY.jpg",
        "desc": "Кармадонское ущелье, древний некрополь Даргавс (Город мёртвых), Фиагдонский монастырь и арт-объект осетинская буква «АЕ».",
        "reviews": "35",
        "conversion": "2.3"
    },
    {
        "slug": "dzhily-su-bermamyt",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Комбо-джип-тур: Джилы-Су и плато Бермамыт за 1 день",
        "price": "6000",
        "image": "dzhily-su-bermamyt-01-z85UzSOU.jpg",
        "desc": "Максимальный внедорожный маршрут: два главных символа Кавказа за один выезд на подготовленном джипе 4х4.",
        "reviews": "29",
        "conversion": "2.5"
    },
    {
        "slug": "arkhyz",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Архыз: Софийские водопады и древние храмы",
        "price": "4700",
        "image": "arkhyz-01-optimized-BF8QUYiH.webp",
        "desc": "Софийская поляна, ледниковые водопады, древнейшие византийские аланские храмы X века и крупнейшая обсерватория САО РАН.",
        "reviews": "37",
        "conversion": "2.4"
    },
    {
        "slug": "ingushetia",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Горная Ингушетия: страна башен и замок Вовнушки",
        "price": "5000",
        "image": "ingushetia-01-optimized-as0BT9gE.webp",
        "desc": "Джейрахское ущелье, боевые башенные комплексы Таргим и Эгикал, средневековый замок-крепость Вовнушки и храм Тхаба-Ерды.",
        "reviews": "26",
        "conversion": "2.0"
    },
    {
        "slug": "grozny",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Грозный и Аргунское ущелье: Сердце Чечни",
        "price": "5000",
        "image": "excursion-grozny-optimized-Bh_oRfR8.webp",
        "desc": "Мечети «Сердце Чечни» и «Гордость мусульман», башни Грозный-Сити, старинные Ушкалойские башни-близнецы в скале.",
        "reviews": "33",
        "conversion": "2.2"
    },
    {
        "slug": "honey",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Медовые водопады, гора Кольцо и Чайный домик",
        "price": "2500",
        "image": "honey-01-C5-c8I8H.jpg",
        "desc": "Легкая и живописная экскурсия на полдня: каскады водопадов в Аликоновском ущелье, скала Кольцо, дегустация варенья и мёда.",
        "reviews": "58",
        "conversion": "2.9"
    },
    {
        "slug": "narzan",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Долина Нарзанов: 11 целебных источников и замок",
        "price": "3000",
        "image": "narzan-01-OO92hk-U.jpg",
        "desc": "Живописная долина реки Хасаут, дегустация минеральных вод из природных скважин, смотровая площадка на Эльбрус.",
        "reviews": "31",
        "conversion": "2.1"
    },
    {
        "slug": "pereval-vosmerka",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Перевал Восьмёрка и плато Шаджатмаз",
        "price": "4000",
        "image": "excursion-vosmerka-optimized-DumTLoOl.webp",
        "desc": "Авторский джип-тур по высокогорному серпантину: панорама Эльбруса 360°, аул-призрак Хасаут, Нарзанная долина и плато Шаджатмаз.",
        "reviews": "42",
        "conversion": "2.8"
    },
    {
        "slug": "khurla-kol",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Озеро Хурла-Кёль: реликтовая жемчужина Кавказа",
        "price": "5500",
        "image": "khurla-kol-01-optimized-DdzraTSH.webp",
        "desc": "Тайное горное озеро на высоте 2000 м, реликтовый хвойный лес, чистейшая вода и полное отсутствие туристических толп.",
        "reviews": "22",
        "conversion": "1.9"
    },
    {
        "slug": "khudes-labyrinth",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Худесский лабиринт и Каменные грибы",
        "price": "5000",
        "image": "khudes-labyrinth-01-optimized-aUukeFj9.webp",
        "desc": "Уникальные природные песчаные лабиринты, причудливые останцы выветривания и дикие пейзажи урочища Худес.",
        "reviews": "20",
        "conversion": "1.8"
    },
    {
        "slug": "mukhinskoe-gorge",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Мухинское ущелье и перевал Муху (2764 м)",
        "price": "5000",
        "image": "mukhinskoe-gorge-01-7vjgo_d6.jpeg",
        "desc": "Настоящий оффроуд над Тебердой: альпийские луга, панорама Главного Кавказского хребта и спуск к высокогорным озерам.",
        "reviews": "24",
        "conversion": "1.9"
    },
    {
        "slug": "makhar",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Ущелье Махар: первозданные водопады и нарзаны",
        "price": "5500",
        "image": "makhar-01-optimized-B4URxdOf.webp",
        "desc": "Дикая Карачаево-Черкесия: водопады Махар-Су и Гондарай, минеральные источники и нетронутая природа.",
        "reviews": "25",
        "conversion": "2.0"
    },
    {
        "slug": "baduk-lakes",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Бадукские озёра: каскад бирюзовых высокогорных озёр",
        "price": "4500",
        "image": "baduk-lakes-01-D2FwW_w-.jpg",
        "desc": "Экологический треккинг по Тебердинскому заповеднику: три высокогорных озера с хрустальной ледниковой водой среди вековых пихт.",
        "reviews": "36",
        "conversion": "2.3"
    },
    {
        "slug": "suvorovskie",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Суворовские термальные источники №1",
        "price": "2500",
        "image": "suvorovskie-01-optimized-DOB4c5FZ.webp",
        "desc": "Купание в целебных термальных бассейнах с природной щелочной минеральной водой различной температуры.",
        "reviews": "49",
        "conversion": "2.5"
    },
    {
        "slug": "pearl",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Термальный комплекс «Жемчужина Кавказа»",
        "price": "3000",
        "image": "pearl-01-optimized-DQudLvDJ.webp",
        "desc": "Современный оздоровительный спа-комплекс: 8 термальных бассейнов с минеральной водой, сауны, хамам и гидромассажи.",
        "reviews": "40",
        "conversion": "2.4"
    },
    {
        "slug": "geduko",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Оздоровительный комплекс «Гедуко»",
        "price": "3000",
        "image": "geduko-01-optimized-BModUekY.webp",
        "desc": "Горячие термальные источники в Баксанском районе: контрастные и релакс-бассейны, водные горки и зоны отдыха.",
        "reviews": "33",
        "conversion": "2.2"
    },
    {
        "slug": "aushiger",
        "name": "Эльдар (Khasaut Tour)",
        "service": "Аушигер: горячие азотно-термальные источники",
        "price": "3500",
        "image": "aushiger-01-optimized-5-e_x06u.webp",
        "desc": "Природные горячие источники из скважины глубиной 4000 м, богатые минералами для оздоровления суставов и кожи.",
        "reviews": "27",
        "conversion": "2.1"
    }
]

# Landing pages for sets to reach 31 sets total
sections = [
    {
        "id": "s_home",
        "offer_id": "101",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/",
        "service": "Джип-туры и экскурсии по горам Кавказа из Кисловодска",
        "price": "2500",
        "image": "og-image.jpg",
        "desc": "Организация индивидуальных и групповых джип-туров по Северному Кавказу из Кисловодска, Пятигорска, Ессентуков на внедорожниках Toyota Land Cruiser и УАЗ Патриот.",
        "reviews": "68",
        "conversion": "3.1"
    },
    {
        "id": "s_excursions",
        "offer_id": "102",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/excursions",
        "service": "Каталог экскурсий и джип-маршрутов по Кавказу",
        "price": "2500",
        "image": "about-mountain-engraving-T9QU0ALg.webp",
        "desc": "Более 20 авторских маршрутов на внедорожниках: Джилы-Су, Бермамыт, Эльбрус, Домбай, Архыз, озера, перевалы и водопады.",
        "reviews": "54",
        "conversion": "2.8"
    },
    {
        "id": "s_prices",
        "offer_id": "103",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/prices",
        "service": "Цены на джип-туры и аренду внедорожников с водителем",
        "price": "2500",
        "image": "khasaut-price-list-2026.webp",
        "desc": "Прозрачные цены на поездки в горы от 2 500 ₽ за место. В стоимость входит трансфер от отеля, опытный гид-водитель, страховка.",
        "reviews": "47",
        "conversion": "2.6"
    },
    {
        "id": "s_routes",
        "offer_id": "104",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/routes",
        "service": "Индивидуальный подбор горных маршрутов джиппинга",
        "price": "3000",
        "image": "excursion-aktoprak-CntcuZvh.jpg",
        "desc": "Составление персональных программ джип-туров любой сложности под ваши даты, пожелания и состав группы.",
        "reviews": "38",
        "conversion": "2.4"
    },
    {
        "id": "s_thermal",
        "offer_id": "105",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/thermal-springs",
        "service": "Поездки на горячие термальные источники КМВ",
        "price": "2500",
        "image": "thermal-suvorovskie-optimized-DSh9uM6N.webp",
        "desc": "Оздоровительные туры из Кисловодска на термальные источники: Суворовские №1, Жемчужина Кавказа, Гедуко, Аушигер.",
        "reviews": "43",
        "conversion": "2.5"
    },
    {
        "id": "s_horse",
        "offer_id": "106",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/horse-rides",
        "service": "Конные прогулки в горах Кисловодска",
        "price": "2000",
        "image": "horse-hero-optimized-B9qOQduY.webp",
        "desc": "Прогулки верхом на карачаевских лошадях по живописным ущельям и перевалам для новичков и опытных всадников.",
        "reviews": "36",
        "conversion": "2.3"
    },
    {
        "id": "s_about",
        "offer_id": "107",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/about",
        "service": "Услуги профессионального гида-водителя на Кавказе",
        "price": "3500",
        "image": "apple-touch-icon.png",
        "desc": "Команда местных сертифицированных гидов с опытом более 8 лет. Надежные внедорожники 4x4, знание тайных видовых локаций.",
        "reviews": "50",
        "conversion": "2.7"
    },
    {
        "id": "s_contact",
        "offer_id": "108",
        "name": "Khasaut Tour (Эльдар)",
        "url": "https://khasaut-kmv.ru/contact",
        "service": "Бронирование и консультация по джип-турам",
        "price": "2500",
        "image": "favicon-512x512.png",
        "desc": "Связь с гидом напрямую через WhatsApp, Telegram или по телефону. Подача машины к отелю в Кисловодске и городах КМВ.",
        "reviews": "45",
        "conversion": "2.6"
    }
]

def build_feed():
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    
    root = ET.Element("yml_catalog", {"date": now_str})
    shop = ET.SubElement(root, "shop")
    
    ET.SubElement(shop, "name").text = "Khasaut Tour"
    ET.SubElement(shop, "company").text = "Khasaut Tour"
    ET.SubElement(shop, "url").text = "https://khasaut-kmv.ru"
    ET.SubElement(shop, "email").text = "Eldar090807@yandex.ru"
    
    currencies = ET.SubElement(shop, "currencies")
    ET.SubElement(currencies, "currency", {"id": "RUR", "rate": "1"})
    
    categories = ET.SubElement(shop, "categories")
    ET.SubElement(categories, "category", {"id": "1"}).text = "Исполнитель"
    ET.SubElement(categories, "category", {"id": "25", "parentId": "1"}).text = "Организация мероприятий"
    ET.SubElement(categories, "category", {"id": "16", "parentId": "1"}).text = "Перевозки и курьеры"
    ET.SubElement(categories, "category", {"id": "29", "parentId": "1"}).text = "Разное"
    
    sets_elem = ET.SubElement(shop, "sets")
    
    # Add sets for each tour
    for idx, t in enumerate(tours, 1):
        set_elem = ET.SubElement(sets_elem, "set", {"id": f"s{idx}"})
        ET.SubElement(set_elem, "name").text = t["service"]
        ET.SubElement(set_elem, "url").text = f"https://khasaut-kmv.ru/detail/{t['slug']}"
        
    # Add sets for sections
    for sec in sections:
        set_elem = ET.SubElement(sets_elem, "set", {"id": sec["id"]})
        ET.SubElement(set_elem, "name").text = sec["service"]
        ET.SubElement(set_elem, "url").text = sec["url"]
        
    offers_elem = ET.SubElement(shop, "offers")
    
    # Add offers for each tour
    for idx, t in enumerate(tours, 1):
        offer = ET.SubElement(offers_elem, "offer", {"id": str(idx), "available": "true"})
        ET.SubElement(offer, "name").text = t["name"]
        ET.SubElement(offer, "url").text = f"https://khasaut-kmv.ru/detail/{t['slug']}"
        price_elem = ET.SubElement(offer, "price", {"from": "true"})
        price_elem.text = t["price"]
        ET.SubElement(offer, "currencyId").text = "RUR"
        ET.SubElement(offer, "categoryId").text = "25"
        ET.SubElement(offer, "set-ids").text = f"s{idx}"
        
        # Unique picture URL
        if t["image"].startswith("http"):
            pic_url = t["image"]
        else:
            pic_url = f"https://khasaut-kmv.ru/assets/{t['image']}"
        ET.SubElement(offer, "picture").text = pic_url
        
        ET.SubElement(offer, "description").text = t["desc"]
        
        # Required parameters for category "Исполнители" (both capital and lowercase for safety)
        ET.SubElement(offer, "param", {"name": "Рейтинг"}).text = "5.0"
        ET.SubElement(offer, "param", {"name": "рейтинг"}).text = "5.0"
        
        ET.SubElement(offer, "param", {"name": "Число отзывов"}).text = t["reviews"]
        ET.SubElement(offer, "param", {"name": "число отзывов"}).text = t["reviews"]
        
        ET.SubElement(offer, "param", {"name": "Годы опыта"}).text = "8"
        ET.SubElement(offer, "param", {"name": "годы опыта"}).text = "8"
        
        ET.SubElement(offer, "param", {"name": "Регион"}).text = "Кисловодск"
        ET.SubElement(offer, "param", {"name": "регион"}).text = "Кисловодск"
        
        ET.SubElement(offer, "param", {"name": "Конверсия"}).text = t["conversion"]
        ET.SubElement(offer, "param", {"name": "конверсия"}).text = t["conversion"]
        
        # High value optional parameters
        param_phone = ET.SubElement(offer, "param", {"name": "Ссылка на телефон"})
        param_phone.text = "tel:+79283405788"
        
        param_chat = ET.SubElement(offer, "param", {"name": "Ссылка на чат"})
        param_chat.text = "https://wa.me/79283405788"
        
        ET.SubElement(offer, "param", {"name": "Выезд на дом"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Бригада"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Исполнитель проверен"}).text = "true"
        ET.SubElement(offer, "param", {"name": "Наличный расчет"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Безналичный расчет"}).text = "да"

    # Add offers for section landing pages
    for sec in sections:
        offer = ET.SubElement(offers_elem, "offer", {"id": sec["offer_id"], "available": "true"})
        ET.SubElement(offer, "name").text = sec["name"]
        ET.SubElement(offer, "url").text = sec["url"]
        price_elem = ET.SubElement(offer, "price", {"from": "true"})
        price_elem.text = sec["price"]
        ET.SubElement(offer, "currencyId").text = "RUR"
        ET.SubElement(offer, "categoryId").text = "25"
        ET.SubElement(offer, "set-ids").text = sec["id"]
        
        if sec["image"].startswith("http"):
            pic_url = sec["image"]
        elif sec["image"].startswith("favicon") or sec["image"].startswith("apple") or sec["image"].startswith("og") or sec["image"].startswith("khasaut"):
            pic_url = f"https://khasaut-kmv.ru/{sec['image']}"
        else:
            pic_url = f"https://khasaut-kmv.ru/assets/{sec['image']}"
        ET.SubElement(offer, "picture").text = pic_url
        
        ET.SubElement(offer, "description").text = sec["desc"]
        
        ET.SubElement(offer, "param", {"name": "Рейтинг"}).text = "5.0"
        ET.SubElement(offer, "param", {"name": "рейтинг"}).text = "5.0"
        ET.SubElement(offer, "param", {"name": "Число отзывов"}).text = sec["reviews"]
        ET.SubElement(offer, "param", {"name": "число отзывов"}).text = sec["reviews"]
        ET.SubElement(offer, "param", {"name": "Годы опыта"}).text = "8"
        ET.SubElement(offer, "param", {"name": "годы опыта"}).text = "8"
        ET.SubElement(offer, "param", {"name": "Регион"}).text = "Кисловодск"
        ET.SubElement(offer, "param", {"name": "регион"}).text = "Кисловодск"
        ET.SubElement(offer, "param", {"name": "Конверсия"}).text = sec["conversion"]
        ET.SubElement(offer, "param", {"name": "конверсия"}).text = sec["conversion"]
        
        ET.SubElement(offer, "param", {"name": "Ссылка на телефон"}).text = "tel:+79283405788"
        ET.SubElement(offer, "param", {"name": "Ссылка на чат"}).text = "https://wa.me/79283405788"
        ET.SubElement(offer, "param", {"name": "Выезд на дом"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Бригада"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Исполнитель проверен"}).text = "true"
        ET.SubElement(offer, "param", {"name": "Наличный расчет"}).text = "да"
        ET.SubElement(offer, "param", {"name": "Безналичный расчет"}).text = "да"

    raw_xml = ET.tostring(root, encoding="utf-8")
    parsed = minidom.parseString(raw_xml)
    pretty_xml = parsed.toprettyxml(indent="  ", encoding="utf-8")
    
    # Save to public and dist
    for dest in ["public/feed.yml", "dist/feed.yml"]:
        with open(dest, "wb") as f:
            f.write(pretty_xml)
        print(f"Saved {dest} ({len(pretty_xml)} bytes)")

if __name__ == "__main__":
    build_feed()
