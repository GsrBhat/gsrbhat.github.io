"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export default function ChipModel() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 4 + t * 0.2;
    group.current.rotation.x = Math.cos(t / 4) / 4;
    group.current.position.y = Math.sin(t / 1.5) / 10;
    
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1 + Math.sin(t * 3) * 0.5;
    }
  });

  return (
    <group ref={group} scale={[1.5, 1.5, 1.5]}>
      {/* Outer Casing */}
      <mesh>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#050505" roughness={0.7} metalness={0.8} />
        <Edges scale={1} threshold={15} color="#10B981" />
      </mesh>

      {/* Inner Core */}
      <mesh ref={coreRef} position={[0, 0.15, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial 
          color="#000" 
          emissive="#10B981" 
          emissiveIntensity={1} 
          roughness={0.2} 
          metalness={1} 
        />
      </mesh>

      {/* Pins / Traces */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`pin-top-${i}`} position={[-1.4 + i * 0.4, 0, -1.6]}>
          <boxGeometry args={[0.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`pin-bottom-${i}`} position={[-1.4 + i * 0.4, 0, 1.6]}>
          <boxGeometry args={[0.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`pin-left-${i}`} position={[-1.6, 0, -1.4 + i * 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`pin-right-${i}`} position={[1.6, 0, -1.4 + i * 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}
