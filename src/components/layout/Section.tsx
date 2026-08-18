import type { PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{
  id: string
  className?: string
  ariaLabel?: string
}>

export function Section({ children, id, className = '', ariaLabel }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-label={ariaLabel}>
      {children}
    </section>
  )
}
