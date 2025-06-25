import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'
import * as THREE from 'three'

import TechBall from './TechBall';

// List of texture paths located in the public/textures folder
const texturePaths = [
  '/textures/typescript.png',
  '/textures/javascript.png',
  '/textures/react.png',
  '/textures/next.png',
  '/textures/angular.png',
  '/textures/redux.png',
  '/textures/tailwind.png',
  '/textures/flowbite.png',
  '/textures/scss.png',
  '/textures/bootstrap.png',
  '/textures/jquery.png',
  '/textures/python.png',
  '/textures/node.png',
  '/textures/php.png',
  '/textures/flask.png',
  '/textures/pytorch.png',
  '/textures/colab.png',
  '/textures/openvino.png',
  '/textures/mongo.png',
  '/textures/mysql.png',
  '/textures/git.png',
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
  const count = texturePaths.length
  const textures = useLoader(TextureLoader, texturePaths)

  // Calculate sphere positions evenly spaced on circle and create Sphere components
  const spheres = textures.map((texture, i) => {
    const angle = (i / count) * Math.PI * 2
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const y = 0

    return <TechBall key={i} position={[x, y, z]} texture={texture} />
  })

  return <group ref={groupRef}>{spheres}</group>
}