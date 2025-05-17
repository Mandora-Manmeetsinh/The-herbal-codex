
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Sky, Environment as DreiEnvironment, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentProps {
  isRaining: boolean;
}

const Environment = ({ isRaining }: EnvironmentProps) => {
  const { scene } = useThree();
  // Use any to bypass the type mismatch issues with the Three.js version
  const rainRef = useRef<any>(null);
  
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
        (scene as any).remove(rainRef.current);
      }
      
      const rain = new THREE.Points(geometry, material);
      rainRef.current = rain;
      // Use type assertion to overcome the type incompatibility
      (scene as any).add(rain);
    } else if (rainRef.current) {
      (scene as any).remove(rainRef.current);
      rainRef.current = null;
    }
    
    return () => {
      if (rainRef.current) {
        (scene as any).remove(rainRef.current);
      }
    };
  }, [isRaining, scene]);
  
  // Animate rain falling
  useFrame(() => {
    if (rainRef.current && isRaining) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 1; i < positions.length; i += 3) {
        // Move rain down
        positions[i] -= 0.1 + Math.random() * 0.1;
        
        // Reset rain drops that reach the ground
        if (positions[i] < -10) {
          positions[i] = 40 + Math.random() * 10;
        }
      }
      
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  // Create garden elements
  const createGardenElements = () => {
    // Create different decorative elements
    const elements = [];
    
    // Add trees
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 10 + Math.random() * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      
      elements.push(
        <group key={`tree-${i}`} position={[x, 0, z]}>
          {/* Tree trunk */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.6, 3, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          {/* Tree foliage */}
          <mesh position={[0, 3, 0]} castShadow>
            <coneGeometry args={[2, 4, 8]} />
            <meshStandardMaterial color="#2F4F2F" />
          </mesh>
        </group>
      );
    }
    
    // Add garden benches
    const benchPositions = [
      [4, 0, -6],
      [-5, 0, 4]
    ];
    
    benchPositions.forEach((pos, idx) => {
      elements.push(
        <group key={`bench-${idx}`} position={pos as [number, number, number]} rotation={[0, Math.PI * Math.random(), 0]}>
          {/* Seat */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.1, 0.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          {/* Back */}
          <mesh position={[0, 0.8, -0.25]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.6, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          {/* Legs */}
          <mesh position={[-0.7, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#5D4037" />
          </mesh>
          <mesh position={[0.7, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#5D4037" />
          </mesh>
        </group>
      );
    });
    
    // Add small garden pond
    elements.push(
      <group key="pond" position={[-6, -0.4, -5]}>
        {/* Water */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2, 24]} />
          <meshStandardMaterial 
            color="#6FA8DC" 
            transparent 
            opacity={0.8} 
            roughness={0.2} 
            metalness={0.1} 
          />
        </mesh>
        
        {/* Pond edge */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <ringGeometry args={[1.8, 2.2, 24]} />
          <meshStandardMaterial color="#7D6E67" roughness={0.9} />
        </mesh>
      </group>
    );
    
    return elements;
  };
  
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
      
      {/* Clouds */}
      {!isRaining && (
        <>
          {/* Using any type casting to bypass the type checking for Cloud args */}
          <Cloud position={[-10, 15, 0]} args={[3, 2] as any} />
          <Cloud position={[10, 18, -10]} args={[4, 2] as any} />
          <Cloud position={[0, 20, 10]} args={[3.5, 2] as any} />
        </>
      )}
      
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
      
      {/* Garden features */}
      {createGardenElements()}
    </>
  );
};

export default Environment;
