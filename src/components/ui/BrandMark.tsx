export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-label="Khasaut Tour">
      <svg viewBox="0 0 80 92" role="img" aria-hidden="true">
        <path d="M40 3 70 14v32c0 19-13 34-30 42C23 80 10 65 10 46V14L40 3Z" />
        <path d="m18 47 8-14 7 10 8-17 9 17 8-12 4 16" />
        <path d="M17 61h46M24 69h32" />
      </svg>
      {!compact && <span>Khasaut<br />Tour</span>}
    </span>
  )
}
