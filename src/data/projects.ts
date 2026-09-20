import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'flight-ticket',
    title: 'Flight Ticket App Travel Website',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Aplikasi pemesanan tiket pesawat dengan antarmuka yang responsif.',
    image: '/images/projects/flight-ticket.png',
    techStack: ['Laravel', 'React', 'Tailwind'],
    fullDescription: 'Aplikasi pemesanan tiket pesawat komprehensif yang dirancang untuk memudahkan pengguna dalam mencari, membandingkan, dan memesan jadwal penerbangan secara real-time. Fokus utama pada pengalaman pemesanan yang cepat dan tanpa hambatan.',
    role: 'Front-End Developer',
    features: [
      'Pencarian jadwal penerbangan real-time',
      'Sistem filter dinamis (berdasarkan maskapai, harga, waktu)',
      'Desain responsif untuk perangkat mobile dan desktop'
    ],
    liveUrl: 'https://example.com/flight-ticket',
    githubUrl: 'https://github.com/username/flight-ticket'
  },
  {
    id: 'nike-ecommerce',
    title: 'Nike E-Commerce',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Katalog produk dan sistem keranjang belanja interaktif.',
    image: '/images/projects/nike-ecommerce.png',
    techStack: ['Vue.js', 'Node.js', 'MySQL'],
    fullDescription: 'Platform e-commerce khusus untuk produk sepatu olahraga dengan fokus pada pengalaman pengguna yang interaktif. Menyediakan animasi transisi yang halus dan proses checkout yang dioptimalkan.',
    role: 'Fullstack Developer',
    features: [
      'Katalog produk dinamis dengan variasi ukuran dan warna',
      'Sistem keranjang belanja interaktif (State Management)',
      'Manajemen inventaris pada sisi backend'
    ],
    liveUrl: 'https://example.com/nike-store',
    githubUrl: 'https://github.com/username/nike-ecommerce'
  },
  {
    id: 'phone-accessories',
    title: 'Phone Accessories Coreit',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Platform penjualan aksesoris gawai terintegrasi.',
    image: '/images/projects/phone-accessories.png',
    techStack: ['WordPress', 'Apache', 'MySQL'],
    fullDescription: 'Toko online terintegrasi untuk penjualan berbagai macam aksesoris smartphone. Dibangun dengan sistem manajemen konten yang memudahkan administrator toko untuk mengelola produk, pesanan, dan promo.',
    role: 'Web Developer',
    features: [
      'Desain kustom tema e-commerce',
      'Integrasi sistem pembayaran lokal',
      'Optimasi SEO dasar untuk pencarian produk'
    ],
    liveUrl: 'https://example.com/coreit-store'
  },
  {
    id: 'typicall-crm',
    title: 'Typicall - CRM Automation Platform',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Dashboard analitik dan otomatisasi manajemen pelanggan.',
    image: '/images/projects/typicall-crm.svg',
    wide: true,
    techStack: ['Laravel', 'React', 'REST API'],
    fullDescription: 'Typicall CRM adalah platform manajemen pelanggan tingkat lanjut yang dirancang untuk mempercepat alur kerja tim sales. Aplikasi ini memusatkan data pelanggan, memantau interaksi, dan menyediakan analitik bisnis secara komprehensif.',
    role: 'Fullstack Developer',
    features: [
      'Real-time Analytics Dashboard',
      'Lead Tracking & Pipeline Management',
      'Automated Reporting & REST API Integration'
    ],
    liveUrl: 'https://typicall-demo.com',
    githubUrl: 'https://github.com/username/typicall-crm'
  },
  {
    id: 'tips-games',
    title: 'Tips Bermain Games - Blog',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Portal artikel dan panduan bermain game.',
    image: '/images/projects/tips-games.png',
    techStack: ['Next.js', 'Tailwind', 'Markdown'],
    fullDescription: 'Portal blog berkinerja tinggi yang menyajikan artikel, tips, dan trik seputar dunia game. Dibangun dengan pendekatan static site generation (SSG) untuk memastikan waktu muat halaman yang sangat cepat dan SEO yang optimal.',
    role: 'Front-End Developer',
    features: [
      'Rendering konten Markdown (MDX) ke HTML',
      'Sistem pencarian artikel instan',
      'Dukungan Mode Gelap (Dark Mode)'
    ],
    githubUrl: 'https://github.com/username/tips-games'
  },
  {
    id: 'typicall-flutter',
    title: 'Typicall - Clone Flutter App',
    category: 'mobile',
    categoryLabel: 'Mobile',
    description: 'Aplikasi mobile lintas platform untuk manajemen data.',
    image: '/images/projects/typicall-flutter.svg',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    fullDescription: 'Versi aplikasi mobile dari platform Typicall CRM. Dibangun dengan framework lintas platform (Flutter) untuk memastikan pengalaman UI/UX yang konsisten antara pengguna Android dan iOS, didukung backend Firebase.',
    role: 'Mobile Developer',
    features: [
      'Autentikasi pengguna terintegrasi',
      'Sinkronisasi data real-time dengan Cloud Firestore',
      'Implementasi state management menggunakan Provider/Riverpod'
    ],
    githubUrl: 'https://github.com/username/typicall-flutter'
  }
];