import { LanguageProvider } from '@/context/LanguageContext';
import Background from '@/components/layout/Background';
import Landing from '@/components/layout/Landing';
import About from '@/components/layout/About';
import Projects from '@/components/layout/Projects';
import Footer from '@/components/layout/Footer';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});


export default function HomePage() {
  return (
    <LanguageProvider>
      <main className={`${inter.variable} font-sans tracking-[0.165em] text-white text-sm leading-7 select-none font-extralight`}>
        <Background />
        <Landing />
        <About />
        <Projects />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
