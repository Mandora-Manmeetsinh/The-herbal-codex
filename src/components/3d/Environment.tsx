import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Sky, Environment as DreiEnvironment, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { getZoneById } from '@/data/zones';

interface EnvironmentProps {
  isRaining: boolean;
  isNightMode: boolean;
  zoneId: string;
  ambientLightColor: string;
  groundColor: string;
}

const Environment = ({ isRaining, isNightMode, zoneId, ambientLightColor, groundColor }: EnvironmentProps) => {
  const { scene } = useThree();
  // Use any to bypass the type mismatch issues with the Three.js version
  const rainRef = useRef<any>(null);
  const firefliesRef = useRef<any>(null);
  
  // Current zone data
  const zoneData = getZoneById(zoneId);
  
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
  
  // Create fireflies for night mode
  useEffect(() => {
    if (isNightMode) {
      // Create many small points of light that will be fireflies
      const fireflyCount = 200;
      const positions = new Float32Array(fireflyCount * 3);
      const scales = new Float32Array(fireflyCount);
      
      for (let i = 0; i < fireflyCount * 3; i += 3) {
        // Random positions spread around the scene
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = Math.random() * 10;  // Keep them low to the ground
        positions[i + 2] = (Math.random() - 0.5) * 80;
        
        // Random scales for visual variety
        scales[i/3] = Math.random() * 0.5 + 0.5;
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
      
      const material = new THREE.PointsMaterial({
        color: 0xffcf75,
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      if (firefliesRef.current) {
        (scene as any).remove(firefliesRef.current);
      }
      
      const fireflies = new THREE.Points(geometry, material);
      firefliesRef.current = fireflies;
      (scene as any).add(fireflies);
    } else if (firefliesRef.current) {
      (scene as any).remove(firefliesRef.current);
      firefliesRef.current = null;
    }
    
    return () => {
      if (firefliesRef.current) {
        (scene as any).remove(firefliesRef.current);
      }
    };
  }, [isNightMode, scene]);
  
  // Animate rain falling
  useFrame(({ clock }) => {
    // Rain animation
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
    
    // Firefly animation
    if (firefliesRef.current && isNightMode) {
      const positions = firefliesRef.current.geometry.attributes.position.array as Float32Array;
      const scales = firefliesRef.current.geometry.attributes.scale.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle bobbing movement
        positions[i] += Math.sin(clock.elapsedTime * 0.5 + i) * 0.01;
        positions[i + 1] += Math.cos(clock.elapsedTime * 0.3 + i) * 0.01;
        positions[i + 2] += Math.sin(clock.elapsedTime * 0.4 + i) * 0.01;
        
        // Flicker effect
        const idx = i / 3;
        scales[idx] = (Math.sin(clock.elapsedTime * 3 + idx * 100) * 0.5 + 0.5) * 0.5 + 0.5;
      }
      
      firefliesRef.current.geometry.attributes.position.needsUpdate = true;
      firefliesRef.current.geometry.attributes.scale.needsUpdate = true;
    }
  });
  
  // Create garden elements based on current zone
  const createZoneElements = () => {
    const elements = [];
    
    switch(zoneId) {
      case "ayurvedic":
        // Ayurvedic zone decorations
        // Add stone circle
        elements.push(
          <group key="ayurvedic-circle" position={[0, 0, 0]}>
            {/* Circular stone arrangement */}
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx / 8) * Math.PI * 2;
              const radius = 6;
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              
              return (
                <mesh key={`stone-${idx}`} position={[x, 0, z]} rotation={[0, Math.random(), 0]} castShadow receiveShadow>
                  <boxGeometry args={[1, 0.5, 0.7]} />
                  <meshStandardMaterial color="#9c9c8d" roughness={0.8} />
                </mesh>
              );
            })}
            
            {/* Central decorative element */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 1, 1, 6]} />
              <meshStandardMaterial color="#d0c090" roughness={0.7} />
            </mesh>
          </group>
        );
        
        // Add decorative trees with golden hue
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const radius = 12;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          elements.push(
            <group key={`ayurvedic-tree-${i}`} position={[x, 0, z]}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.3, 0.5, 2.5, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 2.5, 0]} castShadow>
                <coneGeometry args={[1.8, 3.5, 8]} />
                <meshStandardMaterial color="#5D6D1E" />
              </mesh>
            </group>
          );
        }
        break;
        
      case "respiratory":
        // Respiratory zone - misty with water features
        
        // Add small pond
        elements.push(
          <group key="respiratory-pond" position={[0, -0.4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[3, 32]} />
              <meshStandardMaterial 
                color="#6FA8DC" 
                transparent 
                opacity={0.8} 
                roughness={0.2} 
                metalness={0.1} 
              />
            </mesh>
            
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
              <ringGeometry args={[2.8, 3.2, 32]} />
              <meshStandardMaterial color="#7D6E67" roughness={0.9} />
            </mesh>
          </group>
        );
        
        // Add mist particles
        elements.push(
          <group key="respiratory-mist">
            {Array.from({ length: 12 }).map((_, idx) => {
              const x = (Math.random() - 0.5) * 15;
              const z = (Math.random() - 0.5) * 15;
              const scale = 0.5 + Math.random() * 1;
              
              return (
                <mesh key={`mist-${idx}`} position={[x, 0.5, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[scale * 2, scale * 2]} />
                  <meshStandardMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.2 + Math.random() * 0.2} 
                    depthWrite={false}
                  />
                </mesh>
              );
            })}
          </group>
        );
        
        // Add rock formations
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 9 + Math.random() * 3;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const height = 1 + Math.random() * 2;
          
          elements.push(
            <group key={`respiratory-rock-${i}`} position={[x, 0, z]}>
              <mesh castShadow receiveShadow>
                <coneGeometry args={[1.2, height, 5]} />
                <meshStandardMaterial color="#7d7f7c" roughness={0.9} />
              </mesh>
            </group>
          );
        }
        break;
        
      case "immunity":
        // Immunity zone - dense and lush
        
        // Add dense vegetation
        for (let i = 0; i < 20; i++) {
          const x = (Math.random() - 0.5) * 24;
          const z = (Math.random() - 0.5) * 24;
          const scale = 0.3 + Math.random() * 0.4;
          
          if (Math.sqrt(x*x + z*z) > 8) { // Keep center area clear
            elements.push(
              <group key={`immunity-bush-${i}`} position={[x, 0, z]} scale={[scale, scale, scale]}>
                <mesh position={[0, 0.3, 0]} castShadow>
                  <sphereGeometry args={[1, 8, 8]} />
                  <meshStandardMaterial color={
                    i % 3 === 0 ? "#1e4d2b" : (i % 3 === 1 ? "#2a623d" : "#1a3a24")
                  } />
                </mesh>
                <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.2, 0.3, 0.4, 8]} />
                  <meshStandardMaterial color="#5D4037" />
                </mesh>
              </group>
            );
          }
        }
        
        // Add boundary logs
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 11;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotation = Math.atan2(x, z);
          
          elements.push(
            <mesh 
              key={`immunity-log-${i}`} 
              position={[x, 0.3, z]} 
              rotation={[0, rotation, 0]} 
              castShadow 
              receiveShadow
            >
              <cylinderGeometry args={[0.4, 0.4, 2.5, 8]} />
              <meshStandardMaterial color="#5D4037" roughness={0.9} />
            </mesh>
          );
        }
        break;
        
      case "floral":
        // Floral zone - colorful and vibrant
        
        // Add flower beds
        const flowerColors = ['#ff8080', '#ffb366', '#ffff80', '#d6ff80', '#80ffff', '#d680ff'];
        
        for (let i = 0; i < 24; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 4 + (i % 3) * 3;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const colorIndex = Math.floor(Math.random() * flowerColors.length);
          
          elements.push(
            <group key={`floral-flower-${i}`} position={[x, 0, z]}>
              {/* Flower stem */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
                <meshStandardMaterial color="#3e8948" />
              </mesh>
              
              {/* Flower blossom */}
              <mesh position={[0, 0.3, 0]} castShadow>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color={flowerColors[colorIndex]} roughness={0.8} />
              </mesh>
            </group>
          );
        }
        
        // Add gazebo in the center
        elements.push(
          <group key="floral-gazebo" position={[0, 0, 0]}>
            {/* Base platform */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
              <cylinderGeometry args={[2, 2, 0.2, 8]} />
              <meshStandardMaterial color="#d0c090" roughness={0.8} />
            </mesh>
            
            {/* Pillars */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const angle = (idx / 6) * Math.PI * 2;
              const r = 1.8;
              const x = Math.sin(angle) * r;
              const z = Math.cos(angle) * r;
              
              return (
                <mesh key={`pillar-${idx}`} position={[x, 1.2, z]} castShadow>
                  <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
                  <meshStandardMaterial color="#d0c090" />
                </mesh>
              );
            })}
            
            {/* Roof */}
            <mesh position={[0, 2.5, 0]} castShadow>
              <coneGeometry args={[2.5, 1, 6]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
          </group>
        );
        break;
        
      default:
        // Garden benches as fallback
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
    }
    
    return elements;
  };
  
  // Calculate sky parameters based on zone and day/night mode
  const getSkyParams = () => {
    // Base parameters adjusted for night mode
    const baseParams = {
      turbidity: isNightMode ? 0.1 : (isRaining ? 10 : 2),
      rayleigh: isNightMode ? 0.2 : (isRaining ? 5 : 1),
      sunPosition: [0, isNightMode ? -0.5 : (isRaining ? 0.05 : 0.5), 0] as [number, number, number]
    };
    
    // Zone-specific adjustments
    switch(zoneId) {
      case "ayurvedic":
        return {
          ...baseParams,
          turbidity: isNightMode ? 0.1 : (isRaining ? 10 : 1),
          rayleigh: isNightMode ? 0.2 : (isRaining ? 5 : 0.5),
          sunPosition: [0, isNightMode ? -0.5 : (isRaining ? 0.05 : 0.6), 0] as [number, number, number]
        };
      case "respiratory":
        return {
          ...baseParams,
          turbidity: isNightMode ? 0.1 : 8,
          rayleigh: isNightMode ? 0.2 : 4,
          sunPosition: [0, isNightMode ? -0.5 : 0.3, 0] as [number, number, number]
        };
      case "immunity":
        return {
          ...baseParams,
          turbidity: isNightMode ? 0.1 : (isRaining ? 10 : 0.8),
          rayleigh: isNightMode ? 0.2 : (isRaining ? 5 : 0.3),
          sunPosition: [0, isNightMode ? -0.5 : (isRaining ? 0.05 : 0.8), 0] as [number, number, number]
        };
      case "floral":
        return {
          ...baseParams,
          turbidity: isNightMode ? 0.1 : (isRaining ? 10 : 0.5),
          rayleigh: isNightMode ? 0.2 : (isRaining ? 5 : 0.2),
          sunPosition: [0, isNightMode ? -0.5 : (isRaining ? 0.05 : 0.7), 0] as [number, number, number]
        };
      default:
        return baseParams;
    }
  };
  
  const skyParams = getSkyParams();
  
  return (
    <>
      {/* Sky changes based on weather, time of day, and zone */}
      <Sky
        distance={450000}
        sunPosition={skyParams.sunPosition}
        inclination={isNightMode ? 0 : 0.5}
        azimuth={isNightMode ? 0.75 : 0.25}
        turbidity={skyParams.turbidity}
        rayleigh={skyParams.rayleigh}
        mieCoefficient={isNightMode ? 0.005 : 0.005}
        mieDirectionalG={isNightMode ? 0.8 : 0.8}
      />
      
      {/* Stars visible during night mode */}
      {isNightMode && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      
      {/* Moon visible at night */}
      {isNightMode && (
        <mesh position={[20, 30, -40]} scale={8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      )}
      
      {/* Clouds - fewer at night */}
      {!isRaining && !isNightMode && (
        <>
          {/* Using any type casting to bypass the type checking for Cloud args */}
          <Cloud position={[-10, 15, 0]} args={[3, 2] as any} />
          <Cloud position={[10, 18, -10]} args={[4, 2] as any} />
          <Cloud position={[0, 20, 10]} args={[3.5, 2] as any} />
        </>
      )}
      
      {!isRaining && isNightMode && (
        <>
          {/* Fewer, darker clouds at night */}
          <Cloud position={[-20, 20, -10]} args={[5, 2] as any} color="#333333" />
          <Cloud position={[15, 25, 5]} args={[6, 2] as any} color="#333333" />
        </>
      )}
      
      {/* Environment lighting */}
      <DreiEnvironment
        preset={isNightMode ? "night" : (isRaining ? "sunset" : "park")}
        background={false}
      />
      
      {/* Ambient light - adjusted for day/night */}
      <ambientLight 
        intensity={isNightMode ? 0.2 : (isRaining ? 0.5 : 0.8)} 
        color={isNightMode ? "#102030" : ambientLightColor} 
      />
      
      {/* Directional light (sun/moon) */}
      <directionalLight 
        position={isNightMode ? [0, 10, -10] : [10, 20, 10]} 
        intensity={isNightMode ? 0.1 : (isRaining ? 0.3 : 1.5)}
        color={isNightMode ? "#77AABBFF" : "#FFFFFF"}
        castShadow
        shadow-mapSize={[2048, 2048]} 
      />
      
      {/* Additional moon light at night */}
      {isNightMode && (
        <spotLight 
          position={[20, 30, -40]} 
          intensity={0.5} 
          color="#AACCFF" 
          distance={100} 
          angle={0.5} 
          penumbra={1}
        />
      )}
      
      {/* Ground - adjusted color for day/night */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color={
            isNightMode 
              ? new THREE.Color(groundColor).multiplyScalar(0.3).getStyle()  // Much darker at night
              : (isRaining ? (groundColor !== "#3a7e23" ? groundColor : "#2c5e1a") : groundColor)
          } 
          roughness={0.8} 
        />
      </mesh>
      
      {/* Zone-specific features */}
      {createZoneElements()}
    </>
  );
};

export default Environment;
