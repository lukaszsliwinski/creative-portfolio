import { LanguageProvider } from '@/context/LanguageContext';
import Background from '@/components/layout/Background';
import Nav from '@/components/layout/Nav';
import Landing from '@/components/layout/Landing';
import ToggleLanguage from '@/components/ToggleLanguage';
import About from '@/components/layout/About';
import Technologies from '@/components/layout/Technologies';
import Projects from '@/components/layout/Projects';
import Mountains from '@/components/layout/Mountains';

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="tracking-widest select-none">
        <Background />
        <Nav />
        <Landing />
        <Mountains />
        <ToggleLanguage />
        <About />
        <Technologies />
        <Projects />
      </main>
    </LanguageProvider>
  );
}
