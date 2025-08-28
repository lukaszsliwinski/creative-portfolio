// Gallery component for displaying projects in mobile view

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanInfo } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-regular-svg-icons';

import { GalleryProps } from '@/types';

export default function Gallery({ slides }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Handlers
  const handleNext = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Swipe
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  // Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="relative h-[550px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute -bottom-2 left-3 -translate-y-1/2 text-xl text-white/30"
      >
        <FontAwesomeIcon icon={faSquareCaretLeft} size="xl"/>
      </button>
      <button
        onClick={handleNext}
        className="absolute -bottom-2 right-3 -translate-y-1/2 text-xl text-white/30"
      >
        <FontAwesomeIcon icon={faSquareCaretRight} size="xl"/>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
