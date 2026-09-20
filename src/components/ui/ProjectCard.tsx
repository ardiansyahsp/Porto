import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // TypeScript sudah tahu project memiliki techStack karena kita sudah update types-nya
  const techStack = project.techStack || ['Laravel', 'MySQL'];

  return (
    <Link 
      to={`/project/${project.id}`} 
      className={`project-card flex flex-col rounded-xl border border-border bg-white overflow-hidden group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${project.wide ? 'md:col-span-2' : ''}`}
    >
      {/* Area Gambar */}
      <div className={`relative overflow-hidden ${project.wide ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-surface`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm backdrop-blur-md ${project.category === 'web' ? 'bg-blue-600/90 text-white' : 'bg-purple-600/90 text-white'}`}>
          {project.categoryLabel}
        </span>
      </div>
      
      {/* Area Konten */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold text-body group-hover:text-laravel transition-colors leading-snug">
            {project.title}
          </h3>
          <svg className="w-5 h-5 text-transparent group-hover:text-laravel transition-colors shrink-0 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <p className="mt-2 text-sm text-muted line-clamp-2">
          {project.description}
        </p>

        {/* Area Tech Stack */}
        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          {techStack.map((tech: string, idx: number) => (
            <span key={idx} className="px-2 py-1 text-[10px] font-bold text-muted bg-surface border border-border-light rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};