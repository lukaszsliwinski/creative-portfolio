import { useLanguage } from "@/context/LanguageContext";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Header from "../Header";
import TechCarousel from '../TechCarousel';


export default function Technologies() {
  const { t } = useLanguage();

  return (
    <section className="h-screen pt-28" id="technologies">
      <Header text={t('nav.technologies')} />
      <div className="flex items-center h-84 overflow-y-hidden">
        <Canvas
          camera={{ position: [0, 1, 10], fov: 50 }}
          style={{ height: '800px' }}
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
    </section>
  )
}
