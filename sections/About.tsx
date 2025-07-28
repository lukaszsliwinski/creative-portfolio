import { useEffect, useRef } from "react";
import { easeInOut, motion, useAnimation, useInView } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import BioCard from "@/components/BioCard";

export default function About() {
  const { t } = useLanguage();

  const transition = { duration: 0.6, ease: easeInOut };
  const xOffset = typeof window !== "undefined" ? window.innerWidth / 2 : 0;

  // Card 1 (from left)
  const ref1 = useRef(null);
  const inView1 = useInView(ref1, { amount: 0.3, once: false });
  const animLeft = useAnimation();

  useEffect(() => {
    if (inView1) {
      animLeft.start({ x: 0, opacity: 1, transition });
    } else {
      animLeft.start({ x: -xOffset, opacity: 0, transition });
    }
  }, [inView1]);

  // Card 2 (from right)
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { amount: 0.3, once: false });
  const animRight = useAnimation();

  useEffect(() => {
    if (inView2) {
      animRight.start({ x: 0, opacity: 1, transition });
    } else {
      animRight.start({ x: xOffset, opacity: 0, transition });
    }
  }, [inView2]);

  return (
    <section className="overflow-x-hidden min-h-screen" id="about">
      <Header text={t('nav.about')} />
      <div className="grid grid-cols-4 gap-y-8 w-5xl mx-auto">
        <motion.div
          ref={ref1}
          className="col-span-3"
          initial={{ x: -xOffset, opacity: 0 }}
          animate={animLeft}
        >
          <BioCard text={t("about.bio1")} />
        </motion.div>
        <motion.div
          ref={ref2}
          className="col-span-3 col-start-2"
          initial={{ x: xOffset, opacity: 0 }}
          animate={animRight}
        >
          <BioCard text={t("about.bio2")} />
        </motion.div>
      </div>
    </section>
  );
}
