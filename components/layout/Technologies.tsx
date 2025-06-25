import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import TechCarousel from '../TechCarousel';


export default function Technologies() {
  return (
    <section className="h-screen" id="technologies">
      <Canvas camera={{ position: [0, 1, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
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
    </section>
  )
}
