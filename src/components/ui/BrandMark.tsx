export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-label="Khasaut Tour">
      <svg viewBox="0 0 92 112" role="img" aria-hidden="true">
        <path className="brand-mark__paper" d="M12 5h68l6 91-40 11L6 96Z" />
        <path className="brand-mark__shield" d="M14 49h64v30c0 12-12 22-32 29C26 101 14 92 14 79Z" />
        <path className="brand-mark__trees" d="M20 37 27 20l5 11 7-18 7 18 7-15 6 17 7-11 7 18" />
        <path className="brand-mark__rule" d="M17 47h58M19 76h54M26 84h40" />
        <text className="brand-mark__inverse" x="46" y="67" textAnchor="middle">KHASAUT</text>
        <text className="brand-mark__inverse brand-mark__small" x="46" y="96" textAnchor="middle">TOUR</text>
      </svg>
      {!compact && <span>Khasaut<br />Tour</span>}
    </span>
  )
}
