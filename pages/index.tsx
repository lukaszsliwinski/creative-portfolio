import { LanguageProvider } from '@/context/LanguageContext';
import Background from '@/components/layout/Background';
import Landing from '@/components/layout/Landing';
import About from '@/components/layout/About';
import Technologies from '@/components/layout/Technologies';
import Projects from '@/components/layout/Projects';
import Mountains from '@/components/layout/Mountains';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="tracking-widest select-none">
        <Background />
        {/* <Mountains /> */}
        <Landing />
        <About />
        <Technologies />
        <Projects />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
