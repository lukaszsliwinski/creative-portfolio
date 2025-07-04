'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import ToggleLanguage from '../ToggleLanguage';

const ANIMATION_DURATION = 800; // ms
const DURATION_CLASS = `duration-${ANIMATION_DURATION}`;

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li className="relative h-7 overflow-hidden group cursor-pointer">
      <span className="block transition-transform duration-200 group-hover:-translate-y-7">
        {label}
      </span>
      <span className="block absolute left-0 top-7 w-full transition-transform duration-200 group-hover:-translate-y-7 text-neutral-400">
        <a href={href}>{label}</a>
      </span>
    </li>
  );
}

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
          className="fixed top-4 left-4 z-50 text-3xl transition cursor-pointer hover:text-neutral-400 hover:scale-105"
          onClick={() => handleToggle(true)}
          aria-label="Show menu"
        >
          ☰
        </button>
      )}
      {/* Navigation with slide/fade animation */}
      <nav
        className={`text-lg fixed w-full px-6 py-4 bg-black/20 backdrop-blur-lg flex items-center justify-center z-40 transition-all ease-in-out ${DURATION_CLASS} ${visible ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'}`}
      >
        {visible && (
          <button
            className="text-2xl transition cursor-pointer hover:text-neutral-400 hover:scale-105 mr-8"
            onClick={() => handleToggle(false)}
            aria-label="Hide menu"
          >
            X
          </button>
        )}
        <ul className="flex justify-center space-x-8 flex-1 my-1">
          <NavItem href="#about" label={t('nav.about')} />
          <NavItem href="#technologies" label={t('nav.technologies')} />
          <NavItem href="#projects" label={t('nav.projects')} />
        </ul>
        <ToggleLanguage />
      </nav>
    </>
  );
}