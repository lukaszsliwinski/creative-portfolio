'use client';
import { useState, useRef, useEffect } from 'react';

const items = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6'];

export default function Projects() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const x = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Animate continuous scroll when not paused or dragging
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isPaused && !isDragging && containerRef.current) {
        x.current -= 0.5;
        const totalWidth = containerRef.current.scrollWidth / 2;

        if (x.current < -totalWidth) {
          x.current += totalWidth;
        } else if (x.current > 0) {
          x.current -= totalWidth;
        }

        containerRef.current.style.transform = `translateX(${x.current}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  // Mouse event handlers for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    lastX.current = x.current;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const delta = e.clientX - dragStartX.current;
    let newX = lastX.current + delta;
    const totalWidth = containerRef.current.scrollWidth / 2;

    if (newX < -totalWidth) {
      newX += totalWidth;
    } else if (newX > 0) {
      newX -= totalWidth;
    }

    x.current = newX;
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isHovered) setIsPaused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isDragging) setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden w-full whitespace-nowrap ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      id="projects"
    >
      <div
        ref={containerRef}
        className="inline-flex select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="min-w-[500px] h-[150px] mx-[10px] bg-gray-200 flex items-center justify-center text-2xl rounded-lg text-black select-none"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
