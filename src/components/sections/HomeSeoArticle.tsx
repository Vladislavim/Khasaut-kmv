import { BrandMark } from '../ui/BrandMark'

export function HomeSeoArticle() {
  return (
    <section className="home-seo-article inner-section" aria-labelledby="home-seo-heading">
      <div className="container">
        <header className="home-seo-article__header">
          <span className="inner-kicker">Путеводитель по Кавказу 2026</span>
          <h2 id="home-seo-heading" className="home-seo-article__title">
            Джиппинг и авторские джип-туры из Кисловодска и городов КМВ
          </h2>
          <p className="home-seo-article__lead">
            Организуем индивидуальные и групповые экскурсии в высокогорные ущелья, к водопадам, перевалам и древним крепостям Северного Кавказа. Показываем не туристический глянец, а настоящие горы на подготовленных экспедиционных внедорожниках 4×4.
          </p>
        </header>

        <div className="home-seo-article__grid">
          <article className="home-seo-card">
            <div className="home-seo-card__badge">Свобода маршрута</div>
            <h3>Почему именно джиппинг?</h3>
            <p>
              Большие экскурсионные автобусы ограничены асфальтом и многолюдными стоянками по расписанию. Настоящая магия Кавказа скрыта там, где кончаются стандартные дороги: на краю обрывов плато Бермамыт, у кипящих минеральных источников урочища Джилы-Су, в узких каньонах Чегема и на панорамных серпантинах перевала Восьмёрка.
            </p>
            <p>
              На джипе вы не привязаны к спешке: останавливаетесь в самых живописных точках для неспешных фото, пьёте свежий горный чай с травами на высоте свыше 2 500 метров и дышите кристально чистым воздухом без сотен туристов вокруг.
            </p>
          </article>

          <article className="home-seo-card">
            <div className="home-seo-card__badge">Надёжность и комфорт</div>
            <h3>Подготовленный внедорожный автопарк</h3>
            <p>
              В горах техника решает всё. Мы используем только рамные полноприводные внедорожники повышенной проходимости: японские Toyota Land Cruiser Prado и специально доработанные УАЗ Патриот Экспедиция.
            </p>
            <ul className="home-seo-list">
              <li><strong>Увеличенный клиренс и блокировки:</strong> уверенный проезд по каменистым руслам рек, бродам и горным склонам.</li>
              <li><strong>Внедорожная резина A/T и M/T:</strong> надёжное сцепление со скальником и мокрой глиной в любую погоду.</li>
              <li><strong>Уютный тёплый салон:</strong> климат-контроль, кондиционер, анатомические кресла и панорамные окна.</li>
              <li><strong>Опытные гиды:</strong> за рулём местные водители со стажем более 10 лет на горных перевалах.</li>
            </ul>
          </article>

          <article className="home-seo-card">
            <div className="home-seo-card__badge">Удобство для гостей</div>
            <h3>Трансфер от санатория или отеля</h3>
            <p>
              Вам не нужно искать место сбора в незнакомом городе на рассвете. Наш гид заберёт вас прямо от крыльца вашего отеля, санатория или гостевого дома в Кисловодске.
            </p>
            <p>
              Также организуем комфортный трансфер для туристов из других городов Кавказских Минеральных Вод:
            </p>
            <div className="home-seo-cities">
              <span className="home-seo-city-pill">Кисловодск</span>
              <span className="home-seo-city-pill">Пятигорск</span>
              <span className="home-seo-city-pill">Ессентуки</span>
              <span className="home-seo-city-pill">Железноводск</span>
              <span className="home-seo-city-pill">Минеральные Воды</span>
            </div>
          </article>

          <article className="home-seo-card">
            <div className="home-seo-card__badge">Форматы поездок</div>
            <h3>Индивидуально или в мини-группе</h3>
            <p>
              <strong>Мини-группы (до 4–6 гостей):</strong> идеальный выбор для пар и соло-путешественников. Вы делите стоимость аренды внедорожника с единомышленниками, получая персональный комфорт без давки.
            </p>
            <p>
              <strong>Индивидуальный джип-тур под ключ:</strong> машина предоставляется только вашей семье или дружеской компании. Маршрут, время остановок, музыка в салоне и продолжительность прогулок на локациях подстраиваются под ваши пожелания.
            </p>
          </article>
        </div>

        {/* Semantic Destination Anchor Cloud */}
        <div className="home-seo-destinations">
          <div className="home-seo-destinations__title">
            <BrandMark />
            <span>Главные направления джиппинга из Кисловодска в сезоне 2026</span>
          </div>
          <div className="home-seo-tags">
            <a href="/detail/dzhily-su" className="home-seo-tag">Джилы-Су и водопады</a>
            <a href="/detail/bermamyt" className="home-seo-tag">Плато Бермамыт на рассвете</a>
            <a href="/detail/pereval-vosmerka" className="home-seo-tag">Перевал Восьмёрка и аул Хасаут</a>
            <a href="/detail/elbrus" className="home-seo-tag">Приэльбрусье и озеро Гижгит</a>
            <a href="/detail/dombay" className="home-seo-tag">Домбай и перевал Гум-Баши</a>
            <a href="/detail/arkhyz" className="home-seo-tag">Архыз и Софийские водопады</a>
            <a href="/detail/balkaria" className="home-seo-tag">Верхняя Балкария и Шато-Эркен</a>
            <a href="/detail/aktoprak" className="home-seo-tag">Перевал Актопрак и Чегем</a>
            <a href="/detail/ossetia" className="home-seo-tag">Горная Осетия и Даргавс</a>
            <a href="/detail/ingushetia" className="home-seo-tag">Ингушетия: Страна башен</a>
            <a href="/detail/khurla-kol" className="home-seo-tag">Озеро Хурла-Кёль</a>
            <a href="/detail/khudes-labyrinth" className="home-seo-tag">Худесский лабиринт</a>
            <a href="/detail/makhar" className="home-seo-tag">Ущелье Махар</a>
            <a href="/detail/baduk-lakes" className="home-seo-tag">Бадукские озёра</a>
            <a href="/detail/suvorovskie" className="home-seo-tag">Суворовские термальные источники</a>
            <a href="/detail/geduko" className="home-seo-tag">Термальный комплекс Гедуко</a>
            <a href="/detail/aushiger" className="home-seo-tag">Горячие источники Аушигер</a>
            <a href="/prices" className="home-seo-tag home-seo-tag--accent">Цены на джип-туры 2026</a>
          </div>
        </div>
      </div>
    </section>
  )
}
