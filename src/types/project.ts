export type Category = 'web' | 'mobile' | 'computer_vision';

export interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  description: string;
  image: string;
  wide?: boolean;
  techStack?: string[];
}
