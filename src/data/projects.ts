export type Category = 'web' | 'mobile' | 'computer_vision';

export interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  description: string;
  image: string;
  wide?: boolean;
}

export const projects: Project[] = [
  {
    id: 'flight-ticket',
    title: 'Flight Ticket App Travel Website',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Web Development',
    image: '/images/projects/flight-ticket.png'
  },
  {
    id: 'nike-ecommerce',
    title: 'Nike E-Commerce',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Web Development',
    image: '/images/projects/nike-ecommerce.png'
  },
  {
    id: 'phone-accessories',
    title: 'Phone Accessories Coreit',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Web Development',
    image: '/images/projects/phone-accessories.png'
  },
  {
    id: 'typicall-crm',
    title: 'Typicall - CRM Automation Platform',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Web Development',
    image: '/images/projects/typicall-crm.svg',
    wide: true
  },
  {
    id: 'tips-games',
    title: 'Tips Bermain Games - Blog',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Web Development',
    image: '/images/projects/tips-games.png'
  },
  {
    id: 'typicall-flutter',
    title: 'Typicall - Clone Flutter App',
    category: 'mobile',
    categoryLabel: 'Mobile',
    description: 'Mobile Development',
    image: '/images/projects/typicall-flutter.svg'
  }
];
