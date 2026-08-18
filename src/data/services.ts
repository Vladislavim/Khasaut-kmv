export type ServiceIcon = 'transfer' | 'excursion' | 'jeep' | 'routes' | 'horse' | 'thermal'

export const services = [
  {
    title: 'Трансфер',
    description: 'Встретим вас в аэропорту и доставим до точки',
    icon: 'transfer' as ServiceIcon,
  },
  {
    title: 'Экскурсии',
    description: 'Показываем не «для галочки», а то, что действительно впечатляет',
    icon: 'excursion' as ServiceIcon,
  },
  {
    title: 'Джип-туры',
    description: 'Добираемся туда, где заканчиваются обычные дороги',
    icon: 'jeep' as ServiceIcon,
  },
  {
    title: 'Необычные маршруты',
    description: 'Пути, которые запоминаются не фотографиями, а ощущениями',
    icon: 'routes' as ServiceIcon,
  },
  {
    title: 'Конные прогулки',
    description: 'Тихий ритм горных троп и настоящая встреча с ландшафтом',
    icon: 'horse' as ServiceIcon,
  },
  {
    title: 'Термальные источники',
    description: 'Тёплая вода, горный воздух и пауза, которую не хочется заканчивать',
    icon: 'thermal' as ServiceIcon,
  },
]
