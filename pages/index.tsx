import { LanguageProvider } from '@/context/LanguageContext';
import Background from '@/sections/Background';
import Landing from '@/sections/Landing';
import About from '@/sections/About';
import Projects from '@/sections/Projects';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

export default function HomePage() {
  return (
    <LanguageProvider>
      <main
        className={`${inter.variable} font-sans tracking-[0.165em] text-white text-xs xs:text-sm leading-6 xs:leading-7 select-none font-extralight`}
      >
        <Background />
        <Landing />
        <About />
        <Projects />
      </main>
    </LanguageProvider>
  );
}
