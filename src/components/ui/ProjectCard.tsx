import React from 'react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={`project-card rounded-xl border border-border bg-white overflow-hidden group ${project.wide ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden ${project.wide ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-surface`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${project.category === 'web' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
          {project.categoryLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-body group-hover:text-laravel transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.description}</p>
      </div>
    </div>
  );
};
