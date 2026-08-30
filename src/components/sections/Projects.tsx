import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { projects, type Category } from '../../data/projects';
import { ProjectCard } from '../ui/ProjectCard';
import { SectionDivider } from '../ui/SectionDivider';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-divider-dots flex flex-col items-center justify-center text-center py-10 sm:py-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal text-body leading-tight tracking-tight">
            <span className="block text-muted">{t('transition.heading_line1')}</span>
            <span className="block font-semibold mt-1">{t('transition.heading_line2')}</span>
          </h2>
        </div>
      </div>

      <SectionDivider />

      <section id="projects">
        <div className="bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-7xl sm:text-8xl lg:text-[96px] font-normal text-body leading-[0.95] tracking-tighter">
                  <span>{t('projects.my')}</span><br/>
                  <span>{t('projects.title')}</span>
                </h2>
                <p className="text-base sm:text-lg text-muted leading-relaxed max-w-md">
                  {t('projects.description')}
                </p>
                <a href="#project-grid" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                  <span>{t('projects.view_button')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="phone-stage">
                  <div className="phone-3d">
                    <div className="phone-3d-notch"></div>
                    <div className="phone-3d-screen">
                      <img src="/images/phone-mockup.png" alt="Mobile app project" />
                    </div>
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
