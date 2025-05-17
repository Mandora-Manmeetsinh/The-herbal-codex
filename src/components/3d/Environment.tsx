
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Sky, Environment as DreiEnvironment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentProps {
  isRaining: boolean;
}

const Environment = ({ isRaining }: EnvironmentProps) => {
  const { scene } = useThree();
  // Using a more generic Object3D type that's compatible with scene.add/remove
  const rainRef = useRef<THREE.Object3D | null>(null);
  
  // Create rain particles
  useEffect(() => {
    if (isRaining) {
      const rainCount = 10000;
      const positions = new Float32Array(rainCount * 3);
      
      for (let i = 0; i < rainCount * 3; i += 3) {
        // Random positions within a 100x100x100 cube
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = Math.random() * 50;  // Start from top
        positions[i + 2] = (Math.random() - 0.5) * 100;
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true,
        opacity: 0.6
      });
      
      if (rainRef.current) {
        scene.remove(rainRef.current);
      }
      
      const rain = new THREE.Points(geometry, material);
      rainRef.current = rain;
      scene.add(rain);
    } else if (rainRef.current) {
      scene.remove(rainRef.current);
      rainRef.current = null;
    }
    
    return () => {
      if (rainRef.current) {
        scene.remove(rainRef.current);
      }
    };
  }, [isRaining, scene]);
  
  // Animate rain falling
  useFrame(() => {
    if (rainRef.current && isRaining) {
      // Type assertion to access the Points specific properties safely
      const rainParticles = rainRef.current as THREE.Points;
      const positions = rainParticles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 1; i < positions.length; i += 3) {
        // Move rain down
        positions[i] -= 0.1 + Math.random() * 0.1;
        
        // Reset rain drops that reach the ground
        if (positions[i] < -10) {
          positions[i] = 40 + Math.random() * 10;
        }
      }
      
      rainParticles.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <>
      {/* Sky changes based on weather */}
      <Sky
        distance={450000}
        sunPosition={[0, isRaining ? 0.05 : 0.5, 0]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={isRaining ? 10 : 2}
        rayleigh={isRaining ? 5 : 1}
      />
      
      {/* Stars visible during rainy weather (darker sky) */}
      {isRaining && <Stars radius={100} depth={50} count={1000} factor={4} fade />}
      
      {/* Environment lighting */}
      <DreiEnvironment
        preset={isRaining ? "sunset" : "park"}
        background={false}
      />
      
      {/* Ambient light */}
      <ambientLight intensity={isRaining ? 0.5 : 0.8} />
      
      {/* Directional light (sun) */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={isRaining ? 0.3 : 1.5}
        castShadow
        shadow-mapSize={[2048, 2048]} 
      />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color={isRaining ? "#2c5e1a" : "#3a7e23"} 
          roughness={0.8} 
        />
      </mesh>
    </>
  );
};

export default Environment;
