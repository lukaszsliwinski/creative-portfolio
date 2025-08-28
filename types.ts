import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';
import { Texture } from 'three';
import { Lang } from './utils/i18n';

// components/
export interface BioCardProps {
  text: string;
}

export interface HeaderProps {
  text: string;
}

export interface HoverFlipProps {
  text?: string;
  icon?: IconDefinition;
  size: 'sm' | 'lg';
}

export interface ProjectCardProps {
  children: ReactNode;
  previewSrc: string;
  title: string;
  description: string;
  sourceUrl: string;
  linkUrl: string;
}

export interface TechBallProps {
  position: [number, number, number];
  texture: Texture;
}

// context/
export interface LanguageContextProps {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface GalleryProps {
  slides: React.ReactNode[];
}
