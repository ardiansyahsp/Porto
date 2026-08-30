import React, { createContext, useContext, useState, type ReactNode } from 'react';
import en from '../data/lang/en.json';
import id from '../data/lang/id.json';

type LangType = 'en' | 'id';

const translationsMap = {
  en,
  id,
};

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

  const setLang = (newLang: LangType) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  const t = (key: string): string => {
    const translations = translationsMap[lang];
    // Cast translations to Record<string, string> or any to avoid TS index errors
    const value = (translations as Record<string, string>)[key];
    return value || key;
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

