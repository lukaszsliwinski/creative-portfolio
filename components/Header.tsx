// Header component changing color on scroll

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeaderProps } from '@/types';

export default function Header({ text }: HeaderProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 80%'],
  });

  const color = useTransform(scrollYProgress, [0, 1], ['#6b7280', '#ffffff']);

  return (
    <motion.h2
      ref={ref}
      className="font-light text-3xl text-center pt-24 pb-12"
      style={{ color }}
    >
      {text}
    </motion.h2>
  );
}
