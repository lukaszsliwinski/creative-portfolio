// Section with projects moving from right to left

'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';

import Header from '@/components/Header';
import Gallery from "@/components/Gallery";
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';

import { apps } from '@/data/apps';

export default function Projects() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>();

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const animOpacity = useAnimation();
  const transition = { duration: 0.6, ease: easeInOut };

  // Check if the page is displayed on a mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  },[])

  useEffect(() => {
    animOpacity.start({ opacity: inView ? 1 : 0, transition });
  }, [inView]);

  const { t } = useLanguage();

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
      <section className="relative min-h-screen" id="projects">
        <Header text={t('nav.projects')} />
        
        {isMobile ?
          <Gallery
            slides={apps.map((item, i) => (
              <ProjectCard
                key={i}
                previewSrc={item.previewSrc}
                title={item.title}
                description={t(item.descriptionKey)}
                sourceUrl={item.sourceUrl}
                linkUrl={item.linkUrl}
              >
                {item.technologies.map((tech, j) => (
                  <Image
                    key={j}
                    width={20}
                    height={20}
                    alt={tech.name}
                    title={tech.name}
                    src={tech.src}
                  />
                ))}
              </ProjectCard>
            ))}
          />
        :

        
        
        <motion.div
          ref={ref}
          animate={animOpacity}
          initial={{ opacity: 0 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`overflow-hidden w-full whitespace-nowrap ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div
            ref={containerRef}
            className="inline-flex select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {[...apps, ...apps].map((item, i) => (
              <ProjectCard
                key={i}
                previewSrc={item.previewSrc}
                title={item.title}
                description={t(item.descriptionKey)}
                sourceUrl={item.sourceUrl}
                linkUrl={item.linkUrl}
              >
                {item.technologies.map((tech, j) => (
                  <Image
                    key={j}
                    width="30"
                    height="30"
                    alt="tech icon"
                    title={tech.name}
                    src={tech.src}
                  />
                ))}
              </ProjectCard>
            ))}
          </div>
        </motion.div>
                }
        
        
        
        <Footer />
      </section>
  );
}
