import type { Project } from '@/types';

export type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'flight-ticket',
    title: 'Flight Ticket App Travel Website',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Aplikasi pemesanan tiket pesawat dengan antarmuka yang responsif.',
    image: '/images/projects/flight-ticket.png',
    techStack: ['Laravel', 'React', 'Tailwind']
  },
  {
    id: 'nike-ecommerce',
    title: 'Nike E-Commerce',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Katalog produk dan sistem keranjang belanja interaktif.',
    image: '/images/projects/nike-ecommerce.png',
    techStack: ['Vue.js', 'Node.js', 'MySQL']
  },
  {
    id: 'phone-accessories',
    title: 'Phone Accessories Coreit',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Platform penjualan aksesoris gawai terintegrasi.',
    image: '/images/projects/phone-accessories.png',
    techStack: ['WordPress', 'Apache', 'MySQL']
  },
  {
    id: 'typicall-crm',
    title: 'Typicall - CRM Automation Platform',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Dashboard analitik dan otomatisasi manajemen pelanggan.',
    image: '/images/projects/typicall-crm.svg',
    wide: true,
    techStack: ['Laravel', 'React', 'REST API']
  },
  {
    id: 'tips-games',
    title: 'Tips Bermain Games - Blog',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Portal artikel dan panduan bermain game.',
    image: '/images/projects/tips-games.png',
    techStack: ['Next.js', 'Tailwind', 'Markdown']
  },
  {
    id: 'typicall-flutter',
    title: 'Typicall - Clone Flutter App',
    category: 'mobile',
    categoryLabel: 'Mobile',
    description: 'Aplikasi mobile lintas platform untuk manajemen data.',
    image: '/images/projects/typicall-flutter.svg',
    techStack: ['Flutter', 'Dart', 'Firebase']
  }
];