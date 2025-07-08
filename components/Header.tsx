import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header({ text }: { text: string }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 50%"],
  });

  return (
    <h2 ref={ref} className="text-3xl text-center my-8">
      {text.split("").map((char, i) => {
        const start = i * 0.03;
        const end = start + 0.001;

        const value = useTransform(scrollYProgress, [start, end], [0, 1]);
        const [isActive, setIsActive] = useState(false);

        useEffect(() => {
          const unsubscribe = value.on("change", (v) => {
            if (v >= 1 && !isActive) setIsActive(true);
            if (v < 1 && isActive) setIsActive(false);
          });
          return unsubscribe;
        }, [value, isActive]);

        return (
          <motion.span
            key={i}
            style={{ color: isActive ? "#ffffff" : "#6b7280" }}
          >
            {char}
          </motion.span>
        );
      })}
    </h2>
  );
}
