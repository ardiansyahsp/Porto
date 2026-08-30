import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setIsLangDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-border-light transition-shadow duration-300 ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2L32 12L18 34L4 12L18 2Z" fill="#FF2D20"/>
                <path d="M18 2L32 12L18 18L4 12L18 2Z" fill="#FF4D42"/>
                <path d="M18 18L32 12L18 34Z" fill="#E5261A"/>
              </svg>
              <span className="font-bold text-lg text-body tracking-tight">Ardiansyah</span>
            </a>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {['projects', 'skills', 'experience', 'about'].map((item) => (
              <a key={item} href={`#${item}`} className="relative px-3 py-2 text-sm font-medium text-muted hover:text-body transition-colors flex items-center gap-1">
                <span>{t(`nav.${item}`)}</span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/ardiansyahsp" target="_blank" rel="noreferrer" className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-body hover:bg-surface transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>

            {/* Language Toggle */}
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLangDropdownOpen(!isLangDropdownOpen); }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted hover:text-body border border-border rounded-lg hover:bg-surface transition-colors"
              >
                <span>{lang === 'id' ? 'IND' : 'ENG'}</span>
                <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-border rounded-lg shadow-lg overflow-hidden dropdown-enter">
                  <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-surface transition-colors ${lang === 'en' ? 'font-semibold text-laravel' : 'text-muted'}`}>English</button>
                  <button onClick={() => setLang('id')} className={`w-full text-left px-4 py-2 text-sm hover:bg-surface transition-colors ${lang === 'id' ? 'font-semibold text-laravel' : 'text-muted'}`}>Indonesia</button>
                </div>
              )}
            </div>

            <button onClick={onOpenSearch} className="hidden md:flex items-center gap-3 px-3 py-1.5 text-sm text-muted border border-border rounded-lg hover:bg-surface transition-colors w-52">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span className="flex-1 text-left truncate">{t('nav.search')}</span>
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted bg-surface rounded border border-border">⌘K</kbd>
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-body hover:bg-surface transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border-light bg-white">
          <div className="px-4 py-4 space-y-1">
            {['projects', 'skills', 'experience', 'about'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-muted hover:text-body hover:bg-surface rounded-lg">
                {t(`nav.${item}`)}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-3 border-t border-border-light">
              <button onClick={toggleLang} className="px-3 py-1.5 text-sm font-medium text-muted border border-border rounded-lg hover:bg-surface">
                {lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
