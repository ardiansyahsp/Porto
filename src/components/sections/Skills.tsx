import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { skills } from '../../data/skills';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="bg-surface border-y border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <p className="text-xs font-bold tracking-wider text-muted uppercase whitespace-nowrap shrink-0">
            {t('strip.label')}
          </p>
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full justify-center lg:justify-start">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.id}>
                <div className="flex items-center shrink-0" dangerouslySetInnerHTML={{ __html: skill.svg }} />
                {index < skills.length - 1 && <div className="w-px h-8 bg-border shrink-0"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
