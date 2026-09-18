import type { CSSProperties } from 'react'
import { assets } from '../../data/assets'

export function TornDivider({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  return (
    <span className={`torn-divider torn-divider--${tone}`} style={{ '--divider-pattern': `url(${assets.mountainDividerPattern})` } as CSSProperties} aria-hidden="true">
      <i />
      <b aria-hidden="true">
        <svg viewBox="0 0 34 16" role="presentation">
          <path d="m1 13 8-7 6 5 7-9 11 11" />
        </svg>
      </b>
      <i />
    </span>
  )
}
