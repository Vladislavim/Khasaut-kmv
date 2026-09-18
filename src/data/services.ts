export type ServiceIcon = 'transfer' | 'excursion' | 'jeep' | 'routes' | 'horse' | 'thermal'

export const services = [
  {
    title: 'Трансфер',
    description: 'Встретим вас в аэропорту и доставим до точки',
    icon: 'transfer' as ServiceIcon,
    href: '/contact',
  },
  {
    title: 'Экскурсии',
    description: 'Смотровые, водопады и горные города',
    icon: 'excursion' as ServiceIcon,
    href: '/excursions',
  },
  {
    title: 'Джип-туры',
    description: 'Горные дороги и высокогорные плато',
    icon: 'jeep' as ServiceIcon,
    href: '/excursions',
  },
  {
    title: 'Необычные маршруты',
    description: 'Озёра, ущелья и пешие тропы',
    icon: 'routes' as ServiceIcon,
    href: '/routes',
  },
  {
    title: 'Конные прогулки',
    description: 'Прогулки с инструктором по горным тропам',
    icon: 'horse' as ServiceIcon,
    href: '/horse-rides',
  },
  {
    title: 'Термальные источники',
    description: 'Отдых в бассейнах после дороги',
    icon: 'thermal' as ServiceIcon,
    href: '/thermal-springs',
  },
]
