// Navigation bar with 

'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HoverFlip from '@/components/HoverFlip';
import ToggleLanguage from '@/components/ToggleLanguage';

export default function Nav() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  // Handles menu show/hide
  const handleToggle = (show: boolean) => {
    setVisible(show);
  };

  return (
    <>
      {/* Toggle menu open button, always visible on the left */}
      {!visible && (
        <button 
          className="fixed top-4 left-4 z-50 text-3xl transition cursor-pointer hover:text-main"
          onClick={() => handleToggle(true)}
          aria-label="Show menu"
        >
          ☰
        </button>
      )}

      {/* Navigation with slide/fade animation */}
      <nav
        className={`text-lg fixed w-full px-6 py-4 bg-black/20 backdrop-blur-lg flex items-center justify-center z-40 transition-all ease-in-out duration-800 ${visible ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'}`}
      >
        {visible && (
          <button
            className="text-3xl font-normal transition cursor-pointer hover:text-main mr-8"
            onClick={() => handleToggle(false)}
            aria-label="Hide menu"
          >
            X
          </button>
        )}
        <ul className="flex justify-center font-light space-x-8 flex-1 my-1">
          <li>
            <a href="#about">
              <HoverFlip text={t('nav.about')} size='sm'/>
            </a>
          </li>
          <li>
            <a href="#projects">
              <HoverFlip text={t('nav.projects')} size='sm' />
            </a>
          </li>
        </ul>
        <ToggleLanguage />
      </nav>
    </>
  );
}
