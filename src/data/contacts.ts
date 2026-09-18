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
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/eldar_e_7212?igsi=MWltZzl1Y2luejN5bw==' },
  ] as const,
  footerLinks: [
    { label: 'Телефон', icon: 'phone', href: innerContacts.primaryPhone.href },
    { label: 'WhatsApp', icon: 'whatsapp', href: innerContacts.whatsapp.href },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/eldar_e_7212?igsi=MWltZzl1Y2luejN5bw==' },
  ] as const,
}
