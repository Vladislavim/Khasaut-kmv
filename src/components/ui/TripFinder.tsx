import { useEffect, useRef, useState } from 'react'
import { detailPages } from '../../data/innerPages'
import { formatRubles, getMinimumGroupPrice, getPriceKeyForRouteSlug } from '../../data/prices'
import { track } from '../../lib/analytics'

const choices = [
  { id:'panorama', title:'Панорамы Эльбруса', text:'Плато, горные дороги и открытые виды.', routes:['bermamyt','elbrus'] },
  { id:'water', title:'Водопады и нарзаны', text:'Джилы-Су или большой маршрут с Бермамытом.', routes:['dzhily-su','dzhily-su-bermamyt'] },
  { id:'walk', title:'Озёра и пешие тропы', text:'Для тех, кому хочется больше ходить.', routes:['baduk-lakes','khurla-kol'] },
] as const

export function TripFinder() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [choice, setChoice] = useState<typeof choices[number] | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    const show = () => { if (!document.querySelector('dialog[open], [role="dialog"]')) { setChoice(null); dialog.current?.showModal(); track('trip_finder_open',{source:'inline'}) } }
    window.addEventListener('khasaut:open-finder',show)
    return () => window.removeEventListener('khasaut:open-finder',show)
  }, [])
  useEffect(() => {
    let dismissedEarlier = false
    try { dismissedEarlier = sessionStorage.getItem('khasaut-finder-dismissed') === '1' } catch { /* Optional preference. */ }
    if (dismissedEarlier) return
    const reveal = () => {
      const nextActionVisible = Array.from(document.querySelectorAll('.trip-cta, .trip-planner, #contact')).some(node => {
        const rect = node.getBoundingClientRect()
        return rect.top < window.innerHeight - 80 && rect.bottom > 80
      })
      setVisible(window.scrollY > 650 && !nextActionVisible)
    }
    const timer = window.setTimeout(() => { reveal(); window.addEventListener('scroll',reveal,{passive:true}) },12000)
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll',reveal) }
  }, [])
  const close = () => dialog.current?.close()
  const open = () => { setChoice(null); dialog.current?.showModal(); track('trip_finder_open') }
  return (
    <>
      <button className={`trip-finder-launch ${visible && !dismissed ? 'is-visible' : ''}`} type="button" onClick={open} tabIndex={visible && !dismissed ? 0 : -1} aria-hidden={!visible || dismissed}>Помочь с выбором? <span aria-hidden="true">↗</span></button>
      {visible && !dismissed && <button className="trip-finder-dismiss" type="button" aria-label="Скрыть подсказку подбора" onClick={() => { setDismissed(true); try { sessionStorage.setItem('khasaut-finder-dismissed','1') } catch { /* Optional preference. */ } }}>×</button>}
      <dialog className="trip-finder" ref={dialog} aria-labelledby="trip-finder-title" onClick={event => { if (event.target === dialog.current) close() }}>
        <div className="trip-finder__sheet">
          <button type="button" className="trip-finder__close" aria-label="Закрыть подбор" onClick={close}>×</button>
          <span className="section-kicker">Подбор поездки</span>
          <h2 id="trip-finder-title">{choice ? 'Начните с этих маршрутов' : 'Каким будет ваш день?'}</h2>
          {!choice ? <><p>Выберите, что хочется увидеть. Покажем два маршрута, а детали можно обсудить с организатором.</p><div className="trip-finder__choices">{choices.map(item => <button type="button" key={item.id} onClick={() => { setChoice(item); track('trip_finder_select',{interest:item.id}) }}><strong>{item.title}</strong><span>{item.text}</span><b aria-hidden="true">↗</b></button>)}</div></> : <><p>Это варианты по вашим интересам. Погоду, нагрузку и возможность выезда уточним перед поездкой.</p><div className="trip-finder__results">{choice.routes.map(slug => {
            const page = detailPages.find(item => item.slug === slug)
            if (!page) return null
            const amount = getMinimumGroupPrice(getPriceKeyForRouteSlug(slug))
            return <a href={`/detail/${slug}/`} key={slug} onClick={() => track('route_detail_open',{route:slug,source:'trip-finder'})}><img src={page.image} alt={page.alt} loading="lazy" /><div><h3>{page.title}</h3><span>{amount ? `от ${formatRubles(amount)} / чел.` : 'Стоимость уточним'}</span><small>Смотреть маршрут ↗</small></div></a>
          })}</div><button className="trip-finder__back" type="button" onClick={() => setChoice(null)}>← Выбрать другие впечатления</button></>}
        </div>
      </dialog>
    </>
  )
}
