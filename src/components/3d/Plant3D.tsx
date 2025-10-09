
import { useState, useRef, useEffect } from 'react';
import { useGLTF, useAnimations, Sparkles, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import type { ThreeEvent } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
};

interface PlantProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model: string;
  onClick: (plantData: unknown) => void;
  isRaining: boolean;
  isNightMode: boolean;
  color?: string;
  plantData?: unknown; // Add plant data prop
}

const Plant3D = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  model, 
  onClick, 
  isRaining,
  isNightMode,
  color = "#2D6A4F",
  plantData
}: PlantProps) => {
  const group = useRef<THREE.Group>(null);
  const [modelError, setModelError] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const gltfResult = useGLTF(model);
  
  useEffect(() => {
    if (gltfResult && !gltfResult.scene) {
      console.error(`Failed to load model ${model}`);
      setModelError(true);
    }
  }, [gltfResult, model]);
  
  const { actions } = useAnimations(
    !modelError && gltfResult?.animations ? gltfResult.animations : [], 
    group
  );
  
  useEffect(() => {
    if (!modelError && gltfResult?.animations && gltfResult.animations.length > 0 && actions) {
      const firstAnimation = Object.keys(actions)[0];
      if (firstAnimation) {
        actions[firstAnimation]?.play();
      }
    }
  }, [actions, modelError, gltfResult]);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  useFrame((state) => {
    if (group.current) {
      const windStrength = isRaining ? 0.05 : 0.02;
      const swayAmount = Math.sin(state.clock.elapsedTime) * windStrength;
      group.current.rotation.z = rotation[2] + swayAmount;
      group.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * windStrength;
    }
  });
  
  const hasModelError = modelError || !gltfResult || gltfResult instanceof Error;
  const plantColor = isNightMode 
    ? new THREE.Color(color).multiplyScalar(0.5).getHexString()
    : color;
  const emissiveIntensity = isNightMode ? 0.2 : 0;
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    console.log('Plant clicked:', plantData);
    // Pass the plant data instead of the scene
    if (plantData) {
      onClick(plantData);
    }
  };

  return (
    <group 
      ref={group} 
      position={position}
      rotation={rotation as [number, number, number]}
      scale={[scale, scale, scale]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {hasModelError ? (
        <group castShadow receiveShadow>
          {/* Enhanced stem with better detail */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.2, 1, 16]} />
            <meshStandardMaterial 
              color="#3e8948" 
              emissive={isNightMode ? "#1a2e18" : "#000000"} 
              emissiveIntensity={emissiveIntensity}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          
          {/* Main foliage sphere */}
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial 
              color={plantColor} 
              emissive={isNightMode ? plantColor : "#000000"} 
              emissiveIntensity={emissiveIntensity}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          
          {/* Additional detail spheres for volume */}
          <mesh position={[0.3, 1.3, 0.2]} castShadow receiveShadow>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshStandardMaterial 
              color={plantColor} 
              emissive={isNightMode ? plantColor : "#000000"} 
              emissiveIntensity={emissiveIntensity}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          
          <mesh position={[-0.3, 1.1, -0.2]} castShadow receiveShadow>
            <sphereGeometry args={[0.6, 24, 24]} />
            <meshStandardMaterial 
              color={plantColor} 
              emissive={isNightMode ? plantColor : "#000000"} 
              emissiveIntensity={emissiveIntensity}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
        </group>
      ) : (
        <primitive 
          object={gltfResult?.scene}
          castShadow
          receiveShadow
          onAfterRender={() => {
            if (gltfResult?.scene) {
              gltfResult.scene.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
                  const mesh = child as THREE.Mesh & { material: THREE.MeshStandardMaterial; userData: Record<string, unknown> };
                  
                  // Enable shadows
                  mesh.castShadow = true;
                  mesh.receiveShadow = true;
                  
                  if (!mesh.userData.originalColor) {
                    mesh.userData.originalColor = mesh.material.color.clone();
                  }
                  
                  // Enhanced material properties
                  mesh.material.roughness = 0.9;
                  mesh.material.metalness = 0;
                  mesh.material.envMapIntensity = 0.3;
                  
                  if (isNightMode) {
                    mesh.material.color.copy(mesh.userData.originalColor).multiplyScalar(0.5);
                    mesh.material.emissive = new THREE.Color(0x112211);
                    mesh.material.emissiveIntensity = 0.3;
                  } else {
                    if (mesh.userData.originalColor) {
                      mesh.material.color.copy(mesh.userData.originalColor);
                      mesh.material.emissive = new THREE.Color(0x000000);
                      mesh.material.emissiveIntensity = 0;
                    }
                  }
                }
              });
            }
          }}
        />
      )}
      
      {hovered && (
        <group>
          {/* Magical sparkles when hovering */}
          <Sparkles
            count={30}
            scale={2}
            size={2}
            speed={0.4}
            opacity={0.6}
            color={color}
          />
          
          {/* Enhanced hover effect with glow */}
          <mesh position={[0, hasModelError ? 2 : 0.5, 0]} scale={[0.25, 0.25, 0.25]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.4}
            />
          </mesh>
          
          {/* Outer glow ring */}
          <mesh position={[0, hasModelError ? 2 : 0.5, 0]} scale={[0.35, 0.35, 0.35]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2}
            />
          </mesh>
          
          {/* Glowing point light */}
          <pointLight
            position={[0, hasModelError ? 2 : 0.5, 0]}
            color={color}
            intensity={1.5}
            distance={3}
            decay={2}
          />
        </group>
      )}

      {isNightMode && (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <group>
            {[...Array(5)].map((_, i) => (
              <mesh 
                key={`firefly-${i}`} 
                position={[
                  Math.random() * 1.5 - 0.75, 
                  Math.random() * 1.5 + 0.5, 
                  Math.random() * 1.5 - 0.75
                ]}
              >
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  emissive="#FFD700"
                  emissiveIntensity={2}
                  toneMapped={false}
                />
              </mesh>
            ))}
          </group>
        </Float>
      )}
    </group>
  );
};

export default Plant3D;
