// Animated landing page with sequentially appearing elements on the page

'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, easeInOut, easeOut } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import Nav from '@/sections/Nav';
import TechCarousel from '@/components/TechCarousel';
import HoverFlip from '@/components/HoverFlip';

export default function Landing() {
  const [xCurtainOffset, setXCurtainOffset] = useState(0);
  const [h1CursorVisible, setH1CursorVisible] = useState(false);
  const [h2CursorVisible, setH2CursorVisible] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>();
  const [canvasWidth, setCanvasWidth] = useState('');
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>();

  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenWidth = window.innerWidth

    setIsMobile(screenWidth < 640);
    setXCurtainOffset(screenWidth / 2);
    
    // set the carousel size depending on the viewport
    if (screenWidth < 360) {
      setCanvasWidth('w-[319px]');
      setCameraPosition([25, 1, 10]);
    } else if (screenWidth >= 360 && screenWidth < 460) {
      setCanvasWidth('w-[359px]');
      setCameraPosition([21, 1, 10]);
    } else if (screenWidth >= 460 && screenWidth < 640) {
      setCanvasWidth('w-[459px]');
      setCameraPosition([16, 1, 10]);
    } else if (screenWidth >= 640 && screenWidth < 768) {
      setCanvasWidth('w-[639px]');
      setCameraPosition([12, 1, 10]);
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      setCanvasWidth('w-[767px]');
      setCameraPosition([10, 1, 10]);
    } else if (screenWidth >= 1024) {
      setCanvasWidth('w-[1023px]');
      setCameraPosition([8, 1, 10]);
    }
  }, []);

  const curtainSpeedFactor = 0.8;

  // animation controls
  const lineControls = useAnimation();
  const leftCurtainControls = useAnimation();
  const rightCurtainControls = useAnimation();
  const h1Controls = useAnimation();
  const h2Controls = useAnimation();
  const iconsControls = useAnimation();
  const techControls = useAnimation();
  const navControls = useAnimation();

  // motion variants
  const lineVariants = {
    visible: {
      height: '100%',
      transition: { duration: 0.5 * curtainSpeedFactor, ease: easeInOut }
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.01 }
    }
  };

  const leftCurtainVariants = {
    open: {
      x: -xCurtainOffset,
      transition: { duration: curtainSpeedFactor, ease: easeInOut }
    }
  };

  const rightCurtainVariants = {
    open: {
      x: xCurtainOffset,
      transition: { duration: curtainSpeedFactor, ease: easeInOut }
    }
  };

  const h1Variants = {
    visible: { transition: { staggerChildren: 0.04 } }
  };

  const h2Variants = {
    visible: { transition: { staggerChildren: 0.04 } }
  };

  const charVariants = {
    hidden: { display: 'none' },
    visible: { display: 'inline-block', transition: { duration: 0 } }
  };

  const spaceVariants = {
    hidden: { display: 'none' },
    visible: { display: 'block', transition: { duration: 0 } }
  };

  const iconsContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: [0, 1.15, 1],
      transition: {
        duration: 0.5,
        ease: easeInOut
      }
    }
  };

  const techVariants = {
    hidden: {
      y: '300%',
      opacity: 0
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const navVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.6, ease: easeInOut, delay: 0.5 }
    }
  };

  // animation queue
  useEffect(() => {
    (async () => {
      await lineControls.start('visible');
      await lineControls.start('hidden');

      await Promise.all([
        leftCurtainControls.start('open'),
        rightCurtainControls.start('open')
      ]).then(() => setH1CursorVisible(true));

      await h1Controls.start('visible').then(() => {
        setH1CursorVisible(false);
        setH2CursorVisible(true);
      });
      await h2Controls.start('visible').then(() => setH2CursorVisible(false));
      iconsControls.start('visible');
      techControls.start('visible');
      await navControls.start('visible');

      curtainRef.current?.remove();
    })();
  }, []);

  // split headers to characters function
  const splitToCharSpans = (text: string, newLine: boolean) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        className={char === ' ' && isMobile && newLine ? 'h-2' : ''}
        variants={char === ' ' && isMobile && newLine ? spaceVariants : charVariants}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <section>
      {/* Curtains */}
      <div
        ref={curtainRef}
        className="fixed top-0 left-0 w-full h-dvh z-100 flex overflow-hidden"
      >
        {/* Vertical line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-white/30"
          animate={lineControls}
          variants={lineVariants}
          initial={{ height: 0, opacity: 1 }}
        />

        {/* Left curtain */}
        <motion.div
          className="w-1/2 h-full bg-black"
          animate={leftCurtainControls}
          variants={leftCurtainVariants}
          initial={{ x: 0 }}
        />

        {/* Rigth curtain */}
        <motion.div
          className="w-1/2 h-full bg-black"
          animate={rightCurtainControls}
          variants={rightCurtainVariants}
          initial={{ x: 0 }}
        />
      </div>

      {/* Navigation bar container */}
      <motion.div initial="hidden" animate={navControls} variants={navVariants} className="w-full">
        <Nav />
      </motion.div>

      {/* Main page */}
      <div className="min-h-dvh flex flex-col justify-center items-center">
        <div className="mt-8 text-center tracking-[.4em]">
          {/* Headers */}
          <motion.h1
            className="mb-4 font-light tracking-[.2em] text-5xl md:text-6xl lg:text-7xl"
            animate={h1Controls}
            variants={h1Variants}
            initial="hidden"
          >
            {splitToCharSpans('ŁUKASZ ŚLIWIŃSKI', true)}
            <span
              className={`text-purple-900 opacity-80 ${h1CursorVisible ? '' : 'hidden'}`}
            >
              |
            </span>
          </motion.h1>
          <motion.h2
            className="tracking-[.3em] text-base sm:text-2xl md:text-3xl text-neutral-400"
            animate={h2Controls}
            variants={h2Variants}
            initial="hidden"
          >
            {splitToCharSpans('FRONT-END DEVELOPER', false)}
            <span
              className={`text-purple-900 opacity-80 ${h2CursorVisible ? '' : 'hidden'}`}
            >
              |
            </span>
          </motion.h2>

          {/* Link icons */}
          <div className="mt-6">
            <motion.div
              className="flex gap-6 justify-center"
              initial="hidden"
              animate={iconsControls}
              variants={iconsContainerVariants}
            >
              <motion.a
                href="https://github.com/twoj-login"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group text-xl sm:text-2xl md:text-3xl overflow-hidden"
                aria-label="GitHub"
                variants={iconVariants}
              >
                <HoverFlip icon={faGithub} size="lg" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/twoj-login"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group text-xl sm:text-2xl md:text-3xl overflow-hidden"
                aria-label="LinkedIn"
                variants={iconVariants}
              >
                <HoverFlip icon={faLinkedin} size="lg" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Rotating balls with technologies icons */}
        <motion.div initial="hidden" animate={techControls} variants={techVariants}>
          <div className={`flex items-center ${canvasWidth} mt-12 overflow-y-hidden cursor-w-resize`}>
            <Canvas
              camera={{ position: cameraPosition, fov: 9 }}
            >
              <ambientLight intensity={1.8} />
              <directionalLight position={[5, 5, 5]} />
              <TechCarousel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.atan2(1, 0.1)}
                maxPolarAngle={Math.atan2(1, 0.1)}
                target={[0, 0, 0]}
              />
            </Canvas>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
