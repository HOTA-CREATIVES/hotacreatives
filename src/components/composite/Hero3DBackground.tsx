/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // Generate random particles in a sphere
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      // Create particles in a sphere
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFEB3B"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[3, 1, 128, 16]} />
      <meshStandardMaterial
        color="#FFEB3B"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function FloatingSpheres() {
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  const spheres = useMemo(() => {
    return Array.from({ length: 5 }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  useFrame((state) => {
    sphereRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y =
          spheres[i].position[1] +
          Math.sin(state.clock.elapsedTime * spheres[i].speed) * 3;
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }
    });
  });

  return (
    <>
      {spheres.map((sphere, i) => (
        <mesh
          key={i}
          ref={(el) => (sphereRefs.current[i] = el)}
          position={sphere.position}
          scale={sphere.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#FFEB3B"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <FloatingGeometry />
        <FloatingSpheres />
      </Canvas>
    </div>
  );
}
