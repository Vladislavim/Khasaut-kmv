import { innerContacts } from './innerContacts'

export const contacts = {
  email: {
    label: 'E-mail',
    value: innerContacts.email.label,
    href: innerContacts.email.href,
  },
  links: [
    { label: 'Телефон', icon: 'phone', href: innerContacts.primaryPhone.href },
    { label: 'WhatsApp', icon: 'whatsapp', href: innerContacts.whatsapp.href },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/khasaut_jeep_tours/' },
  ] as const,
  footerLinks: [
    { label: 'Телефон', icon: 'phone', href: innerContacts.primaryPhone.href },
    { label: 'WhatsApp', icon: 'whatsapp', href: innerContacts.whatsapp.href },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/khasaut_jeep_tours/' },
  ] as const,
}
