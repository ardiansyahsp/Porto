import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer id="about" className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: Logo, Tagline, Contact Form */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2L32 12L18 34L4 12L18 2Z" fill="#FF2D20"/>
                  <path d="M18 2L32 12L18 18L4 12L18 2Z" fill="#FF4D42"/>
                  <path d="M18 18L32 12L18 34Z" fill="#E5261A"/>
                  <path d="M4 12L18 18L18 34Z" fill="#CC1F15"/>
                </svg>
                <span className="font-bold text-lg text-body">Ardiansyah</span>
              </div>
              <p className="text-sm font-semibold text-laravel">{t('footer.tagline')}</p>
            </div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder={t('footer.first_name')} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-white text-body placeholder-muted focus:outline-none focus:ring-2 focus:ring-laravel/20" />
                <input type="text" placeholder={t('footer.last_name')} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-white text-body placeholder-muted focus:outline-none focus:ring-2 focus:ring-laravel/20" />
              </div>
              <input type="email" placeholder={t('footer.email')} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-white text-body placeholder-muted focus:outline-none focus:ring-2 focus:ring-laravel/20" />
              <button type="submit" className="btn-transition w-full px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                <span>{t('footer.hire_button')}</span>
              </button>
              <p className="text-xs text-muted">{t('footer.disclaimer')}</p>
            </form>

            <div className="flex items-center gap-3">
              <a href="https://github.com/ardiansyahsp" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted hover:text-body hover:border-body transition-colors">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-12">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-body uppercase mb-4">{t('footer.nav_title')}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_home')}</a></li>
                <li><a href="#projects" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_project')}</a></li>
                <li><a href="#about" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_about')}</a></li>
                <li><a href="#about" className="text-sm text-muted hover:text-body transition-colors">{t('footer.nav_contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider text-body uppercase mb-4">{t('footer.skills_title')}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Laravel</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Flutter</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">React / Next.js</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Python / TensorFlow</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Firebase</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Tailwind CSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider text-body uppercase mb-4">{t('footer.connect_title')}</h4>
              <ul className="space-y-2.5">
                <li><a href="https://github.com/ardiansyahsp" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-body transition-colors">GitHub</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Email</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-body transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-muted text-center sm:text-left">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
