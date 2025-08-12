// Carousel component with rotating balls with technologies icons

'use client';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

import TechBall from '@/components/TechBall';
import { iconPaths } from '@/data/iconPaths';

export default function TechCarousel() {
  const groupRef = useRef<THREE.Group>(null!);

  // Rotate the entire carousel group continuously around Y axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const radius = 4;
  const count = iconPaths.length;
  const icons = useLoader(TextureLoader, iconPaths);

  // Calculate sphere positions evenly spaced on circle and create Sphere components
  const spheres = icons.map((icon, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = 0;

    return <TechBall key={i} position={[x, y, z]} texture={icon} />;
  });

  return <group ref={groupRef}>{spheres}</group>;
}
