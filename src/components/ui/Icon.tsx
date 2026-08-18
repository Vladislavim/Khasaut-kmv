export type IconName =
  | 'transfer'
  | 'excursion'
  | 'jeep'
  | 'routes'
  | 'horse'
  | 'thermal'
  | 'shield'
  | 'handshake'
  | 'culture'
  | 'heart'
  | 'phone'
  | 'whatsapp'
  | 'telegram'
  | 'pinterest'
  | 'mail'
  | 'arrow'
  | 'location'
  | 'menu'
  | 'close'

type IconProps = { name: IconName; size?: number }

export function Icon({ name, size = 48 }: IconProps) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

  return (
    <svg {...common} className={`icon icon--${name}`}>
      {name === 'transfer' && <><path d="M9 38h45l-3-8H16l-7 8Z" /><path d="m24 30 6-12 11 12M18 44h4M44 44h4M15 38v6h34v-6" /></>}
      {name === 'excursion' && <><rect x="11" y="22" width="42" height="25" rx="5" /><path d="M11 30h42M20 22v-6h24v6M19 36h8M37 36h8M18 47v4M46 47v4" /><circle cx="19" cy="42" r="2" /><circle cx="45" cy="42" r="2" /></>}
      {name === 'jeep' && <><path d="M10 41h44l-4-14H18l-8 14Z" /><path d="m17 27 5-9h18l6 9M17 41v7M47 41v7" /><circle cx="19" cy="45" r="5" /><circle cx="45" cy="45" r="5" /><path d="M26 33h12" /></>}
      {name === 'routes' && <><path d="m7 49 17-25 9 10 9-17 15 32" /><path d="m22 49 9-16M44 49l-7-14M9 54h47" /><path d="m29 14 3-5 3 5M30 12h5" /></>}
      {name === 'horse' && <><path d="M19 46c-2-8 2-15 8-18l-3-7 8 2 6-7 6 3-4 8c6 3 8 10 5 19" /><path d="M28 29c5 3 8 3 13-1M25 47l-6 7M43 47l5 7M34 29l-3 9 8 4" /><circle cx="43" cy="20" r="1" /></>}
      {name === 'thermal' && <><path d="M10 44c7-7 12-7 19 0s12 7 25 0" /><path d="M10 52c7-7 12-7 19 0s12 7 25 0" /><path d="M21 28c-4-7 7-8 2-16M33 28c-4-7 7-8 2-16M45 28c-4-7 7-8 2-16" /></>}
      {name === 'shield' && <><path d="M32 7 51 14v14c0 13-8 23-19 29C21 51 13 41 13 28V14L32 7Z" /><path d="m23 31 6 6 12-14" /></>}
      {name === 'handshake' && <><path d="m8 25 10-8 8 6 6-4 8 6 8-8 8 8-7 10-8 4-9-8-8 8-8-4-8-10Z" /><path d="m23 27 8 7M34 26l7 7M44 24l5 7" /></>}
      {name === 'culture' && <><path d="M10 24h44M14 24 32 10l18 14M16 29h32M18 29v23M29 29v23M40 29v23M46 29v23M11 52h42" /><path d="M32 17v7" /></>}
      {name === 'heart' && <path d="M32 52S10 39 10 24c0-8 10-12 16-5l6 7 6-7c6-7 16-3 16 5 0 15-22 28-22 28Z" />}
      {name === 'phone' && <><path d="M19 10 12 15c-2 2 1 11 10 20s18 12 20 10l5-7-10-7-4 4c-3-1-10-8-11-11l4-4-7-10Z" /></>}
      {name === 'whatsapp' && <><path d="M32 9a22 22 0 0 0-19 33l-3 10 11-3a22 22 0 1 0 11-40Z" /><path d="M23 22c1 8 9 16 17 18l4-4-7-4-3 3c-3-2-6-5-8-8l3-3-4-6-2 4Z" /></>}
      {name === 'telegram' && <><path d="m10 30 43-18-9 36-14-11-8 7 3-11L10 30Z" /><path d="m25 38 14-18-20 12" /></>}
      {name === 'pinterest' && <><circle cx="32" cy="32" r="22" /><path d="M28 50c1-7 4-13 4-18-2-5 0-10 5-10 4 0 6 3 6 7 0 6-3 11-8 11-2 0-4-2-4-2l-3 12M21 34c-4-9 1-17 10-18" /></>}
      {name === 'mail' && <><rect x="9" y="17" width="46" height="31" rx="2" /><path d="m11 20 21 17 21-17" /></>}
      {name === 'arrow' && <><path d="M8 32h43M38 18l14 14-14 14" /></>}
      {name === 'location' && <><path d="M32 56s16-16 16-28a16 16 0 1 0-32 0c0 12 16 28 16 28Z" /><circle cx="32" cy="28" r="5" /></>}
      {name === 'menu' && <><path d="M10 20h44M10 32h44M10 44h44" /></>}
      {name === 'close' && <><path d="m16 16 32 32M48 16 16 48" /></>}
    </svg>
  )
}
