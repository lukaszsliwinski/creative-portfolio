import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'
import * as THREE from 'three'

import TechBall from './TechBall';

// List of icon paths located in the public/icons folder
const iconPaths = [
  '/icons/typescript.png',
  '/icons/javascript.png',
  '/icons/react.png',
  '/icons/next.png',
  '/icons/angular.png',
  '/icons/redux.png',
  '/icons/tailwind.png',
  '/icons/flowbite.png',
  '/icons/scss.png',
  '/icons/bootstrap.png',
  '/icons/jquery.png',
  '/icons/python.png',
  '/icons/node.png',
  '/icons/php.png',
  '/icons/flask.png',
  '/icons/pytorch.png',
  '/icons/colab.png',
  '/icons/openvino.png',
  '/icons/mongo.png',
  '/icons/mysql.png',
  '/icons/git.png',
]


export default function TechCarousel() {
  const groupRef = useRef<THREE.Group>(null!)

  // Rotate the entire carousel group continuously around Y axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const radius = 4
  const count = iconPaths.length
  const icons = useLoader(TextureLoader, iconPaths)

  // Calculate sphere positions evenly spaced on circle and create Sphere components
  const spheres = icons.map((icon, i) => {
    const angle = (i / count) * Math.PI * 2
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const y = 0

    return <TechBall key={i} position={[x, y, z]} texture={icon} />
  })

  return <group ref={groupRef}>{spheres}</group>
}