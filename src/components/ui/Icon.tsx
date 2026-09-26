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
  | 'mapPin'
  | 'menu'
  | 'close'
  | 'clock'
  | 'mountain'
  | 'water'
  | 'waterfall'
  | 'hiking'
  | 'castle'
  | 'fortress'
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
  | 'globe'
  | 'chevronDown'

type IconProps = {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 48, className = '' }: IconProps) {
  const isIcons8 = [
    'location',
    'mapPin',
    'shield',
    'whatsapp',
    'phone',
    'telegram',
    'car',
    'transfer',
    'calendar',
    'horse',
    'thermal',
    'waterfall',
    'fortress',
    'globe',
  ].includes(name)

  const is24 = isIcons8 || [
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
    'tag',
    'camera',
    'lock',
    'link',
    'info',
    'van',
    'chevronDown',
  ].includes(name)

  const common = {
    width: size,
    height: size,
    viewBox: is24 ? '0 0 24 24' : '0 0 64 64',
    fill: isIcons8 ? 'currentColor' : 'none',
    stroke: isIcons8 ? 'none' : 'currentColor',
    strokeWidth: isIcons8 ? undefined : (is24 ? 1.8 : 1.7),
    strokeLinecap: isIcons8 ? undefined : ('round' as const),
    strokeLinejoin: isIcons8 ? undefined : ('round' as const),
    'aria-hidden': true,
  }

  return (
    <svg {...common} className={`icon icon--${name} ${className}`.trim()}>
      {/* ── Icons8 Vector Set (24x24 filled) ─────────────────────────── */}
      {(name === 'location' || name === 'mapPin') && (
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
      )}
      {name === 'shield' && (
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.13 2.12 4.24-4.24 1.41 1.41-5.65 5.66z" />
      )}
      {name === 'whatsapp' && (
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.18c-.24.68-1.2 1.24-1.68 1.3-.44.06-.99.1-3.05-.72-2.45-.98-4.05-3.48-4.17-3.64-.12-.16-1-1.33-1-2.54 0-1.21.63-1.8.85-2.04.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.21.5.71 1.73.77 1.86.06.13.1.28.02.44-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.5.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
      )}
      {name === 'phone' && (
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
      )}
      {name === 'telegram' && (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      )}
      {(name === 'car' || name === 'transfer') && (
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      )}
      {name === 'calendar' && (
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      )}
      {name === 'horse' && (
        <path d="M20 8l-3-4h-4l-2 3-4-1-3 4 2 2 3-1 2 4 4 1 1 3h3v-4l-1-2 3-1 2-5z" />
      )}
      {name === 'thermal' && (
        <path d="M12 2c1.1 0 2 .9 2 2 0 1.5-2 3-2 3s-2-1.5-2-3c0-1.1.9-2 2-2zm-6 9c1.1 0 2 .9 2 2 0 1.5-2 3-2 3s-2-1.5-2-3c0-1.1.9-2 2-2zm12 0c1.1 0 2 .9 2 2 0 1.5-2 3-2 3s-2-1.5-2-3c0-1.1.9-2 2-2zM4 19h16v2H4z" />
      )}
      {name === 'waterfall' && (
        <path d="M6 3h12v2H6zm0 4h12v2H6zm-2 4h16v2H4zm1 4h14v2H5zm2 4h10v2H7z" />
      )}
      {name === 'fortress' && (
        <path d="M12 1L3 5v2h18V5l-9-4zm7 8H5v9h14V9zm-2 7H7v-5h10v5z" />
      )}
      {name === 'globe' && (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      )}

      {/* ── Legacy 64x64 Stroke Icons ───────────────────────────────── */}
      {name === 'excursion' && <><rect x="11" y="22" width="42" height="25" rx="5" /><path d="M11 30h42M20 22v-6h24v6M19 36h8M37 36h8M18 47v4M46 47v4" /><circle cx="19" cy="42" r="2" /><circle cx="45" cy="42" r="2" /></>}
      {name === 'jeep' && <><path d="M10 41h44l-4-14H18l-8 14Z" /><path d="m17 27 5-9h18l6 9M17 41v7M47 41v7" /><circle cx="19" cy="45" r="5" /><circle cx="45" cy="45" r="5" /><path d="M26 33h12" /></>}
      {name === 'routes' && <><path d="m7 49 17-25 9 10 9-17 15 32" /><path d="m22 49 9-16M44 49l-7-14M9 54h47" /><path d="m29 14 3-5 3 5M30 12h5" /></>}
      {name === 'handshake' && <><path d="m8 25 10-8 8 6 6-4 8 6 8-8 8 8-7 10-8 4-9-8-8 8-8-4-8-10Z" /><path d="m23 27 8 7M34 26l7 7M44 24l5 7" /></>}
      {name === 'culture' && <><path d="M10 24h44M14 24 32 10l18 14M16 29h32M18 29v23M29 29v23M40 29v23M46 29v23M11 52h42" /><path d="M32 17v7" /></>}
      {name === 'heart' && <path d="M32 52S10 39 10 24c0-8 10-12 16-5l6 7 6-7c6-7 16-3 16 5 0 15-22 28-22 28Z" />}
      {name === 'pinterest' && <><circle cx="32" cy="32" r="22" /><path d="M28 50c1-7 4-13 4-18-2-5 0-10 5-10 4 0 6 3 6 7 0 6-3 11-8 11-2 0-4-2-4-2l-3 12M21 34c-4-9 1-17 10-18" /></>}
      {name === 'mail' && <><rect x="9" y="17" width="46" height="31" rx="2" /><path d="m11 20 21 17 21-17" /></>}
      {name === 'arrow' && <><path d="M8 32h43M38 18l14 14-14 14" /></>}
      {name === 'download' && <><path d="M32 14v28M20 30l12 12 12-12M14 50h36" /></>}
      {name === 'menu' && <><path d="M10 20h44M10 32h44M10 44h44" /></>}
      {name === 'close' && <><path d="m16 16 32 32M48 16 16 48" /></>}

      {/* ── 24x24 Stroke Vectors ────────────────────────────────────── */}
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
      {name === 'tag' && <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1.5" fill="currentColor" /></>}
      {name === 'camera' && <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>}
      {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>}
      {name === 'link' && <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>}
      {name === 'info' && <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><circle cx="12" cy="8" r="1" fill="currentColor" /></>}
      {name === 'van' && <><path d="M3 6h11v11H3zM14 9h4l3 3v5h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>}
      {name === 'chevronDown' && <polyline points="6 9 12 15 18 9" />}
    </svg>
  )
}
