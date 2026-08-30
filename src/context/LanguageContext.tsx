import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type LangType = 'en' | 'id';
type Translations = Record<string, string>;

interface LanguageContextProps {
  lang: LangType;
  t: (key: string) => string;
  setLang: (lang: LangType) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangType>(
    (localStorage.getItem('portfolio_lang') as LangType) || 'en'
  );
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const mod = await import(`../data/lang/${lang}.json`);
        setTranslations(mod.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    loadTranslations();
  }, [lang]);

  const setLang = (newLang: LangType) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
