import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/hooks';
import { projects } from '@/data/projects';
import type { Category } from '@/types';
import { ProjectCard } from '@/components/ui';
import { SectionDivider } from '@/components/ui';

type Tab = 'all' | Category;

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter(p => p.category === activeTab);
  }, [activeTab]);

  const counts = useMemo(() => ({
    all: projects.length,
    web: projects.filter(p => p.category === 'web').length,
    mobile: projects.filter(p => p.category === 'mobile').length,
    computer_vision: projects.filter(p => p.category === 'computer_vision').length,
  }), []);

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'all', labelKey: 'grid.tab_all' },
    { id: 'web', labelKey: 'grid.tab_web' },
    { id: 'mobile', labelKey: 'grid.tab_mobile' },
    { id: 'computer_vision', labelKey: 'grid.tab_cv' },
  ];

  return (
    <>
      <section id="projects" className="bg-white overflow-hidden pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center min-h-[60vh]">
            
            {/* Kolom Kiri: Teks & Penjelasan */}
            <div className="space-y-8 lg:pr-8 flex flex-col justify-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-laravel tracking-wide uppercase">
                  Featured Mobile Project
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-normal text-body leading-[1.05] tracking-tight">
                  <span>{t('projects.my')}</span><br/>
                  <span className="font-semibold text-body">{t('projects.title')}</span>
                </h2>
              </div>
              
              <p className="text-lg text-muted leading-relaxed max-w-lg">
                {t('projects.description')}
              </p>
              
              <div className="pt-2">
                <a href="#project-grid" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                  <span>{t('projects.view_button')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>

            {/* Kolom Kanan: Mockup Smartphone */}
            <div className="flex justify-center lg:justify-end">
              <div className="phone-stage transform lg:-translate-y-4">
                <div className="phone-3d hover:scale-[1.02] transition-transform duration-500">
                  <div className="phone-3d-notch"></div>
                  <div className="phone-3d-screen">
                    <img src="/images/phone-mockup.png" alt="Mobile app project" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="project-grid" className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Tab Filter */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white ${
                  activeTab === tab.id ? 'tab-active text-laravel' : 'text-muted'
                }`}
              >
                <span>{t(tab.labelKey)}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                  activeTab === tab.id ? 'bg-laravel/10 text-laravel' : 'bg-surface text-muted border border-border'
                }`}>
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};