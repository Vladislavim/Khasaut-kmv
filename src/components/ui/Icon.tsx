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
  | 'download'
  | 'location'
  | 'menu'
  | 'close'
  | 'clock'
  | 'mountain'
  | 'water'
  | 'hiking'
  | 'castle'
  | 'flag'
  | 'hourglass'
  | 'users'
  | 'user'
  | 'backpack'
  | 'check'
  | 'star'
  | 'sunrise'
  | 'forest'
  | 'calendar'
  | 'tag'
  | 'camera'
  | 'lock'
  | 'link'
  | 'info'
  | 'van'
  | 'car'
  | 'chevronDown'

type IconProps = {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 48, className = '' }: IconProps) {
  const is24 = [
    'clock',
    'mountain',
    'water',
    'hiking',
    'castle',
    'flag',
    'hourglass',
    'users',
    'user',
    'backpack',
    'check',
    'star',
    'sunrise',
    'forest',
    'calendar',
    'tag',
    'camera',
    'lock',
    'link',
    'info',
    'van',
    'car',
    'shield',
    'chevronDown',
  ].includes(name)

  const common = {
    width: size,
    height: size,
    viewBox: is24 ? '0 0 24 24' : '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: is24 ? 1.8 : 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  return (
    <svg {...common} className={`icon icon--${name} ${className}`.trim()}>
      {/* Existing 64x64 icons */}
      {name === 'transfer' && <><path d="M9 38h45l-3-8H16l-7 8Z" /><path d="m24 30 6-12 11 12M18 44h4M44 44h4M15 38v6h34v-6" /></>}
      {name === 'excursion' && <><rect x="11" y="22" width="42" height="25" rx="5" /><path d="M11 30h42M20 22v-6h24v6M19 36h8M37 36h8M18 47v4M46 47v4" /><circle cx="19" cy="42" r="2" /><circle cx="45" cy="42" r="2" /></>}
      {name === 'jeep' && <><path d="M10 41h44l-4-14H18l-8 14Z" /><path d="m17 27 5-9h18l6 9M17 41v7M47 41v7" /><circle cx="19" cy="45" r="5" /><circle cx="45" cy="45" r="5" /><path d="M26 33h12" /></>}
      {name === 'routes' && <><path d="m7 49 17-25 9 10 9-17 15 32" /><path d="m22 49 9-16M44 49l-7-14M9 54h47" /><path d="m29 14 3-5 3 5M30 12h5" /></>}
      {name === 'horse' && <><path d="M19 46c-2-8 2-15 8-18l-3-7 8 2 6-7 6 3-4 8c6 3 8 10 5 19" /><path d="M28 29c5 3 8 3 13-1M25 47l-6 7M43 47l5 7M34 29l-3 9 8 4" /><circle cx="43" cy="20" r="1" /></>}
      {name === 'thermal' && <><path d="M10 44c7-7 12-7 19 0s12 7 25 0" /><path d="M10 52c7-7 12-7 19 0s12 7 25 0" /><path d="M21 28c-4-7 7-8 2-16M33 28c-4-7 7-8 2-16M45 28c-4-7 7-8 2-16" /></>}
      {name === 'handshake' && <><path d="m8 25 10-8 8 6 6-4 8 6 8-8 8 8-7 10-8 4-9-8-8 8-8-4-8-10Z" /><path d="m23 27 8 7M34 26l7 7M44 24l5 7" /></>}
      {name === 'culture' && <><path d="M10 24h44M14 24 32 10l18 14M16 29h32M18 29v23M29 29v23M40 29v23M46 29v23M11 52h42" /><path d="M32 17v7" /></>}
      {name === 'heart' && <path d="M32 52S10 39 10 24c0-8 10-12 16-5l6 7 6-7c6-7 16-3 16 5 0 15-22 28-22 28Z" />}
      {name === 'phone' && <><path d="M19 10 12 15c-2 2 1 11 10 20s18 12 20 10l5-7-10-7-4 4c-3-1-10-8-11-11l4-4-7-10Z" /></>}
      {name === 'whatsapp' && <><path d="M32 9a22 22 0 0 0-19 33l-3 10 11-3a22 22 0 1 0 11-40Z" /><path d="M23 22c1 8 9 16 17 18l4-4-7-4-3 3c-3-2-6-5-8-8l3-3-4-6-2 4Z" /></>}
      {name === 'telegram' && <><path d="m10 30 43-18-9 36-14-11-8 7 3-11L10 30Z" /><path d="m25 38 14-18-20 12" /></>}
      {name === 'pinterest' && <><circle cx="32" cy="32" r="22" /><path d="M28 50c1-7 4-13 4-18-2-5 0-10 5-10 4 0 6 3 6 7 0 6-3 11-8 11-2 0-4-2-4-2l-3 12M21 34c-4-9 1-17 10-18" /></>}
      {name === 'mail' && <><rect x="9" y="17" width="46" height="31" rx="2" /><path d="m11 20 21 17 21-17" /></>}
      {name === 'arrow' && <><path d="M8 32h43M38 18l14 14-14 14" /></>}
      {name === 'download' && <><path d="M32 14v28M20 30l12 12 12-12M14 50h36" /></>}
      {name === 'location' && <><path d="M32 56s16-16 16-28a16 16 0 1 0-32 0c0 12 16 28 16 28Z" /><circle cx="32" cy="28" r="5" /></>}
      {name === 'menu' && <><path d="M10 20h44M10 32h44M10 44h44" /></>}
      {name === 'close' && <><path d="m16 16 32 32M48 16 16 48" /></>}

      {/* Crisp 24x24 Icons8 Vector Set */}
      {name === 'clock' && <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" /></>}
      {name === 'mountain' && <><path d="m2 20 7.5-12.5L14 15l2.5-4 5.5 9H2Z" /><path d="m6.8 12 2.7 2.5 3-2.5" /></>}
      {name === 'water' && <path d="M12 2.5c-4 5.5-7 8.5-7 12.5a7 7 0 0 0 14 0c0-4-3-7-7-12.5z" />}
      {name === 'hiking' && <><circle cx="12" cy="12" r="9" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" /><polyline points="12 3 12 6M12 18 12 21M3 12 6 12M18 12 21 12" /></>}
      {name === 'castle' && <><path d="M4 21V9l2-2v3h2V7l2 2v1h4V9l2-2v3h2V7l2 2v12H4Z" /><path d="M9 21v-4a3 3 0 0 1 6 0v4M12 11v2" /></>}
      {name === 'flag' && <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></>}
      {name === 'hourglass' && <><path d="M5 2h14M5 22h14M7 2v5l5 5-5 5v5M17 2v5l-5 5 5 5v5" /></>}
      {name === 'users' && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>}
      {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>}
      {name === 'backpack' && <><path d="M9 4h6a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z" /><path d="M9 9h6M9 13h6M10 4a2 2 0 0 0-2-2M14 4a2 2 0 0 1 2-2M7 10H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M17 10h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /></>}
      {name === 'check' && <polyline points="20 6 9 17 4 12" />}
      {name === 'star' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
      {name === 'sunrise' && <><path d="M12 2v4M4.93 10.93l2.83-2.83M19.07 10.93l-2.83-2.83M2 18h20M7 18a5 5 0 0 1 10 0" /></>}
      {name === 'forest' && <><path d="M12 3 5 12h3l-3 6h14l-3-6h3L12 3zM12 18v4" /></>}
      {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
      {name === 'tag' && <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1.5" fill="currentColor" /></>}
      {name === 'camera' && <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>}
      {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>}
      {name === 'link' && <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>}
      {name === 'info' && <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><circle cx="12" cy="8" r="1" fill="currentColor" /></>}
      {name === 'van' && <><path d="M3 6h11v11H3zM14 9h4l3 3v5h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>}
      {name === 'car' && <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></>}
      {name === 'shield' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>}
      {name === 'chevronDown' && <polyline points="6 9 12 15 18 9" />}
    </svg>
  )
}
