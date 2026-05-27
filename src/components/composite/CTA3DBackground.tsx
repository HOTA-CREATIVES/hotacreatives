/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={ringsRef}>
      {[1, 2, 3, 4].map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.5]}>
          <torusGeometry args={[ring * 2, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#FFEB3B"
            emissive="#FFEB3B"
            emissiveIntensity={0.5 - i * 0.1}
            transparent
            opacity={0.6 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points
      ref={particlesRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        size={0.1}
        color="#FFEB3B"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
}

export default function CTA3DBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFEB3B" />
        <AnimatedRings />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
