'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, easeInOut } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import Nav from "@/sections/Nav";
import TechCarousel from '@/components/TechCarousel';

export default function Landing() {
  const [xCurtainOffset, setXCurtainOffset] = useState(0);
  const [h1CursorVisible, setH1CursorVisible] = useState(false);
  const [h2CursorVisible, setH2CursorVisible] = useState(false);

  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setXCurtainOffset(window.innerWidth / 2);
  }, []);

  const curtainSpeedFactor = .8;

  // animation controls
  const lineControls = useAnimation();
  const leftCurtainControls = useAnimation();
  const rightCurtainControls = useAnimation();
  const h1Controls = useAnimation();
  const h2Controls = useAnimation();
  const iconsControls = useAnimation();
  const navControls = useAnimation();

  // motion variants
  const lineVariants = {
    visible: {
      height: "100%",
      transition: { duration: .5 * curtainSpeedFactor, ease: easeInOut }
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.01 }
    }
  }

  const leftCurtainVariants = {
    open: {
      x: -xCurtainOffset,
      transition: { duration: curtainSpeedFactor, ease: easeInOut }
    }
  }

  const rightCurtainVariants = {
    open: {
      x: xCurtainOffset,
      transition: { duration: curtainSpeedFactor, ease: easeInOut }
    }
  }

  const h1Variants = {
    visible: {transition: { staggerChildren: 0.04 }}
  }

  const h2Variants = {
    visible: {transition: { staggerChildren: 0.04 }}
  }

  const charVariants = {
    hidden: { display: 'none' },
    visible: { display: 'inline-block', transition: { duration: 0 } },
  }

  const iconsContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    }
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: [0, 1.15, 1],
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  const navVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.6, ease: easeInOut, delay: 0.5 },
    },
  };

  useEffect(() => {
    (async () => {
      await lineControls.start("visible");
      await lineControls.start("hidden");

      await Promise.all([
        leftCurtainControls.start("open"),
        rightCurtainControls.start("open"),
      ]).then(() => setH1CursorVisible(true));

      await h1Controls.start('visible').then(() => {
        setH1CursorVisible(false);
        setH2CursorVisible(true);
      })
      await h2Controls.start('visible').then(() => setH2CursorVisible(false));
      iconsControls.start('visible');
      await navControls.start('visible');

      curtainRef.current?.remove();
    })();
  }, []);

  // split headers to characters function
  const splitToCharSpans = (text: string) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        variants={charVariants}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  }

  return (
    <section>
      <div
        ref={curtainRef}
        className="fixed top-0 left-0 w-full h-screen z-100 flex overflow-hidden"
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
      
      <motion.div
        initial="hidden"
        animate={navControls}
        variants={navVariants}
        className="w-full"
      >
        <Nav />
      </motion.div>

      <div className="h-screen flex flex-col justify-center items-center">  
        <div className="mt-8 text-center tracking-[.4em]">
          <motion.h1
            className="mb-4 font-light tracking-[.2em] text-7xl ml-6"
            animate={h1Controls}
            variants={h1Variants}
            initial="hidden"
          >
            {splitToCharSpans('ŁUKASZ ŚLIWIŃSKI')}
            <span className={`text-purple-900 opacity-80 ${h1CursorVisible ? 'visible' : 'invisible'}`}>|</span>
          </motion.h1>
          
          <motion.h2
            className="tracking-[.3em] text-3xl text-neutral-400 mt-4 ml-5"
            animate={h2Controls}
            variants={h2Variants}
            initial="hidden"
          >
            {splitToCharSpans('FRONT-END DEVELOPER')}
            <span className={`text-purple-900 opacity-80 ${h2CursorVisible ? 'visible' : 'invisible'}`}>|</span>
          </motion.h2>

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
                className="text-3xl hover:text-neutral-400 transition-colors duration-200"
                aria-label="GitHub"
                variants={iconVariants}
              >
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/twoj-login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-neutral-400 transition-colors duration-200"
                aria-label="LinkedIn"
                variants={iconVariants}
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center h-52 mt-12 overflow-y-hidden">
          <Canvas
            camera={{ position: [0, 1, 10], fov: 50 }}
            style={{ 
              width: '1000px',
              height: '70vw',
              maxHeight: '800px' }}
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
      </div>
    </section>
  );
}
