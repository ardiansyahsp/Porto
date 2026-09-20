export type Category = 'web' | 'mobile' | 'computer_vision';

export interface Project {
  id: string;
  title: string;
  category: Category; // Ubah tipe category menjadi 'Category' agar lebih aman
  categoryLabel: string;
  image: string;
  description: string;
  wide?: boolean;
  techStack?: string[];
  fullDescription?: string;
  role?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
}