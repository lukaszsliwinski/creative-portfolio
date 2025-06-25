'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ToggleLanguage() {
  const { setLanguage, language } = useLanguage();
  const [rotating, setRotating] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === 'pl' ? 'en' : 'pl';
    setLanguage(newLang);
    setRotating(true);
    setTimeout(() => setRotating(false), 200);
  };

  return (
    <button
      className="z-50 fixed bottom-10 right-10 cursor-pointer flex items-center justify-center w-16 h-16 rounded-full transition group"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className="relative flex items-center justify-center w-16 h-16">
        {/* Circular arrows SVG */}
        <svg
          className={`absolute inset-0 w-16 h-16 text-neutral-400 ${rotating ? 'animate-whirl' : ''}`}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M32 8a24 24 0 1 1-16.97 7.03" />
          <polygon points="13,13 22,8 17,17" fill="currentColor" />
          <path d="M32 56a24 24 0 1 1 16.97-7.03" />
          <polygon points="51,51 42,56 47,47" fill="currentColor" />
        </svg>
        {/* Animated language text */}
        <span className="relative z-10 flex flex-col items-center justify-center h-8 overflow-hidden select-none">
          <span
            className="block transition-transform duration-300 group-hover:-translate-y-8"
          >
            {language === 'pl' ? 'EN' : 'PL'}
          </span>
          <span
            className="block absolute top-8 left-0 right-0 transition-transform duration-300 group-hover:-translate-y-7"
          >
            {language === 'pl' ? 'EN' : 'PL'}
          </span>
        </span>
      </span>
    </button>
  );
}