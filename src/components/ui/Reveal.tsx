import { useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from 'react'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const props = {
    ref,
    className: `reveal ${visible ? 'is-visible' : ''} ${className}`.trim(),
    style: { '--reveal-delay': `${Math.min(delay, 120)}ms` } as CSSProperties,
  }

  return <div {...props}>{children}</div>
}
