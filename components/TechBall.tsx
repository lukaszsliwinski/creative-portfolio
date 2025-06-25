import { Decal } from '@react-three/drei'
import * as THREE from 'three'

type TechBallProps = {
  position: [number, number, number]
  texture: THREE.Texture
}

export default function TechBall({ position, texture }: TechBallProps) {
  const radius = 0.3;

  // Normalize position vector to get direction from center to sphere
  const direction = new THREE.Vector3(...position).normalize()

  // Create a rotation matrix that makes the sphere face outward (away from the center)
  const lookAtMatrix = new THREE.Matrix4().lookAt(
    new THREE.Vector3(0, 0, 0), // Eye position at center
    direction,                  // Target is the sphere's position (facing outward)
    new THREE.Vector3(0, 1, 0) // Up vector
  )

  // Convert rotation matrix to quaternion for mesh orientation
  const quaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix)

  // Rotate 180 degrees around Y axis to fix decal orientation
  const rotationFix = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
  quaternion.multiply(rotationFix)

  return (
    <mesh position={position} quaternion={quaternion}>
      <sphereGeometry args={[radius, 64, 64]} />
      {/* Base sphere material */}
      <meshStandardMaterial color="#ffffff" transparent={false} />

      {/* Decal applied as a sticker on the front side of the sphere */}
      <Decal
        position={[0, 0, radius]}  // Slightly offset in front of the sphere surface
        rotation={[0, 0, 0]}
        scale={radius * 1.2}             // Scale decal to cover a portion of the sphere front
        map={texture}           // Texture applied as decal map
        depthTest
      />
    </mesh>
  )
}