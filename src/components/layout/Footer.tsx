import React from 'react';
import { useLanguage } from '@/hooks';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="about" className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: Wordmark, headline, contact */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-2">
              <span className="font-bold text-lg text-body">Ardiansyah</span>
              <p className="text-sm text-muted max-w-xs">{t('footer.tagline')}</p>
            </div>

            <div className="space-y-4 max-w-md">
              <h3 className="text-3xl sm:text-4xl font-black text-body leading-[1.1] tracking-tight">
                {t('footer.cta_heading')}
              </h3>
              <a
                href="mailto:hello@ardiansyah.dev"
                className="inline-flex items-center gap-2 text-base font-semibold text-laravel border-b-2 border-laravel/30 hover:border-laravel pb-0.5 transition-colors"
              >
                hello@ardiansyah.dev
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://github.com/ardiansyahsp" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted hover:text-body hover:border-body transition-colors">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted hover:text-body hover:border-body transition-colors">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 01-.001 4.125zM7.114 20.452H3.558V9h3.556v11.452z"/></svg>
              </a>
              <a href="mailto:hello@ardiansyah.dev" aria-label="Email" className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted hover:text-body hover:border-body transition-colors">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z"/><path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7l8.5 6 8.5-6"/></svg>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted hover:text-body hover:border-body transition-colors">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Navigation + Stack */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-12">
            <div>
              <h4 className="text-sm font-semibold text-body mb-4">{t('footer.nav_title')}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_home')}</a></li>
                <li><a href="#projects" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_project')}</a></li>
                <li><a href="#about" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_about')}</a></li>
                <li><a href="#about" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-body mb-4">{t('footer.skills_title')}</h4>
              <div className="flex flex-wrap gap-2">
                {['Laravel', 'Flutter', 'React / Next.js', 'Python / TensorFlow', 'Firebase', 'Tailwind CSS'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs text-muted border border-border rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-muted">{t('footer.copyright')}</p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t('footer.availability')}</span>
            <span className="text-border">•</span>
            <span>{t('footer.location')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};