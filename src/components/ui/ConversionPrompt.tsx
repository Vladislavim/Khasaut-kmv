import { useEffect, useRef, useState } from 'react'
import { buildEstimatePath, buildWhatsAppBookingUrl, type BookingSelection } from '../../data/booking'
import { departureCities, formatRubles, getPriceRoute, getRoutePrice } from '../../data/prices'
import { track } from '../../lib/analytics'

export function ConversionPrompt() {
  const dialog = useRef<HTMLDialogElement>(null)
  const estimate = useRef<BookingSelection | null>(null)
  const [selection, setSelection] = useState<BookingSelection | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  useEffect(() => {
    const started = Date.now()
    let used = false
    try { used = sessionStorage.getItem('khasaut-conversion-used') === '1' } catch { /* Session-only fallback. */ }
    const markUsed = () => { used = true; try { sessionStorage.setItem('khasaut-conversion-used','1') } catch { /* Session-only fallback. */ } }
    const onEstimate = (event: Event) => { estimate.current = (event as CustomEvent<BookingSelection>).detail }
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a')
      if (target && /^(https:\/\/wa\.me\/|tel:|mailto:)/.test(target.href)) markUsed()
    }
    const onAnalytics = (event: Event) => {
      if ((event as CustomEvent).detail.event === 'estimate_copy') markUsed()
    }
    const onExit = (event: MouseEvent) => {
      if (used || !estimate.current || event.relatedTarget || event.clientY > 0 || Date.now()-started < 45000 || window.scrollY < 400) return
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || document.visibilityState !== 'visible') return
      if (document.querySelector('dialog[open], [role="dialog"], input:focus, select:focus, textarea:focus')) return
      markUsed(); setSelection({...estimate.current}); setCopyState('idle')
    }
    window.addEventListener('khasaut:estimate',onEstimate)
    window.addEventListener('khasaut:analytics',onAnalytics)
    document.addEventListener('click',onClick,true)
    document.addEventListener('mouseout',onExit)
    return () => {
      window.removeEventListener('khasaut:estimate',onEstimate)
      window.removeEventListener('khasaut:analytics',onAnalytics)
      document.removeEventListener('click',onClick,true)
      document.removeEventListener('mouseout',onExit)
    }
  }, [])
  useEffect(() => {
    if (!selection) return
    dialog.current?.showModal()
    track('conversion_prompt_open',{source:'exit',route:selection.routeKey})
  }, [selection])
  if (!selection) return null
  const close = () => dialog.current?.close()
  const url = new URL(buildEstimatePath(selection), window.location.origin).href
  const amount = getRoutePrice(selection.routeKey,selection.city,selection.format)
  const total = amount ? amount * (selection.format === 'group' ? selection.guests ?? 2 : 1) : undefined
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopyState('copied'); track('estimate_copy',{source:'exit',route:selection.routeKey}) }
    catch { setCopyState('manual') }
  }
  return <dialog ref={dialog} className="trip-finder conversion-prompt" aria-labelledby="conversion-title" onClose={() => { setSelection(null); track('conversion_prompt_dismiss') }} onClick={event => { if(event.target===dialog.current) close() }}>
    <div className="trip-finder__sheet"><button className="trip-finder__close" type="button" aria-label="Закрыть предложение" onClick={close}>×</button><span className="section-kicker">Можно решить позже</span><h2 id="conversion-title">Ваш маршрут уже собран</h2><p>Сохраните ссылку на расчёт или отправьте её попутчикам. Маршрут, дата и число гостей останутся в ссылке.</p>
    <div className="conversion-prompt__ticket"><strong>{getPriceRoute(selection.routeKey)?.title}</strong><span>{departureCities.find(city=>city.id===selection.city)?.label} · {selection.guests} чел.{selection.date ? ` · ${new Date(`${selection.date}T12:00:00`).toLocaleDateString('ru-RU')}` : ''}</span><b>{total ? `${formatRubles(total)} за всех` : 'Стоимость уточним'}</b><small>Ориентир по действующему прайсу. Дополнительные расходы отдельно.</small></div>
    <button className="conversion-prompt__primary" type="button" onClick={copy}>{copyState==='copied' ? 'Ссылка скопирована ✓' : 'Сохранить ссылку на расчёт'}</button>
    {copyState!=='idle' && <label className="conversion-prompt__copy" role="status">{copyState==='copied' ? 'Можно отправить её попутчикам.' : 'Скопируйте ссылку из поля.'}<input aria-label="Ссылка на ваш расчёт" value={url} readOnly onFocus={event=>event.target.select()} /></label>}
    <a className="conversion-prompt__contact" href={buildWhatsAppBookingUrl(selection)} target="_blank" rel="noreferrer" onClick={() => track('conversion_cta_click',{source:'exit',action:'whatsapp',route:selection.routeKey})}>Обсудить эту поездку в WhatsApp ↗</a><button className="trip-finder__back" type="button" onClick={close}>Продолжить просмотр</button></div>
  </dialog>
}
