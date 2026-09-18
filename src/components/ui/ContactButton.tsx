import { iconAssets } from '../../data/iconAssets'

export function ContactButton({ label, icon, href, placeholder = false }: { label: string; icon: string; href: string; placeholder?: boolean }) {
  return (
    <a
      className="contact-button"
      href={href}
      aria-label={label}
      title={placeholder ? `${label}: замените ссылку в src/data/contacts.ts` : label}
      data-placeholder-link={placeholder || undefined}
    >
      <img className="contact-button__image" src={iconAssets[icon as keyof typeof iconAssets]} alt="" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </a>
  )
}
