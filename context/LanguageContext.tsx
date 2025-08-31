// Language context provider with translation support based on selected language

'use client';
import { createContext, useContext, useState, useMemo } from 'react';
import { Lang, getTranslator } from '@/utils/i18n';
import { LanguageContextProps, LanguageProviderProps } from '@/types';

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Lang>('en');

  // Memoized translator function based on the selected language
  const t = useMemo(() => getTranslator(language), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to access language context
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
