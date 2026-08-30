import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 animate-slideUp">
            <p className="text-sm font-semibold text-laravel tracking-wide uppercase">
              {t('hero.greeting')}
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-normal text-body leading-[1.05] tracking-tight">
              <span>{t('hero.name_line1')}</span><br/>
              <span className="text-body">{t('hero.name_line2')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-lg leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a href="#projects" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                <span>{t('hero.cta_primary')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#" className="btn-transition inline-flex items-center gap-2 px-6 py-3 border border-border text-body text-sm font-semibold rounded-lg hover:bg-surface">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>{t('hero.cta_secondary')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Isometric Illustration */}
          <div className="lg:col-span-5 flex justify-center" style={{ animation: 'fadeIn 0.8s ease-out 0.3s both' }}>
            <div className="relative w-full max-w-md">
              <img src="/images/hero-illustration.png" alt="Isometric illustration" className="w-full h-auto hero-illustration" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-laravel animate-pulse-soft"></span>
                  <span className="w-8 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></span>
                  <span className="w-12 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse-soft" style={{ animationDelay: '1s' }}></span>
                  <span className="w-8 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
