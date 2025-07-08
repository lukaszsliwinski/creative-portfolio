import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header({ text }: { text: string }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 80%"],
  });

  const color = useTransform(scrollYProgress, [0, 1], ["#6b7280", "#ffffff"]);

  return (
    <motion.h2
      ref={ref}
      className="text-3xl text-center my-8"
      style={{ color }}
    >
      {text}
    </motion.h2>
  );
}
