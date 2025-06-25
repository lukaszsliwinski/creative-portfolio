import { useLanguage } from "@/context/LanguageContext";

export default function Landing() {
  const { t } = useLanguage();

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <hgroup className="flex flex-col items-center space-y-3 tracking-[.4em]">
        <h1 className="font-medium text-7xl">
          ŁUKASZ ŚLIWIŃSKI
        </h1>
        <h2 className="text-3xl text-neutral-400">
          FRONT-END DEVELOPER
        </h2>
      </hgroup>
      <a
        href="#about"
        className="mt-6 inline-flex items-center rounded-sm border border-white px-6 py-5 text-center text font-medium focus:outline-none focus:ring-4 focus:ring-white relative h-7 overflow-hidden group"
      >
        <span className="block transition-transform duration-200 group-hover:-translate-y-10">{t('nav.about')}</span>
        <span className="block absolute left-0 top-10 w-full transition-transform duration-200 group-hover:-translate-y-8">{t('nav.about')}</span>
        <span className="sr-only">{t('nav.about')}</span>
      </a>
    </section>
  );
}
