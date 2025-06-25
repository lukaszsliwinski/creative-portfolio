import { LanguageProvider } from '@/context/LanguageContext';
import Background from '@/components/layout/Background';
import Nav from '@/components/layout/Nav';
import Landing from '@/components/layout/Landing';
import ToggleLanguage from '@/components/ToggleLanguage';

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="tracking-widest">
        <Background />
        <Nav />
        <Landing />
        <ToggleLanguage />
        <section className="h-screen flex justify-center items-center">
          section
        </section>
        <section className="h-screen flex justify-center items-center">
          section
        </section>
        <section className="h-screen flex justify-center items-center">
          section
        </section>
      </main>
    </LanguageProvider>
  );
}
