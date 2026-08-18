export function TornDivider({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  return (
    <span className={`torn-divider torn-divider--${tone}`} aria-hidden="true">
      <i />
      <b>⌁</b>
      <i />
    </span>
  )
}
