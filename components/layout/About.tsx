import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BioCard from "../BioCard";

export default function About() {
  const { t } = useLanguage();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-1/3 flex p-6" id="about">
      <div
        className="flex-1"
      >
        <BioCard text={t('about.bio1')} />
      </div>
      <div
        className="flex-1 transition-transform duration-100 will-change-transform flex items-center"
        style={{ transform: `translateY(${-offset * 0.3}px)` }}
      >
        <BioCard text={t('about.bio2')} />
      </div>
    </section>
  );
}