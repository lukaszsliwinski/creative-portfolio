import en from '../locales/en.json';
import pl from '../locales/pl.json';

export type Lang = 'en' | 'pl';

const translations: Record<Lang, Record<string, string>> = {
  en,
  pl,
};

export function getTranslator(lang: Lang) {
  const dict = translations[lang];

  return function t(key: string): string {
    return dict[key] ?? key;
  };
}
