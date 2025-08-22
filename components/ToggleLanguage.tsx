// Toggle button to change page language

'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HoverFlip from '@/components/HoverFlip';

export default function ToggleLanguage() {
  const { setLanguage, language } = useLanguage();
  const [rotating, setRotating] = useState(false);

  // Toggle function
  const toggleLanguage = () => {
    const newLang = language === 'pl' ? 'en' : 'pl';
    setLanguage(newLang);
    setRotating(true);
    setTimeout(() => setRotating(false), 200);
  };

  return (
    <button
      className="z-50 fixed right-1 cursor-pointer flex items-center justify-center w-16 h-16 rounded-full transition group scale-75 md:scale-100"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className="relative flex items-center justify-center w-16 h-16">
        {/* Circular arrows SVG */}
        <svg
          className={`absolute inset-0 w-16 h-16 text-white ${rotating ? 'animate-whirl' : ''}`}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth=".5"
        >
          <circle cx="32" cy="32" r="24" fill="#000" />
          <path d="M32 8a24 24 0 1 1-16.97 7.03" />
          <polygon points="13,13 22,8 17,17" fill="currentColor" />
          <path d="M32 56a24 24 0 1 1 16.97-7.03" />
          <polygon points="51,51 42,56 47,47" fill="currentColor" />
        </svg>
        <HoverFlip text={language === 'pl' ? 'EN' : 'PL'} size="sm" />
      </span>
    </button>
  );
}
