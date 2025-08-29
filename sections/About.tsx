// Two cards with a description about me coming from both sides of the screen

'use client';
import { easeInOut, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import BioCard from '@/components/BioCard';

export default function About() {
  const { t } = useLanguage();

  const transition = { duration: 0.6, ease: easeInOut };
  const xOffset = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;

  return (
    <section className="overflow-x-hidden min-h-screen" id="about">
      <Header text={t('nav.about')} />
      <div className="grid sm:grid-cols-4 gap-y-8 w-full md:w-3xl lg:w-4xl xl:w-5xl px-4 mx-auto">
        <motion.div
          className="sm:col-span-3"
          initial={{ x: -xOffset, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: false }}
          transition={transition}
        >
          <BioCard text={t('about.bio1')} />
        </motion.div>
        <motion.div
          className="sm:col-span-3 sm:col-start-2"
          initial={{ x: xOffset, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: false }}
          transition={transition}
        >
          <BioCard text={t('about.bio2')} />
        </motion.div>
      </div>
    </section>
  );
}
