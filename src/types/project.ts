// src/types/project.ts
export interface Project {
  id: string; // Tambahkan ini (misal: "typicall-crm")
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  description: string;
  wide?: boolean;
  techStack?: string[]; // Seperti di ProjectCard
  // --- Tambahan untuk halaman detail ---
  fullDescription?: string;
  role?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
}