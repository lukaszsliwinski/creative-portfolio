// 3D technology ball component - used in carousel

import { Decal } from '@react-three/drei';
import * as THREE from 'three';
import { TechBallProps } from '@/types';

export default function TechBall({ position, texture }: TechBallProps) {
  const radius = 0.3;

  // Calculate outward-facing orientation from center
  const direction = new THREE.Vector3(...position).normalize();
  const lookAtMatrix = new THREE.Matrix4().lookAt(
    new THREE.Vector3(0, 0, 0),
    direction,
    new THREE.Vector3(0, 1, 0)
  );

  const quaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

  // Flip decal to face correctly
  const rotationFix = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI
  );
  quaternion.multiply(rotationFix);

  return (
    <mesh position={position} quaternion={quaternion}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="#ffffff" />

      <Decal
        position={[0, 0, radius]}
        rotation={[0, 0, 0]}
        scale={radius * 1.2}
        map={texture}
        depthTest
      />
    </mesh>
  );
}
