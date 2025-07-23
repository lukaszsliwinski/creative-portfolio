'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/sections/Footer';

import { useLanguage } from '@/context/LanguageContext';

import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';

export default function Projects() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const animOpacity = useAnimation();
  const transition = { duration: 0.6, ease: easeInOut };

  useEffect(() => {
    if (inView) {
      animOpacity.start({ opacity: 1, transition });
    } else {
      animOpacity.start({ opacity: 0, transition });
    }
  }, [inView]);

  const { t } = useLanguage();

  const apps = [
    {
      previewSrc: '/gif/digit-preview.gif',
      title: 'Digit Recognizer',
      app: 'digit',
      description: t('projects.digit'),
      sourceUrl: 'https://github.com/lukaszsliwinski/digit-recognizer/',
      linkUrl: 'https://digitrecognizer.lukaszsliwinski.pl',
      technologies: [
        { name: 'TypeScript', src: '/icons/typescript.png' },
        { name: 'React.js', src: '/icons/react.png' },
        { name: 'Tailwind CSS', src: '/icons/tailwind.png' },
        { name: 'Python', src: '/icons/python.png' },
        { name: 'Flask', src: '/icons/flask.png' },
        { name: 'PyTorch', src: '/icons/pytorch.png' },
        { name: 'Google Colab', src: '/icons/colab.png' },
        { name: 'OpenVINO', src: '/icons/openvino.png' }
      ]
    },
    {
      previewSrc: '/gif/radio-preview.gif',
      title: 'Radio App',
      app: 'radio',
      description: t('projects.radio'),
      sourceUrl: 'https://github.com/lukaszsliwinski/radio/',
      linkUrl: 'https://radio.lukaszsliwinski.pl',
      technologies: [
        { name: 'TypeScript', src: '/icons/typescript.png' },
        { name: 'Angular', src: '/icons/angular.png' },
        { name: 'Scss', src: '/icons/scss.png' },
        { name: 'Node.js', src: '/icons/node.png' },
        { name: 'MongoDB', src: '/icons/mongo.png' }
      ]
    },
    {
      previewSrc: '/gif/vocabulary-preview.gif',
      title: 'Vocabulary Quiz',
      app: 'vocabularyquiz',
      description: t('projects.vocabularyquiz'),
      sourceUrl: 'https://github.com/lukaszsliwinski/vocabulary-quiz/',
      linkUrl: 'https://vocabularyquiz.lukaszsliwinski.pl',
      technologies: [
        { name: 'TypeScript', src: '/icons/typescript.png' },
        { name: 'Angular', src: '/icons/angular.png' },
        { name: 'Scss', src: '/icons/scss.png' },
        { name: 'Node.js', src: '/icons/node.png' },
        { name: 'MongoDB', src: '/icons/mongo.png' }
      ]
    },
    {
      previewSrc: '/gif/solo-preview.gif',
      title:'Personal Music Website',
      app:'music',
      description: t('projects.music'),
      sourceUrl:'https://github.com/lukaszsliwinski/solo-website/',
      linkUrl:'https://lukaszsliwinski.pl',
      technologies: [
        { name: 'TypeScript', src: '/icons/typescript.png' },
        { name: 'Next.js', src: '/icons/next.png' },
        { name: 'Tailwind CSS', src: '/icons/tailwind.png' }
      ]
    },
    {
      previewSrc: '/gif/ksmb-preview.gif',
      title:'KSMicroband Website',
      app:'ksmicroband',
      description: t('projects.ksmicroband'),
      sourceUrl:'https://github.com/lukaszsliwinski/ksmb-v2/',
      linkUrl:'https://ksmicroband.pl/',
      technologies: [
        { name: 'JavaScript', src: '/icons/javascript.png' },
        { name: 'React.js', src: '/icons/react.png' },
        { name: 'Tailwind CSS', src: '/icons/tailwind.png' },
        { name: 'Node.js', src: '/icons/node.png' }
      ]
    }
  ];

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
              app={item.app}
              description={item.description}
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
      <Footer />
    </section>
  );
}
