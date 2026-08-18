import { Icon, type IconName } from './Icon'

export function ContactButton({ label, icon, href, placeholder = false }: { label: string; icon: string; href: string; placeholder?: boolean }) {
  return (
    <a
      className="contact-button"
      href={href}
      aria-label={label}
      title={placeholder ? `${label}: замените ссылку в src/data/contacts.ts` : label}
      data-placeholder-link={placeholder || undefined}
    >
      <Icon name={icon as IconName} />
      <span className="sr-only">{label}</span>
    </a>
  )
}
